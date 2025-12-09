import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../locales/translations";

export function Header() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].header;

  return (
    <div className="pb-6 border-b border-white/[0.02]">
    </div>
  );
}