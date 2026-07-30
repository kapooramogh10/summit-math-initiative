import { useState } from "react";
import { Link } from "react-router";
import "./Resources.css";
import "./SortingGame.css";

function createEmptyPlacements(preset) {
  return Object.fromEntries(
    preset.categories.map((category) => [category.id, []]),
  );
}

function readDraggedValue(event, knownValues, fallback) {
  const storedValue = event.dataTransfer.getData("text/plain");

  if (storedValue === "") {
    return fallback;
  }

  return knownValues.find((value) => String(value) === storedValue) ?? fallback;
}

function SortingGame({
  createRound,
  pageClassName,
  eyebrowText,
  title,
  description,
  itemCount,
  itemCountWord,
}) {
  const [round, setRound] = useState(() => createRound());

  const [valueBank, setValueBank] = useState(() => round.numbers);

  const [placements, setPlacements] = useState(() =>
    createEmptyPlacements(round.preset),
  );

  const [results, setResults] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const [checkCount, setCheckCount] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const [feedback, setFeedback] = useState(
    `Place all ${itemCountWord} values into the three categories. Answers will not be graded until you press Check Answers.`,
  );

  const totalPlaced = Object.values(placements).reduce(
    (total, categoryValues) => total + categoryValues.length,
    0,
  );

  const correctCount = Object.values(results).filter(
    (result) => result === "correct",
  ).length;

  const canCheck = totalPlaced === itemCount && !isComplete;

  function getValueStatus(value) {
    return results[value] ?? "unchecked";
  }

  function removeValueFromPlacements(currentPlacements, value) {
    return Object.fromEntries(
      Object.entries(currentPlacements).map(
        ([categoryId, categoryValues]) => [
          categoryId,
          categoryValues.filter(
            (placedValue) => placedValue !== value,
          ),
        ],
      ),
    );
  }

  function moveValue(value, destinationId) {
    if (
      value === null ||
      value === undefined ||
      getValueStatus(value) === "correct" ||
      isComplete
    ) {
      return;
    }

    setPlacements((currentPlacements) => {
      const updatedPlacements = removeValueFromPlacements(
        currentPlacements,
        value,
      );

      if (destinationId !== "bank") {
        updatedPlacements[destinationId] = [
          ...updatedPlacements[destinationId],
          value,
        ];
      }

      return updatedPlacements;
    });

    setValueBank((currentBank) => {
      const bankWithoutValue = currentBank.filter(
        (bankValue) => bankValue !== value,
      );

      if (destinationId === "bank") {
        return [...bankWithoutValue, value];
      }

      return bankWithoutValue;
    });

    setResults((currentResults) => ({
      ...currentResults,
      [value]: "unchecked",
    }));

    setSelectedValue(null);
    setFeedback(
      "Placement updated. Press Check Answers after all values are sorted.",
    );
  }

  function startDragging(event, value) {
    if (getValueStatus(value) === "correct") {
      event.preventDefault();
      return;
    }

    event.dataTransfer.setData("text/plain", String(value));
    event.dataTransfer.effectAllowed = "move";
    setSelectedValue(value);
  }

  function handleCategoryDrop(event, categoryId) {
    event.preventDefault();
    moveValue(readDraggedValue(event, round.numbers, selectedValue), categoryId);
  }

  function handleBankDrop(event) {
    event.preventDefault();
    moveValue(readDraggedValue(event, round.numbers, selectedValue), "bank");
  }

  function handleCategoryKeyDown(event, categoryId) {
    if (
      (event.key === "Enter" || event.key === " ") &&
      selectedValue !== null
    ) {
      event.preventDefault();
      moveValue(selectedValue, categoryId);
    }
  }

  function checkAnswers() {
    if (!canCheck) {
      setFeedback(
        `Place all ${itemCountWord} values before checking. You currently have ${totalPlaced} of ${itemCount} placed.`,
      );
      return;
    }

    const nextResults = {};
    let nextCorrectCount = 0;

    Object.entries(placements).forEach(
      ([categoryId, categoryValues]) => {
        categoryValues.forEach((value) => {
          const correctCategoryId = round.preset.classify(value);
          const isCorrect = correctCategoryId === categoryId;

          nextResults[value] = isCorrect ? "correct" : "incorrect";

          if (isCorrect) {
            nextCorrectCount += 1;
          }
        });
      },
    );

    setResults(nextResults);
    setCheckCount((currentCount) => currentCount + 1);
    setSelectedValue(null);

    if (nextCorrectCount === itemCount) {
      setIsComplete(true);
      setFeedback(
        `Excellent! All ${itemCountWord} values are correct. Start a new round to receive new rules and new values.`,
      );
      return;
    }

    const incorrectCount = itemCount - nextCorrectCount;

    setFeedback(
      `${nextCorrectCount} correct and ${incorrectCount} incorrect. Green values are now locked. Move the red values and check again.`,
    );
  }

  function startNewRound() {
    const nextRound = createRound(round.preset.id);

    setRound(nextRound);
    setValueBank(nextRound.numbers);
    setPlacements(createEmptyPlacements(nextRound.preset));
    setResults({});
    setSelectedValue(null);
    setCheckCount(0);
    setIsComplete(false);
    setRoundNumber((currentRound) => currentRound + 1);

    setFeedback(
      `A new preset and ${itemCountWord} new values are ready. Place every value before checking your answers.`,
    );
  }

  function renderValueButton(value, locationClass = "") {
    const status = getValueStatus(value);
    const isLocked = status === "correct";

    return (
      <button
        className={[
          "game-number",
          `game-number-${status}`,
          selectedValue === value ? "game-number-selected" : "",
          locationClass,
        ]
          .filter(Boolean)
          .join(" ")}
        disabled={isLocked}
        draggable={!isLocked}
        key={value}
        type="button"
        aria-label={`${value}, ${status}`}
        title={
          isLocked
            ? `${value} is correct and locked`
            : `Move the value ${value}`
        }
        onClick={() => {
          if (isLocked) return;

          setSelectedValue((currentValue) =>
            currentValue === value ? null : value,
          );
        }}
        onDragStart={(event) => startDragging(event, value)}
      >
        {value}

        {isLocked && (
          <span className="number-lock-icon" aria-hidden="true">
            ✓
          </span>
        )}
      </button>
    );
  }

  return (
    <main className={pageClassName}>
      <section className="number-game-hero">
        <div>
          <Link className="back-to-resources-link" to="/free-resources">
            ← Back to Free Resources
          </Link>

          <p className="eyebrow">{eyebrowText}</p>

          <h1>{title}</h1>

          <p>{description}</p>
        </div>

        <aside className="game-rule-card">
          <span className="round-rule-label">
            Round {roundNumber} rules
          </span>

          <h2>{round.preset.title}</h2>

          <p className="preset-range-label">
            {round.preset.rangeLabel}
          </p>

          <div className="preset-rule-list">
            {round.preset.categories.map((category) => (
              <div key={category.id}>
                <strong>{category.title}</strong>
                <span>{category.subtitle}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="game-board-section">
        <div className="game-status-bar">
          <div>
            <span>Round progress</span>
            <strong>
              {totalPlaced} of {itemCount} placed · {correctCount} locked
            </strong>
          </div>

          <div>
            <span>Answer checks</span>
            <strong>{checkCount}</strong>
          </div>
        </div>

        <section
          className="number-bank-panel number-bank-drop-zone"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleBankDrop}
        >
          <div className="number-bank-heading">
            <div>
              <p className="eyebrow">Value bank</p>

              <h2>Drag or select a value.</h2>
            </div>

            <span>{valueBank.length} remaining</span>
          </div>

          <div className="number-bank">
            {valueBank.map((value) =>
              renderValueButton(value, "number-bank-button"),
            )}

            {valueBank.length === 0 && (
              <div className="empty-number-bank">
                All values have been placed. Press Check Answers.
              </div>
            )}
          </div>

          {selectedValue !== null &&
            getValueStatus(selectedValue) !== "correct" && (
              <button
                className="return-to-bank-button"
                type="button"
                onClick={() => moveValue(selectedValue, "bank")}
              >
                Return selected value to bank
              </button>
            )}
        </section>

        <div className="sorting-zones randomized-sorting-zones">
          {round.categoryOrder.map((category, index) => (
            <section
              className={`sorting-zone randomized-sorting-zone sorting-zone-position-${
                index + 1
              }`}
              key={category.id}
              role="button"
              tabIndex={0}
              onClick={() => moveValue(selectedValue, category.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) =>
                handleCategoryDrop(event, category.id)
              }
              onKeyDown={(event) =>
                handleCategoryKeyDown(event, category.id)
              }
            >
              <div className="sorting-zone-heading">
                <div className="category-heading-row">
                  <span>Category {index + 1}</span>
                  <strong>
                    {placements[category.id].length} placed
                  </strong>
                </div>

                <h3>{category.title}</h3>
                <p>{category.subtitle}</p>
              </div>

              <div className="placed-number-area">
                {placements[category.id].map((value) =>
                  renderValueButton(value, "placed-game-number"),
                )}

                {placements[category.id].length === 0 && (
                  <span className="drop-instruction">
                    Drop values here
                  </span>
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="answer-check-panel">
          <div>
            <span className="check-panel-label">
              Check your work
            </span>

            <p>
              Correct values turn green and lock in place. Incorrect values
              turn red and can be moved again.
            </p>
          </div>

          {!isComplete ? (
            <button
              className="check-answers-button"
              disabled={!canCheck}
              type="button"
              onClick={checkAnswers}
            >
              {canCheck
                ? "Check Answers"
                : `Place ${itemCount - totalPlaced} More`}
            </button>
          ) : (
            <button
              className="new-preset-button"
              type="button"
              onClick={startNewRound}
            >
              New Rules & New Values
            </button>
          )}
        </div>

        <div
          className={`game-feedback ${
            isComplete ? "game-feedback-complete" : ""
          }`}
          aria-live="polite"
        >
          {feedback}
        </div>
      </section>

      <section className="game-learning-section">
        <div>
          <p className="eyebrow">How the game works</p>

          <h2>Read every category carefully.</h2>
        </div>

        <div className="game-strategy-grid">
          <article>
            <span>01</span>

            <h3>Study the rules</h3>

            <p>
              The three categories and their order change each round. Do not
              assume the boxes use the same rules as the previous round.
            </p>
          </article>

          <article>
            <span>02</span>

            <h3>Sort all {itemCountWord}</h3>

            <p>
              Every displayed value belongs in exactly one category. Each
              category will receive at least one value.
            </p>
          </article>

          <article>
            <span>03</span>

            <h3>Check and revise</h3>

            <p>
              Green values are correct and locked. Move only the red values,
              then press Check Answers again.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default SortingGame;
