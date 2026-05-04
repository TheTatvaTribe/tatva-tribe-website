import { Link } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

/**
 * Brand emblem (gold "T" disc with logo image overlay) + wordmark image,
 * each with a graceful fallback. Shared by Navbar and Footer so the brand
 * block stays consistent.
 *
 * The emblem image and wordmark image are independent — either can fail
 * without affecting the other. The wordmark fallback re-renders the
 * "The Tatva Tribe" text.
 */
const BrandMark = ({ wordmarkClassName = '', linkClassName = '' }) => (
    <Link to="/" className={`flex items-center gap-3 group ${linkClassName}`}>
        {/* Gold disc with "T" fallback that the logo image covers when loaded. */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gold-400 flex items-center justify-center">
            <span
                className="absolute inset-0 flex items-center justify-center text-dark font-heading font-bold text-lg"
                aria-hidden="true"
            >
                T
            </span>
            <img
                src={`${BASE}images/logo.png`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300"
                onLoad={(e) => { e.currentTarget.style.opacity = '1'; }}
                onError={(e) => { e.currentTarget.remove(); }}
            />
        </div>

        {/* Wordmark image; falls back to text if the image is missing. */}
        {/* `invert` + `mix-blend-screen` keep a white-BG image readable on the dark theme. */}
        <img
            src={`${BASE}images/wordmark.png`}
            alt="The Tatva Tribe"
            className={`h-7 w-auto invert mix-blend-screen transition-opacity ${wordmarkClassName}`}
            onError={(e) => {
                const fallback = document.createElement('span');
                fallback.className = 'font-heading font-bold text-xl text-cream';
                fallback.textContent = 'The Tatva Tribe';
                e.currentTarget.replaceWith(fallback);
            }}
        />
    </Link>
);

export default BrandMark;
