import React, { useState, useEffect } from 'react';
import {
  getCurrentJourneyEntry,
  getRecentJourneyEntries,
  getAllJourneyEntries,
  LearningEntry
} from '../data/learningJourney';
import {
  Sparkles,
  ExternalLink,
  Instagram,
  Linkedin,
  Github,
  Calendar,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  HelpCircle,
  ImageIcon,
  Eye,
  BookOpen
} from 'lucide-react';

export const LearningInPublic: React.FC = () => {
  const [currentEntry, setCurrentEntry] = useState<LearningEntry | undefined>(getCurrentJourneyEntry());
  const [recentEntries, setRecentEntries] = useState<LearningEntry[]>(getRecentJourneyEntries(3));
  const [allEntries, setAllEntries] = useState<LearningEntry[]>(getAllJourneyEntries());

  const [showFullArchive, setShowFullArchive] = useState(false);
  const [selectedEntryModal, setSelectedEntryModal] = useState<LearningEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTopic, setFilterTopic] = useState<string>('all');

  const reloadEntries = () => {
    setCurrentEntry(getCurrentJourneyEntry());
    setRecentEntries(getRecentJourneyEntries(3));
    setAllEntries(getAllJourneyEntries());
  };

  useEffect(() => {
    reloadEntries();

    const handleUpdate = () => {
      reloadEntries();
    };

    window.addEventListener('journey-entries-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('journey-entries-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const topics = ['all', 'Python', 'SQL', 'Accounting'];

  const filteredArchive = allEntries.filter((entry) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      entry.shortTitle.toLowerCase().includes(q) ||
      entry.topic.toLowerCase().includes(q) ||
      entry.whatILearned.toLowerCase().includes(q) ||
      entry.whatConfusedMe.toLowerCase().includes(q) ||
      `day ${entry.dayNumber}`.includes(q);

    const matchesTopic =
      filterTopic === 'all' ||
      entry.topic.toLowerCase().includes(filterTopic.toLowerCase());

    return matchesSearch && matchesTopic;
  });

  return (
    <section
      id="archive"
      className="py-20 md:py-28 bg-[#0E1730] text-[#F8F7F3] border-b border-[#0E1730] relative overflow-hidden bg-grid-navy"
    >
      {/* Decorative vertical grid lines */}
      <div className="absolute top-0 left-12 w-px h-full bg-white/5 hidden lg:block" />
      <div className="absolute top-0 right-12 w-px h-full bg-white/5 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-[#2563EB] tracking-wider mb-3">
            <span className="font-semibold">06 / LIVE LEARNING SYSTEM</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>LEARNING IN PUBLIC ARCHIVE</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white text-balance">
            Documenting the process of becoming capable.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#E6EDF6]/80 font-normal leading-relaxed">
            “I am not presenting myself as finished. I am documenting how I am becoming better.”
            <span className="block mt-1 text-sm font-mono-tech text-[#2563EB]">
              LEARN → PRACTICE → DOCUMENT → REFLECT → BUILD → REPEAT
            </span>
          </p>
        </div>

        {/* =====================================================================
            01. CURRENT JOURNEY (Always Newest Entry - Automatically Updated)
           ===================================================================== */}
        {currentEntry ? (
          <div className="mb-14 bg-white/5 rounded-lg border-2 border-[#2563EB]/40 p-6 sm:p-10 backdrop-blur-md relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            {/* Header Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono-tech text-xs font-bold text-white bg-[#002B97] px-3 py-1 rounded flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>CURRENT JOURNEY / DAY {String(currentEntry.dayNumber).padStart(2, '0')}</span>
                </span>
                <span className="text-xs font-mono-tech text-[#E6EDF6]/80">
                  {currentEntry.topic}
                </span>
                {currentEntry.isLocalPreview && (
                  <span className="text-[10px] font-mono-tech uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>Device Preview</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono-tech text-white/60">
                <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>{currentEntry.date}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Title & What I Learned / What Confused Me (Cols 1-7) */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {currentEntry.shortTitle}
                </h3>

                {currentEntry.whyIStudiedIt && (
                  <div className="space-y-1">
                    <span className="font-mono-tech text-xs uppercase tracking-wider text-[#E6EDF6]/70 font-semibold block">
                      WHY I STUDIED IT:
                    </span>
                    <p className="text-xs sm:text-sm text-[#E6EDF6]/85 font-sans leading-relaxed italic">
                      “{currentEntry.whyIStudiedIt}”
                    </p>
                  </div>
                )}

                {/* What I Learned */}
                <div className="space-y-1.5">
                  <span className="font-mono-tech text-xs uppercase tracking-wider text-[#2563EB] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>WHAT I LEARNED</span>
                  </span>
                  <p className="text-sm sm:text-base text-[#E6EDF6]/90 leading-relaxed font-sans bg-black/20 p-4 rounded border border-white/5">
                    {currentEntry.whatILearned}
                  </p>
                </div>

                {/* What Confused Me / Challenged Me */}
                <div className="space-y-1.5">
                  <span className="font-mono-tech text-xs uppercase tracking-wider text-[#D97706] font-bold flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>WHAT CONFUSED ME OR CHALLENGED ME</span>
                  </span>
                  <p className="text-xs sm:text-sm text-[#E6EDF6]/85 leading-relaxed font-sans bg-[#D97706]/10 p-3.5 rounded border border-[#D97706]/30">
                    {currentEntry.whatConfusedMe}
                  </p>
                </div>

                {/* Optional evidence image */}
                {currentEntry.image && (
                  <div className="space-y-1.5 pt-1">
                    <span className="font-mono-tech text-xs uppercase tracking-wider text-[#2563EB] font-bold flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>EVIDENCE / PROOF ARTIFACT</span>
                    </span>
                    <div
                      onClick={() => setSelectedEntryModal(currentEntry)}
                      className="w-full max-h-56 rounded overflow-hidden bg-black/40 border border-white/10 cursor-pointer group"
                    >
                      <img
                        src={currentEntry.image}
                        alt={`Day ${currentEntry.dayNumber} proof`}
                        className="w-full max-h-56 object-cover group-hover:scale-101 transition-transform"
                      />
                    </div>
                  </div>
                )}

                {/* Verified Links */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {currentEntry.githubLink && (
                    <a
                      href={currentEntry.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#E6EDF6] text-xs font-mono-tech rounded border border-white/10 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>View GitHub Proof →</span>
                    </a>
                  )}
                  {currentEntry.instagramLink && (
                    <a
                      href={currentEntry.instagramLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#E6EDF6] text-xs font-mono-tech rounded border border-white/10 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Instagram Log →</span>
                    </a>
                  )}
                  {currentEntry.linkedinLink && (
                    <a
                      href={currentEntry.linkedinLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#E6EDF6] text-xs font-mono-tech rounded border border-white/10 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>LinkedIn Reflection →</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: What Changed & Proof (Cols 8-12) */}
              <div className="lg:col-span-5 bg-black/30 rounded-lg p-5 sm:p-6 border border-white/10 space-y-4">
                {/* WHAT CHANGED */}
                <div className="space-y-1">
                  <span className="text-xs font-mono-tech uppercase tracking-wider text-[#2563EB] font-bold block">
                    WHAT CHANGED IN MY UNDERSTANDING:
                  </span>
                  <p className="text-xs sm:text-sm text-[#E6EDF6]/85 leading-relaxed font-sans">
                    {currentEntry.whatChanged}
                  </p>
                </div>

                {/* PRACTICE / PROOF / OUTPUT */}
                <div className="space-y-1 pt-3 border-t border-white/10">
                  <span className="text-xs font-mono-tech uppercase tracking-wider text-[#2563EB] font-bold block">
                    PRACTICE / PROOF / OUTPUT:
                  </span>
                  <div className="flex items-start gap-1.5 text-xs text-[#E6EDF6]/90 font-mono-tech">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>{currentEntry.proof}</span>
                  </div>
                </div>

                {/* TOOLS */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5 text-xs font-mono-tech">
                  <span className="text-white/50 mr-1">Tools:</span>
                  {currentEntry.tools.map((tool, idx) => (
                    <span key={tool} className="text-[#E6EDF6]">
                      {tool}
                      {idx < currentEntry.tools.length - 1 && (
                        <span aria-hidden="true" className="text-white/30 ml-1.5 mr-0.5">/</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-14 bg-white/5 rounded-lg border border-white/10 p-8 sm:p-12 text-center backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-[#002B97]/30 border border-[#2563EB]/30 flex items-center justify-center mx-auto mb-4 text-[#2563EB]">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-2">
              Learning in Public Archive
            </h3>
            <p className="text-sm text-[#E6EDF6]/80 max-w-lg mx-auto font-sans leading-relaxed mb-4">
              I document the real, unvarnished journey of becoming capable across accounting, finance, data analytics, and programming.
            </p>
            <span className="inline-block text-xs font-mono-tech text-[#2563EB] bg-[#002B97]/20 border border-[#2563EB]/30 px-3 py-1.5 rounded">
              Ready for owner authoring in Admin Studio (Alt + U)
            </span>
          </div>
        )}

        {/* =====================================================================
            02. RECENT JOURNEY (Chronological Prior Entries)
           ===================================================================== */}
        {recentEntries.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono-tech uppercase tracking-wider text-[#E6EDF6]/70 font-semibold">
                RECENT JOURNEY / FIELD ARCHIVE
              </span>
              <button
                onClick={() => setShowFullArchive(!showFullArchive)}
                className="text-xs font-mono-tech text-[#2563EB] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{showFullArchive ? 'Hide Full Archive' : `Open Full Archive (${allEntries.length} entries)`}</span>
                {showFullArchive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentEntries.map((entry) => (
                <div
                  key={entry.dayNumber}
                  onClick={() => setSelectedEntryModal(entry)}
                  className="bg-white/5 rounded-lg border border-white/10 p-5 sm:p-6 hover:bg-white/10 hover:border-[#2563EB]/40 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-tech mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#2563EB]">
                          DAY {String(entry.dayNumber).padStart(2, '0')}
                        </span>
                        {entry.isLocalPreview && (
                          <span className="text-[9px] uppercase font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded">
                            Preview
                          </span>
                        )}
                      </div>
                      <span className="text-white/50">{entry.date}</span>
                    </div>

                    <span className="text-[11px] font-mono-tech text-white/60 block mb-1">
                      {entry.topic}
                    </span>

                    <h4 className="font-editorial text-xl font-bold text-white group-hover:text-[#2563EB] transition-colors leading-snug">
                      {entry.shortTitle}
                    </h4>

                    <p className="mt-3 text-xs text-[#E6EDF6]/75 line-clamp-2 leading-relaxed font-sans">
                      {entry.whatILearned}
                    </p>

                    <div className="mt-3 pt-2 border-t border-white/5 text-[11px] text-[#D97706]/90 line-clamp-1">
                      <span className="font-mono-tech font-semibold">Challenge:</span> {entry.whatConfusedMe}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-[#2563EB]">
                    <span>Inspect Field Note →</span>
                    <span className="text-white/40">{entry.tools[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* =====================================================================
            03. FULL ARCHIVE (Expandable, Filterable)
           ===================================================================== */}
        {showFullArchive && (
          <div className="mt-12 bg-black/40 rounded-lg border border-white/10 p-6 sm:p-8 animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <h4 className="font-editorial text-2xl font-bold text-white">
                  Complete Learning Journey Archive
                </h4>
                <p className="text-xs font-mono-tech text-[#E6EDF6]/60 mt-1">
                  Chronologically indexed newest first. Scalable to hundreds of entries.
                </p>
              </div>

              {/* Filter Tabs & Search Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded font-mono-tech text-xs">
                  {topics.map((t) => (
                    <button
                      key={t}
                      onClick={() => setFilterTopic(t)}
                      className={`px-2.5 py-1 rounded transition-colors uppercase text-[11px] cursor-pointer ${
                        filterTopic === t
                          ? 'bg-[#2563EB] text-white font-bold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-60">
                  <Search className="w-3.5 h-3.5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search days, topics, notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs font-mono-tech bg-white/10 border border-white/20 rounded text-white placeholder-white/40 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </div>

            {/* Archive List Items */}
            <div className="divide-y divide-white/10">
              {filteredArchive.map((entry) => (
                <div
                  key={entry.dayNumber}
                  onClick={() => setSelectedEntryModal(entry)}
                  className="py-4 px-3 hover:bg-white/5 rounded transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-start md:items-center gap-4">
                    <span className="font-mono-tech text-xs font-bold text-[#2563EB] bg-white/10 px-2.5 py-1 rounded shrink-0">
                      DAY {String(entry.dayNumber).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-editorial text-lg font-bold text-white group-hover:text-[#2563EB] transition-colors">
                          {entry.shortTitle}
                        </h5>
                        {entry.isLocalPreview && (
                          <span className="text-[9px] uppercase font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded">
                            Preview
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono-tech text-[#E6EDF6]/60">
                        {entry.topic} · {entry.proof}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono-tech text-white/50 self-end md:self-auto">
                    <span>{entry.date}</span>
                    <span className="text-[#2563EB] group-hover:underline">Read Field Note →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          NOTE DETAIL MODAL (Full inspection of any field note)
         ===================================================================== */}
      {selectedEntryModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0E1730] text-white w-full max-w-2xl rounded-lg border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEntryModal(null)}
              className="absolute top-5 right-5 p-1.5 text-white/70 hover:text-white rounded bg-white/10 cursor-pointer"
              aria-label="Close Note"
            >
              ✕
            </button>

            <div className="border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#2563EB] font-bold mb-1">
                <span>DAY {String(selectedEntryModal.dayNumber).padStart(2, '0')}</span>
                <span>·</span>
                <span>{selectedEntryModal.topic}</span>
                {selectedEntryModal.isLocalPreview && (
                  <span className="text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                    Device Preview
                  </span>
                )}
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold">
                {selectedEntryModal.shortTitle}
              </h3>
              <span className="text-xs font-mono-tech text-white/50 block mt-1">
                Recorded on {selectedEntryModal.date}
              </span>
            </div>

            <div className="space-y-4 text-sm text-[#E6EDF6]/90 leading-relaxed font-sans">
              {selectedEntryModal.whyIStudiedIt && (
                <div>
                  <span className="font-mono-tech text-xs uppercase text-[#E6EDF6]/70 font-semibold block mb-1">
                    WHY I STUDIED IT
                  </span>
                  <p className="text-xs sm:text-sm italic text-[#E6EDF6]/85 bg-white/5 p-3 rounded">
                    “{selectedEntryModal.whyIStudiedIt}”
                  </p>
                </div>
              )}

              <div>
                <span className="font-mono-tech text-xs uppercase text-[#2563EB] font-bold block mb-1">
                  WHAT I LEARNED
                </span>
                <p className="bg-white/5 p-3.5 rounded border border-white/5 text-xs sm:text-sm">
                  {selectedEntryModal.whatILearned}
                </p>
              </div>

              <div>
                <span className="font-mono-tech text-xs uppercase text-[#D97706] font-bold block mb-1">
                  WHAT CONFUSED ME OR CHALLENGED ME
                </span>
                <p className="bg-[#D97706]/10 p-3.5 rounded border border-[#D97706]/30 text-xs sm:text-sm text-[#E6EDF6]">
                  {selectedEntryModal.whatConfusedMe}
                </p>
              </div>

              <div>
                <span className="font-mono-tech text-xs uppercase text-[#2563EB] font-bold block mb-1">
                  WHAT CHANGED IN MY UNDERSTANDING
                </span>
                <p className="text-xs sm:text-sm">{selectedEntryModal.whatChanged}</p>
              </div>

              {selectedEntryModal.image ? (
                <div>
                  <span className="font-mono-tech text-xs uppercase text-[#2563EB] font-bold block mb-1.5 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>EVIDENCE / PROOF ARTIFACT</span>
                  </span>
                  <div className="rounded overflow-hidden border border-white/15 max-h-80 bg-black/50">
                    <img
                      src={selectedEntryModal.image}
                      alt="Proof artifact"
                      className="w-full max-h-80 object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <span className="font-mono-tech text-xs uppercase text-[#2563EB] font-bold block mb-1">
                    PRACTICE / PROOF / OUTPUT
                  </span>
                  <p className="text-xs text-white/80 font-mono-tech">{selectedEntryModal.proof}</p>
                </div>
              )}
            </div>

            {/* Links in Modal */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {selectedEntryModal.githubLink && (
                <a
                  href={selectedEntryModal.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#E6EDF6] text-xs font-mono-tech rounded transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>GitHub Repository →</span>
                </a>
              )}
              {selectedEntryModal.instagramLink && (
                <a
                  href={selectedEntryModal.instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#E6EDF6] text-xs font-mono-tech rounded transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Instagram Post →</span>
                </a>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech">
              <span className="text-white/50">
                Tools: {selectedEntryModal.tools.join(', ')}
              </span>
              <button
                onClick={() => setSelectedEntryModal(null)}
                className="px-4 py-2 bg-[#2563EB] hover:bg-[#002B97] text-white rounded font-semibold cursor-pointer"
              >
                Close Field Note
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
