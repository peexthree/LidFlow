const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const endOfConstants = content.indexOf('// --- КОНЕЦ ОПРЕДЕЛЕНИЙ КОНСТАНТ ---');
const exportDefault = content.indexOf('export default function Home() {');

if (endOfConstants !== -1 && exportDefault !== -1) {
    const endLine = content.indexOf('\n', endOfConstants);
    content = content.substring(0, endLine + 1) + '\n\n' + content.substring(exportDefault);
}

fs.writeFileSync('app/page.tsx', content);
