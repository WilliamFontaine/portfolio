import type { MaybeElement } from '@vueuse/core'
import type { Ref } from 'vue'
import { splitText } from '~/utils/animations/splitText'

/**
 * Animation preset configuration
 */
export interface AnimationPreset {
  /** Initial state (from) */
  from: gsap.TweenVars;
  /** Final state (to) */
  to: Omit<gsap.TweenVars, 'delay'>;
  /** Delay before animation starts (in seconds) */
  delay?: number;
}

/**
 * Element animation configuration
 */
export interface ElementAnimation {
  /** Ref to the element to animate */
  ref?: Ref<MaybeElement | null | undefined>;
  /** CSS selector for querying elements (alternative to ref) */
  selector?: string;
  /** Parent element to query within (required if using selector) */
  parent?: Ref<MaybeElement | null | undefined>;
  /** Preset name or custom animation config */
  preset?: AnimationPresetName | AnimationPreset;
  /** Override delay */
  delay?: number;
  /** Text split mode (for text animations) */
  splitMode?: 'chars' | 'words' | 'lines';
  /** Stagger amount (for arrays or split text) */
  stagger?: number;
  /** Custom animation function (for complex cases) */
  custom?: (elements: NodeListOf<Element>) => void;
}

/**
 * Built-in animation preset names
 */
export type AnimationPresetName =
  | 'fadeUp'
  | 'fadeIn'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleUp'
  | 'alternatingSlide';

/**
 * Built-in animation presets
 */
const BUILT_IN_PRESETS: Record<
  AnimationPresetName,
  Omit<AnimationPreset, 'delay'>
> = {
  fadeUp: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.6, ease: EASING.smooth },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.6, ease: EASING.smooth },
  },
  slideLeft: {
    from: { opacity: 0, x: 30 },
    to: { opacity: 1, x: 0, duration: 0.6, ease: EASING.smooth },
  },
  slideRight: {
    from: { opacity: 0, x: -30 },
    to: { opacity: 1, x: 0, duration: 0.6, ease: EASING.smooth },
  },
  scaleUp: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: EASING.smooth },
  },
  // Special preset for alternating timeline items
  alternatingSlide: {
    from: { opacity: 0, x: 0 }, // x will be set per-element
    to: { opacity: 1, x: 0, duration: 0.6, ease: EASING.smooth },
  },
}

/**
 * Enhanced declarative animation composable
 * Supports refs, selectors, custom animations, and complex patterns
 *
 * @example Simple refs
 * ```ts
 * useSectionAnimations({
 *   sectionRef,
 *   sectionIndex: 0,
 *   animations: [
 *     { ref: titleRef, preset: 'fadeUp', delay: 0.1 },
 *     { ref: subtitleRef, preset: 'fadeUp', delay: 0.2 },
 *   ]
 * })
 * ```
 *
 * @example Query selectors with stagger
 * ```ts
 * useSectionAnimations({
 *   sectionRef,
 *   sectionIndex: 2,
 *   animations: [
 *     { ref: titleRef, preset: 'fadeUp' },
 *     {
 *       selector: '.timeline-item',
 *       parent: timelineRef,
 *       preset: 'alternatingSlide',
 *       stagger: 0.2,
 *       custom: (elements) => {
 *         elements.forEach((el, idx) => {
 *           gsap.set(el, { x: idx % 2 === 0 ? -50 : 50 })
 *         })
 *       }
 *     },
 *   ]
 * })
 * ```
 */
export function useSectionAnimations(config: {
  sectionRef: Ref<HTMLElement | undefined>;
  sectionIndex: number;
  animations: ElementAnimation[];
  /** Base delay to add to all animations (defaults to 0) */
  baseDelay?: number;
  /** Stagger delay between animations (creates smooth flow) */
  flowStagger?: number;
}) {
  const {
    sectionRef,
    sectionIndex,
    animations,
    baseDelay = 0,
    flowStagger = 0,
  } = config
  const { animate } = useSectionAnimation({ sectionRef, sectionIndex })

  /**
   * Execute all configured animations
   */
  function animateElements() {
    animations.forEach((anim, animIndex) => {
      // Get target elements
      let targets: gsap.TweenTarget | null = null
      if (anim.ref?.value) {
        targets = anim.ref.value
      } else if (anim.selector && anim.parent?.value) {
        const parentEl = anim.parent.value as HTMLElement
        if (parentEl && 'querySelectorAll' in parentEl) {
          const elements = parentEl.querySelectorAll(anim.selector)
          if (!elements || elements.length === 0) return
          targets = elements
        } else {
          return
        }
      } else {
        return // No valid target
      }

      if (!targets) return

      // Handle custom animations
      if (anim.custom && anim.selector && anim.parent?.value) {
        const parentEl = anim.parent.value as HTMLElement
        if (parentEl && 'querySelectorAll' in parentEl) {
          const elements = parentEl.querySelectorAll(anim.selector)
          anim.custom(elements)
        }
      }

      // Resolve preset
      let preset: AnimationPreset
      if (typeof anim.preset === 'string') {
        const builtIn = BUILT_IN_PRESETS[anim.preset]
        preset = {
          ...builtIn,
          delay: anim.delay ?? 0,
        }
      } else if (anim.preset) {
        preset = anim.preset
      } else {
        // Default to fadeUp if no preset specified
        preset = {
          ...BUILT_IN_PRESETS.fadeUp,
          delay: anim.delay ?? 0,
        }
      }

      // Calculate final delay with flow stagger
      const finalDelay =
        baseDelay + (anim.delay ?? preset.delay ?? 0) + animIndex * flowStagger

      // Handle text splitting
      if (anim.splitMode && anim.ref?.value) {
        // Make parent visible first
        gsap.set(anim.ref.value, { opacity: 1 })

        const result = splitText(anim.ref.value as HTMLElement, anim.splitMode)
        animate(result.elements, preset.from, {
          ...preset.to,
          delay: finalDelay,
          stagger: anim.stagger ?? 0.03,
        })
      } else {
        // Standard animation
        animate(targets, preset.from, {
          ...preset.to,
          delay: finalDelay,
          stagger: anim.stagger,
        })
      }
    })
  }

  // Auto-execute on mount
  useAnimateOnMount(() => {
    animateElements()
  })

  return {
    animateElements,
  }
}

/**
 * Helper to create alternating slide animations (left/right pattern)
 * Perfect for timeline items
 */
export function createAlternatingSlide(
  selector: string,
  parent: Ref<MaybeElement | null | undefined>,
  options: {
    startDelay?: number;
    stagger?: number;
    distance?: number;
  } = {},
): ElementAnimation {
  const { startDelay = 0, stagger = 0.2, distance = 50 } = options

  return {
    selector,
    parent,
    preset: 'alternatingSlide',
    delay: startDelay,
    stagger,
    custom: (elements) => {
      // Set initial position based on index (left/right alternating)
      Array.from(elements).forEach((el: any, idx: number) => {
        gsap.set(el, { x: idx % 2 === 0 ? -distance : distance })
      })
    },
  }
}

/**
 * Helper to create staggered grid animations
 * Perfect for skill cards or project cards
 */
export function createGridAnimation(
  selector: string,
  parent: Ref<MaybeElement | null | undefined>,
  options: {
    preset?: AnimationPresetName;
    startDelay?: number;
    stagger?: number;
  } = {},
): ElementAnimation {
  const { preset = 'scaleUp', startDelay = 0, stagger = 0.05 } = options

  return {
    selector,
    parent,
    preset,
    delay: startDelay,
    stagger,
  }
}
