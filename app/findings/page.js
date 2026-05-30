import { ArrowRight, Shield, SunMedium } from "lucide-react";
import { findings } from "../../data/findings";

const rows = findings.map((finding) => ({
    slug: finding.slug,
    title: finding.title,
    severity: finding.severity,
    program: finding.publicProgram || finding.program,
    date: finding.listDate || finding.reported,
}));

export const metadata = {
  title: "Findings | kenjisubagja",
};

export default function FindingsPage() {
  return (
    <main className="site-shell findings-shell">
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
          <a className="active" href="/findings">Findings</a>
          <a href="/contact">Contact</a>
        </nav>

        <button className="theme-button" type="button" aria-label="Toggle theme">
          <SunMedium size={18} />
        </button>
      </header>

      <section className="findings-page">
        <div className="section-heading">
          <h1>
            Valid Bug Bounty <span>Findings</span>
          </h1>
          <p>Responsible disclosure and helping to make the web a safer place.</p>
        </div>

        <div className="findings-table-wrap">
          <table className="findings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Severity</th>
                <th>Program</th>
                <th>Date</th>
                <th aria-label="View finding" />
              </tr>
            </thead>
            <tbody>
              {rows.map((finding, index) => (
                <tr key={finding.slug}>
                  <td data-label="#">{index + 1}</td>
                  <td data-label="Title">{finding.title}</td>
                  <td data-label="Severity">
                    <span className={`severity-pill ${finding.severity.toLowerCase()}`}>
                      {finding.severity}
                    </span>
                  </td>
                  <td data-label="Program">{finding.program}</td>
                  <td data-label="Date">{finding.date}</td>
                  <td data-label="View">
                    <a className="table-view" href={`/findings/${finding.slug}`}>
                      View
                      <ArrowRight size={17} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="findings-note">
          <Shield size={16} />
          All findings are reported responsibly.
        </p>
      </section>
    </main>
  );
}
