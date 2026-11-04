
import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Command,
  ExternalLink, Github, Globe2, Layers3, Mail, Menu, Sparkles, X
} from 'lucide-react';
import { journey, projects, skills, type Project } from './content';

const Scene3D = lazy(() => import('./components/Scene3D'));
const EMAIL = 'samandaralimov18@gmail.com';
const GITHUB = 'https://github.com/SamandarAlimov';
const navigation = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
] as const;

type Filter = 'All' | 'Products' | 'Web' | 'Research';
const filters: Filter[] = ['All', 'Products', 'Web', 'Research'];

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.76, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ overline, title, description }: { overline: string; title: ReactNode; description?: string }) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow"><span className="eyebrow-line" />{overline}</p>
      <h2>{title}</h2>
      {description && <p className="section-intro">{description}</p>}
    </Reveal>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        layout
        className={'project-card project-' + project.highlight}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 320, damping: 25 }}
      >
        <div className="project-visual">
          <span className="project-no">{project.number} / SELECTED WORK</span>
          <div className="project-orb" aria-hidden="true"><span>{project.mark}</span></div>
          <span className="project-visual-tag">{project.category}</span>
          <span className="project-visual-corner" aria-hidden="true">↗</span>
        </div>
        <div className="project-body">
          <div className="project-line">
            <p className="micro-label">{project.category}</p>
            <span className="status"><span className="status-dot" />{project.status}</span>
          </div>
          <h3>{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <div className="tag-row">
            {project.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}
          </div>
          <div className="project-links">
            <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">
              {project.status === 'Live site' ? 'Visit website' : 'View project'} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            {project.source && (
              <a className="text-link muted-link" href={project.source} target="_blank" rel="noopener noreferrer">
                Source <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function App() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [threeReady, setThreeReady] = useState(false);
  const [filter, setFilter] = useState<Filter>('All');
  const [emailCopied, setEmailCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    setThreeReady(!reduce && hasWebGL());
  }, [reduce]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const visibleProjects = projects.filter((project) => {
    if (filter === 'All') return true;
    if (filter === 'Products') return ['01'].includes(project.number);
    if (filter === 'Web') return project.number === '02';
    return project.number === '03' || project.number === '04';
  });

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2300);
    } catch {
      window.location.href = 'mailto:' + EMAIL;
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="page-noise" aria-hidden="true" />
      <header className="site-header">
        <div className="header-inner layout">
          <a className="brand" href="#home" aria-label="Samandar — home">
            <span className="brand-symbol">s<span>.</span></span>
            <span className="brand-name">samandar<span className="brand-light"> / portfolio</span></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => <a key={item.id} href={'#' + item.id}>{item.label}</a>)}
          </nav>
          <a href={'mailto:' + EMAIL} className="nav-cta">Let's talk <ArrowUpRight size={16} aria-hidden="true" /></a>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {navigation.map((item, i) => (
              <a href={'#' + item.id} key={item.id} onClick={() => setMenuOpen(false)}>
                <span>0{i + 1}</span>{item.label}<ArrowUpRight size={20} aria-hidden="true" />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-heading">
          <div className="hero-grid layout">
            <div className="hero-content">
              <Reveal><div className="availability"><span className="pulse-dot" /> OPEN TO MEANINGFUL PROJECTS <span className="availability-arrow">↗</span></div></Reveal>
              <motion.h1
                id="hero-heading"
                initial={reduce ? false : { opacity: 0, y: 45 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                Designing<br />what's <em>next.</em>
              </motion.h1>
              <Reveal delay={0.14}>
                <p className="hero-description">
                  I'm <strong>Samandar Alimov</strong> — a developer crafting expressive interfaces,
                  cross-platform applications and practical digital products.
                </p>
                <div className="hero-actions">
                  <a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={18} aria-hidden="true" /></a>
                  <a className="button button-secondary" href="#about">More about me <ArrowDown size={17} aria-hidden="true" /></a>
                </div>
              </Reveal>
              <div className="hero-bottom">
                <span><span className="small-point" /> BASED IN UZBEKISTAN</span>
                <span><span className="small-point" /> BUILDING FOR THE WORLD</span>
              </div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="art-halo" />
              <div className="art-ring art-ring-one" />
              <div className="art-ring art-ring-two" />
              <div className="art-label art-label-top"><Sparkles size={14} /> DESIGN × CODE</div>
              <div className="art-label art-label-bottom">INTERACTIVE / 001</div>
              {threeReady ? (
                <Suspense fallback={<div className="art-fallback" />}>
                  <Scene3D />
                </Suspense>
              ) : (
                <div className="art-fallback"><span className="art-fallback-core">S</span></div>
              )}
            </div>
          </div>
          <a className="hero-scroll" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={18} aria-hidden="true" /></a>
        </section>

        <section className="marquee-strip" aria-label="Areas of expertise">
          <div className="marquee-content">
            {['DEVELOPMENT', '✳', 'DESIGN ENGINEERING', '✳', 'MOTION', '✳', 'PRODUCT THINKING', '✳', 'DEVELOPMENT', '✳', 'DESIGN ENGINEERING', '✳', 'MOTION', '✳', 'PRODUCT THINKING', '✳'].map((word, i) =>
              <span key={i} aria-hidden={i >= 8}>{word}</span>
            )}
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-heading">
          <div className="layout about-grid">
            <div className="about-portrait">
              <Reveal><div className="portrait-frame">
                <img src={import.meta.env.BASE_URL + 'images/profile.jpg'} alt="Portrait of Samandar Alimov" loading="lazy" />
                <span className="portrait-badge"><span>✳</span> CREATIVE DEVELOPER</span>
              </div></Reveal>
              <span className="portrait-caption">BUILDING WITH CURIOSITY, ALWAYS.</span>
            </div>
            <div className="about-copy">
              <SectionTitle overline="01 / ABOUT ME" title={<span id="about-heading">A builder at heart.<br /><span className="gradient-text">A learner by nature.</span></span>} />
              <Reveal delay={0.08}>
                <p className="about-lead">I care about the little details that make a product feel effortless — and the engineering that makes it work.</p>
                <p className="about-muted">My path connects software development, design, economics and a growing interest in logistics. I enjoy taking ambitious ideas and making them tangible, one thoughtful iteration at a time.</p>
                <p className="about-muted">Today I'm building across React, TypeScript and Flutter, including the Alsamos ecosystem. I value honest progress, accessible experiences and continuous improvement.</p>
                <a className="text-link about-link" href="#journey">Explore my journey <ArrowRight size={18} aria-hidden="true" /></a>
              </Reveal>
              <Reveal className="about-facts">
                <div><strong>React / TS</strong><span>WEB ENGINEERING</span></div>
                <div><strong>Flutter</strong><span>CROSS-PLATFORM</span></div>
                <div><strong>Uzbekistan</strong><span>HOME BASE</span></div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section work-section" id="work" aria-labelledby="work-heading">
          <div className="layout">
            <div className="work-heading-row">
              <SectionTitle overline="02 / SELECTED WORK" title={<span id="work-heading">A few things <span className="gradient-text">I've built.</span></span>} description="Real projects, ongoing explorations and meaningful challenges. Each one teaches me something new." />
              <Reveal><a className="view-github" href={GITHUB} target="_blank" rel="noopener noreferrer"><Github size={19} aria-hidden="true" /> All repositories <ArrowUpRight size={16} aria-hidden="true" /></a></Reveal>
            </div>
            <div className="filters" role="group" aria-label="Filter projects">
              {filters.map((item) => <button type="button" key={item} className={'filter' + (filter === item ? ' active' : '')} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
            </div>
            <motion.div layout className="project-grid">
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleProjects.map((project, index) => (
                  <motion.div layout key={project.number} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }}>
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="section expertise-section" id="expertise" aria-labelledby="expertise-heading">
          <div className="layout">
            <SectionTitle overline="03 / WHAT I DO" title={<span id="expertise-heading">Thoughtful by design.<br /><span className="gradient-text">Solid by engineering.</span></span>} description="The best experiences sit where thoughtful design meets dependable code." />
            <div className="expertise-grid">
              {skills.map((skill, i) => {
                const Icon = [Code2, Layers3, Globe2][i];
                return <Reveal key={skill.title} delay={i * 0.09}><article className="expertise-card">
                  <div className="expertise-header"><span className="expertise-icon"><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span><span className="expertise-count">0{i + 1}</span></div>
                  <h3>{skill.title}</h3><p>{skill.summary}</p>
                  <div className="expertise-tags">{skill.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                </article></Reveal>;
              })}
            </div>
          </div>
        </section>

        <section className="section journey-section" id="journey" aria-labelledby="journey-heading">
          <div className="layout journey-grid">
            <div className="journey-intro">
              <SectionTitle overline="04 / THE JOURNEY" title={<span id="journey-heading">Still curious.<br /><span className="gradient-text">Still creating.</span></span>} description="Not a straight line, but a direction that keeps making more sense." />
              <Reveal><div className="journey-quote"><Command size={26} strokeWidth={1.6} aria-hidden="true" /><p>Build with intention.<br />Keep learning in public.</p></div></Reveal>
            </div>
            <div className="timeline">
              {journey.map((event, i) => <Reveal key={event.period} delay={i * 0.07}>
                <article className="timeline-item"><span className="timeline-period">{event.period}</span><div><span className="timeline-marker" /><h3>{event.title}</h3><p>{event.detail}</p></div></article>
              </Reveal>)}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="contact-glow" aria-hidden="true" />
          <div className="layout">
            <Reveal><p className="eyebrow"><span className="eyebrow-line" />05 / GET IN TOUCH</p></Reveal>
            <Reveal delay={0.05}><h2 id="contact-heading">Have a good idea?<br /><em>Let's make it real.</em></h2></Reveal>
            <Reveal delay={0.09}><p className="contact-description">I enjoy collaborating on ambitious, useful and beautifully considered digital experiences. Tell me what you're building.</p></Reveal>
            <Reveal className="contact-actions">
              <a className="button button-primary contact-primary" href={'mailto:' + EMAIL}>Start a conversation <Mail size={19} aria-hidden="true" /></a>
              <button className="copy-email" type="button" onClick={copyEmail} aria-live="polite">{emailCopied ? <Check size={16} /> : <Command size={16} />}{emailCopied ? 'Copied!' : 'Copy email'}</button>
            </Reveal>
            <Reveal><div className="contact-email">{EMAIL}</div></Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="layout footer-inner">
          <a className="footer-brand" href="#home">samandar<span>.</span></a>
          <p>Designed with care. Built with purpose.<br />© {new Date().getFullYear()} Samandar Alimov.</p>
          <div className="footer-links"><a href={GITHUB} target="_blank" rel="noopener noreferrer"><Github size={18} /> GitHub</a><a href={'mailto:' + EMAIL}><Mail size={18} /> Email</a><a href="#home">Back to top ↑</a></div>
        </div>
      </footer>
    </>
  );
}
