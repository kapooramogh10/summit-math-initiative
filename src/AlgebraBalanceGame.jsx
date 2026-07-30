import { useState } from "react";
import { Link } from "react-router";
import {
  createAlgebraRound,
  getNextCorrectOperation,
  applyOperation,
} from "./algebraEquationPresets.js";
import "./Resources.css";
import "./AlgebraBalanceGame.css";

const TIERS = [
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" },
];

const TIER_DESCRIPTIONS = {
  easy: "One- and two-step whole-number equations.",
  medium: "Equations with x on both sides — collect the x-terms first.",
  hard: "Equations with parentheses — distribute, then collect and isolate.",
};

const OPERATIONS = [
  { id: "add", label: "Add" },
  { id: "subtract", label: "Subtract" },
  { id: "add-x-term", label: "Add x-term" },
  { id: "subtract-x-term", label: "Subtract x-term" },
  { id: "distribute", label: "Distribute" },
  { id: "multiply", label: "Multiply" },
  { id: "divide", label: "Divide" },
];

function createInitialScores() {
  return {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
  };
}

function formatTerm(coefficient) {
  if (coefficient === 1) return "x";
  if (coefficient === -1) return "-x";
  return `${coefficient}x`;
}

function formatBracket({ factor, constant }) {
  const inner =
    constant === 0
      ? "x"
      : constant > 0
        ? `x + ${constant}`
        : `x - ${Math.abs(constant)}`;

  return `${factor}(${inner})`;
}

function formatSide({ coefficient, constant, bracket }) {
  const segments = [];

  if (bracket) {
    segments.push({ text: formatBracket(bracket), negative: false });
  }

  if (coefficient !== 0) {
    const magnitude = Math.abs(coefficient);
    segments.push({
      text: magnitude === 1 ? "x" : `${magnitude}x`,
      negative: coefficient < 0,
    });
  }

  if (constant !== 0 || segments.length === 0) {
    segments.push({ text: `${Math.abs(constant)}`, negative: constant < 0 });
  }

  return segments
    .map((segment, index) => {
      if (index === 0) return segment.negative ? `-${segment.text}` : segment.text;
      return segment.negative ? ` - ${segment.text}` : ` + ${segment.text}`;
    })
    .join("");
}

function formatEquation(state) {
  const left = formatSide({
    coefficient: state.leftCoefficient,
    constant: state.leftConstant,
    bracket: state.leftBracket,
  });

  const right = formatSide({
    coefficient: state.rightCoefficient,
    constant: state.rightConstant,
    bracket: state.rightBracket,
  });

  return `${left} = ${right}`;
}

function sidePanTiles({ coefficient, constant, bracket }) {
  const tiles = [];

  if (bracket) {
    tiles.push({ key: "bracket", className: "balance-tile-bracket", label: formatBracket(bracket) });
  }

  if (coefficient !== 0) {
    tiles.push({ key: "variable", className: "balance-tile-variable", label: formatTerm(coefficient) });
  }

  if (constant !== 0 || tiles.length === 0) {
    const showPlus = constant > 0 && tiles.length > 0;
    tiles.push({
      key: "constant",
      className: "balance-tile-constant",
      label: showPlus ? `+${constant}` : `${constant}`,
    });
  }

  return tiles;
}

