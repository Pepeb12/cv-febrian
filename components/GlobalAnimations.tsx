import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Theme } from '../theme';

interface GlobalAnimationsProps {
  theme: Theme;
}

/**
 * GlobalAnimations Component — Sistem Animasi & Micro-interactions Menyeluruh
 * - Smooth Scrolling & Theme Transition
 * - Cursor Spotlight Ambient Halus
 * - Scroll Reveal Fade-up & Stagger
 * - Hover Lift & Elevation (translateY -4px s.d. -6px, subtle scale, glow)
 * - Audio Equalizer & Pulse Animations
 * - Respects prefers-reduced-motion & touch friendly
 */
export default function GlobalAnimations({ theme }: GlobalAnimationsProps) {
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    // 1. INJECT GOOGLE FONTS (Lora, DM Sans, IBM Plex Mono)
    const fontLinkId = 'cv-google-fonts';
    if (!document.getElementById(fontLinkId)) {
      const link = document.createElement('link');
      link.id = fontLinkId;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=IBM+Plex+Mono:ital,wght@0,400;0,600;1,400&family=Lora:ital,wght@0,400..700;1,400..700&display=swap';
      document.head.appendChild(link);
    }

    // 2. INJECT GLOBAL CSS ANIMATIONS & MICRO-INTERACTIONS
    const styleId = 'cv-global-animations';
    let styleTag = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const primaryColor = theme.primary || '#843F4B';
    const primaryHover = theme.primaryHover || '#6E303E';
    const isDark = theme.isDark;

    styleTag.innerHTML = `
      /* DIRECT NAVIGATION & THEME TRANSITION */
      html {
        scroll-behavior: auto !important;
      }
      body {
        transition: background-color 350ms cubic-bezier(0.16, 1, 0.3, 1), color 300ms ease;
      }

      /* CURSOR SPOTLIGHT AMBIENT */
      #cursor-spotlight-layer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9999;
        background: radial-gradient(
          650px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px),
          ${isDark ? 'rgba(193, 123, 136, 0.065)' : 'rgba(132, 63, 75, 0.045)'},
          transparent 45%
        );
        transition: opacity 0.3s ease;
      }

      /* SCROLL REVEAL FADE-UP */
      .scroll-reveal,
      .fade-in-up {
        opacity: 0;
        transform: translateY(32px);
        transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
                    transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
      }
      .scroll-reveal.revealed,
      .fade-in-up.revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }

      /* 1. FADE IN DOWN UNTUK NAVBAR */
      .navbar-entrance {
        animation: navFadeInDown 850ms cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes navFadeInDown {
        from {
          opacity: 0;
          transform: translateY(-28px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* 2. SCALE FADE UNTUK FOTO PROFIL DAN GAMBAR */
      .scale-fade {
        opacity: 0;
        transform: scale(0.92);
        transition: opacity 850ms cubic-bezier(0.16, 1, 0.3, 1),
                    transform 850ms cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
      }
      .scale-fade.revealed {
        opacity: 1 !important;
        transform: scale(1) !important;
      }

      /* 3. SLIDE UP UNTUK INFORMASI & DESKRIPSI */
      .slide-up {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 750ms cubic-bezier(0.16, 1, 0.3, 1),
                    transform 750ms cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
      }
      .slide-up.revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }

      /* 4. FADE IN LEFT & FADE IN RIGHT UNTUK VARIASI ELEMEN */
      .fade-in-left {
        opacity: 0;
        transform: translateX(-35px);
        transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
                    transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
      }
      .fade-in-left.revealed {
        opacity: 1 !important;
        transform: translateX(0) !important;
      }

      .fade-in-right {
        opacity: 0;
        transform: translateX(35px);
        transition: opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
                    transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
      }
      .fade-in-right.revealed {
        opacity: 1 !important;
        transform: translateX(0) !important;
      }

      /* 5. STAGGER DELAYS UNTUK CARD DAN ELEMEN BERKELOMPOK (100–150ms jeda) */
      .stagger-1 { transition-delay: 100ms !important; }
      .stagger-2 { transition-delay: 220ms !important; }
      .stagger-3 { transition-delay: 340ms !important; }
      .stagger-4 { transition-delay: 460ms !important; }
      .stagger-5 { transition-delay: 580ms !important; }
      .stagger-6 { transition-delay: 700ms !important; }

      .stagger-group > :nth-child(1) { transition-delay: 80ms !important; }
      .stagger-group > :nth-child(2) { transition-delay: 200ms !important; }
      .stagger-group > :nth-child(3) { transition-delay: 320ms !important; }
      .stagger-group > :nth-child(4) { transition-delay: 440ms !important; }
      .stagger-group > :nth-child(5) { transition-delay: 560ms !important; }
      .stagger-group > :nth-child(6) { transition-delay: 680ms !important; }

      /* ========================================================
         6. SINGLE IMAGE AUTO SLIDER — MINIMALIST BURGUNDY CLASSIC
         ======================================================== */
      .single-slider-viewport {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 14px;
      }
      .single-slider-track {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        will-change: transform;
      }
      .single-slider-slide {
        flex: 0 0 100%;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        cursor: pointer;
      }
      .slider-nav-btn {
        cursor: pointer;
        transition: transform 220ms ease, background-color 220ms ease, box-shadow 220ms ease;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }
      @media (hover: hover) and (pointer: fine) {
        .slider-nav-btn:hover {
          transform: scale(1.12);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45);
        }
      }
      .slider-nav-btn:active {
        transform: scale(0.92);
      }
      .slider-dot-btn {
        cursor: pointer;
        transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
      }

      /* LIGHTBOX MODAL DI TENGAH LAYAR */
      .lightbox-modal-content {
        animation: lightboxCenterIn 300ms cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      @keyframes lightboxCenterIn {
        from {
          opacity: 0;
          transform: scale(0.92) translateY(16px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .single-slider-track {
          transition: none !important;
        }
        .lightbox-modal-content {
          animation: none !important;
        }
      }

      /* CARD HOVER LIFT & ELEVATION */
      .interactive-card {
        transition: transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1),
                    box-shadow 300ms cubic-bezier(0.2, 0.8, 0.2, 1),
                    border-color 250ms ease !important;
        will-change: transform, box-shadow;
      }
      @media (hover: hover) and (pointer: fine) {
        .interactive-card:hover {
          transform: translateY(-5px) scale(1.01) !important;
          box-shadow: 0 16px 36px ${isDark ? 'rgba(0, 0, 0, 0.55)' : 'rgba(132, 63, 75, 0.18)'},
                      0 0 16px ${isDark ? 'rgba(193, 123, 136, 0.2)' : 'rgba(132, 63, 75, 0.12)'} !important;
          border-color: ${primaryColor} !important;
        }
      }
      .interactive-card:active {
        transform: scale(0.985) !important;
      }

      /* BUTTON & BADGE HOVER MICRO-INTERACTIONS */
      .interactive-btn {
        transition: transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1),
                    box-shadow 250ms ease,
                    background-color 200ms ease,
                    border-color 200ms ease !important;
        cursor: pointer;
      }
      @media (hover: hover) and (pointer: fine) {
        .interactive-btn:hover {
          transform: translateY(-2.5px) scale(1.025) !important;
          box-shadow: 0 8px 20px ${isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(132, 63, 75, 0.25)'} !important;
        }
      }
      .interactive-btn:active {
        transform: scale(0.96) !important;
      }

      /* NAV TAB ITEMS SMOOTH MICRO-INTERACTIONS */
      .nav-tab-item {
        transition: background-color 220ms ease,
                    border-color 220ms ease,
                    transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
                    color 200ms ease,
                    box-shadow 220ms ease !important;
        cursor: pointer;
        outline: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      @media (hover: hover) and (pointer: fine) {
        .nav-tab-item:hover {
          transform: translateY(-1.5px) !important;
          opacity: 1 !important;
        }
      }
      .nav-tab-item:active {
        transform: scale(0.95) !important;
      }

      /* SOCIAL ICON HOVER ROTATE & ELEVATION */
      .social-icon-btn {
        transition: transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1),
                    border-color 250ms ease,
                    background-color 250ms ease !important;
      }
      @media (hover: hover) and (pointer: fine) {
        .social-icon-btn:hover {
          transform: translateY(-3px) scale(1.08) rotate(4deg) !important;
          border-color: ${primaryColor} !important;
        }
      }
      .social-icon-btn:active {
        transform: scale(0.92) !important;
      }

      /* AVATAR GLOW & SUBTLE ZOOM */
      .avatar-glow {
        animation: avatarPulse 4s infinite alternate ease-in-out;
      }
      @keyframes avatarPulse {
        0% {
          box-shadow: 0 0 12px ${isDark ? 'rgba(193, 123, 136, 0.2)' : 'rgba(132, 63, 75, 0.15)'};
        }
        100% {
          box-shadow: 0 0 28px ${isDark ? 'rgba(193, 123, 136, 0.45)' : 'rgba(132, 63, 75, 0.3)'};
        }
      }

      /* INPUT FOCUS GLOW */
      input:focus, textarea:focus {
        outline: none !important;
        box-shadow: 0 0 0 3px ${isDark ? 'rgba(193, 123, 136, 0.3)' : 'rgba(132, 63, 75, 0.25)'} !important;
        border-color: ${primaryColor} !important;
        transition: box-shadow 250ms ease, border-color 250ms ease !important;
      }

      /* AUDIO EQUALIZER JUMPING BARS */
      .eq-bar-1 { animation: eqBar1 1.2s infinite ease-in-out; }
      .eq-bar-2 { animation: eqBar2 0.9s infinite ease-in-out; }
      .eq-bar-3 { animation: eqBar3 1.4s infinite ease-in-out; }
      .eq-bar-4 { animation: eqBar4 1.1s infinite ease-in-out; }

      @keyframes eqBar1 { 0%, 100% { height: 4px; } 50% { height: 16px; } }
      @keyframes eqBar2 { 0%, 100% { height: 16px; } 50% { height: 5px; } }
      @keyframes eqBar3 { 0%, 100% { height: 7px; } 50% { height: 20px; } }
      @keyframes eqBar4 { 0%, 100% { height: 14px; } 50% { height: 6px; } }

      /* PULSE GLOW INDICATOR */
      .pulse-indicator {
        animation: pulseGlow 1.8s infinite ease-in-out;
      }
      @keyframes pulseGlow {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.25); opacity: 0.6; }
      }

      /* HOBBY BOUNCE ON HOVER */
      .hobby-icon-bounce:hover {
        animation: bounceIcon 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
      }
      @keyframes bounceIcon {
        0%, 100% { transform: translateY(0); }
        40% { transform: translateY(-7px); }
        70% { transform: translateY(-2px); }
      }

      /* FOOTER LINK UNDERLINE EXPAND */
      .footer-hover-link {
        position: relative;
        display: inline-block;
        transition: color 200ms ease;
      }
      .footer-hover-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1.5px;
        background-color: ${primaryColor};
        transition: width 250ms cubic-bezier(0.16, 1, 0.3, 1);
      }
      .footer-hover-link:hover::after {
        width: 100%;
      }

      /* PREFERS-REDUCED-MOTION SUPPORT */
      @media (prefers-reduced-motion: reduce) {
        *, ::before, ::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `;

    // 3. ATTACH CURSOR SPOTLIGHT DOM ELEMENT
    let spotlight = document.getElementById('cursor-spotlight-layer');
    if (!spotlight) {
      spotlight = document.createElement('div');
      spotlight.id = 'cursor-spotlight-layer';
      document.body.appendChild(spotlight);
    }

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 4. INTERSECTION OBSERVER FOR SCROLL REVEAL & STAGGER ENTRANCE
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Also reveal nested animation elements smoothly
            const children = entry.target.querySelectorAll(
              '.scroll-reveal, .fade-in-up, .scale-fade, .slide-up, .fade-in-left, .fade-in-right'
            );
            children.forEach((c) => c.classList.add('revealed'));
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    // Observe all sections and animation targets
    const attachObserver = () => {
      const elements = document.querySelectorAll(
        '[id^="section-"], .scroll-reveal, .fade-in-up, .scale-fade, .slide-up, .fade-in-left, .fade-in-right, [data-scroll-reveal="true"]'
      );
      elements.forEach((el) => {
        observer.observe(el);
      });

      // Immediate entrance reveal for elements already inside the initial viewport
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < (window.innerHeight || 800) - 20) {
          el.classList.add('revealed');
          const children = el.querySelectorAll(
            '.scroll-reveal, .fade-in-up, .scale-fade, .slide-up, .fade-in-left, .fade-in-right'
          );
          children.forEach((c) => c.classList.add('revealed'));
        }
      });
    };

    const t1 = setTimeout(attachObserver, 60);
    const t2 = setTimeout(attachObserver, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [theme]);

  return null;
}
