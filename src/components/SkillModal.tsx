import { useEffect } from 'react';
import { X, Server, Database, ShieldCheck, Code2, MapPin, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { CompetencyCard, Language } from '../data/profile';

interface SkillModalProps {
  skill: CompetencyCard | null;
  lang: Language;
  onClose: () => void;
}

function SkillIcon({ iconKey }: { iconKey: CompetencyCard['iconKey'] }) {
  switch (iconKey) {
    case 'server':
      return <Server className="w-5 h-5 text-[#1D4ED8] dark:text-sky-400" />;
    case 'database':
      return <Database className="w-5 h-5 text-[#DC2626] dark:text-rose-400" />;
    case 'shield':
      return <ShieldCheck className="w-5 h-5 text-[#059669] dark:text-emerald-400" />;
    case 'code':
      return <Code2 className="w-5 h-5 text-[#4F46E5] dark:text-indigo-400" />;
    case 'map':
      return <MapPin className="w-5 h-5 text-[#0891B2] dark:text-cyan-400" />;
    case 'users':
      return <Users className="w-5 h-5 text-[#D97706] dark:text-amber-400" />;
  }
}

export function SkillModal({ skill, lang, onClose }: SkillModalProps) {
  useEffect(() => {
    if (!skill) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skill, onClose]);

  return (
    <AnimatePresence>
      {skill && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/65 backdrop-blur-xs p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="skill-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full bg-white dark:bg-[#0F172A] border border-zinc-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[88vh] flex flex-col ${
              skill.pillars ? 'max-w-2xl' : 'max-w-lg'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200/80 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <SkillIcon iconKey={skill.iconKey} />
                <div>
                  <h3 id="skill-modal-title" className="text-base font-semibold text-zinc-950 dark:text-white">
                    {skill.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-slate-400">{skill.shortSubtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto">
              {skill.pillars && skill.pillars.length > 0 && (
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-[#4F46E5] dark:text-indigo-400 uppercase tracking-wider">
                    {lang === 'vi'
                      ? 'Kiến trúc phát triển theo hướng lập trình hiện đại'
                      : 'Modern Full-Stack Development Architecture'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {skill.pillars.map((pillar, idx) => (
                      <div
                        key={pillar.label}
                        className="rounded-xl border border-indigo-200/80 dark:border-indigo-800/60 bg-indigo-50/55 dark:bg-indigo-950/35 p-3.5 space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-zinc-950 dark:text-white">{pillar.label}</span>
                          <span className="font-mono text-[10px] font-semibold text-[#4F46E5] dark:text-indigo-400">
                            0{idx + 1}
                          </span>
                        </div>
                        <div className="font-mono text-[10.5px] font-medium text-[#4338CA] dark:text-indigo-300 leading-snug">
                          {pillar.stack}
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-slate-300 leading-relaxed">{pillar.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2.5">
                <p className="text-xs font-medium text-zinc-500 dark:text-slate-400">
                  {lang === 'vi' ? 'Chi tiết năng lực thực tế' : 'Hands-on Competency Details'}
                </p>
                <ul className="space-y-2.5">
                  {skill.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-zinc-700 dark:text-slate-300 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-[#2563EB] dark:before:text-sky-400"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
