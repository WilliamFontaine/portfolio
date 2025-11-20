<template>
  <section id="formation" class="relative py-16">
    <!-- Academic visual separation with more colors -->
    <div class="absolute inset-x-0 top-0">
      <div class="h-px bg-gradient-to-r from-transparent via-violet-300/50 via-yellow-300/40 to-transparent dark:via-violet-700/30 dark:via-yellow-700/20"></div>
      <div class="h-24 bg-gradient-to-b from-violet-50/20 via-yellow-50/10 to-transparent dark:from-violet-950/10 dark:via-yellow-950/5 pointer-events-none"></div>
    </div>
    
    <!-- Educational decorative elements with animations -->
    <div class="absolute top-28 right-12 w-22 h-22 bg-gradient-to-r from-violet-400/8 to-yellow-400/8 rounded-full blur-lg animate-float"></div>
    <div class="absolute bottom-28 left-12 w-26 h-26 bg-gradient-to-r from-indigo-400/8 to-purple-400/8 rounded-full blur-lg animate-float-delay"></div>
    <div class="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-emerald-400/6 to-violet-400/6 rounded-full blur-md animate-bounce-soft"></div>
    
    <UContainer class="relative z-10">
      <!-- Section Header consistent with others -->
      <div class="text-center mb-20">
        <h2 class="section-title bg-gradient-to-r from-slate-900 via-violet-900 via-yellow-900 to-slate-900 dark:from-slate-100 dark:via-violet-100 dark:via-yellow-100 dark:to-slate-100 bg-clip-text text-transparent">
          {{ t('formation.title') }}
        </h2>
        
        <!-- Consistent decorative line -->
        <div class="section-decoration">
          <div class="decoration-line via-violet-300 dark:via-violet-700"></div>
          <UIcon name="i-lucide-sparkles" class="decoration-icon text-violet-500" />
          <div class="decoration-line via-violet-300 dark:via-violet-700"></div>
        </div>
      </div>

      <!-- Timeline Section -->
      <div class="mb-32">
        <UCard class="glass-refined shadow-natural shadow-natural-hover formation-card">
          <div class="p-8 sm:p-12">
            <FormationTimeline />
          </div>
        </UCard>
      </div>
      
      <!-- Consistent bottom decoration with colors -->
      <div class="flex justify-center mt-16">
        <div class="flex items-center space-x-2 opacity-40">
          <div class="h-1 w-1 bg-violet-500 rounded-full animate-sparkle"></div>
          <div class="h-1 w-1 bg-yellow-500 rounded-full animate-sparkle [animation-delay:0.5s]"></div>
          <div class="h-1 w-1 bg-purple-500 rounded-full animate-sparkle [animation-delay:1s]"></div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Stagger animation for formation
onMounted(() => {
  const { animateOnScroll } = useStaggerAnimation()
  
  // Animate formation timeline
  animateOnScroll('.formation-card')
})
</script>