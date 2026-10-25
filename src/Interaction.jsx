import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import pages from "./data/interaction/intro-to-medicine/week-3.js";
import "./Interaction.css";

const progressKey = "smi-interaction-intro-to-medicine-week-3";
const bestScoreKey = "smi-interaction-intro-to-medicine-week-3-best";
const casePath = "/interaction/intro-to-medicine/week-3";
const coursePath = "/interaction/intro-to-medicine";
const imagePath = "/images/interaction/intro-to-medicine/week-3/";

function readProgress() {
  try {
    const stored = window.localStorage.getItem(progressKey);
    if (!stored) {
      return { pageIndex: 0, answers: {}, name: "" };
    }

    const parsed = JSON.parse(stored);
    return {
      pageIndex:
        Number.isInteger(parsed.pageIndex) &&
        parsed.pageIndex >= 0 &&
        parsed.pageIndex < pages.length
          ? parsed.pageIndex
          : 0,
      answers:
        parsed.answers && typeof parsed.answers === "object"
          ? parsed.answers
          : {},
      name: typeof parsed.name === "string" ? parsed.name.slice(0, 30) : "",
    };
  } catch {
    return { pageIndex: 0, answers: {}, name: "" };
  }
}

function removeProgress() {
  try {
    window.localStorage.removeItem(progressKey);
  } catch {
    // The case remains playable when browser storage is unavailable.
  }
}

function ImageWithFallback({ file, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`interaction-image-fallback ${className}`} role="img" aria-label={alt}>
        {alt}
      </div>
    );
  }

  return (
    <img
      className={`interaction-image ${className}`}
      src={`${imagePath}${file}`}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}

