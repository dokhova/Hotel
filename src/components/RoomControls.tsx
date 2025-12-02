import { Lightbulb, Tv, Wind, Wifi } from "lucide-react";
import { useState } from "react";

interface ControlButtonProps {
  icon: React.ReactNode;
  label: string;
  isOn: boolean;
  onToggle: () => void;
}

function ControlButton({ icon, label, isOn, onToggle }: ControlButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative rounded-3xl p-5 transition-all backdrop-blur-xl border shadow-lg ${
        isOn
          ? "bg-primary/10 border-primary/30"
          : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05]"
      }`}
    >
      <div className="flex flex-col items-start space-y-3">
        <div className="flex items-center justify-between w-full">
          <div className={`${isOn ? "text-primary" : "text-white"}`}>{icon}</div>
          <div className="relative">
            <div
              className={`w-11 h-6 rounded-full transition-colors ${
                isOn ? "bg-primary" : "bg-white/10"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                  isOn ? "translate-x-6 bg-black" : "translate-x-1 bg-white"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="text-left">
          <p className={`text-xs ${isOn ? "text-primary" : "text-muted-foreground"}`}>
            {isOn ? "ON" : "OFF"}
          </p>
          <p className="text-white mt-1">{label}</p>
        </div>
      </div>
    </button>
  );
}

export function RoomControls() {
  const [lights, setLights] = useState(true);
  const [tv, setTv] = useState(false);
  const [ac, setAc] = useState(false);
  const [wifi, setWifi] = useState(true);

  return (
    <div className="space-y-4">
      <h2 className="text-white">Управление номером</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <ControlButton
          icon={<Lightbulb className="w-6 h-6" />}
          label="Освещение"
          isOn={lights}
          onToggle={() => setLights(!lights)}
        />
        <ControlButton
          icon={<Tv className="w-6 h-6" />}
          label="Smart TV"
          isOn={tv}
          onToggle={() => setTv(!tv)}
        />
        <ControlButton
          icon={<Wind className="w-6 h-6" />}
          label="Кондиционер"
          isOn={ac}
          onToggle={() => setAc(!ac)}
        />
        <ControlButton
          icon={<Wifi className="w-6 h-6" />}
          label="Wi-Fi"
          isOn={wifi}
          onToggle={() => setWifi(!wifi)}
        />
      </div>
    </div>
  );
}