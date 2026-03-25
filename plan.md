# Plan

1. **Fix LCP: Priority for hero images and media.**
   - Modify `components/sections/Hero.tsx` to add `priority={true}` to critical images, especially any logos or hero elements above the fold.
   - Same for `components/LogoIntro.tsx` (it seems priority is already there or mentioned in comments, ensure it's applied correctly).
   - Ensure first image in `PortfolioShowcase` or similar early sections gets priority if it's visible early, or lazy load rest.
   - For `next/image` above the fold, ensure `fetchPriority="high"` or `priority={true}` is set.

2. **Fix Heavy Backgrounds/Glassmorphism for mobile (backdrop-blur).**
   - Create a utility or use tailwind classes like `md:backdrop-blur-xl backdrop-blur-none` or use CSS variables to disable `backdrop-blur` on mobile. Or use a global class `.no-blur-on-scroll` that is toggled on `window.scroll`.
   - Update `DynamicPricing`, `ArtifactGallery`, `PortfolioShowcase`, `MasterpieceServices`, `CardNav`, `Hero`, `ContactForm` to use a responsive utility `sm:backdrop-blur-md bg-[#020304]/90 sm:bg-opacity-50` or similar to reduce calculation on mobile.

3. **SVG Bombardment -> Sprite:**
   - I have generated `public/sprite.svg`. I need to replace all `<Image src="/xxx.svg" />` or raw `<svg>` with `<svg><use href="/sprite.svg#xxx" /></svg>`.
   - Review `app/page.tsx` and `components/sections/MasterpieceServices.tsx` where these SVGs are used and implement an `Icon` component that loads from the sprite.

4. **GSAP & Framer Motion Overload on Mobile:**
   - In `utils/motionPresets.ts`, I will adjust distance and duration to be even lighter, maybe disable some complex springs on mobile.
   - For `ParallaxSection.tsx` disable it completely on mobile.
   - Check `AnimatedSection.tsx` to ensure `will-change: transform` is consistently applied and maybe use simpler opacity-only fade for mobile.

5. **List Virtualization for long lists:**
   - If there is a long list of services like `MasterpieceServices`, check if we can reduce DOM nodes or optimize the infinite scroll to just pure CSS `transform` instead of duplicating nodes endlessly if possible, or use a smaller set.
