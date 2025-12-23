/**
 * Helper to get the actual DOM element from a Vue ref
 * Handles both native elements and Vue component instances
 * @param ref - Vue ref containing HTMLElement or component instance
 * @returns The actual HTMLElement or null if not found
 */
export function getElement(
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
