import { useEffect, useRef, useState, type MouseEvent } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowRight,
  ArrowUp,
  Award,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  Copy,
  Database,
  Download,
  FileText,
  FolderKanban,
  GraduationCap,
  Home,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Send,
  Server,
  Settings,
  ShieldCheck,
  Sun,
  User,
  Users,
  X,
} from 'lucide-react';
import {
  CONTENT,
  type CompetencyCard,
  type Language,
  type ProjectItem,
  type SkillColorTheme,
} from './data/profile';
import { ResilientImage } from './components/ResilientImage';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ProjectModal } from './components/ProjectModal';
import { CvModal } from './components/CvModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { SkillModal } from './components/SkillModal';
import { ContactModal } from './components/ContactModal';
import {
  HighlightIcon,
  HTMonogram,
  ProjectCardArtwork,
  QrCodeGraphic,
} from './components/TechBrandMarks';

const SKILL_THEME_CLASSES: Record<
  SkillColorTheme,
  { card: string; iconBg: string; iconColor: string }
> = {
  blue: {
    card: 'bg-[#EFF6FF] hover:bg-[#DBEAFE]/80 border-[#BFDBFE]/70 dark:bg-blue-950/45 dark:hover:bg-blue-900/50 dark:border-blue-800/60',
    iconBg: 'bg-[#1D4ED8] text-white dark:bg-blue-600',
    iconColor: 'text-[#1D4ED8] dark:text-blue-400',
  },
  rose: {
    card: 'bg-[#FEF2F2] hover:bg-[#FEE2E2]/80 border-[#FECACA]/70 dark:bg-rose-950/40 dark:hover:bg-rose-900/45 dark:border-rose-800/60',
    iconBg: 'bg-[#EF4444] text-white dark:bg-rose-600',
    iconColor: 'text-[#DC2626] dark:text-rose-400',
  },
  emerald: {
    card: 'bg-[#ECFDF5] hover:bg-[#D1FAE5]/80 border-[#A7F3D0]/70 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/45 dark:border-emerald-800/60',
    iconBg: 'bg-[#10B981] text-white dark:bg-emerald-600',
    iconColor: 'text-[#059669] dark:text-emerald-400',
  },
  indigo: {
    card: 'bg-[#EEF2FF] hover:bg-[#E0E7FF]/80 border-[#C7D2FE]/70 dark:bg-indigo-950/45 dark:hover:bg-indigo-900/50 dark:border-indigo-800/60',
    iconBg: 'bg-[#4F46E5] text-white dark:bg-indigo-600',
    iconColor: 'text-[#4F46E5] dark:text-indigo-400',
  },
  cyan: {
    card: 'bg-[#ECFEFF] hover:bg-[#CFFAFE]/80 border-[#A5F3FC]/70 dark:bg-cyan-950/40 dark:hover:bg-cyan-900/45 dark:border-cyan-800/60',
    iconBg: 'bg-[#0891B2] text-white dark:bg-cyan-600',
    iconColor: 'text-[#0891B2] dark:text-cyan-400',
  },
  amber: {
    card: 'bg-[#FFFBEB] hover:bg-[#FEF3C7]/80 border-[#FDE68A]/70 dark:bg-amber-950/35 dark:hover:bg-amber-900/40 dark:border-amber-800/60',
    iconBg: 'bg-[#F59E0B] text-white dark:bg-amber-500',
    iconColor: 'text-[#D97706] dark:text-amber-400',
  },
};

function renderSkillTileIcon(iconKey: CompetencyCard['iconKey']) {
  switch (iconKey) {
    case 'server':
      return <Server className="w-5 h-5" strokeWidth={1.9} />;
    case 'database':
      return <Database className="w-5 h-5" strokeWidth={1.9} />;
    case 'shield':
      return <ShieldCheck className="w-5 h-5" strokeWidth={1.9} />;
    case 'code':
      return <Code2 className="w-5 h-5" strokeWidth={1.9} />;
    case 'map':
      return <MapPin className="w-5 h-5" strokeWidth={1.9} />;
    case 'users':
      return <Users className="w-5 h-5" strokeWidth={1.9} />;
  }
}

