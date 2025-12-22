<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section
    class="horizontal-section relative flex w-full flex-shrink-0 items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:h-screen lg:w-screen lg:overflow-y-auto lg:py-8"
  >
    <div class="relative z-10 w-full max-w-5xl">
      <!-- Available Badge -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{
          opacity: 1,
          y: 0,
          transition: { delay: 100, duration: 600 },
        }"
      >
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
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible-once="{
          opacity: 1,
          y: 0,
          transition: { delay: 200, duration: 800 },
        }"
        class="text-5xl font-bold tracking-tight sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl"
      >
        {{ t("hero.greeting") }}<br />
        <span
          class="bg-gradient-to-r from-teal-400 via-teal-300 to-orange-400 bg-clip-text text-transparent"
        >
          {{ t("hero.name") }}
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{
          opacity: 1,
          y: 0,
          transition: { delay: 400, duration: 600 },
        }"
        class="mt-4 text-xl font-medium text-muted-foreground lg:text-2xl"
      >
        {{ t("hero.title") }}
      </p>

      <!-- Description -->
      <p
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{
          opacity: 1,
          y: 0,
          transition: { delay: 500, duration: 600 },
        }"
        class="mt-6 max-w-2xl text-lg text-muted-foreground/80"
      >
        {{ t("hero.description") }}
      </p>

      <!-- CTAs -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{
          opacity: 1,
          y: 0,
          transition: { delay: 700, duration: 600 },
        }"
        class="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
      >
        <Button
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
          variant="outline"
          size="lg"
          class="w-full justify-center gap-2 border-white/20 bg-white/5 px-8 backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/10 sm:w-auto"
        >
          {{ t("hero.cta.projects") }}
          <Icon name="lucide:arrow-down" class="h-5 w-5" />
        </Button>
      </div>

      <!-- Social Links -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visible-once="{
          opacity: 1,
          transition: { delay: 900, duration: 600 },
        }"
        class="mt-8 flex items-center gap-4 sm:mt-12"
      >
        <span class="text-sm text-muted-foreground">{{
          t("contact.social")
        }}</span>
        <div class="flex gap-2">
          <a
            href="https://github.com/WilliamFontaine"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-400"
            aria-label="GitHub"
          >
            <Icon name="lucide:github" class="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/willidev-it"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-400"
            aria-label="LinkedIn"
          >
            <Icon name="lucide:linkedin" class="h-5 w-5" />
          </a>
          <a
            href="https://www.malt.fr/profile/willidev-it"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-400"
            aria-label="Malt"
          >
            <Icon name="simple-icons:malt" class="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
