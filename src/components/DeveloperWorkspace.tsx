import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type DeveloperWorkspaceProps = {
  email: string
  resumeHref: string
  copied: boolean
  onCopyEmail: () => void
}

const githubUrl = 'https://github.com/riyakadam0912-max'

export function DeveloperWorkspace({ email, resumeHref, copied, onCopyEmail }: DeveloperWorkspaceProps) {
  const scene = useRef<HTMLElement>(null)
  const openWorkspaceAnchor = (event: React.MouseEvent<HTMLAnchorElement>, hash: '#about' | '#contact') => {
    event.preventDefault()
    if (location.hash !== hash) history.pushState(null, '', hash)
    requestAnimationFrame(() => window.scrollTo(0, hash === '#contact'
      ? document.documentElement.scrollHeight
      : window.scrollY + (document.querySelector<HTMLElement>(hash)?.getBoundingClientRect().top ?? 84) - 84))
  }

  useGSAP(() => {
    const root = scene.current
    const erp = document.querySelector<HTMLElement>('#erp-case-study')
    if (!root || !erp) return

    const media = gsap.matchMedia()
    const refresh = () => ScrollTrigger.refresh()

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const handoff = gsap.timeline({
        scrollTrigger: {
          trigger: erp,
          start: 'bottom 92%',
          endTrigger: root,
          end: 'top 18%',
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      })

      handoff
        .fromTo('.workspace-erp-preview', { scale: 1, y: 70, opacity: 1 }, { scale: 0.3, xPercent: -38, y: -34, opacity: 0.72, transformOrigin: 'top left', ease: 'none' }, 0)
        .fromTo('.workspace-frame', { y: 120, clipPath: 'inset(12% 3% 0 3%)', opacity: 0.45 }, { y: 0, clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, ease: 'none' }, 0.08)
        .fromTo('.about-editor-panel', { x: 70 }, { x: 0, ease: 'none' }, 0.18)
        .fromTo('.editor-reveal-label', { y: 12, opacity: 0.3 }, { y: 0, opacity: 1, stagger: 0.08, ease: 'none' }, 0.35)
        .fromTo('.about-active-line', { yPercent: -115 }, { yPercent: 108, ease: 'none' }, 0.2)

      gsap.timeline({
        scrollTrigger: {
          trigger: '.terminal-panel',
          start: 'top 82%',
          end: 'top 42%',
          scrub: 0.6,
          toggleClass: { targets: root, className: 'contact-is-active' },
        },
      })
        .fromTo('.terminal-panel', { y: 54, opacity: 0.72 }, { y: 0, opacity: 1, ease: 'none' })
        .fromTo('.terminal-command-text', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'none' }, 0.15)
    })

    media.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.workspace-frame', { y: 42, opacity: 0.78 }, { y: 0, opacity: 1, scrollTrigger: { trigger: root, start: 'top 92%', end: 'top 65%', scrub: 0.5 } })
      gsap.fromTo('.terminal-command-text', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', scrollTrigger: { trigger: '.terminal-panel', start: 'top 88%', end: 'top 68%', scrub: 0.4 } })
    })

    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh, { once: true })
    return () => {
      window.removeEventListener('load', refresh)
      media.revert()
    }
  }, { scope: scene })

  useEffect(() => {
    let anchorTimer = 0
    let settleTimer = 0
    const alignWorkspaceHash = () => {
      if (location.hash !== '#about' && location.hash !== '#contact') return
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>(location.hash)
        if (!target) return
        const destination = location.hash === '#contact'
          ? document.documentElement.scrollHeight
          : window.scrollY + target.getBoundingClientRect().top - 84
        window.scrollTo(0, destination)
      }))
    }
    const scheduleWorkspaceHash = () => {
      alignWorkspaceHash()
      window.clearTimeout(anchorTimer)
      window.clearTimeout(settleTimer)
      anchorTimer = window.setTimeout(alignWorkspaceHash, 220)
      settleTimer = window.setTimeout(alignWorkspaceHash, 900)
    }
    const handleWorkspaceAnchor = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href="#about"], a[href="#contact"]')
      if (!anchor) return
      event.preventDefault()
      const hash = anchor.getAttribute('href') as '#about' | '#contact'
      if (location.hash !== hash) history.pushState(null, '', hash)
      scheduleWorkspaceHash()
    }

    document.fonts?.ready.then(scheduleWorkspaceHash)
    window.addEventListener('hashchange', scheduleWorkspaceHash)
    window.addEventListener('popstate', scheduleWorkspaceHash)
    document.addEventListener('click', handleWorkspaceAnchor)
    return () => {
      window.removeEventListener('hashchange', scheduleWorkspaceHash)
      window.removeEventListener('popstate', scheduleWorkspaceHash)
      document.removeEventListener('click', handleWorkspaceAnchor)
      window.clearTimeout(anchorTimer)
      window.clearTimeout(settleTimer)
    }
  }, [])

  return (
    <section className="workspace-scene" ref={scene} aria-label="About and contact workspace">
      <div className="workspace-erp-preview" aria-hidden="true">
        <span className="preview-status">workflow complete</span>
        <div><i>Deal won</i><b>→</b><i>API valid</i><b>→</b><i>Project ready</i></div>
        <span className="preview-tab">erp-workflow.ts</span>
      </div>

      <div className="workspace-frame">
        <div className="workspace-titlebar"><span /><span /><span /><p>riya-portfolio / workspace</p></div>
        <nav className="workspace-tabs" aria-label="Workspace files">
          <a className="file-tab erp-tab" href="#erp-case-study"><span aria-hidden="true">TS</span>erp-workflow.ts</a>
          <a className="file-tab about-tab" href="#about" onClick={event => openWorkspaceAnchor(event, '#about')}><span aria-hidden="true">TS</span>about.ts</a>
          <a className="file-tab contact-tab" href="#contact" onClick={event => openWorkspaceAnchor(event, '#contact')}><span aria-hidden="true">TS</span>contact.ts</a>
        </nav>

        <aside className="file-explorer" aria-label="File explorer">
          <p>Explorer</p><strong>RIYA-PORTFOLIO</strong>
          <a className="explorer-link about-file" href="#about" onClick={event => openWorkspaceAnchor(event, '#about')}><span aria-hidden="true">◇</span> About</a>
          <a className="explorer-link" href="#erp-case-study"><span aria-hidden="true">◇</span> ERP case study</a>
          <a className="explorer-link contact-file" href="#contact" onClick={event => openWorkspaceAnchor(event, '#contact')}><span aria-hidden="true">◇</span> Contact</a>
        </aside>

        <div className="workspace-editor">
          <section className="about-editor-panel" id="about" aria-labelledby="about-heading">
            <div className="about-active-line" aria-hidden="true" />
            <div className="code-line"><span className="line-number">01</span><code><span className="syntax-keyword">export const</span> <span className="syntax-name">about</span> = {'{'}</code></div>
            <div className="code-line editor-reveal-label"><span className="line-number">02</span><code><span className="syntax-property">role</span>: <span className="syntax-string">&quot;Full-Stack Developer&quot;</span>,</code></div>
            <div className="code-line editor-reveal-label"><span className="line-number">03</span><code><span className="syntax-property">location</span>: <span className="syntax-string">&quot;Mumbai, India&quot;</span>,</code></div>
            <div className="code-line code-heading"><span className="line-number">04</span><div><p className="editor-comment">// About</p><h2 id="about-heading">Business logic,<br /><em>made human.</em></h2></div></div>
            <div className="code-line code-prose"><span className="line-number">05</span><p>I’m Riya Kadam, a full-stack developer. I work across React, Next.js, NestJS, and PostgreSQL, and I enjoy figuring out how a business workflow should behave before turning it into something people can use. In my ERP work, that meant connecting a single CRM status change to project creation and kickoff.</p></div>
            <div className="code-line editor-reveal-label"><span className="line-number">06</span><code><span className="syntax-property">education</span>: <span className="syntax-string">&quot;B.Sc. Information Technology · 2025&quot;</span>,</code></div>
            <div className="code-line editor-reveal-label"><span className="line-number">07</span><code><span className="syntax-property">approach</span>: <span className="syntax-string">&quot;Clear systems, considered interfaces&quot;</span>,</code></div>
            <div className="code-line"><span className="line-number">08</span><code>{'}'}</code></div>
            <div className="code-line editor-action-line"><span className="line-number">09</span><a className="workspace-resume" href={resumeHref}>Request résumé <span aria-hidden="true">↗</span></a></div>
          </section>

          <section className="terminal-panel" id="contact" aria-labelledby="contact-heading">
            <div className="terminal-bar"><span>TERMINAL</span><span>contact.ts — zsh</span></div>
            <div className="terminal-body">
              <p className="terminal-command"><span aria-hidden="true">riya@portfolio ~ % </span><strong className="terminal-command-text">contact --show</strong><i aria-hidden="true" /></p>
              <p className="terminal-output">Connection ready. Choose a channel below.</p>
              <h2 id="contact-heading">Let’s build something together.</h2>
              <div className="terminal-actions">
                <a className="terminal-primary" href={`mailto:${email}`}>Email Riya <span aria-hidden="true">↗</span></a>
                <a href={githubUrl} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
                <button type="button" onClick={onCopyEmail} aria-live="polite">{copied ? 'Copied' : 'Copy email'}</button>
              </div>
              <p className="terminal-email">{email}</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
