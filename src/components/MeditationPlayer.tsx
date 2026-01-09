import { Play, Pause, ChevronDown, ChevronUp } from "lucide-react";
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
      subtitle: language === 'ru' ? "Медитация" : "Meditation",
      duration: language === 'ru' ? "10 мин" : "10 min",
      image: meditationCover,
      gradient: "linear-gradient(100deg, #A8D531 0%, #34A853 100%)",
      audioSrc: language === 'ru' ? "/mp3/pause_ru.mp3" : "/mp3/pause_en.mp3",
    },
    {
      id: 2,
      title: t.items.rain,
      subtitle: language === 'ru' ? "Звуки природы" : "Nature Sounds",
      duration: language === 'ru' ? "15 мин" : "15 min",
      image: meditationCover,
      gradient: "linear-gradient(100deg, #FFE45A 0%, #FFD527 100%)",
      audioSrc: "/mp3/ambient.mp3",
    },
    {
      id: 3,
      title: t.items.ocean,
      subtitle: language === 'ru' ? "Звуки природы" : "Nature Sounds",
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

      <div className="backdrop-blur-xl bg-white/[0.03] rounded-3xl border border-white/[0.08] shadow-lg overflow-hidden">
        {/* Compact Header */}
        <div className="w-full p-4 space-y-3">
          <div className="flex items-center gap-4">
            {/* Play Button */}
            <button 
              onClick={handlePlayPause}
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105"
              style={{
                background: meditations[currentTrack].gradient
              }}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" fill="white" />
              ) : (
                <Play className="w-5 h-5 text-white" fill="white" />
              )}
            </button>
            
            {/* Track Info - Clickable area to expand */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-1 min-w-0 text-left hover:opacity-80 transition-opacity"
            >
              <h3 className="text-white font-medium truncate">{meditations[currentTrack].title}</h3>
              <p className="text-muted-foreground text-sm">{meditations[currentTrack].subtitle}</p>
            </button>
            
            {/* Expand Icon */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-shrink-0 hover:opacity-70 transition-opacity"
            >
              {isExpanded ? (
                <ChevronUp className="w-6 h-6 text-white/50" />
              ) : (
                <ChevronDown className="w-6 h-6 text-white/50" />
              )}
            </button>
          </div>
          
          {/* Progress Bar - Always visible */}
          <div className="space-y-1.5">
            <div className="bg-white/[0.08] rounded-full h-1.5 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                if (audioRef.current && duration) {
                  audioRef.current.currentTime = percent * duration;
                }
              }}
            >
              <div 
                className="h-full rounded-full transition-all duration-100"
                style={{
                  background: meditations[currentTrack].gradient,
                  width: `${progress}%`
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-0.5">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-4 pb-4 space-y-4">
            {/* Track List */}
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              {meditations.map((meditation, idx) => (
                <button
                  key={meditation.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                    idx === currentTrack 
                      ? 'bg-white/[0.08]' 
                      : 'hover:bg-white/[0.05]'
                  }`}
                  onClick={() => handleTrackChange(idx)}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: meditation.gradient
                    }}
                  >
                    {idx === currentTrack && isPlaying ? (
                      <Pause className="w-4 h-4 text-white" fill="white" />
                    ) : (
                      <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="text-white text-sm truncate">{meditation.title}</h4>
                    <p className="text-muted-foreground text-xs">{meditation.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <audio ref={audioRef} loop />
    </div>
  );
}