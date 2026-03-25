const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.svg'));

let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n';

for (const file of files) {
  const content = fs.readFileSync(path.join(publicDir, file), 'utf-8');
  const id = path.basename(file, '.svg');
  // extract contents inside <svg ...> ... </svg>
  const match = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  if (match) {
    // try to get viewBox
    const viewBoxMatch = content.match(/viewBox="([^"]+)"/i);
    const viewBox = viewBoxMatch ? `viewBox="${viewBoxMatch[1]}"` : 'viewBox="0 0 24 24"';
    spriteContent += `  <symbol id="${id}" ${viewBox}>\n    ${match[1]}\n  </symbol>\n`;
  }
}

spriteContent += '</svg>';
fs.writeFileSync(path.join(publicDir, 'sprite.svg'), spriteContent);
console.log('Sprite generated with ' + files.length + ' icons');
