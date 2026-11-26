import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const maxStep = 4

export function CinematicHero({ resumeMailto }: { resumeMailto: string }) {
  const rootRef = useRef<HTMLElement>(null)
  const progressRef = useRef({ value: 0 })
  const clickedRef = useRef(false)
  const activeStepRef = useRef(0)
  const sequenceTimersRef = useRef<number[]>([])
  const [workflowStep, setWorkflowStep] = useState(0)

  const updateStep = (next: number) => {
    const bounded = Math.max(0, Math.min(maxStep, Math.round(next)))
    if (bounded === activeStepRef.current) return
    activeStepRef.current = bounded
    setWorkflowStep(bounded)
  }

  const playWorkflow = () => {
    clickedRef.current = true
    sequenceTimersRef.current.forEach(window.clearTimeout)
    sequenceTimersRef.current = []
    progressRef.current.value = 0
    updateStep(0)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progressRef.current.value = maxStep
      updateStep(maxStep)
      return
    }
    sequenceTimersRef.current = [1, 2, 3, 4].map(step => window.setTimeout(() => {
      progressRef.current.value = step
      updateStep(step)
    }, step * 360))
  }

  useEffect(() => () => sequenceTimersRef.current.forEach(window.clearTimeout), [])

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: self => {
            if (clickedRef.current) return
            progressRef.current.value = self.progress * maxStep
            updateStep(progressRef.current.value)
          },
        },
      })
        .fromTo('.hero-editor', { rotate: -2.2, scale: 0.92, y: 28 }, { rotate: 0, scale: 1.04, y: -22, ease: 'none' }, 0)
        .fromTo('.hero-plum-field', { clipPath: 'inset(92% 0 0 0)' }, { clipPath: 'inset(18% 0 0 0)', ease: 'none' }, 0)
        .fromTo('.hero-active-line', { y: 0 }, { y: 194, ease: 'none' }, 0)
        .fromTo('.hero-connector-fill', { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0.12)
        .to('.hero-copy', { y: -78, opacity: 0.18, ease: 'none' }, 0.18)
        .to('.hero-demo-project', { xPercent: -24, yPercent: 32, scale: 1.16, boxShadow: '0 2rem 5rem rgba(20,12,16,.32)', ease: 'none' }, 0.46)
        .to('.hero-editor-top, .hero-deal-column, .hero-demo-footer', { opacity: 0.28, ease: 'none' }, 0.62)
    })
    media.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 0.55, onUpdate: self => {
        if (clickedRef.current) return
        progressRef.current.value = self.progress * maxStep
        updateStep(progressRef.current.value)
      } } })
        .to('.hero-plum-field', { clipPath: 'inset(42% 0 0)', ease: 'none' }, 0)
        .to('.hero-editor', { y: -28, scale: 1.015, ease: 'none' }, 0)
    })
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh, { once: true })
    return () => {
      window.removeEventListener('load', refresh)
      media.revert()
    }
  }, { scope: rootRef })

  const complete = workflowStep === maxStep

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="hero-plum-field" aria-hidden="true" />
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-identity">Riya Kadam <span>·</span> Full-Stack Developer</p>
          <h1>One click starts<br /><em>the project.</em></h1>
          <p className="hero-support">I build software that connects the steps teams usually handle by hand. In the ERP I work on, marking a deal as won creates the project and its kickoff task.</p>
          <div className="hero-actions"><a className="primary-action" href="#work">View selected work</a><a className="text-link" href={resumeMailto}>Request résumé</a></div>
        </div>

        <div className={`hero-editor workflow-state-${workflowStep}`} aria-label="Illustrative deal-to-project demo">
          <div className="hero-editor-top"><span /><span /><span /><p>enterprise-erp / crm</p></div>
          <div className="hero-file-tabs" aria-label="Demo files"><span className="hero-file-tab is-active">TS&nbsp;&nbsp;deal-to-project.ts</span><span className="hero-file-tab">project.service.ts</span></div>
          <div className="hero-demo-label"><span>Illustrative demo</span><span>Fictional records</span></div>
          <div className="hero-demo-body">
            <div className="hero-active-line" aria-hidden="true" />
            <div className="hero-connector" aria-hidden="true"><span className="hero-connector-fill" /></div>
            <section className="hero-deal-column" aria-labelledby="deal-title">
              <p className="demo-code-label">const deal =</p>
              <div className="hero-deal-card">
                <div><span>Deal</span><strong id="deal-title">Northstar Renewal</strong></div>
                <dl><div><dt>Value</dt><dd>₹8,40,000</dd></div><div><dt>Owner</dt><dd>Riya K.</dd></div><div><dt>Status</dt><dd className="deal-status">{workflowStep >= 1 ? 'Won' : 'Qualified'}</dd></div></dl>
              </div>
              {!complete ? <button className="demo-trigger" type="button" onClick={playWorkflow}>Mark deal as won</button> : <button className="demo-replay" type="button" onClick={playWorkflow}>Replay demo</button>}
              <div className={`hero-validation${workflowStep >= 2 ? ' is-active' : ''}`}><span aria-hidden="true" /> <p><strong>API validation</strong><small>{workflowStep >= 2 ? 'Transition accepted' : 'Waiting for status change'}</small></p></div>
            </section>

            <section className="hero-output" aria-live="polite" aria-label="Workflow output">
              <p className="demo-code-label">workflow.output</p>
              <div className={`hero-demo-project${workflowStep >= 3 ? ' is-visible' : ''}`}>
                <div className="project-card-top"><span>Project</span><b>{workflowStep >= 3 ? 'Created' : 'Pending'}</b></div>
                <h2>Northstar<br />Implementation</h2>
                <p>NS-2048 · Delivery</p>
                <div className={`hero-kickoff-task${workflowStep >= 4 ? ' is-visible' : ''}`}><span>Kickoff task</span><strong>Schedule discovery session</strong><small>Assigned to delivery team</small></div>
              </div>
              <p className="hero-output-status">{workflowStep === 0 && 'Waiting for an action.'}{workflowStep === 1 && 'Deal status changed to Won.'}{workflowStep === 2 && 'The API validates the transition.'}{workflowStep === 3 && 'Project NS-2048 was created.'}{workflowStep === 4 && 'Kickoff task added. Workflow complete.'}</p>
            </section>
          </div>
          <div className="hero-demo-footer"><span>React interface</span><i /><span>NestJS API</span><i /><span>PostgreSQL records</span></div>
        </div>
      </div>
      <a className="hero-scroll-cue" href="#work">Scroll to carry the project into selected work</a>
    </section>
  )
}
