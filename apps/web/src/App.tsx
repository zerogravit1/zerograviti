import './App.css';

const projects = [
  {
    name: 'Forene',
    type: 'Test infrastructure',
    description:
      'A developer-facing automation platform for shared configuration, authentication, execution, and cross-application workflows.',
  },
  {
    name: 'Atticus',
    type: 'Service virtualization',
    description:
      'An open-source Playwright-first HTTP record, replay, and mocking service for repeatable integration testing.',
  },
  {
    name: 'Shipweard',
    type: 'Observability',
    description:
      'A service-traffic visualization project built around distributed tracing and runtime visibility.',
  },
  {
    name: 'Tun',
    type: 'Device infrastructure',
    description:
      'A virtual device registry and reservation model for coordinating shared physical test environments.',
  },
] as const;

function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="/" aria-label="zerograviti home">
          zerograviti
        </a>

        <nav aria-label="Primary navigation">
          <ul className="site-nav">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#engineering">Engineering</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="about">
          <p className="eyebrow">Jonathan Schaffer · Quality engineering · Developer productivity</p>

          <h1>I build systems that make software easier to develop, validate, and ship with confidence.</h1>

          <p className="hero-copy">
            My goal is to reduce unnecessary engineering friction while preserving the controls, visibility, and
            feedback that allow teams to trust the software delivery process.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              View selected work
            </a>
            <a className="button button-secondary" href="https://github.com/zerogravit1">
              GitHub
            </a>
          </div>
        </section>

        <section className="section" id="work" aria-labelledby="work-heading">
          <div className="section-heading">
            <p className="section-label">Selected work</p>
            <h2 id="work-heading">Engineering recurring problems out of the delivery process.</h2>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <p className="project-type">{project.type}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section engineering-section" id="engineering" aria-labelledby="engineering-heading">
          <div className="section-heading">
            <p className="section-label">Engineering approach</p>
            <h2 id="engineering-heading">Quality is a system property, not a final checkpoint.</h2>
          </div>

          <div className="principle-grid">
            <article>
              <span className="principle-number">01</span>
              <h3>Build reusable foundations</h3>
              <p>Solve recurring engineering problems once in shared tooling instead of repeatedly inside each test.</p>
            </article>
            <article>
              <span className="principle-number">02</span>
              <h3>Shorten feedback loops</h3>
              <p>Put useful signals close to the developer so failures are easier to understand and act on.</p>
            </article>
            <article>
              <span className="principle-number">03</span>
              <h3>Preserve trust</h3>
              <p>Automation should improve speed without removing the controls, evidence, and visibility teams rely on.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div>
          <p className="footer-title">Jonathan Schaffer</p>
          <p>Quality engineering · Test infrastructure · Developer productivity</p>
        </div>

        <a href="https://github.com/zerogravit1">github.com/zerogravit1</a>
      </footer>
    </div>
  );
}

export default App;
