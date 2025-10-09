'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function BackgroundAudio() {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [needsUnlock, setNeedsUnlock] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Prepare autoplay (always try with sound on; browsers may block until gesture)
    const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const interactionEvents = ['pointerdown', 'pointerup', 'click', 'touchstart', 'touchend', 'keydown'];
    audio.muted = false;
    audio.autoplay = true;
    audio.preload = 'auto';
    audio.volume = 1.0;
    try { audio.load(); } catch (_) {}

    const unlock = () => {
      try {
        audio.muted = false;
        audio.play()
          .then(() => {
            setEnabled(true);
            setNeedsUnlock(false);
          })
          .catch(() => {
            audio.muted = true;
            setEnabled(false);
            setNeedsUnlock(true);
          });
      } catch (_) {}
      interactionEvents.forEach(evt => window.removeEventListener(evt, unlock));
      document.removeEventListener('visibilitychange', onVisibleTry);
      window.removeEventListener('pageshow', onPageShowTry);
    };

    const onVisibleTry = () => {
      if (document.visibilityState === 'visible') unlock();
    };
    const onPageShowTry = () => unlock();

    audio.play()
      .then(() => {
        setEnabled(true);
        setNeedsUnlock(false);
      })
      .catch(() => {
        // Autoplay likely blocked until user interaction; attach unlock listeners
        interactionEvents.forEach(evt => window.addEventListener(evt, unlock, { once: true }));
        document.addEventListener('visibilitychange', onVisibleTry, { once: true });
        window.addEventListener('pageshow', onPageShowTry, { once: true });
        setEnabled(false);
        if (isMobile) setNeedsUnlock(true);
      });

    // When finished playing, reflect muted state in toggle
    const handleEnded = () => {
      setEnabled(false);
    };
    audio.addEventListener('ended', handleEnded);

    // interactionEvents are added only if autoplay is blocked (above)

    return () => {
      interactionEvents.forEach(evt => window.removeEventListener(evt, unlock));
      document.removeEventListener('visibilitychange', onVisibleTry);
      window.removeEventListener('pageshow', onPageShowTry);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const manualUnlock = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio.play()
      .then(() => {
        setEnabled(true);
        setNeedsUnlock(false);
      })
      .catch(() => {
        // keep overlay if blocked
      });
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.muted) {
      audio.muted = false;
      audio.play().catch(() => {});
      setEnabled(true);
    } else {
      audio.muted = true;
      setEnabled(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/vioceOver.mp3" playsInline preload="auto" />
      {needsUnlock && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 md:hidden">
          <button
            onClick={manualUnlock}
            className="px-4 py-2 rounded-full text-sm font-medium shadow-md bg-amber-500 text-white hover:bg-amber-600 transition-colors"
          >
            Tap to enable sound
          </button>
        </div>
      )}
      {/* Fixed action buttons bottom-right (icon buttons) */}
      <div className="fixed bottom-4 right-4 z-[80] flex flex-col items-end gap-3">
        {/* Mute / Unmute */}
        <button
          onClick={toggleMute}
          className="w-11 h-11 rounded-full flex items-center justify-center shadow-md bg-gray-900/85 text-white hover:bg-gray-800 transition-colors"
          aria-label={enabled ? 'Mute background audio' : 'Unmute background audio'}
        >
          {enabled ? (
            // Speaker with waves (unmuted)
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 10v4h4l5 4V6l-5 4H3z" />
              <path d="M16 8a5 5 0 010 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          ) : (
            // Speaker with strike (muted)
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 10v4h4l5 4V6l-5 4H3z" />
              <path d="M18 9l-6 6M12 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          )}
        </button>

        {/* WhatsApp */}
        <a
          href="https://wa.me/919900491382"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full flex items-center justify-center shadow-md bg-green-600 text-white hover:bg-green-700 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
            alt="WhatsApp logo"
            width={20}
            height={20}
            className="w-5 h-5"
            priority={false}
          />
        </a>

        {/* Phone call */}
        <a
          href="tel:+919000000000"
          className="w-11 h-11 rounded-full flex items-center justify-center shadow-md bg-amber-500 text-white hover:bg-amber-600 transition-colors"
          aria-label="Call phone"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.6 10.79a15.05 15.05 0 006.61 6.61l2.2-2.2a1 1 0 011.06-.24 11.36 11.36 0 003.56.57 1 1 0 011 1v3.5a1 1 0 01-1 1A18.5 18.5 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1.06l-2.23 2.17z" />
          </svg>
        </a>
      </div>
    </>
  );
}