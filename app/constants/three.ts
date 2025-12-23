/**
 * Three.js background configuration constants
 * Centralized values for the 3D background animation
 */

/** Number of main nodes (3D spheres) to render */
export const NODE_COUNT = 25

/** Number of background particles */
export const PARTICLE_COUNT = 60

/** Maximum distance for node connections (in units) */
export const CONNECTION_DISTANCE = 55

/** Number of depth layers for parallax effect */
export const DEPTH_LAYERS = 3

/** Color palette for Three.js elements */
export const THREE_COLORS = {
  TEAL: 0x2dd4bf,
  ORANGE: 0xfb923c,
  WHITE: 0xffffff,
} as const

/** Particle system configuration */
export const PARTICLE_CONFIG = {
  /** Particle size */
  SIZE: 0.8,
  /** Particle opacity */
  OPACITY: 0.15,
  /** Particle spread range */
  SPREAD: {
    X: 500,
    Y: 150,
    Z_MIN: -50,
    Z_MAX: -100,
  },
} as const

/** Node geometry configuration */
export const NODE_CONFIG = {
  /** Sphere geometry detail (segments) */
  GEOMETRY_DETAIL: 16,
  /** Layer opacity values */
  LAYER_OPACITY: {
    BACK: 0.25,
    MIDDLE: 0.4,
    FRONT: 0.55,
  },
  /** Layer scale multipliers */
  LAYER_SCALE: {
    BACK: 0.6,
    MIDDLE: 0.9,
    FRONT: 1.2,
  },
  /** Layer Z-depth positions */
  LAYER_Z_DEPTH: {
    BACK: -30,
    MIDDLE: 0,
    FRONT: 30,
  },
} as const

/** Camera configuration */
export const CAMERA_CONFIG = {
  /** Field of view in degrees */
  FOV: 60,
  /** Near clipping plane */
  NEAR: 0.1,
  /** Far clipping plane */
  FAR: 1000,
  /** Initial Z position */
  INITIAL_Z: 100,
  /** Max pixel ratio for performance */
  MAX_PIXEL_RATIO: 2,
} as const

/** Animation timing configuration */
export const ANIMATION_CONFIG = {
  /** Time delta for normal motion */
  TIME_DELTA_NORMAL: 0.003,
  /** Time delta for reduced motion */
  TIME_DELTA_REDUCED: 0.001,
  /** Float amplitude for normal motion */
  FLOAT_AMPLITUDE_NORMAL: 2,
  /** Float amplitude for reduced motion */
  FLOAT_AMPLITUDE_REDUCED: 0.5,
  /** Update connections every N frames */
  CONNECTION_UPDATE_INTERVAL: 3,
} as const

/** Mouse interaction configuration */
export const MOUSE_CONFIG = {
  /** Mouse influence smoothing factor */
  SMOOTHING: 0.05,
  /** Horizontal influence multiplier */
  INFLUENCE_X: 5,
  /** Vertical influence multiplier */
  INFLUENCE_Y: 3,
} as const

/** Parallax multipliers by layer */
export const PARALLAX_MULTIPLIERS = {
  BACK: 0.5,
  MIDDLE: 0.8,
  FRONT: 1.2,
} as const

/** Node positioning configuration */
export const NODE_POSITIONING = {
  /** Horizontal spacing between sections */
  SECTION_SPACING: 80,
  /** Random position variance */
  VARIANCE: {
    X: 70,
    Y: 60,
    Z: 20,
  },
  /** Section count for positioning */
  SECTION_COUNT: 6,
  /** Center offset for X positioning */
  CENTER_OFFSET: 2.5,
} as const

/** Node velocity ranges */
export const VELOCITY_RANGES = {
  X: 0.006,
  Y: 0.006,
  Z: 0.003,
} as const

/** Boundary limits for node drift */
export const BOUNDARIES = {
  X: 200,
  Y: 60,
} as const

/** Connection line configuration */
export const CONNECTION_CONFIG = {
  /** Maximum opacity for connections */
  MAX_OPACITY: 0.2,
} as const

/** Scroll-based camera movement */
export const CAMERA_MOVEMENT = {
  /** Range of camera X movement */
  RANGE: 400,
  /** Camera offset for centering */
  OFFSET: 200,
  /** Smoothing factor for camera follow */
  SMOOTHING: 0.05,
  /** Mouse Y influence on camera */
  MOUSE_Y_INFLUENCE: 8,
} as const

/** Node rotation animation */
export const ROTATION_SPEEDS = {
  /** Particle rotation Y speed */
  PARTICLE_Y: 0.02,
  /** Particle rotation X speed */
  PARTICLE_X: 0.01,
} as const

/** Time-based oscillation speeds */
export const OSCILLATION_SPEEDS = {
  /** Y-axis oscillation multiplier */
  Y: 0.8,
  /** Z-axis oscillation multiplier */
  Z: 0.5,
  /** Z-axis amplitude multiplier */
  Z_AMPLITUDE: 0.75,
} as const

/** Scale animation configuration */
export const SCALE_CONFIG = {
  /** Minimum scale factor */
  MIN_SCALE: 0.5,
  /** Scale reduction per section distance */
  DISTANCE_FACTOR: 0.15,
  /** Section calculation divisor */
  SECTION_DIVISOR: 80,
  /** Section offset for calculation */
  SECTION_OFFSET: 200,
  /** Progress multiplier for current section */
  PROGRESS_MULTIPLIER: 5,
} as const

/** Opacity animation configuration */
export const OPACITY_CONFIG = {
  /** Opacity oscillation speed */
  OSCILLATION_SPEED: 1.5,
  /** Per-node phase offset */
  PHASE_OFFSET: 0.3,
  /** Oscillation amplitude */
  AMPLITUDE: 0.1,
} as const
