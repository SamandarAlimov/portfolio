import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, ExternalLink,
  Github, Grid2X2, List, Mail, Menu, Minus, Plus, X
} from 'lucide-react';
import { journey, projects, skills, type Project } from './content';

const Scene3D = lazy(() => import('./components/Scene3D'));
const EMAIL = 'samandaralimov18@gmail.com';
const GITHUB = 'https://github.com/SamandarAlimov';
const links = [
  { id: 'about', text: 'Approach' },
  { id: 'work', text: 'Work' },
  { id: 'expertise', text: 'Expertise' },
  { id: 'journey', text: 'Journey' },
] as const;

function canRenderWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function Reveal({ children, className = '', delay = 0 }: {
  children: ReactNode; className?: string; delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.13 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Chapter({ number, label }: { number: string; label: string }) {
  return (
    <div className="chapter" aria-label={label}>
      <span className="chapter-no">{number}</span>
      <span className="chapter-rule" aria-hidden="true" />
      <span className="chapter-label">{label}</span>
    </div>
  );
}

function ProjectArtwork({ project }: { project: Project }) {
  return (
    <div className={'work-art work-art--' + project.highlight} aria-hidden="true">
      <div className="art-grid" />
      <div className="art-loop art-loop-a" />
      <div className="art-loop art-loop-b" />
      <div className="art-disc">
        <span>{project.mark}</span>
      </div>
      <div className="art-serial">S / {project.number.padStart(3, '0')}</div>
      <span className="art-coordinate">OBJECT STUDY — {project.number}</span>
    </div>
  );
}

function WorkItem({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal className={'work-reveal work-reveal--' + (index + 1)} delay={Math.min(index * 0.06, 0.2)}>
      <motion.article
        className="work-item glass"
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty('--cursor-x', (event.clientX - rect.left) + 'px');
          event.currentTarget.style.setProperty('--cursor-y', (event.clientY - rect.top) + 'px');
        }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.23 }}
      >
        <div className="work-art-frame"><ProjectArtwork project={project} /></div>
        <div className="work-meta"><span>{project.number} / {project.category}</span><span className="work-status"><span />{project.status}</span></div>
        <div className="work-details">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="work-foot">
            <div className="work-tags">{project.technologies.slice(0, 4).map((tool) => <span key={tool}>{tool}</span>)}</div>
            <div className="work-actions">
              <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={'Open ' + project.title + ' in a new tab'}>
                <ArrowUpRight size={22} strokeWidth={1.6} />
              </a>
              {project.source && <a className="work-source" href={project.source} target="_blank" rel="noopener noreferrer" aria-label={'View ' + project.title + ' source repository'}><Github size={18} /></a>}
            </div>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

function ExpertiseItem({ index, isOpen, toggle }: { index: number; isOpen: boolean; toggle: () => void }) {
  const skill = skills[index];
  const reduceMotion = useReducedMotion();
  return (
    <div className={'expertise-item ' + (isOpen ? 'expertise-open' : '')}>
      <h3>
        <button type="button" aria-expanded={isOpen} aria-controls={'skill-panel-' + index} onClick={toggle} className="expertise-trigger">
          <span className="skill-index">0{index + 1}</span>
          <span className="skill-title">{skill.title}</span>
          <span className="skill-toggle" aria-hidden="true">{isOpen ? <Minus size={21} /> : <Plus size={21} />}</span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="skill-panel-wrap"
          >
            <div className="skill-panel" id={'skill-panel-' + index}>
              <p>{skill.summary}</p>
              <div className="skill-tags">{skill.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [threeEnabled, setThreeEnabled] = useState(false);
  const [workMode, setWorkMode] = useState<'gallery' | 'index'>('gallery');
  const [openSkill, setOpenSkill] = useState(0);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });

  useEffect(() => {
    setThreeEnabled(!reduceMotion && canRenderWebGL());
  }, [reduceMotion]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = 'mailto:' + EMAIL;
    }
  }

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <motion.div className="read-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <header className="site-header">
        <div className="nav-shell glass">
          <a className="identity" href="#home" aria-label="Samandar Otabek portfolio — home">
            <span className="identity-mark" aria-hidden="true">S<span>·</span></span>
            <span className="identity-name">SAMANDAR<br />OTABEK</span>
          </a>
          <nav className="header-links" aria-label="Primary navigation">
            {links.map(({ id, text }) => <a href={'#' + id} key={id}>{text}</a>)}
          </nav>
          <a className="header-contact" href="#contact">Let's connect <ArrowUpRight size={16} aria-hidden="true" /></a>
          <button type="button" className="menu-toggle" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} aria-controls="mobile-menu" onClick={() => setIsMenuOpen((v) => !v)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu" className="mobile-menu glass" aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
          >
            {[...links, { id: 'contact', text: 'Contact' }].map(({ id, text }, i) => (
              <a key={id} onClick={() => setIsMenuOpen(false)} href={'#' + id}>
                <span>0{i + 1}</span>{text}<ArrowUpRight size={19} />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="main">
        <section className="hero layout" id="home" aria-labelledby="hero-title">
          <div className="hero-topline">
            <span className="mini-indicator"><i /> INDEPENDENT DIGITAL BUILDER</span>
            <span className="hero-top-right">PORTFOLIO / 2026 — PRESENT</span>
          </div>
          <div className="hero-display">
            <div className="hero-type">
              <Reveal><span className="hero-kicker"><span className="kicker-square" /> IDEAS / INTERFACES / IMPACT</span></Reveal>
              <motion.h1
                id="hero-title"
                initial={reduceMotion ? false : { opacity: 0, y: 52 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              >
                Form<br />follows<br /><em>curiosity.</em>
              </motion.h1>
              <Reveal delay={0.2} className="hero-intro-row">
                <span className="intro-bullet" aria-hidden="true">↳</span>
                <p>I turn ambitious thinking into practical digital experiences — where engineering, interaction and imagination meet.</p>
              </Reveal>
              <Reveal delay={0.26} className="hero-links">
                <a className="black-button" href="#work">Explore the work <ArrowUpRight size={19} /></a>
                <a className="quiet-link" href="#about">The thinking behind it <ArrowDown size={17} /></a>
              </Reveal>
            </div>
            <div className="hero-gallery glass">
              <div className="gallery-grid" aria-hidden="true" />
              <div className="gallery-caption gallery-caption-top"><span>FIG. 001</span><span>FORM IN MOTION</span></div>
              <div className="gallery-corner gallery-corner-tl" aria-hidden="true" />
              <div className="gallery-corner gallery-corner-br" aria-hidden="true" />
              {threeEnabled ? (
                <Suspense fallback={<div className="sculpture-fallback" aria-hidden="true"><span>S</span></div>}>
                  <Scene3D />
                </Suspense>
              ) : <div className="sculpture-fallback" aria-hidden="true"><span>S</span></div>}
              <div className="gallery-caption gallery-caption-bottom"><span>SCULPTED IN CODE</span><span>INTERACTIVE OBJECT / 3D</span></div>
              <span className="orbit-marker orbit-marker-one" aria-hidden="true">+</span>
              <span className="orbit-marker orbit-marker-two" aria-hidden="true">+</span>
            </div>
            <div className="hero-side-index" aria-hidden="true"><span>DESIGNED TO FEEL DIFFERENT</span><span>↓</span></div>
          </div>
          <div className="hero-footer">
            <div className="hero-footer-item"><span>001 / LOCATION</span><strong>Jizzakh · Uzbekistan</strong></div>
            <div className="hero-footer-item"><span>002 / DISCIPLINE</span><strong>Design-minded engineering</strong></div>
            <div className="hero-footer-item"><span>003 / MINDSET</span><strong>Always in progress <span className="progress-symbol">↗</span></strong></div>
            <a href="#about" className="hero-down" aria-label="Scroll to approach"><ArrowDown size={23} /></a>
          </div>
        </section>

        <div className="manifesto-band" aria-label="Portfolio ethos">
          <span>BUILD WITH PURPOSE</span><span className="band-asterisk" aria-hidden="true">✳</span>
          <span>QUESTION THE OBVIOUS</span><span className="band-asterisk" aria-hidden="true">✳</span>
          <span>DETAILS MAKE THE DIFFERENCE</span>
        </div>

        <section id="about" className="about-section section-pad" aria-labelledby="about-title">
          <div className="layout">
            <Chapter number="01" label="THE APPROACH" />
            <div className="about-grid">
              <div className="about-statement">
                <Reveal><h2 id="about-title">Not just<br />what it <em>looks like.</em><br />What it <span className="outline-word">does.</span></h2></Reveal>
                <Reveal delay={0.08} className="about-prose"><span className="tiny-arrow" aria-hidden="true">↳</span><p>I'm Samandar Otabek, a developer interested in the space between technically sound products and the feeling of using them.</p></Reveal>
                <Reveal className="about-second"><p>My work spans React, TypeScript, Flutter and product experiments. Economics and logistics give me another lens: software matters most when it solves real problems.</p></Reveal>
                <Reveal><a className="inline-link" href="#journey">Read my story <ArrowUpRight size={19} /></a></Reveal>
              </div>
              <Reveal className="about-photo-wrap">
                <div className="about-photo glass">
                  <div className="photo-label"><span>IDENTITY</span><span>NO. 001</span></div>
                  <img src={import.meta.env.BASE_URL + 'images/profile.jpg'} alt="Portrait of Samandar Otabek" loading="lazy" />
                  <div className="photo-float glass"><span className="float-signal" /> <span>WORK IN PROGRESS<br /><strong>Always learning. Always building.</strong></span></div>
                </div>
                <div className="photo-under"><span>HUMAN BEHIND THE INTERFACE</span><span>© 2026</span></div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="work" className="work-section section-pad" aria-labelledby="work-title">
          <div className="layout">
            <Chapter number="02" label="SELECTED EXPLORATIONS" />
            <div className="work-intro">
              <Reveal><h2 id="work-title">Proof of<br /><em>possibility.</em></h2></Reveal>
              <div className="work-aside">
                <Reveal><p>A curated look at products, systems and experiments — including the unfinished things worth pursuing.</p></Reveal>
                <div className="work-control glass" role="group" aria-label="Project presentation">
                  <button type="button" aria-pressed={workMode === 'gallery'} className={workMode === 'gallery' ? 'selected' : ''} onClick={() => setWorkMode('gallery')}><Grid2X2 size={16} /> Gallery</button>
                  <button type="button" aria-pressed={workMode === 'index'} className={workMode === 'index' ? 'selected' : ''} onClick={() => setWorkMode('index')}><List size={16} /> Index</button>
                </div>
              </div>
            </div>
            <div className={'work-collection work-collection--' + workMode}>
              {projects.map((project, i) => <WorkItem project={project} index={i} key={project.number} />)}
            </div>
            <Reveal className="all-work"><span>MORE THAN A SHOWCASE. AN ONGOING PRACTICE.</span><a href={GITHUB} target="_blank" rel="noopener noreferrer">All GitHub projects <Github size={18} /><ArrowUpRight size={17} /></a></Reveal>
          </div>
        </section>

        <section id="expertise" className="expertise-section section-pad" aria-labelledby="expertise-title">
          <div className="layout">
            <Chapter number="03" label="THE TOOLKIT" />
            <div className="expertise-grid">
              <Reveal className="expertise-left">
                <h2 id="expertise-title">The work<br />behind the<br /><em>work.</em></h2>
                <p>Different disciplines. One belief: the simplest experiences often require the most considered thinking.</p>
                <div className="expertise-mini">A FEW THINGS I KEEP SHARPENING <span>↗</span></div>
              </Reveal>
              <div className="expertise-right">
                {skills.map((skill, i) => <Reveal key={skill.title} delay={i * 0.06}><ExpertiseItem index={i} isOpen={openSkill === i} toggle={() => setOpenSkill(openSkill === i ? -1 : i)} /></Reveal>)}
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="journey-section section-pad" aria-labelledby="journey-title">
          <div className="layout">
            <Chapter number="04" label="THE JOURNEY" />
            <div className="journey-layout">
              <Reveal><h2 id="journey-title">Still becoming<span>.</span></h2><p className="journey-intro">A path formed by curiosity, technical practice and the willingness to begin before everything is certain.</p></Reveal>
              <div className="journey-records">
                {journey.map((event, i) => (
                  <Reveal key={event.period} className="journey-record" delay={i * 0.065}>
                    <span className="record-number">0{i + 1}</span>
                    <span className="record-period">{event.period}</span>
                    <div className="record-content"><h3>{event.title}</h3><p>{event.detail}</p></div>
                    <span className="record-star" aria-hidden="true">↗</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="layout">
            <div className="contact-slab">
              <div className="contact-noise" aria-hidden="true" />
              <div className="contact-top"><span className="contact-indicator"><i /> NEXT CHAPTER / OPEN</span><span>05 — CONTACT</span></div>
              <Reveal><h2 id="contact-title">Something good<br />starts with <em>hello.</em></h2></Reveal>
              <Reveal className="contact-lower"><p>If you're building something meaningful, I'd be glad to hear about it. Let's make the next idea count.</p>
                <div className="contact-actions">
                  <a href={'mailto:' + EMAIL} className="contact-button">Start a conversation <ArrowUpRight size={22} /></a>
                  <button className="copy-action" type="button" onClick={copyAddress}>{copied ? <Check size={18} /> : <Mail size={18} />}{copied ? 'Email copied' : 'Copy email address'}</button>
                </div>
              </Reveal>
              <div className="contact-bottom"><span>SAMANDAR OTABEK / INDEPENDENT DEVELOPER</span><span>JIZZAKH · UZBEKISTAN</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="layout footer-row">
          <a href="#home" className="footer-identity" aria-label="Back to top">S<span>·</span></a>
          <span>Made with intention. © {new Date().getFullYear()} Samandar Otabek.</span>
          <div className="footer-links">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub <ExternalLink size={14} /></a>
            <a href={'mailto:' + EMAIL}>Email <ArrowUpRight size={15} /></a>
            <a href="#home">Back to top <ArrowRight className="arrow-up" size={15} /></a>
          </div>
        </div>
      </footer>
      <div className="decorative-edge" aria-hidden="true"><ChevronDown size={14} /></div>
    </>
  );
}
