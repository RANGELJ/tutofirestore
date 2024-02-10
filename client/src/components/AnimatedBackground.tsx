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
        return backgroundCreate(element)
    }, [])

    return (
        <Background>
            <svg viewBox="0 0 500 500" ref={svgRef} />
        </Background>
    )
}

export default AnimatedBackground
