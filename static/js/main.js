// CueMeIn Landing Page JavaScript with Enhanced 3D Model Quality
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = 80; // Fixed header height
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your backend
            // For now, we'll just show an alert
            alert('Thank you! We\'ll notify you about CueMeIn\'s launch at ' + email + '.');
            this.reset();
        });
    }

    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .skill-path-card, .testimonial-card, .stat-item');
    animatedElements.forEach(el => observer.observe(el));

    // Initialize Enhanced 3D Communication Bubbles
    init3DCommunicationBubbles();

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = '#ffffff';
                header.style.backdropFilter = 'none';
            }
        });
    }
});

// Enhanced 3D Communication Bubbles with Premium Quality
function init3DCommunicationBubbles() {
    const container = document.getElementById('communication-3d');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    if (!container) {
        console.warn('3D container not found');
        return;
    }

    console.log('🚀 Initializing Enhanced 3D Communication Bubbles...');

    try {
        // Scene setup with optimized camera settings
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000); // Reduced FOV from 75 to 65 for better framing
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });

        // Enhanced Renderer Configuration
        const containerSize = Math.min(400, window.innerWidth - 40);
        renderer.setSize(containerSize, containerSize);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit to 2x for performance
        
        // Premium Quality Settings
        renderer.setClearColor(0xf0f4ff, 0); // Soft sky blue background
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Enhanced Color & Tone Mapping
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        
        // Clear container and add canvas
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // 🌈 ENHANCED LIGHTING SYSTEM
        
        // 1. Strong Ambient Light for overall illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        // 2. Three-Point Lighting System (Professional Setup)
        
        // Key Light (Main light source)
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
        keyLight.position.set(10, 10, 5);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 4096;
        keyLight.shadow.mapSize.height = 4096;
        keyLight.shadow.camera.near = 0.5;
        keyLight.shadow.camera.far = 500;
        keyLight.shadow.camera.left = -20;
        keyLight.shadow.camera.right = 20;
        keyLight.shadow.camera.top = 20;
        keyLight.shadow.camera.bottom = -20;
        keyLight.shadow.bias = -0.0001;
        scene.add(keyLight);

        // Fill Light (Softens shadows)
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
        fillLight.position.set(-10, 5, 10);
        scene.add(fillLight);

        // Rim Light (Edge definition)
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
        rimLight.position.set(0, 10, -10);
        scene.add(rimLight);

        // 3. Accent Lights for Color Enhancement (Subtle)
        const accentLight1 = new THREE.PointLight(0x4A90E2, 0.3, 50);
        accentLight1.position.set(-8, 8, 8);
        scene.add(accentLight1);

        const accentLight2 = new THREE.PointLight(0xE74C3C, 0.2, 50);
        accentLight2.position.set(8, -5, 8);
        scene.add(accentLight2);

        const accentLight3 = new THREE.PointLight(0x27AE60, 0.2, 50);
        accentLight3.position.set(0, 8, -8);
        scene.add(accentLight3);

        // Optimized Camera position for better model framing
        camera.position.set(0, 1, 9); // Move camera slightly up and back
        camera.lookAt(0, -0.5, 0); // Look slightly down to frame all bubbles

        // Animation variables
        let model = null;
        let modelBaseY = 0; // Store the model's base Y position
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        // Load 3D model with Enhanced Material Processing
        const loader = new GLTFLoader();
        
        console.log('📦 Loading GLTF model with enhanced materials...');
        loader.load(
            '/models/communication-bubbles.gltf',
            function(gltf) {
                console.log('✨ 3D model loaded successfully!', gltf);
                
                model = gltf.scene;
                
                // Scale and position the model optimally
                model.scale.setScalar(1.5); // Reduced from 1.8 to fit better
                
                // Center the model and adjust for better framing
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());
                
                // Move model down to show all bubbles properly
                model.position.sub(center);
                model.position.y -= size.y * 0.1; // Move down by 10% of model height
                modelBaseY = model.position.y; // Store base position for animation
                
                console.log('📐 Model bounds:', { size, center, finalPosition: model.position, baseY: modelBaseY });
                
                // 🎨 ENHANCED MATERIAL PROCESSING
                model.traverse(function(child) {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        
                        // Force MeshStandardMaterial for better lighting
                        if (child.material) {
                            const originalColor = child.material.color ? child.material.color.clone() : new THREE.Color(0xffffff);
                            
                            // Create enhanced material
                            child.material = new THREE.MeshStandardMaterial({
                                color: originalColor,
                                metalness: 0.1,
                                roughness: 0.3,
                                transparent: false,
                                opacity: 1.0,
                                side: THREE.FrontSide
                            });
                            
                            // Enhance color vibrancy
                            child.material.color.multiplyScalar(1.3);
                            child.material.needsUpdate = true;
                            
                            console.log('🎨 Enhanced material applied:', child.name, originalColor);
                        }
                    }
                });
                
                scene.add(model);
                
                // Hide loading indicator
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
                container.parentElement.classList.add('model-loaded');
                
                console.log('🌟 Enhanced 3D Communication Bubbles ready!');
                
                // Start animation
                animate();
            },
            function(progress) {
                // Loading progress
                if (progress.lengthComputable) {
                    const percentComplete = progress.loaded / progress.total * 100;
                    console.log('📊 Loading progress:', percentComplete.toFixed(1) + '%');
                    
                    // Update loading text
                    if (loadingIndicator) {
                        const loadingText = loadingIndicator.querySelector('p');
                        if (loadingText) {
                            loadingText.textContent = `Loading High-Quality 3D Model... ${percentComplete.toFixed(0)}%`;
                        }
                    }
                }
            },
            function(error) {
                console.error('❌ Error loading 3D model:', error);
                showFallbackContent();
            }
        );

        // Enhanced Mouse Interaction
        container.addEventListener('mousemove', function(event) {
            const rect = container.getBoundingClientRect();
            mouseX = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            mouseY = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
            
            targetRotationX = mouseY * 0.2; // More subtle rotation
            targetRotationY = mouseX * 0.2;
        });

        // Enhanced Click Interaction
        container.addEventListener('click', function() {
            if (model) {
                console.log('🎯 3D model clicked with enhanced effects!');
                
                // Enhanced click animation
                const originalScale = model.scale.x;
                model.scale.setScalar(originalScale * 1.08);
                
                // Enhanced lighting on click
                keyLight.intensity = 2.0;
                fillLight.intensity = 1.2;
                rimLight.intensity = 0.9;
                
                // Accent lights burst
                accentLight1.intensity = 0.6;
                accentLight2.intensity = 0.5;
                accentLight3.intensity = 0.5;
                
                setTimeout(() => {
                    model.scale.setScalar(originalScale);
                    keyLight.intensity = 1.5;
                    fillLight.intensity = 0.8;
                    rimLight.intensity = 0.6;
                    accentLight1.intensity = 0.3;
                    accentLight2.intensity = 0.2;
                    accentLight3.intensity = 0.2;
                }, 400);
            }
        });

        // Enhanced Animation Loop
        function animate() {
            requestAnimationFrame(animate);

            // Smooth rotation based on mouse movement
            if (model) {
                model.rotation.x += (targetRotationX - model.rotation.x) * 0.03;
                model.rotation.y += (targetRotationY - model.rotation.y) * 0.03;
                
                // Gentle floating animation (reduced range)
                const time = Date.now() * 0.001;
                model.position.y = modelBaseY + Math.sin(time * 0.8) * 0.08; // Float from base position
                
                // Subtle rotation animation
                model.rotation.z = Math.sin(time * 0.6) * 0.02; // Reduced from 0.03
                
                // Enhanced light animation
                accentLight1.position.x = Math.sin(time * 0.7) * 6 - 8;
                accentLight1.position.y = Math.cos(time * 0.5) * 4 + 8;
                
                accentLight2.position.x = Math.cos(time * 0.9) * 6 + 8;
                accentLight2.position.z = Math.sin(time * 0.8) * 4 + 8;
                
                accentLight3.position.z = Math.sin(time * 0.6) * 6 - 8;
                accentLight3.position.y = Math.cos(time * 0.7) * 3 + 8;
            }

            renderer.render(scene, camera);
        }

        // Handle window resize
        window.addEventListener('resize', function() {
            const newSize = Math.min(400, window.innerWidth - 40);
            renderer.setSize(newSize, newSize);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

    } catch (error) {
        console.error('❌ Error initializing enhanced 3D scene:', error);
        showFallbackContent();
    }

    // Enhanced Fallback Content
    function showFallbackContent() {
        if (loadingIndicator) {
            loadingIndicator.innerHTML = `
                <div style="text-align: center; color: white;">
                    <div style="font-size: 60px; margin-bottom: 15px;">💬</div>
                    <div style="font-size: 18px; margin-bottom: 5px; font-weight: 600;">Communication Skills</div>
                    <div style="font-size: 14px; opacity: 0.8;">Interactive Learning Platform</div>
                    <div style="font-size: 12px; opacity: 0.6; margin-top: 10px;">Designed for Neurodivergent Professionals</div>
                </div>
            `;
        }
        console.log('🎨 Enhanced fallback content displayed');
    }
}
