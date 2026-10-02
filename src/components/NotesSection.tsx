import React, { useState } from 'react';
import { PROCESS_NOTES, ProcessNote } from '../data/notes';
import { BookOpen, Clock, ArrowRight, X } from 'lucide-react';

export const NotesSection: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<ProcessNote | null>(null);

  return (
    <section id="notes" className="py-20 md:py-28 bg-[#F8F7F3] border-b border-[#0E1730]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-[#002B97] tracking-wider mb-3">
            <span className="font-semibold">07 / PROCESS NOTES</span>
            <span aria-hidden="true" className="text-[#0E1730]/30">·</span>
            <span>KNOWLEDGE JOURNAL & ESSAYS</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0E1730] text-balance">
            Notes from the process.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#111827]/75 font-normal leading-relaxed">
            Written reflections from my studies in accounting, programmatic experimentation in Python,
            and observations on business data analysis.
          </p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROCESS_NOTES.map((note) => (
            <article
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className="bg-white rounded-lg border border-[#0E1730]/10 p-6 sm:p-8 flex flex-col justify-between hover:border-[#002B97]/40 transition-all duration-150 cursor-pointer shadow-[0_2px_12px_rgba(14,23,48,0.02)] group"
            >
              <div>
                {/* Note Meta */}
                <div className="flex items-center justify-between text-xs font-mono-tech text-[#111827]/60 mb-4 pb-3 border-b border-[#0E1730]/10">
                  <span className="text-[#002B97] font-semibold uppercase tracking-wider">
                    {note.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span>{note.date}</span>
                    <span aria-hidden="true" className="text-[#0E1730]/20">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>{note.readingTime}</span>
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-editorial text-2xl font-bold text-[#0E1730] group-hover:text-[#002B97] transition-colors leading-snug">
                  {note.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-3 text-sm text-[#111827]/75 leading-relaxed font-sans">
                  {note.excerpt}
                </p>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-[#0E1730]/10 flex items-center justify-between text-xs font-mono-tech font-semibold text-[#002B97]">
                <span>Read Full Essay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0E1730]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#F8F7F3] text-[#111827] w-full max-w-3xl max-h-[90vh] rounded-lg border border-[#0E1730]/20 shadow-2xl overflow-y-auto p-6 sm:p-10 space-y-6 relative my-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedNote(null)}
              className="absolute top-6 right-6 p-2 text-[#0E1730]/70 hover:text-[#0E1730] hover:bg-[#E6EDF6] rounded transition-colors cursor-pointer"
              aria-label="Close Note Reader"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Note Header */}
            <div className="border-b border-[#0E1730]/10 pb-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#002B97] uppercase tracking-wider font-semibold">
                <span>{selectedNote.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedNote.date}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedNote.readingTime}</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0E1730] leading-tight">
                {selectedNote.title}
              </h2>
            </div>

            {/* Essay Content */}
            <div className="space-y-4 text-base text-[#111827]/85 leading-relaxed font-sans max-w-prose">
              {selectedNote.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-6 border-t border-[#0E1730]/10 flex items-center justify-between text-xs font-mono-tech">
              <span className="text-[#111827]/60">
                Author: Hussnain Ansari · Lahore, Pakistan
              </span>
              <button
                onClick={() => setSelectedNote(null)}
                className="px-4 py-2 bg-[#002B97] text-white rounded font-semibold hover:bg-[#0E1730] transition-colors cursor-pointer"
              >
                Close Essay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
