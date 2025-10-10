export type BlockType = "hero" | "features" | "gallery" | "cta";

export interface HeroBlockProps {
  title: string;
  subtitle: string;
  cta: string;
}

export interface FeaturesBlockProps {
  items: ReadonlyArray<{ title: string; text: string }>;
}

export interface GalleryBlockProps {
  images?: ReadonlyArray<string>;
}

export interface CtaBlockProps {
  text: string;
  button: string;
}

type BlockPropsMap = {
  hero: HeroBlockProps;
  features: FeaturesBlockProps;
  gallery: GalleryBlockProps;
  cta: CtaBlockProps;
};

export type Block<T extends BlockType> = {
  id: string;
  type: T;
  props: BlockPropsMap[T];
};

export const defaultPage: Block<BlockType>[] = [
  {
    id: "hero-1",
    type: "hero",
    props: {
      title: "Создаём сайты, которые приносят клиентов",
      subtitle: "Лаконичный дизайн, быстрый запуск, измеримая конверсия",
      cta: "Запустить проект"
    }
  },
  {
    id: "features-1",
    type: "features",
    props: {
      items: [
        { title: "Скорость", text: "Запуск за 3-5 дней на Vercel" },
        { title: "Конверсия", text: "Фокус на лидогенерацию" },
        { title: "Гибкость", text: "Компоненты на TypeScript" }
      ]
    }
  },
  {
    id: "cta-1",
    type: "cta",
    props: {
      text: "Готовы обсудить задачу?",
      button: "Получить консультацию"
    }
  }
];

// Util
export const uid = () => Math.random().toString(36).slice(2, 9);
