import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight, Download } from 'lucide-react';
import { ProfilePhoto } from './ProfilePhoto';
import { SITE_CONFIG } from '../data/social';

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
  onOpenPhotoStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, activeSection, onOpenPhotoStudio }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#journey' },
    { label: 'Projects', href: '#projects' },
    { label: 'Learning', href: '#learning' },
    { label: 'Archive', href: '#archive' },
    { label: 'Notes', href: '#notes' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#F8F7F3]/90 backdrop-blur-md border-b border-[#0E1730]/10 shadow-[0_2px_12px_rgba(14,23,48,0.03)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Wordmark with canonical profile photo */}
          <a
            href="#"
            className="text-base sm:text-lg font-bold tracking-tight text-[#0E1730] hover:text-[#002B97] transition-colors flex items-center gap-2.5"
          >
            <div
              onDoubleClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenPhotoStudio?.();
              }}
              title="Hussnain Ansari"
            >
              <ProfilePhoto
                size="sm"
                className="border border-[#002B97]/30 cursor-pointer"
                alt="Hussnain Ansari"
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight">Hussnain Ansari</span>
              <span className="hidden sm:inline font-mono-tech text-[11px] text-[#002B97] font-medium tracking-wider">
                / 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#002B97] font-semibold'
                      : 'text-[#111827]/70 hover:text-[#002B97]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#002B97]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Download Resume PDF & Connect */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={SITE_CONFIG.resumePdfPath}
              download="Hussnain_Ansari_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech uppercase font-semibold text-[#002B97] bg-[#E6EDF6] hover:bg-[#002B97] hover:text-white rounded border border-[#002B97]/20 transition-all duration-150 whitespace-nowrap"
              title="Download official PDF resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech uppercase font-medium text-[#111827]/70 hover:text-[#002B97] rounded transition-colors whitespace-nowrap cursor-pointer"
              title="View full CV on screen"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View CV</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono-tech uppercase font-medium text-white bg-[#002B97] hover:bg-[#0E1730] rounded transition-all duration-150 shadow-sm whitespace-nowrap"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={SITE_CONFIG.resumePdfPath}
              download="Hussnain_Ansari_Resume.pdf"
              aria-label="Download Resume PDF"
              className="px-2.5 py-1 text-xs font-mono-tech uppercase font-semibold text-white bg-[#002B97] rounded flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>PDF</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0E1730] hover:text-[#002B97] focus:outline-none focus:ring-2 focus:ring-[#002B97]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F7F3] border-b border-[#0E1730]/10 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-[#111827] hover:text-[#002B97] hover:bg-[#E6EDF6]/60 rounded transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-[#0E1730]/10 flex flex-col gap-2">
            <a
              href={SITE_CONFIG.resumePdfPath}
              download="Hussnain_Ansari_Resume.pdf"
              className="w-full text-center px-4 py-2.5 text-xs font-mono-tech uppercase font-semibold text-white bg-[#002B97] rounded hover:bg-[#0E1730] transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Resume (PDF)</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full text-center px-4 py-2 text-xs font-mono-tech uppercase font-medium text-[#002B97] bg-[#E6EDF6] rounded"
            >
              View Full CV On Screen
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
