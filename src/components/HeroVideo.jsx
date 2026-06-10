import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';

const BASE = import.meta.env.BASE_URL;
const VIDEO_SRC = `${BASE}videos/hero.mp4`;
const POSTER_SRC = `${BASE}images/hero-poster.jpg`;

/**
 * Ambient hero video (muted, looping, decorative). The caller positions it
 * via className — Home uses it full-bleed behind the headline below lg and
 * as a framed portrait card beside the headline at lg+.
 *
 * Falls back to the poster still when the user prefers reduced motion, and
 * to nothing (the hero's gradient backdrop) if both video and poster fail.
 */
const HeroVideo = ({ className = '' }) => {
    const videoRef = useRef(null);
    const [failed, setFailed] = useState(false);
    const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;
        // React doesn't reliably write the `muted` content attribute to the
        // DOM, and browsers block un-muted autoplay — set it imperatively
        // before kicking off playback or autoplay silently fails.
        el.muted = true;
        el.defaultMuted = true;
        el.play().catch(() => {});
        // Browsers keep video paused while the page is hidden (background
        // tab); resume when the user actually looks at it.
        const onVisible = () => {
            if (!document.hidden && el.paused) el.play().catch(() => {});
        };
        document.addEventListener('visibilitychange', onVisible);
        return () => document.removeEventListener('visibilitychange', onVisible);
    }, [reducedMotion, failed]);

    if (reducedMotion || failed) {
        return (
            <img
                src={POSTER_SRC}
                alt=""
                aria-hidden="true"
                className={className}
                onError={(e) => { e.currentTarget.remove(); }}
            />
        );
    }

    return (
        <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            className={className}
            onError={() => setFailed(true)}
        />
    );
};

export default HeroVideo;
