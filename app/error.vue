<template>
  <NuxtLayout>
    <div
      class="relative min-h-screen flex items-center justify-center bg-background text-foreground px-4"
    >
      <div class="relative z-10 w-full max-w-xl text-center">
        <!-- Badge d'erreur -->
        <Badge
          variant="outline"
          class="mb-6 gap-2 border-teal-500/30 bg-teal-500/10 px-4 py-2 text-sm text-teal-400"
        >
          <Icon name="lucide:alert-triangle" class="size-4" />
          {{ t("error.badge") }}
        </Badge>

        <!-- Code d'erreur avec gradient -->
        <h1
          class="text-8xl sm:text-9xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-teal-300 to-orange-400 bg-clip-text text-transparent"
        >
          {{ error?.statusCode || 404 }}
        </h1>

        <!-- Titre -->
        <h2 class="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
          {{ t("error.title") }}
        </h2>

        <!-- Description -->
        <p class="mt-4 text-lg text-muted-foreground/80">
          {{ t("error.message") }}
        </p>

        <!-- Actions -->
        <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            class="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 px-8 text-white shadow-lg shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-teal-700 hover:shadow-xl hover:shadow-teal-500/30"
            @click="handleError"
          >
            <Icon name="lucide:home" class="size-5" />
            {{ t("error.backHome") }}
          </Button>

          <Button
            variant="outline"
            size="lg"
            class="gap-2 border-white/20 bg-white/5 px-8 backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/10"
            @click="refresh"
          >
            <Icon name="lucide:refresh-cw" class="size-5" />
            {{ t("error.retry") }}
          </Button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number;
    message: string;
  };
}>()

const { t } = useI18n()

const handleError = () => clearError({ redirect: '/' })
const refresh = () => window.location.reload()

useSeoMeta({
  title: t('error.title'),
  description: t('error.message'),
})
</script>
