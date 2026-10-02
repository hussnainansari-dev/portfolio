import React, { useState } from 'react';
import { PROJECTS, ProjectItem } from '../data/projects';
import { ArrowRight, Github, ExternalLink, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenFinovahCaseStudy: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenFinovahCaseStudy }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'accounting' | 'data' | 'python'>('all');

  const filteredProjects = selectedFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.filterTag === selectedFilter);

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#F8F7F3] border-b border-[#0E1730]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-[#002B97] tracking-wider mb-3">
              <span className="font-semibold">04 / PROJECTS</span>
              <span aria-hidden="true" className="text-[#0E1730]/30">·</span>
              <span>PRACTICAL EVIDENCE & BUILDS</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0E1730] text-balance">
              Building systems to solidify concepts.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#111827]/75 font-normal leading-relaxed">
              Real projects are evidence of understanding. No fictional clients, inflated revenue numbers,
              or decorative mockups—only authentic academic prototypes and functional scripts.
            </p>
          </div>

          {/* Interactive Filter Tabs (allowed as functional button controls) */}
          <div className="flex items-center gap-1 p-1 bg-[#E6EDF6]/80 rounded border border-[#002B97]/20 self-start md:self-auto shrink-0 font-mono-tech text-xs">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#002B97] text-white font-semibold shadow-xs'
                  : 'text-[#0E1730]/70 hover:text-[#002B97]'
              }`}
            >
              All ({PROJECTS.length})
            </button>
            <button
              onClick={() => setSelectedFilter('accounting')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                selectedFilter === 'accounting'
                  ? 'bg-[#002B97] text-white font-semibold shadow-xs'
                  : 'text-[#0E1730]/70 hover:text-[#002B97]'
              }`}
            >
              Accounting
            </button>
            <button
              onClick={() => setSelectedFilter('data')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                selectedFilter === 'data'
                  ? 'bg-[#002B97] text-white font-semibold shadow-xs'
                  : 'text-[#0E1730]/70 hover:text-[#002B97]'
              }`}
            >
              Data
            </button>
            <button
              onClick={() => setSelectedFilter('python')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                selectedFilter === 'python'
                  ? 'bg-[#002B97] text-white font-semibold shadow-xs'
                  : 'text-[#0E1730]/70 hover:text-[#002B97]'
              }`}
            >
              Python
            </button>
          </div>
        </div>

        {/* Featured Project Showcase: FINOVAH (Top Hero Card) */}
        {selectedFilter === 'all' || selectedFilter === 'accounting' ? (
          <div className="mb-12 bg-white rounded-lg border-2 border-[#002B97]/30 p-6 sm:p-10 shadow-[0_8px_32px_rgba(0,43,151,0.06)] relative overflow-hidden">
            {/* Top Badge ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0E1730]/10 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono-tech text-xs font-bold text-white bg-[#002B97] px-2.5 py-1 rounded">
                  FEATURED PROJECT / 001
                </span>
                <span className="font-mono-tech text-xs uppercase tracking-wider text-[#2563EB] font-semibold">
                  ACTIVE BUILD / ACADEMIC PROJECT
                </span>
              </div>
              <div className="text-xs font-mono-tech text-[#111827]/60">
                Category: Accounting × Finance × Education × Product Thinking
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (Cols 1-7) */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0E1730]">
                    FINOVAH
                  </h3>
                  <p className="text-sm sm:text-base text-[#111827]/80 mt-2 leading-relaxed">
                    A student-built finance and accounting-focused digital platform concept exploring
                    practical financial understanding through interactive tools, learning modules,
                    and mathematical financial mechanics.
                  </p>
                </div>

                {/* Why & Problem Statement */}
                <div className="space-y-3 pt-2 text-xs sm:text-sm">
                  <div className="p-3.5 bg-[#F8F7F3] rounded border border-[#0E1730]/10">
                    <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#002B97] font-bold block mb-1">
                      WHY IT MATTERS:
                    </span>
                    <p className="text-[#111827]/80 leading-relaxed">
                      Most personal finance tools either treat users like seasoned corporate CFOs or
                      reduce money to gamified entertainment. FINOVAH demystifies compounding,
                      budget allocations, and net worth calculations with clear educational empathy.
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#F8F7F3] rounded border border-[#0E1730]/10">
                    <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#002B97] font-bold block mb-1">
                      WHAT I LEARNED:
                    </span>
                    <p className="text-[#111827]/80 leading-relaxed">
                      Building financial calculators requires mastering the exact equations (time value
                      of money, periodic compounding) before writing any interface code. Precision is mandatory.
                    </p>
                  </div>
                </div>

                {/* Tools & Status */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-mono-tech text-[#111827]/60 mr-2">Tools:</span>
                  {['Financial Formulas', 'TypeScript', 'React', 'Tailwind CSS', 'Figma'].map((tool, tIdx) => (
                    <span key={tool} className="text-xs font-mono-tech text-[#0E1730]">
                      {tool}
                      {tIdx < 4 && <span aria-hidden="true" className="text-[#0E1730]/20 ml-2">/</span>}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={onOpenFinovahCaseStudy}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-mono-tech uppercase font-semibold text-white bg-[#002B97] hover:bg-[#0E1730] rounded transition-all cursor-pointer shadow-xs"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenFinovahCaseStudy}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-mono-tech uppercase font-semibold text-[#002B97] bg-[#E6EDF6] hover:bg-[#002B97] hover:text-white rounded border border-[#002B97]/20 transition-all cursor-pointer"
                  >
                    <span>Launch Live Engine</span>
                  </button>

                  <a
                    href="https://github.com/hussnainali45"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono-tech text-[#111827]/70 hover:text-[#002B97] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub →</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Architectural Highlights Box (Cols 8-12) */}
              <div className="lg:col-span-5 bg-[#F8F7F3] rounded-lg p-6 border border-[#0E1730]/10 space-y-4">
                <span className="font-mono-tech text-xs uppercase tracking-wider text-[#002B97] font-semibold block">
                  MODULES IN THE PROTOTYPE
                </span>

                <div className="space-y-3 font-mono-tech text-xs">
                  <div className="p-3 bg-white rounded border border-[#0E1730]/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#0E1730] block">
                        Compound Growth Calculator
                      </span>
                      <span className="text-[11px] text-[#111827]/70">
                        Monthly contribution sensitivity, interest vs. principal split.
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded border border-[#0E1730]/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#0E1730] block">
                        50/30/20 Budget Allocator
                      </span>
                      <span className="text-[11px] text-[#111827]/70">
                        Categorizes needs, wants, and savings dynamically by monthly income.
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded border border-[#0E1730]/5 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#0E1730] block">
                        Personal Balance Sheet Schema
                      </span>
                      <span className="text-[11px] text-[#111827]/70">
                        Liquid assets, short-term debt, and net worth variance tracking.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-mono-tech text-[11px] text-[#111827]/60 block italic">
                    * Interactive simulator embedded in case study modal.
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Secondary Project Archive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects
            .filter((p) => p.id !== 'finovah')
            .map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg border border-[#0E1730]/10 p-6 sm:p-8 flex flex-col justify-between hover:border-[#002B97]/30 transition-all shadow-[0_2px_12px_rgba(14,23,48,0.02)]"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-[#0E1730]/10 pb-4 mb-4">
                    <span className="font-mono-tech text-xs text-[#002B97] font-semibold">
                      {project.number}
                    </span>
                    <span className="font-mono-tech text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#E6EDF6] text-[#002B97] font-bold">
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div className="space-y-1">
                    <h3 className="font-editorial text-2xl font-bold text-[#0E1730]">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono-tech text-[#002B97] font-medium">
                      {project.category}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm text-[#111827]/80 leading-relaxed">
                    {project.why}
                  </p>

                  {/* Problem & Approach */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="p-3 bg-[#F8F7F3] rounded border border-[#0E1730]/5">
                      <span className="font-mono-tech font-bold text-[#002B97] block mb-0.5">
                        Approach:
                      </span>
                      <p className="text-[#111827]/75 leading-relaxed">{project.approach}</p>
                    </div>

                    <div className="p-3 bg-[#F8F7F3] rounded border border-[#0E1730]/5">
                      <span className="font-mono-tech font-bold text-[#002B97] block mb-0.5">
                        Key Lesson:
                      </span>
                      <p className="text-[#111827]/75 leading-relaxed">{project.learned}</p>
                    </div>
                  </div>

                  {/* Tools */}
                  <div className="mt-4 pt-3 border-t border-[#0E1730]/5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono-tech text-[#111827]/50 mr-1">Tools:</span>
                    {project.tools.map((tool, idx) => (
                      <span key={tool} className="text-[11px] font-mono-tech text-[#0E1730]">
                        {tool}
                        {idx < project.tools.length - 1 && (
                          <span aria-hidden="true" className="text-[#0E1730]/20 ml-1.5 mr-0.5">/</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-[#0E1730]/10 flex items-center justify-between">
                  <a
                    href={project.links.github || 'https://github.com/hussnainali45'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-semibold text-[#002B97] hover:text-[#0E1730] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository →</span>
                  </a>

                  <span className="text-[11px] font-mono-tech text-[#111827]/50">
                    {project.output.split(' ')[0]} Verified
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
