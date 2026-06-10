import { useEffect, useState } from 'react';

/** Reactively track a CSS media query (e.g. the hero's lg layout switch). */
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
    useEffect(() => {
        const mql = window.matchMedia(query);
        const onChange = () => setMatches(mql.matches);
        mql.addEventListener('change', onChange);
        // Re-sync after mount: the viewport can cross the breakpoint between
        // the useState initializer and this listener attaching (e.g. while the
        // window is still being sized), which would otherwise be missed.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMatches(mql.matches);
        return () => mql.removeEventListener('change', onChange);
    }, [query]);
    return matches;
};

export default useMediaQuery;
