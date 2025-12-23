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

interface NodeData {
  velocity: THREE.Vector3;
  basePosition: THREE.Vector3;
  phase: number;
  originalZ: number;
  layer: number;
}

const particles: THREE.Points[] = []

function createBackgroundParticles() {
  const particleGeometry = new THREE.BufferGeometry()
  const positions: number[] = []
  const colors: number[] = []

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions.push(
      (Math.random() - 0.5) * PARTICLE_CONFIG.SPREAD.X,
      (Math.random() - 0.5) * PARTICLE_CONFIG.SPREAD.Y,
      PARTICLE_CONFIG.SPREAD.Z_MIN +
        Math.random() * PARTICLE_CONFIG.SPREAD.Z_MAX,
    )

    const t = Math.random()
    const color = new THREE.Color(THREE_COLORS.WHITE).lerp(
      new THREE.Color(THREE_COLORS.TEAL),
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
    size: PARTICLE_CONFIG.SIZE,
    transparent: true,
    opacity: PARTICLE_CONFIG.OPACITY,
    vertexColors: true,
    sizeAttenuation: true,
  })

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
  particles.push(particleSystem)
  scene.add(particleSystem)
}

function getLayerConfig(layer: number) {
  const configs = [
    {
      opacity: NODE_CONFIG.LAYER_OPACITY.BACK,
      scale: NODE_CONFIG.LAYER_SCALE.BACK,
      zDepth: NODE_CONFIG.LAYER_Z_DEPTH.BACK,
      parallax: PARALLAX_MULTIPLIERS.BACK,
    },
    {
      opacity: NODE_CONFIG.LAYER_OPACITY.MIDDLE,
      scale: NODE_CONFIG.LAYER_SCALE.MIDDLE,
      zDepth: NODE_CONFIG.LAYER_Z_DEPTH.MIDDLE,
      parallax: PARALLAX_MULTIPLIERS.MIDDLE,
    },
    {
      opacity: NODE_CONFIG.LAYER_OPACITY.FRONT,
      scale: NODE_CONFIG.LAYER_SCALE.FRONT,
      zDepth: NODE_CONFIG.LAYER_Z_DEPTH.FRONT,
      parallax: PARALLAX_MULTIPLIERS.FRONT,
    },
  ] as const

  return configs[layer] ?? configs[0]
}

