import { useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Card from './ui/Card';
import { formSections, GOOGLE_FORM_ACTION, OTHER_SENTINEL } from '../content/consultationForm';

// DEMO MODE: when true, the final submit skips the network call entirely and
// logs the payload to the console instead — no data reaches the Google Form.
// Set to false (one line) to go live.
const DEMO_MODE = true;

const SCALE_VALUES = Array.from({ length: 10 }, (_, i) => String(i + 1));

/** Build the formResponse payload from answers, per Google's field formats. */
const buildPayload = (values, others) => {
    const params = new URLSearchParams();
    for (const section of formSections) {
        for (const q of section.questions) {
            const v = values[q.id];
            if (v == null || v === '' || (Array.isArray(v) && v.length === 0)) continue;
            if (q.type === 'date') {
                const [year, month, day] = v.split('-');
                params.append(`entry.${q.id}_year`, year);
                params.append(`entry.${q.id}_month`, String(Number(month)));
                params.append(`entry.${q.id}_day`, String(Number(day)));
            } else if (q.type === 'checkbox') {
                for (const item of v) {
                    params.append(`entry.${q.id}`, item);
                    if (item === OTHER_SENTINEL) {
                        params.append(`entry.${q.id}.other_option_response`, others[q.id] || '');
                    }
                }
            } else {
                params.append(`entry.${q.id}`, v);
                if (v === OTHER_SENTINEL) {
                    params.append(`entry.${q.id}.other_option_response`, others[q.id] || '');
                }
            }
        }
    }
    return params;
};

const ConsultationForm = () => {
    const [step, setStep] = useState(0);
    const [values, setValues] = useState({});
    const [others, setOthers] = useState({});
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const topRef = useRef(null);

    const section = formSections[step];
    const isLast = step === formSections.length - 1;
    const progress = ((step + 1) / formSections.length) * 100;

    const setValue = (id, v) => {
        setValues((prev) => ({ ...prev, [id]: v }));
        setErrors((prev) => (prev[id] ? { ...prev, [id]: null } : prev));
    };

    const toggleCheckbox = (id, option) => {
        const current = values[id] || [];
        setValue(id, current.includes(option) ? current.filter((o) => o !== option) : [...current, option]);
    };

    const scrollToFormTop = () => {
        topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const validateSection = () => {
        const next = {};
        for (const q of section.questions) {
            const v = values[q.id];
            const empty = v == null || v === '' || (Array.isArray(v) && v.length === 0);
            if (q.required && empty) {
                next[q.id] =
                    q.type === 'checkbox' ? 'Please select at least one option.'
                    : q.type === 'radio' || q.type === 'scale' ? 'Please select an option.'
                    : 'This field is required.';
            } else if (!empty && needsOtherText(q, v) && !(others[q.id] || '').trim()) {
                next[q.id] = 'Please specify your answer.';
            }
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const needsOtherText = (q, v) =>
        q.hasOther && (q.type === 'checkbox' ? (v || []).includes(OTHER_SENTINEL) : v === OTHER_SENTINEL);

    const handleNext = () => {
        if (!validateSection()) return;
        setStep((s) => s + 1);
        scrollToFormTop();
    };

    const handleBack = () => {
        setErrors({});
        setStep((s) => s - 1);
        scrollToFormTop();
    };

    const handleSubmit = async () => {
        if (!validateSection()) return;
        setSubmitting(true);
        const params = buildPayload(values, others);
        if (DEMO_MODE) {
            console.log('[ConsultationForm demo] would POST to', GOOGLE_FORM_ACTION, '→', params.toString());
            await new Promise((r) => setTimeout(r, 700));
        } else {
            // no-cors: the response is opaque by design; a well-formed payload
            // (validated above) is accepted by Google. See TEST_REPORT.md / PR notes.
            await fetch(GOOGLE_FORM_ACTION, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params.toString(),
            }).catch(() => {});
        }
        setSubmitting(false);
        setSubmitted(true);
        scrollToFormTop();
    };

    if (submitted) {
        return (
            <Card hover={false} className="text-center py-16" data-testid="form-success">
                <CheckCircle2 className="w-16 h-16 text-gold-400 mx-auto mb-6" aria-hidden="true" />
                <h2 className="heading-md text-cream mb-3">You're In!</h2>
                <p className="text-cream/70 max-w-md mx-auto">
                    Thank you for sharing your story with the tribe. Our Master Trainer will
                    reach out for your free assessment call shortly.
                </p>
                {DEMO_MODE && (
                    <p className="mt-6 inline-block px-4 py-2 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-400 text-xs">
                        Demo preview — nothing was sent to the form
                    </p>
                )}
            </Card>
        );
    }

    return (
        <Card hover={false} ref={topRef} className="scroll-mt-24">
            {DEMO_MODE && (
                <p className="mb-6 inline-block px-3 py-1 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-400 text-xs">
                    Demo preview — submissions disabled
                </p>
            )}

            {/* Progress header */}
            <div className="mb-8">
                <p className="text-gold-400 text-xs font-medium uppercase tracking-wider mb-1" aria-live="polite">
                    Step {step + 1} of {formSections.length}
                </p>
                <h2 className="heading-sm text-cream mb-4">{section.title}</h2>
                <div className="h-1.5 bg-forest-700/70 rounded-full overflow-hidden" role="progressbar"
                    aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={formSections.length}
                    aria-label={`Step ${step + 1} of ${formSections.length}`}>
                    <div className="h-full bg-gold-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <form noValidate onSubmit={(e) => { e.preventDefault(); isLast ? handleSubmit() : handleNext(); }}>
                <div className="space-y-7">
                    {section.questions.map((q) => (
                        <Question
                            key={q.id}
                            q={q}
                            value={values[q.id]}
                            other={others[q.id] || ''}
                            error={errors[q.id]}
                            onChange={(v) => setValue(q.id, v)}
                            onToggle={(opt) => toggleCheckbox(q.id, opt)}
                            onOtherChange={(text) => setOthers((prev) => ({ ...prev, [q.id]: text }))}
                        />
                    ))}
                </div>

                {/* Step controls */}
                <div className="mt-10 flex items-center justify-between gap-4">
                    {step > 0 ? (
                        <button type="button" onClick={handleBack} className="btn btn-secondary">
                            Back
                        </button>
                    ) : <span />}
                    <button type="submit" disabled={submitting} className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                        {isLast ? (submitting ? 'Sending…' : 'Submit') : 'Next'}
                    </button>
                </div>
            </form>
        </Card>
    );
};

/* ---------- field renderers ---------- */

const Label = ({ q }) => (
    <span className="block text-cream font-medium mb-3">
        {q.label}
        {q.required && <span className="text-gold-400 ml-1" aria-hidden="true">*</span>}
    </span>
);

const ErrorText = ({ id, error }) =>
    error ? <p id={`err-${id}`} className="mt-2 text-sm text-red-400" role="alert">{error}</p> : null;

// Option pill shared by radio + checkbox: a real (visually hidden) input inside
// a styled label so keyboard and screen-reader behavior stay native.
const optionPillClass = (selected) =>
    `flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm select-none ` +
    `focus-within:ring-2 focus-within:ring-gold-400 focus-within:ring-offset-2 focus-within:ring-offset-dark ${
        selected
            ? 'border-gold-400 bg-gold-400/10 text-cream'
            : 'border-forest-500/40 bg-forest-700/30 text-cream/80 hover:border-gold-400/50'
    }`;

const Question = ({ q, value, other, error, onChange, onToggle, onOtherChange }) => {
    const describedBy = error ? `err-${q.id}` : undefined;

    if (q.type === 'text' || q.type === 'date') {
        return (
            <label className="block">
                <Label q={q} />
                <input
                    type={q.type === 'date' ? 'date' : 'text'}
                    inputMode={q.inputMode}
                    autoComplete={q.autoComplete}
                    className="input"
                    style={q.type === 'date' ? { colorScheme: 'dark' } : undefined}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    aria-required={q.required}
                    aria-invalid={!!error}
                    aria-describedby={describedBy}
                />
                <ErrorText id={q.id} error={error} />
            </label>
        );
    }

    if (q.type === 'paragraph') {
        return (
            <label className="block">
                <Label q={q} />
                <textarea
                    rows={3}
                    className="input resize-y"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    aria-required={q.required}
                    aria-invalid={!!error}
                    aria-describedby={describedBy}
                />
                <ErrorText id={q.id} error={error} />
            </label>
        );
    }

    if (q.type === 'scale') {
        return (
            <fieldset aria-describedby={describedBy}>
                <legend className="block text-cream font-medium mb-3">
                    {q.label}
                    {q.required && <span className="text-gold-400 ml-1" aria-hidden="true">*</span>}
                </legend>
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-cream/50 text-xs mr-1">Low</span>
                    {SCALE_VALUES.map((n) => (
                        <button
                            key={n}
                            type="button"
                            onClick={() => onChange(n)}
                            aria-pressed={value === n}
                            className={`w-9 h-9 rounded-full border text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark ${
                                value === n
                                    ? 'bg-gold-400 border-gold-400 text-dark'
                                    : 'border-forest-500/40 bg-forest-700/30 text-cream/80 hover:border-gold-400/50'
                            }`}
                        >
                            {n}
                        </button>
                    ))}
                    <span className="text-cream/50 text-xs ml-1">High</span>
                </div>
                <ErrorText id={q.id} error={error} />
            </fieldset>
        );
    }

    // radio / checkbox
    const isCheckbox = q.type === 'checkbox';
    const allOptions = q.hasOther ? [...q.options, OTHER_SENTINEL] : q.options;
    const isSelected = (opt) => (isCheckbox ? (value || []).includes(opt) : value === opt);
    const showOtherInput = q.hasOther && isSelected(OTHER_SENTINEL);

    return (
        <fieldset aria-describedby={describedBy}>
            <legend className="block text-cream font-medium mb-3">
                {q.label}
                {q.required && <span className="text-gold-400 ml-1" aria-hidden="true">*</span>}
            </legend>
            <div className="flex flex-wrap gap-2.5">
                {allOptions.map((opt) => {
                    const isOther = opt === OTHER_SENTINEL;
                    return (
                        <label key={opt} className={optionPillClass(isSelected(opt))}>
                            <input
                                type={isCheckbox ? 'checkbox' : 'radio'}
                                name={`q-${q.id}`}
                                className="sr-only"
                                checked={isSelected(opt)}
                                onChange={() => (isCheckbox ? onToggle(opt) : onChange(opt))}
                            />
                            {isOther ? 'Other' : opt}
                        </label>
                    );
                })}
            </div>
            {showOtherInput && (
                <input
                    type="text"
                    className="input mt-3"
                    placeholder="Please specify…"
                    value={other}
                    onChange={(e) => onOtherChange(e.target.value)}
                    aria-label={`${q.label} — other (please specify)`}
                />
            )}
            <ErrorText id={q.id} error={error} />
        </fieldset>
    );
};

export default ConsultationForm;
