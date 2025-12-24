/**
 * Magnetic effect configurations
 * Reusable presets for consistent interactive effects across components
 */
export const MAGNETIC_EFFECTS = {
  /**
   * Button magnetic effect - subtle movement for primary/secondary buttons
   */
  BUTTON: {
    strength: 0.15,
    scale: 1.02,
  } as UseMagneticEffectOptions,

  /**
   * Social link magnetic effect - more pronounced for social media icons
   */
  SOCIAL: {
    strength: 0.25,
    scale: 1.1,
  } as UseMagneticEffectOptions,
} as const

/**
 * Common animation delays for consistent timing across sections
 * Self-documenting values instead of magic numbers
 */
export const ANIMATION_DELAYS = {
  IMMEDIATE: 0,
  FAST: 0.1,
  NORMAL: 0.2,
  SLOW: 0.3,
  VERY_SLOW: 0.5,
} as const

/**
 * Common stagger values for sequential animations
 * Applied to arrays of elements for cascading effects
 */
export const STAGGER = {
  TIGHT: 0.025,
  CLOSE: 0.05,
  NORMAL: 0.1,
  WIDE: 0.15,
  VERY_WIDE: 0.2,
} as const
