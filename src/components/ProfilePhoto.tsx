import React, { useState, useEffect } from 'react';

// Vite defined build timestamp for cache-busting
declare const __BUILD_TIMESTAMP__: number | undefined;

interface ProfilePhotoProps {
  size?: 'sm' | 'md' | 'lg' | 'custom';
  className?: string;
  rounded?: string;
  eager?: boolean;
  alt?: string;
  width?: number;
  height?: number;
}

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  size = 'md',
  className = '',
  rounded,
  eager = false,
  alt = 'Hussnain Ansari — Professional Portrait',
  width,
  height,
}) => {
  const [hasError, setHasError] = useState(false);
  const [photoSrc, setPhotoSrc] = useState<string>('');
  const [isPreview, setIsPreview] = useState(false);

  const loadSource = () => {
    try {
      const localPreview = localStorage.getItem('hussnain_preview_profile_photo');
      if (localPreview) {
        setPhotoSrc(localPreview);
        setIsPreview(true);
        setHasError(false);
        return;
      }
    } catch {
      // LocalStorage access may fail in private mode
    }

    const cacheBuster = typeof __BUILD_TIMESTAMP__ !== 'undefined' ? __BUILD_TIMESTAMP__ : '1';
    setPhotoSrc(`./images/profile.jpg?v=${cacheBuster}`);
    setIsPreview(false);
    setHasError(false);
  };

  useEffect(() => {
    loadSource();

    // Listen for storage changes from Admin Studio
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'hussnain_preview_profile_photo') {
        loadSource();
      }
    };

    const handleCustomChange = () => {
      loadSource();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profile-photo-updated', handleCustomChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profile-photo-updated', handleCustomChange);
    };
  }, []);

  // Preset dimension and style mappings
  let defaultWidth = 44;
  let defaultHeight = 44;
  let defaultSizeClasses = 'w-11 h-11';
  let defaultRounded = rounded ?? 'rounded-full';

  if (size === 'sm') {
    defaultWidth = 28;
    defaultHeight = 28;
    defaultSizeClasses = 'w-7 h-7';
    defaultRounded = rounded ?? 'rounded-full';
  } else if (size === 'lg') {
    defaultWidth = 400;
    defaultHeight = 533;
    defaultSizeClasses = 'w-full aspect-[3/4]';
    defaultRounded = rounded ?? 'rounded-lg';
  } else if (size === 'custom') {
    defaultSizeClasses = '';
    defaultRounded = rounded ?? 'rounded-md';
  }

  const finalWidth = width ?? defaultWidth;
  const finalHeight = height ?? defaultHeight;

  if (hasError || !photoSrc) {
    return (
      <div
        className={`bg-[#0E1730] text-white flex items-center justify-center font-editorial font-bold border border-[#002B97]/30 select-none ${defaultSizeClasses} ${defaultRounded} ${className}`}
        style={{ width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }}
        role="img"
        aria-label={alt}
      >
        <span className={size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-4xl' : 'text-sm'}>
          HA
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden shrink-0 bg-[#E6EDF6] ${defaultSizeClasses} ${defaultRounded} ${className}`}
    >
      <img
        src={photoSrc}
        alt={alt}
        width={finalWidth}
        height={finalHeight}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover object-top"
      />
      {isPreview && (
        <span
          className="absolute top-1 right-1 px-1 py-0.2 bg-[#002B97] text-white text-[8px] font-mono uppercase tracking-wider rounded font-bold shadow-xs pointer-events-none"
          title="This is a local device preview"
        >
          Preview
        </span>
      )}
    </div>
  );
};
