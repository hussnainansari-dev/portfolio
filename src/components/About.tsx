import React from 'react';
import { BookOpen, Compass, Target, GraduationCap, MapPin, Briefcase, Download, FileText } from 'lucide-react';
import profilePortrait from '../assets/images/hussnain_portrait_1790809063651.jpg';
import { SITE_CONFIG } from '../data/social';

interface AboutProps {
  onOpenResumeModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResumeModal }) => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#F8F7F3] border-b border-[#0E1730]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-[#002B97] tracking-wider mb-3">
            <span className="font-semibold">01 / ABOUT</span>
            <span aria-hidden="true" className="text-[#0E1730]/30">·</span>
            <span>FOUNDATION & PRACTICAL GROUNDING</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0E1730] text-balance">
            A student, but not standing still.
          </h2>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Authentic Editorial Identity Card with Official Portrait (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-lg border border-[#0E1730]/10 p-6 sm:p-7 shadow-[0_4px_24px_rgba(14,23,48,0.03)] relative overflow-hidden">
              {/* Subtle top brand bar */}
              <div className="h-1.5 bg-[#002B97] -mx-7 -mt-7 mb-6" />

              {/* Official Profile Portrait — Subtly rounded editorial frame */}
              <div className="relative mb-5 rounded-lg overflow-hidden border-2 border-[#002B97]/20 bg-[#F1F3F5] aspect-[3/4] max-w-sm mx-auto shadow-xs group">
                <img
                  src={profilePortrait}
                  alt="Hussnain Ansari — Professional Portrait"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                />

                {/* Editorial photo caption overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0E1730]/90 via-[#0E1730]/60 to-transparent p-4 text-white">
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#2563EB] font-bold block mb-0.5">
                    HUSSNAIN ANSARI
                  </span>
                  <p className="font-editorial text-sm font-semibold tracking-wide">
                    Accounting & Finance × Business × Data
                  </p>
                  <span className="font-mono-tech text-[10px] text-white/70 block mt-0.5">
                    Lahore, Pakistan · Student & Documenter
                  </span>
                </div>
              </div>

              {/* Verified Identity & Academic Meta */}
              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-editorial text-2xl font-bold text-[#0E1730]">
                    Hussnain Ansari
                  </h3>
                  <span className="text-xs font-mono-tech text-[#002B97] font-semibold">
                    Expected 2027
                  </span>
                </div>
                <p className="text-xs font-mono-tech uppercase tracking-wider text-[#002B97] font-semibold">
                  ADP Accounting & Finance Student · Aspiring Business & Data Analyst
                </p>
                <p className="text-[11px] font-mono-tech text-[#111827]/50 pt-0.5">
                  Academic Record / Identity: Hussnain Ali
                </p>
              </div>

              {/* Detailed Metadata Grid */}
              <div className="mt-5 pt-5 border-t border-[#0E1730]/10 space-y-2.5 font-mono-tech text-xs">
                <div className="flex items-start justify-between">
                  <span className="text-[#111827]/60">INSTITUTION</span>
                  <span className="text-[#0E1730] font-medium text-right">University of Central Punjab (UCP)</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[#111827]/60">STATUS</span>
                  <span className="text-[#0E1730] font-medium text-right">2nd Semester Completed</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[#111827]/60">PREVIOUS</span>
                  <span className="text-[#0E1730] font-medium text-right">I.Com · Punjab Group of Colleges</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[#111827]/60">LOCATION</span>
                  <span className="text-[#0E1730] font-medium text-right">{SITE_CONFIG.location}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-[#111827]/60">PHONE</span>
                  <span className="text-[#002B97] font-semibold text-right">{SITE_CONFIG.phone}</span>
                </div>
              </div>

              {/* Direct Actions: Download Resume & View CV */}
              <div className="mt-6 pt-5 border-t border-[#0E1730]/10 space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={SITE_CONFIG.resumePdfPath}
                    download="Hussnain_Ansari_Resume.pdf"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-[#002B97] hover:bg-[#0E1730] text-white text-xs font-mono-tech uppercase font-bold rounded transition-colors shadow-xs whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Resume (PDF)</span>
                  </a>

                  <button
                    onClick={onOpenResumeModal}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#E6EDF6] hover:bg-[#002B97] hover:text-white text-[#002B97] text-xs font-mono-tech uppercase font-semibold rounded border border-[#002B97]/20 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View CV</span>
                  </button>
                </div>

                <div className="text-center pt-1 text-[11px] font-mono-tech text-[#111827]/50">
                  Official PDF Document · Verified 2026 Edition
                </div>
              </div>
            </div>

            {/* Core Philosophy Card */}
            <div className="p-6 bg-[#0E1730] rounded-lg text-white space-y-3 shadow-md">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#2563EB] font-bold block">
                CORE MOTTO
              </span>
              <p className="font-editorial text-lg italic text-[#F8F7F3] leading-relaxed">
                “Learning · Practicing · Building · Documenting”
              </p>
              <p className="text-xs text-[#E6EDF6]/75 leading-relaxed font-sans">
                I am currently building the foundation. My goal is not to rush into an inflated title,
                but to develop the rigorous knowledge, hands-on evidence, and practical ability behind it.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Editorial Narrative Chapters + Real Work History (Cols 6-12) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Chapter 1: Who I Am */}
            <div className="space-y-3 pb-8 border-b border-[#0E1730]/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#E6EDF6] text-[#002B97] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#0E1730]">
                  01. Who I Am
                </h3>
              </div>
              <div className="pl-11 space-y-3 text-sm sm:text-base text-[#111827]/85 leading-relaxed font-sans">
                <p>
                  I am an Accounting & Finance student enrolled in the Associate Degree Program (ADP)
                  at the University of Central Punjab (UCP) in Lahore. Having completed my second semester
                  and with expected graduation in 2027, I am deliberately building a bridge between
                  financial theory, commercial operations, and programmatic data analytics.
                </p>
                <p>
                  Alongside my academic coursework, I bring <strong>1.5 years of professional call center experience</strong> at ODS,
                  6 months of hands-on graphic design and customer sales at 3H Printing Shop, and bilingual data entry experience
                  at Arshad Associates. This background gave me practical discipline in customer communication, numerical accuracy,
                  and working within deadline-driven environments.
                </p>
              </div>
            </div>

            {/* Chapter 2: Real Practical Work Experience */}
            <div className="space-y-4 pb-8 border-b border-[#0E1730]/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#E6EDF6] text-[#002B97] flex items-center justify-center shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#0E1730]">
                  02. Real Practical Experience
                </h3>
              </div>
              <div className="pl-11 space-y-4">
                {/* Job 1: ODS */}
                <div className="p-4 bg-white rounded border border-[#0E1730]/10">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <span className="font-bold text-sm text-[#0E1730]">
                      Call Center Agent — ODS
                    </span>
                    <span className="font-mono-tech text-xs text-[#002B97] font-semibold">
                      1.5 Years · Customer Service
                    </span>
                  </div>
                  <p className="text-xs text-[#111827]/80 leading-relaxed font-sans">
                    Handled high-volume customer interactions professionally across routine service inquiries.
                    Honed active listening, conflict resolution, and working under strict targets while upholding quality.
                  </p>
                </div>

                {/* Job 2: 3H Printing */}
                <div className="p-4 bg-white rounded border border-[#0E1730]/10">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <span className="font-bold text-sm text-[#0E1730]">
                      Graphic Designer & Sales Assistant — 3H Printing Shop
                    </span>
                    <span className="font-mono-tech text-xs text-[#002B97] font-semibold">
                      6 Months · Sales & Design
                    </span>
                  </div>
                  <p className="text-xs text-[#111827]/80 leading-relaxed font-sans">
                    Prepared client design work, supported printing requirements, guided customer product selections,
                    and experienced front-line commercial shop operations.
                  </p>
                </div>

                {/* Job 3: Arshad Associates */}
                <div className="p-4 bg-white rounded border border-[#0E1730]/10">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <span className="font-bold text-sm text-[#0E1730]">
                      Data Entry Operator (InPage) — Arshad Associates
                    </span>
                    <span className="font-mono-tech text-xs text-[#002B97] font-semibold">
                      4 Months · Verification
                    </span>
                  </div>
                  <p className="text-xs text-[#111827]/80 leading-relaxed font-sans">
                    Performed Urdu and English document formatting and data entry with strict attention to typographical consistency
                    and error-free recording.
                  </p>
                </div>
              </div>
            </div>

            {/* Chapter 3: How I Think */}
            <div className="space-y-3 pb-8 border-b border-[#0E1730]/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#E6EDF6] text-[#002B97] flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#0E1730]">
                  03. How I Think
                </h3>
              </div>
              <div className="pl-11 space-y-3 text-sm sm:text-base text-[#111827]/85 leading-relaxed font-sans">
                <p className="font-medium text-[#002B97] font-mono-tech">
                  “Excel → SQL → Power BI → Python → Data Analysis → Business Understanding”
                </p>
                <p>
                  I believe data is blind without business domain context, and accounting is paralyzed
                  without modern data tooling. My analytical philosophy begins with commercial reality:
                  What drives the revenue? Where does working capital get trapped? Which metrics directly impact solvency?
                </p>
                <p>
                  I prioritize evidence over speculation. When I study Python variables or SQL join algorithms,
                  I connect the code directly to financial ledger records or customer transaction tables.
                </p>
              </div>
            </div>

            {/* Chapter 4: Where I'm Going */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#E6EDF6] text-[#002B97] flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#0E1730]">
                  04. Where I’m Going
                </h3>
              </div>
              <div className="pl-11 space-y-3 text-sm sm:text-base text-[#111827]/85 leading-relaxed font-sans">
                <p>
                  My long-term direction is to operate at the intersection of <strong>financial understanding,
                  data analytics, and business decision-making</strong>.
                </p>
                <p>
                  I am actively developing <strong>FINOVAH</strong>, an educational personal finance platform
                  concept, while rigorously maintaining my public learning log. I openly record what I learn,
                  what challenges me, and how my understanding evolves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
