<script setup lang="ts">
const { t } = useI18n()

const services = computed(() => [
  { icon: 'lucide:code-2', text: t('about.services.custom') },
  { icon: 'lucide:refresh-cw', text: t('about.services.modernization') },
  { icon: 'lucide:users', text: t('about.services.reinforcement') },
])

const education = computed(() => [
  t('about.education.master'),
  t('about.education.bachelor'),
  t('about.education.dut'),
])
</script>

<template>
  <section
    class="horizontal-section relative flex w-full flex-shrink-0 items-center px-4 py-8 sm:px-8 sm:py-12 lg:h-screen lg:w-screen lg:overflow-y-auto lg:py-8"
  >
    <div
      class="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-2 md:gap-12 lg:my-auto lg:gap-16"
    >
      <!-- Left: Photo + Stats -->
      <div
        class="flex flex-col items-center justify-center gap-8 md:items-start"
      >
        <!-- Photo with glow -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :visible-once="{
            opacity: 1,
            scale: 1,
            transition: { duration: 800 },
          }"
          class="relative"
        >
          <div
            class="absolute -inset-4 rounded-full bg-gradient-to-r from-teal-400/50 to-orange-400/50 blur-2xl"
          />
          <div
            class="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-400 to-orange-400 opacity-75"
          />
          <Avatar
            class="relative h-48 w-48 border-4 border-background md:h-56 md:w-56 lg:h-64 lg:w-64"
          >
            <AvatarImage src="/images/profil.png" alt="William Fontaine" />
            <AvatarFallback class="text-4xl">WF</AvatarFallback>
          </Avatar>
        </div>

        <!-- Stats -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{
            opacity: 1,
            y: 0,
            transition: { delay: 300, duration: 600 },
          }"
          class="flex gap-8"
        >
          <div class="text-center">
            <span class="block text-4xl font-bold text-teal-400 lg:text-5xl"
              >4+</span
            >
            <span class="text-sm text-muted-foreground">{{
              t("about.stats.experience")
            }}</span>
          </div>
          <div class="h-16 w-px bg-border" />
          <div class="text-center">
            <span class="block text-4xl font-bold text-orange-400 lg:text-5xl"
              >100%</span
            >
            <span class="text-sm text-muted-foreground">{{
              t("about.stats.satisfaction")
            }}</span>
          </div>
        </div>
      </div>

      <!-- Right: Content -->
      <div class="flex flex-col justify-center">
        <h2
          v-motion
          :initial="{ opacity: 0, x: 30 }"
          :visible-once="{
            opacity: 1,
            x: 0,
            transition: { delay: 100, duration: 600 },
          }"
          class="text-4xl font-bold lg:text-5xl"
        >
          {{ t("about.title") }}
        </h2>

        <p
          v-motion
          :initial="{ opacity: 0, x: 30 }"
          :visible-once="{
            opacity: 1,
            x: 0,
            transition: { delay: 200, duration: 600 },
          }"
          class="mt-6 text-lg text-muted-foreground"
        >
          {{ t("about.description") }}
        </p>

        <!-- Philosophy -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 30 }"
          :visible-once="{
            opacity: 1,
            x: 0,
            transition: { delay: 300, duration: 600 },
          }"
          class="mt-8 rounded-lg border border-teal-500/20 bg-teal-500/5 p-6"
        >
          <h3 class="flex items-center gap-2 font-semibold text-teal-400">
            <Icon name="lucide:quote" class="h-5 w-5" />
            {{ t("about.philosophy.title") }}
          </h3>
          <p class="mt-2 text-muted-foreground italic">
            "{{ t("about.philosophy.content") }}"
          </p>
        </div>

        <!-- Services -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 30 }"
          :visible-once="{
            opacity: 1,
            x: 0,
            transition: { delay: 400, duration: 600 },
          }"
          class="mt-8"
        >
          <h3 class="mb-4 font-semibold">{{ t("about.services.title") }}</h3>
          <ul class="space-y-3">
            <li
              v-for="(service, idx) in services"
              :key="idx"
              class="flex items-start gap-3"
            >
              <Icon
                :name="service.icon"
                class="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-400"
              />
              <span class="text-muted-foreground">{{ service.text }}</span>
            </li>
          </ul>
        </div>

        <!-- Education -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 30 }"
          :visible-once="{
            opacity: 1,
            x: 0,
            transition: { delay: 500, duration: 600 },
          }"
          class="mt-6"
        >
          <h3 class="mb-3 flex items-center gap-2 font-semibold">
            <Icon
              name="lucide:graduation-cap"
              class="h-5 w-5 text-orange-400"
            />
            {{ t("about.education.title") }}
          </h3>
          <ul class="space-y-1 text-sm text-muted-foreground">
            <li v-for="(edu, idx) in education" :key="idx">{{ edu }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
