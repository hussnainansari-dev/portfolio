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
  Check,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Layers,
  BookOpen,
  ArrowRight,
  Code,
  FileUp,
  Lock,
  Unlock,
  ShieldCheck,
  KeyRound,
  LogOut,
  UserCheck,
  Mail
} from 'lucide-react';
import {
  LearningEntry,
  LEARNING_ENTRIES,
  getLocalJourneyEntries,
  saveLocalJourneyEntries
} from '../data/learningJourney';

interface AdminStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'photo' | 'journey' | 'resume' | 'qrcode' | 'seo';
}

export const AdminStudioModal: React.FC<AdminStudioModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'photo'
}) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'journey' | 'resume' | 'qrcode' | 'seo'>(initialTab);

  // Owner Authentication Gate ("only me")
  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('hussnain_owner_authenticated') === 'true';
    } catch {
      return false;
    }
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  // Forgot Password / Email Recovery state
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryError, setRecoveryError] = useState<string | null>(null);

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
  const [isDraggingFile, setIsDraggingFile] = useState(false);

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

  // Journey Studio state
  const [localDrafts, setLocalDrafts] = useState<LearningEntry[]>([]);
  const [isEditingJourney, setIsEditingJourney] = useState(false);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [jDay, setJDay] = useState<number>(6);
  const [jDate, setJDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [jTopic, setJTopic] = useState<string>('');
  const [jTitle, setJTitle] = useState<string>('');
  const [jWhy, setJWhy] = useState<string>('');
  const [jLearned, setJLearned] = useState<string>('');
  const [jConfused, setJConfused] = useState<string>('');
  const [jChanged, setJChanged] = useState<string>('');
  const [jPractice, setJPractice] = useState<string>('');
  const [jProof, setJProof] = useState<string>('');
  const [jTools, setJTools] = useState<string>('Python 3.12, VS Code');
  const [jImage, setJImage] = useState<string>('');
  const [deleteConfirmDay, setDeleteConfirmDay] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageObjRef = useRef<HTMLImageElement | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync initial tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Load existing states on mount / modal open
  useEffect(() => {
    try {
      const existing = localStorage.getItem('hussnain_preview_profile_photo');
      setPreviewActive(!!existing);

      const isAuth = localStorage.getItem('hussnain_owner_authenticated') === 'true';
      setIsOwnerAuthenticated(isAuth);

      const drafts = getLocalJourneyEntries();
      setLocalDrafts(drafts);
      if (drafts.length > 0) {
        const maxDay = Math.max(...drafts.map((d) => d.dayNumber), ...LEARNING_ENTRIES.map((d) => d.dayNumber));
        setJDay(maxDay + 1);
      } else {
        const maxDay = Math.max(...LEARNING_ENTRIES.map((d) => d.dayNumber));
        setJDay(maxDay + 1);
      }

      if (typeof window !== 'undefined') {
        const liveOrigin = window.location.href.split('#')[0];
        setQrUrl(liveOrigin);
      }
    } catch {
      // Ignore in restricted environments
    }
  }, [isOpen]);

  // Owner Authentication handlers
  const handleOwnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const input = passcodeInput.trim();
    const customPin = localStorage.getItem('hussnain_owner_custom_pin');

    // Owner password is strictly $H451590m (or custom pin if set by owner)
    if (input === '$H451590m' || (customPin && input === customPin)) {
      try {
        localStorage.setItem('hussnain_owner_authenticated', 'true');
      } catch {
        // Fallback
      }
      setIsOwnerAuthenticated(true);
      setPasscodeError(null);
      setPasscodeInput('');
      setActionSuccess('Owner verified: Welcome, Hussnain.');
    } else {
      setPasscodeError('Incorrect owner password. If you forgot your password, recover access via your email below.');
    }
  };

  const handleRecoverByEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = recoveryEmail.trim().toLowerCase();

    if (cleanEmail === 'hussnainansari.dev@gmail.com') {
      try {
        localStorage.setItem('hussnain_owner_authenticated', 'true');
      } catch {
        // Fallback
      }
      setIsOwnerAuthenticated(true);
      setIsRecoveringPassword(false);
      setRecoveryError(null);
      setRecoveryEmail('');
      setActionSuccess('Owner identity verified via hussnainansari.dev@gmail.com! Studio unlocked.');
    } else {
      setRecoveryError('Unrecognized recovery email. Only your registered owner email (hussnainansari.dev@gmail.com) can recover access.');
    }
  };

  const handleLockOwnerStudio = () => {
    try {
      localStorage.removeItem('hussnain_owner_authenticated');
    } catch {
      // Fallback
    }
    setIsOwnerAuthenticated(false);
    setPasscodeInput('');
    setActionSuccess('Owner studio locked.');
  };

  // QR Code Generation
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

  // ==========================================
  // PHOTO STUDIO HANDLERS
  // ==========================================
  const processSelectedPhoto = (file: File) => {
    setPhotoError(null);
    setActionSuccess(null);

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setPhotoError('Unable to process this image. Please select a valid JPG, PNG, or WebP file.');
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processSelectedPhoto(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processSelectedPhoto(file);
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
      setActionSuccess('Device preview updated! The profile photo has updated across this device.');
    } catch {
      setPhotoError('Your browser could not save this preview locally. Browser storage quota may be exceeded.');
    }
  };

  const handleResetPreview = () => {
    try {
      localStorage.removeItem('hussnain_preview_profile_photo');
      window.dispatchEvent(new Event('profile-photo-updated'));
      setPreviewActive(false);
      setActionSuccess('Local preview reset. Default canonical photo restored.');
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
    setActionSuccess('Downloaded profile.jpg! Place it in public/images/profile.jpg and commit to GitHub.');
  };

  // ==========================================
  // JOURNEY STUDIO HANDLERS
  // ==========================================
  const handleEvidenceImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Please choose a valid JPG, PNG, or WebP image.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image exceeds 2MB limit for local browser storage. Please choose a smaller screenshot.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setJImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const openNewJourneyForm = () => {
    setEditingDay(null);
    const maxDay = Math.max(...localDrafts.map((d) => d.dayNumber), ...LEARNING_ENTRIES.map((d) => d.dayNumber));
    setJDay(maxDay + 1);
    setJDate(new Date().toISOString().split('T')[0]);
    setJTopic('');
    setJTitle('');
    setJWhy('');
    setJLearned('');
    setJConfused('');
    setJChanged('');
    setJPractice('');
    setJProof('');
    setJTools('Python 3.12, VS Code');
    setJImage('');
    setIsEditingJourney(true);
  };

  const openEditJourneyForm = (entry: LearningEntry) => {
    setEditingDay(entry.dayNumber);
    setJDay(entry.dayNumber);
    setJDate(entry.date);
    setJTopic(entry.topic);
    setJTitle(entry.shortTitle);
    setJWhy(entry.whyIStudiedIt || '');
    setJLearned(entry.whatILearned);
    setJConfused(entry.whatConfusedMe);
    setJChanged(entry.whatChanged);
    setJPractice(entry.practice || '');
    setJProof(entry.proof);
    setJTools(entry.tools.join(', '));
    setJImage(entry.image || '');
    setIsEditingJourney(true);
  };

  const handleSaveJourneyDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jTopic.trim() || !jTitle.trim() || !jLearned.trim()) {
      alert('Please fill in Day, Date, Topic, Title, and What I Learned.');
      return;
    }

    const toolsArr = jTools.split(',').map((t) => t.trim()).filter(Boolean);

    const newEntry: LearningEntry = {
      dayNumber: jDay,
      date: jDate,
      topic: jTopic.trim(),
      shortTitle: jTitle.trim(),
      whyIStudiedIt: jWhy.trim() || undefined,
      whatILearned: jLearned.trim(),
      whatConfusedMe: jConfused.trim(),
      whatChanged: jChanged.trim(),
      practice: jPractice.trim() || undefined,
      proof: jProof.trim() || 'Logged and documented in public notebook.',
      tools: toolsArr.length > 0 ? toolsArr : ['Python'],
      image: jImage || undefined,
      status: 'COMPLETED',
      isLocalPreview: true
    };

    const existingOtherDrafts = localDrafts.filter((d) => d.dayNumber !== (editingDay ?? jDay));
    const updated = [newEntry, ...existingOtherDrafts];
    setLocalDrafts(updated);
    saveLocalJourneyEntries(updated);
    setIsEditingJourney(false);
    setActionSuccess(`Day ${jDay} saved locally! It now appears on this device's public portfolio preview.`);
  };

  const handleDeleteJourneyDraft = (dayNum: number) => {
    const updated = localDrafts.filter((d) => d.dayNumber !== dayNum);
    setLocalDrafts(updated);
    saveLocalJourneyEntries(updated);
    setActionSuccess(`Day ${dayNum} draft removed from local preview.`);
  };

  const handleExportJourneyJson = () => {
    const all = [...localDrafts, ...LEARNING_ENTRIES];
    const sorted = all.sort((a, b) => b.dayNumber - a.dayNumber);
    const formatted = JSON.stringify(sorted, null, 2);

    const blob = new Blob([formatted], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'journey.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setActionSuccess('Exported journey.json successfully!');
  };

  const handleImportJourneyJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!Array.isArray(parsed)) {
          alert('This Journey JSON file is invalid or has an unsupported structure.');
          return;
        }

        const importedEntries: LearningEntry[] = [];
        for (const item of parsed) {
          const dayNumber = Number(item.day || item.dayNumber);
          const topic = item.topic || '';
          const shortTitle = item.title || item.shortTitle || '';
          const whatILearned = item.learned || item.whatILearned || '';

          if (!dayNumber || !topic || !shortTitle || !whatILearned) {
            alert('This Journey JSON file is invalid or has an unsupported structure.');
            return;
          }

          importedEntries.push({
            dayNumber,
            date: item.date || new Date().toISOString().split('T')[0],
            topic,
            shortTitle,
            whyIStudiedIt: item.whyIStudiedIt || item.why,
            whatILearned,
            whatConfusedMe: item.challenge || item.whatConfusedMe || '',
            whatChanged: item.changed || item.whatChanged || '',
            practice: item.practice,
            proof: item.proof || 'Documented in public notebook.',
            tools: Array.isArray(item.tools) ? item.tools : ['Python'],
            image: item.evidenceImage || item.image,
            status: 'COMPLETED',
            isLocalPreview: true
          });
        }

        setLocalDrafts(importedEntries);
        saveLocalJourneyEntries(importedEntries);
        setActionSuccess(`Successfully imported ${importedEntries.length} journey entries!`);
      } catch {
        alert('This Journey JSON file is invalid or has an unsupported structure.');
      }
    };
    reader.readAsText(file);
  };

  // Resume PDF handlers
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

  // ==========================================
  // VIEW 1: OWNER ACCESS GATE (If not authenticated)
  // Ensures ONLY Hussnain can access the upload & studio tools
  // ==========================================
  if (!isOwnerAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0E1730]/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-[#0E1730]/20 overflow-hidden">
          {/* Header */}
          <div className="bg-[#0E1730] text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#002B97] text-white flex items-center justify-center">
                <Lock className="w-4 h-4 text-[#2563EB]" />
              </div>
              <div>
                <h3 className="font-editorial text-lg font-bold leading-tight">
                  {isRecoveringPassword ? 'Password Recovery' : 'Owner-Only Studio'}
                </h3>
                <span className="text-[11px] font-mono-tech text-white/60">
                  {isRecoveringPassword ? 'Identity Verification via Email' : 'Profile Photo & Admin Tools'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 text-white/60 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            {!isRecoveringPassword ? (
              <>
                <div className="p-3 bg-[#E6EDF6] text-[#002B97] rounded-lg border border-[#002B97]/20 flex items-start gap-2.5 text-xs font-sans">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold font-mono-tech uppercase block text-[11px] mb-0.5">
                      Private Access Control
                    </span>
                    <p className="leading-relaxed">
                      This upload and authoring section is restricted exclusively to the site owner, <strong>Hussnain Ansari</strong>.
                    </p>
                  </div>
                </div>

                {passcodeError && (
                  <div className="p-3 bg-red-50 text-red-800 rounded-lg border border-red-200 text-xs font-mono-tech flex items-center gap-2 animate-shake">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{passcodeError}</span>
                  </div>
                )}

                <form onSubmit={handleOwnerLogin} className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-mono-tech uppercase font-semibold text-[#0E1730] flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-[#002B97]" />
                        <span>Enter Owner Password</span>
                      </label>
                    </div>
                    <input
                      type="password"
                      autoFocus
                      required
                      placeholder="Enter password"
                      value={passcodeInput}
                      onChange={(e) => setPasscodeInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-mono-tech bg-[#F8F7F3] border border-[#0E1730]/20 rounded-lg text-[#111827] focus:outline-none focus:border-[#002B97] focus:bg-white transition-colors"
                    />
                    <div className="flex items-center justify-between mt-2 text-[11px]">
                      <span className="text-gray-500 font-sans">
                        Protected with confidential password.
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsRecoveringPassword(true);
                          setPasscodeError(null);
                          setRecoveryError(null);
                        }}
                        className="font-mono-tech text-[#002B97] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-xs font-mono-tech text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      Return to Portfolio
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#002B97] hover:bg-[#0E1730] text-white text-xs font-mono-tech uppercase font-bold rounded-lg transition-colors cursor-pointer shadow-sm flex items-center gap-2"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>Unlock Studio</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="p-3 bg-[#E6EDF6] text-[#002B97] rounded-lg border border-[#002B97]/20 flex items-start gap-2.5 text-xs font-sans">
                  <Mail className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold font-mono-tech uppercase block text-[11px] mb-0.5">
                      Email Identity Recovery
                    </span>
                    <p className="leading-relaxed">
                      Forgot your password? Enter your registered owner email to verify your identity and restore access.
                    </p>
                  </div>
                </div>

                {recoveryError && (
                  <div className="p-3 bg-red-50 text-red-800 rounded-lg border border-red-200 text-xs font-mono-tech flex items-center gap-2 animate-shake">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{recoveryError}</span>
                  </div>
                )}

                <form onSubmit={handleRecoverByEmail} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#002B97]" />
                      <span>Registered Owner Email</span>
                    </label>
                    <input
                      type="email"
                      autoFocus
                      required
                      placeholder="hussnainansari.dev@gmail.com"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm font-mono-tech bg-[#F8F7F3] border border-[#0E1730]/20 rounded-lg text-[#111827] focus:outline-none focus:border-[#002B97] focus:bg-white transition-colors"
                    />
                    <div className="flex items-center justify-between mt-2 text-[11px]">
                      <span className="text-gray-500 font-sans">
                        Registered: <code>hussnainansari.dev@gmail.com</code>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsRecoveringPassword(false);
                          setPasscodeError(null);
                          setRecoveryError(null);
                        }}
                        className="font-mono-tech text-[#002B97] hover:underline cursor-pointer"
                      >
                        ← Back to login
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRecoveringPassword(false);
                        setPasscodeError(null);
                        setRecoveryError(null);
                      }}
                      className="px-4 py-2 text-xs font-mono-tech text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#002B97] hover:bg-[#0E1730] text-white text-xs font-mono-tech uppercase font-bold rounded-lg transition-colors cursor-pointer shadow-sm flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify &amp; Unlock</span>
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: UNLOCKED OWNER STUDIO
  // Full profile photo upload, cropping, and management
  // ==========================================
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0E1730]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-2xl border border-[#0E1730]/20 flex flex-col overflow-hidden max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#0E1730] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs uppercase tracking-wider text-[#2563EB] font-bold flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>OWNER STUDIO (ONLY YOU)</span>
            </span>
            <span className="text-white/40">/</span>
            <span className="text-xs font-mono-tech text-white/80 hidden sm:inline">
              hussnainansari.dev@gmail.com
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLockOwnerStudio}
              className="text-xs font-mono-tech text-white/60 hover:text-amber-300 flex items-center gap-1 px-2.5 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              title="Lock this studio on this browser"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock Studio</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
              aria-label="Close Admin Studio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Verified Owner Notice */}
        <div className="bg-[#E6EDF6] border-b border-[#002B97]/20 px-6 py-2.5 flex items-center justify-between text-xs text-[#002B97]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>
              <strong>Authenticated Owner Session:</strong> You can upload and crop your profile photo, preview it instantly, and download <code>profile.jpg</code>.
            </span>
          </div>
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
            <span>Profile Photo Upload</span>
          </button>

          <button
            onClick={() => setActiveTab('journey')}
            className={`pb-2.5 px-3 text-xs font-mono-tech uppercase font-semibold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'journey'
                ? 'border-[#002B97] text-[#002B97]'
                : 'border-transparent text-[#111827]/60 hover:text-[#0E1730]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Journey Studio</span>
            {localDrafts.length > 0 && (
              <span className="px-1.5 py-0.2 bg-[#002B97] text-white rounded text-[10px]">
                {localDrafts.length}
              </span>
            )}
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
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 text-xs font-mono-tech flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{actionSuccess}</span>
              </div>
              <button onClick={() => setActionSuccess(null)} className="text-emerald-700 hover:text-emerald-900">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {photoError && (
            <div className="p-3 bg-red-50 text-red-800 rounded border border-red-200 text-xs font-mono-tech flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{photoError}</span>
            </div>
          )}

          {/* TAB 1: OWNER-ONLY PROFILE PHOTO UPLOADER */}
          {activeTab === 'photo' && (
            <div className="space-y-6">
              {previewActive && (
                <div className="p-3 bg-[#0E1730] text-white rounded border border-[#2563EB]/40 text-xs font-mono-tech flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[#2563EB]" />
                    <span>Device Preview Active: Displaying your customized portrait on this browser.</span>
                  </div>
                  <button
                    onClick={handleResetPreview}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] transition-colors cursor-pointer"
                  >
                    Reset to Default Photo
                  </button>
                </div>
              )}

              {/* Upload Dropzone */}
              <div>
                <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-2 flex items-center justify-between">
                  <span>Owner Profile Photo Uploader (Only You)</span>
                  <span className="text-gray-500 font-normal">Supports JPG, PNG, WebP · Max 10MB</span>
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDraggingFile
                      ? 'border-[#002B97] bg-[#E6EDF6]'
                      : 'border-[#0E1730]/20 bg-[#F8F7F3] hover:border-[#002B97]/50'
                  }`}
                >
                  <Upload className="w-8 h-8 text-[#002B97] mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-mono-tech text-[#0E1730] font-semibold mb-1">
                    Drag and drop your portrait here, or click Browse
                  </p>
                  <p className="text-[11px] text-gray-500 font-sans mb-3">
                    Images are processed locally in your browser. Nothing is sent to external servers.
                  </p>

                  <label className="inline-block py-2 px-5 bg-[#002B97] hover:bg-[#0E1730] text-white text-xs font-mono-tech uppercase font-bold rounded cursor-pointer transition-colors shadow-xs">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <span>Choose Photo</span>
                  </label>
                </div>
              </div>

              {!selectedImage && (
                <div className="p-8 text-center bg-[#F8F7F3] rounded-lg border border-[#0E1730]/10 text-xs font-mono-tech text-gray-500">
                  <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p>Upload a new portrait image above to crop and preview your official portfolio photo.</p>
                </div>
              )}

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
                          <span>Apply to This Device</span>
                        </button>

                        <button
                          onClick={handleDownloadProfileJpg}
                          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-[#002B97] hover:bg-[#0E1730] text-white text-xs font-mono-tech uppercase font-bold rounded transition-colors shadow-xs cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download profile.jpg</span>
                        </button>
                      </div>

                      <p className="text-[11px] text-gray-500 font-sans italic">
                        Clicking "Apply to This Device" immediately updates your photo on this browser. To publish permanently for everyone, follow the GitHub step below.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#FFFFFF] p-4 rounded-lg border border-[#0E1730]/15 space-y-2.5">
                    <span className="text-xs font-mono-tech uppercase tracking-wider font-bold text-[#002B97] block">
                      Replace the live profile photo for all visitors:
                    </span>
                    <ol className="list-decimal list-outside pl-4 space-y-1.5 text-xs text-[#111827]/80 font-sans">
                      <li>Download the processed image as <code>profile.jpg</code> using the button above.</li>
                      <li>Open your GitHub repository: <code>hussnainansari-dev/hussnainansari-portfolio</code>.</li>
                      <li>Navigate into: <code>public/images/profile.jpg</code>.</li>
                      <li>Replace <code>profile.jpg</code> with your new file and commit to <code>main</code>.</li>
                      <li>GitHub Actions will build and deploy your new photo automatically in ~1 minute.</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: JOURNEY STUDIO */}
          {activeTab === 'journey' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0E1730]/10 pb-4">
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#0E1730]">
                    Journey Studio
                  </h3>
                  <p className="text-xs text-[#4B5563] font-mono-tech">
                    Learning in Public • Student Journey local preparation system
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={openNewJourneyForm}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#002B97] hover:bg-[#0E1730] text-white rounded text-xs font-mono-tech uppercase font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Entry</span>
                  </button>

                  <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#F1F3F5] hover:bg-gray-200 text-[#0E1730] rounded text-xs font-mono-tech uppercase font-bold transition-colors cursor-pointer border border-[#0E1730]/10">
                    <FileUp className="w-4 h-4" />
                    <span>Import JSON</span>
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={handleImportJourneyJson}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={handleExportJourneyJson}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#E6EDF6] hover:bg-[#002B97] hover:text-white text-[#002B97] rounded text-xs font-mono-tech uppercase font-bold transition-colors cursor-pointer border border-[#002B97]/20"
                    title="Export local journey entries as journey.json"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Journey JSON</span>
                  </button>
                </div>
              </div>

              {/* Journey Form with Real-time Live Preview */}
              {isEditingJourney && (
                <div className="space-y-6 bg-[#F8F7F3] p-5 sm:p-6 rounded-lg border border-[#0E1730]/15 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-[#0E1730]/10 pb-3">
                    <span className="text-xs font-mono-tech font-bold uppercase text-[#002B97]">
                      {editingDay ? `Editing Day ${editingDay}` : 'Create New Entry'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingJourney(false)}
                      className="p-1 text-gray-500 hover:text-gray-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Real-time Live Preview */}
                  <div className="bg-white p-5 rounded-lg border border-[#002B97]/25 shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono-tech border-b border-[#0E1730]/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#002B97] bg-[#E6EDF6] px-2 py-0.5 rounded">
                          LIVE PREVIEW / DAY {String(jDay).padStart(2, '0')}
                        </span>
                        <span className="text-gray-400">·</span>
                        <span className="text-[#0E1730]">{jTopic || 'Topic / Discipline'}</span>
                      </div>
                      <span className="text-gray-500">{jDate || 'Date'}</span>
                    </div>

                    <h4 className="font-editorial text-xl font-bold text-[#0E1730]">
                      {jTitle || 'Headline / Title'}
                    </h4>

                    {jWhy && (
                      <p className="text-xs italic text-gray-600 font-sans">
                        “{jWhy}”
                      </p>
                    )}

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono-tech uppercase font-bold text-[#002B97] block">
                        WHAT I LEARNED:
                      </span>
                      <p className="text-xs text-gray-800 bg-[#F8F7F3] p-3 rounded leading-relaxed font-sans">
                        {jLearned || 'Concepts and mechanics learned will display here in real time...'}
                      </p>
                    </div>

                    {jConfused && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono-tech uppercase font-bold text-[#D97706] block">
                          WHAT CONFUSED / CHALLENGED ME:
                        </span>
                        <p className="text-xs text-amber-900 bg-amber-50/70 p-2.5 rounded font-sans">
                          {jConfused}
                        </p>
                      </div>
                    )}

                    {jChanged && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono-tech uppercase font-bold text-[#002B97] block">
                          WHAT CHANGED IN MY UNDERSTANDING:
                        </span>
                        <p className="text-xs text-gray-700 font-sans">
                          {jChanged}
                        </p>
                      </div>
                    )}

                    {jImage && (
                      <div className="max-h-40 overflow-hidden rounded border border-gray-200 bg-slate-50">
                        <img src={jImage} alt="Evidence preview" className="max-h-40 object-contain mx-auto" />
                      </div>
                    )}

                    <div className="pt-2 border-t border-[#0E1730]/5 flex items-center justify-between text-[11px] font-mono-tech text-gray-500">
                      <span>Tools: {jTools}</span>
                      <span>{jProof || 'Practice/Proof recorded'}</span>
                    </div>
                  </div>

                  {/* Form Controls */}
                  <form onSubmit={handleSaveJourneyDraft} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-1">
                          Day *
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={jDay}
                          onChange={(e) => setJDay(parseInt(e.target.value, 10) || 1)}
                          className="w-full px-3 py-2 text-xs font-mono-tech bg-white border border-[#0E1730]/15 rounded text-[#111827]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-1">
                          Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={jDate}
                          onChange={(e) => setJDate(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono-tech bg-white border border-[#0E1730]/15 rounded text-[#111827]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-1">
                        Topic *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Python / Data Structures & Tabular Logic"
                        value={jTopic}
                        onChange={(e) => setJTopic(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono-tech bg-white border border-[#0E1730]/15 rounded text-[#111827]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Connecting Python Dictionaries to Accounting Ledgers"
                        value={jTitle}
                        onChange={(e) => setJTitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-editorial text-base bg-white border border-[#0E1730]/15 rounded text-[#111827]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-1">
                        Why I Studied It
                      </label>
                      <input
                        type="text"
                        placeholder="Why did you explore this today?"
                        value={jWhy}
                        onChange={(e) => setJWhy(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#0E1730]/15 rounded text-[#111827]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-1">
                        What I Learned *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Concrete concepts and mechanics learned..."
                        value={jLearned}
                        onChange={(e) => setJLearned(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#0E1730]/15 rounded text-[#111827]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-1">
                        What Confused / Challenged Me
                      </label>
                      <textarea
                        rows={2}
                        placeholder="What was tricky or required deeper thought?"
                        value={jConfused}
                        onChange={(e) => setJConfused(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#0E1730]/15 rounded text-[#111827]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-1">
                        What Changed
                      </label>
                      <textarea
                        rows={2}
                        placeholder="How has your understanding or mental model changed?"
                        value={jChanged}
                        onChange={(e) => setJChanged(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#0E1730]/15 rounded text-[#111827]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-1">
                          Practice / Proof / Output
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Ledger validator tested on 50 sample entries"
                          value={jProof}
                          onChange={(e) => setJProof(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#0E1730]/15 rounded text-[#111827]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-1">
                          Tools
                        </label>
                        <input
                          type="text"
                          placeholder="Python 3.12, VS Code, Git"
                          value={jTools}
                          onChange={(e) => setJTools(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono-tech bg-white border border-[#0E1730]/15 rounded text-[#111827]"
                        />
                      </div>
                    </div>

                    {/* Evidence Image */}
                    <div>
                      <label className="block text-xs font-mono-tech uppercase font-semibold text-[#0E1730] mb-1">
                        Evidence Image (Optional JPG, PNG, WebP)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleEvidenceImageSelect}
                          className="text-xs text-gray-600 file:py-1.5 file:px-3 file:bg-[#002B97] file:text-white file:rounded file:border-0 file:text-xs file:font-mono-tech file:cursor-pointer"
                        />
                        {jImage && (
                          <button
                            type="button"
                            onClick={() => setJImage('')}
                            className="text-xs text-red-600 hover:underline cursor-pointer"
                          >
                            Remove Image
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#0E1730]/10">
                      <button
                        type="button"
                        onClick={() => setIsEditingJourney(false)}
                        className="px-4 py-2 text-xs font-mono-tech text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#002B97] hover:bg-[#0E1730] text-white text-xs font-mono-tech uppercase font-bold rounded transition-colors cursor-pointer shadow-xs"
                      >
                        {editingDay ? 'Save Changes' : 'Save Entry'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Drafts & Repository Entries List */}
              <div className="space-y-4">
                <span className="text-xs font-mono-tech uppercase font-bold text-[#0E1730] block">
                  Saved Entries (Local Browser Drafts + Published Repository)
                </span>

                {localDrafts.length === 0 && (
                  <div className="p-6 bg-white rounded-lg border border-[#0E1730]/10 text-center space-y-2">
                    <p className="text-xs font-mono-tech text-gray-500">
                      No Journey entries yet. Start documenting what you are learning.
                    </p>
                    <button
                      onClick={openNewJourneyForm}
                      className="px-4 py-1.5 bg-[#002B97] hover:bg-[#0E1730] text-white rounded text-xs font-mono-tech uppercase font-bold cursor-pointer"
                    >
                      Create First Entry
                    </button>
                  </div>
                )}

                <div className="divide-y divide-[#0E1730]/10 border border-[#0E1730]/10 rounded-lg overflow-hidden bg-white">
                  {/* Local Drafts */}
                  {localDrafts.map((draft) => (
                    <div key={`draft-${draft.dayNumber}`} className="p-4 bg-amber-50/40 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-mono-tech">
                          <span className="font-bold text-[#002B97]">DAY {String(draft.dayNumber).padStart(2, '0')}</span>
                          <span className="px-1.5 py-0.2 bg-amber-200 text-amber-900 rounded text-[9px] font-bold uppercase">
                            Local Device Preview
                          </span>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-600">{draft.date}</span>
                        </div>
                        <h4 className="font-editorial text-base font-bold text-[#0E1730]">{draft.shortTitle}</h4>
                        <p className="text-xs text-gray-600 line-clamp-1">{draft.whatILearned}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openEditJourneyForm(draft)}
                          className="p-1.5 border border-gray-300 rounded hover:bg-gray-100 text-xs font-mono-tech flex items-center gap-1 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmDay(draft.dayNumber)}
                          className="p-1.5 border border-red-200 text-red-600 rounded hover:bg-red-50 text-xs font-mono-tech flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Repository Baseline Entries */}
                  {LEARNING_ENTRIES.map((entry) => (
                    <div key={`repo-${entry.dayNumber}`} className="p-4 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-mono-tech">
                          <span className="font-bold text-[#002B97]">DAY {String(entry.dayNumber).padStart(2, '0')}</span>
                          <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded text-[9px] font-bold uppercase">
                            Published in Repo
                          </span>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-600">{entry.date}</span>
                        </div>
                        <h4 className="font-editorial text-base font-bold text-[#0E1730]">{entry.shortTitle}</h4>
                        <p className="text-xs text-gray-600 line-clamp-1">{entry.whatILearned}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openEditJourneyForm(entry)}
                          className="p-1.5 border border-gray-300 rounded hover:bg-gray-100 text-xs font-mono-tech flex items-center gap-1 cursor-pointer"
                          title="Copy details into editor as draft"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit as Draft</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-[#FFFFFF] p-4 rounded-lg border border-[#0E1730]/15 space-y-2 text-xs text-[#111827]/80">
                <span className="font-mono-tech uppercase font-bold text-[#002B97] block">
                  Publishing Workflow:
                </span>
                <ol className="list-decimal list-outside pl-4 space-y-1 font-sans">
                  <li>Create and preview your entry on this device using <strong>Create New Entry</strong>.</li>
                  <li>Click <strong>Export Journey JSON</strong> to download <code>journey.json</code>.</li>
                  <li>Transfer the entry into your repository source data at <code>src/data/learningJourney.ts</code>.</li>
                  <li>Commit and push to GitHub. GitHub Pages will build and deploy the update for all visitors.</li>
                </ol>
              </div>
            </div>
          )}

          {/* TAB 3: RESUME PDF STUDIO */}
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#002B97] text-white rounded font-bold text-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download as Hussnain_Ansari_Resume.pdf</span>
                    </button>
                  </div>

                  <div className="text-xs text-[#111827]/80 space-y-1 font-sans">
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

          {/* TAB 4: QR CODE GENERATOR */}
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
                        className="px-3 py-2 bg-[#E6EDF6] text-[#002B97] hover:bg-[#0E1730] hover:text-white rounded text-xs transition-colors cursor-pointer"
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

          {/* TAB 5: SEO & METADATA INSPECTOR */}
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
                    <span className="text-[#111827]/60 font-semibold">Primary Contact Email:</span>
                    <span className="text-[#0E1730] text-right font-bold">hussnainansari.dev@gmail.com</span>
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
          <span>Owner workspace · Static GitHub Pages deployment</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0E1730] text-white rounded hover:bg-[#002B97] transition-colors cursor-pointer"
          >
            Close Studio
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmDay !== null && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-[#0E1730]/15 max-w-sm w-full p-6 space-y-4 shadow-xl">
            <h4 className="font-editorial text-xl font-bold text-[#0E1730]">
              Delete this Journey entry?
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed font-sans">
              Delete this Journey entry? This removes the local browser copy for Day {deleteConfirmDay}. The repository source files are not modified.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmDay(null)}
                className="px-3.5 py-1.5 rounded text-xs font-mono-tech border border-gray-300 hover:bg-gray-50 text-gray-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (deleteConfirmDay !== null) {
                    handleDeleteJourneyDraft(deleteConfirmDay);
                    setDeleteConfirmDay(null);
                  }
                }}
                className="px-4 py-1.5 rounded text-xs font-mono-tech bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
