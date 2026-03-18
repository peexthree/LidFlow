const fs = require('fs');

const pPath = 'app/page.tsx';
let pContent = fs.readFileSync(pPath, 'utf8');

// Remove unused declarations that are now handled by DynamicPricing
pContent = pContent.replace(/const pricingPlans = \[[\s\S]*?\];/g, '');
pContent = pContent.replace(/const additionalModules = \[[\s\S]*?\];/g, '');

// Clean unused imports
pContent = pContent.replace('import Link from "next/link";', '');
pContent = pContent.replace('import { clsx } from "clsx";', '');
pContent = pContent.replace('import { Button } from "@/components/ui/button";', '');

fs.writeFileSync(pPath, pContent, 'utf8');
