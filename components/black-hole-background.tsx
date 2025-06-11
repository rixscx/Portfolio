"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

// Light theme: Professional Tech Ecosystem
interface TechNode {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  tech: string
  color: string
  connections: number[]
  energy: number
  pulsePhase: number
}

// Dark theme: Black Hole System (existing)
interface ParticleSystem {
  geometry: THREE.BufferGeometry
  material: THREE.ShaderMaterial
  mesh: THREE.Points
  velocities: Float32Array
  lifetimes: Float32Array
  initialPositions: Float32Array
}

export default function AdaptiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const animationRef = useRef<number>()
  const timeRef = useRef(0)
  const scrollYRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // Performance optimization
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  useEffect(() => {
    setMounted(true)
  }, [])

  // Visibility API for performance
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  // Mouse and scroll tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleScroll = useCallback(() => {
    scrollYRef.current = window.scrollY
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleMouseMove, handleScroll])

  // Light Theme: Professional Geometric Elegance with Subtle Gloom
  const createLightThemeAnimation = useCallback(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Professional geometric elements
    interface GeometricElement {
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      rotation: number
      rotationSpeed: number
      type: "triangle" | "hexagon" | "circle" | "square"
      opacity: number
      color: string
      depth: number
      pulsePhase: number
      shadowOffset: number
    }

    const elements: GeometricElement[] = []
    const connections: Array<{ from: number; to: number; strength: number; opacity: number }> = []

    // Professional color palette with gloomy undertones
    const colors = [
      "#2D3748", // Dark gray-blue
      "#4A5568", // Medium gray
      "#718096", // Light gray
      "#1A202C", // Very dark gray
      "#2B6CB0", // Professional blue
      "#3182CE", // Lighter blue
      "#4299E1", // Accent blue
      "#553C9A", // Deep purple (gloomy touch)
      "#6B46C1", // Purple accent
    ]

    // Initialize geometric elements
    for (let i = 0; i < (isMobile ? 25 : 40); i++) {
      const types: ("triangle" | "hexagon" | "circle" | "square")[] = ["triangle", "hexagon", "circle", "square"]

      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 100 + 50,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        vz: (Math.random() - 0.5) * 0.1,
        size: 15 + Math.random() * 25,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: 0.3 + Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        depth: Math.random(),
        pulsePhase: Math.random() * Math.PI * 2,
        shadowOffset: 2 + Math.random() * 4,
      })
    }

    // Create sophisticated connections
    elements.forEach((element, i) => {
      elements.forEach((otherElement, j) => {
        if (i !== j && Math.random() < 0.15) {
          const distance = Math.sqrt(Math.pow(element.x - otherElement.x, 2) + Math.pow(element.y - otherElement.y, 2))

          if (distance < 200) {
            connections.push({
              from: i,
              to: j,
              strength: 0.2 + Math.random() * 0.3,
              opacity: 0.1 + Math.random() * 0.2,
            })
          }
        }
      })
    })

    let animationId: number

    const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.lineTo(-size * 0.866, size * 0.5)
      ctx.lineTo(size * 0.866, size * 0.5)
      ctx.closePath()
      ctx.restore()
    }

    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const px = size * Math.cos(angle)
        const py = size * Math.sin(angle)
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.restore()
    }

    const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      ctx.rect(-size, -size, size * 2, size * 2)
      ctx.restore()
    }

    const animate = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate)
        return
      }

      // Clear with subtle gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#F7FAFC")
      gradient.addColorStop(0.5, "#EDF2F7")
      gradient.addColorStop(1, "#E2E8F0")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      timeRef.current += 0.008 // Slower, more professional movement

      // Update elements
      elements.forEach((element, index) => {
        // Smooth, professional movement
        element.x += element.vx
        element.y += element.vy
        element.z += element.vz
        element.rotation += element.rotationSpeed
        element.pulsePhase += 0.01

        // Boundary wrapping with smooth transitions
        if (element.x < -50) element.x = canvas.width + 50
        if (element.x > canvas.width + 50) element.x = -50
        if (element.y < -50) element.y = canvas.height + 50
        if (element.y > canvas.height + 50) element.y = -50

        // Subtle mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - element.x, 2) + Math.pow(mouseRef.current.y - element.y, 2),
        )

        if (mouseDistance < 120) {
          const force = ((120 - mouseDistance) / 120) * 0.001
          element.vx += (mouseRef.current.x - element.x) * force
          element.vy += (mouseRef.current.y - element.y) * force
          element.opacity = Math.min(0.8, element.opacity + 0.01)
        } else {
          element.opacity *= 0.998
          element.opacity = Math.max(0.2, element.opacity)
        }

        // Gentle velocity damping
        element.vx *= 0.998
        element.vy *= 0.998
        element.vz *= 0.998

        // Depth-based parallax
        const parallaxX = (mouseRef.current.x - canvas.width / 2) * (element.depth * 0.02)
        const parallaxY = (mouseRef.current.y - canvas.height / 2) * (element.depth * 0.02)

        element.x += parallaxX * 0.001
        element.y += parallaxY * 0.001
      })

      // Draw connections first (behind elements)
      connections.forEach(({ from, to, strength, opacity }) => {
        const elementA = elements[from]
        const elementB = elements[to]

        if (!elementA || !elementB) return

        const distance = Math.sqrt(Math.pow(elementA.x - elementB.x, 2) + Math.pow(elementA.y - elementB.y, 2))

        if (distance < 180) {
          const connectionOpacity = (1 - distance / 180) * strength * opacity * 0.6

          // Professional gradient connection
          const gradient = ctx.createLinearGradient(elementA.x, elementA.y, elementB.x, elementB.y)
          gradient.addColorStop(
            0,
            `${elementA.color}${Math.floor(connectionOpacity * 255)
              .toString(16)
              .padStart(2, "0")}`,
          )
          gradient.addColorStop(
            1,
            `${elementB.color}${Math.floor(connectionOpacity * 255)
              .toString(16)
              .padStart(2, "0")}`,
          )

          ctx.beginPath()
          ctx.moveTo(elementA.x, elementA.y)

          // Subtle curve for elegance
          const midX = (elementA.x + elementB.x) / 2
          const midY = (elementA.y + elementB.y) / 2 + Math.sin(timeRef.current * 2 + from + to) * 5

          ctx.quadraticCurveTo(midX, midY, elementB.x, elementB.y)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1 + connectionOpacity * 2
          ctx.stroke()

          // Subtle data flow
          if (connectionOpacity > 0.3) {
            const flowProgress = (timeRef.current + from * 0.5) % 1
            const flowX = elementA.x + (elementB.x - elementA.x) * flowProgress
            const flowY = elementA.y + (elementB.y - elementA.y) * flowProgress

            ctx.save()
            ctx.shadowColor = elementA.color
            ctx.shadowBlur = 3
            ctx.beginPath()
            ctx.arc(flowX, flowY, 1.5, 0, Math.PI * 2)
            ctx.fillStyle = `${elementA.color}CC`
            ctx.fill()
            ctx.restore()
          }
        }
      })

      // Draw geometric elements with professional styling
      elements.forEach((element, index) => {
        const pulseSize = element.size + Math.sin(element.pulsePhase) * 2
        const depthScale = 0.7 + element.depth * 0.3
        const finalSize = pulseSize * depthScale

        ctx.save()

        // Professional shadow with depth
        ctx.shadowColor = "rgba(45, 55, 72, 0.3)"
        ctx.shadowBlur = element.shadowOffset + element.depth * 3
        ctx.shadowOffsetX = element.shadowOffset * 0.5
        ctx.shadowOffsetY = element.shadowOffset

        // Sophisticated gradient fill
        const gradient = ctx.createRadialGradient(
          element.x - finalSize * 0.3,
          element.y - finalSize * 0.3,
          0,
          element.x,
          element.y,
          finalSize,
        )

        const baseOpacity = element.opacity * depthScale
        gradient.addColorStop(
          0,
          `${element.color}${Math.floor(baseOpacity * 255)
            .toString(16)
            .padStart(2, "0")}`,
        )
        gradient.addColorStop(
          0.7,
          `${element.color}${Math.floor(baseOpacity * 180)
            .toString(16)
            .padStart(2, "0")}`,
        )
        gradient.addColorStop(
          1,
          `${element.color}${Math.floor(baseOpacity * 100)
            .toString(16)
            .padStart(2, "0")}`,
        )

        ctx.fillStyle = gradient

        // Draw based on type
        switch (element.type) {
          case "triangle":
            drawTriangle(ctx, element.x, element.y, finalSize, element.rotation)
            break
          case "hexagon":
            drawHexagon(ctx, element.x, element.y, finalSize, element.rotation)
            break
          case "circle":
            ctx.beginPath()
            ctx.arc(element.x, element.y, finalSize, 0, Math.PI * 2)
            break
          case "square":
            drawSquare(ctx, element.x, element.y, finalSize, element.rotation)
            break
        }

        ctx.fill()

        // Professional border
        ctx.strokeStyle = `${element.color}${Math.floor(baseOpacity * 200)
          .toString(16)
          .padStart(2, "0")}`
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.restore()

        // Subtle glow effect for depth
        if (element.opacity > 0.5) {
          ctx.save()
          ctx.globalCompositeOperation = "screen"
          ctx.beginPath()

          switch (element.type) {
            case "triangle":
              drawTriangle(ctx, element.x, element.y, finalSize + 3, element.rotation)
              break
            case "hexagon":
              drawHexagon(ctx, element.x, element.y, finalSize + 3, element.rotation)
              break
            case "circle":
              ctx.arc(element.x, element.y, finalSize + 3, 0, Math.PI * 2)
              break
            case "square":
              drawSquare(ctx, element.x, element.y, finalSize + 3, element.rotation)
              break
          }

          ctx.strokeStyle = `${element.color}${Math.floor(element.opacity * 50)
            .toString(16)
            .padStart(2, "0")}`
          ctx.lineWidth = 2
          ctx.stroke()
          ctx.restore()
        }
      })

      // Professional overlay gradient for depth
      const overlayGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2,
      )
      overlayGradient.addColorStop(0, "rgba(247, 250, 252, 0)")
      overlayGradient.addColorStop(0.8, "rgba(237, 242, 247, 0.1)")
      overlayGradient.addColorStop(1, "rgba(226, 232, 240, 0.2)")

      ctx.fillStyle = overlayGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationId = requestAnimationFrame(animate)
    }

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"
      ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [isVisible])

  // Dark Theme: Black Hole System (corrected implementation)
  const createDarkThemeAnimation = useCallback(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 15)
    cameraRef.current = camera

    // Renderer setup with optimizations
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    rendererRef.current = renderer

    containerRef.current.appendChild(renderer.domElement)

    // Create star field
    const createStarField = () => {
      const starCount = isMobile ? 1000 : 2000
      const starGeometry = new THREE.BufferGeometry()
      const starPositions = new Float32Array(starCount * 3)
      const starColors = new Float32Array(starCount * 3)
      const starSizes = new Float32Array(starCount)

      for (let i = 0; i < starCount; i++) {
        const radius = 50 + Math.random() * 100
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)

        starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        starPositions[i * 3 + 2] = radius * Math.cos(phi)

        const intensity = 0.5 + Math.random() * 0.5
        starColors[i * 3] = intensity
        starColors[i * 3 + 1] = intensity
        starColors[i * 3 + 2] = intensity + Math.random() * 0.3

        starSizes[i] = Math.random() * 2 + 0.5
      }

      starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
      starGeometry.setAttribute("customColor", new THREE.BufferAttribute(starColors, 3)) // Changed from 'color' to 'customColor'
      starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1))

      const starMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          blackHolePos: { value: new THREE.Vector3(0, 0, 0) },
          distortionStrength: { value: 0.3 },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 customColor; // Changed from 'color' to 'customColor'
          varying vec3 vColor;
          varying float vDistortion;
          uniform float time;
          uniform vec3 blackHolePos;
          uniform float distortionStrength;
          
          void main() {
            vColor = customColor; // Changed from 'color' to 'customColor'
            
            vec3 pos = position;
            float distToBlackHole = distance(pos, blackHolePos);
            
            if (distToBlackHole < 30.0) {
              float lensing = distortionStrength / (distToBlackHole * 0.1 + 1.0);
              vec3 direction = normalize(pos - blackHolePos);
              pos += direction * lensing * sin(time * 0.5);
              vDistortion = lensing;
            } else {
              vDistortion = 0.0;
            }
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vDistortion;
          
          void main() {
            float r = distance(gl_PointCoord, vec2(0.5));
            if (r > 0.5) discard;
            
            float alpha = 1.0 - smoothstep(0.0, 0.5, r);
            alpha *= (0.7 + vDistortion * 0.3);
            
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      })

      const stars = new THREE.Points(starGeometry, starMaterial)
      scene.add(stars)
      return stars
    }

    // Create black hole
    const createBlackHole = () => {
      const blackHoleGeometry = new THREE.SphereGeometry(1.5, 32, 32)
      const blackHoleMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          varying vec3 vPosition;
          varying vec3 vNormal;
          
          void main() {
            vPosition = position;
            vNormal = normal;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec3 vPosition;
          varying vec3 vNormal;
          
          void main() {
            vec3 baseColor = vec3(0.0, 0.0, 0.0);
            float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
            vec3 glowColor = vec3(0.0, 1.0, 1.0);
            
            vec3 finalColor = baseColor + glowColor * fresnel * 0.3;
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
      })

      const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial)
      scene.add(blackHole)
      return blackHole
    }

    // Create accretion disk
    const createAccretionDisk = () => {
      const diskGeometry = new THREE.RingGeometry(2, 8, 64, 8)
      const diskMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          scroll: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vPosition;
          uniform float time;
          uniform float scroll;
          
          void main() {
            vUv = uv;
            vPosition = position;
            
            vec3 pos = position;
            float radius = length(pos.xy);
            float angle = atan(pos.y, pos.x);
            
            float orbitalSpeed = 1.0 / (radius * 0.5 + 1.0);
            angle += time * orbitalSpeed;
            
            pos.x = radius * cos(angle);
            pos.y = radius * sin(angle);
            pos.z += sin(angle * 3.0 + time) * 0.1 + scroll * 0.001;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            float radius = length(vPosition.xy);
            float normalizedRadius = (radius - 2.0) / 6.0;
            
            float temp = 1.0 - normalizedRadius;
            
            vec3 coldColor = vec3(0.0, 0.8, 1.0);
            vec3 hotColor = vec3(1.0, 0.2, 0.8);
            
            vec3 diskColor = mix(coldColor, hotColor, temp);
            
            float noise = sin(vPosition.x * 10.0 + time * 2.0) * 
                         cos(vPosition.y * 8.0 + time * 1.5) * 0.3 + 0.7;
            
            float angle = atan(vPosition.y, vPosition.x);
            float spiral = sin(angle * 3.0 - radius * 0.5 + time) * 0.5 + 0.5;
            
            float alpha = noise * spiral * (1.0 - normalizedRadius) * 0.8;
            alpha *= smoothstep(0.0, 0.1, normalizedRadius) * smoothstep(1.0, 0.9, normalizedRadius);
            
            gl_FragColor = vec4(diskColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      })

      const accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial)
      accretionDisk.rotation.x = -Math.PI / 2
      scene.add(accretionDisk)
      return accretionDisk
    }

    const starField = createStarField()
    const blackHole = createBlackHole()
    const accretionDisk = createAccretionDisk()

    // Animation loop
    const animate = () => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      timeRef.current += 0.016

      // Update uniforms
      if (blackHole) {
        ;(blackHole.material as THREE.ShaderMaterial).uniforms.time.value = timeRef.current
      }

      if (accretionDisk) {
        ;(accretionDisk.material as THREE.ShaderMaterial).uniforms.time.value = timeRef.current
        ;(accretionDisk.material as THREE.ShaderMaterial).uniforms.scroll.value = scrollYRef.current
      }

      if (starField) {
        ;(starField.material as THREE.ShaderMaterial).uniforms.time.value = timeRef.current
      }

      // Camera movement based on scroll
      if (camera) {
        const scrollProgress = scrollYRef.current / (document.body.scrollHeight - window.innerHeight)
        camera.position.y = Math.sin(scrollProgress * Math.PI) * 2
        camera.position.z = 15 + scrollProgress * 5
        camera.lookAt(0, 0, 0)
      }

      renderer.render(scene, camera)
      animationRef.current = requestAnimationFrame(animate)
    }

    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement)
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (object.material instanceof THREE.Material) {
            object.material.dispose()
          }
        }
      })
      renderer.dispose()
    }
  }, [isVisible, isMobile])

  // Initialize appropriate animation based on theme
  useEffect(() => {
    if (!mounted) return

    let cleanup: (() => void) | undefined

    if (theme === "dark") {
      cleanup = createDarkThemeAnimation()
    } else {
      cleanup = createLightThemeAnimation()
    }

    return cleanup
  }, [theme, mounted, createDarkThemeAnimation, createLightThemeAnimation])

  if (!mounted) return null

  return (
    <>
      {theme === "dark" ? (
        <div
          ref={containerRef}
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)",
          }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 100%)",
          }}
        />
      )}
    </>
  )
}
