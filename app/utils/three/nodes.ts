import * as THREE from 'three'

/**
 * Three.js network node utilities
 * Creates and manages network nodes and their connections
 */

export interface NodeData {
  velocity: THREE.Vector3;
  basePosition: THREE.Vector3;
  phase: number;
  originalZ: number;
  layer: number;
}

interface LayerConfig {
  opacity: number;
  scale: number;
  zDepth: number;
  parallax: number;
}

export interface MousePosition {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

/**
 * Get layer configuration for depth effect
 */
export function getLayerConfig(layer: number): LayerConfig {
  const configs: LayerConfig[] = [
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
  ]

  return configs[layer] ?? configs[0]!
}

/**
 * Create network nodes with layered depth effect
 */
export function createNodes(): THREE.Mesh[] {
  const nodes: THREE.Mesh[] = []
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
  }

  return nodes
}

/**
 * Update connections between nearby nodes
 */
export function updateConnections(
  scene: THREE.Scene,
  nodes: THREE.Mesh[],
  connections: THREE.Line[],
): THREE.Line[] {
  // Remove old connections
  connections.forEach((conn) => {
    scene.remove(conn)
    conn.geometry.dispose();
    (conn.material as THREE.Material).dispose()
  })

  const newConnections: THREE.Line[] = []

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i]!.position.distanceTo(nodes[j]!.position)
      if (dist < CONNECTION_DISTANCE) {
        const opacity =
          (1 - dist / CONNECTION_DISTANCE) * CONNECTION_CONFIG.MAX_OPACITY
        const points = [nodes[i]!.position.clone(), nodes[j]!.position.clone()]
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
        newConnections.push(line)
        scene.add(line)
      }
    }
  }

  return newConnections
}

/**
 * Update node positions and opacity based on time and progress
 */
export function updateNodes(
  nodes: THREE.Mesh[],
  time: number,
  progress: number,
  mousePos: MousePosition,
  reducedMotion: boolean,
) {
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
    const currentProgress = progress * SCALE_CONFIG.PROGRESS_MULTIPLIER
    const sectionDiff = Math.abs(nodeSection - currentProgress)
    const scaleFactor = Math.max(
      SCALE_CONFIG.MIN_SCALE,
      1 - sectionDiff * SCALE_CONFIG.DISTANCE_FACTOR,
    )
    node.scale.setScalar(layerConfig.scale * scaleFactor)
  })
}

/**
 * Cleanup node resources
 */
export function cleanupNodes(nodes: THREE.Mesh[], connections: THREE.Line[]) {
  connections.forEach((conn) => {
    conn.geometry.dispose();
    (conn.material as THREE.Material).dispose()
  })

  nodes.forEach((node) => {
    node.geometry.dispose();
    (node.material as THREE.Material).dispose()
  })
}
