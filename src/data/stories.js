/* =========================================================
   MEMBER STORIES
   Source: Testimonials.docx and the three supplied photographs
   (client hand-off, 1 Sep 2026).

   Answers are the members' own words. The only edits are
   orthographic: sentence capitals, a lowercase "i" raised to "I",
   and a closing full stop where one was missing. No wording,
   phrasing or meaning has been changed anywhere.
   ========================================================= */

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

/** The six questions every member is asked, in order. */
export const STORY_QUESTIONS = [
  "How has the '7 Tatvas' philosophy changed your overall approach to fitness and daily lifestyle?",
  'If you had to describe TTT’s unique training style to someone who has never tried it, how would you do it?',
  "How does TTT’s focus on 'Smartwork over Hardwork' stand out from other gym programs or coaches you’ve tried?",
  'How have the check-ins and consistent coach follow-ups kept you accountable?',
  "What do you appreciate most about your coach's guidance, energy, and support during your training?",
  'If a close friend or family member was about to join The Tatva Tribe, what would you tell them?',
];

export const storiesIntro = {
  eyebrow: 'Stories',
  title: 'In their own words.',
  description:
    'Six questions, asked of every member. These are the answers, unedited.',
};

/* `quote` and `accent` are used only by the carousel on the home page,
   which links here. Each quote is a verbatim sentence lifted from that
   member's own answers below. The stories page itself renders the
   picture, the name and the six answers, and nothing else. */
export const stories = [
  {
    id: 'ayaan',
    name: 'Ayaan Pawar',
    initials: 'AP',
    portrait: asset('images/stories/ayaan_pawar.jpeg'),
    accent: '#D4E84A',
    quote: 'It made me look at fitness more like a lifestyle instead of a burden.',
    answers: [
      'It made me look at fitness more like a lifestyle instead of a burden. It also made me consistent and mindful in all small habits.',
      'It is not monotonous at all, every day is something to look forward to and the personal attention definitely gives a well needed boost.',
      'This was my first experience but I definitely think the personalised attention makes it easy for consistency.',
      'It kept me motivated always without losing my focus on my personal goal, and also being particular about my diet.',
      'Always being encouraging and free to clear all the doubts in my mind. This support makes a huge impact.',
      'I would say it is not only fitness, it is a support to help make actual changes in you, and I would definitely recommend it.',
    ],
  },
  {
    id: 'shruti',
    name: 'Shruti Mudagal',
    initials: 'SM',
    portrait: asset('images/stories/shruti_mudagal.jpeg'),
    accent: '#36B8A8',
    quote:
      "It's about taking care of yourself every day through better sleep, nutrition, and being consistent.",
    answers: [
      "It made me realize that fitness is not just about working out for an hour. It's about taking care of yourself every day through better sleep, nutrition, and being consistent. I've started looking at fitness as a part of my lifestyle, not just something I do in the gym.",
      "The training is very personalized, and every workout has a purpose. It's not about doing random exercises or spending hours in the gym. Everything is planned according to your goals, which makes the training effective and enjoyable.",
      "What I like most is that the focus is on doing things the right way. Instead of just pushing heavy weights or trying to exhaust you, there's a lot of importance given to proper form, technique, and training with a plan. It feels much more sustainable and effective.",
      "The regular check-ins have really helped me stay consistent. On days when I don't feel like working out, he motivates me to keep going. He also keeps track of my progress by checking my weight and strength regularly, which makes me want to stay on track and give my best every week.",
      'I really appreciate how supportive and patient he is. He knows when to push me to do better and when to help me improve my form. His positive attitude makes every session comfortable and motivating.',
      "I'd tell them to go for it without overthinking. You're not just getting a workout plan, you get a coach who genuinely cares about your progress and helps you stay consistent. That kind of support makes a big difference.",
    ],
  },
  {
    id: 'rithvik',
    name: 'Rithvik Aralta',
    initials: 'RA',
    portrait: asset('images/stories/rithvik_aralta.jpeg'),
    accent: '#A8D458',
    quote:
      'It feels like training with a friend, and you see the results.',
    answers: [
      // supplied as two labelled lines; the line break is preserved
      'Physical - got stronger, balance and stability improved.\nMental - to push yourself, enjoying the exercise and gaining new knowledge.',
      'Increases confidence, improvement and correction in your form, and you get the environment of doing it with someone experienced.',
      'He helped me increase my confidence and motivated me with my goals.',
      'It is easy to understand, and there are some examples like the ones shown in the ancestors’ video of Tatva Tribe. (Pushing the truck in bench press.)',
      'It feels like training with a friend and, as I mentioned before, it creates an environment, plus you see the results. His way of guidance is unique and his way of explaining the exercise is easy to understand, which helps you do that exercise with fun.',
      'TTT have experienced coaches, and their concept of 7 Tatvas to live a healthy life is a 💯 thing.',
    ],
  },
];

export { asset };
