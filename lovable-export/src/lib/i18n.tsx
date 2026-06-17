import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Lang, translations, htmlLang } from "./translations";
import { isLang } from "./lang";

type LocaleCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.EN;
};

const LocaleContext = createContext<LocaleCtx | null>(null);

const STORAGE_KEY = "omuzbox-lang";

export function LocaleProvider({
  children,
  defaultLang = "EN",
}: {
  children: ReactNode;
  defaultLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return defaultLang;
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && isLang(saved) ? saved : defaultLang;
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
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
