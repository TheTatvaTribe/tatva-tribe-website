import { useEffect, useState } from 'react';
import { smoothScrollTo } from '../utils/scroll';

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => { frame = 0; setVisible(window.scrollY > 400); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      className={`scroll-top-btn${visible ? ' visible' : ''}`}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => smoothScrollTo(0)}
    >
      ↑
    </button>
  );
};

export default ScrollTopButton;
