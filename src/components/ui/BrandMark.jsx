import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

const WORDMARK_W = 1270;
const WORDMARK_H = 292;

/**
 * Brand emblem (gold "T" disc with logo image overlay) + wordmark image.
 * Shared by Navbar and Footer so the brand block stays consistent.
 *
 * The wordmark is two PNGs stacked in the same grid cell: the white
 * version shows by default, the gold version fades in on hover. Both
 * PNGs are pre-padded to identical 1270x292 canvases so the swap is
 * a pure opacity crossfade with no positional shift.
 *
 * The wordmark <span> uses `pointer-events-none` so clicks anywhere in
 * the brand block bubble to the parent <Link>, keeping the whole area
 * as one home-page link target.
 *
 * Sizing is controlled via `wordmarkClassName` — pass a Tailwind height
 * utility (e.g. `h-7`, `h-9`); width derives from the image's intrinsic
 * aspect ratio. Default is `h-7` (28px) for the navbar; Footer overrides
 * to `h-9` (36px) since it has more vertical room.
 */
const BrandMark = ({ wordmarkClassName = 'h-7', linkClassName = '' }) => (
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

        <span className="relative inline-block pointer-events-none">
            <img
                src={`${BASE}images/wordmark-white.png`}
                alt="TheTatvaTribe"
                width={WORDMARK_W}
                height={WORDMARK_H}
                loading="eager"
                decoding="async"
                className={`block w-auto transition-opacity duration-200 group-hover:opacity-0 ${wordmarkClassName}`}
            />
            <img
                src={`${BASE}images/wordmark-gold.png`}
                alt=""
                aria-hidden="true"
                width={WORDMARK_W}
                height={WORDMARK_H}
                loading="eager"
                decoding="async"
                className={`absolute left-0 top-0 w-auto opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${wordmarkClassName}`}
            />
        </span>
    </Link>
);

export default BrandMark;
