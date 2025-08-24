<template>
  <div class="max-w-3xl mx-auto">
    <UTimeline 
      :items="timelineItems" 
      orientation="vertical"
      color="primary"
      size="lg"
      :ui="timelineConfig"
      :default-value="2"
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

const timelineItems = computed(() => [
  {
    date: t('formation.items.master.period'),
    title: t('formation.items.master.title'),
    description: t('formation.items.master.description'),
    icon: 'i-lucide-graduation-cap',
    company: t('formation.items.master.institution'),
    isCurrent: true,
    achievements: [
      t('formation.items.master.highlights.ai'),
      t('formation.items.master.highlights.cloud'),
      t('formation.items.master.highlights.security'),
      t('formation.items.master.highlights.management')
    ],
    stack: [t('skills.technologies.aiMl'), t('skills.technologies.cloud'), t('skills.technologies.microservices'), t('skills.technologies.kubernetes'), t('skills.technologies.docker'), t('skills.technologies.python')]
  },
  {
    date: t('formation.items.bachelor.period'),
    title: t('formation.items.bachelor.title'),
    description: t('formation.items.bachelor.description'),
    icon: 'i-lucide-award',
    company: t('formation.items.bachelor.institution'),
    isCurrent: false,
    achievements: [
      t('formation.items.bachelor.highlights.fullstack'),
      t('formation.items.bachelor.highlights.mobile'),
      t('formation.items.bachelor.highlights.database'),
      t('formation.items.bachelor.highlights.valedictorian')
    ],
    stack: [t('skills.technologies.java'), t('skills.technologies.angular'), t('skills.technologies.react'), t('skills.technologies.springBoot'), t('skills.technologies.sql'), t('skills.technologies.nosql')]
  },
  {
    date: t('formation.items.dut.period'),
    title: t('formation.items.dut.title'),
    description: t('formation.items.dut.description'),
    icon: 'i-lucide-book-open',
    company: t('formation.items.dut.institution'),
    isCurrent: false,
    achievements: [
      t('formation.items.dut.highlights.programming'),
      t('formation.items.dut.highlights.systems'),
      t('formation.items.dut.highlights.databases'),
      t('formation.items.dut.highlights.web')
    ],
    stack: [t('skills.technologies.java'), t('skills.technologies.cPlusPlus'), t('skills.technologies.javascript'), t('skills.technologies.php'), t('skills.technologies.vue'), t('skills.technologies.sql')]
  }
])
</script>