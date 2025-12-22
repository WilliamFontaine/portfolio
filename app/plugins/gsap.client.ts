export default defineNuxtPlugin({
  name: 'gsap',
  enforce: 'pre',
  setup() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
  },
})
