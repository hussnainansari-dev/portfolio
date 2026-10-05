import { SITE_CONFIG } from './social';

export interface LearningEntry {
  dayNumber: number;
  date: string;
  topic: string;
  shortTitle: string;
  whyIStudiedIt?: string;
  whatILearned: string;
  whatConfusedMe: string;
  whatChanged: string;
  practice?: string;
  proof: string;
  tools: string[];
  githubLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
  image?: string;
  status: 'COMPLETED' | 'LOGGED' | 'IN PROGRESS';
  isLocalPreview?: boolean;
}

export const LOCAL_JOURNEY_STORAGE_KEY = 'hussnain_journey_local_entries';

/**
 * Reads any locally saved Journey entries on this specific device.
 */
export function getLocalJourneyEntries(): LearningEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_JOURNEY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((e) => ({ ...e, isLocalPreview: true }));
    }
  } catch {
    // Graceful fallback in private browsing
  }
  return [];
}

/**
 * Saves local Journey entries to localStorage.
 */
export function saveLocalJourneyEntries(entries: LearningEntry[]): void {
  try {
    localStorage.setItem(LOCAL_JOURNEY_STORAGE_KEY, JSON.stringify(entries));
    window.dispatchEvent(new Event('journey-entries-updated'));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Repository published baseline entries.
 * Previous sample days 1-5 have been removed so the owner (Hussnain Ansari) can author his own journey days.
 */
export const LEARNING_ENTRIES: LearningEntry[] = [];

/**
 * Returns merged entries (including local drafts if on this browser) sorted descending by dayNumber.
 */
export function getMergedLearningEntries(): LearningEntry[] {
  const localEntries = getLocalJourneyEntries();
  const localDays = new Set(localEntries.map((e) => e.dayNumber));

  // Filter out any published entries that have a local draft override
  const baseEntries = LEARNING_ENTRIES.filter((e) => !localDays.has(e.dayNumber));
  const combined = [...localEntries, ...baseEntries];

  return combined.sort((a, b) => {
    if (b.dayNumber !== a.dayNumber) {
      return b.dayNumber - a.dayNumber;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getCurrentJourneyEntry(): LearningEntry | undefined {
  const sorted = getMergedLearningEntries();
  return sorted[0];
}

export function getRecentJourneyEntries(count = 3): LearningEntry[] {
  const sorted = getMergedLearningEntries();
  return sorted.slice(1, 1 + count);
}

export function getAllJourneyEntries(): LearningEntry[] {
  return getMergedLearningEntries();
}

/**
 * Generates the clean TypeScript code for src/data/learningJourney.ts with all current entries,
 * allowing the owner to download or copy directly to GitHub to deploy publicly.
 */
export function generateLearningJourneyTsCode(entries: LearningEntry[]): string {
  const cleanEntries = entries.map((entry) => {
    const { isLocalPreview, ...rest } = entry;
    return rest;
  });

  return `import { SITE_CONFIG } from './social';

export interface LearningEntry {
  dayNumber: number;
  date: string;
  topic: string;
  shortTitle: string;
  whyIStudiedIt?: string;
  whatILearned: string;
  whatConfusedMe: string;
  whatChanged: string;
  practice?: string;
  proof: string;
  tools: string[];
  githubLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
  image?: string;
  status: 'COMPLETED' | 'LOGGED' | 'IN PROGRESS';
  isLocalPreview?: boolean;
}

export const LOCAL_JOURNEY_STORAGE_KEY = 'hussnain_journey_local_entries';

export function getLocalJourneyEntries(): LearningEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_JOURNEY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((e) => ({ ...e, isLocalPreview: true }));
    }
  } catch {
    // Graceful fallback
  }
  return [];
}

export function saveLocalJourneyEntries(entries: LearningEntry[]): void {
  try {
    localStorage.setItem(LOCAL_JOURNEY_STORAGE_KEY, JSON.stringify(entries));
    window.dispatchEvent(new Event('journey-entries-updated'));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Repository published baseline entries.
 */
export const LEARNING_ENTRIES: LearningEntry[] = ${JSON.stringify(cleanEntries, null, 2)};

export function getMergedLearningEntries(): LearningEntry[] {
  const localEntries = getLocalJourneyEntries();
  const localDays = new Set(localEntries.map((e) => e.dayNumber));
  const baseEntries = LEARNING_ENTRIES.filter((e) => !localDays.has(e.dayNumber));
  const combined = [...localEntries, ...baseEntries];

  return combined.sort((a, b) => {
    if (b.dayNumber !== a.dayNumber) {
      return b.dayNumber - a.dayNumber;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getCurrentJourneyEntry(): LearningEntry | undefined {
  const sorted = getMergedLearningEntries();
  return sorted[0];
}

export function getRecentJourneyEntries(count = 3): LearningEntry[] {
  const sorted = getMergedLearningEntries();
  return sorted.slice(1, 1 + count);
}

export function getAllJourneyEntries(): LearningEntry[] {
  return getMergedLearningEntries();
}
`;
}
