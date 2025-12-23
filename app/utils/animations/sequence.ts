import type { MaybeElement } from '@vueuse/core'
import type { Ref } from 'vue'

/**
 * Creates a sequence of fade-up animations with automatic delay increments
 * Useful for quickly animating a list of elements in order
 *
 * @param elements - Array of element refs to animate
 * @param options - Animation options
 * @returns Array of animation configs for useSectionAnimations
 *
 * @example
 * ```ts
 * const animations = createFadeUpSequence(
 *   [titleRef, subtitleRef, descriptionRef],
 *   { startDelay: 0.1, increment: 0.1 }
 * )
 * ```
 */
export function createFadeUpSequence(
  elements: Ref<MaybeElement | null | undefined>[],
  options: {
    /** Delay before first animation (default: 0.1) */
    startDelay?: number;
    /** Delay increment between animations (default: 0.1) */
    increment?: number;
  } = {},
) {
  const { startDelay = 0.1, increment = 0.1 } = options

  return elements.map((ref, index) => ({
    ref,
    preset: 'fadeUp' as const,
    delay: startDelay + index * increment,
  }))
}

/**
 * Creates a staggered animation sequence with custom preset
 *
 * @param elements - Array of element refs to animate
 * @param preset - Animation preset name
 * @param options - Animation options
 * @returns Array of animation configs for useSectionAnimations
 *
 * @example
 * ```ts
 * const animations = createSequence(
 *   [card1Ref, card2Ref, card3Ref],
 *   'scaleUp',
 *   { startDelay: 0.2, increment: 0.15 }
 * )
 * ```
 */
export function createSequence(
  elements: Ref<MaybeElement | null | undefined>[],
  preset: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp',
  options: {
    startDelay?: number;
    increment?: number;
  } = {},
) {
  const { startDelay = 0.1, increment = 0.1 } = options

  return elements.map((ref, index) => ({
    ref,
    preset,
    delay: startDelay + index * increment,
  }))
}
