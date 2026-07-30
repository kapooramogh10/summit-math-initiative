function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomIntExcludingZero(min, max) {
  let value = 0;

  while (value === 0) {
    value = randomInt(min, max);
  }

  return value;
}

function generateOneStepAdditive() {
  const x = randomIntExcludingZero(-12, 12);
  const b = randomIntExcludingZero(-20, 20);

  return {
    leftCoefficient: 1,
    leftConstant: b,
    leftBracket: null,
    rightCoefficient: 0,
    rightConstant: x + b,
    rightBracket: null,
    x,
  };
}

function generateOneStepMultiplicative() {
  const x = randomIntExcludingZero(-12, 12);
  const a = randomInt(2, 9);

  return {
    leftCoefficient: a,
    leftConstant: 0,
    leftBracket: null,
    rightCoefficient: 0,
    rightConstant: a * x,
    rightBracket: null,
    x,
  };
}

function generateTwoStep() {
  const x = randomIntExcludingZero(-10, 10);
  const a = randomInt(2, 6);
  const b = randomIntExcludingZero(-15, 15);

  return {
    leftCoefficient: a,
    leftConstant: b,
    leftBracket: null,
    rightCoefficient: 0,
    rightConstant: a * x + b,
    rightBracket: null,
    x,
  };
}

function generateTwoSidedVariable() {
  const x = randomIntExcludingZero(-10, 10);
  const c = randomInt(1, 6);
  const a = randomInt(c + 1, c + 6);
  const b = randomIntExcludingZero(-12, 12);
  const d = (a - c) * x + b;

  return {
    leftCoefficient: a,
    leftConstant: b,
    leftBracket: null,
    rightCoefficient: c,
    rightConstant: d,
    rightBracket: null,
    x,
  };
}

function generateOneBracketHard() {
  const x = randomIntExcludingZero(-9, 9);
  const factorA = randomInt(3, 6);
  const innerB = randomIntExcludingZero(-9, 9);
  const c = randomInt(1, factorA - 2);
  const d = factorA * x + factorA * innerB - c * x;

  return {
    leftCoefficient: 0,
    leftConstant: 0,
    leftBracket: { factor: factorA, constant: innerB },
    rightCoefficient: c,
    rightConstant: d,
    rightBracket: null,
    x,
  };
}

function generateTwoBracketHard() {
  const x = randomIntExcludingZero(-8, 8);
  const factorA = randomInt(4, 6);
  const innerB = randomIntExcludingZero(-8, 8);
  const factorC = randomInt(2, factorA - 2);
  const innerD = randomIntExcludingZero(-8, 8);
  const e = factorA * x + factorA * innerB - factorC * x - factorC * innerD;

  return {
    leftCoefficient: 0,
    leftConstant: 0,
    leftBracket: { factor: factorA, constant: innerB },
    rightCoefficient: 0,
    rightConstant: e,
    rightBracket: { factor: factorC, constant: innerD },
    x,
  };
}

export function getNextCorrectOperation(state) {
  if (state.leftBracket) {
    return { operation: "distribute", value: null };
  }

  if (state.rightBracket) {
    return { operation: "distribute", value: null };
  }

  if (state.rightCoefficient !== 0) {
    return state.rightCoefficient > 0
      ? { operation: "subtract-x-term", value: state.rightCoefficient }
      : { operation: "add-x-term", value: -state.rightCoefficient };
  }

  if (state.leftConstant !== 0) {
    return state.leftConstant > 0
      ? { operation: "subtract", value: state.leftConstant }
      : { operation: "add", value: -state.leftConstant };
  }

  if (state.leftCoefficient !== 1) {
    return { operation: "divide", value: state.leftCoefficient };
  }

  return null;
}