function init() {
  if (!containerRef.value) return

  const reducedMotion = prefersReducedMotion.value
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    CAMERA_CONFIG.FOV,
    width / height,
    CAMERA_CONFIG.NEAR,
    CAMERA_CONFIG.FAR,
  )
  camera.position.z = CAMERA_CONFIG.INITIAL_Z

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, CAMERA_CONFIG.MAX_PIXEL_RATIO),
  )
  containerRef.value.appendChild(renderer.domElement)

  if (!reducedMotion) {
    createBackgroundParticles()
  }

  const nodeGeometry = new THREE.SphereGeometry(
    1,
    NODE_CONFIG.GEOMETRY_DETAIL,
    NODE_CONFIG.GEOMETRY_DETAIL,
  )

  for (let i = 0; i < NODE_COUNT; i++) {
    const t = i / NODE_COUNT
    const layer = i % DEPTH_LAYERS

    const color = new THREE.Color(THREE_COLORS.TEAL).lerp(
      new THREE.Color(THREE_COLORS.ORANGE),
      t,
    )

    const layerConfig = getLayerConfig(layer)

    const nodeMaterial = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: layerConfig.opacity,
    })

    const node = new THREE.Mesh(nodeGeometry, nodeMaterial)

    const sectionIndex = Math.floor(
      i / (NODE_COUNT / NODE_POSITIONING.SECTION_COUNT),
    )
    const xOffset =
      (sectionIndex - NODE_POSITIONING.CENTER_OFFSET) *
      NODE_POSITIONING.SECTION_SPACING

    node.position.x =
      xOffset + (Math.random() - 0.5) * NODE_POSITIONING.VARIANCE.X
    node.position.y = (Math.random() - 0.5) * NODE_POSITIONING.VARIANCE.Y
    node.position.z =
      layerConfig.zDepth + (Math.random() - 0.5) * NODE_POSITIONING.VARIANCE.Z

    node.scale.setScalar(layerConfig.scale)

    const nodeData: NodeData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * VELOCITY_RANGES.X,
        (Math.random() - 0.5) * VELOCITY_RANGES.Y,
        (Math.random() - 0.5) * VELOCITY_RANGES.Z,
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

  const onMouseMove = (event: MouseEvent) => {
    mousePos.targetX = (event.clientX / window.innerWidth) * 2 - 1
    mousePos.targetY = -(event.clientY / window.innerHeight) * 2 + 1
  }
  window.addEventListener('mousemove', onMouseMove)

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
          const opacity =
            (1 - dist / CONNECTION_DISTANCE) * CONNECTION_CONFIG.MAX_OPACITY
          const points = [
            nodes[i]!.position.clone(),
            nodes[j]!.position.clone(),
          ]
          const geometry = new THREE.BufferGeometry().setFromPoints(points)

          const t = (i + j) / (nodes.length * 2)
          const color = new THREE.Color(THREE_COLORS.TEAL).lerp(
            new THREE.Color(THREE_COLORS.ORANGE),
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
    time += reducedMotion
      ? ANIMATION_CONFIG.TIME_DELTA_REDUCED
      : ANIMATION_CONFIG.TIME_DELTA_NORMAL
    frameCount++

    mousePos.x += (mousePos.targetX - mousePos.x) * MOUSE_CONFIG.SMOOTHING
    mousePos.y += (mousePos.targetY - mousePos.y) * MOUSE_CONFIG.SMOOTHING

    nodes.forEach((node, i) => {
      const data = node.userData as NodeData
      const layerConfig = getLayerConfig(data.layer)

      const floatAmplitude = reducedMotion
        ? ANIMATION_CONFIG.FLOAT_AMPLITUDE_REDUCED
        : ANIMATION_CONFIG.FLOAT_AMPLITUDE_NORMAL

      node.position.x =
        data.basePosition.x + Math.sin(time + data.phase) * floatAmplitude
      node.position.y =
        data.basePosition.y +
        Math.cos(time * OSCILLATION_SPEEDS.Y + data.phase) * floatAmplitude
      node.position.z =
        data.basePosition.z +
        Math.sin(time * OSCILLATION_SPEEDS.Z + data.phase) *
          (floatAmplitude * OSCILLATION_SPEEDS.Z_AMPLITUDE)

      const mouseInfluence =
        mousePos.x * MOUSE_CONFIG.INFLUENCE_X * layerConfig.parallax
      node.position.x += mouseInfluence
      node.position.y +=
        mousePos.y * MOUSE_CONFIG.INFLUENCE_Y * layerConfig.parallax

      if (!reducedMotion) {
        data.basePosition.add(data.velocity)
      }

      if (Math.abs(data.basePosition.x) > BOUNDARIES.X) {
        data.velocity.x *= -1
        data.basePosition.x = Math.sign(data.basePosition.x) * BOUNDARIES.X
      }
      if (Math.abs(data.basePosition.y) > BOUNDARIES.Y) {
        data.velocity.y *= -1
        data.basePosition.y = Math.sign(data.basePosition.y) * BOUNDARIES.Y
      }

      const mat = node.material as THREE.MeshBasicMaterial
      mat.opacity =
        layerConfig.opacity +
        Math.sin(
          time * OPACITY_CONFIG.OSCILLATION_SPEED +
            i * OPACITY_CONFIG.PHASE_OFFSET,
        ) *
          OPACITY_CONFIG.AMPLITUDE

      const nodeSection = Math.floor(
        (data.basePosition.x + SCALE_CONFIG.SECTION_OFFSET) /
          SCALE_CONFIG.SECTION_DIVISOR,
      )
      const currentProgress = props.progress * SCALE_CONFIG.PROGRESS_MULTIPLIER
      const sectionDiff = Math.abs(nodeSection - currentProgress)
      const scaleFactor = Math.max(
        SCALE_CONFIG.MIN_SCALE,
        1 - sectionDiff * SCALE_CONFIG.DISTANCE_FACTOR,
      )
      node.scale.setScalar(layerConfig.scale * scaleFactor)
    })

    particles.forEach((ps) => {
      ps.rotation.y = time * ROTATION_SPEEDS.PARTICLE_Y
      ps.rotation.x = time * ROTATION_SPEEDS.PARTICLE_X
    })

    if (
      frameCount % ANIMATION_CONFIG.CONNECTION_UPDATE_INTERVAL === 0 &&
      !reducedMotion
    ) {
      updateConnections()
    }

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
