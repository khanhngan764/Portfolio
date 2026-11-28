import { useRef } from 'react';
import { X, Printer, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { LocalizedContent } from '../data/profile';
import { useModalDialog } from '../hooks/useModalDialog';

interface CvModalProps {
  isOpen: boolean;
  content: LocalizedContent;
  onClose: () => void;
  onOpenPdf: () => void;
}

export function CvModal({ isOpen, content, onClose, onOpenPdf }: CvModalProps) {
  const { profile, experiences, projects, techStackTable, cvModal: copy } = content;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  useModalDialog(isOpen, onClose, dialogRef);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-xs p-4 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0F172A] border border-zinc-200 dark:border-slate-800 rounded-2xl shadow-2xl focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xs border-b border-zinc-200/80 dark:border-slate-800">
              <span className="text-sm font-medium text-zinc-700 dark:text-slate-200 truncate">
                {copy.headerTitle}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenPdf();
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-zinc-800 dark:text-slate-200 bg-zinc-100 dark:bg-slate-800 hover:bg-zinc-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copy.downloadOriginalPdf}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-[#0B2A63] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{copy.printBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={copy.closeLabel}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-zinc-600 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  <X className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            <div id="printable-cv" className="p-6 sm:p-10 space-y-8 text-zinc-900 dark:text-slate-200">
              <header className="pb-6 border-b border-zinc-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-zinc-200 dark:border-slate-700 bg-zinc-100 dark:bg-slate-800 shrink-0">
                    <img
                      src={profile.portraitImage}
                      alt={profile.fullName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-[50%_26%] scale-[1.03]"
                    />
                  </div>
                  <div>
                    <h2
                      id="cv-modal-title"
                      className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white"
                    >
                      {profile.fullName}
                    </h2>
                    <p className="text-sm font-medium text-[#1D4ED8] dark:text-sky-400 mt-1">{profile.title}</p>
                    <p className="text-xs text-zinc-600 dark:text-slate-400 mt-1">{profile.targetRole}</p>
                  </div>
                </div>
                <div className="text-xs text-zinc-600 dark:text-slate-400 space-y-1 sm:text-right">
                  <div>{profile.location}</div>
                  <div className="font-mono">{profile.email}</div>
                  <div className="font-mono tabular-nums">{profile.phoneDisplay}</div>
                </div>
              </header>

              <section className="space-y-2">
                <h3 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-slate-400">
                  {copy.summaryHeading}
                </h3>
                <p className="text-sm text-zinc-700 dark:text-slate-300 leading-relaxed">{profile.heroLead}</p>
              </section>

              <section className="space-y-5">
                <h3 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-slate-400">
                  {copy.experienceHeading}
                </h3>
                <div className="space-y-5">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="space-y-1.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="text-sm font-semibold text-zinc-950 dark:text-white">
                          {exp.role} <span className="font-normal text-zinc-500 dark:text-slate-500">·</span>{' '}
                          <span className="font-medium text-zinc-700 dark:text-slate-300">{exp.organization}</span>
                        </div>
                        <span className="text-xs font-mono tabular-nums text-zinc-500 dark:text-slate-400">
                          {exp.period} {exp.duration}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-slate-400 leading-relaxed">{exp.summary}</p>
                      <ul className="space-y-1 pt-1">
                        {exp.highlights.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-zinc-700 dark:text-slate-300 leading-relaxed pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-zinc-400 dark:before:text-slate-500"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-3 pt-6 border-t border-zinc-200 dark:border-slate-800">
                <h3 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-slate-400">
                  {copy.projectsHeading}
                </h3>
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="text-xs space-y-0.5">
                      <div className="font-semibold text-zinc-950 dark:text-white">
                        {proj.title}{' '}
                        <span className="font-normal text-zinc-500 dark:text-slate-400">({proj.platform})</span>
                      </div>
                      <div className="text-zinc-700 dark:text-slate-300 leading-relaxed">{proj.impact}</div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-zinc-200 dark:border-slate-800">
                <section className="space-y-3">
                  <h3 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-slate-400">
                    {copy.educationHeading}
                  </h3>
                  <div className="space-y-3">
                    {profile.education.map((edu, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-xs font-mono tabular-nums text-zinc-500 dark:text-slate-400">
                          {edu.period}
                        </div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">{edu.degree}</div>
                        <div className="text-xs text-zinc-600 dark:text-slate-400">{edu.school}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-slate-400">
                    {copy.techStackHeading}
                  </h3>
                  <div className="space-y-1.5">
                    {techStackTable.map((row) => (
                      <div key={row.group} className="text-xs text-zinc-700 dark:text-slate-300 leading-relaxed">
                        <span className="font-semibold text-zinc-900 dark:text-white">{row.group}: </span>
                        <span>{row.technologies}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
