<template>
  <section id="competences" class="relative py-16">
    <!-- Visual separation with more colors -->
    <div class="absolute inset-x-0 top-0">
      <div class="h-px bg-gradient-to-r from-transparent via-emerald-300/50 via-purple-300/40 to-transparent dark:via-emerald-700/30 dark:via-purple-700/20"></div>
      <div class="h-20 bg-gradient-to-b from-emerald-50/20 via-purple-50/10 to-transparent dark:from-emerald-950/10 dark:via-purple-950/5 pointer-events-none"></div>
    </div>
    
    <!-- Decorative elements with animations -->
    <div class="absolute top-40 left-16 w-20 h-20 bg-gradient-to-r from-emerald-400/8 to-purple-400/8 rounded-full blur-lg animate-float"></div>
    <div class="absolute bottom-40 right-16 w-28 h-28 bg-gradient-to-r from-indigo-400/8 to-cyan-400/8 rounded-full blur-lg animate-float-delay"></div>
    <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-orange-400/6 to-emerald-400/6 rounded-full blur-md animate-bounce-soft"></div>
    
    <UContainer class="relative z-10">
      <!-- Section Header consistent with others -->
      <div class="text-center mb-20">        
        <h2 class="section-title bg-gradient-to-r from-slate-900 via-emerald-900 via-purple-900 to-slate-900 dark:from-slate-100 dark:via-emerald-100 dark:via-purple-100 dark:to-slate-100 bg-clip-text text-transparent">
          {{ t('skills.title') }}
        </h2>
        
        <!-- Consistent decorative line -->
        <div class="section-decoration">
          <div class="decoration-line via-emerald-300 dark:via-emerald-700"></div>
          <UIcon name="i-lucide-sparkles" class="decoration-icon text-emerald-500" />
          <div class="decoration-line via-emerald-300 dark:via-emerald-700"></div>
        </div>
      </div>

      <!-- Main specializations -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <div 
          v-for="(skill, index) in specialization" 
          :key="skill.name"
          class="text-center group cursor-default specialization-item"
        >
          <div class="mb-3 flex justify-center">
            <UAvatar 
              :icon="skill.icon" 
              size="md" 
              :ui="{ background: skillAvatarColors[index % skillAvatarColors.length] }"
              class="group-hover:scale-125 transition-smooth animate-bounce-soft"
              :style="`animation-delay: ${index * 0.3}s`"
            />
          </div>
          <h3 class="font-semibold text-slate-900 dark:text-slate-100">{{ t(`skills.technologies.${skill.key}`) }}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400">{{ skill.level }} {{ t('skills.years') }}</p>
        </div>
      </div>

      <!-- Skills Grid with consistent style -->
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-3 gap-6">
          <UCard 
            v-for="category in skillCategories" 
            :key="category.key"
            class="group card-hover shadow-natural shadow-natural-hover skill-category"
          >
            <template #header>
              <div class="flex items-center space-x-3">
                <UAvatar 
                  :icon="category.icon" 
                  size="sm" 
                  :ui="{ background: category.background }"
                />
                <h3 class="font-semibold text-slate-900 dark:text-slate-100">
                  {{ t(`skills.categories.${category.key}`) }}
                </h3>
              </div>
            </template>

            <div class="space-y-3">
              <div 
                v-for="(skill, skillIndex) in category.skills" 
                :key="skill.key"
                class="flex items-center justify-between"
              >
                <div class="flex items-center space-x-2">
                  <UIcon 
                    :name="skill.icon" 
                    class="text-sm skill-icon animate-sparkle" 
                    :class="skill.color"
                    :style="`animation-delay: ${skillIndex * 0.2}s`"
                  />
                  <span class="text-sm text-slate-700 dark:text-slate-300">{{ t(`skills.technologies.${skill.key}`) }}</span>
                </div>
                <UBadge 
                  :color="skill.badgeColor" 
                  variant="soft" 
                  size="sm"
                >
                  {{ t(`skills.levels.${skill.levelKey}`) }}
                </UBadge>
              </div>
            </div>
          </UCard>
        </div>
      </div>
      
      <!-- Consistent bottom decoration with colors -->
      <div class="flex justify-center mt-16">
        <div class="flex items-center space-x-2 opacity-40">
          <div class="h-1 w-1 bg-emerald-500 rounded-full animate-sparkle"></div>
          <div class="h-1 w-1 bg-purple-500 rounded-full animate-sparkle [animation-delay:0.5s]"></div>
          <div class="h-1 w-1 bg-cyan-500 rounded-full animate-sparkle [animation-delay:1s]"></div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Main specializations with i18n
