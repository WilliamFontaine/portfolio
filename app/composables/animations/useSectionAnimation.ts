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

  // Pending animations for horizontal mode
  const pendingAnimations: Array<{
    targets: gsap.TweenTarget;
    fromVars: gsap.TweenVars;
    toVars: gsap.TweenVars;
  }> = []

  // Computed: horizontal mode when desktop on client-side
  const isHorizontalMode = computed(
    () => import.meta.client && isDesktop.value,
  )

  // ScrollTrigger config for vertical mode
  const createScrollTrigger = (trigger: Element) => ({
    trigger,
    start: 'top 75%',
    once: true,
  })

  // Resolve trigger element from targets
  const resolveTrigger = (targets: gsap.TweenTarget): Element => {
    if (typeof targets === 'string') {
      return document.querySelector(targets) ?? (_sectionRef.value as Element)
    }
    if (targets instanceof Element) {
      return targets
    }
    return _sectionRef.value as Element
  }

  // Animate array of targets in vertical mode
  const animateArrayVertical = (
    targets: Element[] | NodeList,
    toVars: gsap.TweenVars,
  ) => {
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
      if (targets instanceof NodeList || Array.isArray(targets)) {
        animateArrayVertical(targets, toVars)
      } else {
        const trigger = resolveTrigger(targets)
        animations.push(
          gsap.to(targets, {
            ...toVars,
            scrollTrigger: createScrollTrigger(trigger),
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
   * Triggers slightly before section is centered
   */
  const sectionThreshold = computed(() => {
    if (sectionIndex === 0) return 0
    return Math.max(0, (sectionIndex - 0.3) / (totalSections - 1))
  })

  // Watch for section becoming active in horizontal mode
  let stopWatcher: (() => void) | null = null

  onMounted(() => {
    nextTick(() => {
      // Setup watcher for horizontal mode
      if (isHorizontalMode.value && scrollContext) {
        // Section 0 (Hero) plays immediately
        if (sectionIndex === 0) {
          setTimeout(() => playAnimations(), 100)
        } else {
          stopWatcher = watch(
            () => scrollContext.progress.value,
            (currentProgress) => {
              if (
                !hasAnimated.value &&
                currentProgress >= sectionThreshold.value
              ) {
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
    isHorizontalMode,
    hasAnimated: readonly(hasAnimated),
    animate,
    playAnimations,
  }
}
