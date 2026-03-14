const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// The issue was `// --- КОНЕЦ ОПРЕДЕЛЕНИЙ КОНСТАНТ ---` was not found exactly due to line breaks or whitespace. Let's just use `export default function Page()`
const exportDefaultIndex = content.indexOf('export default function Page() {');
const testimonialsEnd = content.indexOf('] as const;\n// --- КОНЕЦ ОПРЕДЕЛЕНИЙ КОНСТАНТ ---');

if (testimonialsEnd !== -1 && exportDefaultIndex !== -1) {
    const spliceStart = testimonialsEnd + '] as const;\n// --- КОНЕЦ ОПРЕДЕЛЕНИЙ КОНСТАНТ ---'.length;
    content = content.substring(0, spliceStart) + '\n\n' + content.substring(exportDefaultIndex);
}

fs.writeFileSync('app/page.tsx', content);
