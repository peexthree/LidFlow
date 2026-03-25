#!/bin/bash
# 1. Update Hero.tsx
sed -i 's/<video/<video poster="\/placeholder\/n1.jpeg" preload="auto"/g' components/sections/Hero.tsx
# check priority on Hero images (none right now, but there's a video)

# 2. Update motionPresets.ts
sed -i 's/mobileDistanceFactor: 0.75,/mobileDistanceFactor: 0.25,/g' utils/motionPresets.ts

# 3. Update ParallaxSection.tsx to set intensity to 0 for mobile
sed -i "s/setIntensity(isMobileViewport ? 0.75 : 1.35);/setIntensity(isMobileViewport ? 0 : 1.35);/g" components/ParallaxSection.tsx

# 4. Disable backdrop blur on mobile
find components app sections -type f -name "*.tsx" -exec sed -i 's/backdrop-blur/md:backdrop-blur/g' {} +
