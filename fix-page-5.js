const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Also remove `MascotCanvas` body remnants
const start2 = content.indexOf('  const rotationY =');
if (start2 !== -1) {
    const end2 = content.indexOf('export default function Page() {');
    if (end2 !== -1) {
        content = content.substring(0, start2) + content.substring(end2);
    }
}

fs.writeFileSync('app/page.tsx', content);
