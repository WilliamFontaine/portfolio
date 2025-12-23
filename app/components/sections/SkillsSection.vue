<script setup lang="ts">
const { t } = useI18n()

// Stack principale (maîtrisée au quotidien)
const mainStack = [
  { name: 'Vue.js', icon: 'logos:vue', category: 'Frontend' },
  { name: 'Nuxt', icon: 'logos:nuxt-icon', category: 'Frontend' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', category: 'Frontend' },
  { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon', category: 'Frontend' },
  { name: 'Pinia', icon: 'logos:pinia', category: 'Frontend' },
  { name: 'NestJS', icon: 'logos:nestjs', category: 'Backend' },
  { name: 'Node.js', icon: 'logos:nodejs-icon', category: 'Backend' },
  { name: 'Prisma', icon: 'logos:prisma', category: 'Backend' },
  { name: 'PostgreSQL', icon: 'logos:postgresql', category: 'Backend' },
  { name: 'Docker', icon: 'logos:docker-icon', category: 'DevOps' },
  { name: 'Git', icon: 'logos:git-icon', category: 'DevOps' },
]

// Stack secondaire (utilisée selon les projets)
const secondaryStack = [
  { name: 'Java', icon: 'logos:java', category: 'Backend' },
  { name: 'Spring Boot', icon: 'logos:spring-icon', category: 'Backend' },
  { name: 'Angular', icon: 'logos:angular-icon', category: 'Frontend' },
  { name: 'React', icon: 'logos:react', category: 'Frontend' },
  { name: 'Python', icon: 'devicon:python', category: 'Backend' },
  { name: 'Redis', icon: 'devicon:redis', category: 'Backend' },
  { name: 'Electron', icon: 'devicon:electron', category: 'Desktop' },
  { name: 'CI/CD', icon: 'simple-icons:gitlab', category: 'DevOps' },
]

// Refs
const sectionRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const mainHeaderRef = ref<HTMLElement>()
const mainGridRef = ref<HTMLElement>()
const secondaryHeaderRef = ref<HTMLElement>()
const secondaryGridRef = ref<HTMLElement>()
const extraInfoRef = ref<HTMLElement>()

useSectionAnimations({
  sectionRef,
  sectionIndex: 4,
  animations: [
    { ref: titleRef, preset: 'fadeUp', delay: 0 },
    { ref: mainHeaderRef, preset: 'slideRight', delay: 0.1 },
    createGridAnimation('.skill-item', mainGridRef, {
      preset: 'scaleUp',
      startDelay: 0.2,
      stagger: 0.04,
    }),
    { ref: secondaryHeaderRef, preset: 'slideLeft', delay: 0.25 },
    createGridAnimation('.skill-item', secondaryGridRef, {
      preset: 'scaleUp',
      startDelay: 0.35,
      stagger: 0.04,
    }),
    { ref: extraInfoRef, preset: 'fadeUp', delay: 0.5 },
  ],
  flowStagger: 0.025,
})
</script>

<template>
  <section
    ref="sectionRef"
    class="horizontal-section relative flex w-full flex-shrink-0 items-center px-4 py-8 sm:px-8 sm:py-12 lg:h-screen lg:w-screen lg:overflow-y-auto lg:py-8"
  >
    <div class="mx-auto w-full max-w-6xl lg:my-auto">
      <h2
        ref="titleRef"
        class="mb-12 text-center text-4xl font-bold lg:text-5xl"
      >
        {{ t("skills.title") }}
      </h2>

      <div class="grid gap-12 lg:grid-cols-2">
        <!-- Main Stack -->
        <div>
          <div ref="mainHeaderRef" class="mb-6">
            <h3
              class="flex items-center gap-2 text-xl font-semibold text-teal-400"
            >
              <Icon name="lucide:star" class="h-5 w-5" />
              {{ t("skills.main.title") }}
            </h3>
            <p class="mt-1 text-sm text-muted-foreground">
              {{ t("skills.main.description") }}
            </p>
          </div>

          <div ref="mainGridRef" class="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div
              v-for="skill in mainStack"
              :key="skill.name"
              class="skill-item group flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 px-4 py-3 backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/5"
            >
              <Icon
                :name="skill.icon"
                class="h-6 w-6 transition-transform group-hover:scale-110"
              />
              <span class="font-medium">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- Secondary Stack -->
        <div>
          <div ref="secondaryHeaderRef" class="mb-6">
            <h3
              class="flex items-center gap-2 text-xl font-semibold text-orange-400"
            >
              <Icon name="lucide:plus-circle" class="h-5 w-5" />
              {{ t("skills.secondary.title") }}
            </h3>
            <p class="mt-1 text-sm text-muted-foreground">
              {{ t("skills.secondary.description") }}
            </p>
          </div>

          <div
            ref="secondaryGridRef"
            class="grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            <div
              v-for="skill in secondaryStack"
              :key="skill.name"
              class="skill-item group flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 px-4 py-3 backdrop-blur-sm transition-all hover:border-orange-500/50 hover:bg-orange-500/5"
            >
              <Icon
                :name="skill.icon"
                class="h-6 w-6 transition-transform group-hover:scale-110"
              />
              <span class="font-medium">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Extra info -->
      <div
        ref="extraInfoRef"
        class="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
      >
        <div class="flex items-center gap-2">
          <Icon name="lucide:globe" class="h-4 w-4 text-teal-400" />
          <span>API REST</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="lucide:shield" class="h-4 w-4 text-teal-400" />
          <span>OAuth 2.0</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="lucide:database" class="h-4 w-4 text-teal-400" />
          <span>SQL / NoSQL</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="lucide:cloud" class="h-4 w-4 text-teal-400" />
          <span>Cloud Deploy</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="lucide:git-pull-request" class="h-4 w-4 text-teal-400" />
          <span>Code Review</span>
        </div>
      </div>
    </div>
  </section>
</template>
