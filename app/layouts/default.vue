<template>
  <UMain>
    <!-- Header personnalisé -->
    <header class="border-b border-slate-200 dark:border-slate-800 bg-white/75 dark:bg-slate-900/75 backdrop-blur-lg sticky top-0 z-50">
      <UContainer>
        <div class="flex items-center justify-between py-4">
          <!-- Logo et nom -->
          <NuxtLinkLocale :to="localePath('/')" class="flex items-center space-x-2 sm:space-x-3 group">
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-indigo-500/25">
              <UIcon name="i-lucide-code" class="text-white text-sm sm:text-lg" />
            </div>
            <div class="min-w-0">
              <h1 class="font-bold text-lg sm:text-xl bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent truncate">
                William Fontaine
              </h1>
              <div class="hidden sm:block text-xs text-slate-500 dark:text-slate-400 -mt-1">
                {{ t('header.tagline') }}
              </div>
            </div>
          </NuxtLinkLocale>

          <!-- Actions droite -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <!-- Liens sociaux desktop seulement -->
            <UButton
              to="https://linkedin.com/in/williamftn"
              target="_blank"
              color="primary"
              variant="soft"
              icon="i-lucide-linkedin"
              size="sm"
              class="hidden lg:flex"
            >
              {{ t('common.linkedin') }}
            </UButton>

            <UButton
              to="https://github.com/WilliamFontaine"
              target="_blank"
              color="neutral"
              variant="ghost"
              icon="i-lucide-github"
              size="sm"
              class="hidden lg:flex"
            >
              {{ t('common.github') }}
            </UButton>

            <div class="flex items-center space-x-2">
              <ULocaleSelect
                :model-value="locale"
                :locales="availableLocales"
                @update:model-value="setLocale($event)"
              />

              <UColorModeButton />
            </div>
          </div>
        </div>
      </UContainer>
    </header>

    <slot />

    <!-- Footer -->
    <footer class="border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
      <UContainer>
        <!-- Mobile -->
        <div class="block md:hidden py-8 text-center space-y-8">
          <div class="space-y-3">
            <div class="flex items-center justify-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <UIcon name="i-lucide-code" class="text-white text-sm" />
              </div>
              <h3 class="font-bold text-lg">William Fontaine</h3>
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-400">{{ t('header.tagline') }}</p>
          </div>
          
          <div class="flex flex-wrap justify-center gap-3">
            <UButton to="mailto:william.fontaine0308@gmail.com" color="primary" variant="soft" icon="i-lucide-mail" size="sm">
              {{ t('footer.contact') }}
            </UButton>
            <UButton
            to="https://linkedin.com/in/williamftn"
            target="_blank"
            color="neutral"
            variant="ghost"
            icon="i-lucide-linkedin"
            size="sm" 
          />
            <UButton
              to="https://github.com/WilliamFontaine"
              target="_blank"
              color="neutral"
              variant="ghost"
              icon="i-lucide-github"
              size="sm" 
            />
          </div>

          <div class="pt-6 border-t border-gray-200 dark:border-slate-700 space-y-3">
            <div class="flex items-center justify-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <span>{{ t('footer.madeWith') }}</span>
              <UIcon name="i-lucide-zap" class="text-cyan-500" />
              <span>Nuxt 4</span>
              <span>+</span>
              <UIcon name="i-lucide-triangle" class="text-cyan-500" />
              <span>Vue 3</span>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('footer.copyright') }}</p>
          </div>
        </div>

        <!-- Desktop -->
        <div class="hidden md:flex justify-between items-start py-8">
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded flex items-center justify-center">
                <UIcon name="i-lucide-code" class="text-white text-sm" />
              </div>
              <span class="font-semibold text-sm">William Fontaine</span>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('footer.copyright') }}</p>
          </div>

          <div class="flex flex-col items-end space-y-4">
            <div class="flex items-center space-x-3">
              <UButton to="mailto:william.fontaine0308@gmail.com" color="primary" variant="soft" icon="i-lucide-mail" size="sm">
                {{ t('footer.contact') }}
              </UButton>
              <UButton
                to="https://linkedin.com/in/williamftn"
                target="_blank"
                color="neutral"
                variant="ghost"
                icon="i-lucide-linkedin"
                size="sm"
              />
              <UButton
                to="https://github.com/WilliamFontaine"
                target="_blank"
                color="neutral"
                variant="ghost"
                icon="i-lucide-github"
                size="sm" 
              />
            </div>
            
            <div class="text-right text-sm text-slate-600 dark:text-slate-400">
              <div class="flex items-center justify-end space-x-2">
                <span>{{ t('footer.madeWith') }}</span>
                <UIcon name="i-lucide-zap" class="text-emerald-500" />
                <span>Nuxt 4</span>
                <span>+</span>
                <UIcon name="i-lucide-triangle" class="text-emerald-500" />
                <span>Vue 3</span>
              </div>
            </div>
          </div>
        </div>

      </UContainer>
    </footer>
  </UMain>
</template>

<script lang="ts" setup>
const { locale, locales, t, setLocale } = useI18n()
const localePath = useLocalePath()

const availableLocales = computed(() => locales.value.map((l) => ({ code: l.code, name: l.name })))
</script>