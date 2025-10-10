import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LidFlow — Code-first Designer",
  description: "Собирайте современные лендинги из блоков без Figma.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "LidFlow — Code-first Designer",
    description: "Собирайте современные лендинги из блоков без Figma.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen">
        <header className="border-b">
          <div className="container flex items-center justify-between h-16">
            <a href="/" className="font-semibold">LidFlow</a>
            <nav className="flex gap-4">
              <a className="hover:underline" href="#portfolio">Портфолио</a>
              <a className="hover:underline" href="#pricing">Цены</a>
              <a className="hover:underline" href="#contact">Контакты</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t mt-20">
          <div className="container py-10 text-sm text-neutral-500">
            © {new Date().getFullYear()} LidFlow
          </div>
        </footer>
      </body>
    </html>
  );
}
