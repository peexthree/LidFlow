const fs = require('fs');

const path = 'app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// The project array is already correct in the file according to my previous read_file. Let me double check it.
console.log(content.includes('image: "/placeholder/n1.jpeg"'));
console.log(content.includes('src: "/placeholder/video_2026-03-11_21-55-31%20(online-video-cutter.com)%20(2).mp4"'));
