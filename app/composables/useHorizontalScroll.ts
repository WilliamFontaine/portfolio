interface UseHorizontalScrollOptions {
  container: Ref<HTMLElement | undefined>;
  wrapper: Ref<HTMLElement | undefined>;
  sectionsCount: number;
}

export function useHorizontalScroll(options: UseHorizontalScrollOptions) {
  const { container, wrapper, sectionsCount } = options
  const { prefersReducedMotion, isDesktop } = useBreakpoints()

  const scrollTriggerInstance = ref<ScrollTrigger | null>(null)
  const progress = ref(0)
  const currentSection = ref(0)
  const isHorizontalMode = ref(false)

  const init = () => {
    if (!container.value || !wrapper.value || !import.meta.client) return

    // Only enable horizontal scroll on large screens (use centralized breakpoint)
    if (!isDesktop.value) {
      isHorizontalMode.value = false
      return
    }

    isHorizontalMode.value = true

    const sections = wrapper.value.querySelectorAll('.horizontal-section')
    const totalWidth = sections.length * window.innerWidth

    // Respect reduced motion preference
    const shouldReduceMotion = prefersReducedMotion.value

    const tween = gsap.to(wrapper.value, {
      x: () => -(totalWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container.value,
        pin: true,
        scrub: shouldReduceMotion ? 0 : 1.2, // Smoother scroll with higher scrub value
        end: () => `+=${totalWidth}`,
        // Very gentle snap - only activates when user stops scrolling near a section
        snap: shouldReduceMotion
          ? undefined
          : {
              snapTo: (value) => {
                // Calculate which section we're closest to
                const sectionProgress = value * (sectionsCount - 1)
                const nearestSection = Math.round(sectionProgress)
                const distance = Math.abs(sectionProgress - nearestSection)

                // Only snap if VERY close to a section (within 8% threshold)
                // This allows free scrolling but gently guides to sections when appropriate
                if (distance > 0.08) return value

                // Snap to nearest section
                return nearestSection / (sectionsCount - 1)
              },
              duration: { min: 0.5, max: 1.0 }, // Smooth, slow snap
              delay: 0.3, // Longer delay - only snap after user stops scrolling
              ease: 'power2.inOut',
              inertia: true, // Preserve scroll momentum
            },
        onUpdate: (self) => {
          progress.value = self.progress
          currentSection.value = Math.min(
            Math.floor(self.progress * sectionsCount),
            sectionsCount - 1,
          )
        },
      },
    })

    scrollTriggerInstance.value = tween.scrollTrigger as ScrollTrigger
  }

  const scrollToSection = (index: number) => {
    if (!scrollTriggerInstance.value || !import.meta.client) return

    const st = scrollTriggerInstance.value
    // Calculate target progress: for n sections, progress ranges from 0 to 1
    // Section i should be at progress = i / (n - 1) for proper centering
    const targetProgress =
      index === 0
        ? 0
        : index === sectionsCount - 1
          ? 1
          : index / (sectionsCount - 1)
    const scrollY = st.start + (st.end - st.start) * targetProgress

    gsap.to(window, {
      scrollTo: { y: scrollY, autoKill: false },
      duration: prefersReducedMotion.value ? 0.1 : 0.8,
      ease: 'power2.inOut',
    })
  }

  const refresh = () => {
    ScrollTrigger.refresh()
  }

  const kill = () => {
    if (scrollTriggerInstance.value) {
      scrollTriggerInstance.value.kill()
      scrollTriggerInstance.value = null
    }
  }

  const handleResize = () => {
    const wasHorizontal = isHorizontalMode.value
    const shouldBeHorizontal = isDesktop.value

    if (wasHorizontal !== shouldBeHorizontal) {
      kill()
      // Reset wrapper transform if switching to vertical
      if (!shouldBeHorizontal && wrapper.value) {
        gsap.set(wrapper.value, { x: 0 })
      }
      init()
    } else if (shouldBeHorizontal) {
      refresh()
    }
  }

  onMounted(() => {
    nextTick(() => {
      init()
    })

    if (import.meta.client) {
      window.addEventListener('resize', handleResize)
    }
  })

  onBeforeUnmount(() => {
    kill()
    if (import.meta.client) {
      window.removeEventListener('resize', handleResize)
    }
  })

  return {
    progress: computed(() => progress.value),
    currentSection: computed(() => currentSection.value),
    isHorizontalMode: computed(() => isHorizontalMode.value),
    scrollToSection,
    refresh,
    kill,
  }
}
