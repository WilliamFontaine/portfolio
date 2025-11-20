<template>
  <section id="projets" class="relative py-16">
    <!-- Distinctive visual separation with more colors -->
    <div class="absolute inset-x-0 top-0">
      <div class="h-px bg-gradient-to-r from-transparent via-cyan-300/60 via-orange-300/50 to-transparent dark:via-cyan-700/40 dark:via-orange-700/30"></div>
      <div class="h-24 bg-gradient-to-b from-cyan-50/30 via-orange-50/20 to-transparent dark:from-cyan-950/20 dark:via-orange-950/10 pointer-events-none"></div>
    </div>
    
    <!-- Subtle floating elements with animations -->
    <div class="absolute top-32 right-20 w-24 h-24 bg-gradient-to-r from-cyan-400/8 to-orange-400/8 rounded-full blur-xl animate-float"></div>
    <div class="absolute bottom-32 left-20 w-32 h-32 bg-gradient-to-r from-indigo-400/8 to-purple-400/8 rounded-full blur-xl animate-float-delay"></div>
    <div class="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-emerald-400/6 to-cyan-400/6 rounded-full blur-lg animate-bounce-soft"></div>
    
    <UContainer class="relative z-10">
      <!-- Section Header consistent with Experience -->
      <div class="text-center mb-20">
        <h2 class="section-title bg-gradient-to-r from-slate-900 via-cyan-900 via-orange-900 to-slate-900 dark:from-slate-100 dark:via-cyan-100 dark:via-orange-100 dark:to-slate-100 bg-clip-text text-transparent">
          {{ t('projects.title') }}
        </h2>
        
        <!-- Consistent decorative line -->
        <div class="section-decoration">
          <div class="decoration-line via-cyan-300 dark:via-cyan-700"></div>
          <UIcon name="i-lucide-sparkles" class="decoration-icon text-cyan-500" />
          <div class="decoration-line via-cyan-300 dark:via-cyan-700"></div>
        </div>
      </div>

      <!-- Projects with data-driven structure -->
      <div class="mb-32 max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
          <UCard 
            v-for="project in projectItems"
            :key="project.id"
            class="group shadow-natural shadow-natural-hover project-card"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <UAvatar 
                    :icon="project.avatar.icon" 
                    size="sm" 
                    :ui="{ background: project.avatar.background }"
                  />
                  <div>
                    <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {{ project.title }}
                    </h3>
                    <p 
                      class="text-sm font-medium mt-1"
                       :class="project.id === 'quoi-regarder' 
                         ? 'text-cyan-600 dark:text-cyan-400' 
                         : 'text-indigo-600 dark:text-indigo-400'"
                    >
                      {{ project.subtitle }}
                    </p>
                  </div>
                </div>
                <UBadge 
                  :color="project.status.color" 
                  variant="soft" 
                  size="sm"
                  :icon="project.status.icon"
                >
                  {{ project.status.label }}
                </UBadge>
              </div>
            </template>

            <!-- Screenshot avec lien cliquable -->
            <NuxtLink 
              :to="project.url" 
              target="_blank" 
              external
              class="block relative mb-4 rounded-lg overflow-hidden shadow-lg"
            >
              <img 
                :src="project.image" 
                :alt="`${project.title} - Interface`"
                class="w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-2 flex items-center justify-center">
                  <UIcon name="i-lucide-external-link" class="h-4 w-4 text-slate-700 dark:text-slate-300" />
                </div>
              </div>
            </NuxtLink>
            
            <div class="space-y-3">
              <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                {{ project.description }}
              </p>
              
              <!-- Metrics ou Features dynamiques avec hover comme Hero -->
              <div v-if="project.metrics || project.features" class="grid grid-cols-2 gap-2">
                <template v-if="project.metrics">
                  <div 
                    v-for="metric in project.metrics" 
                    :key="metric.value"
                    class="rounded-lg p-2 text-center group cursor-default"
                    :class="`bg-${metric.color}-50/50 dark:bg-${metric.color}-900/20`"
                  >
                    <div class="text-sm font-bold group-hover:scale-110 transition-transform" :class="`text-${metric.color}-600 dark:text-${metric.color}-400`">
                      {{ metric.value }}
                    </div>
                    <div class="text-xs text-slate-600 dark:text-slate-400">{{ metric.label }}</div>
                  </div>
                </template>
                
                <template v-if="project.features">
                  <div 
                    v-for="feature in project.features" 
                    :key="feature.value"
                    class="rounded-lg p-2 text-center group cursor-default"
                    :class="`bg-${feature.color}-50/50 dark:bg-${feature.color}-900/20`"
                  >
                    <div class="text-sm font-bold group-hover:scale-110 transition-transform" :class="`text-${feature.color}-600 dark:text-${feature.color}-400`">
                      {{ feature.value }}
                    </div>
                    <div class="text-xs text-slate-600 dark:text-slate-400">{{ feature.label }}</div>
                  </div>
                </template>
              </div>
              
              <!-- Technologies avec style cohérent Timeline -->
              <div class="flex flex-wrap gap-2">
                <UBadge 
                  v-for="tech in project.technologies"
                  :key="tech"
                  :label="tech"
                  variant="soft"
                  color="secondary"
                  size="md"
                />
              </div>
            </div>

            <template #footer>
              <div class="flex items-center justify-between">
                <NuxtLink 
                  :to="project.url"
                  target="_blank"
                  external
                >
                  <UButton
                    size="sm"
                    icon="i-lucide-external-link"
                    :color="project.buttonColor"
                    class="cursor-pointer"
                  >
                    {{ t('projects.viewProject') }}
                  </UButton>
                </NuxtLink>
                <div class="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                  <UIcon name="i-lucide-calendar" class="h-3 w-3" />
                  <span>{{ project.period }}</span>
                </div>
              </div>
            </template>
          </UCard>
        </div>
      </div>
      
      <!-- Bottom decoration with consistent colors -->
      <div class="flex justify-center mt-16">
        <div class="flex items-center space-x-2 opacity-40">
          <div class="h-1 w-1 bg-cyan-500 rounded-full animate-sparkle"></div>
          <div class="h-1 w-1 bg-orange-500 rounded-full animate-sparkle [animation-delay:0.5s]"></div>
          <div class="h-1 w-1 bg-emerald-500 rounded-full animate-sparkle [animation-delay:1s]"></div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Project configuration with complete i18n
