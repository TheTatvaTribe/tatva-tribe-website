const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const INSTAGRAM_URL = 'https://www.instagram.com/thetatvatribe._/';
export const EMAIL = 'thetatvatribe@gmail.com';
export const DESIGNER_URL = 'https://www.instagram.com/advayshidhaye/';

/* Credits, shown as one quiet line at the foot of the page:
   "Designed by Manasi · Site built by Rahul Patil", each name linking out.
   `linkedin` is optional and is only rendered once it is filled in. */
export const DESIGNED_BY = {
  name: 'Manasi',
  url: 'http://www.manasikulkarni.com/',
};

export const BUILT_BY = {
  name: 'Rahul Patil',
  github: 'https://github.com/rahulpatil25',
  linkedin: '',   // e.g. 'https://www.linkedin.com/in/<your-handle>/'
};

/* ── The 7 Tatvas ────────────────────────────────────────── */
export const tatvas = [
  {
    devan: 'शरीर',
    name: 'Body Discipline',
    desc: 'Anything which promotes movement: strength training, endurance, yoga, aerobics. शरीर is your most sacred instrument; treat it accordingly.',
    tags: ['Sharira', 'Movement', 'Strength'],
    image: asset('images/tatvas/sharira.png'),
    color: '#D4E84A',
    bg: '#111600',
  },
  {
    devan: 'आहार',
    name: 'Nutrition',
    desc: 'Mindful eating, balancing macros, staying hydrated. Real food = Real energy. आहार is medicine when chosen wisely. Dal, sabzi and ghee included.',
    tags: ['Aahaar', 'Mindful Eating', 'Balance'],
    image: asset('images/tatvas/aahaar.png'),
    color: '#A8D458',
    bg: '#0D1608',
  },
  {
    devan: 'मानस',
    name: 'Mental Toughness',
    desc: 'Meditation, breathwork, journaling. Mental resilience > Digital chaos. A strong मानस is the foundation of every achievement worth having.',
    tags: ['Manas', 'Meditation', 'Resilience'],
    image: asset('images/tatvas/manas.png'),
    color: '#5CBF60',
    bg: '#091209',
  },
  {
    devan: 'निद्रा',
    name: 'Rest & Recovery',
    desc: 'Restorative sleep, active recovery, mobility. Good rest = Better mood, strength and healthspan. निद्रा is not laziness. It is sacred medicine.',
    tags: ['Nidra', 'Sleep', 'Recovery'],
    image: asset('images/tatvas/nidra.png'),
    color: '#36B8A8',
    bg: '#061412',
  },
  {
    devan: 'समाज',
    name: 'Community',
    desc: 'Building good relations, socialising. Growing together. Milke Badho. समाज reminds us we are far stronger inside a tribe than standing alone.',
    tags: ['Samaaj', 'Community', 'Connection'],
    image: asset('images/tatvas/samaaj.png'),
    color: '#6CC96E',
    bg: '#0A150A',
  },
  {
    devan: 'प्रकृति',
    name: 'Nature',
    desc: 'Aligning with nature, seasonal rhythms in diet & activity. Sunlight, fresh air = Natural healers. प्रकृति is your original home. Return to it often.',
    tags: ['Prakriti', 'Nature', 'Seasons'],
    image: asset('images/tatvas/prakriti.png'),
    color: '#3A9E40',
    bg: '#081108',
  },
  {
    devan: 'उद्देश्य',
    name: 'Purpose',
    desc: 'Keeping the right intention, setting a goal. No purpose = No growth. उद्देश्य is the north star that makes every other Tatva meaningful and worth pursuing.',
    tags: ['Uddeshya', 'Purpose', 'Goal'],
    image: asset('images/tatvas/uddeshya.png'),
    color: '#C8E030',
    bg: '#121500',
  },
];

/* ── Plans ───────────────────────────────────────────────────
   Prices, plan names and the long descriptions are the site's own
   existing copy. Savings are derived from the 1-month rate
   (₹12,499/mo), so they stay correct if a price changes.
   ──────────────────────────────────────────────────────────── */
