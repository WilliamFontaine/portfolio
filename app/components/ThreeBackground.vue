<script setup lang="ts">
import type * as THREE from 'three'

interface Props {
  progress?: number;
}

const props = withDefaults(defineProps<Props>(), {
  progress: 0,
})

const { prefersReducedMotion } = useBreakpoints()

const containerRef = ref<HTMLDivElement>()

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationId: number
const nodes: THREE.Mesh[] = []
let connections: THREE.Line[] = []
const particles: THREE.Points[] = []

const mousePos: MousePosition = { x: 0, y: 0, targetX: 0, targetY: 0 }

function init() {
  if (!containerRef.value) return

  const reducedMotion = prefersReducedMotion.value

  // Initialize scene, camera, and renderer
  const sceneContext = createScene(containerRef.value)
  scene = sceneContext.scene
  camera = sceneContext.camera
  renderer = sceneContext.renderer

  // Create particles if motion is enabled
  if (!reducedMotion) {
    const particleSystem = createParticleSystem()
    particles.push(particleSystem)
    scene.add(particleSystem)
  }

  // Create network nodes
  const createdNodes = createNodes()
  nodes.push(...createdNodes)
  createdNodes.forEach((node) => scene.add(node))

  // Mouse tracking
  const onMouseMove = (event: MouseEvent) => {
    mousePos.targetX = (event.clientX / window.innerWidth) * 2 - 1
    mousePos.targetY = -(event.clientY / window.innerHeight) * 2 + 1
  }
  window.addEventListener('mousemove', onMouseMove)

  // Animation loop
  let time = 0
  let frameCount = 0

  function animate() {
    animationId = requestAnimationFrame(animate)
    time += reducedMotion
      ? ANIMATION_CONFIG.TIME_DELTA_REDUCED
      : ANIMATION_CONFIG.TIME_DELTA_NORMAL
    frameCount++

    // Smooth mouse movement
    mousePos.x += (mousePos.targetX - mousePos.x) * MOUSE_CONFIG.SMOOTHING
    mousePos.y += (mousePos.targetY - mousePos.y) * MOUSE_CONFIG.SMOOTHING

    // Update nodes
    updateNodes(nodes, time, props.progress, mousePos, reducedMotion)

    // Update particles
    updateParticles(particles, time)

    // Update connections periodically
    if (
      frameCount % ANIMATION_CONFIG.CONNECTION_UPDATE_INTERVAL === 0 &&
      !reducedMotion
    ) {
      connections = updateConnections(scene, nodes, connections)
    }

    // Update camera position
    const targetX =
      props.progress * CAMERA_MOVEMENT.RANGE - CAMERA_MOVEMENT.OFFSET
    camera.position.x +=
      (targetX - camera.position.x) * CAMERA_MOVEMENT.SMOOTHING
    camera.position.y = mousePos.y * CAMERA_MOVEMENT.MOUSE_Y_INFLUENCE
    camera.lookAt(camera.position.x, 0, 0)

    renderer.render(scene, camera)
  }

  animate()
  window.addEventListener('resize', handleResize)
}

function handleResize() {
  if (!containerRef.value || !camera || !renderer) return
  handleSceneResize(containerRef.value, camera, renderer)
}

function cleanup() {
  if (animationId) cancelAnimationFrame(animationId)

  cleanupNodes(nodes, connections)
  cleanupParticles(particles)

  if (renderer) {
    cleanupScene(renderer)
  }

  window.removeEventListener('resize', handleResize)
}

onMounted(() => init())
onUnmounted(() => cleanup())
</script>

<template>
  <div
    ref="containerRef"
    class="fixed inset-0 -z-10 overflow-hidden"
    aria-hidden="true"
  />
</template>
