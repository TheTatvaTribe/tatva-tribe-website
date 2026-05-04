/**
 * Single source of truth for site navigation and outbound social links.
 * Both Navbar (main nav) and Footer (quick links) read from here, so
 * adding or renaming a route is a one-line change.
 */

export const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
];

export const socialLinks = {
    instagram: {
        handle: '@thetatvatribe._',
        url: 'https://www.instagram.com/thetatvatribe._/',
    },
    trainerInstagram: {
        handle: '@advayshidhaye',
        url: 'https://www.instagram.com/advayshidhaye/',
    },
};
