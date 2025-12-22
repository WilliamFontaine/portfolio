<script setup lang="ts">
const { theme, toggleTheme } = useTheme()
const { t } = useI18n()

const buttonRef = ref<HTMLButtonElement>()
const iconRef = ref<HTMLElement>()

// Compute icon based on theme value
const currentIcon = computed(() => {
  const themeValue = theme.value
  if (themeValue === 'light') return 'lucide:sun'
  if (themeValue === 'dark') return 'lucide:moon'
  return 'lucide:monitor'
})

const currentLabel = computed(() => {
  const themeValue = theme.value
  if (themeValue === 'light') return t('theme.light')
  if (themeValue === 'dark') return t('theme.dark')
  return t('theme.system')
})

const iconColor = computed(() => {
  const themeValue = theme.value
  if (themeValue === 'light') return 'text-orange-400'
  if (themeValue === 'dark') return 'text-teal-400'
  return 'text-muted-foreground'
})

const handleToggle = () => {
  toggleTheme()

  // Animate icon
  const iconEl = iconRef.value
  if (iconEl) {
    gsap.fromTo(
      iconEl,
      { rotation: 0, scale: 1 },
      {
        rotation: 360,
        scale: 0.8,
        duration: 0.4,
        ease: 'back.out(1.7)',
        onComplete: () => {
          gsap.to(iconEl, { scale: 1, duration: 0.2 })
        },
      },
    )
  }
}

onMounted(() => {
  // Entrance animation
  const buttonEl = buttonRef.value
  if (buttonEl) {
    gsap.from(buttonEl, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      delay: 1.5,
      ease: 'back.out(1.7)',
    })
  }

  // Keyboard shortcut: Ctrl/Cmd + Shift + D
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'D') {
      e.preventDefault()
      handleToggle()
    }
  }

  window.addEventListener('keydown', handleKeydown)

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<template>
  <ClientOnly>
    <Button
      ref="buttonRef"
      variant="outline"
      size="icon"
      class="group fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full border-border/50 bg-card/80 backdrop-blur-md transition-all hover:border-teal-500/50 hover:bg-teal-500/10 hover:scale-110 active:scale-95 lg:bottom-8 lg:right-8"
      :aria-label="currentLabel"
      :title="`${currentLabel} (Ctrl+Shift+D)`"
      @click="handleToggle"
    >
      <div ref="iconRef" class="flex items-center justify-center">
        <Icon
          :name="currentIcon"
          class="h-5 w-5 transition-colors"
          :class="iconColor"
        />
      </div>

      <!-- Tooltip -->
      <span
        class="pointer-events-none absolute bottom-full mb-2 whitespace-nowrap rounded-md bg-card/90 px-3 py-1.5 text-xs font-medium opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
      >
        {{ currentLabel }}
      </span>
    </Button>
  </ClientOnly>
</template>
