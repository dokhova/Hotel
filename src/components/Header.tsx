import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../locales/translations";

export function Header() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].header;

  return (
    <div className="flex items-center justify-between pb-6 border-b border-white/5">
      <div>
        <h3 className="text-white">{t.title}</h3>
        <p className="text-xs text-muted-foreground">{t.room}</p>
      </div>
      <button 
        onClick={toggleLanguage}
        className="px-3 py-2 backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] rounded-2xl transition-all flex items-center gap-2"
      >
        <Globe className="w-4 h-4 text-white/90" />
        <span className="text-white text-sm">{language === 'ru' ? 'EN' : 'RU'}</span>
      </button>
    </div>
  );
}