import React from 'react';
import { ArrowRight, ArrowDownRight, MapPin, Sparkles, Download } from 'lucide-react';
import { ProfilePhoto } from './ProfilePhoto';
import { SITE_CONFIG } from '../data/social';

interface HeroProps {
  onExploreJourney: () => void;
  onViewProjects: () => void;
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreJourney, onViewProjects, onOpenResumeModal }) => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-[#F8F7F3] border-b border-[#0E1730]/10 overflow-hidden bg-grid-subtle">
      {/* Decorative subtle hairline accents */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-[#002B97]/5 hidden md:block" />
      <div className="absolute top-0 right-12 w-px h-full bg-[#002B97]/5 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Editorial Statement (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            {/* Eyebrow metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech tracking-wider uppercase text-[#002B97]">
              <span className="font-semibold">00 / INTRO</span>
              <span aria-hidden="true" className="text-[#0E1730]/30">·</span>
              <span>ACCOUNTING & FINANCE × BUSINESS × DATA</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0E1730] leading-[1.08] text-balance">
                Understanding Numbers.{' '}
                <span className="text-[#002B97] block sm:inline">Building with Data.</span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#111827]/80 max-w-2xl font-normal leading-relaxed font-sans">
              ADP Accounting & Finance student at UCP exploring the intersection of business understanding,
              data analytics, and practical technology — one project at a time.
            </p>

            {/* Location & Status Plate */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono-tech text-[#111827]/75 pt-2">
              <div className="flex items-center gap-1.5 text-[#0E1730]">
                <MapPin className="w-3.5 h-3.5 text-[#002B97]" />
                <span className="font-medium">{SITE_CONFIG.location}</span>
              </div>
              <span aria-hidden="true" className="text-[#0E1730]/20">·</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>Learning · Practicing · Building · Documenting</span>
              </div>
              <span aria-hidden="true" className="text-[#0E1730]/20">·</span>
              <span>Expected 2027</span>
            </div>

            {/* Action Buttons: Download Resume PDF, Live Journey, and Projects */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {/* Prominent Download Resume Button — Real Committed PDF Asset */}
              <a
                href={SITE_CONFIG.resumePdfPath}
                download="Hussnain_Ansari_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-mono-tech uppercase font-bold text-white bg-[#002B97] hover:bg-[#0E1730] rounded transition-all duration-150 shadow-sm whitespace-nowrap"
                title="Download the official PDF resume"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>

              <button
                onClick={onExploreJourney}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-mono-tech uppercase font-semibold text-[#002B97] bg-[#E6EDF6] hover:bg-[#002B97] hover:text-white rounded border border-[#002B97]/20 transition-all duration-150 cursor-pointer whitespace-nowrap"
              >
                <span>Live Learning Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onViewProjects}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-mono-tech uppercase font-semibold text-[#0E1730] bg-white hover:bg-[#F1F3F5] rounded border border-[#0E1730]/15 transition-all duration-150 cursor-pointer whitespace-nowrap"
              >
                <span>Projects</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>
            </div>

            {/* Core Epigram */}
            <div className="pt-6 border-t border-[#0E1730]/10 max-w-xl">
              <blockquote className="font-editorial text-lg italic text-[#0E1730]/90 leading-snug">
                “Accounting gives me the language of business. Data helps me understand what that business is saying.”
              </blockquote>
            </div>
          </div>

          {/* Right Column: Knowledge System Diagram with Canonical Profile Photo (Cols 8-12) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg p-6 sm:p-7 border border-[#0E1730]/10 shadow-[0_4px_24px_rgba(14,23,48,0.04)] relative">
              {/* Card Header with Canonical Photo Plate */}
              <div className="flex items-center justify-between border-b border-[#0E1730]/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <ProfilePhoto
                    size="md"
                    eager={true}
                    className="border-2 border-[#002B97] shadow-xs"
                    alt="Hussnain Ansari — Professional Portrait"
                  />
                  <div>
                    <span className="font-editorial text-base font-bold text-[#0E1730] leading-none block">
                      Hussnain Ansari
                    </span>
                    <span className="text-[11px] text-[#002B97] font-mono-tech">
                      UCP Lahore · Expected 2027
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 font-mono-tech text-[10px] text-[#002B97] bg-[#E6EDF6] px-2 py-0.5 rounded font-semibold">
                  <Sparkles className="w-3 h-3" />
                  <span>ACTIVE JOURNEY</span>
                </div>
              </div>

              {/* Step Sequence Flow */}
              <div className="space-y-3 relative">
                <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-[#002B97] via-[#2563EB] to-[#E6EDF6]" />

                {[
                  {
                    code: '01',
                    label: 'ACCOUNTING',
                    sub: 'Commercial language, double-entry, financial statements',
                    tag: 'FOUNDATION',
                    color: 'bg-[#002B97] text-white'
                  },
                  {
                    code: '02',
                    label: 'FINANCE',
                    sub: 'Time value of money, working capital & solvency',
                    tag: 'LEARN',
                    color: 'bg-[#002B97] text-white'
                  },
                  {
                    code: '03',
                    label: 'BUSINESS',
                    sub: 'Customer service, operations, commercial trade-offs',
                    tag: 'PRACTICE',
                    color: 'bg-[#2563EB] text-white'
                  },
                  {
                    code: '04',
                    label: 'DATA',
                    sub: 'Relational logic, SQL queries, spreadsheet hygiene',
                    tag: 'EXPERIMENT',
                    color: 'bg-[#2563EB] text-white'
                  },
                  {
                    code: '05',
                    label: 'PYTHON',
                    sub: 'Programmatic thinking, automation, data structures',
                    tag: 'BUILD',
                    color: 'bg-[#0E1730] text-white'
                  },
                  {
                    code: '06',
                    label: 'PROJECTS & ARCHIVE',
                    sub: 'FINOVAH, analytical models, learning in public',
                    tag: 'DOCUMENT',
                    color: 'bg-[#0E1730] text-white'
                  }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 pl-1 group"
                  >
                    <div
                      className={`w-7 h-7 rounded-sm flex items-center justify-center font-mono-tech text-[10px] font-bold shrink-0 z-10 ${
                        item.color
                      } shadow-xs`}
                    >
                      {item.code}
                    </div>

                    <div className="grow bg-[#F8F7F3] rounded p-2.5 border border-[#0E1730]/5 group-hover:border-[#002B97]/30 transition-colors">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-mono-tech font-bold text-xs text-[#0E1730] tracking-tight">
                          {item.label}
                        </span>
                        <span className="font-mono-tech text-[9px] uppercase tracking-wider text-[#002B97] font-semibold">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#111827]/70 mt-0.5 line-clamp-1">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Card Summary */}
              <div className="mt-6 pt-4 border-t border-[#0E1730]/10 flex items-center justify-between text-[11px] font-mono-tech text-[#111827]/60">
                <span>Numbers → Data → Decisions</span>
                <span className="text-[#002B97] font-semibold">IMPROVE DAILY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
