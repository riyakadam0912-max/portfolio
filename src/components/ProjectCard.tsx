import type { Project } from '../data/portfolio'
import { ProjectCover } from './ProjectCover'

export function ProjectCard({ project, onOpen, featured = false }: { project: Project; onOpen: (project: Project) => void; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? 'featured' : ''}`}>
      <ProjectCover project={project} />
      <div className="project-copy">
        <p className="eyebrow">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        {project.technologies && <div className="compact-stack">{project.technologies.join(' · ')}</div>}
        <div className="project-links">
          <button className="text-link button-link" onClick={() => onOpen(project)}>View project details <span aria-hidden="true">↗</span></button>
          {project.liveUrl && <a className="text-link live-link" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live project <span aria-hidden="true">↗</span></a>}
        </div>
      </div>
    </article>
  )
}
