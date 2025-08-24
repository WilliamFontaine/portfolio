<template>
  <div class="max-w-3xl mx-auto">
    <UTimeline 
      :items="timelineItems" 
      orientation="vertical"
      color="primary"
      size="lg"
      :ui="timelineConfig"
      :default-value="1"
    >
      <!-- Date stylisée -->
      <template #date="{ item }">
        <div class="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
          {{ item.date }}
        </div>
      </template>

      <!-- Titre épuré -->
      <template #title="{ item }">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {{ item.title }}
          </h3>
          <p class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-1">
            {{ item.company }}
          </p>
        </div>
      </template>

      <!-- Description minimaliste -->
      <template #description="{ item }">
        <div class="space-y-4">
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            {{ item.description }}
          </p>
          
          <!-- Réalisations compactes -->
          <div v-if="item.achievements" class="space-y-2">
            <h5 class="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">{{ t('timeline.achievements') }}</h5>
            <ul class="space-y-1">
              <li 
                v-for="achievement in item.achievements"
                :key="achievement"
                class="flex items-start space-x-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <UIcon name="i-lucide-check" class="h-3 w-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{{ achievement }}</span>
              </li>
            </ul>
          </div>
          
          <!-- Stack minimaliste -->
          <div v-if="item.stack" class="space-y-2">
            <h5 class="text-xs font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">{{ t('timeline.stack') }}</h5>
            <div class="flex flex-wrap gap-2">
              <UBadge 
                v-for="tech in item.stack"
                :key="tech"
                :label="tech"
                variant="soft"
                color="secondary"
                size="md"
              />
            </div>
          </div>
        </div>
      </template>
    </UTimeline>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Configuration UI personnalisée pour le Timeline
const timelineConfig = {
  line: 'bg-gradient-to-b from-indigo-200 via-cyan-200 to-indigo-200 dark:from-indigo-700 dark:via-cyan-700 dark:to-indigo-700',
  wrapper: 'space-y-8',
  item: {
    base: 'relative flex items-start gap-6',
    content: 'flex-1'
  }
}

const timelineItems = [
  {
    date: t('experience.items.neofugu.period'),
    title: t('experience.items.neofugu.title'),
    description: t('experience.items.neofugu.description'),
    icon: 'i-lucide-briefcase',
    company: t('experience.items.neofugu.institution'),
    isCurrent: true,
    achievements: [
      t('experience.items.neofugu.highlights.fullstack'),
      t('experience.items.neofugu.highlights.bugs'),
      t('experience.items.neofugu.highlights.collaboration'),
      t('experience.items.neofugu.highlights.projects')
    ],
    stack: [t('skills.technologies.java'), t('skills.technologies.springBoot'), t('skills.technologies.angular'), t('skills.technologies.typescript'), t('skills.technologies.docker'), t('skills.technologies.sass')]
  },
  {
    date: t('experience.items.itarverne.period'),
    title: t('experience.items.itarverne.title'),
    description: t('experience.items.itarverne.description'),
    icon: 'i-lucide-code',
    company: t('experience.items.itarverne.institution'),
    isCurrent: false,
    achievements: [
      t('experience.items.itarverne.highlights.autopost'),
      t('experience.items.itarverne.highlights.react'),
      t('experience.items.itarverne.highlights.chat'),
      t('experience.items.itarverne.highlights.django')
    ],
    stack: [t('skills.technologies.python'), t('skills.technologies.django'), t('skills.technologies.wagtail'), t('skills.technologies.react'), t('skills.technologies.javascript'), t('skills.technologies.nodejs'), t('skills.technologies.docker')]
  }
]
</script>