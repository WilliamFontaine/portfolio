<script setup lang="ts">
const { t } = useI18n()

const {
  sectionRef,
  titleRef,
  descRef,
  ctasRef,
  socialRef,
  locationRef,
  maltButtonRef,
  emailButtonRef,
} = createSectionRefs(
  'sectionRef',
  'titleRef',
  'descRef',
  'ctasRef',
  'socialRef',
  'locationRef',
  'maltButtonRef',
  'emailButtonRef',
)

// Apply magnetic effects
useMagneticEffect(maltButtonRef, MAGNETIC_EFFECTS.BUTTON)
useMagneticEffect(emailButtonRef, MAGNETIC_EFFECTS.BUTTON)

useSectionAnimations({
  sectionRef,
  sectionIndex: 5,
  animations: [
    ...createFadeUpSequence(
      [titleRef, descRef, ctasRef, socialRef, locationRef],
      { startDelay: 0, increment: 0.1 },
    ),
  ],
  flowStagger: 0.02,
})
</script>

<template>
  <section
    ref="sectionRef"
    class="horizontal-section relative flex w-full flex-shrink-0 items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:h-screen lg:w-screen lg:overflow-y-auto lg:py-8"
  >
    <div class="w-full max-w-3xl text-center">
      <!-- Title -->
      <h2
        ref="titleRef"
        class="opacity-0 text-4xl font-bold lg:text-5xl xl:text-6xl"
      >
        {{ t("contact.title") }}
      </h2>

      <!-- Description -->
      <p ref="descRef" class="opacity-0 mt-6 text-xl text-muted-foreground">
        {{ t("contact.description") }}
      </p>

      <!-- CTAs -->
      <div
        ref="ctasRef"
        class="opacity-0 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <Button
          ref="maltButtonRef"
          as="a"
          :href="URLS.SOCIAL.MALT"
          target="_blank"
          size="lg"
          class="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 px-8 text-white shadow-lg shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-teal-700 hover:shadow-xl hover:shadow-teal-500/30"
        >
          <Icon name="simple-icons:malt" class="h-5 w-5" />
          {{ t("contact.cta.malt") }}
        </Button>

        <Button
          ref="emailButtonRef"
          as="a"
          href="mailto:contact@wfontaine.fr"
          variant="outline"
          size="lg"
          class="gap-2 border-border/50 px-8 backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/5"
        >
          <Icon name="lucide:mail" class="h-5 w-5" />
          {{ t("contact.cta.email") }}
        </Button>
      </div>

      <!-- Social -->
      <div ref="socialRef" class="opacity-0 mt-12">
        <SocialLinks layout="grid" show-label />
      </div>

      <!-- Location -->
      <div
        ref="locationRef"
        class="opacity-0 mt-12 flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-2 sm:text-base"
      >
        <div class="flex items-center gap-2">
          <Icon name="lucide:map-pin" class="h-4 w-4 text-teal-400" />
          <span>{{ t("contact.location") }}</span>
        </div>
        <span class="hidden text-muted-foreground/50 sm:inline">•</span>
        <span class="text-teal-400">{{ t("contact.remote") }}</span>
      </div>
    </div>
  </section>
</template>