const specialization = [
  { key: 'nuxt', icon: 'i-lucide-zap', level: '2+' },
  { key: 'vue', icon: 'i-lucide-triangle', level: '3+' },
  { key: 'typescript', icon: 'i-lucide-code', level: '2+' },
  { key: 'tailwind', icon: 'i-lucide-palette', level: '2+' }
]

// Skill categories with i18n and consistent design
const skillCategories = [
  {
    key: 'frontend',
    icon: 'i-lucide-monitor',
    background: 'bg-emerald-100 dark:bg-emerald-900',
    skills: [
      { key: 'vue', icon: 'i-lucide-triangle', levelKey: 'expert', color: 'text-emerald-500', badgeColor: 'emerald' },
      { key: 'nuxt', icon: 'i-lucide-zap', levelKey: 'expert', color: 'text-emerald-500', badgeColor: 'emerald' },
      { key: 'angular', icon: 'i-lucide-layout', levelKey: 'advanced', color: 'text-red-500', badgeColor: 'red' },
      { key: 'react', icon: 'i-lucide-atom', levelKey: 'intermediate', color: 'text-blue-500', badgeColor: 'blue' },
      { key: 'typescript', icon: 'i-lucide-code', levelKey: 'advanced', color: 'text-blue-600', badgeColor: 'blue' }
    ]
  },
  {
    key: 'backend',
    icon: 'i-lucide-server',
    background: 'bg-orange-100 dark:bg-orange-900',
    skills: [
      { key: 'java', icon: 'i-lucide-coffee', levelKey: 'advanced', color: 'text-orange-500', badgeColor: 'orange' },
      { key: 'springBoot', icon: 'i-lucide-leaf', levelKey: 'advanced', color: 'text-emerald-600', badgeColor: 'emerald' },
      { key: 'nodejs', icon: 'i-lucide-hexagon', levelKey: 'intermediate', color: 'text-emerald-500', badgeColor: 'emerald' },
      { key: 'python', icon: 'i-lucide-file-code', levelKey: 'intermediate', color: 'text-yellow-500', badgeColor: 'yellow' },
      { key: 'apiRest', icon: 'i-lucide-cloud', levelKey: 'expert', color: 'text-blue-500', badgeColor: 'blue' }
    ]
  },
  {
    key: 'toolsDevops',
    icon: 'i-lucide-wrench',
    background: 'bg-cyan-100 dark:bg-cyan-900',
    skills: [
      { key: 'git', icon: 'i-lucide-git-branch', levelKey: 'expert', color: 'text-orange-500', badgeColor: 'orange' },
      { key: 'docker', icon: 'i-lucide-container', levelKey: 'advanced', color: 'text-blue-500', badgeColor: 'blue' },
      { key: 'sql', icon: 'i-lucide-database', levelKey: 'advanced', color: 'text-blue-600', badgeColor: 'blue' },
      { key: 'nosql', icon: 'i-lucide-layers', levelKey: 'intermediate', color: 'text-emerald-500', badgeColor: 'emerald' },
      { key: 'linux', icon: 'i-lucide-terminal', levelKey: 'advanced', color: 'text-slate-600', badgeColor: 'gray' }
    ]
  }
]

// Colors for specialization avatars
const skillAvatarColors = [
  'bg-emerald-100 dark:bg-emerald-900',
  'bg-purple-100 dark:bg-purple-900',
  'bg-cyan-100 dark:bg-cyan-900',
  'bg-orange-100 dark:bg-orange-900'
]

// Stagger animation for skills
onMounted(() => {
  const { animateOnScroll } = useStaggerAnimation()
  
  // Animate specializations
  animateOnScroll('.specialization-item')
  
  // Animate skill categories
  animateOnScroll('.skill-category')
})
</script>