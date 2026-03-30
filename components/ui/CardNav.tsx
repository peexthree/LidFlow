"use client";

import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { GoArrowUpRight } from 'react-icons/go';
import { Route } from 'next';

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'easeOut',
  baseColor = 'rgba(15, 23, 42, 0.4)',
  menuColor,
  buttonBgColor,
  buttonTextColor
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        // Force reflow
        void contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (isExpanded) {
        controls.start({ height: calculateHeight() });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded, calculateHeight, controls]);

  const toggleMenu = async () => {
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      await controls.start("open");
    } else {
      setIsHamburgerOpen(false);
      await controls.start("closed");
      setIsExpanded(false);
    }
  };

  const navVariants: Variants = {
    open: {
      height: calculateHeight(),
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
    },
    closed: {
      height: 60,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1], delay: 0.2 } // wait for cards to close
    }
  };

  const cardsContainerVariants: Variants = {
    open: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const cardVariants: Variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] }
    }
  };


  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] ${className}`}
    >
      <motion.nav
        ref={navRef}
        variants={navVariants}
        initial="closed"
        animate={controls}
        className={`card-nav ${isExpanded ? 'open' : ''} block p-0 rounded-2xl shadow-lg shadow-black/20 border border-white/10 backdrop-blur-md relative overflow-hidden will-change-[height]`}
        style={{ backgroundColor: baseColor, height: 60 }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Закрыть меню' : 'Открыть меню'}
            tabIndex={0}
            style={{ color: menuColor || '#000' }}
          >
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
              } group-hover:opacity-75`}
            />
          </div>

          <Link href="/" className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full">
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden transition-transform hover:scale-110">
              <Image
                src={logo}
                alt={logoAlt}
                width={56}
                height={56}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <span className="ml-2 font-mono text-xl font-bold tracking-tight text-white/90">
              LidFlow
            </span>
          </Link>

          <Link
            href="#contact"
            className="card-nav-cta-button hidden md:inline-flex border-0 rounded-xl px-4 items-center h-full font-medium cursor-pointer transition-transform hover:scale-105 duration-300 no-underline"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Оставить заявку
          </Link>
        </div>

        <motion.div
          variants={cardsContainerVariants}
          initial="closed"
          animate={controls}
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <motion.div
              variants={cardVariants}
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-xl border border-white/5 backdrop-blur-md min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => (
                  <Link
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                    href={lnk.href as Route}
                    aria-label={lnk.ariaLabel}
                    onClick={(e) => {
                      if (lnk.href.startsWith('#')) {
                        e.preventDefault();
                        const targetId = lnk.href.substring(1);
                        const elem = document.getElementById(targetId);
                        if (elem) {
                          elem.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                      if (isExpanded) {
                          toggleMenu();
                      }
                    }}
                  >
                    <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                    {lnk.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.nav>
    </div>
  );
};

export default CardNav;
