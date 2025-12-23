<script setup lang="ts">
const { t } = useI18n()

const experiences = computed(() => [
  {
    key: 'freelance',
    period: t('experience.items.freelance.period'),
    company: t('experience.items.freelance.company'),
    role: t('experience.items.freelance.role'),
    description: t('experience.items.freelance.description'),
    achievements: [
      t('experience.items.freelance.achievements.0'),
      t('experience.items.freelance.achievements.1'),
      t('experience.items.freelance.achievements.2'),
    ],
    techs: ['Nuxt 4', 'NestJS', 'PostgreSQL', 'BullMQ', 'Redis'],
    current: true,
  },
  {
    key: 'neofugu',
    period: t('experience.items.neofugu.period'),
    company: t('experience.items.neofugu.company'),
    role: t('experience.items.neofugu.role'),
    description: t('experience.items.neofugu.description'),
    achievements: [
      t('experience.items.neofugu.achievements.0'),
      t('experience.items.neofugu.achievements.1'),
      t('experience.items.neofugu.achievements.2'),
      t('experience.items.neofugu.achievements.3'),
    ],
    techs: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL'],
    current: false,
  },
  {
    key: 'itarverne',
    period: t('experience.items.itarverne.period'),
    company: t('experience.items.itarverne.company'),
    role: t('experience.items.itarverne.role'),
    description: t('experience.items.itarverne.description'),
    achievements: [
      t('experience.items.itarverne.achievements.0'),
      t('experience.items.itarverne.achievements.1'),
      t('experience.items.itarverne.achievements.2'),
    ],
    techs: ['Node.js', 'React', 'Django', 'WebSockets'],
    current: false,
  },
])

// Refs
const sectionRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const timelineRef = ref<HTMLElement>()

useSectionAnimations({
  sectionRef,
  sectionIndex: 2,
  animations: [
    { ref: titleRef, preset: 'fadeUp', delay: 0 },
    createAlternatingSlide('.timeline-item', timelineRef, {
      startDelay: 0.15,
      stagger: 0.18,
      distance: 50,
    }),
  ],
  flowStagger: 0.03,
})
</script>

<template>
  <section
    ref="sectionRef"
    class="horizontal-section relative flex w-full flex-shrink-0 items-center px-4 py-8 sm:px-8 sm:py-12 lg:h-screen lg:w-screen lg:overflow-y-auto lg:py-8"
  >
    <div class="mx-auto w-full max-w-5xl lg:my-auto">
      <h2
        ref="titleRef"
        class="mb-6 text-center text-4xl font-bold lg:mb-8 lg:text-5xl"
      >
        {{ t("experience.title") }}
      </h2>

      <!-- Timeline -->
      <div ref="timelineRef" class="relative">
        <!-- Vertical line -->
        <div
          class="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-teal-400 via-teal-400/50 to-orange-400/50 md:left-1/2 md:-translate-x-px"
        />

        <!-- Experience items -->
        <div class="space-y-8 md:space-y-6 lg:space-y-4">
          <div
            v-for="(exp, idx) in experiences"
            :key="exp.key"
            class="timeline-item relative"
            :class="idx % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'"
          >
            <!-- Timeline dot -->
            <div
              class="absolute left-6 top-6 h-5 w-5 rounded-full border-4 border-background md:left-1/2 md:-translate-x-1/2"
              :class="
                exp.current
                  ? 'bg-teal-400 shadow-lg shadow-teal-400/50'
                  : 'bg-orange-400'
              "
            />

            <!-- Card -->
            <Card
              class="ml-16 border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-teal-500/30 md:ml-0"
            >
              <CardHeader class="pb-1 lg:pb-2">
                <div class="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <CardTitle class="text-lg lg:text-xl">{{
                      exp.role
                    }}</CardTitle>
                    <CardDescription class="text-sm lg:text-base">{{
                      exp.company
                    }}</CardDescription>
                  </div>
                  <Badge
                    :variant="exp.current ? 'default' : 'outline'"
                    :class="
                      exp.current
                        ? 'bg-teal-500/20 text-teal-400 hover:bg-teal-500/30'
                        : ''
                    "
                  >
                    {{ exp.period }}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent class="pt-2 lg:pt-3">
                <p
                  class="mb-2 text-sm text-muted-foreground lg:mb-3 lg:text-base"
                >
                  {{ exp.description }}
                </p>

                <!-- Achievements -->
                <ul class="mb-3 space-y-1 lg:mb-4 lg:space-y-1.5">
                  <li
                    v-for="(achievement, i) in exp.achievements"
                    :key="i"
                    class="flex items-start gap-2 text-xs text-muted-foreground lg:text-sm"
                  >
                    <Icon
                      name="lucide:check"
                      class="mt-0.5 h-3 w-3 flex-shrink-0 text-teal-400 lg:h-4 lg:w-4"
                    />
                    {{ achievement }}
                  </li>
                </ul>

                <!-- Tech badges -->
                <div class="flex flex-wrap gap-1.5 lg:gap-2">
                  <Badge
                    v-for="tech in exp.techs"
                    :key="tech"
                    variant="secondary"
                    class="text-xs"
                  >
                    {{ tech }}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
