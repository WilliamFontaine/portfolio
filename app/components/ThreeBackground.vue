<script setup lang="ts">
import * as THREE from 'three'

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
const mousePos = { x: 0, y: 0, targetX: 0, targetY: 0 }

// Configuration
const NODE_COUNT = 25
const PARTICLE_COUNT = 60
const CONNECTION_DISTANCE = 55
const COLORS = {
  teal: 0x2dd4bf,
  orange: 0xfb923c,
  white: 0xffffff,
}

interface NodeData {
  velocity: THREE.Vector3;
  basePosition: THREE.Vector3;
  phase: number;
  originalZ: number;
  layer: number;
}

// Background particles
const particles: THREE.Points[] = []

function createBackgroundParticles() {
  const particleGeometry = new THREE.BufferGeometry()
  const positions: number[] = []
  const colors: number[] = []

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions.push(
      (Math.random() - 0.5) * 500,
      (Math.random() - 0.5) * 150,
      -50 + Math.random() * -100,
    )

    const t = Math.random()
    const color = new THREE.Color(COLORS.white).lerp(
      new THREE.Color(COLORS.teal),
      t * 0.5,
    )
    colors.push(color.r, color.g, color.b)
  }

  particleGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3),
  )
  particleGeometry.setAttribute(
    'color',
    new THREE.Float32BufferAttribute(colors, 3),
  )

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.8,
    transparent: true,
    opacity: 0.15,
    vertexColors: true,
    sizeAttenuation: true,
  })

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
  particles.push(particleSystem)
  scene.add(particleSystem)
}