const projectItems = computed(() => [
  {
    id: 'quoi-regarder',
    title: t('projects.items.quoiRegarder.title'),
    subtitle: t('projects.items.quoiRegarder.subtitle'),
    description: t('projects.items.quoiRegarder.description'),
    url: 'https://quoi-regarder.fr',
    image: '/images/projects/quoi-regarder.png',
    status: {
      label: t('projects.items.quoiRegarder.status.production'),
      color: 'success',
      icon: 'i-lucide-check-circle'
    },
    period: t('projects.items.quoiRegarder.period'),
    avatar: {
      icon: 'i-lucide-film',
      background: 'bg-cyan-100 dark:bg-cyan-900'
    },
    metrics: [
      { value: '2.6K+', label: t('projects.items.quoiRegarder.metrics.users'), color: 'cyan' },
      { value: '+1K', label: t('projects.items.quoiRegarder.metrics.monthly'), color: 'emerald' }
    ],
    technologies: [t('skills.technologies.nuxt') + ' 3', t('skills.technologies.vue') + ' 3', t('skills.technologies.typescript'), t('skills.technologies.tmdbApi')],
    buttonColor: 'secondary'
  },
  {
    id: 'egenr',
    title: t('projects.items.egenr.title'),
    subtitle: t('projects.items.egenr.subtitle'),
    description: t('projects.items.egenr.description'),
    url: 'https://egenr.fr',
    image: '/images/projects/egenr.png',
    status: {
      label: t('projects.items.egenr.status.desktop'),
      color: 'primary',
      icon: 'i-lucide-monitor'
    },
    period: t('projects.items.egenr.period'),
    avatar: {
      icon: 'i-lucide-heart-pulse',
      background: 'bg-indigo-100 dark:bg-indigo-900'
    },
    features: [
      { value: t('projects.items.egenr.features.multiOs'), label: t('projects.items.egenr.features.osCompatibility'), color: 'indigo' },
      { value: t('projects.items.egenr.features.rgpd'), label: t('projects.items.egenr.features.compliant'), color: 'emerald' }
    ],
    technologies: [t('skills.technologies.nuxt') + ' 3', t('skills.technologies.tauri'), t('skills.technologies.typescript'), t('skills.technologies.pdfLib')],
    buttonColor: 'secondary'
  }
])

// Stagger animation for projects
onMounted(() => {
  const { animateOnScroll } = useStaggerAnimation()
  
  // Animate project cards
  animateOnScroll('.project-card')
  // Animate stats card
  animateOnScroll('.stats-card')
})
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