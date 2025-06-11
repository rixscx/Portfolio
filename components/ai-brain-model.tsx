"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// Define AI skill categories
const aiSkillCategories = [
  {
    name: "Machine Learning",
    color: new THREE.Color(0xcccccc),
    skills: ["Regression", "Classification", "Clustering", "Ensemble Methods"],
    position: new THREE.Vector3(0.8, 0.3, 0.5),
  },
  {
    name: "Deep Learning",
    color: new THREE.Color(0x99bbff),
    skills: ["Neural Networks", "CNN", "RNN", "Transformers"],
    position: new THREE.Vector3(-0.8, 0.3, 0.5),
  },
  {
    name: "Computer Vision",
    color: new THREE.Color(0xcccccc),
    skills: ["Object Detection", "Image Classification", "Segmentation"],
    position: new THREE.Vector3(0.5, 0.8, -0.5),
  },
  {
    name: "NLP",
    color: new THREE.Color(0x99bbff),
    skills: ["Text Analysis", "Sentiment Analysis", "LLMs", "Named Entity Recognition"],
    position: new THREE.Vector3(-0.5, -0.8, -0.5),
  },
  {
    name: "Data Science",
    color: new THREE.Color(0xcccccc),
    skills: ["Data Cleaning", "Feature Engineering", "Statistical Analysis"],
    position: new THREE.Vector3(0, -0.8, 0.5),
  },
]

