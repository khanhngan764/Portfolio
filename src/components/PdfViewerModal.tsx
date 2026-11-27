import { useRef } from 'react';
import { X, Download, FileText, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Language } from '../data/profile';
import { useModalDialog } from '../hooks/useModalDialog';

interface PdfViewerModalProps {
  isOpen: boolean;
  pdfUrl: string;
  lang: Language;
  onClose: () => void;
}

export function PdfViewerModal({
  isOpen,
  pdfUrl,
  lang,
  onClose,
}: PdfViewerModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  useModalDialog(isOpen, onClose, dialogRef);

  const isVi = lang === 'vi';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 backdrop-blur-xs p-3 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-viewer-title"
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[90vh] flex flex-col bg-white dark:bg-[#0F172A] border border-zinc-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 bg-white dark:bg-[#0F172A] border-b border-zinc-200/90 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-[#1D4ED8] dark:text-sky-400 shrink-0" />
                <div className="min-w-0">
                  <h2
                    id="pdf-viewer-title"
                    className="text-sm font-semibold text-zinc-950 dark:text-white truncate"
                  >
                    {isVi
                      ? 'CV Hoàng Văn Thiện — IT Supervisor (Bản PDF gốc)'
                      : 'Hoang Van Thien — IT Supervisor Resume (Original PDF)'}
                  </h2>
                  <p className="text-[11px] font-mono text-zinc-500 dark:text-slate-400 truncate">
                    CV_Hoang_Van_Thien_IT_Supervisor.pdf
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-800 dark:text-slate-200 bg-zinc-100 dark:bg-slate-800 hover:bg-zinc-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isVi ? 'Mở tab mới' : 'Open tab'}</span>
                </a>
                <a
                  href={pdfUrl}
                  download="CV_Hoang_Van_Thien_IT_Supervisor.pdf"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-[#0B469B] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Lưu về máy' : 'Save PDF'}</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={isVi ? 'Đóng trình xem PDF' : 'Close PDF viewer'}
                  className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-lg text-zinc-600 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  <X className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {/* Mobile Helper Bar */}
            <div className="sm:hidden flex items-center justify-between gap-2 px-4 py-2 bg-blue-50/90 dark:bg-slate-800/80 border-b border-blue-100 dark:border-slate-700 text-[11px] text-zinc-700 dark:text-slate-300 shrink-0">
              <span>{isVi ? 'Nếu khung PDF không cuộn được trên điện thoại:' : 'On mobile, open full PDF:'}</span>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#0B469B] dark:text-sky-400 underline whitespace-nowrap"
              >
                {isVi ? 'Mở toàn màn hình' : 'Open full screen'}
              </a>
            </div>

            {/* Embedded In-Page PDF Viewer */}
            <div className="flex-1 bg-zinc-100 dark:bg-slate-900 relative overflow-hidden">
              <object
                data={`${pdfUrl}#view=FitH`}
                type="application/pdf"
                className="w-full h-full"
                aria-label="CV Hoàng Văn Thiện PDF"
              >
                <iframe
                  src={`${pdfUrl}#view=FitH`}
                  title="CV Hoàng Văn Thiện PDF"
                  className="w-full h-full border-0"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-zinc-50 dark:bg-slate-900 space-y-4">
                  <p className="text-sm text-zinc-700 dark:text-slate-300 max-w-md">
                    {isVi
                      ? 'Trình duyệt trên thiết bị này không hỗ trợ xem trước PDF trực tiếp. Bạn có thể mở trong tab mới hoặc tải tệp PDF về để xem đầy đủ.'
                      : 'Inline PDF preview is not supported on this device browser. You can open it in a new tab or download the PDF file directly.'}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-zinc-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{isVi ? 'Mở toàn màn hình' : 'Open in New Tab'}</span>
                    </a>
                    <a
                      href={pdfUrl}
                      download="CV_Hoang_Van_Thien_IT_Supervisor.pdf"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#0B469B] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isVi ? 'Tải xuống CV (PDF)' : 'Download CV (PDF)'}</span>
                    </a>
                  </div>
                </div>
              </object>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