function InlineText({ text }) {
  const parts = text.split(/(\*\*.+?\*\*|\*.+?\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function Callout({ callout }) {
  return (
    <aside className={`interaction-callout ${callout.label === "Safety Note" ? "safety" : "doctor"}`}>
      {callout.label === "Dr. Lee says" ? (
        <ImageWithFallback
          file="dr-lee.png"
          alt="Dr. Lee, a family doctor with a stethoscope"
          className="interaction-doctor-avatar"
        />
      ) : (
        <span className="interaction-safety-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M12 2.5 20 6v5.4c0 5-3.4 8.5-8 10.1-4.6-1.6-8-5.1-8-10.1V6l8-3.5Z" />
            <path d="M12 7v5.5m0 3.2v.1" />
          </svg>
        </span>
      )}
      <div>
        <strong>{callout.label}</strong>
        <p>{callout.text}</p>
      </div>
    </aside>
  );
}

const courses = [
  {
    title: "Intro to Medicine",
    description: "Step into the role of a medical student and solve real patient cases.",
    to: coursePath,
  },
];

export function InteractionPicker() {
  return (
    <main className="interaction-page">
      <section className="interaction-hero">
        <p className="eyebrow">Explore a course</p>
        <h1>Interaction</h1>
        <p>Interactive case studies that go along with our courses. Pick a course to get started.</p>
      </section>
      <section className="interaction-course-grid" aria-label="Courses">
        {courses.map((course) => (
          <article className="interaction-course-card" key={course.title}>
            <span className="interaction-card-icon" aria-hidden="true">✚</span>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <Link className="primary-button" to={course.to}>Open course</Link>
          </article>
        ))}
      </section>
    </main>
  );
}

const weeks = [
  { number: 3, title: "Week 3: Medicines", subtitle: "The Carter Family Case", active: true },
  { number: 4, active: false },
  { number: 5, active: false },
  { number: 6, active: false },
  { number: 7, active: false },
  { number: 8, active: false },
];

export function InteractionWeeks() {
  const navigate = useNavigate();
  const progress = readProgress();
  const completed = progress.pageIndex === pages.length - 1;
  const hasProgress = !completed && progress.pageIndex > 0;
  const score = pages.reduce((total, page) => {
    if (page.type !== "question") return total;
    const answer = progress.answers[page.id];
    return total + (page.question.options.some(
      (option) => option.id === answer?.selectedId && option.correct && answer.checked,
    ) ? 1 : 0);
  }, 0);

  function openOrRestart() {
    if (completed) removeProgress();
    navigate(casePath);
  }

  return (
    <main className="interaction-page">
      <section className="interaction-hero">
        <p className="eyebrow">Interactive case studies</p>
        <h1>Intro to Medicine</h1>
        <p>Each week's case study goes with that week's lesson. Finish the lesson first, then solve the case.</p>
      </section>
      <section className="interaction-weeks" aria-label="Course weeks">
        {weeks.map((week) => {
          if (!week.active) {
            return (
              <article className="interaction-week-card is-locked" key={week.number} aria-label={`Week ${week.number}, coming soon`}>
                <span className="interaction-lock" aria-hidden="true">🔒</span>
                <h2>Week {week.number}</h2>
                <p>Coming soon</p>
                <span className="interaction-locked-label">Coming soon</span>
              </article>
            );
          }

          return (
            <article className="interaction-week-card is-active" key={week.number}>
              <div className="interaction-week-card-top">
                <div>
                  <p className="interaction-week-kicker">{week.title}</p>
                  <h2>{week.subtitle}</h2>
                </div>
                {hasProgress && <span className="interaction-status">In progress</span>}
                {completed && <span className="interaction-status complete">Completed · Score {score}/7</span>}
              </div>
              <p>A case study about choosing the right medicine for the right patient.</p>
              <button className="primary-button" type="button" onClick={openOrRestart}>
                {completed ? "Play again" : hasProgress ? "Continue" : "Start case"}
              </button>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export function InteractionWeekRoute() {
  const { weekSlug } = useParams();
  if (weekSlug === "week-3") return <CasePlayer />;

  return (
    <main className="interaction-unavailable">
      <p className="eyebrow">Intro to Medicine</p>
      <h1>This week isn't available yet</h1>
      <Link className="primary-button" to={coursePath}>Back to Intro to Medicine</Link>
    </main>
  );
}

function getScore(answers) {
  return pages.reduce((total, page) => {
    if (page.type !== "question") return total;
    const answer = answers[page.id];
    return total + (page.question.options.some(
      (option) => option.id === answer?.selectedId && option.correct && answer.checked,
    ) ? 1 : 0);
  }, 0);
}

function scoreMessage(score) {
  if (score === 7) return "Outstanding! You think like a real doctor.";
  if (score >= 5) return "Great work! Review the Doctor's Notes below to lock it in.";
  return "Good effort! Every doctor keeps learning. Read the Doctor's Notes and try again.";
}

function Summary({ page, name, score, onPlayAgain }) {
  const studentName = name.trim()
    ? `Case closed, Student Doctor ${name.trim()}!`
    : "Case closed, Student Doctor!";
  const notes = [
    ["Maya, 10", "Strep throat", "Bacteria", "Amoxicillin", "Antibiotic", "Prescription"],
    ["Maya, 10", "Fever", "(symptom)", "Tylenol (acetaminophen)", "Fever and pain reliever", "OTC"],
    ["Leo, 7", "Flu", "Virus", "Tamiflu", "Antiviral", "Prescription"],
  ];
  const lessons = [
    "Antibiotics kill bacteria. Antivirals fight viruses. Antibiotics never work on viruses.",
    "OTC medicines are sold in stores. Prescription medicines need a doctor's order.",
    "Brand name = the name on the box. Generic name = the medicine's real name. Both work the same.",
    "Take antibiotics exactly as the doctor says, and never share prescriptions.",
    "Kids shouldn't take aspirin unless a doctor says so.",
  ];
  const headings = ["Patient", "Problem", "Cause", "Medicine", "Type", "How to get it"];

  return (
    <section className="interaction-summary">
      <ImageWithFallback file={page.image.file} alt={page.image.alt} className="interaction-summary-image" />
      <p className="eyebrow">Case closed</p>
      <h1>{studentName}</h1>
      <p className="interaction-score">You scored {score} out of 7.</p>
      <p className="interaction-score-message">{scoreMessage(score)}</p>
      <section className="interaction-doctors-notes">
        <h2>Doctor's Notes</h2>
        <div className="interaction-notes-table-wrap">
          <table>
            <thead><tr>{headings.map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
            <tbody>{notes.map((row) => <tr key={`${row[0]}-${row[1]}`}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <div className="interaction-notes-cards" aria-label="Doctor's Notes">
          {notes.map((row) => (
            <article className="interaction-note-card" key={`${row[0]}-${row[1]}`}>
              {headings.map((heading, index) => (
                <p key={heading}><strong>{heading}:</strong> {row[index]}</p>
              ))}
            </article>
          ))}
        </div>
      </section>
      <section className="interaction-lessons">
        <h2>Key lessons</h2>
        <ul>{lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul>
      </section>
      <div className="interaction-summary-actions">
        <button className="primary-button" type="button" onClick={onPlayAgain}>Play again</button>
        <Link className="secondary-button" to={coursePath}>Back to weeks</Link>
      </div>
    </section>
  );
}

function CasePlayer() {
  const [progress, setProgress] = useState(readProgress);
  const page = pages[progress.pageIndex];
  const answer = progress.answers[page.id];
  const score = getScore(progress.answers);

  useEffect(() => {
    try {
      window.localStorage.setItem(progressKey, JSON.stringify(progress));
    } catch {
      // The case remains playable when browser storage is unavailable.
    }
  }, [progress]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [progress.pageIndex]);

  useEffect(() => {
    if (page.type !== "summary") return;
    try {
      const previousBest = Number(window.localStorage.getItem(bestScoreKey)) || 0;
      window.localStorage.setItem(bestScoreKey, String(Math.max(previousBest, score)));
    } catch {
      // Scoring is unaffected when browser storage is unavailable.
    }
  }, [page.type, score]);

  function changePage(pageIndex) {
    setProgress((current) => ({ ...current, pageIndex }));
  }

  function selectAnswer(selectedId) {
    if (answer?.checked) return;
    setProgress((current) => ({
      ...current,
      answers: {
        ...current.answers,
        [page.id]: { selectedId, checked: false },
      },
    }));
  }

  function checkAnswer() {
    if (!answer?.selectedId || answer.checked) return;
    setProgress((current) => ({
      ...current,
      answers: {
        ...current.answers,
        [page.id]: { selectedId: answer.selectedId, checked: true },
      },
    }));
  }

  function playAgain() {
    removeProgress();
    setProgress({ pageIndex: 0, answers: {}, name: "" });
  }

  const selectedOption = page.type === "question"
    ? page.question.options.find((option) => option.id === answer?.selectedId)
    : null;
  const isCorrect = Boolean(selectedOption?.correct);

  return (
    <main className="interaction-player">
      <header className="interaction-player-header">
        <div className="interaction-player-title">
          <p>Intro to Medicine · Week 3</p>
          <span>{page.chapter}</span>
        </div>
        <div className="interaction-progress">
          <div className="interaction-progress-label">
            <span>Step {progress.pageIndex + 1} of 10</span>
            <span>{Math.round(((progress.pageIndex + 1) / pages.length) * 100)}%</span>
          </div>
          <div
            className="interaction-progress-track"
            role="progressbar"
            aria-label="Case progress"
            aria-valuemin="1"
            aria-valuemax="10"
            aria-valuenow={progress.pageIndex + 1}
          >
            <span style={{ width: `${((progress.pageIndex + 1) / pages.length) * 100}%` }} />
          </div>
        </div>
        <Link className="interaction-exit" to={coursePath}>Exit case</Link>
      </header>

      <div className="interaction-player-nav">
        {progress.pageIndex > 0 ? (
          <button type="button" className="interaction-back" onClick={() => changePage(progress.pageIndex - 1)}>
            ← Back
          </button>
        ) : <span />}
      </div>

      {page.type === "summary" ? (
        <Summary page={page} name={progress.name} score={score} onPlayAgain={playAgain} />
      ) : (
        <article className="interaction-page-card">
          <p className="eyebrow">{page.chapter}</p>
          <h1>{page.title}</h1>
          {page.body?.map((paragraph) => (
            <p className="interaction-body" key={paragraph}><InlineText text={paragraph} /></p>
          ))}
          {page.images && (
            <div className="interaction-image-grid">
              {page.images.map((image) => (
                <ImageWithFallback key={image.file} file={image.file} alt={image.alt} />
              ))}
            </div>
          )}
          {page.image && (
            <ImageWithFallback file={page.image.file} alt={page.image.alt} className="interaction-page-image" />
          )}
          {page.type === "intro" && (
            <label className="interaction-name-field">
              Your name (optional)
              <input
                type="text"
                maxLength={30}
                value={progress.name}
                onChange={(event) => setProgress((current) => ({ ...current, name: event.target.value }))}
              />
            </label>
          )}
          {page.type === "question" && (
            <section className="interaction-question" aria-labelledby="interaction-prompt">
              <h2 id="interaction-prompt">{page.question.prompt}</h2>
              <div className="interaction-options" role="group" aria-label="Answer choices">
                {page.question.options.map((option) => {
                  const selected = answer?.selectedId === option.id;
                  const isCorrectChoice = answer?.checked && option.correct;
                  const isWrongSelection = answer?.checked && selected && !option.correct;

                  return (
                    <button
                      type="button"
                      className={[
                        "interaction-option",
                        selected ? "selected" : "",
                        isCorrectChoice ? "correct" : "",
                        isWrongSelection ? "incorrect" : "",
                      ].filter(Boolean).join(" ")}
                      key={option.id}
                      onClick={() => selectAnswer(option.id)}
                      disabled={answer?.checked}
                      aria-pressed={selected}
                    >
                      <span className="interaction-option-letter">{option.id.toUpperCase()}</span>
                      <span>{option.text}</span>
                      {answer?.checked && option.correct && <span className="interaction-option-mark" aria-label="Correct answer">✓</span>}
                      {answer?.checked && selected && !option.correct && <span className="interaction-option-mark" aria-label="Your answer">✗</span>}
                    </button>
                  );
                })}
              </div>
              {answer?.checked && (
                <div className="interaction-answer-feedback" aria-live="polite">
                  <div className={`interaction-result-banner ${isCorrect ? "is-correct" : "is-incorrect"}`}>
                    <span aria-hidden="true">{isCorrect ? "✓" : "!"}</span>
                    <strong>{isCorrect ? "Correct!" : "Not quite."}</strong>
                  </div>
                  <p className="interaction-picked-feedback">{selectedOption.feedback}</p>
                  <p className="interaction-explanation"><strong>Why?</strong> {page.question.explanation}</p>
                </div>
              )}
            </section>
          )}
          {page.callout && (page.type !== "question" || answer?.checked) && <Callout callout={page.callout} />}
          <div className="interaction-page-actions">
            {page.type === "intro" ? (
              <button className="primary-button" type="button" onClick={() => changePage(1)}>Start the case</button>
            ) : page.type === "question" && !answer?.checked ? (
              <button className="primary-button" type="button" disabled={!answer?.selectedId} onClick={checkAnswer}>Check answer</button>
            ) : page.type === "question" ? (
              <button className="primary-button" type="button" onClick={() => changePage(progress.pageIndex + 1)}>Next</button>
            ) : (
              <button className="primary-button" type="button" onClick={() => changePage(progress.pageIndex + 1)}>Next</button>
            )}
          </div>
        </article>
      )}
    </main>
  );
}
