import {
  ArrowRight,
  BadgeCheck,
  Code2,
  Gauge,
  Shield,
  Sparkles,
  SunMedium,
  Target,
} from "lucide-react";

const stats = [
  { icon: Target, value: "12+", label: "Projects" },
  { icon: BadgeCheck, value: "9+", label: "Valid Findings" },
  { icon: Gauge, value: "1+", label: "Years Experience" },
  { icon: Sparkles, value: "100%", label: "Passion" },
];

const actionCards = [
  {
    icon: Code2,
    title: "Developer Created App",
    text: "Explore the applications I have built.",
    href: "/projects",
  },
  {
    icon: Shield,
    title: "Finding Bounty",
    text: "View my valid bug bounty reports and discoveries.",
    href: "/findings",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <div className="grid-overlay" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label="kenjisubagja home">
          <span className="brand-mark">
            <img src="/icon.png" alt="" aria-hidden="true" />
          </span>
          <span className="brand-code">&lt;</span>
          <span>kenjisubagja</span>
          <span className="brand-code">/&gt;</span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a className="active" href="#home">Home</a>
          <a href="/projects">Projects</a>
          <a href="/findings">Findings</a>
          <a href="/contact">Contact</a>
        </nav>

        <button className="theme-button" type="button" aria-label="Toggle theme">
          <SunMedium size={18} />
        </button>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="role-pill">
            <span>Bug Hunter</span>
            <i />
            <span>Web Developer</span>
          </div>

          <h1>
            Building Secure Apps,
            <br />
            Finding <span>Critical Bugs.</span>
          </h1>

          <p className="hero-subtitle">
            I build modern web applications and hunt for security flaws
            to make the web a safer place.
          </p>

          <div className="stats-row" aria-label="Portfolio stats">
            {stats.map(({ icon: Icon, value, label }) => (
              <div className="stat-item" key={label}>
                <Icon size={16} />
                <div>
                  <strong>{value}</strong>
                  <small>{label}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="action-row">
            {actionCards.map(({ icon: Icon, title, text, href }) => (
              <a className="action-card" href={href} key={title}>
                <span className="action-icon">
                  <Icon size={30} />
                </span>
                <span className="action-copy">
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
                <ArrowRight className="card-arrow" size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="glow-orbit" />
          <img
            className="laptop-image"
            src="/img/laptop.png"
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>
    </main>
  );
}
