const fs = require('fs');
let content = fs.readFileSync('sections/Hero.tsx', 'utf8');

content = content.replace(/import \{ ThreeBackground \} from "@\/components\/ThreeBackground";\n/, '');
content = content.replace(/\s*<ThreeBackground \/>\s*/, '');

fs.writeFileSync('sections/Hero.tsx', content);
