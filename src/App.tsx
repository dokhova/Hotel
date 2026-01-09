import { Header } from "./components/Header";
import { Greeting } from "./components/Greeting";
import { MeditationPlayer } from "./components/MeditationPlayer";
import { HotelServices } from "./components/HotelServices";
import { AdBanner } from "./components/AdBanner";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
    <div className="min-h-screen relative" style={{
      background: 'linear-gradient(180deg, #1a1a1a 0%, #132A1B 100%)'
    }}>
      {/* Background image overlay - fixed for desktop */}
      <div 
        className="hidden lg:block fixed inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{ 
          backgroundImage: `url(/img/cover.jpg)`,
          opacity: 0.2,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />
      {/* Background image overlay - absolute for mobile */}
      <div 
        className="lg:hidden absolute top-0 left-0 right-0 bg-cover bg-top pointer-events-none z-0"
        style={{ 
          backgroundImage: `url(/img/cover.jpg)`,
          opacity: 0.2,
          height: '100vh',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />
      {/* Desktop/Web Layout */}
      <div className="hidden lg:flex lg:h-screen lg:flex-col relative z-10">
        <main className="flex-1 overflow-y-auto px-8 pb-8 pt-2">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-1">
              <Header />
            </div>
            
            {/* Greeting */}
            <div className="mb-8">
              <Greeting />
            </div>
            
            {/* Main content - single column */}
            <div className="space-y-8">
              <MeditationPlayer />
              <HotelServices />
              <AdBanner />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen relative z-10">
        <div className="max-w-md mx-auto px-4">
          <div className="pt-4">
            <Header />
          </div>
          
          <main className="pb-24 pt-3 space-y-12">
            <Greeting />
            <MeditationPlayer />
            <HotelServices />
            <AdBanner />
          </main>
        </div>
      </div>
    </div>
    </LanguageProvider>
  );
}