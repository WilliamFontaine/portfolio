<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('seo.title'),
  description: t('seo.description'),
  ogTitle: t('seo.title'),
  ogDescription: t('seo.description'),
  ogType: 'website',
  ogUrl: URLS.SITE.BASE_URL,
  twitterTitle: t('seo.title'),
  twitterDescription: t('seo.description'),
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <HorizontalScroller />
  </div>
</template>
