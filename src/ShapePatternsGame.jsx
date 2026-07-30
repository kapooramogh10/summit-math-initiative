import { useState } from "react";
import { Link } from "react-router";
import { createRoundForMode, GRID_SIZE } from "./shapePatternPresets.js";
import ShapeFigure from "./ShapeFigure.jsx";
import "./Resources.css";
import "./ShapePatternsGame.css";

const MODES = [
  { id: "matrix", label: "Figure Matrices" },
  { id: "classification", label: "Figure Classification" },
  { id: "folding", label: "Paper Folding" },
];

function createInitialScores() {
  return {
    matrix: { correct: 0, total: 0 },
    classification: { correct: 0, total: 0 },
    folding: { correct: 0, total: 0 },
  };
}

function buildReducedPattern(round) {
  const vertical = round.axes.includes("vertical");
  const horizontal = round.axes.includes("horizontal");
  const rows = horizontal ? GRID_SIZE / 2 : GRID_SIZE;
  const cols = vertical ? GRID_SIZE / 2 : GRID_SIZE;
  const grid = Array.from({ length: rows }, () => Array(cols).fill(false));

  round.holes.forEach(({ row, col }) => {
    if (row < rows && col < cols) {
      grid[row][col] = true;
    }
  });

  return grid;
}

function FoldGrid({ pattern }) {
  const rows = pattern.length;
  const cols = pattern[0]?.length ?? 0;

  return (
    <div
      className="fold-grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        aspectRatio: `${cols} / ${rows}`,
      }}
    >
      {pattern.map((row, rowIndex) =>
        row.map((isHole, colIndex) => (
          <span
            key={`${rowIndex}-${colIndex}`}
            className={`fold-cell${isHole ? " fold-cell-hole" : ""}`}
          />
        )),
      )}
    </div>
  );
}

function MatrixBoard({ round }) {
  return (
    <div className="matrix-prompt">
      <div className="matrix-grid">
        <div className="matrix-cell">
          <ShapeFigure figure={round.topLeft} />
        </div>
        <div className="matrix-cell">
          <ShapeFigure figure={round.topRight} />
        </div>
        <div className="matrix-cell">
          <ShapeFigure figure={round.bottomLeft} />
        </div>
        <div className="matrix-cell matrix-cell-question">?</div>
      </div>
      <p className="board-instructions">
        Figure out the rule that changes the top-left figure into the top-right figure, then
        apply the same rule to the bottom-left figure.
      </p>
    </div>
  );
}

function ClassificationBoard({ round }) {
  return (
    <div className="classification-prompt">
      <div className="classification-examples">
        {round.examples.map((figure, index) => (
          <div className="classification-cell" key={index}>
            <ShapeFigure figure={figure} />
          </div>
        ))}
      </div>
      <p className="board-instructions">
        These three figures belong together. Choose the answer option that belongs with them
        for the same reason.
      </p>
    </div>
  );
}

function FoldingBoard({ round }) {
  const reducedPattern = buildReducedPattern(round);
  const axisLabel =
    round.axes.length === 2
      ? "in half vertically, then in half horizontally"
      : `in half ${round.axes[0] === "vertical" ? "vertically" : "horizontally"}`;

  return (
    <div className="folding-prompt">
      <p className="fold-axis-label">Folded {axisLabel}, then a piece is cut out:</p>
      <FoldGrid pattern={reducedPattern} />
      <p className="board-instructions">
        Choose the answer option that shows the paper fully unfolded.
      </p>
    </div>
  );
}

function renderOptionContent(mode, option) {
  if (mode === "folding") {
    return <FoldGrid pattern={option.pattern} />;
  }
  return <ShapeFigure figure={option.figure} />;
}

function ShapePatternsGame() {
  const [activeMode, setActiveMode] = useState("matrix");
  const [round, setRound] = useState(() => createRoundForMode("matrix"));
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [scores, setScores] = useState(() => createInitialScores());
  const [questionNumber, setQuestionNumber] = useState(1);
  const [feedback, setFeedback] = useState(
    "Study the pattern, then choose the answer that completes it.",
  );

  function switchMode(mode) {
    if (mode === activeMode) return;
    setActiveMode(mode);
    setRound(createRoundForMode(mode));
    setSelectedOptionId(null);
    setIsLocked(false);
    setLastAnswerCorrect(null);
    setQuestionNumber(1);
    setFeedback("Study the pattern, then choose the answer that completes it.");
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
        ? `Correct! ${round.describe}`
        : `Not quite. ${round.describe} The correct answer is now highlighted.`,
    );
  }

  function nextQuestion() {
    setRound(createRoundForMode(activeMode, round.roundKey));
    setSelectedOptionId(null);
    setIsLocked(false);
    setLastAnswerCorrect(null);
    setQuestionNumber((n) => n + 1);
    setFeedback("Study the pattern, then choose the answer that completes it.");
  }

  const modeScore = scores[activeMode];
  const feedbackClass = !isLocked
    ? ""
    : lastAnswerCorrect
      ? " game-feedback-correct"
      : " game-feedback-incorrect";

  return (
    <main className="shape-patterns-page">
      <section className="number-game-hero">
        <div>
          <Link className="back-to-resources-link" to="/free-resources">
            ← Back to Free Resources
          </Link>
          <p className="eyebrow">Interactive spatial reasoning</p>
          <h1>Shape Patterns</h1>
          <p>
            Practice the visual reasoning skills tested on gifted-and-talented admissions
            exams: spotting transformation rules, matching groups by a shared trait, and
            predicting how folded paper unfolds.
          </p>
        </div>

        <aside className="game-rule-card">
          <strong>Puzzle type</strong>
          <div className="mode-tab-row" role="tablist" aria-label="Puzzle type">
            {MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                role="tab"
                aria-selected={activeMode === mode.id}
                className={`mode-tab${activeMode === mode.id ? " mode-tab-active" : ""}`}
                onClick={() => switchMode(mode.id)}
              >
                {mode.label}
              </button>
            ))}
          </div>
          <p>{round.describe}</p>
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
          {activeMode === "matrix" && <MatrixBoard round={round} />}
          {activeMode === "classification" && <ClassificationBoard round={round} />}
          {activeMode === "folding" && <FoldingBoard round={round} />}
        </div>

        <div className="answer-option-grid">
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
                className={`answer-option${stateClass}${isSelected ? " answer-option-selected" : ""}`}
                onClick={() => selectOption(option)}
                disabled={isLocked}
                aria-pressed={isSelected}
              >
                {renderOptionContent(activeMode, option)}
              </button>
            );
          })}
        </div>

        <div className="shape-answer-panel">
          <p className={`game-feedback${feedbackClass}`} aria-live="polite">
            {feedback}
          </p>
          {isLocked && (
            <button type="button" className="primary-button" onClick={nextQuestion}>
              Next Question
            </button>
          )}
        </div>
      </section>

      <section className="game-learning-section">
        <div className="section-heading centered-heading">
          <p className="eyebrow">How the game works</p>
          <h2>Three ways to practice spatial reasoning.</h2>
        </div>

        <div className="game-strategy-grid">
          <article>
            <span>01</span>
            <h3>Figure Matrices</h3>
            <p>
              Find the rule that turns the top-left figure into the top-right figure, then
              apply it to the bottom-left figure.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Figure Classification</h3>
            <p>
              Three figures share something in common — a shape, a color pairing, a count, or
              an amount of rotation. Find the answer that shares it too.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Paper Folding</h3>
            <p>
              A square is folded and a piece is cut out. Picture it unfolding into a symmetric
              pattern, then pick the matching answer.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default ShapePatternsGame;
