import { useMediaQuery } from '@vueuse/core'

export function useBreakpoints() {
  // Media queries
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINTS.SM}px)`)
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)
  const isLg = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`)
  const isXl = useMediaQuery(`(min-width: ${BREAKPOINTS.XL}px)`)
  const isXxl = useMediaQuery(`(min-width: ${BREAKPOINTS.XXL}px)`)

  // Current breakpoint
  const current = computed<Breakpoint>(() => {
    if (isXxl.value) return 'XXL'
    if (isXl.value) return 'XL'
    if (isLg.value) return 'LG'
    if (isMd.value) return 'MD'
    return 'SM'
  })

  // Device categories
  const isMobile = computed(() => !isMd.value) // < 768px
  const isTablet = computed(() => isMd.value && !isLg.value) // 768-1023px
  const isDesktop = computed(() => isLg.value) // >= 1024px

  // Device tier for performance optimization
  const deviceTier = computed<'mobile' | 'tablet' | 'desktop'>(() => {
    if (isDesktop.value) return 'desktop'
    if (isTablet.value) return 'tablet'
    return 'mobile'
  })

  // Touch device detection
  const isTouchDevice = computed(() => {
    if (!import.meta.client) return false
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  })

  // Reduced motion preference
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
  )

  return {
    current,
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    prefersReducedMotion,
    deviceTier,
    // Expose individual breakpoints
    isSm,
    isMd,
    isLg,
    isXl,
    isXxl,
  }
}
