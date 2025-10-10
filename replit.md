# LidFlow - Landing Page & Block Designer

## Overview

LidFlow is a modern landing page and visual block designer built with Next.js 15, React 19, and TypeScript. The project serves two main purposes:

1. **Marketing Landing Page** - A visually striking homepage with a custom Galaxy background effect and conversion-focused sections
2. **Visual Block Designer** - A client-side drag-and-drop interface for composing page sections

The application is optimized for deployment on Vercel with edge functions, strict TypeScript configuration, and built-in analytics integration.

## Recent Changes

### October 10, 2025 - Replit Migration & Modern UI Redesign
- **Migration from Vercel to Replit**: Successfully configured Next.js to run on Replit environment
  - Updated package.json scripts to bind to port 5000 and 0.0.0.0 for Replit compatibility
  - Configured deployment settings for autoscale deployment target
  - Next.js config updated with standalone output mode
- **Modern Gradient Background**: Implemented animated gradient background inspired by Figma design system
  - Multi-color gradient with subtle animation (15s loop)
  - Radial gradient overlays for depth and visual interest
  - Pastel color palette (blues, purples, pinks)
  - Hero section with vibrant purple→pink→blue gradient
- **Figma-Style Animations**: Added smooth, professional animations throughout the site
  - Fade-in-up animations for section reveals
  - Scale-in animations for hero content
  - Hover effects with translate, shadow, and shimmer
  - Glass morphism effects (backdrop blur) on header and footer
  - Shimmer effects on card hover states
- **Enhanced Card Interactions**: All cards now feature:
  - Glass effect background with backdrop blur
  - Smooth hover transitions (500ms duration)
  - Enhanced shadow effects on hover
  - Radial gradient overlays
  - Shimmer animation on hover
  - 3D tilt effect on hover (perspective transform)
- **Advanced Visual Effects**: New interactive elements
  - Floating orbs: Animated decorative gradient orbs (purple, pink, blue) that float across the page
  - Cursor trail: Dynamic particle trail following mouse movement with fade-out animation
  - Glow effect: Pulsing glow animation on primary CTA button
  - Gradient borders: Animated multi-color borders with rotating gradients
  - Scroll reveal: Intersection Observer-based animations for content appearing on scroll

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Rendering Strategy**
- Next.js 15.5 with App Router for file-based routing
- React 19 with React Server Components (RSC) for optimal performance
- Client components explicitly marked with `"use client"` directive
- Server-side rendering (SSR) for SEO-critical pages, client-side rendering for interactive features

**Type Safety & Validation**
- Strict TypeScript configuration with `noImplicitAny` and `noUncheckedIndexedAccess` enabled
- Zod schemas for runtime validation of form inputs and API payloads
- Custom type definitions for component props and data structures

**Styling System**
- Tailwind CSS 3.4 with custom design tokens (brand colors, shadows, borders)
- CSS variables for theming support (light/dark mode ready)
- Custom visual effects including glow, spotlight, and galaxy backgrounds
- Component library following shadcn/ui architecture pattern with CVA (Class Variance Authority)

**State Management & Interactivity**
- React hooks for local component state
- Drag-and-drop functionality powered by @dnd-kit library (core, sortable, modifiers)
- Client-side form validation with instant feedback using Zod
- Toast notifications via Sonner library

**Visual Effects**
- Custom WebGL-based Galaxy background component using OGL library
- Vertex and fragment shaders for particle effects
- Dynamic mouse interaction and parallax effects
- Configurable star density, rotation, and color parameters

### Backend Architecture

**API Layer**
- Edge Functions on Vercel for minimal cold start latency
- RESTful API endpoint at `/api/telegram/route.ts`
- Server-side validation using Zod schemas
- Error handling with structured responses

**Form Processing Flow**
1. Client submits form data via POST request
2. Edge function validates payload against Zod schema
3. Constructs formatted message with user details
4. Sends notification to Telegram Bot API
5. Returns success/error response to client

**Environment Configuration**
- `TG_BOT_TOKEN` - Telegram bot authentication token
- `TG_CHAT_ID` - Target chat/channel ID for notifications
- `NEXT_PUBLIC_SITE_URL` - Public site URL for metadata and links
- Graceful degradation when environment variables are missing

### Component Architecture

**Reusable UI Components** (`/components/ui/`)
- Button with variant support (default, ghost, outline)
- Icon components (ArrowRight, Grip) as SVG primitives
- Galaxy background effect with configurable parameters

**Feature Components** (`/components/`)
- ContactForm - Client-side form with validation and API integration
- Hero section with dynamic highlights and Galaxy background

**Page Sections** (`/components/sections/`)
- Modular section components for landing page composition
- Props-based configuration for content and styling

**Designer Page Structure**
- Section wrapper component for consistent spacing
- Pill component for tag display
- Drag-and-drop block system (implementation via @dnd-kit)

### SEO & Metadata

**Next.js Metadata API**
- Centralized metadata configuration in layout.tsx
- OpenGraph and Twitter Card support with dynamic image generation
- Structured data ready for search engines

**Sitemap & Robots**
- Programmatic sitemap generation via `sitemap.ts`
- Robot.txt configuration via `robots.ts`
- Priority-based page hierarchy (homepage priority 1.0, designer 0.6)

### Build & Deployment

**Development Workflow**
- Local development server on port 5000 (configurable)
- ESLint configuration extending Next.js rules
- Prettier for code formatting
- TypeScript strict mode for compile-time safety

**Production Optimization**
- Static optimization where possible
- Image optimization via Next.js Image component
- Automatic code splitting and lazy loading
- Edge function deployment for API routes

**Vercel Configuration**
- Default build command: `next build`
- Output directory: `.next`
- Environment variables configured in project settings
- Automatic HTTPS and global CDN distribution

## External Dependencies

### Core Framework
- **Next.js 15.5.2** - React framework with App Router, edge runtime, and built-in optimizations
- **React 19.0.0 & React DOM** - Latest React with concurrent features and server components

### Styling & UI
- **Tailwind CSS 3.4.10** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **class-variance-authority** - Type-safe component variants
- **clsx & tailwind-merge** - Conditional class name utilities
- **lucide-react** - Icon library (though custom SVG icons are primarily used)

### Form & Validation
- **Zod 3.23.8** - TypeScript-first schema validation for forms and API payloads

### Interactive Features
- **@dnd-kit/core, @dnd-kit/sortable, @dnd-kit/modifiers** - Drag-and-drop toolkit for block designer
- **OGL 1.0.11** - WebGL library for Galaxy background particle effects

### Notifications & Analytics
- **Sonner 1.5.0** - Toast notification library
- **@vercel/analytics 1.5.0** - Built-in analytics integration (extendable with GA4/Yandex Metrica)

### Third-Party APIs
- **Telegram Bot API** - Lead notification system
  - Endpoint: `https://api.telegram.org/bot{token}/sendMessage`
  - Authentication via `TG_BOT_TOKEN` environment variable
  - Messages sent to `TG_CHAT_ID` with formatted lead information
  - Error handling for failed deliveries

### Development Tools
- **TypeScript 5.6.2** - Type checking with strict configuration
- **ESLint 9.9.0** - Code linting with Next.js config
- **Prettier 3.3.3** - Code formatting
- **PostCSS & Autoprefixer** - CSS processing

### Deployment Platform
- **Vercel** - Primary hosting platform
  - Edge function support for API routes
  - Automatic SSL/HTTPS
  - Global CDN distribution
  - Environment variable management
  - Preview deployments for branches