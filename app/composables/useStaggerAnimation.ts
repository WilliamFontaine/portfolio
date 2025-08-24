export const useStaggerAnimation = () => {
  const animateOnScroll = (selector: string, options: {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
  } = {}) => {
    if (import.meta.client) {
      const {
        threshold = 0.15,
        rootMargin = '0px 0px -100px 0px',
        once = false
      } = options

      const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            entry.target.classList.remove('animate')
          }
        })
      }, { threshold, rootMargin })

      // Observer les éléments
      const elements = document.querySelectorAll(selector)
      elements.forEach((el) => {
        el.classList.add('stagger-item')
        observer.observe(el)
      })

      return observer
    }
  }

  return { animateOnScroll }
}