const backgroundCreate = (svgElement: SVGSVGElement) => {
    let ticks = 0

    type Property = {
        get: () => number;
    }

    // Ocilates bewteen 0.3 and 0.8
    const opacityUpdater = () => Math.cos(ticks / 45) / 4 + 0.55
    const cxGetter = () => Math.sin(2 + ticks / 10) + (3 * Math.sin(ticks / 10)) + 10

    type Circle = {
        element: SVGCircleElement;
        opacity: Property;
        cx: Property;
    }

    const createCircle = (): Circle => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        svgElement.appendChild(circle)

        return {
            element: circle,
            opacity: { get: opacityUpdater },
            cx: { get: cxGetter }
        }
    }

    let isRunning = true
    const circles = [
        createCircle()
    ]

    const renderOnce = () => {
        for (let circleIndex = 0; circleIndex < circles.length; circleIndex++) {
            const circle = circles[circleIndex]
            console.log(circle.cx.get())
            circle.element.setAttribute('cx', `${circle.cx.get()}`)
            circle.element.setAttribute('cy', '0')
            circle.element.setAttribute('r', '200')
            circle.element.setAttribute('fill', 'blue')
            circle.element.setAttribute('opacity', `${circle.opacity.get()}`)
        }

        ticks += 1

        if (!isRunning) {
            return
        }

        requestAnimationFrame(renderOnce)
    }

    requestAnimationFrame(renderOnce)

    return () => {
        isRunning = false
        circles.forEach((circle) => {
            circle.element.remove()
        })
    }
}

export default backgroundCreate
