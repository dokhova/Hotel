import { Sparkles, Dumbbell, UtensilsCrossed, Shirt } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../locales/translations";

interface Service {
  name: string;
  description: string;
  duration?: string;
  price: string;
}

interface Category {
  id: string;
  name: string;
  services: Service[];
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  categories: Category[];
  hours: string;
}

function ServiceCard({ icon, title, categories, hours, isExpanded, onToggle }: ServiceCardProps & { isExpanded: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative rounded-3xl p-5 transition-all backdrop-blur-xl border shadow-lg text-left ${
        isExpanded
          ? "bg-primary/10 border-primary/30"
          : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05]"
      }`}
    >
      <div className="flex flex-col items-start space-y-3 w-full">
        <div className="flex items-center justify-between w-full">
          <div className={`${isExpanded ? "text-primary" : "text-white"}`}>{icon}</div>
          <div className={`text-white/50 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="w-full space-y-1">
          <div className={`text-xs uppercase tracking-wide ${isExpanded ? "text-primary" : "text-muted-foreground"}`}>
            {hours}
          </div>
          <div className="text-white text-lg font-normal">
            {title}
          </div>
        </div>
      </div>
    </button>
  );
}

function ServiceDetails({ categories, buttonType }: { categories: Category[]; buttonType: 'book' | 'order' }) {
  const { language } = useLanguage();
  const t = translations[language].services;
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  useEffect(() => {
    setActiveCategory(categories[0].id);
  }, [categories]);

  const activeServices = categories.find(cat => cat.id === activeCategory)?.services || [];

  return (
    <div className="mt-6 space-y-4">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeCategory === category.id
                ? 'bg-[#34A853] text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Services list */}
      <div className="space-y-3">
        {activeServices.map((service, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.08] rounded-2xl p-4 space-y-3"
          >
            <div>
              <h4 className="text-white">{service.name}</h4>
              <p className="text-white/60 text-sm mt-1">{service.description}</p>
              {service.duration && (
                <p className="text-white/40 text-sm mt-1">{service.duration}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-white text-lg">{service.price}</p>
              <button className="px-6 py-2 rounded-full bg-[#34A853] text-white text-sm hover:bg-[#2d9045] transition-colors">
                {buttonType === 'book' ? t.bookService : t.orderService}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HotelServices() {
  const { language } = useLanguage();
  const t = translations[language].services;
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const spaCategories: Category[] = [
    {
      id: 'body',
      name: t.categories.spaBody,
      services: [
        {
          name: t.items.revitalizingMassage.name,
          description: t.items.revitalizingMassage.description,
          duration: t.items.revitalizingMassage.duration,
          price: '$90'
        },
        {
          name: t.items.lymphaticMassage.name,
          description: t.items.lymphaticMassage.description,
          duration: t.items.lymphaticMassage.duration,
          price: '$90'
        }
      ]
    },
    {
      id: 'face',
      name: t.categories.spaFace,
      services: [
        {
          name: t.items.hydratingFacial.name,
          description: t.items.hydratingFacial.description,
          duration: t.items.hydratingFacial.duration,
          price: '$75'
        }
      ]
    },
    {
      id: 'spa-days',
      name: t.categories.spaDays,
      services: [
        {
          name: t.items.fullDayWellness.name,
          description: t.items.fullDayWellness.description,
          duration: t.items.fullDayWellness.duration,
          price: '$250'
        }
      ]
    }
  ];

  const yogaCategories: Category[] = [
    {
      id: 'timetable',
      name: t.categories.yogaTimetable,
      services: [
        {
          name: t.items.morningYoga.name,
          description: t.items.morningYoga.description,
          price: '$15'
        },
        {
          name: t.items.eveningMeditation.name,
          description: t.items.eveningMeditation.description,
          price: '$15'
        }
      ]
    },
    {
      id: 'schedule',
      name: t.categories.yogaSchedule,
      services: [
        {
          name: t.items.goYogaSchedule.name,
          description: t.items.goYogaSchedule.description,
          price: '$15'
        },
        {
          name: t.items.goYoga.name,
          description: t.items.goYoga.description,
          price: '$55'
        }
      ]
    },
    {
      id: 'individual',
      name: t.categories.yogaIndividual,
      services: [
        {
          name: t.items.privateYoga.name,
          description: t.items.privateYoga.description,
          duration: t.items.privateYoga.duration,
          price: '$80'
        }
      ]
    }
  ];

  const roomServiceCategories: Category[] = [
    {
      id: 'breakfast',
      name: t.categories.breakfast,
      services: [
        {
          name: t.items.continentalBreakfast.name,
          description: t.items.continentalBreakfast.description,
          price: '$25'
        },
        {
          name: t.items.americanBreakfast.name,
          description: t.items.americanBreakfast.description,
          price: '$35'
        }
      ]
    },
    {
      id: 'lunch',
      name: t.categories.lunchDinner,
      services: [
        {
          name: t.items.grilledSalmon.name,
          description: t.items.grilledSalmon.description,
          price: '$45'
        },
        {
          name: t.items.caesarSalad.name,
          description: t.items.caesarSalad.description,
          price: '$22'
        }
      ]
    },
    {
      id: 'drinks',
      name: t.categories.beverages,
      services: [
        {
          name: t.items.wineSelection.name,
          description: t.items.wineSelection.description,
          price: '$40'
        }
      ]
    }
  ];

  const laundryCategories: Category[] = [
    {
      id: 'washing',
      name: t.categories.washingIroning,
      services: [
        {
          name: t.items.shirtService.name,
          description: t.items.shirtService.description,
          price: '$8'
        },
        {
          name: t.items.suitService.name,
          description: t.items.suitService.description,
          price: '$25'
        }
      ]
    },
    {
      id: 'dry-clean',
      name: t.categories.dryClean,
      services: [
        {
          name: t.items.dressPants.name,
          description: t.items.dressPants.description,
          price: '$18'
        }
      ]
    },
    {
      id: 'express',
      name: t.categories.express,
      services: [
        {
          name: t.items.sameDayService.name,
          description: t.items.sameDayService.description,
          price: '$35'
        }
      ]
    }
  ];

  const services = [
    { id: 'spa', icon: <Sparkles className="w-6 h-6" />, title: t.serviceNames.spa, categories: spaCategories, hours: '9:00 - 21:00', buttonType: 'book' as const },
    { id: 'yoga', icon: <Dumbbell className="w-6 h-6" />, title: t.serviceNames.yoga, categories: yogaCategories, hours: '7:00 - 19:00', buttonType: 'book' as const },
    { id: 'room-service', icon: <UtensilsCrossed className="w-6 h-6" />, title: t.serviceNames.roomService, categories: roomServiceCategories, hours: '24/7', buttonType: 'order' as const },
    { id: 'laundry', icon: <Shirt className="w-6 h-6" />, title: t.serviceNames.laundry, categories: laundryCategories, hours: '8:00 - 20:00', buttonType: 'order' as const },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-white">{t.title}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {services.map(service => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            categories={service.categories}
            hours={service.hours}
            isExpanded={expandedService === service.id}
            onToggle={() => setExpandedService(expandedService === service.id ? null : service.id)}
          />
        ))}
      </div>

      {/* Expanded service details */}
      {expandedService && (
        <div className="rounded-3xl backdrop-blur-xl bg-[#2A2F2A]/80 border border-white/[0.08] shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg">
              {services.find(s => s.id === expandedService)?.title}
            </h3>
            <button
              onClick={() => setExpandedService(null)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <ServiceDetails 
            categories={services.find(s => s.id === expandedService)?.categories || []} 
            buttonType={services.find(s => s.id === expandedService)?.buttonType || 'book'}
          />
        </div>
      )}
    </div>
  );
}
