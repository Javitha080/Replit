import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const mousePosition = useRef(new THREE.Vector2(0, 0));
  const animationRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Group | null>(null);
  const connectionLinesRef = useRef<THREE.LineSegments | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const lineOpacityRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Renderer setup with improved settings
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance optimization
    rendererRef.current = renderer;
    
    containerRef.current.appendChild(renderer.domElement);
    
    // Create advanced particle system
    const particles = new THREE.Group();
    particlesRef.current = particles;
    scene.add(particles);
    
    // Increase particle count for desktop, reduce for mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 80 : 150;
    
    // Create dynamic particle sizes based on device
    const particleSizes = isMobile ? 
      { min: 0.03, max: 0.08 } : 
      { min: 0.04, max: 0.12 };
    
    // Create diverse particle colors with theme awareness
    const getRandomColor = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // Colorful palette options
      const palettes = {
        bluePurple: { hMin: 210, hMax: 270, s: 80, l: isDarkMode ? 70 : 60 },
        blueGreen: { hMin: 180, hMax: 230, s: 70, l: isDarkMode ? 65 : 55 },
        colorful: { hMin: 0, hMax: 360, s: 80, l: isDarkMode ? 75 : 65 }
      };
      
      // Use blue-purple palette for most particles, with occasional colorful ones
      const selectedPalette = Math.random() > 0.8 ? palettes.colorful : palettes.bluePurple;
      
      const h = Math.random() * (selectedPalette.hMax - selectedPalette.hMin) + selectedPalette.hMin;
      return new THREE.Color(`hsl(${h}, ${selectedPalette.s}%, ${selectedPalette.l}%)`);
    };
    
    // Advanced particle creation with different shapes
    for (let i = 0; i < particleCount; i++) {
      // Randomly choose between sphere and custom geometry for variety
      let geometry;
      const shapeVariation = Math.random();
      
      if (shapeVariation > 0.6) {
        // Create sphere particle
        const size = Math.random() * (particleSizes.max - particleSizes.min) + particleSizes.min;
        geometry = new THREE.SphereGeometry(size, 8, 8);
      } else if (shapeVariation > 0.3) {
        // Create octahedron particle
        const size = Math.random() * (particleSizes.max - particleSizes.min) + particleSizes.min;
        geometry = new THREE.OctahedronGeometry(size * 1.2, 0);
      } else {
        // Create box particle
        const size = Math.random() * (particleSizes.max - particleSizes.min) + particleSizes.min;
        geometry = new THREE.BoxGeometry(size, size, size);
      }
      
      // Create advanced material with bloom effect preparation
      const material = new THREE.MeshBasicMaterial({ 
        color: getRandomColor(),
        transparent: true,
        opacity: Math.random() * 0.6 + 0.3
      });
      
      const particle = new THREE.Mesh(geometry, material);
      
      // Enhanced random positions with better distribution
      const radius = Math.random() * 8 + 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
      particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
      particle.position.z = radius * Math.cos(phi) - 4; // Offset to keep most particles in front
      
      // Store enhanced movement data
      (particle as any).velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.008
      );
      
      // Random rotation speeds for each particle
      (particle as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      };
      
      // Pulse effect data
      (particle as any).pulseData = {
        active: Math.random() > 0.7, // Only some particles pulse
        speed: Math.random() * 0.03 + 0.01,
        min: 0.7,
        max: 1.3,
        value: 0
      };
      
      // Highlight data for mouse interaction
      (particle as any).highlight = {
        original: material.color.clone(),
        active: false
      };
      
      particles.add(particle);
    }
    
    // Create connection lines between particles
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    
    const linesGeometry = new THREE.BufferGeometry();
    const connectionLines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(connectionLines);
    connectionLinesRef.current = connectionLines;
    
    // Handle mouse movement for interactive effects
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Set user interaction flag
      if (!isUserInteracting) {
        setIsUserInteracting(true);
        
        // Reset after some time of inactivity
        setTimeout(() => {
          setIsUserInteracting(false);
        }, 5000);
      }
    };
    
    // Handle touch events for mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mousePosition.current.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mousePosition.current.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        
        if (!isUserInteracting) {
          setIsUserInteracting(true);
          
          setTimeout(() => {
            setIsUserInteracting(false);
          }, 5000);
        }
      }
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      
      // Update camera
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      
      // Update renderer
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    // Animation loop with advanced effects
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) return;
      
      const scene = sceneRef.current;
      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      const particles = particlesRef.current;
      
      animationRef.current = requestAnimationFrame(animate);
      
      // Gradually show connection lines after initial load
      if (lineOpacityRef.current < 0.15) {
        lineOpacityRef.current += 0.001;
        if (connectionLinesRef.current) {
          (connectionLinesRef.current.material as THREE.LineBasicMaterial).opacity = lineOpacityRef.current;
        }
      }
      
      // Update raycaster for mouse interaction
      raycasterRef.current.setFromCamera(mousePosition.current, camera);
      const intersects = raycasterRef.current.intersectObjects(particles.children);
      
      // Reset previously highlighted particles
      particles.children.forEach((child: THREE.Object3D) => {
        const particle = child as THREE.Mesh;
        if ((particle as any).highlight?.active) {
          (particle.material as THREE.MeshBasicMaterial).color.copy((particle as any).highlight.original);
          (particle as any).highlight.active = false;
        }
      });
      
      // Highlight particles near mouse
      if (intersects.length > 0 && isUserInteracting) {
        const intersected = intersects[0].object as THREE.Mesh;
        (intersected.material as THREE.MeshBasicMaterial).color.set(0xffffff);
        (intersected as any).highlight.active = true;
        
        // Create ripple effect around the intersected particle
        particles.children.forEach((child: THREE.Object3D) => {
          const otherParticle = child as THREE.Mesh;
          const distance = intersected.position.distanceTo(otherParticle.position);
          
          if (distance < 2 && distance > 0) {
            const intensity = 1 - distance / 2;
            const highlightColor = new THREE.Color().lerpColors(
              (otherParticle as any).highlight.original, 
              new THREE.Color(0xffffff),
              intensity * 0.6
            );
            
            (otherParticle.material as THREE.MeshBasicMaterial).color.copy(highlightColor);
            (otherParticle as any).highlight.active = true;
          }
        });
      }
      
      // Update connection lines between close particles
      const positions: number[] = [];
      const linksCount = 0;
      
      // Find close particles and create lines between them
      for (let i = 0; i < particles.children.length; i++) {
        const particleA = particles.children[i] as THREE.Mesh;
        
        for (let j = i + 1; j < particles.children.length; j++) {
          const particleB = particles.children[j] as THREE.Mesh;
          const distance = particleA.position.distanceTo(particleB.position);
          
          // Create lines only between close particles
          if (distance < 2.5) {
            // Calculate opacity based on distance
            const lineOpacity = (1 - distance / 2.5) * lineOpacityRef.current;
            
            // Add more lines near mouse position
            if (isUserInteracting) {
              const mouseWorld = new THREE.Vector3(
                mousePosition.current.x * 5,
                mousePosition.current.y * 5,
                0
              );
              
              const distanceToMouse = mouseWorld.distanceTo(particleA.position);
              if (distanceToMouse < 3) {
                positions.push(
                  particleA.position.x, particleA.position.y, particleA.position.z,
                  particleB.position.x, particleB.position.y, particleB.position.z
                );
              }
            }
            
            // Always add some base connections
            if (Math.random() > 0.7) {
              positions.push(
                particleA.position.x, particleA.position.y, particleA.position.z,
                particleB.position.x, particleB.position.y, particleB.position.z
              );
            }
          }
        }
      }
      
      // Update the lines geometry
      if (connectionLinesRef.current) {
        const linesGeometry = connectionLinesRef.current.geometry;
        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        linesGeometry.attributes.position.needsUpdate = true;
      }
      
      // Update each particle animation
      particles.children.forEach((child: THREE.Object3D) => {
        const particle = child as THREE.Mesh;
        
        // Apply velocity
        particle.position.x += (particle as any).velocity.x;
        particle.position.y += (particle as any).velocity.y;
        particle.position.z += (particle as any).velocity.z;
        
        // Rotate particles
        particle.rotation.x += (particle as any).rotationSpeed.x;
        particle.rotation.y += (particle as any).rotationSpeed.y;
        particle.rotation.z += (particle as any).rotationSpeed.z;
        
        // Apply pulse effect for particles that pulse
        if ((particle as any).pulseData?.active) {
          (particle as any).pulseData.value += (particle as any).pulseData.speed;
          const scale = ((particle as any).pulseData.min + 
                        Math.sin((particle as any).pulseData.value) * 
                        ((particle as any).pulseData.max - (particle as any).pulseData.min) / 2);
          
          particle.scale.set(scale, scale, scale);
        }
        
        // Boundary check with smooth reversal
        if (Math.abs(particle.position.x) > 6) {
          (particle as any).velocity.x *= -0.95;
        }
        if (Math.abs(particle.position.y) > 6) {
          (particle as any).velocity.y *= -0.95;
        }
        if (Math.abs(particle.position.z) > 6) {
          (particle as any).velocity.z *= -0.95;
        }
        
        // Occasionally change velocity slightly for more natural movement
        if (Math.random() > 0.99) {
          (particle as any).velocity.x += (Math.random() - 0.5) * 0.01;
          (particle as any).velocity.y += (Math.random() - 0.5) * 0.01;
          (particle as any).velocity.z += (Math.random() - 0.5) * 0.01;
          
          // Keep velocities within bounds
          (particle as any).velocity.x = THREE.MathUtils.clamp((particle as any).velocity.x, -0.02, 0.02);
          (particle as any).velocity.y = THREE.MathUtils.clamp((particle as any).velocity.y, -0.02, 0.02);
          (particle as any).velocity.z = THREE.MathUtils.clamp((particle as any).velocity.z, -0.02, 0.02);
        }
      });
      
      // Rotate the entire particle system more when interacting
      particles.rotation.y += isUserInteracting ? 0.002 : 0.0005;
      particles.rotation.x += isUserInteracting ? 0.001 : 0.0001;
      
      // Make particles follow mouse subtly when interacting
      if (isUserInteracting) {
        particles.position.x = THREE.MathUtils.lerp(
          particles.position.x, 
          mousePosition.current.x * 0.5, 
          0.01
        );
        particles.position.y = THREE.MathUtils.lerp(
          particles.position.y, 
          mousePosition.current.y * 0.5, 
          0.01
        );
      } else {
        // Slowly return to center when not interacting
        particles.position.x = THREE.MathUtils.lerp(particles.position.x, 0, 0.01);
        particles.position.y = THREE.MathUtils.lerp(particles.position.y, 0, 0.01);
      }
      
      renderer.render(scene, camera);
    };
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    // Start animation
    animate();
    
    // Cleanup function
    return () => {
      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      
      // Stop animation
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Dispose geometries and materials
      if (particlesRef.current) {
        particlesRef.current.children.forEach((child: THREE.Object3D) => {
          const mesh = child as THREE.Mesh;
          mesh.geometry.dispose();
          (mesh.material as THREE.Material).dispose();
        });
      }
      
      if (connectionLinesRef.current) {
        connectionLinesRef.current.geometry.dispose();
        (connectionLinesRef.current.material as THREE.Material).dispose();
      }
      
      // Remove renderer
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [isUserInteracting]);

  return (
    <div 
      id="three-background" 
      ref={containerRef} 
      className="absolute top-0 left-0 w-full h-screen z-[-1]"
    ></div>
  );
};

export default ThreeBackground;
