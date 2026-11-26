import { motion, useReducedMotion } from 'motion/react'
import type { Project } from '../data/portfolio'
import { ProjectCover } from './ProjectCover'

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.article className="project-card" whileHover={reduceMotion ? undefined : { y: -6 }} transition={{ duration: .25 }}>
      <ProjectCover project={project} />
      <div className="project-copy"><p className="eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p>{project.contribution}</p><div className="project-links"><button className="text-link button-link" onClick={() => onOpen(project)}>Open case study</button>{project.liveUrl && <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live project</a>}</div></div>
    </motion.article>
  )
}
