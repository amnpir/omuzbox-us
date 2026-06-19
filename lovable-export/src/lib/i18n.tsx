import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { type Lang, translations, htmlLang } from "./translations";
import { replaceLangInPath } from "./locale-path";
import { trackLanguageChange } from "./analytics";

type LocaleCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.EN;
};

const LocaleContext = createContext<LocaleCtx | null>(null);

const STORAGE_KEY = "omuzbox-lang";

export function LocaleProvider({
  children,
  lang: routeLang,
}: {
  children: ReactNode;
  lang: Lang;
}) {
  const navigate = useNavigate();
  const [lang, setLangState] = useState<Lang>(routeLang);

  useEffect(() => {
    setLangState(routeLang);
    localStorage.setItem(STORAGE_KEY, routeLang);
  }, [routeLang]);

  const setLang = (next: Lang) => {
    if (next === lang) return;
    trackLanguageChange(lang, next);
    localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
    const { pathname, search, hash } = window.location;
    const target = `${replaceLangInPath(pathname, next)}${search}${hash}`;
    navigate({ to: target, replace: true });
  };

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = htmlLang(lang);
    document.title = t.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.meta.description);
  }, [lang, t.meta.title, t.meta.description]);

  return (
    <LocaleContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale requires LocaleProvider");
  return ctx;
}
