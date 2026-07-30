import { useState } from "react";
import { Link } from "react-router";
import { createRoundForMode } from "./trianglePresets.js";
import TriangleFigure from "./TriangleFigure.jsx";
import "./Resources.css";
import "./TrianglePropertiesGame.css";

const MODES = [
  { id: "identify", label: "Identify the Triangle" },
  { id: "calculate", label: "Find the Missing Value" },
];

function createInitialScores() {
  return {
    identify: { correct: 0, total: 0 },
    calculate: { correct: 0, total: 0 },
  };
}

function TriangleBoard({ round }) {
  return (
    <div className="triangle-board">
      {round.figure && (
        <TriangleFigure
          angles={round.figure.angles ?? null}
          sides={round.figure.sides ?? null}
          vertexLabels={round.figure.vertexLabels ?? null}
          sideLabels={round.figure.sideLabels ?? null}
          tickMarks={round.figure.tickMarks ?? null}
          rightAngleAt={round.figure.rightAngleAt ?? null}
          exteriorAngleAt={round.figure.exteriorAngleAt ?? null}
          exteriorAngleLabel={round.figure.exteriorAngleLabel ?? null}
          altitudeFromVertex={round.figure.altitudeFromVertex ?? null}
          altitudeLabel={round.figure.altitudeLabel ?? null}
        />
      )}

      <p className="board-instructions">{round.prompt}</p>
    </div>
  );
}

const DEFAULT_FEEDBACK = {
  heading: null,
  lines: ["Study the triangle, then choose the correct answer."],
};

