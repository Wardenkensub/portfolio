import { ArrowLeft, Building2, CalendarDays, Check, Gauge, Globe2, LockKeyhole, Search, Share2, Shield, Tag, Terminal, Text } from "lucide-react";
import { findings, getFinding } from "../../../data/findings";

const sectionIcons = {
  summary: Text,
  shield: Shield,
  search: Search,
  code: Terminal,
};

export function generateStaticParams() {
  return findings.map((finding) => ({ slug: finding.slug }));
}

export default function FindingDetail({ params }) {
  const finding = getFinding(params.slug);

  if (!finding) {
    return <main className="site-shell detail-shell">Finding not found.</main>;
  }

  return (
    <main className="site-shell detail-shell">
      <div className="grid-overlay" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="/" aria-label="kenjisubagja home">
          <span className="brand-mark"><img src="/icon.png" alt="" aria-hidden="true" /></span>
          <span>kenjisubagja</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/projects">Projects</a>
          <a className="active" href="/findings">Findings</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <div className="finding-layout">
        <article className="finding-article">
          <a className="back-link" href="/findings"><ArrowLeft size={16} /> Back to Findings</a>

          <div className="finding-heading">
            <div>
              <h1>{finding.title}</h1>
              <div className="finding-badges">
                <span className="badge accepted"><Check size={15} /> {finding.status}</span>
                <span className="badge high">{finding.severity}</span>
                <span className="badge neutral">{finding.type}</span>
                <span className="badge neutral">{finding.tag}</span>
              </div>
            </div>
            <button className="share-button" type="button"><Share2 size={16} /> Share</button>
          </div>

          <p className="finding-summary">{finding.summary}</p>

          {finding.sections.map((section, index) => {
            const Icon = sectionIcons[section.icon] || Text;

            return (
              <FindingSection
                number={String(index + 1)}
                icon={Icon}
                title={section.title}
                key={section.title}
              >
                <p>{section.body}</p>

                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}

                {section.callout ? (
                  <div className="severity-callout">
                    <strong>{section.calloutTitle}</strong>
                    <p>{section.callout}</p>
                  </div>
                ) : null}

                {section.code ? (
                  <pre className="redacted-poc"><code>{section.code}</code></pre>
                ) : null}

                {section.result ? (
                  <small className="redacted-note">{section.result}</small>
                ) : null}
              </FindingSection>
            );
          })}
        </article>

        <aside className="finding-sidebar">
          <div className="sidebar-card">
            <h2>Finding Information</h2>
            <InfoRow icon={Building2} label="Program" value={finding.program} />
            <InfoRow icon={Globe2} label="Target" value={finding.target} />
            <InfoRow icon={CalendarDays} label="Reported" value={finding.reported} />
            <InfoRow icon={Check} label="Status" value={finding.status} accent="green" />
            <InfoRow icon={Shield} label="Severity" value={finding.severity} accent="red" />
            <InfoRow icon={Tag} label="Category" value={finding.category} />
            <InfoRow icon={Gauge} label="CVSS Score" value={finding.cvss} />
          </div>
          <div className="sidebar-card">
            <h2>Timeline</h2>
            <div className="timeline">
              {finding.timeline.map(([label, date], index) => (
                <div className="timeline-item" key={label}>
                  <span className={index === finding.timeline.length - 1 ? "done" : ""} />
                  <strong>{label}</strong>
                  <small>{date}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="sidebar-card disclosure-card">
            <LockKeyhole size={36} />
            <h2>Responsible Disclosure</h2>
            <p>This vulnerability was responsibly disclosed to the vendor. All sensitive information, target-specific endpoints, account identifiers, tokens, cookies, and production proof values have been redacted.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function FindingSection({ number, icon: Icon, title, children }) {
  return (
    <section className="finding-section">
      <h2><span><Icon size={18} /></span>{number}. {title}</h2>
      <div className="detail-card">{children}</div>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value, accent }) {
  return (
    <div className="info-row">
      <span><Icon size={19} /></span>
      <div>
        <small>{label}</small>
        <strong className={accent || ""}>{value}</strong>
      </div>
    </div>
  );
}
