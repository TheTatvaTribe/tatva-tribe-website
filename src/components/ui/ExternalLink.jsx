import { ExternalLink as ExternalIcon } from 'lucide-react';

/**
 * Outbound link that always opens in a new tab with `rel="noopener noreferrer"`,
 * shows an external-link icon, and announces "(opens in new tab)" to screen
 * readers. Use for any link to a different origin.
 *
 * Pass `showIcon={false}` for compact contexts where the icon would clutter,
 * e.g. an icon-only social button (the icon is the link's only content).
 */
const ExternalLink = ({
    href,
    children,
    className = '',
    showIcon = true,
    iconClassName = 'w-3.5 h-3.5',
    ...props
}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
    >
        {children}
        {showIcon && <ExternalIcon className={iconClassName} aria-hidden="true" />}
        <span className="sr-only">(opens in new tab)</span>
    </a>
);

export default ExternalLink;
