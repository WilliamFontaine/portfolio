import { usePreferredColorScheme, useStorage } from '@vueuse/core'

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  // System preference detection
  const systemPreference = usePreferredColorScheme()

  // User preference (persisted to localStorage)
  const userTheme = useStorage<Theme>('theme', 'system')

  // Computed dark mode state
  const isDark = computed(() => {
    if (userTheme.value === 'system') {
      return systemPreference.value === 'dark'
    }
    return userTheme.value === 'dark'
  })

  // Apply theme to DOM with optional transition
  const applyTheme = (dark: boolean, withTransition = true) => {
    if (!import.meta.client) return

    const html = document.documentElement

    // Use View Transitions API if available and transitions enabled
    if (
      withTransition &&
      'startViewTransition' in document &&
      typeof (document as any).startViewTransition === 'function'
    ) {
      (document as any).startViewTransition(() => {
        html.classList.toggle('dark', dark)
      })
    } else {
      // Fallback: direct class toggle
      html.classList.toggle('dark', dark)
    }
  }

  // Set theme
  const setTheme = (theme: Theme) => {
    userTheme.value = theme
    const dark =
      theme === 'system' ? systemPreference.value === 'dark' : theme === 'dark'
    applyTheme(dark)
  }

  // Toggle between light and dark (cycles through: light → dark → system)
  const toggleTheme = () => {
    if (userTheme.value === 'light') {
      setTheme('dark')
    } else if (userTheme.value === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  // Simple toggle between light and dark only
  const toggleDark = () => {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  // Sync on mount
  onMounted(() => {
    applyTheme(isDark.value, false)
  })

  // Watch system preference changes
  watch(systemPreference, () => {
    if (userTheme.value === 'system') {
      applyTheme(isDark.value)
    }
  })

  return {
    isDark: readonly(isDark),
    theme: readonly(userTheme),
    systemPreference: readonly(
      computed(() => systemPreference.value as 'light' | 'dark'),
    ),
    setTheme,
    toggleTheme,
    toggleDark,
  }
}
