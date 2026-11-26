import { useEffect, useId, useState, type RefObject } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type AnimatedBeamProps = {
  containerRef: RefObject<HTMLElement | null>
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  active?: boolean
  delay?: number
}

// Adapted from Magic UI's MIT-licensed Animated Beam component.
export function AnimatedBeam({ containerRef, fromRef, toRef, active = true, delay = 0 }: AnimatedBeamProps) {
  const id = useId()
  const reduceMotion = useReducedMotion()
  const [path, setPath] = useState('')
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return
      const container = containerRef.current.getBoundingClientRect()
      const from = fromRef.current.getBoundingClientRect()
      const to = toRef.current.getBoundingClientRect()
      const startX = from.left - container.left + from.width / 2
      const startY = from.top - container.top + from.height / 2
      const endX = to.left - container.left + to.width / 2
      const endY = to.top - container.top + to.height / 2
      setSize({ width: container.width, height: container.height })
      setPath(`M ${startX},${startY} Q ${(startX + endX) / 2},${Math.min(startY, endY)} ${endX},${endY}`)
    }
    const observer = new ResizeObserver(update)
    if (containerRef.current) observer.observe(containerRef.current)
    update()
    return () => observer.disconnect()
  }, [containerRef, fromRef, toRef])

  return (
    <svg className="workflow-beam" width={size.width} height={size.height} viewBox={`0 0 ${size.width} ${size.height}`} aria-hidden="true">
      <path d={path} className="beam-track" />
      {active && !reduceMotion && (
        <path d={path} className="beam-active" stroke={`url(#${id})`}>
          <defs>
            <motion.linearGradient id={id} gradientUnits="userSpaceOnUse" initial={{ x1: '0%', x2: '0%' }} animate={{ x1: ['0%', '100%'], x2: ['10%', '110%'] }} transition={{ delay, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
              <stop stopColor="#74324f" stopOpacity="0" /><stop offset="45%" stopColor="#74324f" /><stop offset="100%" stopColor="#a6627d" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </path>
      )}
    </svg>
  )
}
