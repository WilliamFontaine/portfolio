<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
    <div class="text-center group cursor-default">
      <UAvatar 
        icon="i-lucide-calendar" 
        size="sm" 
        :ui="{ background: 'bg-indigo-100 dark:bg-indigo-900' }"
        class="mx-auto mb-2 group-hover:scale-110 transition-transform"
      />
      <div class="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-1 group-hover:scale-125 transition-all duration-300 animate-sparkle">3+</div>
      <p class="text-xs text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-smooth">{{ t('experience.stats.years') }}</p>
    </div>

    <div class="text-center group cursor-default">
      <UAvatar 
        icon="i-lucide-briefcase" 
        size="sm" 
        :ui="{ background: 'bg-cyan-100 dark:bg-cyan-900' }"
        class="mx-auto mb-2 group-hover:scale-110 transition-transform"
      />
      <div class="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-1 group-hover:scale-125 transition-all duration-300 animate-sparkle" style="animation-delay: 0.5s">2</div>
      <p class="text-xs text-slate-600 dark:text-slate-400 group-hover:text-cyan-500 transition-smooth">{{ t('experience.stats.companies') }}</p>
    </div>

    <div class="text-center group cursor-default">
      <UAvatar 
        icon="i-lucide-trophy" 
        size="sm" 
        :ui="{ background: 'bg-orange-100 dark:bg-orange-900' }"
        class="mx-auto mb-2 group-hover:scale-110 transition-transform"
      />
      <div class="text-lg font-bold text-orange-600 dark:text-orange-400 mb-1 group-hover:scale-125 transition-all duration-300 animate-sparkle" style="animation-delay: 1s">1er</div>
      <p class="text-xs text-slate-600 dark:text-slate-400 group-hover:text-orange-500 transition-smooth">{{ t('experience.stats.valedictorian') }}</p>
    </div>

    <div class="text-center group cursor-default">
      <UAvatar 
        icon="i-lucide-users" 
        size="sm" 
        :ui="{ background: 'bg-emerald-100 dark:bg-emerald-900' }"
        class="mx-auto mb-2 group-hover:scale-110 transition-transform"
      />
      <div class="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-1 group-hover:scale-125 transition-all duration-300 animate-sparkle" style="animation-delay: 1.5s">2.6K+</div>
      <p class="text-xs text-slate-600 dark:text-slate-400 group-hover:text-emerald-500 transition-smooth">{{ t('experience.stats.users') }}</p>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
</script>