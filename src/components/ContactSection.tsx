import React, { useState } from 'react';
import { Mail, Linkedin, Github, Instagram, MapPin, Phone, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/social';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'preparing' | 'opened' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill out all fields before submitting.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('preparing');

    const mailtoUrl = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
      `Inquiry from ${formData.name.trim()}`
    )}&body=${encodeURIComponent(
      `Hi Hussnain,\n\n${formData.message.trim()}\n\n---\nFrom: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`
    )}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setStatus('opened');
    }, 400);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F8F7F3] border-b border-[#0E1730]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Direct Channels & Context (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-[#002B97] tracking-wider mb-3">
                <span className="font-semibold">08 / CONTACT</span>
                <span aria-hidden="true" className="text-[#0E1730]/30">·</span>
                <span>OPEN CHANNELS</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0E1730] text-balance">
                Let's connect.
              </h2>
              <p className="mt-4 text-base text-[#111827]/75 font-normal leading-relaxed font-sans">
                Whether you're interested in a project, collaboration, learning together, or exchanging
                ideas on accounting and data analytics — feel free to reach out.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3 font-mono-tech text-xs">
              {/* Phone */}
              <div className="p-4 bg-white rounded-lg border border-[#0E1730]/10 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#E6EDF6] text-[#002B97] flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#111827]/50 uppercase tracking-wider block">
                      PHONE / DIRECT
                    </span>
                    <span className="text-[#0E1730] font-semibold">
                      {SITE_CONFIG.phone}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-[#002B97] font-semibold">Lahore</span>
              </div>

              {/* Email */}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="p-4 bg-white rounded-lg border border-[#0E1730]/10 hover:border-[#002B97] transition-colors flex items-center justify-between group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#E6EDF6] text-[#002B97] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#111827]/50 uppercase tracking-wider block">
                      EMAIL (PRIMARY)
                    </span>
                    <span className="text-[#0E1730] font-semibold">
                      {SITE_CONFIG.email}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#002B97] group-hover:translate-x-1 transition-transform" />
              </a>

              {/* LinkedIn */}
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-white rounded-lg border border-[#0E1730]/10 hover:border-[#002B97] transition-colors flex items-center justify-between group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#E6EDF6] text-[#002B97] flex items-center justify-center">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#111827]/50 uppercase tracking-wider block">
                      LINKEDIN
                    </span>
                    <span className="text-[#0E1730] font-semibold">
                      linkedin.com/in/hussnain-ali45
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#002B97] group-hover:translate-x-1 transition-transform" />
              </a>

              {/* GitHub */}
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-white rounded-lg border border-[#0E1730]/10 hover:border-[#002B97] transition-colors flex items-center justify-between group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#E6EDF6] text-[#002B97] flex items-center justify-center">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#111827]/50 uppercase tracking-wider block">
                      GITHUB
                    </span>
                    <span className="text-[#0E1730] font-semibold">
                      github.com/hussnainansari-dev
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#002B97] group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Instagram */}
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-white rounded-lg border border-[#0E1730]/10 hover:border-[#002B97] transition-colors flex items-center justify-between group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#E6EDF6] text-[#002B97] flex items-center justify-center">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#111827]/50 uppercase tracking-wider block">
                      INSTAGRAM
                    </span>
                    <span className="text-[#0E1730] font-semibold">
                      @hussnain.ali45
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#002B97] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Location Notice */}
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#111827]/60 pt-2">
              <MapPin className="w-4 h-4 text-[#002B97]" />
              <span>Based in Lahore, Pakistan (UTC+5) · Open for remote & local opportunities</span>
            </div>
          </div>

          {/* Right Column: Direct Email Composer (Cols 6-12) */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-[#0E1730]/10 p-6 sm:p-10 shadow-[0_4px_24px_rgba(14,23,48,0.03)]">
            <h3 className="font-editorial text-2xl font-bold text-[#0E1730] mb-2">
              Compose Direct Email
            </h3>
            <p className="text-xs sm:text-sm text-[#111827]/70 mb-6 font-sans">
              Submitting this form prepares a pre-filled draft in your default email client addressed to{' '}
              <strong className="text-[#002B97]">{SITE_CONFIG.email}</strong>.
            </p>

            {status === 'opened' ? (
              <div className="p-6 bg-[#E6EDF6] rounded-lg border border-[#002B97]/30 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-[#002B97] mx-auto" />
                <h4 className="font-editorial text-xl font-bold text-[#0E1730]">
                  Email Client Opened
                </h4>
                <p className="text-xs sm:text-sm text-[#0E1730]/80 font-sans max-w-md mx-auto">
                  Your mail app was launched with your draft message. If it didn't open automatically,
                  you can write directly to{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="font-bold underline text-[#002B97]"
                  >
                    {SITE_CONFIG.email}
                  </a>
                  .
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-3 px-4 py-2 bg-[#002B97] text-white text-xs font-mono-tech rounded hover:bg-[#0E1730] transition-colors cursor-pointer"
                >
                  Write Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="p-3 bg-red-50 text-red-700 rounded border border-red-200 text-xs font-mono-tech">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono-tech uppercase tracking-wider text-[#0E1730] font-semibold mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F3] border border-[#0E1730]/15 rounded text-[#111827] focus:outline-none focus:border-[#002B97] focus:ring-1 focus:ring-[#002B97] transition-all font-sans"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono-tech uppercase tracking-wider text-[#0E1730] font-semibold mb-1.5"
                  >
                    Your Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. sarah@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F3] border border-[#0E1730]/15 rounded text-[#111827] focus:outline-none focus:border-[#002B97] focus:ring-1 focus:ring-[#002B97] transition-all font-sans"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono-tech uppercase tracking-wider text-[#0E1730] font-semibold mb-1.5"
                  >
                    Message / Note *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Share what you are building, an opportunity, or a topic you would like to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F3] border border-[#0E1730]/15 rounded text-[#111827] focus:outline-none focus:border-[#002B97] focus:ring-1 focus:ring-[#002B97] transition-all font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'preparing'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#002B97] hover:bg-[#0E1730] text-white text-xs sm:text-sm font-mono-tech uppercase font-semibold rounded transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{status === 'preparing' ? 'Opening Mail Client...' : 'Open Email Client'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
