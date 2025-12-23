/**
 * Section animation composable that handles both horizontal scroll mode and vertical scroll mode
 * In horizontal scroll mode, animations trigger based on scroll progress
 * In vertical scroll mode, animations use standard ScrollTrigger
 */
interface SectionAnimationOptions {
  sectionRef: Ref<HTMLElement | undefined>;
  sectionIndex: number;
  totalSections?: number;
}

export function useSectionAnimation(options: SectionAnimationOptions) {
  const { sectionRef: _sectionRef, sectionIndex, totalSections = 6 } = options
  const { prefersReducedMotion, isDesktop } = useBreakpoints()

  // Inject scroll context from HorizontalScroller
  const scrollContext = inject<{
    progress: ComputedRef<number>;
    currentSection: ComputedRef<number>;
  } | null>('scrollContext', null)

  const animations: gsap.core.Tween[] = []
  const hasAnimated = ref(false)
  const isHorizontalMode = ref(false)

  // Pending animations for horizontal mode
  const pendingAnimations: Array<{
    targets: gsap.TweenTarget;
    fromVars: gsap.TweenVars;
    toVars: gsap.TweenVars;
  }> = []

  // Check if we're in horizontal mode
  const checkHorizontalMode = () => {
    if (!import.meta.client) return false
    return isDesktop.value
  }

  /**
   * Create animation - stored for horizontal mode, immediate for vertical mode
   */
  const animate = (
    targets: gsap.TweenTarget | null | undefined,
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars,
  ) => {
    if (!import.meta.client || prefersReducedMotion.value || !targets) return

    gsap.set(targets, fromVars)

    if (!isHorizontalMode.value) {
      const createScrollTrigger = (trigger: Element) => ({
        trigger,
        start: 'top 75%',
        once: true,
      })

      if (targets instanceof NodeList || Array.isArray(targets)) {
        const baseDelay = typeof toVars.delay === 'number' ? toVars.delay : 0
        const staggerAmount =
          typeof toVars.stagger === 'number' ? toVars.stagger : 0

        Array.from(targets).forEach((target, i) => {
          animations.push(
            gsap.to(target, {
              ...toVars,
              stagger: undefined,
              delay: baseDelay + i * staggerAmount,
              scrollTrigger: createScrollTrigger(target as Element),
            }),
          )
        })
      } else {
        const trigger =
          typeof targets === 'string'
            ? (document.querySelector(targets) ?? _sectionRef.value)
            : targets instanceof Element
              ? targets
              : _sectionRef.value

        animations.push(
          gsap.to(targets, {
            ...toVars,
            scrollTrigger: createScrollTrigger(trigger as Element),
          }),
        )
      }
    } else {
      pendingAnimations.push({ targets, fromVars, toVars })
    }
  }

  /**
   * Play all stored animations (for horizontal mode)
   */
  const playAnimations = () => {
    if (hasAnimated.value || prefersReducedMotion.value) return
    hasAnimated.value = true

    pendingAnimations.forEach(({ targets, toVars }) => {
      const tween = gsap.to(targets, toVars)
      animations.push(tween)
    })
  }

  /**
   * Calculate the progress threshold for this section
   */
  const getSectionThreshold = () => {
    if (sectionIndex === 0) return 0
    // Trigger slightly before section is centered
    return Math.max(0, (sectionIndex - 0.3) / (totalSections - 1))
  }

  // Watch for section becoming active in horizontal mode
  let stopWatcher: (() => void) | null = null

  onMounted(() => {
    nextTick(() => {
      isHorizontalMode.value = checkHorizontalMode()

      // Setup watcher for horizontal mode
      if (isHorizontalMode.value && scrollContext) {
        const threshold = getSectionThreshold()

        // Section 0 (Hero) plays immediately
        if (sectionIndex === 0) {
          setTimeout(() => playAnimations(), 100)
        } else {
          stopWatcher = watch(
            () => scrollContext.progress.value,
            (currentProgress) => {
              if (!hasAnimated.value && currentProgress >= threshold) {
                playAnimations()
              }
            },
            { immediate: true },
          )
        }
      }
    })
  })

  onBeforeUnmount(() => {
    // Kill all animations
    animations.forEach((anim) => anim.kill())
    animations.length = 0
    pendingAnimations.length = 0

    // Stop watcher
    if (stopWatcher) {
      stopWatcher()
      stopWatcher = null
    }
  })

  return {
    isHorizontalMode: computed(() => isHorizontalMode.value),
    hasAnimated: computed(() => hasAnimated.value),
    animate,
    playAnimations,
  }
}
