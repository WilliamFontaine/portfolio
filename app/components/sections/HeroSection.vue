<script setup lang="ts">
const { t } = useI18n()
const { prefersReducedMotion } = useBreakpoints()

// Magnetic effect strength constants
const BUTTON_MAGNETIC = { strength: 0.15, scale: 1.02 }
const SOCIAL_MAGNETIC = { strength: 0.25, scale: 1.1 }

// Element refs for GSAP animations
const sectionRef = ref<HTMLElement>()
const badgeRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const nameRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const descriptionRef = ref<HTMLElement>()
const ctasRef = ref<HTMLElement>()
const socialRef = ref<HTMLElement>()

// Magnetic effect refs for CTA buttons
const ctaButtonRef = ref<HTMLElement>()
const secondaryButtonRef = ref<HTMLElement>()

// Social link refs for magnetic effect
const githubLinkRef = ref<HTMLElement>()
const linkedinLinkRef = ref<HTMLElement>()
const maltLinkRef = ref<HTMLElement>()

// Apply magnetic effects
useMagneticEffect(ctaButtonRef, BUTTON_MAGNETIC)
useMagneticEffect(secondaryButtonRef, BUTTON_MAGNETIC)
useMagneticEffect(githubLinkRef, SOCIAL_MAGNETIC)
useMagneticEffect(linkedinLinkRef, SOCIAL_MAGNETIC)
useMagneticEffect(maltLinkRef, SOCIAL_MAGNETIC)

// Get scroll context for navigation
const scrollContext = inject<{
  scrollToSection?: (index: number) => void;
} | null>('scrollContext', null)

// Use section animation composable
const { animate } = useSectionAnimation({
  sectionRef,
  sectionIndex: 0,
})

// Scroll to projects section (index 3)
const scrollToProjects = () => {
  if (scrollContext?.scrollToSection) {
    scrollContext.scrollToSection(3)
  } else {
    // Fallback: find section by class and scroll to it
    const projectsSection = document.querySelectorAll('.horizontal-section')[3]
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

// GSAP entrance animations
onMounted(() => {
  if (prefersReducedMotion.value || !import.meta.client) return

  nextTick(() => {
    // Badge animation
    animate(
      badgeRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: EASING.smooth },
    )

    // Title animation
    animate(
      titleRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: EASING.smooth },
    )

    // Name animation with character split
    if (nameRef.value) {
      const result = splitText(nameRef.value, 'chars')
      animate(
        result.elements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.03,
          delay: 0.4,
          ease: 'power2.out',
        },
      )
    }

    // Subtitle animation
    animate(
      subtitleRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.7, ease: EASING.smooth },
    )

    // Description animation
    animate(
      descriptionRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: EASING.smooth },
    )

    // CTAs animation
    animate(
      ctasRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 1.0, ease: EASING.smooth },
    )

    // Social links animation
    animate(
      socialRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 1.2, ease: EASING.smooth },
    )
  })
})
</script>

<template>
  <section
    ref="sectionRef"
    class="horizontal-section relative flex w-full flex-shrink-0 items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:h-screen lg:w-screen lg:overflow-y-auto lg:py-8"
  >
    <div class="relative z-10 w-full max-w-5xl">
      <!-- Available Badge -->
      <div ref="badgeRef">
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
        class="text-5xl font-bold tracking-tight sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl"
      >
        <span ref="titleRef">{{ t("hero.greeting") }}</span>
        <br />
        <span
          ref="nameRef"
          class="bg-gradient-to-r from-teal-400 via-teal-300 to-orange-400 bg-clip-text text-transparent"
        >
          {{ t("hero.name") }}
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        ref="subtitleRef"
        class="mt-4 text-xl font-medium text-muted-foreground lg:text-2xl"
      >
        {{ t("hero.title") }}
      </p>

      <!-- Description -->
      <p
        ref="descriptionRef"
        class="mt-6 max-w-2xl text-lg text-muted-foreground/80"
      >
        {{ t("hero.description") }}
      </p>

      <!-- CTAs -->
      <div
        ref="ctasRef"
        class="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
      >
        <Button
          ref="ctaButtonRef"
          as="a"
          href="https://www.malt.fr/profile/willidev-it"
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
      <div ref="socialRef" class="mt-8 flex items-center gap-4 sm:mt-12">
        <span class="text-sm text-muted-foreground">{{
          t("contact.social")
        }}</span>
        <div class="flex gap-2">
          <Button
            ref="githubLinkRef"
            as="a"
            href="https://github.com/WilliamFontaine"
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
            href="https://www.linkedin.com/in/willidev-it"
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
            href="https://www.malt.fr/profile/willidev-it"
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
