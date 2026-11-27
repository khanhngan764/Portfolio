import { useEffect, useRef } from 'react';
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Language, LocalizedContent, ProjectItem } from '../data/profile';
import { ProjectVisualPreview } from './ProjectVisualPreview';
import { useModalDialog } from '../hooks/useModalDialog';

interface ProjectModalProps {
  project: ProjectItem | null;
  projects: ProjectItem[];
  lang: Language;
  copy: LocalizedContent['projectModal'];
  onClose: () => void;
  onSelectProject: (id: string) => void;
  onContactProject: (projectTitle: string) => void;
}

export function ProjectModal({
  project,
  projects,
  lang,
  copy,
  onClose,
  onSelectProject,
  onContactProject,
}: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  useModalDialog(Boolean(project), onClose, dialogRef);

  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const hasMultiple = projects.length > 1 && currentIndex >= 0;

  const goPrev = () => {
    if (!hasMultiple) return;
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    onSelectProject(projects[prevIdx].id);
  };

  const goNext = () => {
    if (!hasMultiple) return;
    const nextIdx = (currentIndex + 1) % projects.length;
    onSelectProject(projects[nextIdx].id);
  };

  useEffect(() => {
    if (!project || projects.length < 2) return;
    const handleArrows = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const idx = projects.findIndex((p) => p.id === project.id);
        if (idx >= 0) onSelectProject(projects[(idx - 1 + projects.length) % projects.length].id);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const idx = projects.findIndex((p) => p.id === project.id);
        if (idx >= 0) onSelectProject(projects[(idx + 1) % projects.length].id);
      }
    };
    window.addEventListener('keydown', handleArrows);
    return () => window.removeEventListener('keydown', handleArrows);
  }, [project, projects, onSelectProject]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-xs p-4 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0F172A] border border-zinc-200 dark:border-slate-800 rounded-2xl shadow-2xl focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xs border-b border-zinc-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between gap-4 px-6 py-3.5">
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-slate-400 min-w-0">
                  <span className="font-medium text-zinc-800 dark:text-slate-200 truncate">{project.platform}</span>
                  <span aria-hidden="true">·</span>
                  <span className="whitespace-nowrap">{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="whitespace-nowrap">{project.year}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {hasMultiple && (
                    <div className="flex items-center gap-1 mr-1">
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label={copy.prevProject}
                        title={copy.prevProject}
                        className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-200 dark:border-slate-700 text-zinc-700 dark:text-slate-300 hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="px-1.5 text-xs font-mono tabular-nums text-zinc-500 dark:text-slate-400 select-none">
                        {currentIndex + 1}/{projects.length}
                      </span>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label={copy.nextProject}
                        title={copy.nextProject}
                        className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-200 dark:border-slate-700 text-zinc-700 dark:text-slate-300 hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={copy.closeLabel}
                    className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-lg text-zinc-600 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] shrink-0"
                  >
                    <X className="w-5 h-5" strokeWidth={1.75} />
                  </button>
                </div>
              </div>

              {hasMultiple && (
                <div className="px-6 pb-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {projects.map((p, idx) => {
                    const isCurrent = p.id === project.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => onSelectProject(p.id)}
                        className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                          isCurrent
                            ? 'bg-[#0B469B] dark:bg-sky-600 text-white shadow-xs'
                            : 'bg-zinc-100 dark:bg-slate-800/80 text-zinc-700 dark:text-slate-300 hover:bg-zinc-200/80 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="font-mono tabular-nums opacity-75">0{idx + 1}.</span>
                        <span className="max-w-[165px] truncate">{p.shortTitle}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              <div className="space-y-3">
                <h2
                  id="project-modal-title"
                  className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white text-balance"
                >
                  {project.title}
                </h2>
                <p className="text-base text-zinc-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                  {project.summary}
                </p>
              </div>

              <div className="rounded-xl overflow-hidden border border-zinc-200/90 dark:border-slate-700/80 min-h-[240px]">
                <ProjectVisualPreview visualType={project.visualType} lang={lang} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-zinc-200/80 dark:border-slate-800">
                <div>
                  <h3 className="text-xs font-medium text-zinc-500 dark:text-slate-400 mb-1.5">
                    {copy.roleHeading}
                  </h3>
                  <p className="text-sm font-medium text-zinc-900 dark:text-slate-100">{project.role}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-zinc-500 dark:text-slate-400 mb-1.5">
                    {copy.techHeading}
                  </h3>
                  <p className="text-sm text-zinc-800 dark:text-slate-200 leading-relaxed">
                    {project.deliverables.join(' · ')}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-zinc-500 dark:text-slate-400 mb-1.5">
                    {copy.impactHeading}
                  </h3>
                  <p className="text-sm font-medium text-[#2563EB] dark:text-sky-400 leading-relaxed">
                    {project.impact}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-200/80 dark:border-slate-800 space-y-3">
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-white">{copy.scopeHeading}</h3>
                <ul className="space-y-2">
                  {project.scope.map((line, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-zinc-700 dark:text-slate-300 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-zinc-400 dark:before:text-slate-500"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-200/80 dark:border-slate-800">
                <span className="text-xs text-zinc-500 dark:text-slate-400">{copy.footerPrompt}</span>
                <button
                  type="button"
                  onClick={() => {
                    onContactProject(project.title);
                    onClose();
                  }}
                  className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  <span>{copy.contactBtn}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
