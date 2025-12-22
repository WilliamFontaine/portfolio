<script setup lang="ts">
import { useHorizontalScroll } from '~/composables/useHorizontalScroll'

const { t } = useI18n()

const containerRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()

const sectionsCount = 6

const { progress, currentSection, scrollToSection, isHorizontalMode } =
  useHorizontalScroll({
    container: containerRef,
    wrapper: wrapperRef,
    sectionsCount,
  })

const sectionNames = computed(() => [
  'Hero',
  t('nav.about'),
  t('nav.experience'),
  t('nav.projects'),
  t('nav.skills'),
  t('nav.contact'),
])

// Provide scroll context to children
provide('scrollContext', {
  progress,
  currentSection,
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative"
    :class="isHorizontalMode ? 'h-screen overflow-hidden' : 'min-h-screen'"
  >
    <!-- Three.js Background -->
    <ThreeBackground :progress="progress" />

    <!-- Sections wrapper -->
    <div
      ref="wrapperRef"
      class="will-change-transform"
      :class="isHorizontalMode ? 'flex h-full' : 'flex flex-col'"
      :style="isHorizontalMode ? { width: `${sectionsCount * 100}vw` } : {}"
    >
      <SectionsHeroSection />
      <SectionsAboutSection />
      <SectionsExperienceSection />
      <SectionsProjectsSection />
      <SectionsSkillsSection />
      <SectionsContactSection />
    </div>

    <!-- Section indicator -->
    <nav
      class="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      <div
        v-for="(name, idx) in sectionNames"
        :key="idx"
        class="group relative flex items-center justify-end"
      >
        <!-- Label -->
        <span
          class="absolute right-8 whitespace-nowrap rounded-md bg-card/90 px-2 py-1 text-xs font-medium opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
        >
          {{ name }}
        </span>

        <!-- Dot -->
        <button
          class="h-3 w-3 rounded-full transition-all"
          :class="
            currentSection === idx
              ? 'scale-125 bg-teal-400 shadow-lg shadow-teal-400/50'
              : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
          "
          :aria-label="t('a11y.goToSection', { section: name })"
          @click="scrollToSection(idx)"
        />
      </div>
    </nav>

    <!-- Progress bar -->
    <div class="fixed bottom-0 left-0 z-50 h-1 w-full bg-muted/30">
      <div
        class="h-full bg-gradient-to-r from-teal-400 to-orange-400 transition-all duration-100"
        :style="{ width: `${progress * 100}%` }"
      />
    </div>
  </div>
</template>
