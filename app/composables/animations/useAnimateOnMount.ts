/**
 * Composable to execute animations on component mount
 * Handles common boilerplate: reduced motion check, client-side check, nextTick
 *
 * @param callback - Function containing animation calls
 *
 * @example
 * ```ts
 * const { animate } = useSectionAnimation({ ... })
 *
 * useAnimateOnMount(() => {
 *   animate(element1, fromVars, toVars)
 *   animate(element2, fromVars, toVars)
 * })
 * ```
 */
export function useAnimateOnMount(callback: () => void) {
  const { prefersReducedMotion } = useBreakpoints()

  onMounted(() => {
    // Skip animations for reduced motion or SSR
    if (prefersReducedMotion.value || !import.meta.client) return

    // Wait for DOM to be ready
    nextTick(() => {
      callback()
    })
  })
}
