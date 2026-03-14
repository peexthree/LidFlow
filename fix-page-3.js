const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Удаляем все упоминания импортов Three.js, Mascot и useScrollRotation
content = content.split('\n').filter(line => {
    return !line.includes('Mascot') &&
           !line.includes('useScrollRotation') &&
           !line.includes('@react-three/fiber') &&
           !line.includes('type { Group } from "three"');
}).join('\n');

fs.writeFileSync('app/page.tsx', content);
