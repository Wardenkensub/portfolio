import { ArrowRight, SunMedium } from "lucide-react";
import { projects } from "../../data/projects";

const filters = ["All", "Web App", "Tool", "Personal"];

export const metadata = {
  title: "Projects | kenjisubagja",
};

export default function ProjectsPage() {
  return (
    <main className="site-shell projects-shell">
      <div className="grid-overlay" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="/" aria-label="kenjisubagja home">
          <span className="brand-mark">
            <img src="/icon.png" alt="" aria-hidden="true" />
          </span>
          <span className="brand-code">&lt;</span>
          <span>kenjisubagja</span>
          <span className="brand-code">/&gt;</span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a className="active" href="/projects">Projects</a>
          <a href="/findings">Findings</a>
          <a href="/contact">Contact</a>
        </nav>

        <button className="theme-button" type="button" aria-label="Toggle theme">
          <SunMedium size={18} />
        </button>
      </header>

      <section className="projects-page">
        <div className="section-heading">
          <h1>
            My <span>Projects</span>
          </h1>
          <p>A collection of web applications I have built with passion and code.</p>
        </div>

        <div className="filter-row" aria-label="Project filters">
          {filters.map((filter, index) => (
            <button className={index === 0 ? "active" : ""} type="button" key={filter}>
              {filter}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-top">
                <img src="/img/browser.svg" alt="" aria-hidden="true" />
                <div>
                  <h2>{project.title}</h2>
                  <span>{project.type}</span>
                </div>
              </div>

              <p>{project.description}</p>

              <ul>
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <a className="view-project" href={project.url} target="_blank" rel="noreferrer">
                View Project
                <ArrowRight size={18} />
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
