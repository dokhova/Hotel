import { Play, Heart, SkipBack, SkipForward, ChevronDown, Pause } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../locales/translations";
import meditationCover from "figma:asset/0ef9c37e8b80428ef1d916aeecdd30c5e4e760da.png";

export function MeditationPlayer() {
  const { language } = useLanguage();
  const t = translations[language].meditation;
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const meditations = [
    {
      id: 1,
      title: t.items.morningMeditation,
      duration: language === 'ru' ? "10 мин" : "10 min",
      image: meditationCover,
      gradient: "linear-gradient(100deg, #A8D531 0%, #34A853 100%)",
      audioSrc: language === 'ru' ? "/mp3/pause_ru.mp3" : "/mp3/pause_en.mp3",
    },
    {
      id: 2,
      title: t.items.rain,
      duration: language === 'ru' ? "15 мин" : "15 min",
      image: meditationCover,
      gradient: "linear-gradient(100deg, #FFE45A 0%, #FFD527 100%)",
      audioSrc: "/mp3/ambient.mp3",
    },
    {
      id: 3,
      title: t.items.ocean,
      duration: language === 'ru' ? "20 мин" : "20 min",
      image: meditationCover,
      gradient: "linear-gradient(100deg, #7EB6FF 0%, #4285F4 100%)",
      audioSrc: "/mp3/nature.mp3",
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = meditations[currentTrack].audioSrc;
      setCurrentTime(0);
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrack, language]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackChange = (trackIndex: number) => {
    setCurrentTrack(trackIndex);
    setIsExpanded(false);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="space-y-4">
      <h2 className="text-white">{t.title}</h2>

      <div className="backdrop-blur-xl bg-white/[0.03] rounded-3xl p-5 border border-white/[0.08] shadow-lg">
        <div className="flex gap-4 items-center mb-5">
          <div 
            className="relative w-16 h-16 rounded-full flex-shrink-0 overflow-hidden"
            style={{
              background: meditations[currentTrack].gradient
            }}
          >
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white truncate">{meditations[currentTrack].title}</h3>
            <p className="text-muted-foreground text-sm">{meditations[currentTrack].duration}</p>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-70 flex-shrink-0 mr-3"
          >
            <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-3 mb-5 pt-2 border-t border-white/[0.08]">
            {meditations.filter((_, idx) => idx !== currentTrack).map((meditation, idx) => (
              <div 
                key={meditation.id}
                className="flex gap-4 items-center p-3 rounded-2xl hover:bg-white/[0.05] transition-colors cursor-pointer"
                onClick={() => handleTrackChange(meditation.id - 1)}
              >
                <div 
                  className="relative w-12 h-12 rounded-full flex-shrink-0 overflow-hidden"
                  style={{
                    background: meditation.gradient
                  }}
                >
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm truncate">{meditation.title}</h4>
                  <p className="text-muted-foreground text-xs">{meditation.duration}</p>
                </div>
                <button 
                  className="w-9 h-9 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center transition-all hover:bg-white/15 flex-shrink-0"
                >
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2 mb-5">
          <div className="bg-white/[0.08] rounded-full h-1">
            <div 
              className="h-full rounded-full transition-all duration-100"
              style={{
                background: meditations[currentTrack].gradient,
                width: `${progress}%`
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground px-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button 
            onClick={() => setCurrentTrack(prev => prev > 0 ? prev - 1 : meditations.length - 1)}
            className="text-white hover:opacity-70 transition-opacity"
          >
            <SkipBack className="w-6 h-6" />
          </button>
          <button 
            onClick={handlePlayPause}
            className="w-14 h-14 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center transition-all hover:bg-white/15"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 text-white ml-0.5" />
            )}
          </button>
          <button 
            onClick={() => setCurrentTrack(prev => prev < meditations.length - 1 ? prev + 1 : 0)}
            className="text-white hover:opacity-70 transition-opacity"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <audio ref={audioRef} loop />
    </div>
  );
}
