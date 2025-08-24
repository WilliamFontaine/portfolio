<template>
  <section id="experience" class="relative py-16">
    <!-- Visual separation with more colors -->
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 via-indigo-300/60 to-cyan-300/50 dark:via-emerald-700/30 dark:via-indigo-800/40 dark:to-cyan-700/30"></div>
    <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-50/10 via-indigo-50/20 to-transparent dark:from-emerald-950/10 dark:via-indigo-950/20 pointer-events-none"></div>
    
    <!-- Floating decorative elements -->
    <div class="absolute top-20 right-16 w-24 h-24 bg-gradient-to-r from-emerald-400/8 to-cyan-400/8 rounded-full blur-xl animate-float"></div>
    <div class="absolute bottom-32 left-16 w-32 h-32 bg-gradient-to-r from-indigo-400/8 to-purple-400/8 rounded-full blur-xl animate-float-delay"></div>
    
    <UContainer class="relative z-10">
      <!-- Section Header with enhanced styling -->
      <div class="text-center mb-20">
        <div class="section-badge bg-gradient-to-r from-emerald-100/80 to-indigo-100/80 dark:from-emerald-900/40 dark:to-indigo-900/40">
          <UIcon name="i-lucide-briefcase" class="decoration-icon text-emerald-600 dark:text-emerald-400" />
          <span class="text-sm font-medium text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
            {{ t('experience.title') }}
          </span>
        </div>
        
        <h2 class="section-title bg-gradient-to-r from-slate-900 via-emerald-900 via-indigo-900 to-slate-900 dark:from-slate-100 dark:via-emerald-100 dark:via-indigo-100 dark:to-slate-100 bg-clip-text text-transparent">
          {{ t('experience.title') }}
        </h2>
        
        <p class="section-subtitle">
          {{ t('experience.subtitle') }}
        </p>
        
        <!-- Consistent decorative line -->
        <div class="section-decoration">
          <div class="decoration-line via-emerald-300 dark:via-emerald-700"></div>
          <UIcon name="i-lucide-sparkles" class="decoration-icon text-emerald-500" />
          <div class="decoration-line via-emerald-300 dark:via-emerald-700"></div>
        </div>
      </div>

      <!-- Timeline Section -->
      <div class="mb-32">
        <UCard class="glass-refined shadow-natural shadow-natural-hover timeline-card">
          <div class="p-8 sm:p-12">
            <ExperienceTimeline />
          </div>
        </UCard>
      </div>

      <!-- Stats Section with enhanced presentation -->
      <div class="relative">
        <!-- Background decoration with more colors -->
        <div class="absolute -inset-4 bg-gradient-to-r from-emerald-100/50 via-indigo-100/50 via-cyan-100/50 to-emerald-100/50 dark:from-emerald-900/20 dark:via-indigo-900/20 dark:via-cyan-900/20 dark:to-emerald-900/20 blur-3xl rounded-3xl animate-color-pulse"></div>
        
        <UCard class="relative glass-refined shadow-natural shadow-natural-hover stats-card">
          <div class="p-8 sm:p-12">
            <div class="text-center mb-12">
              <h3 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
                {{ t('experience.stats.title') }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-slate-400">
                {{ t('experience.stats.subtitle') }}
              </p>
            </div>

            <ExperienceStats />
          </div>
        </UCard>
      </div>
      
      <!-- Bottom decoration with colors -->
      <div class="flex justify-center mt-16">
        <div class="flex items-center space-x-2 opacity-40">
          <div class="h-1 w-1 bg-emerald-500 rounded-full animate-sparkle"></div>
          <div class="h-1 w-1 bg-indigo-500 rounded-full animate-sparkle [animation-delay:0.5s]"></div>
          <div class="h-1 w-1 bg-cyan-500 rounded-full animate-sparkle [animation-delay:1s]"></div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
const { t } = useI18n()

// Stagger animation for experience
onMounted(() => {
  const { animateOnScroll } = useStaggerAnimation()
  
  // Animate timeline and stats
  animateOnScroll('.timeline-card')
  animateOnScroll('.stats-card')
})
</script>