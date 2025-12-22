<script setup lang="ts">
const { t } = useI18n()
const { isDark } = useTheme()
const { prefersReducedMotion } = useBreakpoints()

// Use ref for image to avoid hydration mismatch (server doesn't know theme)
// Start with light image, update after hydration
const comboxImage = ref('/images/projects/combox_light.png')

// Watch for subsequent theme changes
watch(isDark, (dark) => {
  comboxImage.value = dark
    ? '/images/projects/combox_dark.png'
    : '/images/projects/combox_light.png'
})

const projects = computed(() => [
  {
    key: 'combox',
    title: t('projects.items.combox.title'),
    description: t('projects.items.combox.description'),
    longDescription: t('projects.items.combox.longDescription'),
    techs: [
      'Nuxt 4',
      'NestJS',
      'PostgreSQL',
      'BullMQ',
      'Redis',
      'Lemon Squeezy',
    ],
    url: 'https://com-box.app',
    featured: true,
  },
  {
    key: 'egenr',
    title: t('projects.items.egenr.title'),
    description: t('projects.items.egenr.description'),
    techs: ['Nuxt', 'Electron', 'TypeScript', 'TailwindCSS'],
    featured: false,
  },
  {
    key: 'quoiRegarder',
    title: t('projects.items.quoiRegarder.title'),
    description: t('projects.items.quoiRegarder.description'),
    techs: ['Nuxt', 'NestJS', 'PostgreSQL', 'TMDB API'],
    featured: false,
  },
])

const featuredProject = computed(() => projects.value.find((p) => p.featured))
const otherProjects = computed(() => projects.value.filter((p) => !p.featured))

// Refs
const sectionRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const featuredRef = ref<HTMLElement>()
const otherProjectsRef = ref<HTMLElement>()

// Use section animation composable
const { animate } = useSectionAnimation({
  sectionRef,
  sectionIndex: 3,
})

onMounted(() => {
  // Update image after mount to avoid hydration mismatch
  comboxImage.value = isDark.value
    ? '/images/projects/combox_dark.png'
    : '/images/projects/combox_light.png'

  if (prefersReducedMotion.value || !import.meta.client) return

  nextTick(() => {
    // Title
    animate(
      titleRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: EASING.smooth },
    )

    // Featured project
    animate(
      featuredRef.value,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.1, ease: EASING.smooth },
    )

    // Other projects
    if (otherProjectsRef.value) {
      const cards = otherProjectsRef.value.querySelectorAll('.project-card')
      animate(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.2,
          ease: EASING.smooth,
        },
      )
    }
  })
})
</script>

<template>
  <section
    ref="sectionRef"
    class="horizontal-section relative flex w-full flex-shrink-0 items-center px-4 py-8 sm:px-8 sm:py-12 lg:h-screen lg:w-screen lg:overflow-y-auto lg:py-8"
  >
    <div class="mx-auto w-full max-w-7xl lg:my-auto">
      <h2
        ref="titleRef"
        class="mb-6 text-center text-4xl font-bold lg:mb-8 lg:text-5xl"
      >
        {{ t("projects.title") }}
      </h2>

      <div
        ref="otherProjectsRef"
        class="grid gap-6 md:grid-cols-2 md:gap-5 lg:gap-4"
      >
        <!-- Featured Project -->
        <Card
          v-if="featuredProject"
          ref="featuredRef"
          class="group col-span-full overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-teal-500/30"
        >
          <CardContent class="p-0">
            <div class="flex flex-col md:flex-row">
              <!-- Info -->
              <div
                class="flex flex-1 flex-col justify-between p-4 md:p-5 lg:p-6"
              >
                <div>
                  <Badge
                    class="mb-2 bg-teal-500/20 text-teal-400 hover:bg-teal-500/30"
                  >
                    {{ t("projects.featured") }}
                  </Badge>
                  <h3 class="text-xl font-bold lg:text-2xl">
                    {{ featuredProject.title }}
                  </h3>
                  <p class="mt-2 text-sm text-muted-foreground lg:text-base">
                    {{ featuredProject.description }}
                  </p>
                  <p class="mt-1 text-xs text-muted-foreground/70 lg:text-sm">
                    {{ featuredProject.longDescription }}
                  </p>

                  <div class="mt-4 flex flex-wrap gap-1.5 lg:gap-2">
                    <Badge
                      v-for="tech in featuredProject.techs"
                      :key="tech"
                      variant="outline"
                      class="text-xs"
                    >
                      {{ tech }}
                    </Badge>
                  </div>
                </div>

                <Button
                  v-if="featuredProject.url"
                  as="a"
                  :href="featuredProject.url"
                  target="_blank"
                  variant="outline"
                  size="sm"
                  class="mt-4 w-fit gap-2 transition-all hover:border-teal-500/50 hover:bg-teal-500/5"
                >
                  <Icon name="lucide:external-link" class="h-4 w-4" />
                  {{ t("projects.viewProject") }}
                </Button>
              </div>

              <!-- Screenshot -->
              <div
                class="relative flex-1 overflow-hidden bg-muted/30 p-4 md:p-5 lg:p-6"
              >
                <img
                  :src="comboxImage"
                  :alt="featuredProject.title"
                  class="h-full w-full rounded-lg object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <!-- Other Projects (Archived) -->
        <Card
          v-for="project in otherProjects"
          :key="project.key"
          class="project-card group overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-border"
        >
          <CardContent class="p-4 lg:p-5">
            <div class="mb-2 flex items-center gap-2">
              <Icon
                name="lucide:archive"
                class="h-4 w-4 text-muted-foreground"
              />
              <span class="text-xs text-muted-foreground">{{
                t("projects.archived")
              }}</span>
            </div>
            <h3 class="text-lg font-semibold lg:text-xl">
              {{ project.title }}
            </h3>
            <p class="mt-1.5 text-xs text-muted-foreground lg:text-sm">
              {{ project.description }}
            </p>

            <div class="mt-3 flex flex-wrap gap-1.5">
              <Badge
                v-for="tech in project.techs"
                :key="tech"
                variant="outline"
                class="text-xs"
              >
                {{ tech }}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
