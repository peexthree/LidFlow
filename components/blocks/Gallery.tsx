export function Gallery({ images }: { images: string[] }) {
  const list = images?.length ? images : [
    "/placeholder/1.jpg",
    "/placeholder/2.jpg",
    "/placeholder/3.jpg",
    "/placeholder/4.jpg"
  ];
  return (
    <section className="container py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {list.map((src, i) => (
          <img key={i} src={src} className="rounded-xl object-cover w-full h-40 border" />
        ))}
      </div>
    </section>
  );
}
