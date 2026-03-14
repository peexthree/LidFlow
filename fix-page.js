const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Удаляем оставшиеся импорты вручную
content = content.replace(/import Mascot from "@\/components\/Mascot";\n/, '');
content = content.replace(/import { useScrollRotation } from "@\/components\/useScrollRotation";\n/, '');
content = content.replace(/import { Canvas, useFrame } from "@react-three\/fiber";\n/, '');
content = content.replace(/import type { Group } from "three";\n/, '');

// Находим начало RotatingMascot и удаляем до конца MascotCanvas
const startIndex = content.indexOf('function RotatingMascot');
if (startIndex !== -1) {
    const defaultExportIndex = content.indexOf('export default function Page()', startIndex);
    if (defaultExportIndex !== -1) {
        content = content.substring(0, startIndex) + content.substring(defaultExportIndex);
    }
}

// Убираем компонент <MascotCanvas />
content = content.replace(/<MascotCanvas \/>\n/g, '');

fs.writeFileSync('app/page.tsx', content);
