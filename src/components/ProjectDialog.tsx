import { useEffect, useRef } from 'react'
import type { Project } from '../data/portfolio'

type Props = { project: Project | null; onClose: () => void }

export function ProjectDialog({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!project || !dialog) return
    previousFocus.current = document.activeElement as HTMLElement
    dialog.showModal()
    const handleCancel = (event: Event) => { event.preventDefault(); onClose() }
    dialog.addEventListener('cancel', handleCancel)
    return () => {
      dialog.removeEventListener('cancel', handleCancel)
      if (dialog.open) dialog.close()
      previousFocus.current?.focus()
    }
  }, [project, onClose])

  if (!project) return null
  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); onClose() } }}
    >
      <article className="dialog-panel">
        <div className="dialog-top"><span>{project.eyebrow}</span><button className="icon-button" onClick={onClose} aria-label="Close project details">×</button></div>
        <h2 id="dialog-title">{project.title}</h2>
        {project.type === 'public' ? (
          <>
            <section><h3>Overview</h3><p>{project.overview}</p></section>
            <section><h3>The problem</h3><p>{project.problem}</p></section>
            <section><h3>My contribution</h3><p>{project.contribution}</p></section>
            <section><h3>Verified features</h3><ul>{project.features?.map(item => <li key={item}>{item}</li>)}</ul></section>
            {project.technologies && <section><h3>Technology stack</h3><div className="tag-row">{project.technologies.map(item => <span key={item}>{item}</span>)}</div></section>}
            <section><h3>Available material</h3><p>{project.github ? 'Source repository is available for this independent project. No live demo has been claimed.' : 'Public website work is described using approved material. No source link or internal functionality is included.'}</p>
              <div className="dialog-links">
                {project.liveUrl && <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live project <span aria-hidden="true">↗</span></a>}
                {project.github && <a className="text-link" href={project.github} target="_blank" rel="noreferrer">View GitHub repository <span aria-hidden="true">↗</span></a>}
              </div>
            </section>
          </>
        ) : (
          <>
            <section><h3>Broad context</h3><p>{project.summary}</p></section>
            <section><h3>My contribution</h3><p>{project.contribution}</p></section>
            <aside className="confidential-note"><strong>Confidentiality note</strong><p>{project.confidentiality}</p></aside>
            {project.liveUrl && <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">Visit authorized public website <span aria-hidden="true">↗</span></a>}
          </>
        )}
      </article>
    </dialog>
  )
}
