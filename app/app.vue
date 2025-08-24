<template>
  <UApp>
    <!-- Background global unifié avec couleurs plus prononcées -->
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-100/60 to-cyan-100/80 dark:from-slate-900 dark:via-indigo-900/40 dark:to-cyan-900/60">
      <!-- Radial overlay global avec plus d'intensité -->
      <div class="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-300/20 via-emerald-200/10 to-cyan-300/20 dark:from-indigo-700/20 dark:via-emerald-800/10 dark:to-cyan-700/20 pointer-events-none animate-pulse [animation-duration:8s]"></div>
      
      <!-- Éléments décoratifs animés globaux -->
      <div class="fixed top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/5 to-cyan-400/5 rounded-full blur-3xl animate-float"></div>
      <div class="fixed bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-emerald-400/5 to-indigo-400/5 rounded-full blur-2xl animate-float-delay"></div>
      
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>