import type { Lang } from "@/lib/lang";
import { homeSection, SITE_ROUTES } from "@/lib/site-links";

export type SitemapLink = { label: string; href: string };

export type SitemapSection = { title: string; links: SitemapLink[] };

export type SitemapPageContent = {
  title: string;
  intro: string;
  sections: SitemapSection[];
};

export function getSitemapContent(lang: Lang): SitemapPageContent {
  const isRu = lang === "RU";
  return {
    title: isRu ? "Карта сайта" : "Sitemap",
    intro: isRu
      ? "Основные страницы и разделы сайта Omuzbox (us.omuzbox.com)."
      : "Main pages and sections of the Omuzbox website (us.omuzbox.com).",
    sections: [
      {
        title: isRu ? "Главная страница" : "Home page",
        links: [
          { label: isRu ? "Главная" : "Home", href: SITE_ROUTES.home },
          { label: isRu ? "О школе / платформа" : "About / platform", href: homeSection("about") },
          { label: isRu ? "Курсы" : "Courses", href: homeSection("courses") },
          { label: isRu ? "Уровни CEFR" : "CEFR levels", href: homeSection("levels") },
          { label: isRu ? "Как проходит обучение" : "How it works", href: homeSection("how") },
          { label: isRu ? "Цены" : "Pricing", href: homeSection("pricing") },
          { label: isRu ? "Отзывы" : "Reviews", href: homeSection("reviews") },
          { label: isRu ? "Запись на пробный урок" : "Free trial booking", href: homeSection("trial") },
          { label: isRu ? "Контакты" : "Contact", href: homeSection("contact") },
          { label: "FAQ", href: homeSection("faq") },
        ],
      },
      {
        title: isRu ? "Юридическая информация" : "Legal",
        links: [
          { label: isRu ? "Политика конфиденциальности" : "Privacy policy", href: SITE_ROUTES.privacy },
          { label: isRu ? "Договор оферты" : "Offer agreement", href: SITE_ROUTES.offer },
          { label: isRu ? "Документы и лицензии" : "Documents & licenses", href: SITE_ROUTES.documents },
          { label: isRu ? "Карта сайта" : "Sitemap", href: SITE_ROUTES.sitemap },
        ],
      },
    ],
  };
}
