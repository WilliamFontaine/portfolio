<template>
  <div class="relative">
    <!-- Subtle visual separation -->
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-slate-700/50"></div>
    
    <!-- Floating elements with more colors -->
    <div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-indigo-400/15 to-emerald-400/15 rounded-full blur-xl animate-float"></div>
    <div class="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-cyan-400/15 to-orange-400/15 rounded-full blur-xl animate-float-delay"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-lg animate-bounce-soft"></div>
    
    <UContainer class="relative z-10">
      <div class="text-center py-8 sm:py-32 lg:py-40">
        <!-- Badge with more color -->
        <div class="mb-8">
          <UBadge 
            :label="t('hero.badge')" 
            variant="soft" 
            color="primary" 
            size="lg"
            class="section-badge hover:scale-105 transition-smooth cursor-default"
          />
        </div>

        <!-- Title with extended gradient -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span class="block text-slate-800 dark:text-slate-200">{{ t('hero.greeting') }}</span>
          <span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
            {{ t('hero.name') }}
          </span>
        </h1>

        <!-- Description -->
        <p class="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          {{ t('hero.description') }}
        </p>

        <!-- Specialization pills with more colors -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <UBadge 
            v-for="(skill, index) in specializations" 
            :key="skill"
            :label="t(`skills.technologies.${skill}`)"
            variant="outline" 
            size="md"
            :color="skillColors[index % skillColors.length]"
            class="hover:scale-110 transition-smooth cursor-default animate-color-pulse"
            :style="`animation-delay: ${index * 0.2}s`"
          />
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <UButton
            :to="heroLinks[0].to"
            :icon="heroLinks[0].icon"
            size="xl"
            class="group hover:scale-105 transition-smooth shadow-lg hover:shadow-xl"
          >
            {{ heroLinks[0].label }}
            <UIcon name="i-lucide-arrow-right" class="ml-2 group-hover:translate-x-1 transition-transform" />
          </UButton>

          <UButton
            :to="heroLinks[1].to"
            :target="heroLinks[1].target"
            :icon="heroLinks[1].icon"
            variant="outline"
            size="xl"
            color="secondary"
            class="hover:scale-105 transition-smooth"
          >
            {{ heroLinks[1].label }}
          </UButton>
        </div>

        <!-- Mini stats with animations -->
        <div class="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 pt-8 border-t border-gradient-to-r from-indigo-200 to-cyan-200 dark:from-indigo-800 dark:to-cyan-800">
          <div class="text-center group cursor-default">
            <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:scale-125 transition-smooth animate-sparkle">2</div>
            <div class="text-sm text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 transition-smooth">{{ t('hero.stats.companies') }}</div>
          </div>
          <div class="text-center group cursor-default">
            <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 group-hover:scale-125 transition-smooth animate-sparkle" style="animation-delay: 0.5s">2.6K+</div>
            <div class="text-sm text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 transition-smooth">{{ t('hero.stats.users') }}</div>
          </div>
          <div class="text-center group cursor-default">
            <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400 group-hover:scale-125 transition-smooth animate-sparkle" style="animation-delay: 1s">3</div>
            <div class="text-sm text-slate-500 dark:text-slate-400 group-hover:text-cyan-500 transition-smooth">{{ t('hero.stats.apprenticeship') }}</div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Specializations to display
const specializations = ['nuxt', 'vue', 'typescript', 'tailwind', 'springBoot', 'angular']

// Colors for skill badges
const skillColors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']

// Hero links
const heroLinks = computed(() => [
  {
    label: t('hero.cta.projects'),
    to: '#projets',
    icon: 'i-lucide-rocket'
  },
  {
    label: t('hero.cta.linkedin'),
    to: 'https://linkedin.com/in/williamftn',
    target: '_blank',
    icon: 'i-lucide-linkedin'
  }
])
</script>

<style scoped>
@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
</style>