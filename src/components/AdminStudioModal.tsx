import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Download, Eye, RotateCcw, AlertTriangle, CheckCircle2, FileText, Image as ImageIcon, ArrowRight } from 'lucide-react';

// ARCHITECTURAL NOTE: No client-side password is used here. Static GitHub Pages sites
// have no server backend or database. Client-side passwords provide false security.
// This studio contains no secrets and cannot alter public repository files directly;
// it prepares optimized assets locally and provides exact instructions for git deployment.

interface AdminStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminStudioModal: React.FC<AdminStudioModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'resume'>('photo');

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

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageObjRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    try {
      const existing = localStorage.getItem('hussnain_preview_profile_photo');
      setPreviewActive(!!existing);
    } catch {
      // Ignore in restricted environments
    }
  }, [isOpen]);

  // Load and render photo to canvas
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    setActionSuccess(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type: JPG, PNG, WebP
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setPhotoError('Please select a valid image file (JPG, PNG, or WebP).');
      return;
    }

    // Validate size: max 10MB
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

    // Target 800x800 square
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

    // Export as high quality 800x800 JPEG (quality 0.85, targeting <=150KB)
    const exportJpeg = canvas.toDataURL('image/jpeg', 0.85);
    setProcessedDataUrl(exportJpeg);

    // Approximate size in KB
    const sizeInBytes = Math.round((exportJpeg.length * 3) / 4);
    setProcessedSizeKb(Math.round(sizeInBytes / 1024));
  };

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
    if (imageObjRef.current) {
      renderCanvas(imageObjRef.current, newZoom, pan);
    }
  };

  // Drag pan handlers
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

  // Preview on this device (stores in localStorage)
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

  // Reset preview
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

  // Download profile.jpg
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

  // Resume PDF handler
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
            <span className="text-xs font-mono-tech text-white/80">Asset & Publishing Hub</span>
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
            <strong>Static Hosting Notice:</strong> GitHub Pages has no server database. Local uploads cannot
            modify the public website directly. Use this studio to crop, optimize, and test locally, then download the
            file and commit it to GitHub.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#0E1730]/10 px-6 pt-3 bg-[#F8F7F3] gap-2">
          <button
            onClick={() => setActiveTab('photo')}
            className={`pb-2.5 px-3 text-xs font-mono-tech uppercase font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'photo'
                ? 'border-[#002B97] text-[#002B97]'
                : 'border-transparent text-[#111827]/60 hover:text-[#0E1730]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Profile Photo Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`pb-2.5 px-3 text-xs font-mono-tech uppercase font-semibold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'resume'
                ? 'border-[#002B97] text-[#002B97]'
                : 'border-transparent text-[#111827]/60 hover:text-[#0E1730]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume PDF Studio</span>
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

          {previewActive && (
            <div className="p-3 bg-[#0E1730] text-white rounded border border-[#2563EB]/40 text-xs font-mono-tech flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#2563EB]" />
                <span>Preview active on this device only. Visitors will see the committed repository asset.</span>
              </div>
              <button
                onClick={handleResetPreview}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] transition-colors cursor-pointer"
              >
                Reset Preview
              </button>
            </div>
          )}

          {activeTab === 'photo' && (
            <div className="space-y-6">
              {/* File Selector */}
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
                    {/* Interactive Canvas Viewport */}
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

                      {/* Zoom control */}
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

                    {/* Metadata & Actions */}
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

                      {/* Action buttons */}
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

                  {/* 4-Step Instructions to publish to GitHub */}
                  <div className="bg-[#FFFFFF] p-4 rounded-lg border border-[#0E1730]/15 space-y-2.5">
                    <span className="text-xs font-mono-tech uppercase tracking-wider font-bold text-[#002B97] block">
                      How to publish this photo for all visitors:
                    </span>
                    <ol className="list-decimal list-outside pl-4 space-y-1.5 text-xs text-[#111827]/80 font-sans">
                      <li>
                        Download the cropped file above (it saves as <code>profile.jpg</code>).
                      </li>
                      <li>
                        Open your GitHub repository:{' '}
                        <a
                          href="https://github.com/hussnainansari-dev/portfolio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#002B97] font-semibold underline"
                        >
                          github.com/hussnainansari-dev/portfolio
                        </a>
                      </li>
                      <li>
                        Navigate into <code>public/images/</code> → click <strong>Add file</strong> → <strong>Upload files</strong>.
                      </li>
                      <li>
                        Select your downloaded <code>profile.jpg</code> and click <strong>Commit changes</strong>.
                        GitHub Pages will rebuild and deploy your new photo automatically in 1–2 minutes!
                      </li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}

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
