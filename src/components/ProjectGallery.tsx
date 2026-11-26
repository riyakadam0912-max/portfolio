import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '../data/portfolio'
import { ProjectCover } from './ProjectCover'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Props = { projects: Project[]; onOpen: (project: Project) => void }

export function ProjectGallery({ projects, onOpen }: Props) {
  const rootRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  const focusPanel = (index: number) => {
    const trigger = triggerRef.current
    if (window.matchMedia('(max-width: 899px), (prefers-reduced-motion: reduce)').matches) return
    const start = trigger?.start ?? (rootRef.current ? rootRef.current.getBoundingClientRect().top + window.scrollY : window.scrollY)
    const end = trigger?.end ?? start + window.innerWidth * (projects.length - 1) * 1.15
    const progress = index / Math.max(1, projects.length - 1)
    window.scrollTo(0, start + (end - start) * progress)
    trigger?.animation?.progress(progress)
    trigger?.update()
  }

  useGSAP(() => {
    const mm = gsap.matchMedia()
    const panels = gsap.utils.toArray<HTMLElement>('.gallery-panel')
    const indicators = gsap.utils.toArray<HTMLElement>('.gallery-indicator')
    const progress = rootRef.current?.querySelector<HTMLElement>('.gallery-progress-fill')
    let active = -1
    const setActive = (index: number) => {
      if (index === active) return
      active = index
      panels.forEach((panel, panelIndex) => panel.classList.toggle('is-active', panelIndex === index))
      indicators.forEach((indicator, indicatorIndex) => indicator.classList.toggle('is-active', indicatorIndex === index))
    }

    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const track = rootRef.current?.querySelector<HTMLElement>('.gallery-track')
      const viewport = rootRef.current?.querySelector<HTMLElement>('.gallery-viewport')
      const pin = rootRef.current?.querySelector<HTMLElement>('.gallery-pin')
      if (!track || !viewport || !pin) return
      setActive(0)
      const timeline = gsap.timeline()
      panels.slice(0, -1).forEach((panel, index) => {
        const next = panels[index + 1]
        timeline
          .to(track, { x: () => -(index + 1) * viewport.clientWidth, duration: 1, ease: 'none' }, index)
          .to(panel.querySelector('.gallery-media'), { scale: .91, opacity: .4, duration: .55, ease: 'none' }, index)
          .fromTo(next.querySelector('.gallery-media'), { scale: 1.08, opacity: .6 }, { scale: 1, opacity: 1, duration: .7, ease: 'none' }, index + .2)
          .fromTo(next.querySelector('.gallery-title-inner'), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .55, ease: 'power2.out' }, index + .35)
          .fromTo(next.querySelector('.gallery-contribution'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: 'power2.out' }, index + .45)
      })
      triggerRef.current = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: () => `+=${window.innerWidth * (projects.length - 1) * 1.15}`,
        animation: timeline,
        pin,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => {
          if (progress) gsap.set(progress, { scaleX: self.progress })
          setActive(Math.min(projects.length - 1, Math.round(self.progress * (projects.length - 1))))
        },
      })
      return () => { triggerRef.current = null }
    })

    mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)', () => {
      panels.forEach(panel => {
        gsap.fromTo(panel.querySelector('.gallery-media'), { y: 32, opacity: .72 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: panel, start: 'top 88%', end: 'top 52%', scrub: .6 } })
        gsap.fromTo(panel.querySelector('.gallery-copy'), { y: 22, opacity: .55 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: panel, start: 'top 78%', end: 'top 44%', scrub: .6 } })
      })
    })

    mm.add('(prefers-reduced-motion: reduce)', () => setActive(0))
    const refresh = () => ScrollTrigger.refresh()
    let anchorTimer = 0
    const alignGalleryHash = () => {
      window.clearTimeout(anchorTimer)
      anchorTimer = window.setTimeout(() => {
        if (window.location.hash === '#work') rootRef.current?.scrollIntoView({ block: 'start' })
        if (window.location.hash === '#erp-case-study') document.querySelector<HTMLElement>('#erp-case-study')?.scrollIntoView({ block: 'start' })
      }, 180)
    }
    document.fonts?.ready.then(() => { refresh(); alignGalleryHash() })
    requestAnimationFrame(() => {
      refresh()
      alignGalleryHash()
    })
    window.addEventListener('hashchange', alignGalleryHash)
    window.addEventListener('popstate', alignGalleryHash)
    return () => {
      window.clearTimeout(anchorTimer)
      window.removeEventListener('hashchange', alignGalleryHash)
      window.removeEventListener('popstate', alignGalleryHash)
      mm.revert()
    }
  }, { scope: rootRef, dependencies: [projects.length] })

  return (
    <section className="work-gallery" id="work" ref={rootRef} aria-labelledby="work-title">
      <div className="gallery-pin">
        <header className="gallery-header"><div><p className="eyebrow">Selected work</p><h2 id="work-title">Scroll through the build.</h2></div><a className="skip-gallery" href="#erp-case-study">Skip past gallery</a></header>
        <div className="gallery-viewport">
          <div className="gallery-track">
            {projects.map((project, index) => (
              <article className="gallery-panel" key={project.id} onFocusCapture={() => focusPanel(index)}>
                <div className="gallery-media"><ProjectCover project={project} /></div>
                <div className="gallery-copy">
                  <p className="eyebrow">{project.eyebrow}</p>
                  <div className="gallery-title-clip"><h3 className="gallery-title-inner">{project.title}</h3></div>
                  <p className="gallery-contribution">{project.contribution}</p>
                  {project.id === 'enterprise-operations' ? <a className="gallery-action" href="#erp-case-study">Open ERP case study</a> : <button className="gallery-action" onClick={() => onOpen(project)}>Open case study</button>}
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="gallery-status" aria-hidden="true"><div className="gallery-progress"><span className="gallery-progress-fill" /></div><div className="gallery-indicators">{projects.map((project, index) => <span key={project.id} className={`gallery-indicator${index === 0 ? ' is-active' : ''}`}>{String(index + 1).padStart(2, '0')}</span>)}</div></div>
      </div>
    </section>
  )
}
