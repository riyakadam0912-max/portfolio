import { createRef, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useReducedMotion } from 'motion/react'
import { AnimatedBeam } from './AnimatedBeam'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const steps = [
  { title: 'Deal marked Won', kind: 'Interface', detail: 'A fictional Acme Renewals deal moves to Won in the interface, beginning the handoff from sales to delivery.' },
  { title: 'API validates the transition', kind: 'Backend', detail: 'The API checks that the state change is valid before any downstream record is created.' },
  { title: 'Project created', kind: 'Data', detail: 'A linked project record is created so delivery work has a clear operational home.' },
  { title: 'Kickoff task created', kind: 'Workflow', detail: 'The sequence finishes with a kickoff task, making the next action visible to the delivery team.' },
]

export function ErpWorkflow() {
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const refs = useRef(steps.map(() => createRef<HTMLButtonElement>()))
  const reduceMotion = useReducedMotion()
  const updateActive = (index: number) => { if (activeRef.current !== index) { activeRef.current = index; setActive(index) } }
  const select = (index: number) => { updateActive(index); refs.current[index].current?.focus() }

  useGSAP(() => {
    if (reduceMotion) return
    ScrollTrigger.create({
      trigger: rootRef.current,
      start: 'top 72%',
      end: 'bottom 28%',
      scrub: true,
      onUpdate: self => updateActive(Math.min(steps.length - 1, Math.round(self.progress * (steps.length - 1)))),
    })
  }, { scope: rootRef, dependencies: [reduceMotion] })

  return (
    <div className="workflow-demo" ref={rootRef}>
      <div className="workflow-label"><span>Illustrative workflow</span><span>Fictional data</span></div>
      <div className="workflow-canvas" ref={containerRef}>
        {steps.slice(0, -1).map((_, index) => <AnimatedBeam key={index} containerRef={containerRef} fromRef={refs.current[index]} toRef={refs.current[index + 1]} active={active > index} delay={index * .08} />)}
        <div className="workflow-steps" role="tablist" aria-label="Deal-to-project workflow">
          {steps.map((step, index) => (
            <button key={step.title} ref={refs.current[index]} role="tab" aria-selected={active === index} aria-controls="workflow-explanation" tabIndex={active === index ? 0 : -1} className={active === index ? 'workflow-step active' : 'workflow-step'} onClick={() => updateActive(index)} onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); select((index + 1) % steps.length) }
              if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); select((index - 1 + steps.length) % steps.length) }
              if (event.key === 'Home') { event.preventDefault(); select(0) }
              if (event.key === 'End') { event.preventDefault(); select(steps.length - 1) }
            }}><span className="step-index">0{index + 1}</span><span className="step-kind">{step.kind}</span><strong>{step.title}</strong></button>
          ))}
        </div>
      </div>
      <motion.div id="workflow-explanation" role="tabpanel" className="workflow-explanation" key={active} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><span>0{active + 1} / 04</span><p>{steps[active].detail}</p></motion.div>
    </div>
  )
}
