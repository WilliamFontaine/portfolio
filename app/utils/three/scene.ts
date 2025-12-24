import * as THREE from 'three'

/**
 * Three.js scene utilities
 * Handles scene, camera, and renderer setup/cleanup
 */

export interface SceneContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

/**
 * Initialize Three.js scene with camera and renderer
 */
export function createScene(container: HTMLElement): SceneContext {
  const width = container.clientWidth
  const height = container.clientHeight

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    CAMERA_CONFIG.FOV,
    width / height,
    CAMERA_CONFIG.NEAR,
    CAMERA_CONFIG.FAR,
  )
  camera.position.z = CAMERA_CONFIG.INITIAL_Z

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, CAMERA_CONFIG.MAX_PIXEL_RATIO),
  )
  container.appendChild(renderer.domElement)

  return { scene, camera, renderer }
}

/**
 * Handle window resize for camera and renderer
 */
export function handleSceneResize(
  container: HTMLElement,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
) {
  const width = container.clientWidth
  const height = container.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

/**
 * Cleanup scene resources
 */
export function cleanupScene(renderer: THREE.WebGLRenderer) {
  renderer.dispose()
  renderer.domElement.remove()
}
