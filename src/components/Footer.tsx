import React from 'react';
import { ArrowUp, Instagram, Linkedin, Github, Mail, MapPin, Settings } from 'lucide-react';
import { SITE_CONFIG } from '../data/social';

interface FooterProps {
  onOpenResume: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E1730] text-[#F8F7F3] border-t border-white/10 pt-16 pb-12 font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Positioning (Cols 1-6) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#002B97] text-white flex items-center justify-center font-editorial font-bold text-sm tracking-tight">
                HA
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-white">
                Hussnain Ansari
              </span>
            </div>

            <p className="text-xs font-mono-tech uppercase tracking-wider text-[#2563EB]">
              Accounting & Finance × Business × Data
            </p>

            <p className="text-xs sm:text-sm text-[#E6EDF6]/75 max-w-md leading-relaxed font-sans">
              ADP Accounting & Finance student at University of Central Punjab (UCP) developing practical analytics,
              programming, and commercial capabilities.
            </p>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs font-mono-tech text-white/50 pt-2">
              <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{SITE_CONFIG.location}</span>
              <span aria-hidden="true">·</span>
              <span>{SITE_CONFIG.phone}</span>
              <span aria-hidden="true">·</span>
              <span>Learning · Practicing · Building · Documenting</span>
            </div>
          </div>

          {/* Navigation Quick Links (Cols 7-9) */}
          <div className="md:col-span-3 space-y-3 font-mono-tech text-xs">
            <span className="text-[#2563EB] uppercase tracking-wider font-semibold block">
              DIRECTORY
            </span>
            <ul className="space-y-2 text-[#E6EDF6]/70">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  01 / About & Experience
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-white transition-colors">
                  02 / Research Journey
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  03 / Projects & FINOVAH
                </a>
              </li>
              <li>
                <a href="#learning" className="hover:text-white transition-colors">
                  04 / Active Studies
                </a>
              </li>
              <li>
                <a href="#archive" className="hover:text-white transition-colors">
                  05 / Live Learning Archive
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.resumePdfPath}
                  download="Hussnain_Ansari_Resume.pdf"
                  className="hover:text-[#2563EB] text-left transition-colors text-[#2563EB] font-semibold block"
                >
                  Download Official Resume (PDF)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenResume}
                  className="hover:text-white text-left transition-colors cursor-pointer"
                >
                  View Full CV Document
                </button>
              </li>
            </ul>
          </div>

          {/* Connect & Social (Cols 10-12) */}
          <div className="md:col-span-3 space-y-3 font-mono-tech text-xs">
            <span className="text-[#2563EB] uppercase tracking-wider font-semibold block">
              CHANNELS
            </span>
            <ul className="space-y-2 text-[#E6EDF6]/70">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>GitHub Repositories</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Instagram Documentation</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with subtle Admin link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-white/50">
          <div className="flex items-center gap-3">
            <span>© 2026 Hussnain Ansari. Documented authentically.</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <a
              href="#/admin"
              onClick={(e) => {
                e.preventDefault();
                onOpenAdmin();
              }}
              className="text-white/40 hover:text-white/80 transition-colors flex items-center gap-1"
              title="Admin Studio (Client-side asset helper)"
            >
              <Settings className="w-3 h-3" />
              <span>Admin</span>
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#2563EB] hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