export const plans = [
  {
    planName: 'Prarambh',
    planNameDevanagri: 'प्रारंभ',
    icon: 'sprout',
    price: '₹12,499',
    duration: '1 month',
    savings: '',
    description: 'Best fit for foundation, adaptation, and building consistency from day one.',
    longDescription:
      'Perfect for those ready to plant the seed of discipline. This 1-month immersion focuses on setting your foundation and learning the "Tatva" way of moving.',
    stats: [
      { value: '12', label: '1-on-1 sessions' },
      { value: '30', label: 'day commitment' },
    ],
    details: [
      'Weekly 1-on-1 coaching and form correction.',
      'Food and routine setup based on your schedule.',
      'Habit tracking with check-ins for consistency.',
    ],
    badge: '',
    accentColor: '#D4E84A',
    bandColor: '#C2DC2F',
    bandInk: '#8FA620',
    bgColor: '#111600',
    ctaLabel: 'Choose Prarambh',
  },
  {
    planName: 'Shakti',
    planNameDevanagri: 'शक्ति',
    icon: 'bolt',
    price: '₹29,999',
    duration: '3 months',
    savings: '₹7,498',
    description: 'Best fit for consistency, visible momentum, and a solid reset.',
    longDescription:
      'True strength is built through consistency. Over 3 months, we move beyond the basics to ignite your inner power and build your physical capabilities.',
    stats: [
      { value: '36', label: '1-on-1 sessions' },
      { value: '90', label: 'day habit block' },
    ],
    details: [
      'Structured progression across strength and conditioning.',
      'Monthly plan upgrades based on your progress data.',
      'Lifestyle accountability to lock in momentum.',
    ],
    badge: 'Most Popular',
    accentColor: '#A8D458',
    bandColor: '#3FA447',
    bandInk: '#2F7C37',
    bgColor: '#0D1608',
    ctaLabel: 'Choose Shakti',
  },
  {
    planName: 'Tapasya',
    planNameDevanagri: 'तपस्या',
    icon: 'flame',
    price: '₹51,999',
    duration: '6 months',
    savings: '₹22,995',
    description: 'Best fit for transformation, depth, and long-term identity change.',
    longDescription:
      'A 6-month commitment to total transformation. This is where the ego dissolves and the "hustle" becomes a habit. Designed for the inborn winners!',
    stats: [
      { value: '72', label: '1-on-1 sessions' },
      { value: '180', label: 'day block' },
    ],
    details: [
      'High-accountability coaching with deeper body recomposition focus.',
      'Flexible strategy updates for plateaus and lifestyle shifts.',
      'Mindset and recovery guidance for long-term transformation.',
    ],
    badge: 'High Value',
    accentColor: '#5CBF60',
    bandColor: '#43B8AC',
    bandInk: '#2F8781',
    bgColor: '#091209',
    ctaLabel: 'Choose Tapasya',
  },
  {
    planName: 'Ghor Tapasya',
    planNameDevanagri: 'घोर तपस्या',
    icon: 'crown',
    price: '₹91,999',
    duration: '12 months',
    savings: '₹57,989',
    description: 'Best fit for elite accountability, legacy outcomes, and year-round coaching.',
    longDescription:
      'For the elite few who view fitness as a lifelong dharma. A 12-month journey to build a legacy of health that lasts a lifetime.',
    stats: [
      { value: '144', label: '1-on-1 sessions' },
      { value: '365', label: 'day partnership' },
    ],
    details: [
      'Priority access, deep personalisation, and long-horizon planning.',
      'Advanced coaching cycles with quarterly transformation reviews.',
      'Year-round partnership for sustained elite outcomes.',
    ],
    badge: '',
    accentColor: '#36B8A8',
    bandColor: '#A8CE55',
    bandInk: '#7D9C3D',
    bgColor: '#061412',
    ctaLabel: 'Choose Ghor Tapasya',
  },
];

