import { Copy, Github, Linkedin, Mail, SunMedium } from "lucide-react";
import { contacts } from "../../data/contact";

const icons = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
};

export const metadata = {
  title: "Contact | kenjisubagja",
};

export default function ContactPage() {
  return (
    <main className="site-shell contact-shell">
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
          <a href="/projects">Projects</a>
          <a href="/findings">Findings</a>
          <a className="active" href="/contact">Contact</a>
        </nav>

        <button className="theme-button" type="button" aria-label="Toggle theme">
          <SunMedium size={18} />
        </button>
      </header>

      <section className="contact-page">
        <div className="section-heading">
          <h1>
            Contact <span>Me</span>
          </h1>
          <p>Let's connect or work together on secure and awesome projects.</p>
        </div>

        <div className="contact-grid">
          {contacts.map((contact) => {
            const Icon = icons[contact.icon];

            return (
              <a className="contact-card" href={contact.href} key={contact.label}>
                <span className={`contact-icon ${contact.icon}`}>
                  <Icon size={34} />
                </span>
                <span className="contact-copy">
                  <strong>{contact.label}</strong>
                  <small>{contact.value}</small>
                </span>
                <Copy className="contact-copy-icon" size={20} />
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
