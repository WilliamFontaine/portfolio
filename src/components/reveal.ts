export const reveal =
  'motion-safe:data-pending:not-data-in:translate-y-fade motion-safe:data-pending:not-data-in:opacity-0 motion-safe:data-in:transition motion-safe:data-in:duration-520'

export const stagger = 'motion-safe:data-in:nth-2:delay-90 motion-safe:data-in:nth-3:delay-180'

export function observeReveals() {
  const motion = matchMedia('(prefers-reduced-motion: no-preference)')
  if (!motion.matches) return
  const reveal = (block: Element) => {
    if (!block.hasAttribute('data-pending') || block.hasAttribute('data-in')) return
    block.toggleAttribute('data-in', true)
    blocks.unobserve(block)
    // The reveal's duration and delays would otherwise slow the block's hover transitions.
    void Promise.allSettled(block.getAnimations({ subtree: true }).map((a) => a.finished)).then(
      () => {
        block.removeAttribute('data-pending')
        block.removeAttribute('data-in')
      },
    )
  }
  const blocks = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  )
  for (const block of document.querySelectorAll('[data-reveal]')) {
    if (block.getBoundingClientRect().top <= innerHeight) continue
    block.toggleAttribute('data-pending', true)
    blocks.observe(block)
  }
  document.addEventListener('focusin', ({ target }) => {
    const block = (target as Element).closest('[data-pending]')
    if (block) reveal(block)
  })
  // Starting from no-preference, the first change is to reduce: stop and show every block.
  motion.addEventListener(
    'change',
    () => {
      blocks.disconnect()
      for (const block of document.querySelectorAll('[data-pending]')) {
        block.removeAttribute('data-pending')
        block.removeAttribute('data-in')
      }
    },
    { once: true },
  )
}
