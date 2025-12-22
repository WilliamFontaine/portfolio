export function useTheme() {
  // Default to dark, will be synced with DOM on client
  const isDark = useState('theme-dark', () => true)

  // Sync with DOM state on client (the inline script already set the class)
  onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })

  return {
    isDark: readonly(isDark),
  }
}
