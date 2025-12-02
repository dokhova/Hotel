import React from 'react';
import { Flower2, Sparkles } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: 'yoga' | 'spa';
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <button className="group relative bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-3xl p-6 hover:from-gray-700/80 hover:to-gray-600/80 transition-all overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
      
      <div className="relative flex flex-col items-start gap-3 h-32">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center">
          {icon === 'yoga' ? (
            <Flower2 className="w-6 h-6 text-orange-400" />
          ) : (
            <Sparkles className="w-6 h-6 text-pink-400" />
          )}
        </div>
        <div className="text-left">
          <h3 className="text-white mb-1">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </button>
  );
}
