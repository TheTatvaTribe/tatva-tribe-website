import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

/**
 * Brand emblem (gold "T" disc with logo image overlay) + text wordmark.
 * Shared by Navbar and Footer so the brand block stays consistent.
 *
 * The wordmark is a bold-italic "TheTatvaTribe" rendered in the heading
 * font (Antonio). Was previously an <img> referencing wordmark.png — that
 * was reverted because the image rendered poorly at small sizes on the
 * dark theme.
 *
 * The wordmark <span> uses `pointer-events-none` so clicks anywhere in the
 * brand block bubble to the parent <Link>, keeping the whole area as one
 * home-page link target.
 *
 * Pass `wordmarkClassName` (e.g. `"text-2xl"`) to override the size per
 * surface. Footer uses a larger size since it has more vertical room.
 */
const BrandMark = ({ wordmarkClassName = '', linkClassName = '' }) => (
    <Link
        to="/"
        aria-label="TheTatvaTribe — home"
        className={`flex items-center gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark rounded-md ${linkClassName}`}
    >
        {/* Gold disc with "T" fallback that the logo image covers when loaded. */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gold-400 flex items-center justify-center shrink-0">
            <span
                className="absolute inset-0 flex items-center justify-center text-dark font-heading font-bold text-lg"
                aria-hidden="true"
            >
                T
            </span>
            <img
                src={`${BASE}images/logo.png`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 pointer-events-none"
                onLoad={(e) => { e.currentTarget.style.opacity = '1'; }}
                onError={(e) => { e.currentTarget.remove(); }}
            />
        </div>

        <span
            className={`font-heading font-bold italic text-xl text-cream group-hover:text-gold-400 transition-colors pointer-events-none ${wordmarkClassName}`}
        >
            TheTatvaTribe
        </span>
    </Link>
);

export default BrandMark;
