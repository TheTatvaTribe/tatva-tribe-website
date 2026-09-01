import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { addRipple } from '../utils/ripple';
import { STORY_QUESTIONS, stories, storiesIntro } from '../data/stories';

const pad = (n) => String(n).padStart(2, '0');

const Portrait = ({ story }) => {
  const [failed, setFailed] = useState(false);

  if (!story.portrait || failed) {
    return (
      <span className="story-portrait story-portrait-fallback" role="img" aria-label={story.name}>
        {story.initials}
      </span>
    );
  }
  return (
    <img
      className="story-portrait"
      src={story.portrait}
      alt={story.name}
      width="440"
      height="440"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

const Story = ({ story }) => (
  <article className="story reveal-up" id={story.id}>
    <div className="story-person">
      <Portrait story={story} />
      <h2 className="story-name">{story.name}</h2>
    </div>

    <div className="story-qa">
      {STORY_QUESTIONS.map((question, i) => (
        <div className="story-qa-item" key={question}>
          <span className="story-qa-num" aria-hidden="true">{pad(i + 1)}</span>
          <h3 className="story-qa-q">{question}</h3>
          {story.answers[i] ? (
            <p className="story-qa-a">{story.answers[i]}</p>
          ) : (
            <p className="story-qa-a is-pending">Answer not supplied yet.</p>
          )}
        </div>
      ))}
    </div>
  </article>
);

const Stories = () => {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <div className="stories-page" ref={rootRef}>
      <section className="page-head">
        <div className="container">
          <div className="page-head-inner">
            <span className="section-eyebrow">{storiesIntro.eyebrow}</span>
            <h1>{storiesIntro.title}</h1>
            <p>{storiesIntro.description}</p>
          </div>
        </div>
      </section>

      <div className="stories-list">
        {stories.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </div>

      <section className="stories-cta">
        <h2>Tell us where you&rsquo;re starting from.</h2>
        <Link to="/contact" className="btn btn-primary ripple-btn" onClick={addRipple}>
          Book a free consultation
        </Link>
      </section>
    </div>
  );
};

export default Stories;
