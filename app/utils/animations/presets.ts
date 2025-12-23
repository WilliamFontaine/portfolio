/**
 * Animation presets for consistent GSAP animations across the portfolio
 */

/**
 * Easing functions for GSAP animations
 * Maps to common animation curves
 */
export const EASING = {
  smooth: 'power2.out',
  smoothIn: 'power2.in',
  smoothInOut: 'power2.inOut',
  bounce: 'elastic.out(1, 0.5)',
  bounceStrong: 'elastic.out(1.2, 0.4)',
  snap: 'power4.inOut',
  snapOut: 'power4.out',
  back: 'back.out(1.7)',
  backStrong: 'back.out(2.5)',
  expo: 'expo.out',
} as const

export type Easing = keyof typeof EASING;
