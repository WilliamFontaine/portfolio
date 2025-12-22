export type ParallaxDirection = 'vertical' | 'horizontal';

export interface UseParallaxOptions {
  speed?: number;
  direction?: ParallaxDirection;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  disabled?: boolean;
}

/**
 * Composable for parallax scrolling effects
 * Elements move at different speeds relative to scroll
 */
export function useParallax(
  element: Ref<HTMLElement | undefined>,
  options: UseParallaxOptions = {},
) {
  const {
    speed = 0.5,
    direction = 'vertical',
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
    disabled = false,
  } = options

  const { prefersReducedMotion } = useBreakpoints()

  let animation: gsap.core.Tween | null = null

  const animate = () => {
    if (!element.value || !import.meta.client) return

    // Skip parallax for users who prefer reduced motion
    if (disabled || prefersReducedMotion.value) return

    const distance = 100 * speed
    const axis = direction === 'vertical' ? 'y' : 'x'

    animation = gsap.fromTo(
      element.value,
      { [axis]: -distance },
      {
        [axis]: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: element.value,
          start,
          end,
          scrub,
        },
      },
    )
  }

  const kill = () => {
    if (animation) {
      const st = animation.scrollTrigger
      if (st) st.kill()
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

/**
 * Composable for parallax layers - multiple elements moving at different speeds
 */
export function useParallaxLayers(
  container: Ref<HTMLElement | undefined>,
  options: {
    layers: { selector: string; speed: number }[];
    direction?: ParallaxDirection;
    start?: string;
    end?: string;
  },
) {
  const {
    layers,
    direction = 'vertical',
    start = 'top bottom',
    end = 'bottom top',
  } = options

  const { prefersReducedMotion } = useBreakpoints()

  const animations: gsap.core.Tween[] = []

  const animate = () => {
    if (!container.value || !import.meta.client) return

    // Skip parallax for users who prefer reduced motion
    if (prefersReducedMotion.value) return

    layers.forEach(({ selector, speed }) => {
      const elements = container.value!.querySelectorAll(selector)
      if (elements.length === 0) return

      const distance = 100 * speed
      const axis = direction === 'vertical' ? 'y' : 'x'

      const anim = gsap.fromTo(
        elements,
        { [axis]: -distance },
        {
          [axis]: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: container.value,
            start,
            end,
            scrub: true,
          },
        },
      )

      animations.push(anim)
    })
  }

  const kill = () => {
    animations.forEach((anim) => {
      const st = anim.scrollTrigger
      if (st) st.kill()
      anim.kill()
    })
    animations.length = 0
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

/**
 * Composable for scroll-based opacity/blur effects
 * Elements fade in/out or blur based on scroll position
 */
export function useScrollFade(
  element: Ref<HTMLElement | undefined>,
  options: {
    fadeIn?: boolean;
    fadeOut?: boolean;
    blur?: boolean;
    start?: string;
    end?: string;
  } = {},
) {
  const {
    fadeIn = true,
    fadeOut = false,
    blur = false,
    start = 'top 80%',
    end = 'bottom 20%',
  } = options

  const { prefersReducedMotion } = useBreakpoints()

  let animation: gsap.core.Timeline | null = null

  const animate = () => {
    if (!element.value || !import.meta.client) return

    // Skip for reduced motion
    if (prefersReducedMotion.value) {
      gsap.set(element.value, { opacity: 1, filter: 'none' })
      return
    }

    animation = gsap.timeline({
      scrollTrigger: {
        trigger: element.value,
        start,
        end,
        scrub: true,
      },
    })

    const fromVars: gsap.TweenVars = {}
    const toVars: gsap.TweenVars = {}
    const outVars: gsap.TweenVars = {}

    if (fadeIn) {
      fromVars.opacity = 0
      toVars.opacity = 1
    }

    if (blur) {
      fromVars.filter = 'blur(10px)'
      toVars.filter = 'blur(0px)'
    }

    if (fadeOut) {
      outVars.opacity = 0
      if (blur) outVars.filter = 'blur(10px)'
    }

    // Set initial state
    gsap.set(element.value, fromVars)

    // Animate in
    animation.to(element.value, {
      ...toVars,
      duration: fadeOut ? 0.5 : 1,
    })

    // Animate out if needed
    if (fadeOut) {
      animation.to(element.value, {
        ...outVars,
        duration: 0.5,
      })
    }
  }

  const kill = () => {
    if (animation) {
      const st = animation.scrollTrigger
      if (st) st.kill()
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

/**
 * Composable for horizontal scroll progress indicator
 */
export function useScrollProgress(
  progressBar: Ref<HTMLElement | undefined>,
  container?: Ref<HTMLElement | undefined>,
) {
  let animation: gsap.core.Tween | null = null

  const animate = () => {
    if (!progressBar.value || !import.meta.client) return

    animation = gsap.to(progressBar.value, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: container?.value || document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })

    // Set initial state
    gsap.set(progressBar.value, {
      scaleX: 0,
      transformOrigin: 'left center',
    })
  }

  const kill = () => {
    if (animation) {
      const st = animation.scrollTrigger
      if (st) st.kill()
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
