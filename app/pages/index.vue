<template>
  <div>
    <!-- Hero Section -->
    <Hero />

    <!-- Experience Section -->
    <Experience />
    
    <!-- Projects Showcase -->
    <ProjectsShowcase />

    <!-- Skills Grid -->
    <SkillsGrid />
    
    <!-- Formation Section -->
    <Formation />
  </div>
</template>

<script setup>
const { t } = useI18n()

useSeoMeta({
  title: t('seo.title'),
  description: t('seo.description'),
  ogTitle: t('seo.title'),
  ogDescription: t('seo.description'),
  ogType: 'website',
  ogUrl: 'https://wfontaine.fr',
  twitterTitle: t('seo.title'),
  twitterDescription: t('seo.description'),
  twitterCard: 'summary_large_image'
})
</script>