const backgroundCreate = (svgElement: SVGSVGElement) => {
    type Particle = {
        element: SVGCircleElement;
        mass: number;
        acceleration: { x: number; y: number; };
        velocity: { x: number; y: number; };
        radius: number;
        cx: number;
        cy: number;
    }

    const maxMass = 100
    const minMass = 1

    const maxRadius = 10
    const minRadius = 1

    const forceMultiplier = 0.1

    const maxCx = 500
    const maxCy = 500

    const maxAcceleration = 0.03

    const createParticle = (): Particle => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('fill', 'blue')
        svgElement.appendChild(circle)

        return {
            element: circle,
            acceleration: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            cy: Math.random() * maxCy,
            cx: Math.random() * maxCx,
            mass: Math.random() * (maxMass - minMass) + minMass,
            radius: Math.random() * (maxRadius - minRadius) + minRadius,
        }
    }

    let isRunning = true
    const particles = (new Array(20)).fill(null).map(createParticle)

    const updateAcceleration = (particle: Particle, otherParticle: Particle) => {
        const dx = otherParticle.cx - particle.cx
        const dy = otherParticle.cy - particle.cy
        const distance = Math.sqrt(dx * dx + dy * dy)

        const force = (particle.mass * otherParticle.mass) / (distance * distance)

        const acceleration = (force * forceMultiplier) / particle.mass

        particle.acceleration.x += acceleration * dx / distance
        particle.acceleration.y += acceleration * dy / distance

        if (particle.acceleration.x > maxAcceleration) {
            particle.acceleration.x = maxAcceleration
        } else if (particle.acceleration.x < -maxAcceleration) {
            particle.acceleration.x = -maxAcceleration
        }

        if (particle.acceleration.y > maxAcceleration) {
            particle.acceleration.y = maxAcceleration
        } else if (particle.acceleration.y < -maxAcceleration) {
            particle.acceleration.y = -maxAcceleration
        }
    }

    const renderOnce = () => {
        for (let particleIndex = 0; particleIndex < particles.length; particleIndex++) {
            const particle = particles[particleIndex]

            const opacityByMass = particle.mass / maxMass

            particle.element.setAttribute('cx', `${particle.cx}`)
            particle.element.setAttribute('cy', `${particle.cy}`)
            particle.element.setAttribute('r', `${particle.radius}`)
            particle.element.setAttribute('opacity', `${opacityByMass}`)
        }

        for (let particleIndex = 0; particleIndex < particles.length; particleIndex++) {
            const particle = particles[particleIndex]
            for (let otherParticleIndex = 0; otherParticleIndex < particles.length; otherParticleIndex++) {
                if (particleIndex === otherParticleIndex) {
                    continue
                }
        
                const otherParticle = particles[otherParticleIndex]

                updateAcceleration(particle, otherParticle)
            }
        }
    
        for (let particleIndex = 0; particleIndex < particles.length; particleIndex++) {
            const particle = particles[particleIndex]

            particle.velocity.x += particle.acceleration.x / particle.mass
            particle.velocity.y += particle.acceleration.y / particle.mass

            particle.cx += particle.velocity.x
            particle.cy += particle.velocity.y

            const bounce = 0.9

            if (particle.cx > maxCx - particle.radius) {
                particle.cx = maxCx - particle.radius
                particle.velocity.x = 0
                particle.acceleration.x *= -bounce
            } else if (particle.cx < particle.radius) {
                particle.cx = particle.radius
                particle.velocity.x = 0
                particle.acceleration.x *= -bounce
            }

            if (particle.cy > maxCy) {
                particle.cy = maxCy
                particle.velocity.y = 0
            } else if (particle.cy < 0) {
                particle.cy = 0
                particle.velocity.y = 0
            }
        }

        if (!isRunning) {
            return
        }

        requestAnimationFrame(renderOnce)
    }

    requestAnimationFrame(renderOnce)

    return () => {
        isRunning = false
        particles.forEach((circle) => {
            circle.element.remove()
        })
    }
}

export default backgroundCreate