/* ── The Tatva-Achaar (terms) ────────────────────────────── */
export const tribeCode = [
  {
    title: 'Your Sankalpa',
    content:
      'Much like a sacred vow, your commitment to a plan is final. All memberships are non-refundable and non-transferable.',
  },
  {
    title: "It's your Marga",
    content:
      "Your blueprint is for your personal progress, towards the results you're aiming for. Hence, you're not allowed to share plans.",
  },
  {
    title: 'The Law of Karma (Respectful Conduct)',
    content:
      'We maintain an environment built on mutual respect and integrity. Any form of misconduct, disrespect or breach of our tribe ethics will end coaching without refund.',
  },
  {
    title: 'A Moment of Zen',
    content:
      'Life can be unpredictable. We offer a one-time "Pause" period for our Tapasya and Ghor Tapasya practitioners, provided you give us a heads-up at least 1 week prior.',
  },
  {
    title: 'The Temple Disclosure (Medical Disclaimer)',
    content:
      'Your body is your temple, and we treat it with the highest regard. Before embarking on any physical Tapasya, it is your responsibility to consult with a medical professional. You must disclose your full medical history and any physical limitations honestly.',
  },
];

/* Member stories now live in data/stories.js — the four invented
   testimonials that used to sit here have been removed. */

/* ── About ───────────────────────────────────────────────── */
export const certifications = [
  { src: asset('images/certifications/certified_personal_trainer.jpeg'), alt: 'Certified Personal Trainer' },
  { src: asset('images/certifications/kettlebell_training_specialist.PNG'), alt: 'Kettlebell Training Specialist' },
  { src: asset('images/certifications/olympic_weightlifting_training_specialist.PNG'), alt: 'Olympic Weightlifting Training Specialist' },
  { src: asset('images/certifications/postureandfunctional_corrective_exercise_specialist.PNG'), alt: 'Posture & Functional Corrective Exercise Specialist' },
  { src: asset('images/certifications/resistance_band_training_specialist.PNG'), alt: 'Resistance Band Training Specialist' },
  { src: asset('images/certifications/weight_loss_training_specialist.PNG'), alt: 'Weight Loss Training Specialist' },
];

export const trainerPhoto = asset('images/trainer.jpeg');

/* Photo slots on the About page, from the original design hand-off.
   Drop a file into public/images/about/ and set the path here. While a
   slot is null the page shows a labelled placeholder in its place, so
   the space stays visible rather than silently collapsing. */
export const aboutPhotos = {
  cricket: {
    label: 'Cricket action photos',
    // No images -> labelled placeholder. One -> a single photo.
    // Two or more -> a carousel, automatically.
    images: [
      { src: asset('images/about/cricket/man-of-the-series.jpeg'),
        alt: 'Holding the Man of the Series trophies at Saheb Kardak' },
      { src: asset('images/about/cricket/t20-world-cup.jpeg'),
        alt: 'Being interviewed at the ICC T20 World Cup venue in Mumbai' },
      { src: asset('images/about/cricket/sarju-bhavani.jpeg'),
        alt: 'With the Sarju Bhavani T20 2024 runners-up trophy' },
      { src: asset('images/about/cricket/mes-shield.jpeg'),
        alt: 'In whites with the winners shield, MES Cricket Club Pune' },
      { src: asset('images/about/cricket/chandu-borde.jpeg'),
        alt: 'Holding the champions trophy at the Chandu Borde Pavilion' },
    ],
  },
  coaching: {
    label: 'Coaching moment photos',
    images: [
      { src: asset('images/about/coaching/dumbbell-press.jpeg'),
        alt: 'Spotting a member through a dumbbell press on the incline bench' },
      { src: asset('images/about/coaching/front-squat.jpeg'),
        alt: 'Coaching a barbell front squat, cueing the rack position' },
      { src: asset('images/about/coaching/barbell-form.jpeg'),
        alt: 'Correcting bar placement and shoulder position during a lift' },
      { src: asset('images/about/coaching/track-session.jpeg'),
        alt: 'Running a conditioning session with members on the track' },
      { src: asset('images/about/coaching/mobility-work.jpeg'),
        alt: 'Leading kneeling mobility work alongside a member' },
      { src: asset('images/about/coaching/floor-work.jpeg'),
        alt: 'Talking a member through floor work in a home session' },
    ],
  },
};

export const audienceTypes = [
  {
    num: '01',
    title: 'The Motivated Beginner',
    description: "Highly motivated, but don't know where to start.",
  },
  {
    num: '02',
    title: 'The Inconsistent Learner',
    description: 'Know a little, but struggle to stay consistent.',
  },
  {
    num: '03',
    title: 'The Plateau Warrior',
    description: 'Stuck in the same routine for years.',
  },
];
