"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import styles from "./mascot-parallax.module.css";

const PARALLAX_SPEED = 0.32; // Smaller value = slower mascot movement (appears further away)
const MAX_SHIFT = 180; // px clamp so the mascot never drifts too far

export default function MascotParallaxPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const mascotRef = useRef<HTMLDivElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    const mascotElement = mascotRef.current;

    if (!heroElement || !mascotElement) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldReduceMotion = mediaQuery.matches;

    if (shouldReduceMotion) {
      mascotElement.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    const applyParallax = () => {
      rafIdRef.current = null;

      const heroOffsetTop = heroElement.offsetTop;
      const scrollPosition = window.scrollY;

      const relativeScroll = scrollPosition - heroOffsetTop;
      const constrainedScroll = Math.max(Math.min(relativeScroll, MAX_SHIFT * 2), -MAX_SHIFT * 2);
      const translateY = constrainedScroll * PARALLAX_SPEED;

      const clampedTranslate = Math.max(Math.min(translateY, MAX_SHIFT), -MAX_SHIFT);

      mascotElement.style.transform = `translate3d(0, ${clampedTranslate}px, 0)`;
    };

    const requestParallaxUpdate = () => {
      if (rafIdRef.current !== null) {
        return;
      }

      rafIdRef.current = window.requestAnimationFrame(applyParallax);
    };

    const handleResize = () => {
      applyParallax();
    };

    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    // Apply the effect immediately on load so refresh-at-scroll keeps the correct offset.
    applyParallax();

    return () => {
      window.removeEventListener("scroll", requestParallaxUpdate);
      window.removeEventListener("resize", handleResize);

      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.heroSection} aria-labelledby="parallax-hero-title">
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Parallax ready</span>
          <h1 id="parallax-hero-title" className={styles.heroTitle}>
            Mascot cat floating gently as you scroll
          </h1>
          <p className={styles.heroDescription}>
            The hero mascot is positioned absolutely within the section while the page scroll
            drives a translate3d transform. Because the mascot moves slower than the rest of
            the layout, it feels as if it is hovering in the background space.
          </p>
          <div className={styles.heroActions}>
            <Link href="#details" className={styles.heroPrimaryAction}>
              Explore interactions
            </Link>
            <Link href="#contact" className={styles.heroSecondaryAction}>
              Discuss your mascot
            </Link>
          </div>
        </div>

        <div id="mascot-container" ref={mascotRef} aria-hidden>
          <Image
            id="mascot-cat"
            src="/mascot-cat.svg"
            width={520}
            height={520}
            priority
            alt="Floating cat mascot"
          />
        </div>
      </div>
    </section>
  );
}