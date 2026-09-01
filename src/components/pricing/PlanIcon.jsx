const PATHS = {
  sprout: (
    <>
      <path d="M12 20v-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 12c0-4 2.7-6.8 7-7-.2 4.2-3 7-7 7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 14c0-3.4-2.3-5.7-6-6 .2 3.6 2.5 6 6 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </>
  ),
  bolt: (
    <path d="M13.5 2 5 13h5l-1.5 9L19 10h-5l-.5-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  ),
  flame: (
    <>
      <path d="M13.8 3c.7 3-1.2 4.4-2.5 5.9-1.4 1.6-2.5 3-2.5 5.1a3.9 3.9 0 0 0 7.8 0c0-1.7-.6-3-1.7-4.3-.9-1.1-1.8-2.2-1.1-4.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12.2 12.8c.4 1.3-.3 2.1-.8 2.8-.5.6-.9 1.1-.9 1.9a1.6 1.6 0 1 0 3.2 0c0-.7-.2-1.2-.7-1.8-.4-.5-.8-1-.8-2.9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </>
  ),
  crown: (
    <path d="m3 8 4.5 4L12 6l4.5 6L21 8l-2 10H5L3 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  ),
};

const PlanIcon = ({ name, className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    {PATHS[name] ?? (
      <path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
);

export default PlanIcon;
