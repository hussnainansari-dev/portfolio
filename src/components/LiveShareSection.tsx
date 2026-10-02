import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, Share2, MessageCircle, Linkedin, Mail, QrCode, Globe } from 'lucide-react';

// Injected at build time by Vite define
declare const __BUILD_DATE__: string | undefined;

export const LiveShareSection: React.FC = () => {
  const [liveUrl, setLiveUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showQr, setShowQr] = useState<boolean>(false);
  const [canNativeShare, setCanNativeShare] = useState<boolean>(false);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const buildDate = typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : 'October 2026';

  useEffect(() => {
    // Read live location dynamically
    if (typeof window !== 'undefined') {
      const url = window.location.href.split('#')[0];
      setLiveUrl(url);
      setCanNativeShare(typeof navigator.share === 'function');
    }
  }, []);

  useEffect(() => {
    if (showQr && qrCanvasRef.current && liveUrl) {
      QRCode.toCanvas(
        qrCanvasRef.current,
        liveUrl,
        {
          width: 160,
          margin: 1,
          color: {
            dark: '#0E1730',
            light: '#FFFFFF'
          }
        },
        (error) => {
          if (error) console.error('QR code generation error:', error);
        }
      );
    }
  }, [showQr, liveUrl]);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(liveUrl);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = liveUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hussnain Ansari — Portfolio & Learning Archive',
          text: 'ADP Accounting & Finance student at UCP exploring business, data analytics, and practical projects.',
          url: liveUrl,
        });
      } catch (err) {
        // User dismissed share dialog
      }
    }
  };

  const shareText = encodeURIComponent(
    'Hussnain Ansari — Accounting & Finance × Business × Data'
  );
  const encodedUrl = encodeURIComponent(liveUrl || 'https://hussnainansari-dev.github.io/portfolio/');

  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(
    'Hussnain Ansari — Portfolio'
  )}&body=${encodeURIComponent(
    `Take a look at Hussnain Ansari's portfolio:\n\n${liveUrl}`
  )}`;

  return (
    <section
      aria-label="Share this portfolio"
      className="py-12 bg-[#F1F3F5] border-t border-[#0E1730]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#0E1730]/10 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left: Section title, live status, and URL indicator */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-[#002B97] tracking-wider font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>LIVE REPOSITORY & PORTFOLIO</span>
              <span aria-hidden="true" className="text-[#0E1730]/30">·</span>
              <span className="text-[#111827]/60 font-normal">Last updated: {buildDate}</span>
            </div>

            <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#0E1730]">
              Share this portfolio
            </h2>

            <div className="flex items-center gap-2 pt-1 font-mono-tech text-xs text-[#111827]/75">
              <Globe className="w-3.5 h-3.5 text-[#002B97] shrink-0" />
              <code className="bg-[#F8F7F3] px-2 py-0.5 rounded border border-[#0E1730]/10 truncate max-w-xs sm:max-w-md select-all">
                {liveUrl || 'https://hussnainansari-dev.github.io/portfolio/'}
              </code>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#002B97] hover:bg-[#0E1730] text-white text-xs font-mono-tech uppercase font-semibold rounded transition-colors focus:ring-2 focus:ring-[#002B97] focus:ring-offset-1 focus:outline-none cursor-pointer"
              aria-label="Copy portfolio link to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
            </button>

            {/* Hidden live region for accessibility screen readers */}
            <div aria-live="polite" className="sr-only">
              {copied ? 'Link copied to clipboard' : ''}
            </div>

            {/* Native Web Share API */}
            {canNativeShare && (
              <button
                onClick={handleNativeShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#E6EDF6] hover:bg-[#002B97] hover:text-white text-[#002B97] text-xs font-mono-tech uppercase font-semibold rounded border border-[#002B97]/20 transition-colors focus:ring-2 focus:ring-[#002B97] focus:outline-none cursor-pointer"
                aria-label="Share using system share dialog"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            )}

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 text-xs font-mono-tech uppercase font-semibold rounded border border-emerald-200 transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              title="Share on WhatsApp"
              aria-label="Share on WhatsApp (opens in a new tab)"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* LinkedIn */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#F8F7F3] hover:bg-[#002B97] hover:text-white text-[#0E1730] text-xs font-mono-tech uppercase font-semibold rounded border border-[#0E1730]/15 transition-colors focus:ring-2 focus:ring-[#002B97] focus:outline-none"
              title="Share on LinkedIn"
              aria-label="Share on LinkedIn (opens in a new tab)"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            {/* Email */}
            <a
              href={emailShareUrl}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#F8F7F3] hover:bg-[#0E1730] hover:text-white text-[#0E1730] text-xs font-mono-tech uppercase font-semibold rounded border border-[#0E1730]/15 transition-colors focus:ring-2 focus:ring-[#002B97] focus:outline-none"
              title="Share via Email"
              aria-label="Share via Email client"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>

            {/* QR Code Toggle */}
            <button
              onClick={() => setShowQr(!showQr)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#F1F3F5] text-[#111827] text-xs font-mono-tech uppercase font-semibold rounded border border-[#0E1730]/15 transition-colors focus:ring-2 focus:ring-[#002B97] focus:outline-none cursor-pointer"
              aria-expanded={showQr}
              aria-label="Toggle QR code display"
            >
              <QrCode className="w-3.5 h-3.5 text-[#002B97]" />
              <span>QR Code</span>
            </button>
          </div>
        </div>

        {/* QR Code Expandable Card */}
        {showQr && (
          <div className="mt-4 p-5 bg-white rounded-lg border border-[#0E1730]/10 flex flex-col sm:flex-row items-center gap-6 animate-fadeIn shadow-xs max-w-md mx-auto lg:mx-0">
            <div className="p-2 border border-[#0E1730]/15 rounded bg-white shrink-0 shadow-xs">
              <canvas ref={qrCanvasRef} className="block" />
            </div>
            <div className="space-y-1 text-center sm:text-left text-xs font-sans text-[#111827]/80">
              <span className="font-mono-tech font-bold text-[#0E1730] block">
                Instant Mobile Access
              </span>
              <p>
                Scan with any smartphone camera to open this portfolio directly on mobile devices.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
