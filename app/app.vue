<script setup lang="ts">
// Theme is initialized via inline script in nuxt.config.ts (no flash)
// and synced via useTheme composable on mount
useTheme()
</script>

<template>
  <div
    class="min-h-screen bg-background text-foreground antialiased transition-colors duration-300"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Theme Toggle Button -->
    <ThemeToggle />
  </div>
</template>