function TrianglePropertiesGame() {
  const [activeMode, setActiveMode] = useState("identify");
  const [round, setRound] = useState(() => createRoundForMode("identify"));
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [scores, setScores] = useState(() => createInitialScores());
  const [questionNumber, setQuestionNumber] = useState(1);

  const [feedback, setFeedback] = useState(DEFAULT_FEEDBACK);

  function switchMode(mode) {
    if (mode === activeMode) return;

    setActiveMode(mode);
    setRound(createRoundForMode(mode));
    setSelectedOptionId(null);
    setIsLocked(false);
    setLastAnswerCorrect(null);
    setQuestionNumber(1);
    setFeedback(DEFAULT_FEEDBACK);
  }

  function selectOption(option) {
    if (isLocked) return;

    setSelectedOptionId(option.id);
    setIsLocked(true);
    setLastAnswerCorrect(option.correct);

    setScores((previous) => {
      const modeScore = previous[activeMode];
      return {
        ...previous,
        [activeMode]: {
          correct: modeScore.correct + (option.correct ? 1 : 0),
          total: modeScore.total + 1,
        },
      };
    });

    setFeedback(
      option.correct
        ? { heading: "Correct!", lines: [round.describe] }
        : {
            heading: "Not quite.",
            lines: option.reason ? [option.reason, round.describe] : [round.describe],
          },
    );
  }

  function nextQuestion() {
    setRound(createRoundForMode(activeMode, round.roundKey));
    setSelectedOptionId(null);
    setIsLocked(false);
    setLastAnswerCorrect(null);
    setQuestionNumber((n) => n + 1);
    setFeedback(DEFAULT_FEEDBACK);
  }

  const modeScore = scores[activeMode];
  const feedbackClass = !isLocked
    ? ""
    : lastAnswerCorrect
      ? " game-feedback-correct"
      : " game-feedback-incorrect";

  return (
    <main className="number-game-page">
      <section className="number-game-hero">
        <div>
          <Link className="back-to-resources-link" to="/free-resources">
            ← Back to Free Resources
          </Link>

          <p className="eyebrow">Interactive triangle properties</p>

          <h1>Triangle Properties Explorer</h1>

          <p>
            Classify triangles by their angles, sides, triangle inequality,
            and side-angle relationships, then use the angle sum rule, the
            exterior angle theorem, the Pythagorean theorem, and the area
            formula to find missing values.
          </p>
        </div>

        <aside className="game-rule-card">
          <span className="round-rule-label">Question type</span>

          <div
            className="mode-tab-row"
            role="tablist"
            aria-label="Question type"
          >
            {MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                role="tab"
                aria-selected={activeMode === mode.id}
                className={`mode-tab${
                  activeMode === mode.id ? " mode-tab-active" : ""
                }`}
                onClick={() => switchMode(mode.id)}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <p className="preset-range-label">
            {activeMode === "identify"
              ? "Classify triangles by angle, side, the triangle inequality, or the side-angle relationship."
              : "Use the angle sum rule, the exterior angle theorem, the Pythagorean theorem, or the area formula."}
          </p>
        </aside>
      </section>

      <section className="game-board-section">
        <div className="shape-status-bar">
          <div>
            <span className="shape-stat-label">Question</span>
            <strong>{questionNumber}</strong>
          </div>

          <div>
            <span className="shape-stat-label">Score this mode</span>
            <strong>
              {modeScore.correct} correct of {modeScore.total}
            </strong>
          </div>
        </div>

        <div className="shape-board">
          <TriangleBoard round={round} />
        </div>

        <div className="answer-option-grid triangle-answer-option-grid">
          {round.options.map((option) => {
            const isSelected = option.id === selectedOptionId;
            const showCorrect = isLocked && option.correct;
            const showIncorrect = isLocked && isSelected && !option.correct;
            const stateClass = showCorrect
              ? " answer-option-correct"
              : showIncorrect
                ? " answer-option-incorrect"
                : "";

            return (
              <button
                key={option.id}
                type="button"
                className={`answer-option triangle-answer-option${stateClass}${
                  isSelected ? " answer-option-selected" : ""
                }`}
                onClick={() => selectOption(option)}
                disabled={isLocked}
                aria-pressed={isSelected}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="shape-answer-panel">
          <div className={`game-feedback${feedbackClass}`} aria-live="polite">
            {feedback.heading && (
              <p className="game-feedback-heading">{feedback.heading}</p>
            )}

            {feedback.lines.map((line, index) => (
              <p key={index} className="game-feedback-line">
                {line}
              </p>
            ))}
          </div>

          {isLocked && (
            <button
              type="button"
              className="primary-button"
              onClick={nextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
      </section>

      <section className="game-learning-section">
        <div>
          <p className="eyebrow">How the game works</p>

          <h2>Eight ways to practice triangle properties.</h2>
        </div>

        <div className="game-strategy-grid">
          <article>
            <span>01</span>

            <h3>Classify by angles</h3>

            <p>
              A triangle is acute if every angle is less than 90°, right if
              one angle is exactly 90°, and obtuse if one angle is more than
              90°.
            </p>
          </article>

          <article>
            <span>02</span>

            <h3>Classify by sides</h3>

            <p>
              Equilateral triangles have three equal sides, isosceles
              triangles have exactly two equal sides, and scalene triangles
              have none.
            </p>
          </article>

          <article>
            <span>03</span>

            <h3>Check the triangle inequality</h3>

            <p>
              Three lengths only form a triangle if every pair of sides adds
              up to more than the third side. If any pair fails that test,
              the shape can't close.
            </p>
          </article>

          <article>
            <span>04</span>

            <h3>Match sides to angles</h3>

            <p>
              The longest side is always opposite the largest angle, and the
              shortest side is always opposite the smallest angle.
            </p>
          </article>

          <article>
            <span>05</span>

            <h3>Find a missing angle</h3>

            <p>
              Every triangle's three angles add up to 180°, so subtract the
              two known angles from 180° to find the third.
            </p>
          </article>

          <article>
            <span>06</span>

            <h3>Use the exterior angle theorem</h3>

            <p>
              An exterior angle equals the sum of the two interior angles
              that aren't next to it — the two "remote" interior angles.
            </p>
          </article>

          <article>
            <span>07</span>

            <h3>Use the Pythagorean theorem</h3>

            <p>
              In a right triangle, the two legs squared and added together
              equal the hypotenuse squared: a² + b² = c².
            </p>
          </article>

          <article>
            <span>08</span>

            <h3>Calculate area</h3>

            <p>
              A triangle's area is half its base times its height:
              Area = ½ × base × height. The height is measured perpendicular
              to the base, not along a slanted side.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default TrianglePropertiesGame;
