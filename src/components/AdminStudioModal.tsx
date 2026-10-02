import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  X,
  Upload,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  QrCode as QrIcon,
  Globe,
  Copy,
  Check
} from 'lucide-react';

// ARCHITECTURAL NOTE: No client-side password is used here. Static GitHub Pages sites
// have no server backend or database. Client-side passwords provide false security.
// This studio contains no secrets and cannot alter public repository files directly;
// it prepares optimized assets locally and provides exact instructions for git deployment.

interface AdminStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminStudioModal: React.FC<AdminStudioModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'resume' | 'qrcode' | 'seo'>('photo');

  // Photo state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [processedDataUrl, setProcessedDataUrl] = useState<string | null>(null);
  const [processedSizeKb, setProcessedSizeKb] = useState<number | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [previewActive, setPreviewActive] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Resume state
  const [selectedPdfName, setSelectedPdfName] = useState<string | null>(null);
  const [resumeDataUrl, setResumeDataUrl] = useState<string | null>(null);

  // QR Code generator state
  const [qrUrl, setQrUrl] = useState<string>('https://hussnainansari-dev.github.io/portfolio/');
  const [qrColorDark, setQrColorDark] = useState<string>('#0E1730');
  const [qrColorLight, setQrColorLight] = useState<string>('#FFFFFF');
  const [qrSize, setQrSize] = useState<number>(300);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageObjRef = useRef<HTMLImageElement | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    try {
      const existing = localStorage.getItem('hussnain_preview_profile_photo');
      setPreviewActive(!!existing);
      if (typeof window !== 'undefined') {
        const liveOrigin = window.location.href.split('#')[0];
        setQrUrl(liveOrigin);
      }
    } catch {
      // Ignore in restricted environments
    }
  }, [isOpen]);

  // Generate QR Code when QR parameters change
  useEffect(() => {
    if (activeTab === 'qrcode' && qrCanvasRef.current && qrUrl) {
      QRCode.toCanvas(
        qrCanvasRef.current,
        qrUrl,
        {
          width: qrSize,
          margin: 2,
          color: {
            dark: qrColorDark,
            light: qrColorLight
          }
        },
        (error) => {
          if (!error && qrCanvasRef.current) {
            setQrDataUrl(qrCanvasRef.current.toDataURL('image/png'));
          }
        }
      );
    }
  }, [activeTab, qrUrl, qrColorDark, qrColorLight, qrSize]);

  // Load and render photo to canvas
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    setActionSuccess(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setPhotoError('Please select a valid image file (JPG, PNG, or WebP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setPhotoError('Selected image is too large. Maximum supported size is 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setSelectedImage(dataUrl);
      setZoom(1);
      setPan({ x: 0, y: 0 });

      const img = new Image();
      img.onload = () => {
        imageObjRef.current = img;
        renderCanvas(img, 1, { x: 0, y: 0 });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const renderCanvas = (
    img: HTMLImageElement,
    currentZoom: number,
    currentPan: { x: number; y: number }
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const TARGET_SIZE = 800;
    canvas.width = TARGET_SIZE;
    canvas.height = TARGET_SIZE;

    ctx.fillStyle = '#0E1730';
    ctx.fillRect(0, 0, TARGET_SIZE, TARGET_SIZE);

    const minDim = Math.min(img.width, img.height);
    const scale = (TARGET_SIZE / minDim) * currentZoom;

    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    const centerX = TARGET_SIZE / 2 + currentPan.x;
    const centerY = TARGET_SIZE / 2 + currentPan.y;

    const drawX = centerX - scaledWidth / 2;
    const drawY = centerY - scaledHeight / 2;

    ctx.drawImage(img, drawX, drawY, scaledWidth, scaledHeight);

    const exportJpeg = canvas.toDataURL('image/jpeg', 0.85);
    setProcessedDataUrl(exportJpeg);

    const sizeInBytes = Math.round((exportJpeg.length * 3) / 4);
    setProcessedSizeKb(Math.round(sizeInBytes / 1024));
  };

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
    if (imageObjRef.current) {
      renderCanvas(imageObjRef.current, newZoom, pan);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !imageObjRef.current) return;
    const newPan = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    };
    setPan(newPan);
    renderCanvas(imageObjRef.current, zoom, newPan);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSetLocalPreview = () => {
    if (!processedDataUrl) return;
    setPhotoError(null);
    try {
      localStorage.setItem('hussnain_preview_profile_photo', processedDataUrl);
      window.dispatchEvent(new Event('profile-photo-updated'));
      setPreviewActive(true);
      setActionSuccess('Device preview active! Your browser will now display this photo locally.');
    } catch {
      setPhotoError('Browser storage quota exceeded. The image file is too large for localStorage preview.');
    }
  };

  const handleResetPreview = () => {
    try {
      localStorage.removeItem('hussnain_preview_profile_photo');
      window.dispatchEvent(new Event('profile-photo-updated'));
      setPreviewActive(false);
      setActionSuccess('Local preview reset. Public default photo restored.');
    } catch {
      // Ignore
    }
  };

  const handleDownloadProfileJpg = () => {
    if (!processedDataUrl) return;
    const link = document.createElement('a');
    link.href = processedDataUrl;
    link.download = 'profile.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setActionSuccess('Downloaded profile.jpg! Follow the 4-step deployment instructions below to publish.');
  };

  const handleResumeFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Please select a valid PDF document.');
      return;
    }
    setSelectedPdfName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setResumeDataUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadResumePdf = () => {
    if (!resumeDataUrl) return;
    const link = document.createElement('a');
    link.href = resumeDataUrl;
    link.download = 'Hussnain_Ansari_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadQrPng = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'hussnain-portfolio-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setActionSuccess('Downloaded portfolio QR code (PNG)!');
  };

  const handleCopyQrUrl = async () => {
    try {
      await navigator.clipboard.writeText(qrUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0E1730]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-2xl border border-[#0E1730]/20 flex flex-col overflow-hidden max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#0E1730] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs uppercase tracking-wider text-[#2563EB] font-bold">
              ADMIN STUDIO
            </span>
            <span className="text-white/40">/</span>
            <span className="text-xs font-mono-tech text-white/80">Internal Publishing &amp; Asset Hub</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
            aria-label="Close Admin Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Honest Architecture Notice Banner */}
        <div className="bg-[#E6EDF6] border-b border-[#002B97]/20 px-6 py-2.5 flex items-start gap-2.5 text-xs text-[#002B97]">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Static Architecture Notice:</strong> Static GitHub Pages hosting has no database backend.
            Use this internal tool suite to prepare, preview, and export high-performance assets locally before committing.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap border-b border-[#0E1730]/10 px-6 pt-3 bg-[#F8F7F3] gap-2">
          <button
            onClick={() => setActiveTab('photo')}
            className={`pb-2.5 px-3 text-xs font-mono-tech uppercase font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'photo'
                ? 'border-[#002B97] text-[#002B97]'
                : 'border-transparent text-[#111827]/60 hover:text-[#0E1730]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Profile Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`pb-2.5 px-3 text-xs font-mono-tech uppercase font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'resume'
                ? 'border-[#002B97] text-[#002B97]'
                : 'border-transparent text-[#111827]/60 hover:text-[#0E1730]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume PDF</span>
          </button>

          <button
            onClick={() => setActiveTab('qrcode')}
            className={`pb-2.5 px-3 text-xs font-mono-tech uppercase font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'qrcode'
                ? 'border-[#002B97] text-[#002B97]'
                : 'border-transparent text-[#111827]/60 hover:text-[#0E1730]'
            }`}
          >
            <QrIcon className="w-3.5 h-3.5" />
            <span>QR Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('seo')}
            className={`pb-2.5 px-3 text-xs font-mono-tech uppercase font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'seo'
                ? 'border-[#002B97] text-[#002B97]'
                : 'border-transparent text-[#111827]/60 hover:text-[#0E1730]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>SEO &amp; Metadata</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {actionSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 text-xs font-mono-tech flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{actionSuccess}</span>
            </div>
          )}

          {photoError && (
            <div className="p-3 bg-red-50 text-red-800 rounded border border-red-200 text-xs font-mono-tech flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{photoError}</span>
            </div>
          )}

          {/* TAB 1: PROFILE PHOTO STUDIO */}
          {activeTab === 'photo' && (
            <div className="space-y-6">
              {previewActive && (
                <div className="p-3 bg-[#0E1730] text-white rounded border border-[#2563EB]/40 text-xs font-mono-tech flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#2563EB]" />
                    <span>Preview active on this browser. Visitors will see the committed repository asset.</span>
                  </div>
                  <button
                    onClick={handleResetPreview}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] transition-colors cursor-pointer"
                  >
                    Reset Preview
                  </button>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-2">
                  1. Choose New Portrait Photo (JPG, PNG, WebP · Max 10MB)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  className="block w-full text-xs text-[#111827] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-mono-tech file:font-semibold file:bg-[#002B97] file:text-white hover:file:bg-[#0E1730] file:cursor-pointer border border-[#0E1730]/15 rounded p-1 bg-[#F8F7F3]"
                />
              </div>

              {selectedImage && (
                <div className="space-y-4 pt-2 border-t border-[#0E1730]/10">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="space-y-2">
                      <span className="text-xs font-mono-tech text-[#111827]/70 block">
                        Drag to reposition · Square Crop Preview (800×800)
                      </span>
                      <div
                        className="w-64 h-64 border-2 border-dashed border-[#002B97] rounded-lg overflow-hidden bg-slate-100 cursor-move relative touch-none shadow-xs"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                      >
                        <canvas ref={canvasRef} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-xs font-mono-tech text-[#111827]/70">Zoom:</span>
                        <input
                          type="range"
                          min="0.8"
                          max="3"
                          step="0.05"
                          value={zoom}
                          onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                          className="w-40 accent-[#002B97]"
                        />
                        <span className="text-xs font-mono-tech font-bold text-[#002B97]">{Math.round(zoom * 100)}%</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="bg-[#F8F7F3] p-4 rounded border border-[#0E1730]/10 space-y-2 text-xs font-mono-tech">
                        <div className="flex justify-between">
                          <span className="text-[#111827]/60">Resolution:</span>
                          <span className="font-bold text-[#0E1730]">800 × 800 px (Square)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#111827]/60">Format:</span>
                          <span className="font-bold text-[#0E1730]">Optimized JPEG</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#111827]/60">Export File Size:</span>
                          <span className={`font-bold ${processedSizeKb && processedSizeKb <= 150 ? 'text-emerald-700' : 'text-[#002B97]'}`}>
                            {processedSizeKb ? `${processedSizeKb} KB` : 'Calculating...'}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <button
                          onClick={handleSetLocalPreview}
                          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-[#E6EDF6] hover:bg-[#002B97] hover:text-white text-[#002B97] text-xs font-mono-tech uppercase font-bold rounded border border-[#002B97]/20 transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Preview On This Device</span>
                        </button>

                        <button
                          onClick={handleDownloadProfileJpg}
                          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-[#002B97] hover:bg-[#0E1730] text-white text-xs font-mono-tech uppercase font-bold rounded transition-colors shadow-xs cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download profile.jpg</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FFFFFF] p-4 rounded-lg border border-[#0E1730]/15 space-y-2.5">
                    <span className="text-xs font-mono-tech uppercase tracking-wider font-bold text-[#002B97] block">
                      How to publish this photo for all visitors:
                    </span>
                    <ol className="list-decimal list-outside pl-4 space-y-1.5 text-xs text-[#111827]/80 font-sans">
                      <li>Download the cropped file above (saves as <code>profile.jpg</code>).</li>
                      <li>Open your repository: <code>github.com/hussnainansari-dev/portfolio</code></li>
                      <li>Navigate into <code>public/images/</code> → click <strong>Add file</strong> → <strong>Upload files</strong>.</li>
                      <li>Select your downloaded <code>profile.jpg</code> and commit to <code>main</code>.</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RESUME PDF STUDIO */}
          {activeTab === 'resume' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-2">
                  Update Official Resume PDF
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeFileSelect}
                  className="block w-full text-xs text-[#111827] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-mono-tech file:font-semibold file:bg-[#002B97] file:text-white hover:file:bg-[#0E1730] file:cursor-pointer border border-[#0E1730]/15 rounded p-1 bg-[#F8F7F3]"
                />
              </div>

              {selectedPdfName && (
                <div className="space-y-4 bg-[#F8F7F3] p-4 rounded border border-[#0E1730]/10">
                  <div className="flex items-center justify-between text-xs font-mono-tech">
                    <span>Selected: <strong>{selectedPdfName}</strong></span>
                    <button
                      onClick={handleDownloadResumePdf}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002B97] text-white rounded font-bold text-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download as Hussnain_Ansari_Resume.pdf</span>
                    </button>
                  </div>

                  <div className="text-xs text-[#111827]/80 space-y-1">
                    <p className="font-semibold text-[#0E1730]">To publish publicly to your website:</p>
                    <p>
                      Place the downloaded PDF into your repository at{' '}
                      <code>public/resume/Hussnain_Ansari_Resume.pdf</code> and commit to <code>main</code>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: QR CODE GENERATOR (Using qrcode dependency) */}
          {activeTab === 'qrcode' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-1.5">
                      Target Link / URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={qrUrl}
                        onChange={(e) => setQrUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 text-xs font-mono-tech bg-[#F8F7F3] border border-[#0E1730]/15 rounded text-[#111827] focus:outline-none focus:border-[#002B97]"
                      />
                      <button
                        onClick={handleCopyQrUrl}
                        className="px-3 py-2 bg-[#E6EDF6] text-[#002B97] hover:bg-[#002B97] hover:text-white rounded text-xs transition-colors cursor-pointer"
                        title="Copy link"
                      >
                        {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono-tech">
                    <div>
                      <label className="block text-[#111827]/70 mb-1">Foreground Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={qrColorDark}
                          onChange={(e) => setQrColorDark(e.target.value)}
                          className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                        />
                        <span className="text-[11px]">{qrColorDark}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#111827]/70 mb-1">Background Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={qrColorLight}
                          onChange={(e) => setQrColorLight(e.target.value)}
                          className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                        />
                        <span className="text-[11px]">{qrColorLight}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech text-[#111827]/70 mb-1">
                      Render Size: {qrSize} × {qrSize} px
                    </label>
                    <input
                      type="range"
                      min="160"
                      max="600"
                      step="20"
                      value={qrSize}
                      onChange={(e) => setQrSize(parseInt(e.target.value, 10))}
                      className="w-full accent-[#002B97]"
                    />
                  </div>

                  <button
                    onClick={handleDownloadQrPng}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#002B97] hover:bg-[#0E1730] text-white text-xs font-mono-tech uppercase font-bold rounded transition-colors shadow-xs cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download QR Code (PNG)</span>
                  </button>
                </div>

                <div className="md:col-span-6 flex flex-col items-center justify-center bg-[#F8F7F3] p-6 rounded-lg border border-[#0E1730]/10">
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-[#0E1730]/10 mb-3">
                    <canvas ref={qrCanvasRef} className="block" />
                  </div>
                  <span className="text-[11px] font-mono-tech text-[#111827]/60 text-center">
                    Rendered via client-side <code>qrcode</code> engine
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SEO & METADATA INSPECTOR */}
          {activeTab === 'seo' && (
            <div className="space-y-5 text-xs font-mono-tech">
              <div className="p-4 bg-[#F8F7F3] rounded-lg border border-[#0E1730]/10 space-y-3">
                <span className="font-bold text-[#002B97] uppercase tracking-wider block">
                  Production Meta Tags Verification
                </span>
                
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#0E1730]/5 pb-1.5 gap-1">
                    <span className="text-[#111827]/60 font-semibold">Title Tag:</span>
                    <span className="text-[#0E1730] text-right font-medium">Hussnain Ansari — Portfolio &amp; Learning Archive</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#0E1730]/5 pb-1.5 gap-1">
                    <span className="text-[#111827]/60 font-semibold">Canonical URL:</span>
                    <span className="text-[#002B97] text-right truncate">https://hussnainansari-dev.github.io/portfolio/</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#0E1730]/5 pb-1.5 gap-1">
                    <span className="text-[#111827]/60 font-semibold">Robots:</span>
                    <span className="text-emerald-700 text-right font-bold">index, follow</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#0E1730]/5 pb-1.5 gap-1">
                    <span className="text-[#111827]/60 font-semibold">Theme Color:</span>
                    <span className="text-[#0E1730] text-right">#0E1730 (Navy)</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#0E1730]/5 pb-1.5 gap-1">
                    <span className="text-[#111827]/60 font-semibold">OpenGraph Card:</span>
                    <span className="text-[#0E1730] text-right">og-image.jpg (1200×630 sRGB)</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="text-[#111827]/60 font-semibold">Schema.org JSON-LD:</span>
                    <span className="text-emerald-700 text-right font-bold">Person + WebSite Graph</span>
                  </div>
                </div>
              </div>

              {/* Live Search Snippet Mockup */}
              <div>
                <span className="text-xs uppercase font-bold text-[#0E1730] block mb-2">
                  Google Search Snippet Preview
                </span>
                <div className="p-4 bg-white rounded-lg border border-[#0E1730]/15 shadow-xs font-sans space-y-1">
                  <div className="text-[12px] text-[#202124] flex items-center gap-1.5">
                    <span className="text-[#002B97] font-mono-tech">https://hussnainansari-dev.github.io</span>
                    <span className="text-gray-400">› portfolio</span>
                  </div>
                  <div className="text-[17px] text-[#1a0dab] font-medium leading-snug hover:underline cursor-pointer">
                    Hussnain Ansari — Portfolio &amp; Learning Archive
                  </div>
                  <div className="text-[13px] text-[#4d5156] leading-relaxed">
                    Personal portfolio of Hussnain Ansari, an ADP Accounting &amp; Finance student at UCP exploring business, data analytics, Python, and practical projects.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#F8F7F3] px-6 py-3 border-t border-[#0E1730]/10 flex items-center justify-between text-xs font-mono-tech text-[#111827]/60">
          <span>Client-side utility · Zero backend requirements</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0E1730] text-white rounded hover:bg-[#002B97] transition-colors cursor-pointer"
          >
            Close Studio
          </button>
        </div>
      </div>
    </div>
  );
};