export default function AIBrainModel() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [isInteracting, setIsInteracting] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const brainModelRef = useRef<THREE.Group | null>(null)
  const nodeMapRef = useRef<Map<string, THREE.Object3D>>(new Map())
  const animationFrameRef = useRef<number | null>(null)
  const pulseEffectsRef = useRef<THREE.Mesh[]>([])

  useEffect(() => {
    if (!canvasRef.current || isInitialized) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 3
    camera.position.y = 0.5
    cameraRef.current = camera

    // Renderer setup with improved quality
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.setClearColor(0x000000, 0) // Set transparent background
    rendererRef.current = renderer

    if (canvasRef.current) {
      // Set renderer size to match container
      const width = canvasRef.current.clientWidth
      const height = canvasRef.current.clientHeight || 400 // Fallback height
      renderer.setSize(width, height)
      canvasRef.current.appendChild(renderer.domElement)
    }

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    controls.maxDistance = 5
    controls.minDistance = 1.5
    controlsRef.current = controls

    controls.addEventListener("start", () => setIsInteracting(true))
    controls.addEventListener("end", () => setIsInteracting(false))

    // Lighting setup
    const setupLights = () => {
      // Ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
      scene.add(ambientLight)

      // Main directional light
      const mainLight = new THREE.DirectionalLight(0xffffff, 0.8)
      mainLight.position.set(5, 5, 5)
      mainLight.castShadow = true
      mainLight.shadow.mapSize.width = 1024
      mainLight.shadow.mapSize.height = 1024
      scene.add(mainLight)

      // Subtle accent light
      const accentLight1 = new THREE.PointLight(0x99bbff, 0.5)
      accentLight1.position.set(-2, 1, 3)
      scene.add(accentLight1)

      const accentLight2 = new THREE.PointLight(0x99bbff, 0.5)
      accentLight2.position.set(2, -1, 3)
      scene.add(accentLight2)

      // Bottom fill light
      const fillLight = new THREE.PointLight(0xffffff, 0.3)
      fillLight.position.set(0, -3, 0)
      scene.add(fillLight)
    }

    setupLights()

    // Create AI Brain Model
    const createAIBrainModel = () => {
      const brainGroup = new THREE.Group()
      const nodeMap = new Map<string, THREE.Object3D>()

      // Create brain hemisphere
      const createBrainHemisphere = () => {
        const radius = 1
        const brainGeometry = new THREE.SphereGeometry(radius, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
        const brainMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x1a1a1a,
          metalness: 0.2,
          roughness: 0.3,
          transparent: true,
          opacity: 0.9,
          wireframe: false,
          emissive: 0x000000,
          emissiveIntensity: 0.05,
        })

        const hemisphere = new THREE.Mesh(brainGeometry, brainMaterial)
        hemisphere.rotation.x = Math.PI
        hemisphere.position.y = 0
        hemisphere.castShadow = true
        hemisphere.receiveShadow = true

        return hemisphere
      }

      // Create brain base
      const createBrainBase = () => {
        const baseGeometry = new THREE.CircleGeometry(1.2, 32)
        const baseMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x0a0a0a,
          metalness: 0.2,
          roughness: 0.8,
          transparent: true,
          opacity: 0.7,
        })

        const base = new THREE.Mesh(baseGeometry, baseMaterial)
        base.rotation.x = -Math.PI / 2
        base.position.y = -0.05
        base.receiveShadow = true

        return base
      }

      // Add brain hemisphere and base
      const hemisphere = createBrainHemisphere()
      const base = createBrainBase()
      brainGroup.add(hemisphere)
      brainGroup.add(base)

      // Add subtle glow effect to brain
      const addBrainGlow = () => {
        const glowGeometry = new THREE.SphereGeometry(1.05, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: 0x99bbff,
          transparent: true,
          opacity: 0.05,
          side: THREE.BackSide,
        })

        const glow = new THREE.Mesh(glowGeometry, glowMaterial)
        glow.rotation.x = Math.PI
        glow.position.y = 0

        return glow
      }

      const brainGlow = addBrainGlow()
      brainGroup.add(brainGlow)

      // Create central core node
      const coreGeometry = new THREE.SphereGeometry(0.15, 24, 24)
      const coreMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        emissive: 0x99bbff,
        emissiveIntensity: 0.3,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9,
      })

      const coreNode = new THREE.Mesh(coreGeometry, coreMaterial)
      coreNode.position.set(0, 0.3, 0)
      coreNode.castShadow = true
      brainGroup.add(coreNode)
      nodeMap.set("AI Core", coreNode)

      // Create category nodes and connections
      aiSkillCategories.forEach((category) => {
        // Create category node
        const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16)
        const nodeMaterial = new THREE.MeshPhysicalMaterial({
          color: category.color,
          emissive: category.color,
          emissiveIntensity: 0.3,
          metalness: 0.8,
          roughness: 0.2,
          transparent: true,
          opacity: 0.9,
        })

        const categoryNode = new THREE.Mesh(nodeGeometry, nodeMaterial)

        // Position node on the hemisphere surface
        const scaledPosition = category.position.clone().multiplyScalar(0.9)
        categoryNode.position.copy(scaledPosition)
        categoryNode.castShadow = true
        brainGroup.add(categoryNode)
        nodeMap.set(category.name, categoryNode)

        // Create connection from core to category
        const createConnection = (start: THREE.Vector3, end: THREE.Vector3, color: THREE.Color) => {
          // Create curve for the connection
          const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)

          // Add some curve by offsetting the midpoint
          const direction = new THREE.Vector3().subVectors(end, start).normalize()
          const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x).normalize()
          midPoint.add(perpendicular.multiplyScalar(0.05 + Math.random() * 0.05)) // Reduced curve

          // Create quadratic bezier curve
          const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end)

          // Create tube geometry along the curve
          const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.007, 8, false) // Reduced thickness
          const tubeMaterial = new THREE.MeshPhysicalMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.1, // Reduced intensity
            metalness: 0.3,
            roughness: 0.5,
            transparent: true,
            opacity: 0.5, // Reduced opacity
          })

          const tube = new THREE.Mesh(tubeGeometry, tubeMaterial)
          tube.castShadow = true
          return tube
        }

        // Connect core to category
        const connection = createConnection(coreNode.position, categoryNode.position, category.color)
        brainGroup.add(connection)
      })

      return { brainGroup, nodeMap }
    }

    const { brainGroup, nodeMap } = createAIBrainModel()
    brainModelRef.current = brainGroup
    nodeMapRef.current = nodeMap
    scene.add(brainGroup)

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // Handle mouse move for interaction
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Handle resize with ResizeObserver for more reliable resizing
    const handleResize = () => {
      if (!canvasRef.current || !cameraRef.current || !rendererRef.current) return

      const width = canvasRef.current.clientWidth
      const height = canvasRef.current.clientHeight || 400 // Fallback height

      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
    }

    // Use ResizeObserver for more reliable resizing
    const resizeObserver = new ResizeObserver(handleResize)
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current)
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initial sizing

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update()
      }

      // Animate brain model
      if (brainModelRef.current) {
        // Subtle floating animation
        brainModelRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.02 // Reduced amplitude
      }

      // Animate nodes
      nodeMapRef.current.forEach((node, name) => {
        if (name === hoveredSkill || name === hoveredCategory) {
          // Enhanced effect for hovered nodes
          node.scale.set(1.1, 1.1, 1.1) // Reduced scale

          if (node instanceof THREE.Mesh && node.material instanceof THREE.MeshPhysicalMaterial) {
            node.material.emissiveIntensity = 0.5 + Math.sin(elapsedTime * 5) * 0.1 // Reduced intensity
          }
        } else {
          // Normal pulsing for other nodes
          const isCore = name === "AI Core"
          const isCategory = aiSkillCategories.some((cat) => cat.name === name)

          const pulseFrequency = isCore ? 1.0 : isCategory ? 1.2 : 1.5 // Reduced frequency
          const pulseAmplitude = isCore ? 0.03 : isCategory ? 0.02 : 0.01 // Reduced amplitude

          const pulse = 1 + Math.sin(elapsedTime * pulseFrequency) * pulseAmplitude
          node.scale.set(pulse, pulse, pulse)

          if (node instanceof THREE.Mesh && node.material instanceof THREE.MeshPhysicalMaterial) {
            const baseIntensity = isCore ? 0.3 : isCategory ? 0.2 : 0.1 // Reduced intensity
            node.material.emissiveIntensity = baseIntensity + Math.sin(elapsedTime * 2) * 0.05 // Reduced intensity
          }
        }
      })

      // Raycasting for interaction
      if (!isInteracting && cameraRef.current) {
        raycaster.setFromCamera(mouse, cameraRef.current)
        const intersects = raycaster.intersectObjects(brainModelRef.current?.children || [], true)

        let foundSkill = null
        let foundCategory = null

        if (intersects.length > 0) {
          // Find which node was intersected
          for (const [name, node] of nodeMapRef.current.entries()) {
            if (intersects[0].object === node) {
              if (aiSkillCategories.some((cat) => cat.name === name)) {
                foundCategory = name
              } else if (name !== "AI Core") {
                foundSkill = name
              } else {
                foundSkill = name
              }
              break
            }
          }
        }

        if (foundSkill !== hoveredSkill) {
          setHoveredSkill(foundSkill)
        }

        if (foundCategory !== hoveredCategory) {
          setHoveredCategory(foundCategory)
        }
      }

      // Render
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    animate()
    setIsInitialized(true)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (canvasRef.current) {
        resizeObserver.unobserve(canvasRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)

      if (canvasRef.current && rendererRef.current) {
        canvasRef.current.removeChild(rendererRef.current.domElement)
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Dispose of geometries and materials
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose()
            if (object.material instanceof THREE.Material) {
              object.material.dispose()
            } else if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose())
            }
          }
        })
      }
    }
  }, [isInitialized])

  return (
    <div ref={canvasRef} className="w-full h-full relative overflow-hidden" style={{ minHeight: "400px" }}>
      {/* Skill information overlay */}
      {(hoveredSkill || hoveredCategory) && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#0A0A0A]/90 to-[#0A0A0A]/80 px-6 py-3 rounded-lg text-white text-sm backdrop-blur-md border border-[#5D3FD3]/40 z-20 pointer-events-none shadow-lg">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#5D3FD3] mr-2 animate-pulse"></div>
            <span className="font-medium">{hoveredSkill || hoveredCategory}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {hoveredSkill === "AI Core"
              ? "Central AI processing unit"
              : hoveredCategory
                ? `${hoveredCategory} category - Core AI capability`
                : "Specialized AI skill"}
          </div>
        </div>
      )}

      {/* Controls hint */}
      <div className="absolute bottom-4 right-4 bg-[#0A0A0A]/70 px-3 py-2 rounded-md text-xs text-gray-400 backdrop-blur-sm border border-gray-800 z-10 pointer-events-none opacity-70">
        <div className="flex items-center mb-1">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M8 15L12 19L16 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Drag to rotate</span>
        </div>
        <div className="flex items-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M15 15L19 19M19 19L19 15M19 19L15 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 9L5 5M5 5L5 9M5 5L9 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Scroll to zoom</span>
        </div>
      </div>
    </div>
  )
}
