/**
 * Animation presets for consistent GSAP animations across the portfolio
 */

export const REVEAL_PRESETS = {
  fadeUp: { from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 } },
  fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
  fadeDown: { from: { opacity: 0, y: -60 }, to: { opacity: 1, y: 0 } },
  scaleUp: { from: { opacity: 0, scale: 0.8 }, to: { opacity: 1, scale: 1 } },
  scaleDown: { from: { opacity: 0, scale: 1.2 }, to: { opacity: 1, scale: 1 } },
  slideLeft: { from: { opacity: 0, x: 100 }, to: { opacity: 1, x: 0 } },
  slideRight: { from: { opacity: 0, x: -100 }, to: { opacity: 1, x: 0 } },
  rotateIn: {
    from: { opacity: 0, rotation: -15 },
    to: { opacity: 1, rotation: 0 },
  },
} as const

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

export const DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  verySlow: 1.2,
} as const

export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  verySlow: 0.2,
} as const

export type RevealPreset = keyof typeof REVEAL_PRESETS;
export type Easing = keyof typeof EASING;
