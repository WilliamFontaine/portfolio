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
