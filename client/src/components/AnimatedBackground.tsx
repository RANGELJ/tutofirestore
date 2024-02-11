import { Box, styled } from '@mui/material'
import { useEffect, useRef } from 'react'
import backgroundCreate from '../shared/backgroundCreate'

const Background = styled(Box)({
    gridColumnStart: 1,
    gridColumnEnd: -1,
    gridRowStart: 1,
    gridRowEnd: -1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  })

const AnimatedBackground = () => {
    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        const element = svgRef.current
        if (!element) {
            return undefined
        }
        const parentElement = element.parentElement
        if (!parentElement) {
            return undefined
        }
        const parentRatio = parentElement.clientWidth / parentElement.clientHeight
        const viewBoxWidth = 1000
        const viewBoxHeight = viewBoxWidth / parentRatio
        element.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
        return backgroundCreate({
            svgElement: element,
            width: viewBoxWidth,
            height: viewBoxHeight,
        })
    }, [])

    return (
        <Background>
            <svg viewBox="0 0 500 500" ref={svgRef} style={{ width: '100%' }} />
        </Background>
    )
}

export default AnimatedBackground
