import type { Project } from '../data/portfolio'

export function ProjectCover({ project }: { project: Project }) {
  const labels: Record<Project['cover'], string[]> = {
    nexus: ['379.8K rows', '56 features', 'Forecast'], bitewise: ['Diary', 'Hydration', 'Profiles'], web: ['Services', 'Portfolio', 'Responsive'],
    operations: ['Interface', 'API', 'Data'], workflow: ['Attendance', 'Leave', 'Admin'], cafe: ['Customer', 'Staff', 'Connected'], heritage: ['English', 'मराठी', 'Accessible'],
  }
  return (
    <div className={`project-cover cover-${project.cover}`} aria-label={`${project.title} conceptual cover illustration`} role="img">
      <span className="cover-note">Illustrative cover</span>
      <div className="cover-grid" aria-hidden="true">
        {labels[project.cover].map((label, index) => <span key={label} className={`cover-cell cell-${index}`}>{label}</span>)}
      </div>
    </div>
  )
}
