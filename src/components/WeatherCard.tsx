import { CloudRain } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../locales/translations";

export function WeatherCard() {
  const { language } = useLanguage();
  const t = translations[language].weather;

  return (
    <div className="flex items-start gap-4">
      <CloudRain className="w-12 h-12 text-white/40 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4">
          <p className="text-white font-normal">{t.lightRain}</p>
          <p className="text-white font-normal">26°</p>
        </div>
        <p className="text-white/40 text-sm mt-1">{t.city} · {t.date}</p>
      </div>
    </div>
  );
}