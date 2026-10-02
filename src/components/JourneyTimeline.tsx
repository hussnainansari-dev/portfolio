import React from 'react';
import { JOURNEY_STEPS } from '../data/journeyTimeline';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const JourneyTimeline: React.FC = () => {
  return (
    <section id="journey" className="py-20 md:py-28 bg-[#F1F3F5]/60 border-b border-[#0E1730]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-[#002B97] tracking-wider mb-3">
            <span className="font-semibold">02 / JOURNEY</span>
            <span aria-hidden="true" className="text-[#0E1730]/30">·</span>
            <span>DEVELOPMENT TIMELINE</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0E1730] text-balance">
            The progression of understanding.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#111827]/75 font-normal leading-relaxed">
            A structured research timeline charting the evolution from fundamental accounting principles
            to business acumen, data analytics, programmatic tooling, and active builds.
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-px bg-gradient-to-b from-[#002B97] via-[#2563EB] to-[#0E1730]/20" />

          <div className="space-y-8 md:space-y-12">
            {JOURNEY_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="relative md:pl-20 group"
              >
                {/* Desktop Step Pin */}
                <div className="hidden md:flex absolute left-5 top-5 -translate-x-1/2 w-7 h-7 rounded bg-white border-2 border-[#002B97] items-center justify-center font-mono-tech text-xs font-bold text-[#002B97] group-hover:bg-[#002B97] group-hover:text-white transition-colors shadow-xs z-10">
                  {step.number}
                </div>

                {/* Timeline Card */}
                <div className="bg-white rounded-lg border border-[#0E1730]/10 p-6 sm:p-8 hover:border-[#002B97]/30 transition-all duration-200 shadow-[0_2px_12px_rgba(14,23,48,0.02)]">
                  {/* Top Header */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#0E1730]/10 pb-4 mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className="md:hidden font-mono-tech text-xs font-bold px-2 py-0.5 bg-[#002B97] text-white rounded">
                        {step.number}
                      </span>
                      <span className="font-mono-tech text-xs uppercase tracking-wider text-[#002B97] font-semibold">
                        STAGE / {step.stage}
                      </span>
                    </div>
                    <span className="text-xs font-mono-tech text-[#111827]/50">
                      MILESTONE {step.number} OF 06
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0E1730]">
                      {step.title}
                    </h3>
                    <p className="text-sm font-medium text-[#002B97]">
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm sm:text-base text-[#111827]/80 leading-relaxed max-w-4xl">
                    {step.description}
                  </p>

                  {/* Key Mental Shift */}
                  <div className="mt-5 p-3.5 bg-[#F8F7F3] rounded border border-[#0E1730]/5 flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 text-[#002B97] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono-tech uppercase tracking-wider text-[#002B97] font-bold block mb-0.5">
                        Key Conceptual Shift:
                      </span>
                      <span className="text-xs sm:text-sm text-[#0E1730] font-medium">
                        {step.keyShift}
                      </span>
                    </div>
                  </div>

                  {/* Artifacts / Evidence */}
                  <div className="mt-5 pt-4 border-t border-[#0E1730]/5 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono-tech text-[#111827]/50 mr-2">
                      Evidence & Focus:
                    </span>
                    {step.artifacts.map((artifact, aIdx) => (
                      <span
                        key={artifact}
                        className="inline-flex items-center gap-1.5 text-xs text-[#0E1730] font-mono-tech"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#2563EB]" />
                        <span>{artifact}</span>
                        {aIdx < step.artifacts.length - 1 && (
                          <span aria-hidden="true" className="text-[#0E1730]/20 ml-2">/</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
