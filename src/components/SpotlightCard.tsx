import { useRef, type PointerEvent, type ReactNode } from 'react'

type Props = { children: ReactNode; className?: string }

// Adapted for this portfolio from React Bits' SpotlightCard.
// Copyright (c) David Haz — MIT + Commons Clause License Condition v1.0.
// Source and license: https://github.com/DavidHDev/react-bits
export function SpotlightCard({ children, className = '' }: Props) {
  const cardRef = useRef<HTMLElement>(null)

  const positionSpotlight = (clientX: number, clientY: number) => {
    const card = cardRef.current
    if (!card) return
    const bounds = card.getBoundingClientRect()
    card.style.setProperty('--spotlight-x', `${clientX - bounds.left}px`)
    card.style.setProperty('--spotlight-y', `${clientY - bounds.top}px`)
  }

  const onPointerMove = (event: PointerEvent<HTMLElement>) => positionSpotlight(event.clientX, event.clientY)
  const onFocus = () => {
    const card = cardRef.current
    if (!card) return
    const bounds = card.getBoundingClientRect()
    positionSpotlight(bounds.left + bounds.width / 2, bounds.top + bounds.height / 3)
  }

  return <article ref={cardRef} className={`spotlight-card ${className}`} onPointerMove={onPointerMove} onFocusCapture={onFocus}>{children}</article>
}
