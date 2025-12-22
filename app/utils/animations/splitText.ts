/**
 * Text splitting utility for character/word animations
 * Alternative to GSAP premium SplitText plugin
 */

export type SplitType = 'chars' | 'words' | 'lines';

export interface SplitTextResult {
  elements: HTMLElement[];
  revert: () => void;
}

/**
 * Split text into individual elements for animation
 * Preserves gradient text by applying it to each character with calculated positions
 */
export function splitText(
  element: HTMLElement,
  type: SplitType = 'chars',
): SplitTextResult {
  const originalHTML = element.innerHTML
  const originalText = element.textContent || ''
  const computedStyle = window.getComputedStyle(element)

  // Check if parent has gradient text (bg-clip-text pattern)
  const hasGradient =
    computedStyle.backgroundClip === 'text' ||
    computedStyle.webkitBackgroundClip === 'text'
  const gradientBg = hasGradient ? computedStyle.backgroundImage : null

  // Clear existing content
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }

  const elements: HTMLElement[] = []

  if (type === 'chars') {
    const chars = originalText.split('')
    const totalChars = chars.length

    chars.forEach((char, index) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      span.className = 'split-char'

      // Apply gradient to each char with position offset for seamless gradient
      if (gradientBg && gradientBg !== 'none') {
        span.style.backgroundImage = gradientBg
        span.style.backgroundClip = 'text'
        span.style.webkitBackgroundClip = 'text'
        span.style.color = 'transparent'
        span.style.backgroundSize = `${totalChars}em 100%`
        span.style.backgroundPosition = `${-index}em 0`
      }

      element.appendChild(span)
      elements.push(span)
    })

    // Remove gradient from parent to avoid double rendering
    if (hasGradient) {
      element.style.backgroundImage = 'none'
      element.style.color = 'inherit'
    }
  } else if (type === 'words') {
    const words = originalText.split(/\s+/)
    words.forEach((word, i) => {
      const span = document.createElement('span')
      span.textContent = word
      span.style.display = 'inline-block'
      span.className = 'split-word'
      element.appendChild(span)
      elements.push(span)

      if (i < words.length - 1) {
        element.appendChild(document.createTextNode(' '))
      }
    })
  } else if (type === 'lines') {
    const lines = originalText.split('\n')
    lines.forEach((line, i) => {
      const span = document.createElement('span')
      span.textContent = line
      span.style.display = 'block'
      span.className = 'split-line'
      element.appendChild(span)
      elements.push(span)

      if (i < lines.length - 1) {
        element.appendChild(document.createElement('br'))
      }
    })
  }

  const revert = () => {
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }
    element.innerHTML = originalHTML
    // Restore gradient on parent
    if (hasGradient) {
      element.style.backgroundImage = ''
      element.style.color = ''
    }
  }

  return { elements, revert }
}
