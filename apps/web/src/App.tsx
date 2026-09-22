import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import './App.css';
import { trackEvent } from './analytics';

type CommandSource = 'keyboard' | 'suggestion';

const projects = [
  {
    name: 'Forene',
    type: 'Test infrastructure',
    link: '',
    description:
      'A developer-facing automation platform for shared configuration, authentication, execution, and cross-application workflows.',
  },
  {
    name: 'Atticus',
    type: 'Service virtualization',
    link: 'https://github.com/zerogravit1/atticus-mock-service',
    description:
      'An open-source Playwright-first HTTP record, replay, and mocking service for repeatable integration testing.',
  },
  {
    name: 'Shipweard',
    type: 'Observability',
    link: 'https://github.com/zerogravit1/shipweard',
    description:
      'A service-traffic visualization project built around distributed tracing and runtime visibility.',
  },
  {
    name: 'Tun',
    type: 'Device infrastructure',
    link: 'https://github.com/zerogravit1/tun',
    description:
      'A virtual device registry and reservation model for coordinating shared physical test environments.',
  },
] as const;

const MIN_BOOT_DELAY = 375;
const MAX_BOOT_DELAY = 450;
const MIN_DELAY_DIFFERENCE = 15;

const MIN_ERROR_DELAY = 600;
const MAX_ERROR_DELAY = 1000;
const MIN_ERROR_DIFFERENCE = 125;

function createDelays(count: number, minDelay: number, maxDelay: number, diff: number ): number[] {
  const delays: number[] = [];
  let previousInterval: number | undefined;
  let elapsed = 0;

  for (let index = 0; index < count; index += 1) {
    let interval: number;

    do {
      interval =
        Math.floor(Math.random() * (maxDelay - minDelay + 1)) +
        minDelay;
    } while (
      previousInterval !== undefined &&
      Math.abs(interval - previousInterval) < diff
    );

    elapsed += interval;
    delays.push(elapsed);
    previousInterval = interval;
  }

  return delays;
}

const bootLines = [
  { text: 'ZEROGRAVITI SYSTEM // build 0.1.0', tone: 'muted' },
  { text: 'initializing environment...', tone: 'normal' },
  { text: 'loading delivery graph...', tone: 'normal' },
  { text: 'loading quality controls...', tone: 'normal' },
  { text: 'loading observability...', tone: 'normal' },
] as const;

const errorLines = [
  { text: 'ERROR: workflow exceeded expected complexity', tone: 'error' },
  { text: 'ERROR: duplicate infrastructure detected', tone: 'error' },
  { text: 'ERROR: feedback latency above threshold', tone: 'error' },
  { text: 'ERROR: confidence state unresolved', tone: 'error' },
  { text: 'diagnostic complete.', tone: 'muted' },
] as const;

const statusLines = [
  ['[ ... ]', 'shared infrastructure', 'initializing'],
  ['[ ... ]', 'feedback loops', 'observing'],
  ['[  ok ]', 'observability', 'active'],
  ['[WARN ]', 'delivery confidence', 'unresolved']
] as const;

const LINE_ANIMATION_DURATION = 120;
const TERMINAL_READY_PAUSE = 500;

function createStartupSequence() {
  const bootDelays = createDelays(bootLines.length, MIN_BOOT_DELAY, MAX_BOOT_DELAY, MIN_DELAY_DIFFERENCE);
  const bootSequenceEnd = (bootDelays.at(-1) ?? 0) + LINE_ANIMATION_DURATION;

  const errorDelays = createDelays(
    errorLines.length,
    MIN_ERROR_DELAY,
    MAX_ERROR_DELAY,
    MIN_ERROR_DIFFERENCE,
  ).map((delay) => bootSequenceEnd + delay);

  const errorSequenceEnd = (errorDelays.at(-1) ?? bootSequenceEnd) + LINE_ANIMATION_DURATION;

  return {
    bootDelays,
    errorDelays,
    terminalReadyDelay: errorSequenceEnd + TERMINAL_READY_PAUSE,
  };
}

type Command = 'help' | 'initialize' | 'explore' | 'projects' | 'about' | 'status';

const commandHelp: Record<Command, string> = {
  help: 'list available commands',
  initialize: 'rerun system initialization',
  explore: 'enter the system',
  projects: 'inspect engineering systems',
  about: 'identify operator',
  status: 'view current system state',
};

