import { useEffect, useRef, useState, type FormEvent } from 'react';
import { X, ArrowRight, Check, Mail, Copy, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { LocalizedContent } from '../data/profile';
import { useModalDialog } from '../hooks/useModalDialog';

interface ContactModalProps {
  isOpen: boolean;
  initialSubject?: string;
  recipientEmail: string;
  zaloUrl: string;
  copy: LocalizedContent['contactModal'];
  onClose: () => void;
}

function copyTextFallback(text: string): boolean {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export function ContactModal({
  isOpen,
  initialSubject = '',
  recipientEmail,
  zaloUrl,
  copy,
  onClose,
}: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSubject(initialSubject);
  }, [initialSubject]);

  const handleClose = () => {
    setSubmitted(false);
    setError('');
    setCopiedSummary(false);
    onClose();
  };

  useModalDialog(isOpen, handleClose, dialogRef);

  const resolvedSubject = subject.trim() || copy.subjectPlaceholder;
  const formattedBody = [
    `${copy.nameLabel}: ${name.trim()}`,
    `${copy.emailLabel}: ${email.trim()}`,
    '',
    message.trim(),
  ].join('\n');

  const mailtoHref = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(
    resolvedSubject
  )}&body=${encodeURIComponent(formattedBody)}`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(copy.requiredError);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(copy.emailError);
      return;
    }
    setError('');
    setSubmitted(true);

    // Trigger user's email client via a temporary link (avoids window.open in iframe)
    const link = document.createElement('a');
    link.href = mailtoHref;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyContent = async () => {
    const fullText = `${resolvedSubject}\n\n${formattedBody}`;
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(fullText);
      } else {
        copyTextFallback(fullText);
      }
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2200);
    } catch {
      if (copyTextFallback(fullText)) {
        setCopiedSummary(true);
        window.setTimeout(() => setCopiedSummary(false), 2200);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-xs p-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg bg-white dark:bg-[#0F172A] border border-zinc-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-zinc-200/80 dark:border-slate-800">
              <div>
                <h2 id="contact-modal-title" className="text-lg font-semibold text-zinc-950 dark:text-white">
                  {copy.title}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-slate-400 mt-1 leading-relaxed">{copy.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label={copy.closeBtn}
                className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-lg text-zinc-500 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="py-4 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">{copy.successTitle}</h3>
                  <p className="text-sm text-zinc-600 dark:text-slate-300 leading-relaxed">{copy.successDesc}</p>

                  <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors min-h-[42px]"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{copy.openMailBtn}</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyContent}
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-800 dark:text-slate-100 bg-zinc-100 dark:bg-slate-800 hover:bg-zinc-200 dark:hover:bg-slate-700 border border-zinc-200 dark:border-slate-700 rounded-lg transition-colors min-h-[42px]"
                    >
                      {copiedSummary ? (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>{copiedSummary ? copy.copiedContentBtn : copy.copyContentBtn}</span>
                    </button>
                    <a
                      href={zaloUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0B469B] dark:text-sky-300 bg-blue-50 dark:bg-sky-950/50 hover:bg-blue-100 dark:hover:bg-sky-900/60 border border-blue-200 dark:border-sky-800 rounded-lg transition-colors min-h-[42px]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{copy.zaloFallbackBtn}</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="cursor-pointer text-xs font-medium text-zinc-500 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white underline underline-offset-4"
                    >
                      {copy.closeBtn}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="modal-name" className="block text-xs font-medium text-zinc-700 dark:text-slate-300">
                      {copy.nameLabel} <span className="text-rose-600 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={copy.namePlaceholder}
                      className="w-full min-h-[42px] px-3.5 py-2 text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-500 bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-700 rounded-lg focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] dark:focus:border-sky-400 focus:ring-2 focus:ring-[#2563EB]/15"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="modal-email" className="block text-xs font-medium text-zinc-700 dark:text-slate-300">
                      {copy.emailLabel} <span className="text-rose-600 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={copy.emailPlaceholder}
                      className="w-full min-h-[42px] px-3.5 py-2 text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-500 bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-700 rounded-lg focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] dark:focus:border-sky-400 focus:ring-2 focus:ring-[#2563EB]/15"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="modal-subject" className="block text-xs font-medium text-zinc-700 dark:text-slate-300">
                      {copy.subjectLabel}
                    </label>
                    <input
                      id="modal-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={copy.subjectPlaceholder}
                      className="w-full min-h-[42px] px-3.5 py-2 text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-500 bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-700 rounded-lg focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] dark:focus:border-sky-400 focus:ring-2 focus:ring-[#2563EB]/15"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="modal-message" className="block text-xs font-medium text-zinc-700 dark:text-slate-300">
                      {copy.messageLabel} <span className="text-rose-600 dark:text-rose-400">*</span>
                    </label>
                    <textarea
                      id="modal-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={copy.messagePlaceholder}
                      className="w-full px-3.5 py-2 text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-500 bg-zinc-50 dark:bg-slate-900 border border-zinc-200 dark:border-slate-700 rounded-lg focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] dark:focus:border-sky-400 focus:ring-2 focus:ring-[#2563EB]/15 resize-y"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-lg px-3 py-2"
                    >
                      {error}
                    </p>
                  )}

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <a
                      href={zaloUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0B469B] dark:text-sky-400 hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{copy.zaloFallbackBtn}</span>
                    </a>
                    <button
                      type="submit"
                      className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors min-h-[42px]"
                    >
                      <span>{copy.submitBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
