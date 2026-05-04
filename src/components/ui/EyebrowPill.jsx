/**
 * Small pill above hero headings — gold-on-translucent-gold rounded label.
 * Used as the section eyebrow on every page hero. Keep one source of truth
 * for the styling so visual consistency doesn't drift across pages.
 *
 * Section-heading eyebrows (uppercase tracking-wider, no background) are a
 * separate style and not handled by this component.
 */
const EyebrowPill = ({ children, className = '' }) => (
    <span
        className={`inline-block px-4 py-2 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-400 text-sm font-medium ${className}`}
    >
        {children}
    </span>
);

export default EyebrowPill;
