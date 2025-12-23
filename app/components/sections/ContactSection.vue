<script setup lang="ts">
const { t } = useI18n()

// Refs
const sectionRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const descRef = ref<HTMLElement>()
const ctasRef = ref<HTMLElement>()
const socialRef = ref<HTMLElement>()
const locationRef = ref<HTMLElement>()

// CTA button refs for magnetic effect
const maltButtonRef = ref<HTMLElement>()
const emailButtonRef = ref<HTMLElement>()

// Apply magnetic effects
useMagneticEffect(maltButtonRef, MAGNETIC_EFFECTS.BUTTON)
useMagneticEffect(emailButtonRef, MAGNETIC_EFFECTS.BUTTON)

// Use section animation composable
const { animate } = useSectionAnimation({
  sectionRef,
  sectionIndex: 5,
})

// Setup animations on mount
useAnimateOnMount(() => {
  animate(
    titleRef.value,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, ease: EASING.smooth },
  )
  animate(
    descRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: EASING.smooth },
  )
  animate(
    ctasRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: EASING.smooth },
  )
  animate(
    socialRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: EASING.smooth },
  )
  animate(
    locationRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: EASING.smooth },
  )
})
</script>

<template>
  <section
    ref="sectionRef"
    class="horizontal-section relative flex w-full flex-shrink-0 items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:h-screen lg:w-screen lg:overflow-y-auto lg:py-8"
  >
    <div class="w-full max-w-3xl text-center">
      <!-- Title -->
      <h2 ref="titleRef" class="text-4xl font-bold lg:text-5xl xl:text-6xl">
        {{ t("contact.title") }}
      </h2>

      <!-- Description -->
      <p ref="descRef" class="mt-6 text-xl text-muted-foreground">
        {{ t("contact.description") }}
      </p>

      <!-- CTAs -->
      <div
        ref="ctasRef"
        class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <Button
          ref="maltButtonRef"
          as="a"
          href="https://www.malt.fr/profile/willidev-it"
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
      <div ref="socialRef" class="mt-12">
        <p class="mb-4 text-sm text-muted-foreground">
          {{ t("contact.social") }}
        </p>
        <div class="flex justify-center gap-4">
          <Button
            v-for="link in socialLinks"
            :key="link.name"
            as="a"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="icon"
            class="h-14 w-14 rounded-full border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-400"
            :aria-label="link.name"
          >
            <Icon :name="link.icon" class="h-6 w-6" />
          </Button>
        </div>
      </div>

      <!-- Location -->
      <div
        ref="locationRef"
        class="mt-12 flex items-center justify-center gap-2 text-muted-foreground"
      >
        <Icon name="lucide:map-pin" class="h-4 w-4 text-teal-400" />
        <span>{{ t("contact.location") }}</span>
        <span class="text-muted-foreground/50">•</span>
        <span class="text-teal-400">{{ t("contact.remote") }}</span>
      </div>
    </div>
  </section>
</template>
