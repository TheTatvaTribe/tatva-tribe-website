import { useCallback, useRef, useState } from 'react';

const SWIPE_PX = 50;

const PlaceholderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="26" height="26" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.6" />
    <path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

/**
 * A photo slot that scales to what it is given:
 *   no images  -> a labelled placeholder holding the same space
 *   one image  -> just the photo, no controls
 *   two or more -> a carousel with arrows, dots and swipe
 *
 * Photos are shown with object-fit: contain, because these are mixed
 * portrait and landscape shots where cropping would cut off faces and
 * trophies. Advancing is manual: this sits inside a story the reader is
 * already scrolling through, so it should not move on its own.
 */
const PhotoCarousel = ({ slot, className = '' }) => {
  const images = slot?.images ?? [];
  const [current, setCurrent] = useState(0);
  const [failed, setFailed] = useState({});
  const touchStartX = useRef(0);

  const total = images.length;
  const go = useCallback(
    (dir) => setCurrent((prev) => (prev + dir + total) % total),
    [total]
  );

  if (total === 0) {
    return (
      <div className={`about-photo about-photo-empty ${className}`.trim()} aria-hidden="true">
        <span className="about-photo-icon"><PlaceholderIcon /></span>
        <span className="about-photo-label">{slot?.label || 'Photo'}</span>
      </div>
    );
  }

  const single = (img) =>
    failed[img.src] ? (
      <div className={`about-photo about-photo-empty ${className}`.trim()} aria-hidden="true">
        <span className="about-photo-icon"><PlaceholderIcon /></span>
        <span className="about-photo-label">{slot?.label || 'Photo'}</span>
      </div>
    ) : (
      <img
        className={`about-photo ${className}`.trim()}
        src={img.src}
        alt={img.alt || ''}
        loading="lazy"
        onError={() => setFailed((p) => ({ ...p, [img.src]: true }))}
      />
    );

  if (total === 1) return single(images[0]);

  return (
    <div className={`photo-carousel ${className}`.trim()}>
      <div
        className="photo-carousel-viewport"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > SWIPE_PX) go(diff > 0 ? 1 : -1);
        }}
      >
        <div
          className="photo-carousel-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, i) => (
            <div className="photo-carousel-slide" key={img.src} aria-hidden={i !== current}>
              {failed[img.src] ? (
                <div className="photo-carousel-missing">
                  <PlaceholderIcon />
                  <span>{img.alt || 'Photo unavailable'}</span>
                </div>
              ) : (
                <img
                  src={img.src}
                  alt={img.alt || ''}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onError={() => setFailed((p) => ({ ...p, [img.src]: true }))}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="photo-carousel-arrow prev"
        aria-label="Previous photo"
        onClick={() => go(-1)}
      >
        ‹
      </button>
      <button
        type="button"
        className="photo-carousel-arrow next"
        aria-label="Next photo"
        onClick={() => go(1)}
      >
        ›
      </button>

      <div className="photo-carousel-dots" role="tablist" aria-label={slot?.label || 'Photos'}>
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            role="tab"
            className={`photo-carousel-dot${i === current ? ' active' : ''}`}
            aria-selected={i === current}
            aria-label={`Photo ${i + 1} of ${total}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
