const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Удаляем импорты Three.js и Mascot
content = content.replace(/import \{ Canvas, useFrame \} from "@react-three\/fiber";\n/, '');
content = content.replace(/import type \{ Group \} from "three";\n/, '');
content = content.replace(/import Mascot from "@\/components\/Mascot";\n/, '');
content = content.replace(/import \{ useScrollRotation \} from "@\/components\/useScrollRotation";\n/, '');

// Удаляем функции RotatingMascot и MascotCanvas
content = content.replace(/function RotatingMascot\(\[\s\S]*?\}\n\nfunction MascotCanvas\(\[\s\S]*?\}\n\n/, '');
// Альтернативное удаление, если не сработало регулярное выражение
content = content.replace(/function RotatingMascot[^}]*\}\n\s*\);\n\}/gs, '');
content = content.replace(/function MascotCanvas[^}]*\}\n\s*\);\n\}/gs, '');

// Удаляем <MascotCanvas />
content = content.replace(/\s*<MascotCanvas \/>\s*/g, '');

fs.writeFileSync('app/page.tsx', content);
