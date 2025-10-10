import Image from "next/image";

interface GalleryProps {
  images?: readonly string[];
}

const fallbackImages = [
  "/placeholder/1.jpg",
  "/placeholder/2.jpg",
  "/placeholder/3.jpg",
  "/placeholder/4.jpg",
] as const;

export function Gallery({ images }: GalleryProps) {
  const list = images?.length ? images : fallbackImages;

  return (
    <section className="container py-16">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {list.map((src) => (
          <div
            key={src}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
          >
            <Image
              src={src}
              alt="Превью проекта"
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 200px, (min-width: 768px) 25vw, 45vw"
            />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at top, rgba(14,165,233,0.18), transparent 70%)" }} />
          </div>
        ))}
      </div>
    </section>
  );
}