import re

with open('app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add import Image from next/image
if 'import Image from "next/image"' not in content:
    content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport Image from "next/image";')

# Remove unused Suspense and useRef
content = content.replace('import { Suspense, useRef } from "react";', '')

# Replace <img> with <Image>
content = re.sub(
    r'<img\s+src="([^"]+)"\s+alt="([^"]+)"\s+className="([^"]+)"\s*/>',
    r'<Image src="\1" alt="\2" width={32} height={32} className="\3" />',
    content
)

# For the avatar images
content = re.sub(
    r'<img\s+src=\{([^}]+)\}\s+alt=\{([^}]+)\}\s+className="([^"]+)"\s*/>',
    r'<Image src={\1} alt={\2} width={48} height={48} className="\3" unoptimized />',
    content
)


with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
