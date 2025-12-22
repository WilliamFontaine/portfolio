export type TextAnimation = 'fade-up' | 'fade-in' | 'scale' | 'rotate' | 'blur';

export interface UseTextSplitOptions {
  type?: SplitType;
  animation?: TextAnimation;
  stagger?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  scrollTrigger?: boolean;
  once?: boolean;
}

export function useTextSplit(
  element: Ref<HTMLElement | undefined>,
  options: UseTextSplitOptions = {},
) {
  const {
    type = 'chars',
    animation = 'fade-up',
    stagger = STAGGER.fast,
    delay = 0,
    duration = DURATIONS.normal,
    ease = EASING.smooth,
    scrollTrigger = true,
    once = true,
  } = options

  const { prefersReducedMotion } = useBreakpoints()

  let splitResult: ReturnType<typeof splitText> | null = null
  let timeline: gsap.core.Timeline | null = null

  const getAnimationVars = (anim: TextAnimation) => {
    switch (anim) {
      case 'fade-up':
        return { from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } }
      case 'fade-in':
        return { from: { opacity: 0 }, to: { opacity: 1 } }
      case 'scale':
        return { from: { opacity: 0, scale: 0 }, to: { opacity: 1, scale: 1 } }
      case 'rotate':
        return {
          from: { opacity: 0, rotation: 90, transformOrigin: '0% 50%' },
          to: { opacity: 1, rotation: 0 },
        }
      case 'blur':
        return {
          from: { opacity: 0, filter: 'blur(10px)' },
          to: { opacity: 1, filter: 'blur(0px)' },
        }
      default:
        return { from: { opacity: 0 }, to: { opacity: 1 } }
    }
  }

  const animate = () => {
    if (!element.value || prefersReducedMotion.value) return

    splitResult = splitText(element.value, type)

    if (splitResult.elements.length === 0) return

    const { from, to } = getAnimationVars(animation)

    gsap.set(splitResult.elements, from)

    if (scrollTrigger) {
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element.value,
          start: 'top 85%',
          once,
        },
      })

      timeline.to(splitResult.elements, {
        ...to,
        duration,
        stagger,
        ease,
      })
    } else {
      gsap.to(splitResult.elements, {
        ...to,
        duration,
        stagger,
        delay,
        ease,
      })
    }
  }

  const revert = () => {
    if (timeline) {
      timeline.kill()
      timeline = null
    }
    if (splitResult) {
      splitResult.revert()
      splitResult = null
    }
  }

  onMounted(() => {
    nextTick(() => {
      animate()
    })
  })

  onBeforeUnmount(() => {
    revert()
  })

  return {
    animate,
    revert,
  }
}
