import { useCallback, useState } from 'react'
import { experience, profile, projects, skills, type Project } from './data/portfolio'
import { ProjectCard } from './components/ProjectCard'
import { ProjectDialog } from './components/ProjectDialog'

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [copied, setCopied] = useState(false)
  const publicProjects = projects.filter(project => project.type === 'public')
  const confidentialProjects = projects.filter(project => project.type === 'confidential')
  const closeDialog = useCallback(() => setSelectedProject(null), [])

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); window.setTimeout(() => setCopied(false), 2200) }
    catch { window.location.href = `mailto:${profile.email}` }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Riya Kadam, home">riya kadam<span>.</span></a>
        <nav aria-label="Primary navigation">
          <span className="menu-label" aria-hidden="true">Menu</span>
          <a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-kicker"><span>{profile.role} · Mumbai</span><span>Available for thoughtful work</span></div>
          <div className="hero-layout">
            <div className="hero-copy">
              <h1>Full stack.<br /><em>Thoughtfully<br />built.</em></h1>
              <p>{profile.intro}</p>
              <div className="hero-actions"><a className="primary-action" href="#work">Explore my work <span aria-hidden="true">↓</span></a><a className="resume-link" href={`mailto:${profile.email}?subject=Resume request`}>Request resume ↗</a></div>
            </div>
            <div className="stack-board" role="img" aria-label="Three connected layers of my work: interface, application and data">
              <p>A little design. A lot of logic.</p>
              <div className="stack-layer layer-data"><span>03</span><strong>Data</strong><small>PostgreSQL · MongoDB</small></div>
              <div className="stack-layer layer-app"><span>02</span><strong>Application</strong><small>NestJS · APIs · Workflows</small></div>
              <div className="stack-layer layer-interface"><span>01</span><strong>Interface</strong><small>React · Next.js</small></div>
              <div className="stack-caption"><span>Interface / API / Data</span><b>rk.</b></div>
            </div>
          </div>
          <div className="hero-index"><span>Currently at {profile.employer}</span><a href="#work">A selection of my work ↓</a></div>
        </section>

        <section className="section" id="work">
          <header className="section-heading"><p className="section-number">01 / Selected work</p><div><h2>Built across the stack.</h2><p>Public websites and independent products, followed by carefully anonymized professional work.</p></div></header>
          <div className="project-list">{publicProjects.map((project, index) => <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} featured={index === 0} />)}</div>
          <div className="confidential-intro"><p className="eyebrow">Professional work</p><h3>Meaningful contributions,<br />responsibly presented.</h3><p>These summaries intentionally stay at a broad level. Each is draft wording for review before public publication.</p></div>
          <div className="confidential-grid">{confidentialProjects.map(project => <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />)}</div>
        </section>

        <section className="section about" id="about">
          <header className="section-heading"><p className="section-number">02 / About</p><div><h2>Care in the details.<br />Clarity in the whole.</h2></div></header>
          <div className="about-grid">
            <div className="about-statement"><p>I’m {profile.name}, an Associate Full Stack Developer at {profile.employer} I enjoy turning layered requirements into usable, organized applications—from the interface people see to the APIs and data behind it.</p><p>My approach balances technical structure with visual judgment. I value readable systems, considered interactions and work that remains clear as it grows.</p></div>
            <aside className="education"><p className="eyebrow">Education</p><h3>Bachelor of Science<br />in Information Technology</h3><p>Vidyalankar School of Information Technology</p><dl><div><dt>Completed</dt><dd>2025</dd></div><div><dt>CGPA</dt><dd>9.30</dd></div></dl></aside>
          </div>
        </section>

        <section className="section" id="experience">
          <header className="section-heading"><p className="section-number">03 / Experience</p><div><h2>From learning in context<br />to owning more of the build.</h2></div></header>
          <div className="timeline">{experience.map((item, index) => <article key={item.role} className="timeline-item"><div className="timeline-marker"><span>{String(index + 1).padStart(2, '0')}</span></div><div><p className="eyebrow">{item.period}</p><h3>{item.role}</h3><p className="company">{item.company}</p><p>{item.detail}</p></div></article>)}</div>
        </section>

        <section className="section skills-section" aria-labelledby="skills-title">
          <header className="section-heading"><p className="section-number">04 / Technical practice</p><div><h2 id="skills-title">A versatile, practical toolkit.</h2></div></header>
          <div className="skills-grid">{skills.map(group => <article key={group.group}><h3>{group.group}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>
        </section>

        <section className="contact" id="contact">
          <p className="section-number">05 / Contact</p>
          <h2>Have a thoughtful project<br />in mind? <em>Let’s talk.</em></h2>
          <p className="contact-copy">I’m always open to a good conversation about product ideas, web experiences and full-stack work.</p>
          <div className="contact-actions"><a className="primary-action light" href={`mailto:${profile.email}`}>Write to me <span aria-hidden="true">↗</span></a><button onClick={copyEmail} className="secondary-action" aria-live="polite">{copied ? 'Email copied' : 'Copy email'}</button></div>
          <div className="contact-meta"><a href={`mailto:${profile.email}?subject=Resume request`}>Request resume</a><span>{profile.location}</span><span>{profile.email}</span></div>
        </section>
      </main>
      <footer><a className="wordmark" href="#top">riya kadam<span>.</span></a><p>Designed and built with care.</p><p>© {new Date().getFullYear()} {profile.shortName}</p></footer>
      <ProjectDialog project={selectedProject} onClose={closeDialog} />
    </>
  )
}

export default App
