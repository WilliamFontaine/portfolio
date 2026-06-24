<script setup lang="ts">
interface Props {
  /** Display layout */
  layout?: 'horizontal' | 'grid'
  /** Show label */
  showLabel?: boolean
  /** Label text (uses i18n key if not provided) */
  labelText?: string
  /** Button size variant */
  size?: 'icon' | 'icon-sm' | 'icon-lg'
  /** Apply magnetic effect to buttons */
  magnetic?: boolean
  /** Additional CSS class */
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'horizontal',
  showLabel: false,
  labelText: undefined,
  size: 'icon',
  magnetic: false,
  class: undefined,
})

const { t } = useI18n()

// Create individual refs for each social link if magnetic effect is needed
const githubRef = ref<HTMLElement>()
const linkedinRef = ref<HTMLElement>()
const maltRef = ref<HTMLElement>()

const linkRefs: Record<string, Ref<HTMLElement | undefined>> = {
  GitHub: githubRef,
  LinkedIn: linkedinRef,
  Malt: maltRef,
}

// Apply magnetic effects if enabled
if (props.magnetic) {
  useMagneticEffect(githubRef, MAGNETIC_EFFECTS.SOCIAL)
  useMagneticEffect(linkedinRef, MAGNETIC_EFFECTS.SOCIAL)
  useMagneticEffect(maltRef, MAGNETIC_EFFECTS.SOCIAL)
}
</script>

<template>
  <div
    :class="[
      layout === 'horizontal' ? 'flex items-center gap-4' : 'flex flex-col items-center gap-4',
      props.class,
    ]"
  >
    <span v-if="showLabel" class="text-sm font-medium text-muted-foreground/70">
      {{ labelText || t('contact.social') }}
    </span>
    <div :class="layout === 'horizontal' ? 'flex gap-3' : 'flex justify-center gap-4'">
      <Button
        v-for="link in socialLinks"
        :key="link.name"
        :ref="linkRefs[link.name]"
        as="a"
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
        variant="outline"
        :size="size"
        :class="[
          layout === 'grid' ? 'h-14 w-14 rounded-full' : 'h-11 w-11 rounded-xl',
          'border-border/50 bg-card/50 text-muted-foreground backdrop-blur-sm transition-all hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-400',
        ]"
        :aria-label="link.name"
      >
        <Icon :name="link.icon" :size="layout === 'grid' ? '24' : '20'" />
      </Button>
    </div>
  </div>
</template>
