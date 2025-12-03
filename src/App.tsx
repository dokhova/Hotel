import { Header } from "./components/Header";
import { Greeting } from "./components/Greeting";
import { MeditationPlayer } from "./components/MeditationPlayer";
import { HotelServices } from "./components/HotelServices";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
    <div className="min-h-screen bg-background relative">
      {/* Background image overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{ 
          backgroundImage: `url(/img/cover.jpg)`,
          opacity: 0.2
        }}
      />
      {/* Desktop/Web Layout */}
      <div className="hidden lg:flex lg:h-screen lg:flex-col relative z-10">
        <main className="flex-1 overflow-y-auto px-8 pb-8 pt-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <Header />
            
            {/* Greeting */}
            <Greeting />
            
            {/* Main content - single column */}
            <MeditationPlayer />
            <HotelServices />
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen relative z-10">
        <div className="max-w-md mx-auto px-4">
          <div className="pt-8">
            <Header />
          </div>
          
          <main className="pb-24 pt-6 space-y-12">
            <Greeting />
            <MeditationPlayer />
            <HotelServices />
          </main>
        </div>
      </div>
    </div>
    </LanguageProvider>
  );
}
