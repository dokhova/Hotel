import { ExternalLink } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function AdBanner() {
  const { language } = useLanguage();
  
  const content = {
    en: {
      title: "RHYTHM COURT",
      location: "Barcelona, Spain",
      description: "Experience Mediterranean luxury with stunning city views",
      discount: "30% OFF",
      discountLabel: "First booking",
      cta: "Book Now"
    },
    ru: {
      title: "RHYTHM COURT",
      location: "Барселона, Испания",
      description: "Средиземноморская роскошь с потрясающим видом на город",
      discount: "Скидка 30%",
      discountLabel: "Первое бронирование",
      cta: "Забронировать"
    }
  };
  
  const t = content[language];
  
  return (
    <div className="backdrop-blur-xl bg-white/[0.03] rounded-3xl overflow-hidden border border-white/[0.08] shadow-lg">
      {/* Image Section */}
      <div className="relative h-32 overflow-hidden">
        <img
          src="/assets/banner.jpg"
          alt="Resort"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Discount badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full backdrop-blur-xl bg-white/20 border border-white/30">
          <p className="text-white text-xs font-medium">{t.discount}</p>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2.5">
          <div className="flex-1">
            <h3 className="text-white font-medium mb-0.5 text-sm">{t.title}</h3>
            <p className="text-muted-foreground text-xs mb-1.5">{t.location}</p>
            <p className="text-white/70 text-xs">{t.description}</p>
          </div>
        </div>
        
        {/* CTA Button */}
        <button className="w-full py-2.5 rounded-2xl backdrop-blur-xl border border-white/20 hover:bg-white/10 transition-all group"
          style={{
            background: "linear-gradient(135deg, rgba(52, 168, 83, 0.15) 0%, rgba(168, 213, 49, 0.15) 100%)"
          }}
        >
          <span className="text-white text-sm font-medium flex items-center justify-center gap-2">
            {t.cta}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
}