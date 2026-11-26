import { useCallback, useState } from 'react'
import { profile, projects, type Project } from './data/portfolio'
import { ProjectDialog } from './components/ProjectDialog'
import { ErpWorkflow } from './components/ErpWorkflow'
import { SpotlightCard } from './components/SpotlightCard'
import { CinematicHero } from './components/CinematicHero'
import { ProjectGallery } from './components/ProjectGallery'
import { DeveloperWorkspace } from './components/DeveloperWorkspace'

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [copied, setCopied] = useState(false)
  const closeDialog = useCallback(() => setSelectedProject(null), [])
  const resumeMailto = `mailto:${profile.email}?subject=${encodeURIComponent('Resume request')}&body=${encodeURIComponent('Hi Riya,\n\nI came across your portfolio and would like to request a copy of your resume.\n\nThank you.')}`
  const supportingProjects = projects.filter(project => ['ekdrishti-web', 'nexus', 'bitewise', 'hr-workflow'].includes(project.id))
  const enterpriseProject = projects.find(project => project.id === 'enterprise-operations')!
  const galleryProjects = [{ ...enterpriseProject, title: 'Enterprise ERP', eyebrow: 'Featured · Enterprise workflow' }, ...supportingProjects]

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      const input = document.createElement('textarea')
      input.value = profile.email
      input.setAttribute('readonly', '')
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Riya Kadam, home">Riya Kadam<span>.</span></a>
        <nav aria-label="Primary navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
        <a className="header-contact" href={`mailto:${profile.email}`}>Let’s talk</a>
      </header>

      <main id="main">
        <CinematicHero resumeMailto={resumeMailto} />
        <ProjectGallery projects={galleryProjects} onOpen={setSelectedProject} />

        <section className="section erp-case-section" id="erp-case-study">
          <header className="section-heading"><p className="eyebrow">Featured case study</p><h2>A workflow that moves<br /><em>with the reader.</em></h2></header>
          <SpotlightCard className="erp-feature" >
            <div className="erp-header"><div><p className="eyebrow">Signature case study · Confidential employer work</p><h3>Enterprise ERP</h3></div><div className="erp-contribution"><p>A connected operations platform where frontend actions, backend rules, and database-backed workflows move work from sales into delivery.</p><a className="erp-case-link" href="#erp-details">Explore the case study</a></div></div>
            <ErpWorkflow />
            <div className="case-study-grid" id="erp-details">
              <section><span>01</span><h4>The requirement</h4><p>Support a connected deal-to-project handoff inside a broader internal business application, without exposing private operational details.</p></section>
              <section><span>02</span><h4>My contribution</h4><p>I contribute full-stack work across application interfaces, API integration, and database-backed features.</p></section>
              <section><span>03</span><h4>How it connects</h4><p>The frontend captures the transition and communicates intent; backend validation protects the workflow before linked project and task records are created.</p></section>
              <section><span>04</span><h4>Interview decision</h4><p>I can discuss why validation belongs at the API boundary: the interface can guide users, while the server remains the source of truth for every client.</p></section>
            </div>
            <p className="confidential-line">Illustrative workflow with fictional records. No private source code, internal screenshots, customer data, credentials, or unapproved links are shown.</p>
          </SpotlightCard>
        </section>

        <DeveloperWorkspace email={profile.email} resumeHref={resumeMailto} copied={copied} onCopyEmail={copyEmail} />
      </main>
      <footer><a className="wordmark" href="#top">Riya Kadam<span>.</span></a><p>Designed and built with care.</p><p>© {new Date().getFullYear()}</p></footer>
      <ProjectDialog project={selectedProject} onClose={closeDialog} />
    </>
  )
}

export default App
