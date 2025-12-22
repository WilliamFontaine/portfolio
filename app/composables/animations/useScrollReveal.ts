import type { RevealPreset } from '~/utils/animations/presets'

export interface UseScrollRevealOptions {
  preset?: RevealPreset;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  end?: string;
  once?: boolean;
  stagger?: number;
  scrub?: boolean | number;
  markers?: boolean;
}

/**
 * Composable for scroll-triggered reveal animations
 * Uses GSAP ScrollTrigger for performant, scroll-based animations
 */
export function useScrollReveal(
  element: Ref<HTMLElement | undefined>,
  options: UseScrollRevealOptions = {},
) {
  const {
    preset = 'fadeUp',
    duration = DURATIONS.normal,
    delay = 0,
    ease = EASING.smooth,
    start = 'top 85%',
    end = 'bottom 15%',
    once = true,
    stagger = 0,
    scrub = false,
    markers = false,
  } = options

  const { prefersReducedMotion } = useBreakpoints()

  let animation: gsap.core.Tween | null = null
  let scrollTrigger: ScrollTrigger | null = null

  const animate = () => {
    if (!element.value || !import.meta.client) return

    // Skip animations for users who prefer reduced motion
    if (prefersReducedMotion.value) {
      gsap.set(element.value, { opacity: 1, clearProps: 'all' })
      return
    }

    const { from, to } = REVEAL_PRESETS[preset]

    // Set initial state
    gsap.set(element.value, from)

    // Create scroll-triggered animation
    animation = gsap.to(element.value, {
      ...to,
      duration: scrub ? 1 : duration,
      delay: scrub ? 0 : delay,
      ease: scrub ? 'none' : ease,
      stagger,
      scrollTrigger: {
        trigger: element.value,
        start,
        end: scrub ? end : undefined,
        once,
        scrub,
        markers,
        onEnter: () => {
          // Ensure element is visible when entering
        },
      },
    })

    scrollTrigger = animation.scrollTrigger as ScrollTrigger
  }

  const kill = () => {
    if (animation) {
      animation.kill()
      animation = null
    }
    if (scrollTrigger) {
      scrollTrigger.kill()
      scrollTrigger = null
    }
  }

  const refresh = () => {
    kill()
    animate()
  }

  onMounted(() => {
    nextTick(() => {
      animate()
    })
  })

  onBeforeUnmount(() => {
    kill()
  })

  return {
    animate,
    kill,
    refresh,
  }
}

/**
 * Composable for revealing multiple children elements with stagger
 */
export function useScrollRevealChildren(
  container: Ref<HTMLElement | undefined>,
  childSelector: string,
  options: UseScrollRevealOptions = {},
) {
  const {
    preset = 'fadeUp',
    duration = DURATIONS.normal,
    delay = 0,
    ease = EASING.smooth,
    start = 'top 85%',
    once = true,
    stagger = 0.1,
    markers = false,
  } = options

  const { prefersReducedMotion } = useBreakpoints()

  let animation: gsap.core.Tween | null = null

  const animate = () => {
    if (!container.value || !import.meta.client) return

    const children = container.value.querySelectorAll(childSelector)
    if (children.length === 0) return

    // Skip animations for users who prefer reduced motion
    if (prefersReducedMotion.value) {
      gsap.set(children, { opacity: 1, clearProps: 'all' })
      return
    }

    const { from, to } = REVEAL_PRESETS[preset]

    // Set initial state
    gsap.set(children, from)

    // Create staggered animation
    animation = gsap.to(children, {
      ...to,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger: container.value,
        start,
        once,
        markers,
      },
    })
  }

  const kill = () => {
    if (animation) {
      animation.kill()
      animation = null
    }
  }

  onMounted(() => {
    nextTick(() => {
      animate()
    })
  })

  onBeforeUnmount(() => {
    kill()
  })

  return {
    animate,
    kill,
  }
}
