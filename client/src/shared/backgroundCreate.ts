type Args = {
    svgElement: SVGSVGElement;
    width: number;
    height: number;
}

const backgroundCreate = ({
    svgElement,
    width,
    height,
}: Args) => {
    type Particle = {
        element: SVGCircleElement;
        mass: number;
        acceleration: { x: number; y: number; };
        velocity: { x: number; y: number; };
        radius: number;
        cx: number;
        cy: number;
    }

    const maxMass = 30
    const minMass = 5

    const maxRadius = 20
    const minRadius = 10

    const forceMultiplier = 0.5

    const maxCx = width
    const maxCy = height

    const maxAcceleration = 0.1

    const createParticle = (): Particle => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        svgElement.appendChild(circle)

        const mass = Math.random() * (maxMass - minMass) + minMass
        const opacityByMass = (mass / maxMass) * 0.1

        circle.setAttribute('opacity', `${opacityByMass}`)
        circle.setAttribute('fill', 'blue')

        return {
            element: circle,
            acceleration: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            cy: Math.random() * maxCy,
            cx: Math.random() * maxCx,
            mass,
            radius: Math.random() * (maxRadius - minRadius) + minRadius,
        }
    }

    let isRunning = true
    const particles = (new Array(50)).fill(null).map(createParticle)

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


            particle.element.setAttribute('cx', `${particle.cx}`)
            particle.element.setAttribute('cy', `${particle.cy}`)
            particle.element.setAttribute('r', `${particle.radius}`)
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

            const bounce = 1.1

            if (particle.cx > maxCx - particle.radius) {
                particle.cx = maxCx - particle.radius
                particle.velocity.x = 0
                particle.acceleration.x *= -bounce
            } else if (particle.cx < particle.radius) {
                particle.cx = particle.radius
                particle.velocity.x = 0
                particle.acceleration.x *= -bounce
            }

            if (particle.cy > maxCy - particle.radius) {
                particle.cy = maxCy - particle.radius
                particle.velocity.y = 0
                particle.acceleration.y *= -bounce
            } else if (particle.cy < particle.radius) {
                particle.cy = particle.radius
                particle.velocity.y = 0
                particle.acceleration.y *= -bounce
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
