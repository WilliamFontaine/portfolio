<script setup lang="ts">
const { t } = useI18n()

const {
  sectionRef,
  badgeRef,
  titleRef,
  nameRef,
  subtitleRef,
  descriptionRef,
  ctasRef,
  socialRef,
  ctaButtonRef,
  secondaryButtonRef,
} = createSectionRefs(
  'sectionRef',
  'badgeRef',
  'titleRef',
  'nameRef',
  'subtitleRef',
  'descriptionRef',
  'ctasRef',
  'socialRef',
  'ctaButtonRef',
  'secondaryButtonRef',
)

useMagneticEffect(ctaButtonRef, MAGNETIC_EFFECTS.BUTTON)
useMagneticEffect(secondaryButtonRef, MAGNETIC_EFFECTS.BUTTON)

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
    { ref: titleRef, preset: 'fadeUp', delay: 0.15 },
    {
      ref: nameRef,
      preset: {
        from: { opacity: 0, y: 50, scale: 0.7, rotationX: -15 },
        to: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: 'back.out(2)',
        },
      },
      delay: 0.35,
      splitMode: 'chars',
      stagger: 0.04,
    },
    { ref: subtitleRef, preset: 'fadeUp', delay: 1.0 },
    { ref: descriptionRef, preset: 'fadeUp', delay: 1.2 },
    { ref: ctasRef, preset: 'fadeUp', delay: 1.35 },
    { ref: socialRef, preset: 'fadeUp', delay: 1.55 },
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
      <div ref="badgeRef" class="opacity-0">
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
        <span ref="titleRef" class="opacity-0">{{ t("hero.greeting") }}</span>
        <br />
        <span
          ref="nameRef"
          class="opacity-0 whitespace-nowrap bg-gradient-to-r from-teal-400 via-teal-300 to-orange-400 bg-clip-text text-transparent"
        >
          {{ t("hero.name") }}
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        ref="subtitleRef"
        class="opacity-0 mt-4 text-xl font-medium text-muted-foreground lg:text-2xl"
      >
        {{ t("hero.title") }}
      </p>

      <!-- Description -->
      <p
        ref="descriptionRef"
        class="opacity-0 mt-6 max-w-2xl text-lg text-muted-foreground/80"
      >
        {{ t("hero.description") }}
      </p>

      <!-- CTAs -->
      <div
        ref="ctasRef"
        class="opacity-0 mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
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
      <div ref="socialRef" class="opacity-0 mt-8 sm:mt-12">
        <SocialLinks layout="horizontal" show-label :magnetic="true" />
      </div>
    </div>
  </section>
</template>
