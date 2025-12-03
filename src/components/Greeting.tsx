import { CloudRain } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../locales/translations";

export function Greeting() {
  const { language } = useLanguage();
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

        {/* Right side - Weather */}
        <div className="flex items-center gap-3">
          <CloudRain className="w-8 h-8 text-[#888888] flex-shrink-0" strokeWidth={1.5} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white" style={{ fontSize: '20px', fontWeight: 400, lineHeight: '28px' }}>{w.lightRain}</span>
              <span className="text-white" style={{ fontSize: '20px', fontWeight: 400, lineHeight: '28px' }}>{t.temperature}</span>
            </div>
            <p className="text-[#888888] text-right" style={{ fontSize: '14px', fontWeight: 400, lineHeight: '20px' }}>
              {w.city} · {w.date}
            </p>
          </div>
        </div>
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
          <span className="text-white text-2xl">{t.temperature}</span>
        </div>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>
    </>
  );
}
