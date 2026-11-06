import { useRef, useState, type TouchEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, ExternalLink } from 'lucide-react';
import { projects } from '../content';
import './project-showcase.css';

// Show an accessible, inspectable real product first. These are case summaries,
// NOT invented screenshots, client KPIs, or claims that unfinished work is live.
const featured = [projects[1], projects[3], projects[0], projects[2]];
const total = featured.length;
const microhead = ['EDUCATION / WEB', 'CREATIVE / DIGITAL', 'PRODUCT / PLATFORM', 'AI / RESEARCH'];

export function ProjectShowcase() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const startTouch = useRef<{ x: number; y: number } | null>(null);
  const project = featured[active];
  const stage = project.status === 'Live site' ? 'PUBLIC WEBSITE' : 'WORK IN PROGRESS';
  const next = (offset: number) => setActive(current => (current + offset + total) % total);

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    startTouch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };
  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const point = startTouch.current;
    if (!point) return;
    const dx = event.changedTouches[0].clientX - point.x;
    const dy = event.changedTouches[0].clientY - point.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.6) next(dx < 0 ? 1 : -1);
    startTouch.current = null;
  };

  return (
    <section
      className={'hero-gallery glass project-showcase showcase-' + project.highlight}
      aria-label="Featured portfolio projects"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="showcase-grid" aria-hidden="true" />
      <div className="showcase-head">
        <div className="showcase-identity">
          <span className="showcase-emblem" aria-hidden="true"><span /></span>
          <span>THE WORK / NOT JUST THE WORDS</span>
        </div>
        <span className="showcase-counter">{String(active + 1).padStart(2, '0')} <b>/</b> {String(total).padStart(2, '0')}</span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={project.number}
          className="showcase-content"
          initial={reduceMotion ? false : { opacity: 0, y: 17, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -11, filter: 'blur(3px)' }}
          transition={{ duration: reduceMotion ? 0 : 0.26, ease: 'easeOut' }}
        >
          <div className="showcase-topline">
            <span className="showcase-category">{microhead[active]}</span>
            <span className="showcase-status"><span className="showcase-status-dot" />{stage}</span>
          </div>
          <span className="showcase-figure" aria-hidden="true">{String(active + 1).padStart(2, '0')}</span>
          <h2 className="showcase-title">{project.title === "Leo Logistics Academy" ? <>Leo Logistics<br />Academy</> : project.title}</h2>
          <p className="showcase-description">{project.description}</p>
          <div className="showcase-stack" aria-label="Technologies used">
            {project.technologies.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}
          </div>
          <div className="showcase-action-row">
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="showcase-primary">
              {project.status === 'Live site' ? 'Visit website' : 'Explore project'}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            {project.source && <a className="showcase-secondary" href={project.source} target="_blank" rel="noopener noreferrer">
              <Code2 size={15} aria-hidden="true" /> Source <ExternalLink size={13} aria-hidden="true" />
            </a>}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="showcase-footer">
        <div className="showcase-select" role="group" aria-label="Choose featured project">
          {featured.map((item, index) => (
            <button
              key={item.number}
              type="button"
              onClick={() => setActive(index)}
              className={index === active ? 'is-active' : ''}
              aria-pressed={index === active}
              aria-label={'Show project: ' + item.title}
              title={item.title}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
        <div className="showcase-arrows">
          <button type="button" onClick={() => next(-1)} aria-label="Previous featured project"><ArrowLeft size={18} /></button>
          <button type="button" onClick={() => next(1)} aria-label="Next featured project"><ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
