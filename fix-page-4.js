const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// The script removed the function signature `function RotatingMascot({ rotationY }: { rotationY: number }) {`
// but left the body. We need to find `useFrame` and other remnants and remove them up to `export default function Page() {`

const start = content.indexOf('  const mascotRef = useRef');
if (start !== -1) {
  const end = content.indexOf('export default function Page() {');
  if (end !== -1) {
    content = content.substring(0, start) + content.substring(end);
  }
}

fs.writeFileSync('app/page.tsx', content);
