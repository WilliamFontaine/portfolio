<script setup lang="ts">
const { t } = useI18n()

const sectionRef = ref<HTMLElement>()
const badgeRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const nameRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const descriptionRef = ref<HTMLElement>()
const ctasRef = ref<HTMLElement>()
const socialRef = ref<HTMLElement>()

const ctaButtonRef = ref<HTMLElement>()
const secondaryButtonRef = ref<HTMLElement>()
const githubLinkRef = ref<HTMLElement>()
const linkedinLinkRef = ref<HTMLElement>()
const maltLinkRef = ref<HTMLElement>()

useMagneticEffect(ctaButtonRef, MAGNETIC_EFFECTS.BUTTON)
useMagneticEffect(secondaryButtonRef, MAGNETIC_EFFECTS.BUTTON)
useMagneticEffect(githubLinkRef, MAGNETIC_EFFECTS.SOCIAL)
useMagneticEffect(linkedinLinkRef, MAGNETIC_EFFECTS.SOCIAL)
useMagneticEffect(maltLinkRef, MAGNETIC_EFFECTS.SOCIAL)

const scrollContext = inject<{
  scrollToSection?: (index: number) => void;
} | null>('scrollContext', null)

const scrollToProjects = () => {
  if (scrollContext?.scrollToSection) {
    scrollContext.scrollToSection(3)
  } else {
    const projectsSection = document.querySelectorAll('.horizontal-section')[3]
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

useSectionAnimations({
  sectionRef,
  sectionIndex: 0,
  animations: [
    { ref: badgeRef, preset: 'fadeUp', delay: 0 },
    { ref: titleRef, preset: 'fadeUp', delay: 0.1 },
    {
      ref: nameRef,
      preset: {
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      },
      delay: 0.25,
      splitMode: 'chars',
      stagger: 0.025,
    },
    { ref: subtitleRef, preset: 'fadeUp', delay: 0.5 },
    { ref: descriptionRef, preset: 'fadeUp', delay: 0.6 },
    { ref: ctasRef, preset: 'fadeUp', delay: 0.75 },
    { ref: socialRef, preset: 'fadeUp', delay: 0.9 },
  ],
  flowStagger: 0.02,
})
</script>

<template>
  <section
    ref="sectionRef"
    class="horizontal-section relative flex w-full flex-shrink-0 items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:h-screen lg:w-screen lg:overflow-y-auto lg:py-8"
  >
    <div class="relative z-10 w-full max-w-5xl">
      <!-- Available Badge -->
      <div ref="badgeRef" style="opacity: 0">
        <Badge
          class="mb-6 gap-2 border-teal-500/30 bg-teal-500/10 px-4 py-2 text-sm text-teal-400"
          variant="outline"
        >
          <span class="h-2.5 w-2.5 animate-pulse rounded-full bg-teal-400" />
          {{ t("hero.available") }}
        </Badge>
      </div>

      <!-- Title -->
      <h1
        class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
      >
        <span ref="titleRef" style="opacity: 0">{{ t("hero.greeting") }}</span>
        <br />
        <span
          ref="nameRef"
          style="opacity: 0"
          class="whitespace-nowrap bg-gradient-to-r from-teal-400 via-teal-300 to-orange-400 bg-clip-text text-transparent"
        >
          {{ t("hero.name") }}
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        ref="subtitleRef"
        style="opacity: 0"
        class="mt-4 text-xl font-medium text-muted-foreground lg:text-2xl"
      >
        {{ t("hero.title") }}
      </p>

      <!-- Description -->
      <p
        ref="descriptionRef"
        style="opacity: 0"
        class="mt-6 max-w-2xl text-lg text-muted-foreground/80"
      >
        {{ t("hero.description") }}
      </p>

      <!-- CTAs -->
      <div
        ref="ctasRef"
        style="opacity: 0"
        class="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
      >
        <Button
          ref="ctaButtonRef"
          as="a"
          :href="URLS.SOCIAL.MALT"
          target="_blank"
          size="lg"
          class="w-full justify-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 px-8 text-white shadow-lg shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-teal-700 hover:shadow-xl hover:shadow-teal-500/30 sm:w-auto"
        >
          <Icon name="simple-icons:malt" class="h-6 w-6" />
          {{ t("hero.cta.contact") }}
        </Button>

        <Button
          ref="secondaryButtonRef"
          variant="outline"
          size="lg"
          class="w-full justify-center gap-2 border-white/20 bg-white/5 px-8 backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/10 sm:w-auto"
          @click="scrollToProjects"
        >
          {{ t("hero.cta.projects") }}
          <Icon name="lucide:arrow-down" class="h-5 w-5" />
        </Button>
      </div>

      <!-- Social Links -->
      <div
        ref="socialRef"
        style="opacity: 0"
        class="mt-8 flex items-center gap-4 sm:mt-12"
      >
        <span class="text-sm text-muted-foreground">{{
          t("contact.social")
        }}</span>
        <div class="flex gap-2">
          <Button
            ref="githubLinkRef"
            as="a"
            :href="URLS.SOCIAL.GITHUB"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="icon"
            class="h-10 w-10 rounded-lg border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-400"
            aria-label="GitHub"
          >
            <Icon name="lucide:github" class="h-5 w-5" />
          </Button>
          <Button
            ref="linkedinLinkRef"
            as="a"
            :href="URLS.SOCIAL.LINKEDIN"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="icon"
            class="h-10 w-10 rounded-lg border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-400"
            aria-label="LinkedIn"
          >
            <Icon name="lucide:linkedin" class="h-5 w-5" />
          </Button>
          <Button
            ref="maltLinkRef"
            as="a"
            :href="URLS.SOCIAL.MALT"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="icon"
            class="h-10 w-10 rounded-lg border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-400"
            aria-label="Malt"
          >
            <Icon name="simple-icons:malt" class="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
