import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

interface UseHorizontalScrollOptions {
  container: Ref<HTMLElement | undefined>;
  wrapper: Ref<HTMLElement | undefined>;
  sectionsCount: number;
}

// Breakpoint for enabling horizontal scroll (matches Tailwind's lg)
const LG_BREAKPOINT = 1024

export function useHorizontalScroll(options: UseHorizontalScrollOptions) {
  const { container, wrapper, sectionsCount } = options

  const scrollTriggerInstance = ref<ScrollTrigger | null>(null)
  const progress = ref(0)
  const currentSection = ref(0)
  const isHorizontalMode = ref(false)

  const init = () => {
    if (!container.value || !wrapper.value || !import.meta.client) return

    // Only enable horizontal scroll on large screens
    if (window.innerWidth < LG_BREAKPOINT) {
      isHorizontalMode.value = false
      return
    }

    isHorizontalMode.value = true
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    const sections = wrapper.value.querySelectorAll('.horizontal-section')
    const totalWidth = sections.length * window.innerWidth

    const tween = gsap.to(wrapper.value, {
      x: () => -(totalWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container.value,
        pin: true,
        scrub: 0.8,
        end: () => `+=${totalWidth}`,
        // Gentle snap - only when scroll velocity is low
        snap: {
          snapTo: 1 / (sectionsCount - 1),
          duration: { min: 0.3, max: 0.6 },
          delay: 0.1,
          ease: 'power1.out',
          inertia: false,
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
      duration: 0.8,
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
    const shouldBeHorizontal = window.innerWidth >= LG_BREAKPOINT

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