function init() {
  if (!containerRef.value) return

  const reducedMotion = prefersReducedMotion.value
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
  camera.position.z = 100

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  containerRef.value.appendChild(renderer.domElement)

  // Create background particles (very subtle, far away)
  if (!reducedMotion) {
    createBackgroundParticles()
  }

  // Create main nodes with depth layers
  const nodeGeometry = new THREE.SphereGeometry(1, 16, 16)

  for (let i = 0; i < NODE_COUNT; i++) {
    const t = i / NODE_COUNT
    const layer = i % 3

    const color = new THREE.Color(COLORS.teal).lerp(
      new THREE.Color(COLORS.orange),
      t,
    )

    const layerOpacity = layer === 0 ? 0.3 : layer === 1 ? 0.5 : 0.6

    const nodeMaterial = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: layerOpacity,
    })

    const node = new THREE.Mesh(nodeGeometry, nodeMaterial)

    const sectionIndex = Math.floor(i / (NODE_COUNT / 6))
    const xOffset = (sectionIndex - 2.5) * 80
    const layerZ = layer === 0 ? -30 : layer === 1 ? 0 : 30

    node.position.x = xOffset + (Math.random() - 0.5) * 70
    node.position.y = (Math.random() - 0.5) * 60
    node.position.z = layerZ + (Math.random() - 0.5) * 20

    const layerScale = layer === 0 ? 0.6 : layer === 1 ? 0.9 : 1.2
    node.scale.setScalar(layerScale)

    const nodeData: NodeData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.003,
      ),
      basePosition: node.position.clone(),
      phase: Math.random() * Math.PI * 2,
      originalZ: node.position.z,
      layer,
    }
    node.userData = nodeData

    nodes.push(node)
    scene.add(node)
  }

  // Mouse tracking with smooth interpolation
  const onMouseMove = (event: MouseEvent) => {
    mousePos.targetX = (event.clientX / window.innerWidth) * 2 - 1
    mousePos.targetY = -(event.clientY / window.innerHeight) * 2 + 1
  }
  window.addEventListener('mousemove', onMouseMove)

  // Animation
  let time = 0
  let frameCount = 0

  function updateConnections() {
    connections.forEach((conn) => {
      scene.remove(conn)
      conn.geometry.dispose();
      (conn.material as THREE.Material).dispose()
    })
    connections = []

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i]!.position.distanceTo(nodes[j]!.position)
        if (dist < CONNECTION_DISTANCE) {
          const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.2
          const points = [
            nodes[i]!.position.clone(),
            nodes[j]!.position.clone(),
          ]
          const geometry = new THREE.BufferGeometry().setFromPoints(points)

          const t = (i + j) / (nodes.length * 2)
          const color = new THREE.Color(COLORS.teal).lerp(
            new THREE.Color(COLORS.orange),
            t,
          )

          const material = new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity,
          })
          const line = new THREE.Line(geometry, material)
          connections.push(line)
          scene.add(line)
        }
      }
    }
  }

  function animate() {
    animationId = requestAnimationFrame(animate)
    time += reducedMotion ? 0.001 : 0.003
    frameCount++

    // Smooth mouse interpolation
    mousePos.x += (mousePos.targetX - mousePos.x) * 0.05
    mousePos.y += (mousePos.targetY - mousePos.y) * 0.05

    // Animate nodes with parallax based on layer
    nodes.forEach((node, i) => {
      const data = node.userData as NodeData

      // Parallax multiplier based on layer (farther = slower)
      const parallaxMultiplier =
        data.layer === 0 ? 0.5 : data.layer === 1 ? 0.8 : 1.2

      // Organic floating motion
      const floatAmplitude = reducedMotion ? 0.5 : 2
      node.position.x =
        data.basePosition.x + Math.sin(time + data.phase) * floatAmplitude
      node.position.y =
        data.basePosition.y +
        Math.cos(time * 0.8 + data.phase) * floatAmplitude
      node.position.z =
        data.basePosition.z +
        Math.sin(time * 0.5 + data.phase) * (floatAmplitude * 0.75)

      // Mouse influence (more for foreground, less for background)
      const mouseInfluence = mousePos.x * 5 * parallaxMultiplier
      node.position.x += mouseInfluence
      node.position.y += mousePos.y * 3 * parallaxMultiplier

      // Slow drift
      if (!reducedMotion) {
        data.basePosition.add(data.velocity)
      }

      // Boundary with soft bounce
      const boundX = 200
      const boundY = 60
      if (Math.abs(data.basePosition.x) > boundX) {
        data.velocity.x *= -1
        data.basePosition.x = Math.sign(data.basePosition.x) * boundX
      }
      if (Math.abs(data.basePosition.y) > boundY) {
        data.velocity.y *= -1
        data.basePosition.y = Math.sign(data.basePosition.y) * boundY
      }

      // Pulse effect with layer-based variation
      const mat = node.material as THREE.MeshBasicMaterial
      const baseOpacity =
        data.layer === 0 ? 0.25 : data.layer === 1 ? 0.4 : 0.55
      mat.opacity = baseOpacity + Math.sin(time * 1.5 + i * 0.3) * 0.1

      // Scale based on section progress
      const nodeSection = Math.floor((data.basePosition.x + 200) / 80)
      const currentProgress = props.progress * 5
      const sectionDiff = Math.abs(nodeSection - currentProgress)
      const baseScale = data.layer === 0 ? 0.6 : data.layer === 1 ? 0.9 : 1.2
      const scaleFactor = Math.max(0.5, 1 - sectionDiff * 0.15)
      node.scale.setScalar(baseScale * scaleFactor)
    })

    // Animate background particles with slow rotation
    particles.forEach((ps) => {
      ps.rotation.y = time * 0.02
      ps.rotation.x = time * 0.01
    })

    // Update connections every 3 frames
    if (frameCount % 3 === 0 && !reducedMotion) {
      updateConnections()
    }

    // Camera follows scroll progress with smooth easing
    const targetX = props.progress * 400 - 200
    camera.position.x += (targetX - camera.position.x) * 0.05
    camera.position.y = mousePos.y * 8
    camera.lookAt(camera.position.x, 0, 0)

    renderer.render(scene, camera)
  }

  animate()
  window.addEventListener('resize', handleResize)
}

function handleResize() {
  if (!containerRef.value || !camera || !renderer) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

function cleanup() {
  if (animationId) cancelAnimationFrame(animationId)

  connections.forEach((conn) => {
    conn.geometry.dispose();
    (conn.material as THREE.Material).dispose()
  })

  nodes.forEach((node) => {
    node.geometry.dispose();
    (node.material as THREE.Material).dispose()
  })

  particles.forEach((ps) => {
    ps.geometry.dispose();
    (ps.material as THREE.Material).dispose()
  })

  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
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