export function applyOperation(state, operation, value) {
  switch (operation) {
    case "add":
      return {
        ...state,
        leftConstant: state.leftConstant + value,
        rightConstant: state.rightConstant + value,
      };
    case "subtract":
      return {
        ...state,
        leftConstant: state.leftConstant - value,
        rightConstant: state.rightConstant - value,
      };
    case "add-x-term":
      return {
        ...state,
        leftCoefficient: state.leftCoefficient + value,
        rightCoefficient: state.rightCoefficient + value,
      };
    case "subtract-x-term":
      return {
        ...state,
        leftCoefficient: state.leftCoefficient - value,
        rightCoefficient: state.rightCoefficient - value,
      };
    case "distribute": {
      const side = state.leftBracket ? "left" : state.rightBracket ? "right" : null;
      if (!side) return state;

      const { factor, constant } = state[`${side}Bracket`];

      return {
        ...state,
        [`${side}Coefficient`]: state[`${side}Coefficient`] + factor,
        [`${side}Constant`]: state[`${side}Constant`] + factor * constant,
        [`${side}Bracket`]: null,
      };
    }
    case "multiply":
      return {
        ...state,
        leftCoefficient: state.leftCoefficient * value,
        leftConstant: state.leftConstant * value,
        rightCoefficient: state.rightCoefficient * value,
        rightConstant: state.rightConstant * value,
        leftBracket:
          state.leftBracket &&
          { factor: state.leftBracket.factor * value, constant: state.leftBracket.constant },
        rightBracket:
          state.rightBracket &&
          { factor: state.rightBracket.factor * value, constant: state.rightBracket.constant },
      };
    case "divide":
      return {
        ...state,
        leftCoefficient: state.leftCoefficient / value,
        leftConstant: state.leftConstant / value,
        rightCoefficient: state.rightCoefficient / value,
        rightConstant: state.rightConstant / value,
        leftBracket:
          state.leftBracket &&
          { factor: state.leftBracket.factor / value, constant: state.leftBracket.constant },
        rightBracket:
          state.rightBracket &&
          { factor: state.rightBracket.factor / value, constant: state.rightBracket.constant },
      };
    default:
      return state;
  }
}

function generateForTier(tier) {
  if (tier === "medium") return generateTwoSidedVariable();

  if (tier === "hard") {
    return Math.random() < 0.5 ? generateOneBracketHard() : generateTwoBracketHard();
  }

  const roll = Math.random();
  if (roll < 1 / 3) return generateOneStepAdditive();
  if (roll < 2 / 3) return generateOneStepMultiplicative();
  return generateTwoStep();
}

export function createAlgebraRound(tier, previousRoundKey = null) {
  let round;
  let roundKey;

  do {
    round = generateForTier(tier);
    roundKey = JSON.stringify([
      round.leftCoefficient,
      round.leftConstant,
      round.leftBracket,
      round.rightCoefficient,
      round.rightConstant,
      round.rightBracket,
    ]);
  } while (roundKey === previousRoundKey);

  return {
    tier,
    roundKey,
    initialState: {
      leftCoefficient: round.leftCoefficient,
      leftConstant: round.leftConstant,
      leftBracket: round.leftBracket,
      rightCoefficient: round.rightCoefficient,
      rightConstant: round.rightConstant,
      rightBracket: round.rightBracket,
    },
    x: round.x,
  };
}

function solveByRepeatedlyApplyingCorrectOperation(initialState) {
  let state = initialState;
  let steps = 0;

  for (; steps < 12; steps += 1) {
    const next = getNextCorrectOperation(state);
    if (!next) break;
    state = applyOperation(state, next.operation, next.value);

    ["leftCoefficient", "leftConstant", "rightCoefficient", "rightConstant"].forEach((key) => {
      if (!Number.isInteger(state[key])) {
        throw new Error(`Algebra generator produced a non-integer "${key}" mid-solve.`);
      }
    });
  }

  return { state, steps };
}

const TIER_STEP_RANGES = {
  easy: [1, 2],
  medium: [2, 3],
  hard: [4, 5],
};

function validateAlgebraGenerators() {
  ["easy", "medium", "hard"].forEach((tier) => {
    const [minSteps, maxSteps] = TIER_STEP_RANGES[tier];

    for (let attempt = 0; attempt < 300; attempt += 1) {
      const round = createAlgebraRound(tier);
      const { state: finalState, steps } = solveByRepeatedlyApplyingCorrectOperation(
        round.initialState,
      );

      const solved =
        finalState.leftCoefficient === 1 &&
        finalState.leftConstant === 0 &&
        finalState.leftBracket === null &&
        finalState.rightCoefficient === 0 &&
        finalState.rightBracket === null &&
        finalState.rightConstant === round.x;

      if (!solved) {
        throw new Error(`Algebra generator produced an unsolvable "${tier}" round.`);
      }

      if (steps < minSteps || steps > maxSteps) {
        throw new Error(
          `Algebra generator produced a "${tier}" round with ${steps} steps, expected ${minSteps}-${maxSteps}.`,
        );
      }
    }
  });
}

validateAlgebraGenerators();
