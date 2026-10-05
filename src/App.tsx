import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { JourneyTimeline } from './components/JourneyTimeline';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CurrentlyLearning } from './components/CurrentlyLearning';
import { LearningInPublic } from './components/LearningInPublic';
import { NotesSection } from './components/NotesSection';
import { ContactSection } from './components/ContactSection';
import { LiveShareSection } from './components/LiveShareSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { FinovahCaseStudyModal } from './components/FinovahCaseStudyModal';
import { AdminStudioModal } from './components/AdminStudioModal';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [finovahStudyOpen, setFinovahStudyOpen] = useState(false);
  const [adminStudioOpen, setAdminStudioOpen] = useState(false);
  const [adminStudioTab, setAdminStudioTab] = useState<'photo' | 'journey' | 'resume' | 'qrcode' | 'seo'>('photo');
  const [activeSection, setActiveSection] = useState('about');

  // Listen to hash changes for hidden #/admin and #/upload routes
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#/admin' || hash === '#admin') {
        setAdminStudioTab('photo');
        setAdminStudioOpen(true);
      } else if (hash === '#/upload' || hash === '#upload' || hash === '#/photo' || hash === '#photo') {
        setAdminStudioTab('photo');
        setAdminStudioOpen(true);
      } else if (hash === '#/journey' || hash === '#journey-admin') {
        setAdminStudioTab('journey');
        setAdminStudioOpen(true);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Keyboard shortcut for owner: Alt + U (Upload Profile Photo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        setAdminStudioTab('photo');
        setAdminStudioOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'journey', 'projects', 'learning', 'archive', 'notes', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreJourney = () => {
    const el = document.getElementById('journey');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPhotoStudio = () => {
    setAdminStudioTab('photo');
    setAdminStudioOpen(true);
  };

  const handleCloseAdminStudio = () => {
    setAdminStudioOpen(false);
    const hash = window.location.hash.toLowerCase();
    if (
      hash === '#/admin' ||
      hash === '#admin' ||
      hash === '#/upload' ||
      hash === '#upload' ||
      hash === '#/photo' ||
      hash === '#photo'
    ) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#111827] flex flex-col font-sans selection:bg-[#E6EDF6] selection:text-[#002B97]">
      {/* Subtle Desktop Cursor (disabled on touch & prefers-reduced-motion) */}
      <CustomCursor />

      {/* Clean 3-zone Navigation */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        activeSection={activeSection}
        onOpenPhotoStudio={handleOpenPhotoStudio}
      />

      {/* Main Content Area */}
      <main className="grow">
        {/* 00 / Intro & Hero */}
        <Hero
          onExploreJourney={handleExploreJourney}
          onViewProjects={handleViewProjects}
          onOpenResumeModal={() => setResumeOpen(true)}
        />

        {/* 01 / About: Grounding & Experience */}
        <About
          onOpenResumeModal={() => setResumeOpen(true)}
          onOpenPhotoStudio={handleOpenPhotoStudio}
        />

        {/* 02 / Journey: Research progression timeline */}
        <JourneyTimeline />

        {/* 03 / Capabilities: Honest skills taxonomy */}
        <SkillsSection />

        {/* 04 / Projects: FINOVAH and practical evidence */}
        <ProjectsSection
          onOpenFinovahCaseStudy={() => setFinovahStudyOpen(true)}
        />

        {/* 05 / Active Studies: Current, Next, Why */}
        <CurrentlyLearning />

        {/* 06 / Live Learning In Public: The Living Archive */}
        <LearningInPublic />

        {/* 07 / Process Notes: Knowledge Journal */}
        <NotesSection />

        {/* 08 / Contact: Let's Connect */}
        <ContactSection />

        {/* Live Share Section */}
        <LiveShareSection />
      </main>

      {/* Editorial Footer (public controls only) */}
      <Footer
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <FinovahCaseStudyModal
        isOpen={finovahStudyOpen}
        onClose={() => setFinovahStudyOpen(false)}
      />

      {/* Owner-Only Studio Modal */}
      <AdminStudioModal
        isOpen={adminStudioOpen}
        onClose={handleCloseAdminStudio}
        initialTab={adminStudioTab}
      />
    </div>
  );
}
