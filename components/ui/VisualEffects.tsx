"use client";

import React from "react";

export function TechBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020304]">
      {/* Subtle Cyan Cyberpunk Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #66FCF1 1px, transparent 1px),
            linear-gradient(to bottom, #66FCF1 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />

      {/* Glow acccents */}
      <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-[radial-gradient(circle_at_center,rgba(102,252,241,0.03)_0%,transparent_70%)]" />
      <div className="absolute -right-[10%] top-[40%] h-[30%] w-[30%] rounded-full bg-[radial-gradient(circle_at_center,rgba(102,252,241,0.02)_0%,transparent_70%)]" />
    </div>
  );
}

// Keep FloatingOrbs exported just in case it's used elsewhere, but make it identical to TechBackground or return null.
// Looking at the imports it's only in layout.tsx, but let's export it as a no-op just to be safe.
export function FloatingOrbs() {
  return null;
}
