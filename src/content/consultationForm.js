/**
 * Question map for the custom consultation form.
 *
 * Extracted from the live Google Form (FB_PUBLIC_LOAD_DATA_), which remains
 * the system of record: submissions POST to its formResponse endpoint and
 * land in the same response sheet as the old embedded iframe.
 *
 * IMPORTANT: `id` is Google's internal entry ID and `options` strings must
 * match the form EXACTLY (including en-dashes and curly apostrophes) or the
 * answer is silently dropped. If the client edits the Google Form, re-extract
 * and update this file.
 *
 * Question types:
 *   text      → entry.<id> = value            (short answer)
 *   paragraph → entry.<id> = value
 *   radio     → entry.<id> = option           (multiple choice)
 *   checkbox  → entry.<id> = option, repeated (checkboxes)
 *   scale     → entry.<id> = "1".."10"        (linear scale)
 *   date      → entry.<id>_year/_month/_day   (date, three fields)
 *
 * `hasOther: true` adds an "Other:" choice. It posts the sentinel
 * "__other_option__" plus entry.<id>.other_option_response = free text.
 */

export const GOOGLE_FORM_ACTION =
    'https://docs.google.com/forms/d/e/1FAIpQLScScCLsxvv6BaL4wphS_QksI2fm4x0B_QQGeM4pd0LB7DMdMQ/formResponse';

export const OTHER_SENTINEL = '__other_option__';

export const formSections = [
    {
        title: 'Personal Information',
        questions: [
            { id: '1423550167', label: 'Full Name', type: 'text', required: true, autoComplete: 'name' },
            { id: '2082751663', label: 'Date of Birth', type: 'date', required: true },
            { id: '1961382647', label: 'Age', type: 'text', required: true, inputMode: 'numeric' },
            { id: '1053124789', label: 'Phone Number', type: 'text', required: true, inputMode: 'tel', autoComplete: 'tel' },
            { id: '2031729654', label: 'Email Address', type: 'text', required: true, inputMode: 'email', autoComplete: 'email' },
            { id: '99817826', label: 'Gender', type: 'radio', required: true, hasOther: true, options: ['Male', 'Female', 'Prefer not to say'] },
            { id: '841683952', label: 'City & Country of Residence', type: 'text', required: true },
        ],
    },
    {
        title: 'Physical Statistics',
        questions: [
            { id: '699198251', label: 'Height (in cm or ft/in)', type: 'text', required: true },
            { id: '561837618', label: 'Current Weight (in kg or lbs)', type: 'text', required: true },
        ],
    },
    {
        title: 'Lifestyle & Background',
        questions: [
            { id: '2136020444', label: 'Job / Profession', type: 'text', required: true },
            { id: '850769642', label: 'Work Nature / Activity Level', type: 'radio', required: false, options: ['Sedentary (mostly sitting)', 'Moderate Activity', 'Physically Active', 'Shift Work'] },
            { id: '986845299', label: 'Typical Daily Step Count (if tracked)', type: 'radio', required: true, options: ['Less than 3,000', '3,000 – 6,000', '6,000 – 10,000', 'More than 10,000'] },
            { id: '1637319753', label: 'Stress Level', type: 'scale', required: true },
            { id: '1181362409', label: 'Average Sleep Duration (hours per night)', type: 'radio', required: true, options: ['Less than 5 hours', '5–6 hours', '7–8 hours', 'More than 8 hours'] },
            { id: '37506325', label: 'Do you smoke or consume alcohol?', type: 'radio', required: true, hasOther: true, options: ['Smoking', 'Alcohol', 'Both', 'None'] },
        ],
    },
    {
        title: 'Medical History',
        questions: [
            { id: '2124981240', label: 'Do you have any current or past injuries?', type: 'paragraph', required: true },
            { id: '760478756', label: 'Any medical conditions we should know of?', type: 'paragraph', required: true },
            { id: '1767551204', label: 'Any allergies (food / medication / environmental)?', type: 'paragraph', required: true },
            { id: '1929796120', label: 'Are you currently on any medication or supplements?', type: 'paragraph', required: true },
            { id: '1374824213', label: 'Do you have clearance from your doctor to begin an exercise program?', type: 'radio', required: true, options: ['Yes', 'No'] },
        ],
    },
    {
        title: 'Fitness Background',
        questions: [
            { id: '1770937819', label: 'Have you trained or exercised before', type: 'radio', required: false, options: ['Yes, regularly', 'Occasionally', 'No, I’m a beginner'] },
            { id: '1353001815', label: 'Type(s) of training you’ve done (if any)', type: 'checkbox', required: false, hasOther: true, options: ['Gym', 'Yoga', 'Sport', 'Running', 'Home Workout'] },
        ],
    },
    {
        title: 'Goals & Expectations',
        questions: [
            { id: '389692554', label: 'What are your primary fitness goals?', type: 'checkbox', required: true, hasOther: true, options: ['Fat Loss', 'Muscle Gain', 'General Fitness', 'Strength & Performance', 'Posture & Mobility', 'Stress Relief', 'Sports Specific'] },
            { id: '560503361', label: 'What do you expect from this coaching program?', type: 'paragraph', required: true },
            { id: '2117879538', label: 'How committed are you to achieving your goals?', type: 'scale', required: true },
            { id: '1906702438', label: 'Preferred Training Style', type: 'radio', required: true, options: ['Gym-based', 'Home-based', 'Online only', 'Outdoor', 'Hybrid'] },
            { id: '1327209554', label: 'Preferred Workout Frequency (per week)', type: 'radio', required: true, options: ['2–3 times per week', '3–4 times per week', '5–6 times per week', 'Flexible'] },
        ],
    },
    {
        title: 'Nutrition & Habits',
        questions: [
            { id: '1595599953', label: 'Diet Preference', type: 'checkbox', required: true, hasOther: true, options: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Eggetarian'] },
            { id: '273735580', label: 'Any food restrictions or avoidances?', type: 'paragraph', required: true },
            { id: '1834188495', label: 'Water intake per day (approx.)', type: 'radio', required: true, options: ['Less than 1 liter', '1–2 liters', '2–3 liters', 'More than 3 liters'] },
            { id: '673789507', label: 'How many meals do you usually have in a day?', type: 'checkbox', required: true, options: ['1', '2 - 3', '3 - 4', '4 or more'] },
            { id: '1664106508', label: 'Do you track your food intake?', type: 'radio', required: true, options: ['Yes', 'No'] },
        ],
    },
    {
        title: 'Additional',
        questions: [
            { id: '759277148', label: 'What is your Regular t-shirt size?', type: 'radio', required: true, options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
            { id: '1261557719', label: 'How did you hear about The Tatva Tribe?', type: 'radio', required: false, hasOther: true, options: ['Instagram', 'Referral', 'Friends'] },
        ],
    },
];
