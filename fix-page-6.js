const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const end = content.indexOf('export default function Page() {');

// We just find where the constants end (testimonials)
const constantsEnd = content.indexOf('] as const;\n// --- КОНЕЦ ОПРЕДЕЛЕНИЙ КОНСТАНТ ---');
if (constantsEnd !== -1 && end !== -1) {
    const endOfConstants = content.indexOf('\n', constantsEnd + '] as const;\n// --- КОНЕЦ ОПРЕДЕЛЕНИЙ КОНСТАНТ ---'.length);
    content = content.substring(0, endOfConstants + 1) + content.substring(end);
}

fs.writeFileSync('app/page.tsx', content);
