const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const useFrameIndex = content.indexOf('useFrame(() => {');
if (useFrameIndex !== -1) {
    // we need to find the export default function Page() after this
    const exportIndex = content.indexOf('export default function Page() {', useFrameIndex);

    // find a safe spot before useFrame to cut
    const safeSpot = content.lastIndexOf('] as const;', useFrameIndex);

    if (safeSpot !== -1 && exportIndex !== -1) {
        content = content.substring(0, safeSpot + 11) + '\n\n' + content.substring(exportIndex);
    }
}

fs.writeFileSync('app/page.tsx', content);
