const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Удаляем импорты
content = content.replace(/import Mascot from "@\/components\/Mascot";\n/, '');
content = content.replace(/import \{ useScrollRotation \} from "@\/components\/useScrollRotation";\n/, '');
content = content.replace(/import \{ Canvas, useFrame \} from "@react-three\/fiber";\n/, '');
content = content.replace(/import type \{ Group \} from "three";\n/, '');

// Находим начало RotatingMascot
const start = content.indexOf('function RotatingMascot');
if (start !== -1) {
  // Находим export default function Page
  const end = content.indexOf('export default function Page', start);
  if (end !== -1) {
    content = content.slice(0, start) + content.slice(end);
  }
}

// Убираем компонент MascotCanvas
content = content.replace(/<MascotCanvas \/>/g, '');

fs.writeFileSync('app/page.tsx', content);
