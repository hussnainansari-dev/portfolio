import React from 'react';
import { CURRENTLY_LEARNING_TRACKS } from '../data/currentlyLearning';
import { Terminal, Database, BookOpen, MessageSquare, ArrowRight, Clock } from 'lucide-react';

export const CurrentlyLearning: React.FC = () => {
  const getTrackIcon = (id: string) => {
    switch (id) {
      case 'python':
        return <Terminal className="w-4 h-4 text-[#002B97]" />;
      case 'data-analytics':
        return <Database className="w-4 h-4 text-[#002B97]" />;
      case 'accounting':
        return <BookOpen className="w-4 h-4 text-[#002B97]" />;
      default:
        return <MessageSquare className="w-4 h-4 text-[#002B97]" />;
    }
  };

  return (
    <section id="learning" className="py-20 md:py-28 bg-[#F1F3F5]/60 border-b border-[#0E1730]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-[#002B97] tracking-wider mb-3">
            <span className="font-semibold">05 / ACTIVE STUDIES</span>
            <span aria-hidden="true" className="text-[#0E1730]/30">·</span>
            <span>CURRENT FOCUS & INTENT</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0E1730] text-balance">
            Currently learning, actively practicing.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#111827]/75 font-normal leading-relaxed">
            I do not claim to have finished learning any of these domains. Instead, here is a transparent
            map of what I am studying right now, what comes next, and why it matters to the bigger picture.
          </p>
        </div>

        {/* 4 Active Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CURRENTLY_LEARNING_TRACKS.map((track) => (
            <div
              key={track.id}
              className="bg-white rounded-lg border border-[#0E1730]/10 p-6 sm:p-8 flex flex-col justify-between hover:border-[#002B97]/30 transition-all shadow-[0_2px_12px_rgba(14,23,48,0.02)]"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#0E1730]/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-[#E6EDF6] flex items-center justify-center shrink-0">
                      {getTrackIcon(track.id)}
                    </div>
                    <div>
                      <h3 className="font-editorial text-2xl font-bold text-[#0E1730]">
                        {track.name}
                      </h3>
                      <span className="text-[11px] font-mono-tech text-[#002B97]">
                        {track.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono-tech text-[#111827]/50 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>{track.statusTag}</span>
                  </span>
                </div>

                {/* Active Sub-topic */}
                <div className="p-3 bg-[#F8F7F3] rounded border border-[#0E1730]/5">
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#002B97] font-bold block mb-1">
                    ACTIVE TOPIC
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#0E1730]">
                    {track.activeTopic}
                  </span>
                </div>

                {/* CURRENT / NEXT / WHY Structure */}
                <div className="space-y-4 text-xs sm:text-sm">
                  {/* CURRENT */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono-tech uppercase font-bold text-[#002B97]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#002B97]" />
                      <span>Current Focus</span>
                    </div>
                    <p className="text-[#111827]/80 pl-3 leading-relaxed">
                      {track.current}
                    </p>
                  </div>

                  {/* NEXT */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono-tech uppercase font-bold text-[#2563EB]">
                      <ArrowRight className="w-3 h-3 text-[#2563EB]" />
                      <span>Up Next</span>
                    </div>
                    <p className="text-[#111827]/80 pl-3 leading-relaxed">
                      {track.next}
                    </p>
                  </div>

                  {/* WHY */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono-tech uppercase font-bold text-[#0E1730]/70">
                      <span className="text-[11px] font-mono-tech">WHY IT MATTERS</span>
                    </div>
                    <p className="text-[#111827]/70 pl-3 italic leading-relaxed">
                      “{track.why}”
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-[#0E1730]/10 flex items-center justify-between text-xs font-mono-tech text-[#111827]/50">
                <span>Knowledge in motion</span>
                <span className="text-[#002B97]">Daily commits & notes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