function BalanceScale({ state }) {
  const leftTiles = sidePanTiles({
    coefficient: state.leftCoefficient,
    constant: state.leftConstant,
    bracket: state.leftBracket,
  });

  const rightTiles = sidePanTiles({
    coefficient: state.rightCoefficient,
    constant: state.rightConstant,
    bracket: state.rightBracket,
  });

  return (
    <div className="balance-scale">
      <div className="balance-pan">
        {leftTiles.map((tile) => (
          <span key={tile.key} className={`balance-tile ${tile.className}`}>
            {tile.label}
          </span>
        ))}
      </div>

      <div className="balance-fulcrum" aria-hidden="true" />

      <div className="balance-pan">
        {rightTiles.map((tile) => (
          <span key={tile.key} className={`balance-tile ${tile.className}`}>
            {tile.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function AlgebraBalanceGame() {
  const [activeTier, setActiveTier] = useState("easy");
  const [round, setRound] = useState(() => createAlgebraRound("easy"));
  const [state, setState] = useState(() => round.initialState);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [operationValue, setOperationValue] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [hadMistakeThisRound, setHadMistakeThisRound] = useState(false);
  const [scores, setScores] = useState(() => createInitialScores());
  const [questionNumber, setQuestionNumber] = useState(1);

  const [feedback, setFeedback] = useState(
    "Choose an operation and a value, then apply it to both sides to simplify the equation.",
  );

  const tierScore = scores[activeTier];

  function resetRoundState(nextRound) {
    setRound(nextRound);
    setState(nextRound.initialState);
    setSelectedOperation(null);
    setOperationValue("");
    setIsSolved(false);
    setHadMistakeThisRound(false);
    setFeedback(
      "Choose an operation and a value, then apply it to both sides to simplify the equation.",
    );
  }

  function switchTier(tier) {
    if (tier === activeTier) return;

    setActiveTier(tier);
    setQuestionNumber(1);
    resetRoundState(createAlgebraRound(tier));
  }

  function finishStep(nextState) {
    setState(nextState);
    setSelectedOperation(null);
    setOperationValue("");

    if (getNextCorrectOperation(nextState) === null) {
      setIsSolved(true);
      setScores((previous) => {
        const tierTotals = previous[activeTier];
        return {
          ...previous,
          [activeTier]: {
            correct: tierTotals.correct + (hadMistakeThisRound ? 0 : 1),
            total: tierTotals.total + 1,
          },
        };
      });
      setFeedback(`Solved! x = ${nextState.rightConstant}.`);
    } else {
      setFeedback(
        "Correct! The equation is simpler now. Choose the next operation.",
      );
    }
  }

  function reportWrongMove() {
    setHadMistakeThisRound(true);
    setFeedback(
      "That does not bring the equation closer to isolating x. Check whether you still need to distribute, collect the x-terms, undo addition/subtraction, or divide, then try again.",
    );
  }

  function applyStudentOperation() {
    const correctOperation = getNextCorrectOperation(state);

    if (selectedOperation === "distribute") {
      if (correctOperation.operation !== "distribute") {
        reportWrongMove();
        return;
      }

      finishStep(applyOperation(state, "distribute", null));
      return;
    }

    const value = Number(operationValue);

    if (!Number.isInteger(value) || value === 0) {
      setFeedback("Enter a nonzero whole number to apply.");
      return;
    }

    if (
      correctOperation.operation !== selectedOperation ||
      correctOperation.value !== value
    ) {
      reportWrongMove();
      return;
    }

    finishStep(applyOperation(state, selectedOperation, value));
  }

  function nextEquation() {
    setQuestionNumber((n) => n + 1);
    resetRoundState(createAlgebraRound(activeTier, round.roundKey));
  }

  const feedbackClass = isSolved ? " game-feedback-complete" : "";
  const canApply =
    selectedOperation === "distribute" ||
    (selectedOperation !== null && operationValue !== "");

  return (
    <main className="number-game-page">
      <section className="number-game-hero">
        <div>
          <Link className="back-to-resources-link" to="/free-resources">
            ← Back to Free Resources
          </Link>

          <p className="eyebrow">Interactive algebra</p>

          <h1>Algebra Equation Balance</h1>

          <p>
            Keep both sides of the equation equal. Choose the right
            operation and value to apply to both sides until x stands alone.
          </p>
        </div>

        <aside className="game-rule-card">
          <span className="round-rule-label">Equation type</span>

          <div
            className="mode-tab-row"
            role="tablist"
            aria-label="Equation type"
          >
            {TIERS.map((tier) => (
              <button
                key={tier.id}
                type="button"
                role="tab"
                aria-selected={activeTier === tier.id}
                className={`mode-tab${
                  activeTier === tier.id ? " mode-tab-active" : ""
                }`}
                onClick={() => switchTier(tier.id)}
              >
                {tier.label}
              </button>
            ))}
          </div>

          <p className="preset-range-label">{TIER_DESCRIPTIONS[activeTier]}</p>
        </aside>
      </section>

      <section className="game-board-section">
        <div className="shape-status-bar">
          <div>
            <span className="shape-stat-label">Question</span>
            <strong>{questionNumber}</strong>
          </div>

          <div>
            <span className="shape-stat-label">Score this tier</span>
            <strong>
              {tierScore.correct} correct of {tierScore.total}
            </strong>
          </div>
        </div>

        <div className="shape-board algebra-board">
          <p className="equation-display">{formatEquation(state)}</p>
          <BalanceScale state={state} />
        </div>

        {!isSolved && (
          <div className="operation-panel">
            <div
              className="operation-button-row"
              role="group"
              aria-label="Choose an operation"
            >
              {OPERATIONS.map((operation) => (
                <button
                  key={operation.id}
                  type="button"
                  aria-pressed={selectedOperation === operation.id}
                  className={`operation-button${
                    selectedOperation === operation.id
                      ? " operation-button-active"
                      : ""
                  }`}
                  onClick={() => setSelectedOperation(operation.id)}
                >
                  {operation.label}
                </button>
              ))}
            </div>

            <div className="operation-value-row">
              {selectedOperation === "distribute" ? (
                <p className="operation-value-hint">
                  Distribute multiplies the factor outside the parentheses by
                  every term inside.
                </p>
              ) : (
                <>
                  <label htmlFor="operation-value">
                    {selectedOperation === "add-x-term" ||
                    selectedOperation === "subtract-x-term"
                      ? "Coefficient of x to apply"
                      : "Value to apply to both sides"}
                  </label>

                  <input
                    id="operation-value"
                    type="number"
                    value={operationValue}
                    onChange={(event) => setOperationValue(event.target.value)}
                  />
                </>
              )}

              <button
                type="button"
                className="primary-button"
                disabled={!canApply}
                onClick={applyStudentOperation}
              >
                Apply to Both Sides
              </button>
            </div>
          </div>
        )}

        <div className="shape-answer-panel">
          <p className={`game-feedback${feedbackClass}`} aria-live="polite">
            {feedback}
          </p>

          {isSolved && (
            <button
              type="button"
              className="primary-button"
              onClick={nextEquation}
            >
              Next Equation
            </button>
          )}
        </div>
      </section>

      <section className="game-learning-section">
        <div>
          <p className="eyebrow">How the game works</p>

          <h2>Isolate x one legal move at a time.</h2>
        </div>

        <div className="game-strategy-grid">
          <article>
            <span>01</span>

            <h3>Distribute parentheses first</h3>

            <p>
              On Hard equations, multiply the factor outside a bracket by
              every term inside it before doing anything else.
            </p>
          </article>

          <article>
            <span>02</span>

            <h3>Collect the x-terms</h3>

            <p>
              On Medium and Hard equations, if x appears on both sides, add
              or subtract an x-term from both sides until x is on one side
              only.
            </p>
          </article>

          <article>
            <span>03</span>

            <h3>Undo addition or subtraction next</h3>

            <p>
              If a number is added to or subtracted with x, apply the
              opposite operation to both sides to remove it.
            </p>
          </article>

          <article>
            <span>04</span>

            <h3>Undo multiplication or division last</h3>

            <p>
              Once x stands alone with its coefficient, divide both sides by
              that coefficient to finish solving.
            </p>
          </article>

          <article>
            <span>05</span>

            <h3>Watch the scale stay balanced</h3>

            <p>
              Whatever operation you apply to one side happens to the other
              side too, so the equation always stays true.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default AlgebraBalanceGame;