function App() {
  const [entered, setEntered] = useState(false);
  const [terminalReady, setTerminalReady] = useState(false);
  const [startupRun, setStartupRun] = useState(0);
  const [startupSequence, setStartupSequence] = useState(createStartupSequence);
  const [command, setCommand] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'type "help" to list available commands',
  ]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTerminalReady(true);
    }, startupSequence.terminalReadyDelay);

    return () => window.clearTimeout(timer);
  }, [startupSequence]);

  function enterAt(target?: string) {
    setEntered(true);

    if (target) {
      window.location.hash = target;
    }
  }

  function runCommand(rawCommand: string, source: CommandSource) {
    const normalized = rawCommand.trim().toLowerCase() as Command;

    if (!normalized) {
      return;
    }

    trackEvent('console_command', {
      command: normalized,
      source,
    });

    let response: string[];

    switch (normalized) {
      case 'help':
        response = [
          'AVAILABLE COMMANDS',
          ...Object.entries(commandHelp).map(([name, description]) => `${name.padEnd(15)} ${description}`),
        ];
        break;
      case 'initialize':
        setTerminalReady(false);
        setTerminalOutput(['type "help" to list available commands']);
        setCommand('');
        setStartupRun((current) => current + 1);
        setStartupSequence(createStartupSequence());
        return;
      case 'status':
        response = [
          'SYSTEM STATUS',
          '',
          ...statusLines.map(
            ([state, name, value]) =>
              `${state.padEnd(8, ' ')}${name.padEnd(26, '.')}${value}`,
          ),
        ];
        break;
      case 'about':
        response = ['operator: Jonathan Schaffer', 'role: quality engineering + developer productivity', 'opening profile...'];
        enterAt('about');
        break;
      case 'projects':
        response = ['mapping engineering systems...', '4 systems discovered.', 'opening topology...'];
        enterAt('work');
        break;
      case 'explore':
        response = ['resolving system topology...', 'mapping dependencies...', 'establishing observation points...', 'READY.'];
        enterAt();
        break;
      default:
        response = [`command not found: ${normalized}`, 'type "help" for available commands'];
    }

    setTerminalOutput((current) => [...current, `> ${rawCommand.trim()}`, ...response]);
    setCommand('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(command, 'keyboard');
  }

  return (
    <>
      <section className={`terminal-stage ${entered ? 'terminal-stage--exiting' : ''}`} aria-label="System entry">
        <div className="terminal" aria-live="polite">
          <div className="terminal-output">
            {bootLines.map((line, index) => (
              <p
                className={`terminal-line terminal-line--${line.tone}`}
                style={{ animationDelay: `${startupSequence.bootDelays[index]}ms` }}
                key={`${startupRun}-boot-${line.text}`}
              >
                {line.text}
              </p>
            ))}

            {errorLines.map((line, index) => (
              <p
                className={`terminal-line terminal-line--${line.tone}`}
                style={{ animationDelay: `${startupSequence.errorDelays[index]}ms` }}
                key={`${startupRun}-error-${line.text}`}
              >
                {line.text}
              </p>
            ))}

            {terminalReady && (
              <div className="terminal-session">
                {terminalOutput.map((line, index) => (
                  <p className="terminal-line terminal-line--session" key={`${line}-${index}`}>
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>

          {terminalReady && (
            <>
              <form className="terminal-prompt" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="command">
                  System command
                </label>
                <span aria-hidden="true">&gt;</span>
                <input
                  id="command"
                  name="command"
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  autoFocus
                />
              </form>

              <div className="command-hints" aria-label="Suggested commands">
                {(['help', 'status', 'initialize', 'explore'] as const).map((suggestion) => (
                  <button type="button" onClick={() => runCommand(suggestion, 'suggestion')} key={suggestion}>
                    {suggestion}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <div className={`experience ${entered ? 'experience--visible' : ''}`} hidden={!entered}>
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
                <a className="button button-primary"
                   href="#work"
                   onClick={() =>
                    trackEvent('cta_click', {
                      action: 'continue_exploring',
                      location: 'hero',
                    })
                   }>
                  Continue exploring
                </a>
                <a className="button button-secondary"
                   href="https://github.com/zerogravit1"
                   onClick={() =>
                    trackEvent('cta_click', {
                      action: 'github',
                      location: 'hero',
                    })
                   }>
                  GitHub
                </a>
                <a className="button button-secondary"
                   href="https://www.linkedin.com/in/jonathan-schaffer-59911a2/"
                   onClick={() =>
                    trackEvent('cta_click', {
                      action: 'linkedin',
                      location: 'hero',
                    })
                   }>LinkedIn</a>
              </div>
            </section>

            <section className="section" id="work" aria-labelledby="work-heading">
              <div className="section-heading">
                <p className="section-label">System topology</p>
                <h2 id="work-heading">Engineering recurring problems out of the delivery process.</h2>
              </div>

              <div className="project-grid">
                {projects.map((project) => (
                  <article className="project-card" key={project.name}>
                    <p className="project-type">{project.type}</p>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    {project.link && <a href={project.link} onClick={() => trackEvent('cta_click', {action: `${project.name}`, location: 'projects'})}>See repository here</a>}
                  </article>
                ))}
              </div>
            </section>

            <section className="section engineering-section" id="engineering" aria-labelledby="engineering-heading">
              <div className="section-heading">
                <p className="section-label">Operating principles</p>
                <h2 id="engineering-heading">Quality is a system property, not a final checkpoint.</h2>
              </div>

              <div className="principle-grid">
                <article>
                  <span className="principle-number">01</span>
                  <h3>Build reusable foundations</h3>
                  <p>Solve recurring engineering problems once with shared tooling over carrying the same friction from project to project.</p>
                </article>
                <article>
                  <span className="principle-number">02</span>
                  <h3>Shorten feedback loops</h3>
                  <p>Put useful information close to the developer so failures are easier to understand, act on, and resolve.</p>
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

            <div>
              <p>Interested in the work?</p>
            </div>
            <a href="https://www.linkedin.com/in/jonathan-schaffer-59911a2/" onClick={() => trackEvent('cta_click', {action: 'linkedin', location: 'footer'})}>Connect with me on LinkedIn</a>
            <a href="https://github.com/zerogravit1" onClick={() => trackEvent('cta_click', {action: 'repo', location: 'footer'})}>github.com/zerogravit1</a>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
