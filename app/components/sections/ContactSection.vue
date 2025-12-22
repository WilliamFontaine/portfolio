<script setup lang="ts">
import { socialLinks } from '~/config/social'

const { t } = useI18n()
</script>

<template>
  <section
    class="horizontal-section relative flex w-full flex-shrink-0 items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:h-screen lg:w-screen lg:overflow-y-auto lg:py-8"
  >
    <div class="w-full max-w-3xl text-center">
      <!-- Title -->
      <h2
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-4xl font-bold lg:text-5xl xl:text-6xl"
      >
        {{ t("contact.title") }}
      </h2>

      <!-- Description -->
      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{
          opacity: 1,
          y: 0,
          transition: { delay: 100, duration: 600 },
        }"
        class="mt-6 text-xl text-muted-foreground"
      >
        {{ t("contact.description") }}
      </p>

      <!-- CTAs -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{
          opacity: 1,
          y: 0,
          transition: { delay: 200, duration: 600 },
        }"
        class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <Button
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
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visible-once="{
          opacity: 1,
          transition: { delay: 400, duration: 600 },
        }"
        class="mt-12"
      >
        <p class="mb-4 text-sm text-muted-foreground">
          {{ t("contact.social") }}
        </p>
        <div class="flex justify-center gap-4">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-full border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-400"
            :aria-label="link.name"
          >
            <Icon :name="link.icon" class="h-6 w-6" />
          </a>
        </div>
      </div>

      <!-- Location -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visible-once="{
          opacity: 1,
          transition: { delay: 500, duration: 600 },
        }"
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
