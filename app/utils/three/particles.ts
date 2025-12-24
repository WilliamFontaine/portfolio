import * as THREE from 'three'

/**
 * Three.js particle system utilities
 * Creates and manages background particle effects
 */

/**
 * Create background particle system
 */
export function createParticleSystem(): THREE.Points {
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

  return new THREE.Points(particleGeometry, particleMaterial)
}

/**
 * Update particle rotation based on time
 */
export function updateParticles(particles: THREE.Points[], time: number) {
  particles.forEach((ps) => {
    ps.rotation.y = time * ROTATION_SPEEDS.PARTICLE_Y
    ps.rotation.x = time * ROTATION_SPEEDS.PARTICLE_X
  })
}

/**
 * Cleanup particle systems
 */
export function cleanupParticles(particles: THREE.Points[]) {
  particles.forEach((ps) => {
    ps.geometry.dispose();
    (ps.material as THREE.Material).dispose()
  })
}
