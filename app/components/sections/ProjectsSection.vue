<script setup lang="ts">
const { t } = useI18n()
const { isDark } = useTheme()

const projects = computed(() => [
  {
    key: 'combox',
    title: t('projects.items.combox.title'),
    description: t('projects.items.combox.description'),
    longDescription: t('projects.items.combox.longDescription'),
    image: isDark.value
      ? '/images/projects/combox_dark.png'
      : '/images/projects/combox_light.png',
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
</script>

<template>
  <section
    class="horizontal-section relative flex w-full flex-shrink-0 items-center px-4 py-8 sm:px-8 sm:py-12 lg:h-screen lg:w-screen lg:overflow-y-auto lg:py-8"
  >
    <div class="mx-auto w-full max-w-7xl lg:my-auto">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="mb-6 text-center text-4xl font-bold lg:mb-8 lg:text-5xl"
      >
        {{ t("projects.title") }}
      </h2>

      <div class="grid gap-6 md:grid-cols-2 md:gap-5 lg:gap-4">
        <!-- Featured Project -->
        <Card
          v-if="featuredProject"
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :visible-once="{
            opacity: 1,
            scale: 1,
            transition: { delay: 100, duration: 600 },
          }"
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
                  :src="featuredProject.image"
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
          v-for="(project, idx) in otherProjects"
          :key="project.key"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{
            opacity: 1,
            y: 0,
            transition: { delay: 200 + idx * 100, duration: 600 },
          }"
          class="group overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-border"
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
