import React from 'react';
import { X, Printer, Download, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { RESUME_DATA } from '../data/resume';
import { SITE_CONFIG } from '../data/social';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0E1730]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl max-h-[95vh] rounded-lg shadow-2xl border border-[#0E1730]/20 flex flex-col overflow-hidden my-auto print:border-none print:shadow-none print:max-h-none print:w-full">
        {/* Modal Action Header (hidden in print) */}
        <div className="bg-[#0E1730] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0 no-print">
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs text-[#E6EDF6] uppercase tracking-wider font-semibold">
              CURRICULUM VITAE / OFFICIAL FACT SHEET
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Real PDF Asset Download */}
            <a
              href={SITE_CONFIG.resumePdfPath}
              download="Hussnain_Ansari_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002B97] hover:bg-[#2563EB] text-white text-xs font-mono-tech uppercase font-semibold rounded transition-colors whitespace-nowrap"
              title="Download official PDF resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF File</span>
            </a>

            {/* Print / Save as PDF button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono-tech uppercase font-semibold rounded transition-colors cursor-pointer whitespace-nowrap"
              title="Print directly or save as PDF via system print dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save as PDF</span>
              <span className="sm:hidden">Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
              aria-label="Close Resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Editorial Document */}
        <div className="overflow-y-auto p-8 sm:p-12 space-y-8 text-[#111827] bg-[#FFFFFF] font-sans">
          {/* Header Block */}
          <div className="border-b-2 border-[#0E1730] pb-6 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0E1730]">
                  {SITE_CONFIG.name}
                </h1>
                <span className="text-xs font-mono-tech text-[#111827]/50 block">
                  Official Academic Identity: {SITE_CONFIG.academicIdentity}
                </span>
              </div>
              <span className="font-mono-tech text-xs text-[#002B97] font-semibold">
                {SITE_CONFIG.location.toUpperCase()}
              </span>
            </div>

            <p className="text-sm font-semibold text-[#002B97] font-mono-tech">
              {SITE_CONFIG.professionalTitle}
            </p>

            {/* Contact links */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 pt-2 text-xs font-mono-tech text-[#111827]/75">
              <span>{SITE_CONFIG.phone}</span>
              <span aria-hidden="true" className="text-[#0E1730]/20">·</span>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hover:text-[#002B97] transition-colors font-medium text-[#002B97]"
              >
                {SITE_CONFIG.email}
              </a>
              <span aria-hidden="true" className="text-[#0E1730]/20">·</span>
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#002B97] transition-colors"
              >
                LinkedIn Profile
              </a>
              <span aria-hidden="true" className="text-[#0E1730]/20">·</span>
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#002B97] transition-colors"
              >
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Profile Statement */}
          <div className="space-y-2">
            <h2 className="font-mono-tech text-xs uppercase tracking-wider text-[#002B97] font-bold border-b border-[#0E1730]/10 pb-1">
              PROFILE & PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-[#111827]/85 leading-relaxed font-sans">
              {RESUME_DATA.summary}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-4 print-break-inside-avoid">
            <h2 className="font-mono-tech text-xs uppercase tracking-wider text-[#002B97] font-bold border-b border-[#0E1730]/10 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-4">
              {RESUME_DATA.education.map((edu, idx) => (
                <div key={idx} className="space-y-1 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-bold text-[#0E1730] text-sm sm:text-base">
                      {edu.degree}
                    </span>
                    <span className="font-mono-tech text-xs text-[#002B97] font-semibold">
                      {edu.period} · {edu.status}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[#111827]/80">
                    {edu.institution}, {edu.location}
                  </div>
                  {edu.focus && (
                    <p className="text-xs text-[#111827]/75 mt-0.5">
                      <strong>Focus:</strong> {edu.focus}
                    </p>
                  )}
                  {edu.keyCoursework && (
                    <div className="pt-1 flex flex-wrap gap-1.5 font-mono-tech text-[10px] text-[#0E1730]">
                      {edu.keyCoursework.map((course) => (
                        <span key={course} className="bg-[#F8F7F3] px-2 py-0.5 rounded border border-[#0E1730]/10">
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4 print-break-inside-avoid">
            <h2 className="font-mono-tech text-xs uppercase tracking-wider text-[#002B97] font-bold border-b border-[#0E1730]/10 pb-1">
              WORK EXPERIENCE
            </h2>
            {RESUME_DATA.experience.map((exp, idx) => (
              <div key={idx} className="space-y-1.5 text-xs sm:text-sm pb-3 border-b border-[#0E1730]/5 last:border-b-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <span className="font-bold text-[#0E1730] text-sm">
                      {exp.role}
                    </span>
                    <span className="text-xs text-[#002B97] font-medium ml-2">
                      · {exp.organization}
                    </span>
                  </div>
                  <span className="font-mono-tech text-xs text-[#111827]/60">
                    {exp.period}
                  </span>
                </div>

                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#111827]/80 font-sans">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx}>{resp}</li>
                  ))}
                </ul>

                <div className="text-[11px] font-mono-tech text-[#0E1730]/70 pt-1">
                  <span className="font-semibold text-[#002B97]">Transferable Skills: </span>
                  {exp.transferableSkills.join(', ')}
                </div>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-4 print-break-inside-avoid">
            <h2 className="font-mono-tech text-xs uppercase tracking-wider text-[#002B97] font-bold border-b border-[#0E1730]/10 pb-1">
              CORE PROJECTS & LEARNING BUILDS
            </h2>
            {RESUME_DATA.coreProjects.map((proj, idx) => (
              <div key={idx} className="space-y-1 text-xs sm:text-sm">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-[#0E1730]">
                    {proj.name} — <span className="font-normal italic text-xs">{proj.role}</span>
                  </span>
                  <span className="font-mono-tech text-[11px] text-[#002B97] font-semibold">
                    {proj.status}
                  </span>
                </div>
                <p className="text-xs text-[#111827]/80 leading-relaxed font-sans">
                  {proj.description}
                </p>
                <div className="text-[11px] font-mono-tech text-[#111827]/60">
                  Technologies: {proj.technologies.join(', ')}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications & Academic Participation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#0E1730]/10 print-break-inside-avoid">
            <div className="space-y-2">
              <h2 className="font-mono-tech text-xs uppercase tracking-wider text-[#002B97] font-bold">
                CERTIFICATIONS & TRAINING
              </h2>
              <div className="space-y-2 text-xs">
                {RESUME_DATA.certifications.map((cert, idx) => (
                  <div key={idx} className="p-2 bg-[#F8F7F3] rounded border border-[#0E1730]/5">
                    <div className="flex items-baseline justify-between font-bold text-[#0E1730]">
                      <span>{cert.title}</span>
                      <span className="font-mono-tech text-[10px] text-[#002B97] font-semibold">
                        {cert.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#111827]/70 font-mono-tech">
                      {cert.issuer} ({cert.year})
                    </div>
                    {cert.description && (
                      <p className="text-[11px] text-[#111827]/75 mt-0.5 font-sans">
                        {cert.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-mono-tech text-xs uppercase tracking-wider text-[#002B97] font-bold">
                ACADEMIC PARTICIPATION & LANGUAGES
              </h2>
              <div className="space-y-2 text-xs">
                {RESUME_DATA.academicParticipation.map((part, idx) => (
                  <div key={idx} className="p-2 bg-[#F8F7F3] rounded border border-[#0E1730]/5">
                    <span className="font-bold text-[#0E1730] block">{part.title}</span>
                    <span className="text-[11px] text-[#002B97] font-mono-tech block">{part.institution} · {part.session}</span>
                    <p className="text-[11px] text-[#111827]/70 mt-0.5">{part.notes}</p>
                  </div>
                ))}

                <div className="pt-2 border-t border-[#0E1730]/10">
                  <span className="text-xs font-mono-tech uppercase text-[#002B97] font-bold block mb-1">
                    Languages
                  </span>
                  <div className="space-y-1">
                    {RESUME_DATA.languages.map((l, lIdx) => (
                      <div key={lIdx} className="flex justify-between text-xs">
                        <span className="text-[#0E1730] font-medium">{l.language}</span>
                        <span className="text-[#111827]/60 font-mono-tech">{l.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skillset */}
          <div className="pt-3 border-t border-[#0E1730]/10 print-break-inside-avoid space-y-2">
            <h2 className="font-mono-tech text-xs uppercase tracking-wider text-[#002B97] font-bold">
              SKILLS MATRIX
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {RESUME_DATA.skillset.map((cat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="font-bold text-[#0E1730] font-mono-tech text-[11px] uppercase text-[#002B97]">
                    {cat.category}:
                  </span>
                  <p className="text-[#111827]/80">{cat.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
