/**
 * Centralized breakpoint definitions
 * Matches Tailwind CSS default breakpoints
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS;
export type BreakpointValue = (typeof BREAKPOINTS)[Breakpoint];

// Helper to get CSS media query string
export const getMediaQuery = (bp: Breakpoint): string =>
  `(min-width: ${BREAKPOINTS[bp]}px)`
