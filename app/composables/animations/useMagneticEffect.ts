export interface UseMagneticEffectOptions {
  strength?: number;
  ease?: number;
  scale?: number;
  disabled?: boolean;
}

/**
 * Helper to get the actual DOM element from a ref
 * Handles both native elements and Vue component instances
 */
function getElement(
  ref: Ref<HTMLElement | { $el?: HTMLElement } | undefined>,
): HTMLElement | null {
  if (!ref.value) return null

  // If it's already an HTMLElement
  if (ref.value instanceof HTMLElement) {
    return ref.value
  }

  // If it's a Vue component instance with $el
  if (
    typeof ref.value === 'object' &&
    '$el' in ref.value &&
    ref.value.$el instanceof HTMLElement
  ) {
    return ref.value.$el
  }

  return null
}

/**
 * Composable for magnetic hover effect on interactive elements
 * The element subtly follows the cursor when hovered, creating a magnetic pull effect
 */
export function useMagneticEffect(
  element: Ref<HTMLElement | { $el?: HTMLElement } | undefined>,
  options: UseMagneticEffectOptions = {},
) {
  const {
    strength = 0.3,
    ease = 0.15,
    scale = 1.05,
    disabled = false,
  } = options

  const { prefersReducedMotion, isTouchDevice } = useBreakpoints()

  let domElement: HTMLElement | null = null
  let bounds: DOMRect | null = null
  let rafId: number | null = null
  let isHovering = false
  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  const updatePosition = () => {
    if (!domElement || !isHovering) return

    // Smooth interpolation
    currentX = lerp(currentX, targetX, ease)
    currentY = lerp(currentY, targetY, ease)

    gsap.set(domElement, {
      x: currentX,
      y: currentY,
    })

    // Continue animation if still moving
    if (
      Math.abs(currentX - targetX) > 0.01 ||
      Math.abs(currentY - targetY) > 0.01
    ) {
      rafId = requestAnimationFrame(updatePosition)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!domElement || !bounds) return

    const centerX = bounds.left + bounds.width / 2
    const centerY = bounds.top + bounds.height / 2

    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY

    targetX = deltaX * strength
    targetY = deltaY * strength

    if (!rafId) {
      rafId = requestAnimationFrame(updatePosition)
    }
  }

  const handleMouseEnter = () => {
    if (!domElement) return

    bounds = domElement.getBoundingClientRect()
    isHovering = true

    gsap.to(domElement, {
      scale,
      duration: 0.3,
      ease: 'power2.out',
    })

    rafId = requestAnimationFrame(updatePosition)
  }

  const handleMouseLeave = () => {
    if (!domElement) return

    isHovering = false
    targetX = 0
    targetY = 0

    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }

    gsap.to(domElement, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  const init = () => {
    if (!import.meta.client) return

    domElement = getElement(element)
    if (!domElement) return

    // Don't apply magnetic effect on touch devices or when reduced motion is preferred
    if (disabled || prefersReducedMotion.value || isTouchDevice.value) return

    domElement.addEventListener('mouseenter', handleMouseEnter)
    domElement.addEventListener('mousemove', handleMouseMove)
    domElement.addEventListener('mouseleave', handleMouseLeave)
  }

  const destroy = () => {
    if (!domElement) return

    domElement.removeEventListener('mouseenter', handleMouseEnter)
    domElement.removeEventListener('mousemove', handleMouseMove)
    domElement.removeEventListener('mouseleave', handleMouseLeave)

    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }

    domElement = null
  }

  onMounted(() => {
    nextTick(() => {
      init()
    })
  })

  onBeforeUnmount(() => {
    destroy()
  })

  // Re-init when touch device status changes
  watch(isTouchDevice, () => {
    destroy()
    init()
  })

  return {
    init,
    destroy,
  }
}

/**
 * Composable for magnetic effect on button content (icon/text moves, button stays)
 * Creates a more subtle effect where only the inner content follows the cursor
 */
export function useMagneticContent(
  button: Ref<HTMLElement | { $el?: HTMLElement } | undefined>,
  content: Ref<HTMLElement | { $el?: HTMLElement } | undefined>,
  options: UseMagneticEffectOptions = {},
) {
  const { strength = 0.2, ease = 0.1, disabled = false } = options

  const { prefersReducedMotion, isTouchDevice } = useBreakpoints()

  let buttonEl: HTMLElement | null = null
  let contentEl: HTMLElement | null = null
  let bounds: DOMRect | null = null
  let rafId: number | null = null
  let isHovering = false
  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  const updatePosition = () => {
    if (!contentEl || !isHovering) return

    currentX = lerp(currentX, targetX, ease)
    currentY = lerp(currentY, targetY, ease)

    gsap.set(contentEl, {
      x: currentX,
      y: currentY,
    })

    if (
      Math.abs(currentX - targetX) > 0.01 ||
      Math.abs(currentY - targetY) > 0.01
    ) {
      rafId = requestAnimationFrame(updatePosition)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonEl || !bounds) return

    const centerX = bounds.left + bounds.width / 2
    const centerY = bounds.top + bounds.height / 2

    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY

    // Limit movement to a percentage of the button size
    const maxMove = Math.min(bounds.width, bounds.height) * strength
    targetX = Math.max(-maxMove, Math.min(maxMove, deltaX * strength))
    targetY = Math.max(-maxMove, Math.min(maxMove, deltaY * strength))

    if (!rafId) {
      rafId = requestAnimationFrame(updatePosition)
    }
  }

  const handleMouseEnter = () => {
    if (!buttonEl) return

    bounds = buttonEl.getBoundingClientRect()
    isHovering = true
    rafId = requestAnimationFrame(updatePosition)
  }

  const handleMouseLeave = () => {
    if (!contentEl) return

    isHovering = false
    targetX = 0
    targetY = 0

    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }

    gsap.to(contentEl, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.6)',
    })
  }

  const init = () => {
    if (!import.meta.client) return

    buttonEl = getElement(button)
    contentEl = getElement(content)

    if (!buttonEl) return
    if (disabled || prefersReducedMotion.value || isTouchDevice.value) return

    buttonEl.addEventListener('mouseenter', handleMouseEnter)
    buttonEl.addEventListener('mousemove', handleMouseMove)
    buttonEl.addEventListener('mouseleave', handleMouseLeave)
  }

  const destroy = () => {
    if (!buttonEl) return

    buttonEl.removeEventListener('mouseenter', handleMouseEnter)
    buttonEl.removeEventListener('mousemove', handleMouseMove)
    buttonEl.removeEventListener('mouseleave', handleMouseLeave)

    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }

    buttonEl = null
    contentEl = null
  }

  onMounted(() => {
    nextTick(() => {
      init()
    })
  })

  onBeforeUnmount(() => {
    destroy()
  })

  return {
    init,
    destroy,
  }
}
