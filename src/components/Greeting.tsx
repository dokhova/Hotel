import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../locales/translations";

export function Greeting() {
  const { language } = useLanguage();
  const t = translations[language].greeting;

  return (
    <div className="flex-1">
      <h1 className="text-white mb-2">{t.title}</h1>
      <p className="text-muted-foreground">{t.subtitle}</p>
    </div>
  );
}