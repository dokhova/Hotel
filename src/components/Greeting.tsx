import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../locales/translations";

export function Greeting() {
  const { language } = useLanguage();
  const t = translations[language].greeting;

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-2">
        <h1 
          className="text-white" 
          style={{
            fontSize: '24px',
            fontWeight: 500,
            lineHeight: '36px',
            letterSpacing: '0.07px'
          }}
        >
          {t.title}
        </h1>
        <span className="text-white text-2xl">{t.temperature}</span>
      </div>
      <p className="text-muted-foreground">{t.subtitle}</p>
    </div>
  );
}
