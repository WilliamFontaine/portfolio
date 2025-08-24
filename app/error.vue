<template>
  <div class="relative min-h-screen flex items-center justify-center">
    <!-- Séparation visuelle avec accent rouge -->
    <div class="absolute inset-x-0 top-0">
      <div class="h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent dark:via-red-700/30"></div>
      <div class="h-20 bg-gradient-to-b from-red-50/20 to-transparent dark:from-red-950/10 pointer-events-none"></div>
    </div>
    
    <!-- Éléments décoratifs subtils cohérents -->
    <div class="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-red-400/5 to-orange-400/5 rounded-full blur-xl animate-pulse"></div>
    <div class="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-orange-400/5 to-red-400/5 rounded-full blur-xl animate-pulse delay-1000"></div>
    
    <UContainer class="relative z-10">
      <div class="text-center max-w-2xl mx-auto">
        <!-- Badge d'erreur cohérent avec le design system -->
        <div class="inline-flex items-center gap-2 bg-red-100/80 dark:bg-red-900/40 px-4 py-2 rounded-full mb-6">
          <UIcon name="i-lucide-alert-triangle" class="h-4 w-4 text-red-600 dark:text-red-400" />
          <span class="text-sm font-medium text-red-700 dark:text-red-300 uppercase tracking-wider">
            {{ t('error.badge') }}
          </span>
        </div>
        
        <!-- Card d'erreur élégante cohérente -->
        <UCard class="backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-0 shadow-2xl shadow-red-100/20 dark:shadow-red-900/10">
          <div class="p-8 sm:p-12">
            <!-- Icône d'erreur -->
            <div class="mb-8">
              <div class="mx-auto w-20 h-20 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-full flex items-center justify-center">
                <UIcon name="i-lucide-alert-triangle" class="h-10 w-10 text-red-500 dark:text-red-400" />
              </div>
            </div>
            
            <!-- Titre avec gradient cohérent -->
            <h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 dark:from-slate-100 dark:via-red-100 dark:to-slate-100 bg-clip-text text-transparent">
              {{ t('error.title') }}
            </h1>
            
            <p class="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {{ t('error.message') }}
            </p>
            
            <!-- Actions avec style cohérent -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <UButton 
                to="/" 
                icon="i-lucide-home"
                size="lg"
                class="hover:scale-105 transition-all duration-300"
              >
                {{ t('error.backHome') }}
              </UButton>
              
              <UButton 
                icon="i-lucide-refresh-cw" 
                variant="outline"
                size="lg"
                class="hover:scale-105 transition-all duration-300"
                @click="refresh()"
              >
                {{ t('error.retry') }}
              </UButton>
            </div>
            
            <!-- Ligne décorative cohérente -->
            <div class="flex items-center justify-center mt-8">
              <div class="h-px w-16 bg-gradient-to-r from-transparent via-red-300/50 to-transparent dark:via-red-700/30"></div>
              <UIcon name="i-lucide-heart" class="h-4 w-4 mx-4 text-red-400" />
              <div class="h-px w-16 bg-gradient-to-l from-transparent via-red-300/50 to-transparent dark:via-red-700/30"></div>
            </div>
          </div>
        </UCard>
        
        <!-- Bottom decoration cohérent -->
        <div class="flex justify-center mt-16">
          <div class="flex items-center space-x-2 opacity-40">
            <div class="h-1 w-1 bg-red-500 rounded-full animate-pulse"></div>
            <div class="h-1 w-1 bg-orange-500 rounded-full animate-pulse [animation-delay:0.5s]"></div>
            <div class="h-1 w-1 bg-red-500 rounded-full animate-pulse [animation-delay:1s]"></div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
const { t } = useI18n()

// Fonction de rafraîchissement
const refresh = () => {
  window.location.reload()
}

// SEO pour la page d'erreur
useSeoMeta({
  title: t('error.title'),
  description: t('error.message')
})
</script>