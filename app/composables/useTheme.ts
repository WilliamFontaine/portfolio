export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const colorMode = useColorMode()

  // Computed dark mode state
  const isDark = computed(() => colorMode.value === 'dark')

  // Current theme (light, dark, or system)
  const theme = computed(() => colorMode.preference as Theme)

  // Set theme
  const setTheme = (newTheme: Theme) => {
    colorMode.preference = newTheme
  }

  // Toggle between light → dark → system
  const toggleTheme = () => {
    if (colorMode.preference === 'light') {
      colorMode.preference = 'dark'
    } else if (colorMode.preference === 'dark') {
      colorMode.preference = 'system'
    } else {
      colorMode.preference = 'light'
    }
  }

  return {
    isDark: readonly(isDark),
    theme: readonly(theme),
    setTheme,
    toggleTheme,
  }
}
