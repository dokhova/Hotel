import { CloudRain, Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../locales/translations";

export function Greeting() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].greeting;
  const w = translations[language].weather;

  return (
    <>
      {/* Desktop version with weather */}
      <div className="hidden lg:flex items-center justify-between">
        {/* Left side - Greeting */}
        <div>
          <h1 
            className="text-white" 
            style={{
              fontSize: '32px',
              fontWeight: 400,
              lineHeight: '48px'
            }}
          >
            {t.title}
          </h1>
          <p className="text-[#888888]" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '24px', marginTop: '4px' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Right side - Language Button */}
        <button 
          onClick={toggleLanguage}
          className="px-3 py-2 transition-opacity hover:opacity-100 flex items-center gap-2 opacity-60"
        >
          <Globe className="w-4 h-4 text-white" />
          <span className="text-white text-sm">{language === 'ru' ? 'EN' : 'RU'}</span>
        </button>
      </div>

      {/* Mobile version without weather */}
      <div className="lg:hidden flex-1">
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
          <button 
            onClick={toggleLanguage}
            className="px-3 py-2 transition-opacity hover:opacity-100 flex items-center gap-2 opacity-60"
          >
            <Globe className="w-4 h-4 text-white" />
            <span className="text-white text-sm">{language === 'ru' ? 'EN' : 'RU'}</span>
          </button>
        </div>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>
    </>
  );
}