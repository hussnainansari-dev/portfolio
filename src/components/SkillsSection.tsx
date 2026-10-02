import React from 'react';
import { SKILL_CATEGORIES, SkillStatus } from '../data/skills';
import { BookOpen, Database, Sparkles } from 'lucide-react';

const statusBadgeStyles: Record<SkillStatus, { bg: string; text: string; border: string }> = {
  APPLIED: {
    bg: 'bg-[#002B97]',
    text: 'text-white',
    border: 'border-[#002B97]'
  },
  'WORKING KNOWLEDGE': {
    bg: 'bg-[#2563EB]',
    text: 'text-white',
    border: 'border-[#2563EB]'
  },
  PRACTICING: {
    bg: 'bg-[#E6EDF6]',
    text: 'text-[#002B97]',
    border: 'border-[#002B97]/30'
  },
  DEVELOPING: {
    bg: 'bg-[#F1F3F5]',
    text: 'text-[#0E1730]',
    border: 'border-[#0E1730]/20'
  },
  LEARNING: {
    bg: 'bg-white',
    text: 'text-[#111827]/80',
    border: 'border-dashed border-[#0E1730]/30'
  }
};

export const SkillsSection: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'accounting-business':
        return <BookOpen className="w-4 h-4 text-[#002B97]" />;
      case 'data-technology':
        return <Database className="w-4 h-4 text-[#002B97]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#002B97]" />;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-[#F8F7F3] border-b border-[#0E1730]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-[#002B97] tracking-wider mb-3">
            <span className="font-semibold">03 / CAPABILITIES</span>
            <span aria-hidden="true" className="text-[#0E1730]/30">·</span>
            <span>HONEST DEVELOPMENTAL TAXONOMY</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0E1730] text-balance">
            Evidence over arbitrary percentages.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#111827]/75 font-normal leading-relaxed">
            Skills are qualitative capabilities under continuous refinement, not arbitrary percentages.
            Every tool is classified by its authentic stage of practical application.
          </p>
        </div>

        {/* Legend */}
        <div className="mb-10 p-4 bg-white rounded-lg border border-[#0E1730]/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech">
          <span className="text-[#0E1730] font-semibold uppercase tracking-wider">
            Proficiency Legend:
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {(
              ['APPLIED', 'WORKING KNOWLEDGE', 'PRACTICING', 'DEVELOPING', 'LEARNING'] as SkillStatus[]
            ).map((st) => {
              const style = statusBadgeStyles[st];
              return (
                <div key={st} className="flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded border ${style.bg} ${style.text} ${style.border}`}
                  >
                    {st}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Major Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-lg border border-[#0E1730]/10 p-6 sm:p-7 flex flex-col justify-between hover:border-[#002B97]/30 transition-all duration-150 shadow-[0_2px_12px_rgba(14,23,48,0.02)]"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-2.5 pb-4 border-b border-[#0E1730]/10 mb-4">
                  <div className="w-7 h-7 rounded bg-[#E6EDF6] flex items-center justify-center shrink-0">
                    {getIcon(cat.id)}
                  </div>
                  <h3 className="font-editorial text-xl font-bold text-[#0E1730]">
                    {cat.title}
                  </h3>
                </div>

                <p className="text-xs text-[#111827]/70 leading-relaxed mb-6">
                  {cat.description}
                </p>

                {/* Skill List */}
                <div className="space-y-4">
                  {cat.skills.map((skill) => {
                    const badge = statusBadgeStyles[skill.status];
                    return (
                      <div
                        key={skill.name}
                        className="p-3 bg-[#F8F7F3] rounded border border-[#0E1730]/5 hover:border-[#002B97]/20 transition-colors"
                      >
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <span className="font-semibold text-xs sm:text-sm text-[#0E1730]">
                            {skill.name}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 text-[9px] font-mono-tech font-bold rounded border ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            {skill.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#111827]/70 leading-snug">
                          {skill.context}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#0E1730]/10 text-[11px] font-mono-tech text-[#002B97]">
                Continuous revision cycle
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
