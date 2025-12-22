<script setup lang="ts">
import * as THREE from 'three'

interface Props {
  progress?: number;
}

const props = withDefaults(defineProps<Props>(), {
  progress: 0,
})

const containerRef = ref<HTMLDivElement>()

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationId: number
const nodes: THREE.Mesh[] = []
let connections: THREE.Line[] = []
const mousePos = { x: 0, y: 0 }

const NODE_COUNT = 20 // Reduced for subtlety
const CONNECTION_DISTANCE = 50 // Slightly larger to compensate fewer nodes
const COLORS = {
  teal: 0x2dd4bf,
  orange: 0xfb923c,
}

interface NodeData {
  velocity: THREE.Vector3;
  basePosition: THREE.Vector3;
  phase: number;
  originalZ: number;
}

function init() {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
  camera.position.z = 100

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  containerRef.value.appendChild(renderer.domElement)

  // Create nodes
  const nodeGeometry = new THREE.SphereGeometry(1, 16, 16)

  for (let i = 0; i < NODE_COUNT; i++) {
    const t = i / NODE_COUNT
    const color = new THREE.Color(COLORS.teal).lerp(
      new THREE.Color(COLORS.orange),
      t,
    )
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.5, // More subtle
    })

    const node = new THREE.Mesh(nodeGeometry, nodeMaterial)

    // Distribute across the horizontal space (6 sections = 6x width)
    const sectionIndex = Math.floor(i / (NODE_COUNT / 6))
    const xOffset = (sectionIndex - 2.5) * 80

    node.position.x = xOffset + (Math.random() - 0.5) * 60
    node.position.y = (Math.random() - 0.5) * 60
    node.position.z = (Math.random() - 0.5) * 40

    const nodeData: NodeData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.008, // Slower drift
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.004,
      ),
      basePosition: node.position.clone(),
      phase: Math.random() * Math.PI * 2,
      originalZ: node.position.z,
    }
    node.userData = nodeData

    nodes.push(node)
    scene.add(node)
  }

  // Mouse tracking
  const onMouseMove = (event: MouseEvent) => {
    mousePos.x = (event.clientX / window.innerWidth) * 2 - 1
    mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1
  }
  window.addEventListener('mousemove', onMouseMove)

  // Animation
  let time = 0
  let frameCount = 0

  function updateConnections() {
    // Remove old connections
    connections.forEach((conn) => {
      scene.remove(conn)
      conn.geometry.dispose();
      (conn.material as THREE.Material).dispose()
    })
    connections = []

    // Create new connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i]!.position.distanceTo(nodes[j]!.position)
        if (dist < CONNECTION_DISTANCE) {
          const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.2 // More subtle connections
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
    time += 0.003 // Slower animation speed
    frameCount++

    // Animate nodes
    nodes.forEach((node, i) => {
      const data = node.userData as NodeData

      // Organic floating motion - more subtle amplitude
      node.position.x = data.basePosition.x + Math.sin(time + data.phase) * 2
      node.position.y =
        data.basePosition.y + Math.cos(time * 0.8 + data.phase) * 2
      node.position.z =
        data.basePosition.z + Math.sin(time * 0.5 + data.phase) * 1.5

      // Slow drift
      data.basePosition.add(data.velocity)

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

      // Pulse effect - more subtle
      const mat = node.material as THREE.MeshBasicMaterial
      mat.opacity = 0.4 + Math.sin(time * 1.5 + i * 0.3) * 0.15

      // Scale based on section progress
      const nodeSection = Math.floor((data.basePosition.x + 200) / 80)
      const currentProgress = props.progress * 5
      const sectionDiff = Math.abs(nodeSection - currentProgress)
      const scaleFactor = Math.max(0.5, 1 - sectionDiff * 0.15)
      node.scale.setScalar(scaleFactor)
    })

    // Update connections every 3 frames
    if (frameCount % 3 === 0) {
      updateConnections()
    }

    // Camera follows scroll progress
    const targetX = props.progress * 400 - 200
    camera.position.x += (targetX - camera.position.x) * 0.05
    camera.position.y = mousePos.y * 10
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
