import { useBreakpoints } from './useBreakpoints'

export interface DeviceCapabilities {
  performanceTier: 'low' | 'medium' | 'high';
  supportsWebGL2: boolean;
  pixelRatio: number;
  maxTextureSize: number;
  recommendedNodeCount: number;
  recommendedConnectionDistance: number;
  shouldReduceEffects: boolean;
  updateFrequency: number; // frames to skip between updates
  enableBloom: boolean;
  enableDOF: boolean;
  enableTrails: boolean;
  enableGlow: boolean;
}

export function useDeviceCapabilities(): ComputedRef<DeviceCapabilities> {
  const { deviceTier, prefersReducedMotion } = useBreakpoints()

  return computed<DeviceCapabilities>(() => {
    if (!import.meta.client) {
      // SSR defaults
      return {
        performanceTier: 'medium',
        supportsWebGL2: false,
        pixelRatio: 1,
        maxTextureSize: 2048,
        recommendedNodeCount: 12,
        recommendedConnectionDistance: 50,
        shouldReduceEffects: false,
        updateFrequency: 3,
        enableBloom: false,
        enableDOF: false,
        enableTrails: false,
        enableGlow: false,
      }
    }

    // Detect WebGL2 support
    const canvas = document.createElement('canvas')
    const gl2 = canvas.getContext('webgl2')
    const supportsWebGL2 = !!gl2
    const maxTextureSize = gl2?.getParameter(gl2.MAX_TEXTURE_SIZE) ?? 2048

    const tier = deviceTier.value
    const dpr = window.devicePixelRatio || 1
    const shouldReduce = prefersReducedMotion.value

    // Performance tier based on device category and hardware
    let performanceTier: 'low' | 'medium' | 'high' = 'medium'
    if (tier === 'mobile') performanceTier = 'low'
    else if (tier === 'desktop' && supportsWebGL2 && dpr <= 2)
      performanceTier = 'high'

    // Node count based on tier
    const nodeCounts = {
      mobile: 8,
      tablet: 12,
      desktop: 20,
    }

    // Connection distance (tighter on mobile for fewer calculations)
    const connectionDistances = {
      mobile: 35,
      tablet: 45,
      desktop: 50,
    }

    // Update frequency (skip frames on lower-end devices)
    const updateFrequencies = {
      mobile: 5, // Update every 5 frames
      tablet: 3, // Update every 3 frames
      desktop: 2, // Update every 2 frames
    }

    // Pixel ratio capped for performance
    const cappedPixelRatio = Math.min(dpr, tier === 'mobile' ? 1.5 : 2)

    // Effect flags based on tier
    const enableBloom = performanceTier === 'high' && !shouldReduce
    const enableDOF = performanceTier === 'high' && !shouldReduce
    const enableTrails = performanceTier !== 'low' && !shouldReduce
    const enableGlow = performanceTier !== 'low' && !shouldReduce

    return {
      performanceTier,
      supportsWebGL2,
      pixelRatio: cappedPixelRatio,
      maxTextureSize,
      recommendedNodeCount: nodeCounts[tier],
      recommendedConnectionDistance: connectionDistances[tier],
      shouldReduceEffects: shouldReduce,
      updateFrequency: updateFrequencies[tier],
      enableBloom,
      enableDOF,
      enableTrails,
      enableGlow,
    }
  })
}
