import type { Lang } from "@/lib/lang";
import { homeSection, siteRoutes } from "@/lib/site-links";

export type SitemapLink = { label: string; href: string };

export type SitemapSection = { title: string; links: SitemapLink[] };

export type SitemapPageContent = {
  title: string;
  intro: string;
  sections: SitemapSection[];
};

export function getSitemapContent(lang: Lang): SitemapPageContent {
  const isRu = lang === "RU";
  const routes = siteRoutes(lang);
  return {
    title: isRu ? "Карта сайта" : "Sitemap",
    intro: isRu
      ? "Основные страницы и разделы сайта Omuzbox (us.omuzbox.com)."
      : "Main pages and sections of the Omuzbox website (us.omuzbox.com).",
    sections: [
      {
        title: isRu ? "Главная страница" : "Home page",
        links: [
          { label: isRu ? "Главная" : "Home", href: routes.home },
          { label: isRu ? "О школе / платформа" : "About / platform", href: homeSection(lang, "about") },
          { label: isRu ? "Курсы" : "Courses", href: homeSection(lang, "courses") },
          { label: isRu ? "Уровни CEFR" : "CEFR levels", href: homeSection(lang, "levels") },
          { label: isRu ? "Как проходит обучение" : "How it works", href: homeSection(lang, "how") },
          { label: isRu ? "Цены" : "Pricing", href: homeSection(lang, "pricing") },
          { label: isRu ? "Отзывы" : "Reviews", href: homeSection(lang, "reviews") },
          { label: isRu ? "Запись на пробный урок" : "Free trial booking", href: homeSection(lang, "trial") },
          { label: isRu ? "Контакты" : "Contact", href: homeSection(lang, "contact") },
          { label: "FAQ", href: homeSection(lang, "faq") },
        ],
      },
      {
        title: isRu ? "Юридическая информация" : "Legal",
        links: [
          { label: isRu ? "Политика конфиденциальности" : "Privacy policy", href: routes.privacy },
          { label: isRu ? "Договор оферты" : "Offer agreement", href: routes.offer },
          { label: isRu ? "Документы и лицензии" : "Documents & licenses", href: routes.documents },
          { label: isRu ? "Карта сайта" : "Sitemap", href: routes.sitemap },
        ],
      },
    ],
  };
}