function SectionArrivalBar({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="block h-[2.5px] w-full rounded-full bg-gradient-to-r from-[#0B469B] via-[#2563EB] to-[#22D3EE] origin-left mt-1.5"
        />
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'vi';
    const saved = window.localStorage.getItem('portfolio-lang');
    return saved === 'en' || saved === 'vi' ? saved : 'vi';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = window.localStorage.getItem('portfolio-theme');
    return saved === 'dark' || saved === 'light' ? saved : 'light';
  });
  const [activeNav, setActiveNav] = useState<string>('top');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true
  );

  const rafRef = useRef<number | null>(null);
  const spyRafRef = useRef<number | null>(null);
  const scrollCleanupRef = useRef<(() => void) | null>(null);
  const highlightTimeoutRef = useRef<number | null>(null);
  const programScrollTimerRef = useRef<number | null>(null);
  const copyTimerRef = useRef<number | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const showScrollTopRef = useRef(false);
  const nearFooterRef = useRef(false);
  const activeNavRef = useRef<string>('top');
  const manualNavLockRef = useRef<{ id: string; targetY: number } | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const headerBarRef = useRef<HTMLDivElement | null>(null);

  const updateActiveNav = (id: string) => {
    activeNavRef.current = id;
    setActiveNav(id);
  };

  const getHeaderHeight = () => {
    const barHeight = headerBarRef.current?.getBoundingClientRect().height ?? 72;
    return barHeight + 3;
  };

  const getDocumentTop = (el: HTMLElement) => {
    let top = 0;
    let node: HTMLElement | null = el;
    while (node) {
      top += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    return top;
  };

  const { scrollY, scrollYProgress } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 260,
    damping: 32,
    mass: 0.45,
  });
  const scrollProgressScale = useSpring(scrollYProgress, {
    stiffness: 340,
    damping: 36,
    restDelta: 0.001,
  });
  const heroBackdropY = useTransform(smoothScrollY, [0, 480], [0, 38]);
  const heroBackdropOpacity = useTransform(smoothScrollY, [0, 480], [0.65, 0.25]);
  const highlightStripY = useTransform(smoothScrollY, [0, 320], [0, -10]);

  const content = CONTENT[lang];
  const {
    nav,
    hero,
    highlights,
    about,
    skillsSection,
    projectsSection,
    experienceSection,
    educationSection,
    contactSection,
    footer,
    profile,
    competencies,
    projects,
    experiences,
  } = content;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const syncDesktop = () => setIsDesktop(mq.matches);
    syncDesktop();
    mq.addEventListener('change', syncDesktop);
    return () => mq.removeEventListener('change', syncDesktop);
  }, []);

  const sectionViewport = isDesktop
    ? ({ once: true, amount: 0.16, margin: '0px 0px -64px 0px' } as const)
    : ({ once: true, amount: 0.08 } as const);

  const cardViewport = isDesktop
    ? ({ once: true, amount: 0.18, margin: '0px 0px -56px 0px' } as const)
    : ({ once: true, amount: 0.1 } as const);

  const bottomViewport = isDesktop
    ? ({ once: true, amount: 0.14, margin: '0px 0px -24px 0px' } as const)
    : ({ once: true, amount: 0.08 } as const);

  useEffect(() => {
    document.title = content.pageTitle;
    document.documentElement.lang = lang;
    window.localStorage.setItem('portfolio-lang', lang);
  }, [content.pageTitle, lang]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handlePointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const sectionOrder = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];

    const evaluateScrollSpy = () => {
      spyRafRef.current = null;
      const scrollTop = window.scrollY;
      const nextShowTop = scrollTop > 280;
      if (showScrollTopRef.current !== nextShowTop) {
        showScrollTopRef.current = nextShowTop;
        setShowScrollTop(nextShowTop);
      }

      const nextNearFooter =
        window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 108;
      if (nearFooterRef.current !== nextNearFooter) {
        nearFooterRef.current = nextNearFooter;
        setNearFooter(nextNearFooter);
      }

      if (isProgrammaticScrollRef.current) return;

      if (manualNavLockRef.current) {
        if (Math.abs(scrollTop - manualNavLockRef.current.targetY) < 75) {
          return;
        }
        manualNavLockRef.current = null;
      }

      if (scrollTop < 160) {
        if (activeNavRef.current !== 'top') {
          updateActiveNav('top');
        }
        return;
      }

      const headerHeight = getHeaderHeight();
      const measured: { id: string; top: number; bottom: number; height: number }[] = [];
      for (const id of sectionOrder) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          measured.push({ id, top: rect.top, bottom: rect.bottom, height: rect.height });
        }
      }

      if (measured.length === 0) return;

      const nearBottom =
        window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 24;
      if (nearBottom) {
        const contactItem = measured.find((m) => m.id === 'contact') ?? measured[measured.length - 1];
        if (activeNavRef.current !== contactItem.id) {
          updateActiveNav(contactItem.id);
        }
        return;
      }

      const anchorY = headerHeight + 88;
      const desktopView = window.matchMedia('(min-width: 1024px)').matches;

      if (desktopView) {
        // Group side-by-side sections while letting Projects activate naturally in the mid-portion of Row 1
        const edu = measured.find((m) => m.id === 'education');
        const exp = measured.find((m) => m.id === 'experience');
        const proj = measured.find((m) => m.id === 'projects');
        const aboutEl = measured.find((m) => m.id === 'about');

        let nextId = 'about';
        if (edu && edu.top <= anchorY + 40) {
          nextId = 'education';
        } else if (exp && exp.top <= anchorY + 30) {
          nextId = 'experience';
        } else if (aboutEl && proj && aboutEl.bottom < anchorY + 120) {
          nextId = 'projects';
        } else if (aboutEl && aboutEl.top <= anchorY + 60) {
          nextId = 'about';
        }

        if (activeNavRef.current !== nextId) {
          updateActiveNav(nextId);
        }
        return;
      }

      let activeId = measured[0].id;
      for (const item of measured) {
        if (item.top <= anchorY) {
          activeId = item.id;
        }
      }
      if (activeNavRef.current !== activeId) {
        updateActiveNav(activeId);
      }
    };

    const handleScrollSpy = () => {
      if (spyRafRef.current === null) {
        spyRafRef.current = requestAnimationFrame(evaluateScrollSpy);
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollSpy);
      if (spyRafRef.current !== null) cancelAnimationFrame(spyRafRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollCleanupRef.current) scrollCleanupRef.current();
      if (highlightTimeoutRef.current) window.clearTimeout(highlightTimeoutRef.current);
      if (programScrollTimerRef.current) window.clearTimeout(programScrollTimerRef.current);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    };
  }, []);

  const triggerArrivalHighlight = (id: string) => {
    if (id === 'top') return;
    if (highlightTimeoutRef.current) {
      window.clearTimeout(highlightTimeoutRef.current);
    }
    setHighlightedSection(id);
    highlightTimeoutRef.current = window.setTimeout(() => {
      setHighlightedSection(null);
    }, 1150);
  };

  const scrollToSection = (
    id: string,
    e?: MouseEvent<HTMLAnchorElement>,
    options?: { gentle?: boolean }
  ) => {
    if (e) e.preventDefault();
    updateActiveNav(id);
    setMobileMenuOpen(false);

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (scrollCleanupRef.current) {
      scrollCleanupRef.current();
      scrollCleanupRef.current = null;
    }
    if (programScrollTimerRef.current) {
      window.clearTimeout(programScrollTimerRef.current);
      programScrollTimerRef.current = null;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let targetY = 0;
    if (id !== 'top') {
      const targetEl = document.getElementById(id);
      if (!targetEl) return;
      const headerOffset = getHeaderHeight() + 20;
      const rawTop = getDocumentTop(targetEl) - headerOffset;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      targetY = Math.min(Math.max(0, rawTop), maxScroll);
    }

    manualNavLockRef.current = { id, targetY };

    if (prefersReduced) {
      window.scrollTo(0, targetY);
      triggerArrivalHighlight(id);
      return;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 4) {
      triggerArrivalHighlight(id);
      return;
    }

    const duration = options?.gentle
      ? Math.min(1650, Math.max(1050, Math.abs(distance) * 1.15))
      : Math.min(860, Math.max(520, Math.abs(distance) * 0.58));
    let startTime: number | null = null;
    isProgrammaticScrollRef.current = true;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const cleanupListeners = () => {
      window.removeEventListener('wheel', cancelOnUserScroll);
      window.removeEventListener('touchstart', cancelOnUserScroll);
      scrollCleanupRef.current = null;
    };

    const cancelOnUserScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      isProgrammaticScrollRef.current = false;
      manualNavLockRef.current = null;
      cleanupListeners();
    };

    scrollCleanupRef.current = cleanupListeners;
    window.addEventListener('wheel', cancelOnUserScroll, { passive: true, once: true });
    window.addEventListener('touchstart', cancelOnUserScroll, { passive: true, once: true });

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
        cleanupListeners();
        window.scrollTo(0, targetY);
        triggerArrivalHighlight(id);
        programScrollTimerRef.current = window.setTimeout(() => {
          isProgrammaticScrollRef.current = false;
          programScrollTimerRef.current = null;
        }, 140);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const navItems = [
    { id: 'top', href: '#top', label: nav.home, Icon: Home },
    { id: 'about', href: '#about', label: nav.about, Icon: User },
    { id: 'skills', href: '#skills', label: nav.skills, Icon: Settings },
    { id: 'projects', href: '#projects', label: nav.projects, Icon: FolderKanban },
    { id: 'experience', href: '#experience', label: nav.experience, Icon: Briefcase },
    { id: 'education', href: '#education', label: nav.education, Icon: GraduationCap },
    { id: 'contact', href: '#contact', label: nav.contact, Icon: Mail },
  ];

  const selectedProject: ProjectItem | null =
    selectedProjectId ? projects.find((p) => p.id === selectedProjectId) ?? null : null;

  const selectedSkill: CompetencyCard | null =
    selectedSkillId ? competencies.find((c) => c.id === selectedSkillId) ?? null : null;

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    let copied = false;
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(value);
        copied = true;
      }
    } catch {
      copied = false;
    }

    if (!copied) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        copied = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        copied = false;
      }
    }

    if (copied) {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      setCopiedField(field);
      copyTimerRef.current = window.setTimeout(() => {
        setCopiedField(null);
        copyTimerRef.current = null;
      }, 2200);
    }
  };

  const handleHighlightClick = (id: string) => {
    switch (id) {
      case 'h-exp':
        scrollToSection('experience');
        break;
      case 'h-edu':
        scrollToSection('education');
        break;
      case 'h-oracle':
        setSelectedSkillId('comp-db');
        break;
      case 'h-win':
        setSelectedSkillId('comp-infra');
        break;
      case 'h-gis':
        setSelectedSkillId('comp-gis');
        break;
      case 'h-sec':
        setSelectedSkillId('comp-sec');
        break;
    }
  };

  const handleContactProject = (projectTitle: string) => {
    setContactSubject(
      lang === 'vi'
        ? `Trao đổi dự án: ${projectTitle}`
        : `Project Inquiry: ${projectTitle}`
    );
    setIsContactOpen(true);
  };

  const themeToggleLabel =
    theme === 'dark'
      ? lang === 'vi'
        ? 'Chuyển sang giao diện sáng'
        : 'Switch to light mode'
      : lang === 'vi'
        ? 'Chuyển sang giao diện tối'
        : 'Switch to dark mode';

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F3F6FA] dark:bg-[#0B1120] text-[#0F172A] dark:text-slate-100 flex flex-col transition-colors duration-300">
        {/* Top Navigation Bar */}
        <header
          ref={headerRef}
          className="sticky top-0 z-40 bg-white/[0.97] dark:bg-[#0F172A]/[0.97] border-b border-zinc-200/90 dark:border-slate-800/90 transition-colors duration-300"
        >
          <div
            ref={headerBarRef}
            className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-3 xl:gap-4"
          >
            {/* Left Zone: HT Monogram + Name + Title */}
            <a
              href="#top"
              onClick={(e) => scrollToSection('top', e)}
              className="flex items-center gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] rounded-md"
            >
              <HTMonogram variant={theme === 'dark' ? 'dark' : 'light'} />
              <div className="leading-tight">
                <div className="font-display text-sm sm:text-[15px] font-bold tracking-tight text-[#0A2259] dark:text-white whitespace-nowrap">
                  {profile.brandName}
                </div>
                <div className="text-[11px] font-semibold text-[#1D4ED8] dark:text-sky-400 whitespace-nowrap">
                  IT Supervisor
                </div>
              </div>
            </a>

            {/* Center Zone: Desktop Navigation Items (visible from lg 1024px+) */}
            <nav
              aria-label={lang === 'vi' ? 'Điều hướng chính' : 'Primary navigation'}
              className="hidden lg:flex items-center gap-0.5 xl:gap-1.5"
            >
              {navItems.map(({ id, href, label, Icon }) => {
                const isActive = activeNav === id;
                return (
                  <a
                    key={id}
                    href={href}
                    onClick={(e) => scrollToSection(id, e)}
                    className={`relative inline-flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-3.5 py-2.5 rounded-xl text-left transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                      isActive
                        ? 'text-white'
                        : 'text-zinc-700 dark:text-slate-300 hover:bg-zinc-100 dark:hover:bg-slate-800/80 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        className="absolute inset-0 bg-[#0B469B] dark:bg-sky-600 rounded-xl shadow-sm -z-10"
                      />
                    )}
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-white' : 'text-[#0B469B] dark:text-sky-400'
                      }`}
                      strokeWidth={2}
                    />
                    <span className="text-[12.5px] xl:text-[13px] font-semibold leading-none">{label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right Zone: Icon-only Theme Switcher + VI | EN Language Switcher + Mobile Menu Button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                aria-label={themeToggleLabel}
                aria-pressed={theme === 'dark'}
                title={themeToggleLabel}
                className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100 hover:bg-zinc-200/80 dark:bg-slate-800/90 dark:hover:bg-slate-700/90 border border-zinc-200/80 dark:border-slate-700/80 text-slate-700 dark:text-amber-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.span
                      key="sun"
                      initial={{ opacity: 0, rotate: -45, scale: 0.75 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 45, scale: 0.75 }}
                      transition={{ duration: 0.18 }}
                      className="inline-flex"
                    >
                      <Sun className="w-4 h-4" strokeWidth={2.1} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ opacity: 0, rotate: 45, scale: 0.75 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -45, scale: 0.75 }}
                      transition={{ duration: 0.18 }}
                      className="inline-flex"
                    >
                      <Moon className="w-4 h-4" strokeWidth={2.1} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <LanguageSwitcher lang={lang} onChange={setLang} compact />

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-expanded={mobileMenuOpen}
                aria-label={
                  mobileMenuOpen
                    ? lang === 'vi'
                      ? 'Đóng menu'
                      : 'Close menu'
                    : lang === 'vi'
                      ? 'Mở menu'
                      : 'Open menu'
                }
                className="lg:hidden cursor-pointer inline-flex items-center justify-center w-10 h-10 rounded-lg text-zinc-700 dark:text-slate-200 hover:bg-zinc-100 dark:hover:bg-slate-800 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile / Tablet Nav Drawer with Smooth Animation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden border-t border-zinc-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-2 transition-colors shadow-lg"
              >
                {navItems.map(({ id, href, label, Icon }) => {
                  const isActive = activeNav === id;
                  return (
                    <a
                      key={id}
                      href={href}
                      onClick={(e) => scrollToSection(id, e)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold min-h-[44px] transition-colors ${
                        isActive
                          ? 'bg-[#0B469B] dark:bg-sky-600 text-white'
                          : 'text-zinc-700 dark:text-slate-200 bg-zinc-50 dark:bg-slate-800/80 hover:bg-zinc-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{label}</span>
                    </a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reading Scroll Progress Indicator */}
          <motion.div
            style={{ scaleX: scrollProgressScale }}
            aria-hidden="true"
            className="h-[2.5px] bg-gradient-to-r from-[#0B469B] via-[#2563EB] to-[#22D3EE] origin-left will-change-transform"
          />
        </header>

        <main id="top" className="flex-1">
          {/* HERO BANNER — Deep Navy / Tech Network Canvas */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#041230] via-[#0A2B66] to-[#08204E] text-white">
            {/* Architectural SVG Server & Animated Digital Sphere Backdrop */}
            <motion.div
              aria-hidden="true"
              style={{ y: heroBackdropY, opacity: heroBackdropOpacity }}
              className="absolute inset-0 pointer-events-none will-change-transform transform-gpu [contain:layout_paint]"
            >
              <svg
                viewBox="0 0 1440 520"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full"
              >
              <defs>
                <radialGradient id="globe-glow" cx="52%" cy="54%" r="36%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.65" />
                  <stop offset="55%" stopColor="#1D4ED8" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#041230" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="sphere-core" cx="42%" cy="38%" r="60%">
                  <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.28" />
                  <stop offset="55%" stopColor="#0EA5E9" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#041230" stopOpacity="0.02" />
                </radialGradient>
              </defs>

              <motion.rect
                width="1440"
                height="520"
                fill="url(#globe-glow)"
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Left & Right Server Rack Silhouettes (preserved background) */}
              <g stroke="#38BDF8" strokeOpacity="0.22" fill="#041538" fillOpacity="0.55">
                <rect x="20" y="30" width="84" height="460" rx="4" />
                <rect x="116" y="55" width="70" height="410" rx="4" />
                <rect x="1250" y="50" width="74" height="420" rx="4" />
                <rect x="1336" y="25" width="88" height="470" rx="4" />
              </g>

              {/* Subtle Rack LED Pulses */}
              <g>
                <motion.circle
                  cx="36"
                  cy="68"
                  r="2.2"
                  fill="#22D3EE"
                  animate={{ opacity: [0.25, 0.95, 0.25] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="132"
                  cy="115"
                  r="2.2"
                  fill="#38BDF8"
                  animate={{ opacity: [0.85, 0.2, 0.85] }}
                  transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="1268"
                  cy="96"
                  r="2.2"
                  fill="#22D3EE"
                  animate={{ opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="1354"
                  cy="142"
                  r="2.2"
                  fill="#34D399"
                  animate={{ opacity: [0.9, 0.25, 0.9] }}
                  transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
                />
              </g>

              {/* Animated Wireframe Digital Sphere / Globe */}
              <g transform="translate(690, 275)">
                {/* Soft Atmospheric Halo */}
                <motion.circle
                  cx="0"
                  cy="0"
                  r="204"
                  fill="url(#sphere-core)"
                  stroke="#38BDF8"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                  style={{ transformOrigin: '0px 0px' }}
                  animate={{ scale: [0.98, 1.03, 0.98], opacity: [0.65, 0.95, 0.65] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Outer Rotating Dashed Orbit Ring */}
                <motion.circle
                  cx="0"
                  cy="0"
                  r="214"
                  fill="none"
                  stroke="#38BDF8"
                  strokeOpacity="0.32"
                  strokeWidth="1.2"
                  strokeDasharray="6 10"
                  style={{ transformOrigin: '0px 0px' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
                />

                {/* Tilted Satellite Orbit 1 */}
                <g transform="rotate(-16)">
                  <ellipse
                    rx="246"
                    ry="66"
                    fill="none"
                    stroke="#22D3EE"
                    strokeOpacity="0.34"
                    strokeWidth="1.15"
                    strokeDasharray="5 7"
                  />
                  <motion.g
                    style={{ transformOrigin: '0px 0px' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  >
                    <circle cx="206" cy="0" r="3.5" fill="#22D3EE" />
                    <circle cx="206" cy="0" r="8" fill="#22D3EE" fillOpacity="0.22" />
                  </motion.g>
                </g>

                {/* Tilted Satellite Orbit 2 */}
                <g transform="rotate(20)">
                  <motion.ellipse
                    rx="236"
                    ry="54"
                    fill="none"
                    stroke="#7DD3FC"
                    strokeOpacity="0.24"
                    strokeWidth="1"
                    strokeDasharray="3 9"
                    animate={{ strokeDashoffset: [0, -72] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  />
                </g>

                {/* Core Sphere Boundary + Latitude Rings */}
                <g stroke="#7DD3FC" fill="none" opacity="0.72">
                  <circle r="184" strokeWidth="1.4" strokeOpacity="0.7" />
                  <ellipse rx="184" ry="128" strokeWidth="0.95" strokeOpacity="0.45" />
                  <ellipse rx="184" ry="64" strokeWidth="1.1" strokeOpacity="0.6" />
                  <line x1="-184" y1="0" x2="184" y2="0" strokeWidth="0.9" strokeOpacity="0.4" />
                  <line x1="0" y1="-184" x2="0" y2="184" strokeWidth="0.9" strokeOpacity="0.35" />

                  {/* Animated Spinning Longitude Meridians (3D Sphere Rotation Effect) */}
                  <motion.ellipse
                    cx="0"
                    cy="0"
                    rx="140"
                    ry="184"
                    strokeWidth="1"
                    strokeOpacity="0.55"
                    style={{ transformOrigin: '0px 0px' }}
                    animate={{ scaleX: [1, 0.18, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.ellipse
                    cx="0"
                    cy="0"
                    rx="74"
                    ry="184"
                    strokeWidth="1.1"
                    strokeOpacity="0.65"
                    style={{ transformOrigin: '0px 0px' }}
                    animate={{ scaleX: [0.35, 1.35, 0.35] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.ellipse
                    cx="0"
                    cy="0"
                    rx="184"
                    ry="184"
                    strokeWidth="0.9"
                    strokeDasharray="4 6"
                    strokeOpacity="0.45"
                    style={{ transformOrigin: '0px 0px' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  />
                </g>

                {/* Network Connection Arcs across the Globe */}
                <g fill="none" stroke="#22D3EE" strokeWidth="1.1" strokeOpacity="0.5">
                  <motion.path
                    d="M -112 -68 Q -12 -128 86 -94"
                    strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [0, -32] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.path
                    d="M -42 38 Q 42 -15 122 28"
                    strokeDasharray="4 4"
                    animate={{ strokeDashoffset: [0, 32] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.path
                    d="M -112 -68 Q -85 5 -42 38"
                    strokeDasharray="3 5"
                    animate={{ strokeDashoffset: [0, -24] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
                  />
                </g>

                {/* Pulsing Network Nodes on the Sphere */}
                {[
                  { cx: -112, cy: -68, delay: 0 },
                  { cx: 86, cy: -94, delay: 0.7 },
                  { cx: -42, cy: 38, delay: 1.4 },
                  { cx: 122, cy: 28, delay: 2.1 },
                  { cx: 18, cy: -34, delay: 1.0 },
                ].map((node, idx) => (
                  <g key={idx} transform={`translate(${node.cx}, ${node.cy})`}>
                    <motion.circle
                      cx="0"
                      cy="0"
                      r="9"
                      fill="none"
                      stroke="#22D3EE"
                      strokeWidth="1.2"
                      style={{ transformOrigin: '0px 0px' }}
                      animate={{ scale: [0.6, 1.9, 0.6], opacity: [0.85, 0, 0.85] }}
                      transition={{
                        duration: 3.2,
                        delay: node.delay,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                    <circle cx="0" cy="0" r="3.4" fill="#E0F2FE" />
                  </g>
                ))}
              </g>

              {/* Subtle Circuit Lines + Animated Signal Pulse */}
              <path
                d="M0 440 H360 L410 390 H590 M980 120 H1160 L1210 170 H1440"
                stroke="#38BDF8"
                strokeOpacity="0.28"
                strokeWidth="1.2"
                fill="none"
              />
              <motion.path
                d="M0 440 H360 L410 390 H590 M980 120 H1160 L1210 170 H1440"
                stroke="#22D3EE"
                strokeOpacity="0.7"
                strokeWidth="1.8"
                strokeDasharray="18 140"
                fill="none"
                animate={{ strokeDashoffset: [0, -158] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />
              </svg>
            </motion.div>

            <div className="relative z-10 max-w-[1340px] mx-auto px-6 lg:px-10 pt-10 pb-20 md:pt-14 md:pb-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left Hero Typography & Actions */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3 text-[#22D3EE] text-lg sm:text-xl font-medium">
                    <span>{hero.greeting}</span>
                    <button
                      type="button"
                      onClick={() => scrollToSection('about')}
                      aria-label={lang === 'vi' ? 'Cuộn xuống phần giới thiệu' : 'Scroll to about section'}
                      title={lang === 'vi' ? 'Cuộn xuống phần giới thiệu' : 'Scroll to about section'}
                      className="group inline-flex items-center py-1 px-1.5 -mx-1.5 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]"
                    >
                      <span className="w-10 h-[1.5px] bg-[#22D3EE]/80 transition-all duration-300 group-hover:w-12 group-hover:bg-[#22D3EE]" />
                      <ArrowRight className="w-4 h-4 -ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08]">
                      {hero.introPrefix}
                    </h1>
                    <div className="font-display text-2xl sm:text-4xl font-extrabold tracking-wide text-[#22D3EE]">
                      {hero.roleTitle}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-medium text-blue-100/95">
                    {hero.pillars.map((pillar, idx) => (
                      <span key={pillar} className="inline-flex items-center gap-3">
                        <span>{pillar}</span>
                        {idx < hero.pillars.length - 1 && (
                          <span className="text-blue-300/60" aria-hidden="true">
                            |
                          </span>
                        )}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm sm:text-[15px] italic text-blue-100/90 leading-relaxed max-w-[56ch]">
                    {hero.lead}
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsPdfOpen(true)}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium text-white bg-[#1D63DC] hover:bg-[#2563EB] rounded-full shadow-lg shadow-blue-950/40 transition-colors min-h-[44px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Download className="w-4 h-4" />
                      <span>{hero.downloadCv}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setContactSubject('');
                        setIsContactOpen(true);
                      }}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium text-white bg-white/12 hover:bg-white/22 border border-white/35 rounded-full transition-colors min-h-[44px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{hero.contactMe}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Hero Portrait + Technology Quote */}
                <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6">
                  <div className="group relative w-[215px] sm:w-[235px] rounded-2xl overflow-hidden border border-white/25 hover:border-[#38BDF8]/75 bg-white/12 p-1.5 shadow-2xl hover:shadow-[0_14px_34px_rgba(34,211,238,0.25)] shrink-0 transition-[border-color,box-shadow] duration-500">
                    <div className="relative overflow-hidden rounded-xl">
                      <ResilientImage
                        src={profile.portraitImage}
                        alt={`${profile.fullName} — IT Supervisor`}
                        fallbackTitle={profile.fullName}
                        imgClassName="object-top"
                        className="w-full aspect-[7/10] rounded-xl"
                        priority
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-[68%] -translate-x-[170%] skew-x-[-22deg] bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-0 ease-out group-hover:translate-x-[280%] group-hover:duration-700"
                      />
                    </div>
                  </div>

                  <div className="text-center sm:text-left space-y-2 max-w-[240px]">
                    <blockquote className="font-serif italic font-medium text-[19px] sm:text-[22px] tracking-[-0.01em] text-white leading-[1.35]">
                      <span className="text-[#22D3EE] mr-1 not-italic font-semibold">“</span>
                      <span>{hero.quoteTop}</span>
                      <span className="block text-blue-50/95">
                        {hero.quoteBottom}
                        <span className="text-[#22D3EE] ml-1 not-italic font-semibold">”</span>
                      </span>
                    </blockquote>
                    <div className="h-[2.5px] w-28 mx-auto sm:mx-0 bg-gradient-to-r from-[#22D3EE] via-[#38BDF8]/70 to-transparent rounded-full" />
                  </div>
                </div>
              </div>

              {/* Quick Scroll-Down Indicator into Content */}
              <div className="mt-6 flex justify-center lg:justify-start">
                <motion.a
                  href="#about"
                  onClick={(e) => scrollToSection('about', e)}
                  whileHover={{ y: 2 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label={lang === 'vi' ? 'Cuộn xuống nội dung chính' : 'Scroll to main content'}
                  className="group inline-flex items-center gap-2 text-xs font-medium text-blue-200/90 hover:text-white transition-colors py-1.5 px-3.5 rounded-full bg-white/5 hover:bg-white/12 border border-white/15 hover:border-[#22D3EE]/50"
                >
                  <span>{lang === 'vi' ? 'Khám phá hồ sơ' : 'Explore profile'}</span>
                  <motion.span
                    animate={{ y: [0, 3.5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex"
                  >
                    <ChevronDown className="w-3.5 h-3.5 text-[#22D3EE] transition-transform duration-200 group-hover:translate-y-0.5" />
                  </motion.span>
                </motion.a>
              </div>
            </div>
          </section>

          {/* FLOATING 6-COLUMN HIGHLIGHT STRIP */}
          <motion.section
            aria-label="Điểm nhấn chuyên môn"
            style={{ y: highlightStripY }}
            className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10 -mt-10 relative z-20 will-change-transform transform-gpu"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-[#131C31] rounded-2xl overflow-hidden shadow-lg shadow-slate-900/5 dark:shadow-black/35 border border-zinc-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 lg:divide-x divide-zinc-200/80 dark:divide-slate-800 transition-colors duration-300"
            >
              {highlights.map((item, idx) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => handleHighlightClick(item.id)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.045,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group cursor-pointer text-left px-4 py-4 flex items-center gap-3 justify-start lg:justify-center transition-colors duration-300 hover:bg-blue-50/75 dark:hover:bg-slate-800/75 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  <span className="inline-flex shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3">
                    <HighlightIcon type={item.iconType} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-zinc-950 dark:text-slate-100 leading-tight truncate transition-colors group-hover:text-[#0B469B] dark:group-hover:text-sky-300">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-zinc-600 dark:text-slate-400 leading-snug truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.section>

          {/* MAIN CONTENT CONTAINER */}
          <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-10">
            {/* ROW 1: Modern 12-Col Bento Dashboard (Left 7-Col Stack: [About + Core Skills] + [Work Experience] | Right 5-Col: Featured Projects) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT 7-COLUMN BENTO STACK */}
              <div className="lg:col-span-7 space-y-8">
                {/* Top Tier: Về tôi (3/7) + Năng lực chuyên môn (4/7) */}
                <div className="grid grid-cols-1 md:grid-cols-7 gap-8 items-start">
                  {/* Column 1: Về tôi | About Me */}
                  <motion.section
                    id="about"
                    initial={{ opacity: 0, y: isDesktop ? 32 : 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={highlightedSection === 'about' ? { scale: [1, 1.012, 1] } : { scale: 1 }}
                    viewport={sectionViewport}
                    transition={{ duration: isDesktop ? 0.6 : 0.52, ease: [0.22, 1, 0.36, 1] }}
                    className={`group/sec md:col-span-3 space-y-4 rounded-2xl p-3 -m-3 transition-[background-color,box-shadow] duration-300 ${
                      highlightedSection === 'about'
                        ? 'ring-2 ring-[#2563EB]/60 dark:ring-sky-400/60 bg-blue-50/85 dark:bg-sky-950/35 shadow-md shadow-blue-900/10 dark:shadow-black/30'
                        : 'hover:bg-white/80 dark:hover:bg-slate-900/55 hover:shadow-md hover:shadow-slate-900/5 dark:hover:shadow-black/25 hover:ring-1 hover:ring-blue-200/80 dark:hover:ring-sky-500/25'
                    }`}
                  >
                    <div>
                      <h2 className="flex items-baseline gap-2 text-lg font-bold text-zinc-950 dark:text-slate-100">
                        <span
                          className="inline-block w-1 h-4 bg-[#1D4ED8] dark:bg-sky-400 rounded-full self-center transition-[height,background-color] duration-300 group-hover/sec:h-5 group-hover/sec:bg-[#2563EB] dark:group-hover/sec:bg-sky-300"
                          aria-hidden="true"
                        />
                        <span>{about.headingVi}</span>
                        <span className="text-zinc-300 dark:text-slate-600 font-normal">|</span>
                        <span className="text-sm font-semibold text-[#1D4ED8] dark:text-sky-400">{about.headingEn}</span>
                      </h2>
                      <SectionArrivalBar active={highlightedSection === 'about'} />
                    </div>

                    <p className="text-[13.5px] text-zinc-700 dark:text-slate-300 leading-relaxed">{about.summary}</p>

                    <ul className="space-y-2 pt-1">
                      {about.values.map((val, idx) => (
                        <motion.li
                          key={val}
                          initial={{ opacity: 0, x: isDesktop ? -16 : -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          whileHover={{ x: 4, transition: { duration: 0.18, delay: 0 } }}
                          viewport={cardViewport}
                          transition={{
                            duration: isDesktop ? 0.44 : 0.38,
                            delay: (isDesktop ? 0.08 : 0.05) + idx * (isDesktop ? 0.065 : 0.05),
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex items-center gap-2.5 text-[13px] font-medium text-zinc-800 dark:text-slate-200 transition-colors duration-200 hover:text-[#0B469B] dark:hover:text-sky-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] dark:text-sky-400 shrink-0" />
                          <span>{val}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setIsCvOpen(true)}
                        className="group cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#1D4ED8] dark:text-sky-300 bg-white dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-slate-800 border border-[#1D4ED8]/40 dark:border-sky-400/35 rounded-full transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-sm min-h-[38px]"
                      >
                        <span>{about.moreBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.section>

                  {/* Column 2: Năng lực chuyên môn | Core Skills */}
                  <motion.section
                    id="skills"
                    initial={{ opacity: 0, y: isDesktop ? 32 : 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={highlightedSection === 'skills' ? { scale: [1, 1.012, 1] } : { scale: 1 }}
                    viewport={sectionViewport}
                    transition={{
                      duration: isDesktop ? 0.6 : 0.52,
                      delay: isDesktop ? 0.08 : 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group/sec md:col-span-4 space-y-4 rounded-2xl p-3 -m-3 transition-[background-color,box-shadow] duration-300 ${
                      highlightedSection === 'skills'
                        ? 'ring-2 ring-[#2563EB]/60 dark:ring-sky-400/60 bg-blue-50/85 dark:bg-sky-950/35 shadow-md shadow-blue-900/10 dark:shadow-black/30'
                        : 'hover:bg-white/80 dark:hover:bg-slate-900/55 hover:shadow-md hover:shadow-slate-900/5 dark:hover:shadow-black/25 hover:ring-1 hover:ring-blue-200/80 dark:hover:ring-sky-500/25'
                    }`}
                  >
                    <div>
                      <h2 className="flex items-baseline gap-2 text-lg font-bold text-zinc-950 dark:text-slate-100">
                        <span
                          className="inline-block w-1 h-4 bg-[#1D4ED8] dark:bg-sky-400 rounded-full self-center transition-[height,background-color] duration-300 group-hover/sec:h-5 group-hover/sec:bg-[#2563EB] dark:group-hover/sec:bg-sky-300"
                          aria-hidden="true"
                        />
                        <span>{skillsSection.headingVi}</span>
                        <span className="text-zinc-300 dark:text-slate-600 font-normal">|</span>
                        <span className="text-sm font-semibold text-[#1D4ED8] dark:text-sky-400">
                          {skillsSection.headingEn}
                        </span>
                      </h2>
                      <SectionArrivalBar active={highlightedSection === 'skills'} />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: isDesktop ? 16 : 0, scale: isDesktop ? 0.975 : 1 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={cardViewport}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-white dark:bg-[#131C31] rounded-2xl border border-zinc-200/90 dark:border-slate-800 p-3.5 shadow-xs transition-colors duration-300"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {competencies.map((comp, idx) => {
                          const skillTheme = SKILL_THEME_CLASSES[comp.theme];
                          return (
                            <motion.button
                              key={comp.id}
                              type="button"
                              onClick={() => setSelectedSkillId(comp.id)}
                              initial={{ opacity: 0, y: isDesktop ? 22 : 16, scale: isDesktop ? 0.94 : 0.96 }}
                              whileInView={{ opacity: 1, y: 0, scale: 1 }}
                              whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2, delay: 0, ease: [0.16, 1, 0.3, 1] } }}
                              whileTap={{ scale: 0.97, transition: { duration: 0.12, delay: 0 } }}
                              viewport={cardViewport}
                              transition={{
                                duration: isDesktop ? 0.48 : 0.4,
                                delay: idx * (isDesktop ? 0.065 : 0.045),
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className={`group cursor-pointer relative overflow-hidden text-center rounded-xl border p-3.5 flex flex-col items-center justify-center gap-2 transition-[background-color,border-color,box-shadow] duration-200 hover:shadow-md hover:shadow-blue-950/10 dark:hover:shadow-black/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${skillTheme.card}`}
                            >
                              <span
                                className={`inline-flex items-center justify-center w-9 h-9 rounded-full shadow-xs transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:ring-4 group-hover:ring-white/80 dark:group-hover:ring-slate-900/60 ${skillTheme.iconBg}`}
                              >
                                {renderSkillTileIcon(comp.iconKey)}
                              </span>
                              <div className="space-y-0.5">
                                <div className="text-xs font-bold text-zinc-900 dark:text-slate-100 leading-snug">
                                  {comp.title}
                                </div>
                                <div className="text-[10.5px] text-zinc-600 dark:text-slate-400 leading-tight">
                                  {comp.shortSubtitle}
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-slate-400 text-center pt-2.5">
                        {skillsSection.clickHint}
                      </p>
                    </motion.div>
                  </motion.section>
                </div>

                {/* Bottom Tier of Left Bento Stack: Kinh nghiệm làm việc | Work Experience */}
                <motion.section
                  id="experience"
                  initial={{ opacity: 0, y: isDesktop ? 34 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  animate={highlightedSection === 'experience' ? { scale: [1, 1.012, 1] } : { scale: 1 }}
                  viewport={sectionViewport}
                  transition={{ duration: isDesktop ? 0.62 : 0.52, ease: [0.22, 1, 0.36, 1] }}
                  className={`group/sec space-y-4 rounded-2xl p-3 -m-3 transition-[background-color,box-shadow] duration-300 ${
                    highlightedSection === 'experience'
                      ? 'ring-2 ring-[#2563EB]/60 dark:ring-sky-400/60 bg-blue-50/85 dark:bg-sky-950/35 shadow-md shadow-blue-900/10 dark:shadow-black/30'
                      : 'hover:bg-white/80 dark:hover:bg-slate-900/55 hover:shadow-md hover:shadow-slate-900/5 dark:hover:shadow-black/25 hover:ring-1 hover:ring-blue-200/80 dark:hover:ring-sky-500/25'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="flex items-baseline gap-2 text-lg font-bold text-zinc-950 dark:text-slate-100">
                        <span
                          className="inline-block w-1 h-4 bg-[#1D4ED8] dark:bg-sky-400 rounded-full self-center transition-[height,background-color] duration-300 group-hover/sec:h-5 group-hover/sec:bg-[#2563EB] dark:group-hover/sec:bg-sky-300"
                          aria-hidden="true"
                        />
                        <span>{experienceSection.headingVi}</span>
                        <span className="text-zinc-300 dark:text-slate-600 font-normal">|</span>
                        <span className="text-sm font-semibold text-[#1D4ED8] dark:text-sky-400">
                          {experienceSection.headingEn}
                        </span>
                      </h2>
                      <SectionArrivalBar active={highlightedSection === 'experience'} />
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCvOpen(true)}
                      className="group cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#1D4ED8] dark:text-sky-300 bg-white dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-slate-800 border border-[#1D4ED8]/40 dark:border-sky-400/35 rounded-full transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-sm whitespace-nowrap shrink-0"
                    >
                      <span>{experienceSection.viewDetails}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: isDesktop ? 16 : 0, scale: isDesktop ? 0.975 : 1 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={cardViewport}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white dark:bg-[#131C31] rounded-2xl border border-zinc-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-xs transition-colors duration-300"
                  >
                    <div className="space-y-4">
                      {experiences.map((exp, expIdx) => {
                        const isLast = expIdx === experiences.length - 1;
                        return (
                          <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: isDesktop ? 20 : 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={cardViewport}
                            transition={{
                              duration: isDesktop ? 0.5 : 0.36,
                              delay: isDesktop ? expIdx * 0.1 : 0,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`relative flex flex-col sm:flex-row gap-2.5 sm:gap-5 ${
                              !isLast ? 'pb-4 border-b border-zinc-100 dark:border-slate-800/80' : ''
                            }`}
                          >
                            {/* Timeline Period Column */}
                            <div className="sm:w-[116px] shrink-0 pt-0.5 flex sm:flex-col items-baseline sm:items-start gap-2 sm:gap-1">
                              <div className="inline-flex items-center gap-2">
                                <span
                                  className={`w-2.5 h-2.5 rounded-full border-2 inline-block shrink-0 transition-transform duration-300 group-hover/sec:scale-125 ${
                                    isLast
                                      ? 'border-[#1D4ED8] bg-[#1D4ED8] dark:border-sky-400 dark:bg-sky-400 shadow-[0_0_0_3px_rgba(37,99,235,0.14)] dark:shadow-[0_0_0_3px_rgba(56,189,248,0.18)]'
                                      : 'border-[#1D4ED8] dark:border-sky-400 bg-white dark:bg-[#131C31]'
                                  }`}
                                />
                                <span className="text-xs font-bold text-[#1D4ED8] dark:text-sky-400 font-mono tabular-nums whitespace-nowrap">
                                  {exp.period}
                                </span>
                              </div>
                              <div className="text-[11px] font-medium text-zinc-500 dark:text-slate-400 sm:pl-4.5">
                                {exp.duration}
                              </div>
                            </div>

                            {/* Organization & Responsibilities */}
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <h3 className="text-[13.5px] sm:text-sm font-bold text-zinc-950 dark:text-slate-100 leading-snug">
                                {exp.organization}
                              </h3>
                              <ul className="space-y-1">
                                {exp.highlights.map((item, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    whileHover={{ x: 4, transition: { duration: 0.18, delay: 0 } }}
                                    viewport={cardViewport}
                                    transition={{
                                      duration: 0.38,
                                      delay: 0.05 + idx * (isDesktop ? 0.06 : 0.035),
                                      ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="text-xs text-zinc-700 dark:text-slate-300 leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-[#1D4ED8] dark:before:text-sky-400 transition-colors duration-200 hover:text-zinc-950 dark:hover:text-white"
                                  >
                                    {item}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </motion.section>
              </div>

              {/* RIGHT 5-COLUMN BENTO: Dự án tiêu biểu | Featured Projects */}
              <motion.section
                id="projects"
                initial={{ opacity: 0, y: isDesktop ? 32 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={highlightedSection === 'projects' ? { scale: [1, 1.012, 1] } : { scale: 1 }}
                viewport={sectionViewport}
                transition={{
                  duration: isDesktop ? 0.6 : 0.52,
                  delay: isDesktop ? 0.12 : 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group/sec lg:col-span-5 space-y-4 rounded-2xl p-3 -m-3 transition-[background-color,box-shadow] duration-300 ${
                  highlightedSection === 'projects'
                    ? 'ring-2 ring-[#2563EB]/60 dark:ring-sky-400/60 bg-blue-50/85 dark:bg-sky-950/35 shadow-md shadow-blue-900/10 dark:shadow-black/30'
                    : 'hover:bg-white/80 dark:hover:bg-slate-900/55 hover:shadow-md hover:shadow-slate-900/5 dark:hover:shadow-black/25 hover:ring-1 hover:ring-blue-200/80 dark:hover:ring-sky-500/25'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="flex items-baseline gap-2 text-lg font-bold text-zinc-950 dark:text-slate-100">
                      <span
                        className="inline-block w-1 h-4 bg-[#1D4ED8] dark:bg-sky-400 rounded-full self-center transition-[height,background-color] duration-300 group-hover/sec:h-5 group-hover/sec:bg-[#2563EB] dark:group-hover/sec:bg-sky-300"
                        aria-hidden="true"
                      />
                      <span>{projectsSection.headingVi}</span>
                      <span className="text-zinc-300 dark:text-slate-600 font-normal">|</span>
                      <span className="text-sm font-semibold text-[#1D4ED8] dark:text-sky-400">
                        {projectsSection.headingEn}
                      </span>
                    </h2>

                    <button
                      type="button"
                      onClick={() => setSelectedProjectId(projects[0].id)}
                      className="group cursor-pointer inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] dark:text-sky-400 hover:underline whitespace-nowrap shrink-0"
                    >
                      <span>{projectsSection.viewAll}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                  <SectionArrivalBar active={highlightedSection === 'projects'} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {projects.map((proj, idx) => {
                    const isWideCard =
                      projects.length % 2 === 1 && proj === projects[projects.length - 1];
                    return (
                      <motion.article
                        key={proj.id}
                        initial={{ opacity: 0, y: isDesktop ? 28 : 20, scale: isDesktop ? 0.96 : 1 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        whileHover={{ y: -4, transition: { duration: 0.2, delay: 0, ease: [0.16, 1, 0.3, 1] } }}
                        viewport={cardViewport}
                        transition={{
                          duration: isDesktop ? 0.56 : 0.44,
                          delay: isDesktop ? (idx % 2) * 0.09 : idx * 0.065,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`group/card bg-white dark:bg-[#131C31] rounded-2xl border border-zinc-200/90 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between transition-[border-color,box-shadow] duration-300 hover:border-[#1D4ED8]/45 dark:hover:border-sky-400/50 hover:shadow-xl hover:shadow-blue-950/10 dark:hover:shadow-black/45 ${
                          isWideCard ? 'sm:col-span-2' : ''
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedProjectId(proj.id)}
                          className={`cursor-pointer text-left flex flex-col flex-1 w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                            isWideCard ? 'sm:flex-row sm:items-stretch' : ''
                          }`}
                        >
                          <div
                            className={`relative w-full aspect-[16/9] overflow-hidden bg-zinc-900 shrink-0 [&>svg]:transition-transform [&>svg]:duration-500 group-hover/card:[&>svg]:scale-[1.04] ${
                              isWideCard ? 'sm:w-[46%] sm:aspect-[16/10]' : ''
                            }`}
                          >
                            <ProjectCardArtwork visualType={proj.visualType} />
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-y-0 left-0 w-[60%] -translate-x-[170%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-0 ease-out group-hover/card:translate-x-[290%] group-hover/card:duration-700"
                            />
                          </div>

                          <div className="p-3.5 flex-1 flex flex-col justify-between gap-3">
                            <div className="space-y-1">
                              <h3 className="text-[13px] font-bold text-zinc-950 dark:text-slate-100 leading-snug line-clamp-2 transition-colors group-hover/card:text-[#0B469B] dark:group-hover/card:text-sky-300">
                                {proj.shortTitle}
                              </h3>
                              <p className="text-[11px] text-zinc-500 dark:text-slate-400">{proj.subtitle}</p>
                            </div>

                            <span
                              className={`cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-[#1D4ED8] dark:text-sky-300 border border-[#1D4ED8]/40 dark:border-sky-400/35 rounded-full transition-[background-color,color,border-color] duration-200 group-hover/card:bg-[#1D4ED8] group-hover/card:text-white group-hover/card:border-[#1D4ED8] dark:group-hover/card:bg-sky-500 dark:group-hover/card:text-white dark:group-hover/card:border-sky-500 ${
                                isWideCard ? 'sm:w-auto sm:self-start sm:px-4 w-full' : 'w-full'
                              }`}
                            >
                              <span>{projectsSection.viewDetails}</span>
                              <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/card:translate-x-0.5" />
                            </span>
                          </div>
                        </button>
                      </motion.article>
                    );
                  })}
                </div>
              </motion.section>
            </div>

            {/* ROW 2: Balanced 7 | 5 Bottom Row (Education | Contact + Zalo QR) */}
            <div className="pt-8 border-t border-zinc-200/90 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Col 1 (7-col aligned): Trình độ học vấn | Education */}
              <motion.section
                id="education"
                initial={{ opacity: 0, y: isDesktop ? 32 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={highlightedSection === 'education' ? { scale: [1, 1.012, 1] } : { scale: 1 }}
                viewport={bottomViewport}
                transition={{
                  duration: isDesktop ? 0.58 : 0.52,
                  delay: 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group/sec lg:col-span-7 flex flex-col space-y-4 rounded-2xl p-3 -m-3 transition-[background-color,box-shadow] duration-300 ${
                  highlightedSection === 'education'
                    ? 'ring-2 ring-[#2563EB]/60 dark:ring-sky-400/60 bg-blue-50/85 dark:bg-sky-950/35 shadow-md shadow-blue-900/10 dark:shadow-black/30'
                    : 'hover:bg-white/80 dark:hover:bg-slate-900/55 hover:shadow-md hover:shadow-slate-900/5 dark:hover:shadow-black/25 hover:ring-1 hover:ring-blue-200/80 dark:hover:ring-sky-500/25'
                }`}
              >
                <div>
                  <h2 className="flex items-baseline gap-2 text-lg font-bold text-zinc-950 dark:text-slate-100">
                    <span
                      className="inline-block w-1 h-4 bg-[#1D4ED8] dark:bg-sky-400 rounded-full self-center transition-[height,background-color] duration-300 group-hover/sec:h-5 group-hover/sec:bg-[#2563EB] dark:group-hover/sec:bg-sky-300"
                      aria-hidden="true"
                    />
                    <span>{educationSection.headingVi}</span>
                    <span className="text-zinc-300 dark:text-slate-600 font-normal">|</span>
                    <span className="text-sm font-semibold text-[#1D4ED8] dark:text-sky-400">
                      {educationSection.headingEn}
                    </span>
                  </h2>
                  <SectionArrivalBar active={highlightedSection === 'education'} />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: isDesktop ? 16 : 0, scale: isDesktop ? 0.975 : 1 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={bottomViewport}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 bg-white dark:bg-[#131C31] rounded-2xl border border-zinc-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-col justify-between gap-4 transition-colors duration-300"
                >
                  <div className="group/edu flex items-start gap-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={bottomViewport}
                      transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="shrink-0"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/45 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center transition-[transform,border-color,box-shadow] duration-300 group-hover/edu:scale-105 group-hover/edu:-rotate-3 group-hover/edu:shadow-md group-hover/edu:border-amber-300 dark:group-hover/edu:border-amber-500/60">
                        <Award className="w-6 h-6 text-[#D97706] dark:text-amber-400" strokeWidth={1.8} />
                      </div>
                    </motion.div>
                    <div className="space-y-1 min-w-0">
                      <div className="text-sm sm:text-[15px] font-bold text-zinc-950 dark:text-slate-100 leading-snug">
                        {educationSection.degree}
                      </div>
                      <div className="text-xs font-semibold text-[#1D4ED8] dark:text-sky-400 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                        <span>{educationSection.school}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-zinc-100 dark:border-slate-800/80">
                    {educationSection.details.map((detail, idx) => {
                      const spanFullRow =
                        educationSection.details.length % 2 === 1 &&
                        idx === educationSection.details.length - 1;
                      return (
                        <motion.li
                          key={detail}
                          initial={{ opacity: 0, y: isDesktop ? 14 : 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={bottomViewport}
                          transition={{
                            duration: 0.38,
                            delay: 0.08 + idx * (isDesktop ? 0.07 : 0.05),
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`flex items-center gap-2 rounded-xl bg-slate-50/90 dark:bg-slate-800/45 border border-zinc-200/70 dark:border-slate-700/60 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-slate-300 leading-snug ${
                            spanFullRow ? 'sm:col-span-2' : ''
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-sky-400 shrink-0" />
                          <span>{detail}</span>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.div>
              </motion.section>

              {/* Col 2 (5-col aligned): Thông tin liên hệ | Contact + QR */}
              <motion.section
                id="contact"
                initial={{ opacity: 0, y: isDesktop ? 32 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={highlightedSection === 'contact' ? { scale: [1, 1.012, 1] } : { scale: 1 }}
                viewport={bottomViewport}
                transition={{
                  duration: isDesktop ? 0.58 : 0.52,
                  delay: isDesktop ? 0.12 : 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group/sec lg:col-span-5 flex flex-col space-y-4 rounded-2xl p-3 -m-3 transition-[background-color,box-shadow] duration-300 ${
                  highlightedSection === 'contact'
                    ? 'ring-2 ring-[#2563EB]/60 dark:ring-sky-400/60 bg-blue-50/85 dark:bg-sky-950/35 shadow-md shadow-blue-900/10 dark:shadow-black/30'
                    : 'hover:bg-white/80 dark:hover:bg-slate-900/55 hover:shadow-md hover:shadow-slate-900/5 dark:hover:shadow-black/25 hover:ring-1 hover:ring-blue-200/80 dark:hover:ring-sky-500/25'
                }`}
              >
                <div>
                  <h2 className="flex items-baseline gap-2 text-lg font-bold text-zinc-950 dark:text-slate-100">
                    <span
                      className="inline-block w-1 h-4 bg-[#1D4ED8] dark:bg-sky-400 rounded-full self-center transition-[height,background-color] duration-300 group-hover/sec:h-5 group-hover/sec:bg-[#2563EB] dark:group-hover/sec:bg-sky-300"
                      aria-hidden="true"
                    />
                    <span>{contactSection.headingVi}</span>
                    <span className="text-zinc-300 dark:text-slate-600 font-normal">|</span>
                    <span className="text-sm font-semibold text-[#1D4ED8] dark:text-sky-400">
                      {contactSection.headingEn}
                    </span>
                  </h2>
                  <SectionArrivalBar active={highlightedSection === 'contact'} />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: isDesktop ? 16 : 0, scale: isDesktop ? 0.975 : 1 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={bottomViewport}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 bg-white dark:bg-[#131C31] rounded-2xl border border-zinc-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4 transition-colors duration-300"
                >
                  <div className="space-y-2.5 text-xs text-zinc-700 dark:text-slate-300 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Phone className="w-4 h-4 text-[#1D4ED8] dark:text-sky-400 shrink-0" />
                      <span>
                        {contactSection.phoneLabel}{' '}
                        <a
                          href={`tel:${profile.phone}`}
                          className="font-semibold text-zinc-950 dark:text-slate-100 font-mono tabular-nums hover:text-[#1D4ED8] dark:hover:text-sky-400 transition-colors"
                        >
                          {profile.phoneDisplay}
                        </a>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(profile.phone, 'phone')}
                        aria-label={lang === 'vi' ? 'Sao chép số điện thoại' : 'Copy phone number'}
                        title={lang === 'vi' ? 'Sao chép số điện thoại' : 'Copy phone number'}
                        className="cursor-pointer inline-flex items-center gap-1 text-zinc-400 dark:text-slate-500 hover:text-[#1D4ED8] dark:hover:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-md px-1.5 py-1 transition-colors"
                      >
                        {copiedField === 'phone' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                              {contactSection.copied}
                            </span>
                          </>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Mail className="w-4 h-4 text-[#1D4ED8] dark:text-sky-400 shrink-0" />
                      <span className="truncate">
                        {contactSection.emailLabel}{' '}
                        <a
                          href={`mailto:${profile.email}`}
                          className="font-semibold text-zinc-950 dark:text-slate-100 hover:text-[#1D4ED8] dark:hover:text-sky-400 transition-colors"
                        >
                          {profile.email}
                        </a>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(profile.email, 'email')}
                        aria-label={lang === 'vi' ? 'Sao chép địa chỉ email' : 'Copy email address'}
                        title={lang === 'vi' ? 'Sao chép địa chỉ email' : 'Copy email address'}
                        className="cursor-pointer inline-flex items-center gap-1 text-zinc-400 dark:text-slate-500 hover:text-[#1D4ED8] dark:hover:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-md px-1.5 py-1 shrink-0 transition-colors"
                      >
                        {copiedField === 'email' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                              {contactSection.copied}
                            </span>
                          </>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <span className="sr-only" aria-live="polite">
                      {copiedField ? contactSection.copied : ''}
                    </span>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#1D4ED8] dark:text-sky-400 shrink-0" />
                      <span>
                        {contactSection.addressLabel}{' '}
                        <strong className="font-semibold text-zinc-950 dark:text-slate-100">
                          {contactSection.addressValue}
                        </strong>
                      </span>
                    </div>

                    <div className="pt-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setContactSubject('');
                          setIsContactOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0B469B] hover:bg-[#1D4ED8] dark:bg-sky-600 dark:hover:bg-sky-500 rounded-full transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <Send className="w-3 h-3" />
                        <span>{contactSection.sendMsgBtn}</span>
                      </button>
                    </div>
                  </div>

                  <motion.a
                    href={profile.zaloUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={lang === 'vi' ? 'Mở Zalo Hoàng Văn Thiện' : 'Open Zalo'}
                    title={profile.zaloUrl}
                    initial={{ opacity: 0, scale: 0.9, y: 14 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.2, delay: 0, ease: [0.16, 1, 0.3, 1] } }}
                    viewport={bottomViewport}
                    transition={{ duration: 0.44, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex flex-col items-center gap-1.5 shrink-0 cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
                  >
                    <QrCodeGraphic url={profile.zaloUrl} />
                    <span className="text-[10.5px] font-medium text-zinc-600 dark:text-slate-400 group-hover:text-[#0B469B] dark:group-hover:text-sky-300 text-center max-w-[96px] leading-tight transition-colors">
                      {contactSection.qrCaption}
                    </span>
                  </motion.a>
                </motion.div>
              </motion.section>
            </div>
          </div>
        </main>

        {/* DARK NAVY FOOTER */}
        <motion.footer
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#06183A] dark:bg-[#050A18] text-white border-t border-blue-950 dark:border-slate-800/90 transition-colors duration-300"
        >
          <div className="max-w-[1340px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3 shrink-0">
              <HTMonogram variant="dark" />
              <div className="leading-tight">
                <div className="font-display text-sm font-bold tracking-tight text-white">
                  {profile.brandName}
                </div>
                <div className="text-[11px] text-blue-200">IT Supervisor</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm italic text-blue-100/90 text-center">
              {footer.tagline}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <a
                  href={profile.zaloUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={lang === 'vi' ? 'Nhắn tin Zalo' : 'Message on Zalo'}
                  title={lang === 'vi' ? 'Nhắn tin Zalo' : 'Message on Zalo'}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#06183A] hover:bg-[#38BDF8] hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsPdfOpen(true)}
                  aria-label={lang === 'vi' ? 'Xem & Tải CV PDF' : 'View & Download PDF Resume'}
                  title={lang === 'vi' ? 'Xem & Tải CV PDF' : 'View & Download PDF Resume'}
                  className="cursor-pointer inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#06183A] hover:bg-[#38BDF8] hover:text-white transition-colors"
                >
                  <FileText className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsCvOpen(true)}
                  aria-label={lang === 'vi' ? 'Xem hồ sơ CV trực tuyến' : 'View online CV'}
                  title={lang === 'vi' ? 'Xem hồ sơ CV trực tuyến' : 'View online CV'}
                  className="cursor-pointer inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#06183A] hover:bg-[#38BDF8] hover:text-white transition-colors"
                >
                  <GraduationCap className="w-4 h-4" />
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label={lang === 'vi' ? 'Gửi Email trực tiếp' : 'Send Email'}
                  title={profile.email}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#06183A] hover:bg-[#38BDF8] hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <span className="text-[11px] text-blue-200/80 whitespace-nowrap">
                {footer.copyright}
              </span>
            </div>
          </div>
        </motion.footer>

        {/* Floating Quick Scroll-to-Top Button (lifts cleanly above footer when at page bottom) */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              onClick={() => scrollToSection('top', undefined, { gentle: true })}
              aria-label={lang === 'vi' ? 'Lên đầu trang' : 'Back to top'}
              title={lang === 'vi' ? 'Lên đầu trang' : 'Back to top'}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: nearFooter ? -68 : 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.9 }}
              whileHover={{ y: nearFooter ? -71 : -3, scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer fixed bottom-5 right-5 z-30 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#0B469B] hover:bg-[#1D4ED8] dark:bg-sky-600 dark:hover:bg-sky-500 text-white shadow-lg shadow-blue-950/25 dark:shadow-black/40 border border-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" strokeWidth={2.2} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Interactive Modals */}
        <ProjectModal
          project={selectedProject}
          projects={projects}
          lang={lang}
          copy={content.projectModal}
          onClose={() => setSelectedProjectId(null)}
          onSelectProject={(id) => setSelectedProjectId(id)}
          onContactProject={handleContactProject}
        />
        <SkillModal
          skill={selectedSkill}
          lang={lang}
          onClose={() => setSelectedSkillId(null)}
        />
        <CvModal
          isOpen={isCvOpen}
          content={content}
          onClose={() => setIsCvOpen(false)}
          onOpenPdf={() => setIsPdfOpen(true)}
        />
        <PdfViewerModal
          isOpen={isPdfOpen}
          pdfUrl={profile.cvPdfUrl}
          lang={lang}
          onClose={() => setIsPdfOpen(false)}
        />
        <ContactModal
          isOpen={isContactOpen}
          initialSubject={contactSubject}
          recipientEmail={profile.email}
          zaloUrl={profile.zaloUrl}
          copy={content.contactModal}
          onClose={() => setIsContactOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
