import { shuffle } from "./numberTheoryPresets.js";

export const GRID_SIZE = 4;

const SHAPES = [
  "triangle",
  "square",
  "circle",
  "star",
  "diamond",
  "pentagon",
  "hexagon",
  "arrow",
];

const COLORS = ["navy", "blue", "gold", "gray"];
const FILL_CYCLE = ["solid", "striped", "hatched", "outline"];
const COLOR_PAIRS = [
  ["navy", "gold"],
  ["blue", "gray"],
];

// Rotating/flipping square, diamond, or circle is invisible (they're symmetric
// under those exact transforms), which would make the puzzle unsolvable.
const ROTATE_RULE_SHAPES = ["triangle", "pentagon", "star", "arrow"];
// triangle/pentagon/star/hexagon are all left-right mirror symmetric when
// apex-up, so a horizontal flip is invisible on them too; only the
// deliberately asymmetric arrow shows a real difference on either flip axis.
const FLIP_RULE_SHAPES = ["arrow"];

const CONFUSABLE_SHAPES = {
  triangle: ["diamond", "pentagon", "arrow"],
  square: ["diamond", "hexagon", "pentagon"],
  circle: ["star", "hexagon", "pentagon"],
  star: ["circle", "hexagon", "pentagon"],
  diamond: ["square", "triangle", "pentagon"],
  pentagon: ["hexagon", "square", "star"],
  hexagon: ["pentagon", "square", "star"],
  arrow: ["triangle", "star", "pentagon"],
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(items) {
  return items[randomInt(0, items.length - 1)];
}

function normalizeRotation(degrees) {
  return ((degrees % 360) + 360) % 360;
}

function makeFigure(overrides = {}) {
  return {
    shape: "square",
    fill: "solid",
    primaryColor: "navy",
    secondaryColor: "gray",
    rotation: 0,
    flipX: false,
    flipY: false,
    size: "md",
    count: 1,
    ...overrides,
  };
}

function randomFigure(overrides = {}) {
  const primaryColor = overrides.primaryColor ?? randomChoice(COLORS);
  const secondaryColor =
    overrides.secondaryColor ??
    randomChoice(COLORS.filter((color) => color !== primaryColor));

  return makeFigure({
    shape: randomChoice(SHAPES),
    fill: "solid",
    rotation: 0,
    size: "md",
    count: 1,
    ...overrides,
    primaryColor,
    secondaryColor,
  });
}

function figureKey(figure) {
  return [
    figure.shape,
    figure.fill,
    figure.primaryColor,
    figure.secondaryColor,
    figure.rotation,
    figure.flipX,
    figure.flipY,
    figure.size,
    figure.count,
  ].join("|");
}

function ensureDistinctFigures(correctFigure, distractorFigures) {
  const seenKeys = new Set([figureKey(correctFigure)]);

  return distractorFigures.map((figure) => {
    let candidate = figure;
    let attempts = 0;

    while (seenKeys.has(figureKey(candidate)) && attempts < 10) {
      candidate = {
        ...candidate,
        rotation: normalizeRotation(candidate.rotation + 15 * (attempts + 1)),
      };
      attempts += 1;
    }

    seenKeys.add(figureKey(candidate));
    return candidate;
  });
}

function otherColorInPair(pair, color) {
  return pair[0] === color ? pair[1] : pair[0];
}

function outsidePairColor(pair) {
  return randomChoice(COLORS.filter((color) => !pair.includes(color)));
}

function nextFill(fill) {
  return FILL_CYCLE[(FILL_CYCLE.indexOf(fill) + 1) % FILL_CYCLE.length];
}

function skipFill(fill) {
  return FILL_CYCLE[(FILL_CYCLE.indexOf(fill) + 2) % FILL_CYCLE.length];
}

// Every distractor perturbs exactly one interpretable dimension of the
// correct answer (wrong direction, wrong axis, extra unrequested change,
// or no change at all) so wrong answers are instructive, not arbitrary noise.
const MATRIX_RULES = [
  {
    id: "rotate90cw",
    describe: "The figure rotates 90 degrees clockwise.",
    createBaseFigure: () =>
      randomFigure({ shape: randomChoice(ROTATE_RULE_SHAPES), rotation: 0 }),
    apply: (figure) => ({
      ...figure,
      rotation: normalizeRotation(figure.rotation + 90),
    }),
    distractors: (figure) => [
      { ...figure, rotation: normalizeRotation(figure.rotation - 90) },
      { ...figure, rotation: normalizeRotation(figure.rotation + 180) },
      { ...figure },
    ],
  },
  {
    id: "rotate180",
    describe: "The figure rotates 180 degrees (turns upside down).",
    createBaseFigure: () =>
      randomFigure({ shape: randomChoice(ROTATE_RULE_SHAPES), rotation: 0 }),
    apply: (figure) => ({
      ...figure,
      rotation: normalizeRotation(figure.rotation + 180),
    }),
    distractors: (figure) => [
      { ...figure, rotation: normalizeRotation(figure.rotation + 90) },
      { ...figure, rotation: normalizeRotation(figure.rotation + 270) },
      { ...figure },
    ],
  },
  {
    id: "flipHorizontal",
    describe: "The figure flips left-to-right (mirrors horizontally).",
    createBaseFigure: () =>
      randomFigure({
        shape: randomChoice(FLIP_RULE_SHAPES),
        flipX: false,
        flipY: false,
      }),
    apply: (figure) => ({ ...figure, flipX: !figure.flipX }),
    distractors: (figure) => [
      { ...figure, flipY: !figure.flipY },
      { ...figure, flipX: !figure.flipX, flipY: !figure.flipY },
      { ...figure },
    ],
  },
  {
    id: "flipVertical",
    describe: "The figure flips top-to-bottom (mirrors vertically).",
    createBaseFigure: () =>
      randomFigure({
        shape: randomChoice(FLIP_RULE_SHAPES),
        flipX: false,
        flipY: false,
      }),
    apply: (figure) => ({ ...figure, flipY: !figure.flipY }),
    distractors: (figure) => [
      { ...figure, flipX: !figure.flipX },
      { ...figure, flipX: !figure.flipX, flipY: !figure.flipY },
      { ...figure },
    ],
  },
  {
    id: "colorSwap",
    describe: "The figure's color swaps to the paired color.",
    createContext: () => ({ pair: randomChoice(COLOR_PAIRS) }),
    createBaseFigure: (ctx) =>
      randomFigure({ fill: "solid", primaryColor: randomChoice(ctx.pair) }),
    apply: (figure, ctx) => ({
      ...figure,
      primaryColor: otherColorInPair(ctx.pair, figure.primaryColor),
    }),
    distractors: (figure, correctFigure, ctx) => [
      { ...figure },
      { ...figure, primaryColor: outsidePairColor(ctx.pair) },
      {
        ...correctFigure,
        shape: randomChoice(SHAPES.filter((shape) => shape !== figure.shape)),
      },
    ],
  },
  {
    id: "fillPatternChange",
    describe:
      "The figure's fill pattern steps forward (solid, striped, hatched, outline).",
    createBaseFigure: () => randomFigure({ fill: randomChoice(FILL_CYCLE) }),
    apply: (figure) => ({ ...figure, fill: nextFill(figure.fill) }),
    distractors: (figure) => [
      { ...figure, fill: skipFill(figure.fill) },
      { ...figure },
      {
        ...figure,
        fill: nextFill(figure.fill),
        primaryColor: randomChoice(
          COLORS.filter((color) => color !== figure.primaryColor),
        ),
      },
    ],
  },
  {
    id: "scaleUp",
    describe: "The figure grows one size step larger.",
    createBaseFigure: () => randomFigure({ size: "sm" }),
    apply: (figure) => ({ ...figure, size: "md" }),
    distractors: (figure) => [
      { ...figure, size: "sm" },
      { ...figure, size: "lg" },
      {
        ...figure,
        size: "md",
        shape: randomChoice(SHAPES.filter((shape) => shape !== figure.shape)),
      },
    ],
  },
  {
    id: "scaleDown",
    describe: "The figure shrinks one size step smaller.",
    createBaseFigure: () => randomFigure({ size: "lg" }),
    apply: (figure) => ({ ...figure, size: "md" }),
    distractors: (figure) => [
      { ...figure, size: "lg" },
      { ...figure, size: "sm" },
      {
        ...figure,
        size: "md",
        shape: randomChoice(SHAPES.filter((shape) => shape !== figure.shape)),
      },
    ],
  },
];

// Cross-cutting safeguard: "noise" dimensions must be sampled without
// replacement across the 3 examples (via shuffle().slice()) rather than
// independently, or all 3 examples could coincidentally share a second
// property by chance and create a puzzle with two valid-looking answers.
const CLASSIFICATION_RULES = [
  {
    id: "sameShapeIdentity",
    describe: "All three figures are the same shape.",
    generate() {
      const target = randomChoice(SHAPES);
      const makeExample = () => randomFigure({ shape: target });
      const examples = [makeExample(), makeExample(), makeExample()];
      const correct = makeExample();
      const distractors = CONFUSABLE_SHAPES[target].map((shape) =>
        randomFigure({ shape }),
      );

      return {
        examples,
        correct,
        distractors,
        predicate: (figure) => figure.shape === target,
      };
    },
  },
  {
    id: "sameColorPairing",
    describe: "All three figures use the same two colors in the same roles.",
    generate() {
      const pair = randomChoice(COLOR_PAIRS);
      const [primaryColor, secondaryColor] =
        Math.random() < 0.5 ? pair : [pair[1], pair[0]];
      const fill = randomChoice(["striped", "hatched"]);
      const shapePool = shuffle(SHAPES);
      const outside = COLORS.filter(
        (color) => color !== primaryColor && color !== secondaryColor,
      );
      const makeExample = (shape) =>
        randomFigure({ shape, primaryColor, secondaryColor, fill });

      const examples = [
        makeExample(shapePool[0]),
        makeExample(shapePool[1]),
        makeExample(shapePool[2]),
      ];
      const correct = makeExample(shapePool[3]);
      const distractors = [
        randomFigure({
          shape: shapePool[4],
          primaryColor: secondaryColor,
          secondaryColor: primaryColor,
          fill,
        }),
        randomFigure({
          shape: shapePool[5],
          primaryColor,
          secondaryColor: randomChoice(outside),
          fill,
        }),
        randomFigure({
          shape: shapePool[6],
          primaryColor: randomChoice(outside),
          secondaryColor,
          fill,
        }),
      ];

      return {
        examples,
        correct,
        distractors,
        predicate: (figure) =>
          figure.primaryColor === primaryColor &&
          figure.secondaryColor === secondaryColor &&
          (figure.fill === "striped" || figure.fill === "hatched"),
      };
    },
  },
  {
    id: "sameElementCount",
    describe: "All three figures show the same number of shapes.",
    generate() {
      const target = randomChoice([2, 3, 4]);
      const makeExample = () => randomFigure({ count: target });
      const examples = [makeExample(), makeExample(), makeExample()];
      const correct = makeExample();
      const otherCounts = [1, 2, 3, 4, 5]
        .filter((count) => count !== target)
        .sort((a, b) => Math.abs(a - target) - Math.abs(b - target))
        .slice(0, 3);
      const distractors = otherCounts.map((count) => randomFigure({ count }));

      return {
        examples,
        correct,
        distractors,
        predicate: (figure) => figure.count === target,
      };
    },
  },
  {
    id: "sameFillMode",
    describe: "All three figures use the same fill pattern.",
    generate() {
      const target = randomChoice(FILL_CYCLE);
      const makeExample = () => randomFigure({ fill: target });
      const examples = [makeExample(), makeExample(), makeExample()];
      const correct = makeExample();
      const distractors = FILL_CYCLE.filter((fill) => fill !== target).map(
        (fill) => randomFigure({ fill }),
      );

      return {
        examples,
        correct,
        distractors,
        predicate: (figure) => figure.fill === target,
      };
    },
  },
  {
    id: "sameRotationValue",
    describe: "All three figures are rotated the same amount.",
    generate() {
      const rotations = [0, 90, 180, 270];
      const target = randomChoice(rotations);
      const makeExample = () =>
        randomFigure({ shape: randomChoice(ROTATE_RULE_SHAPES), rotation: target });
      const examples = [makeExample(), makeExample(), makeExample()];
      const correct = makeExample();
      const distractors = rotations
        .filter((rotation) => rotation !== target)
        .map((rotation) =>
          randomFigure({ shape: randomChoice(ROTATE_RULE_SHAPES), rotation }),
        );

      return {
        examples,
        correct,
        distractors,
        predicate: (figure) => figure.rotation === target,
      };
    },
  },
];

function createMatrixRound(previousRuleId = null) {
  const eligibleRules =
    MATRIX_RULES.length === 1
      ? MATRIX_RULES
      : MATRIX_RULES.filter((rule) => rule.id !== previousRuleId);
  const rule = randomChoice(eligibleRules);
  const ctx = rule.createContext ? rule.createContext() : {};
  const topLeft = rule.createBaseFigure(ctx);
  const topRight = rule.apply(topLeft, ctx);

  let bottomLeft = rule.createBaseFigure(ctx);
  for (
    let attempt = 0;
    attempt < 5 && figureKey(bottomLeft) === figureKey(topLeft);
    attempt += 1
  ) {
    bottomLeft = rule.createBaseFigure(ctx);
  }

  const correctFigure = rule.apply(bottomLeft, ctx);
  const distractors = ensureDistinctFigures(
    correctFigure,
    rule.distractors(bottomLeft, correctFigure, ctx),
  );

  const options = shuffle([
    { id: "opt-correct", figure: correctFigure, correct: true },
    ...distractors.map((figure, index) => ({
      id: `opt-d${index}`,
      figure,
      correct: false,
    })),
  ]);

  return {
    mode: "matrix",
    ruleId: rule.id,
    roundKey: rule.id,
    describe: rule.describe,
    topLeft,
    topRight,
    bottomLeft,
    options,
  };
}

function createClassificationRound(previousRuleId = null) {
  const eligibleRules =
    CLASSIFICATION_RULES.length === 1
      ? CLASSIFICATION_RULES
      : CLASSIFICATION_RULES.filter((rule) => rule.id !== previousRuleId);
  const rule = randomChoice(eligibleRules);
  const { examples, correct, distractors, predicate } = rule.generate();

  const options = shuffle([
    { id: "opt-correct", figure: correct, correct: true },
    ...distractors.map((figure, index) => ({
      id: `opt-d${index}`,
      figure,
      correct: false,
    })),
  ]);

  return {
    mode: "classification",
    ruleId: rule.id,
    roundKey: rule.id,
    describe: rule.describe,
    examples,
    options,
    predicate,
  };
}

function createEmptyGrid() {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));
}

function cloneGrid(grid) {
  return grid.map((row) => row.slice());
}

function reducedRegionBounds(axes) {
  const vertical = axes.includes("vertical");
  const horizontal = axes.includes("horizontal");
  return {
    maxRow: horizontal ? GRID_SIZE / 2 - 1 : GRID_SIZE - 1,
    maxCol: vertical ? GRID_SIZE / 2 - 1 : GRID_SIZE - 1,
  };
}

function randomHoles(axes, count) {
  const { maxRow, maxCol } = reducedRegionBounds(axes);
  const cellPool = [];
  for (let row = 0; row <= maxRow; row += 1) {
    for (let col = 0; col <= maxCol; col += 1) {
      cellPool.push({ row, col });
    }
  }
  return shuffle(cellPool).slice(0, Math.min(count, cellPool.length));
}

// Folding is always described as "toward top-left," so hole coordinates are
// already expressed in the reduced region's own top-left-anchored space.
function unfoldHoles(holes, axes) {
  const grid = createEmptyGrid();
  const vertical = axes.includes("vertical");
  const horizontal = axes.includes("horizontal");

  for (const { row, col } of holes) {
    const rows = horizontal ? [row, GRID_SIZE - 1 - row] : [row];
    const cols = vertical ? [col, GRID_SIZE - 1 - col] : [col];
    for (const r of rows) {
      for (const c of cols) {
        grid[r][c] = true;
      }
    }
  }

  return grid;
}

function rotate180Pattern(holes) {
  const grid = createEmptyGrid();
  for (const { row, col } of holes) {
    grid[row][col] = true;
    grid[GRID_SIZE - 1 - row][GRID_SIZE - 1 - col] = true;
  }
  return grid;
}

function offByOneShiftPattern(holes, axes) {
  const grid = createEmptyGrid();
  const vertical = axes.includes("vertical");
  const horizontal = axes.includes("horizontal");

  for (const { row, col } of holes) {
    const rows = horizontal ? [row, GRID_SIZE - 2 - row] : [row];
    const cols = vertical ? [col, GRID_SIZE - 2 - col] : [col];
    for (const r of rows) {
      for (const c of cols) {
        if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
          grid[r][c] = true;
        }
      }
    }
  }

  return grid;
}

function toggleOneCell(pattern) {
  const grid = cloneGrid(pattern);
  const row = randomInt(0, GRID_SIZE - 1);
  const col = randomInt(0, GRID_SIZE - 1);
  grid[row][col] = !grid[row][col];
  return grid;
}

function patternKey(pattern) {
  return pattern
    .map((row) => row.map((cell) => (cell ? "1" : "0")).join(""))
    .join("|");
}

function ensureDistinctPatterns(patterns, correctPattern) {
  const seenKeys = new Set([patternKey(correctPattern)]);

  return patterns.map((pattern) => {
    let candidate = pattern;
    let attempts = 0;

    while (seenKeys.has(patternKey(candidate)) && attempts < 10) {
      candidate = toggleOneCell(candidate);
      attempts += 1;
    }

    seenKeys.add(patternKey(candidate));
    return candidate;
  });
}

function buildFoldingDistractors(holes, axes, correctPattern) {
  const strategies = [];
  if (axes.length === 2) {
    strategies.push(() => unfoldHoles(holes, [randomChoice(axes)]));
  }
  strategies.push(() => rotate180Pattern(holes));
  strategies.push(() => offByOneShiftPattern(holes, axes));

  const chosen = shuffle(strategies)
    .slice(0, 2)
    .map((strategy) => strategy());
  chosen.push(toggleOneCell(correctPattern));

  return ensureDistinctPatterns(chosen, correctPattern);
}

const AXIS_COMBINATIONS = [["vertical"], ["horizontal"], ["vertical", "horizontal"]];

function describeFolding(axes) {
  if (axes.length === 2) {
    return "The paper was folded both vertically and horizontally, so the unfolded pattern must be mirror-symmetric across both center lines.";
  }
  return `The paper was folded ${axes[0]}ly, so the unfolded pattern must be mirror-symmetric across that center line.`;
}

function createFoldingRound(previousRoundKey = null) {
  let axes;
  let holeCount;
  let roundKey;
  let attempts = 0;

  do {
    axes = randomChoice(AXIS_COMBINATIONS);
    holeCount = randomInt(1, 3);
    roundKey = `${axes.join("+")}:${holeCount}`;
    attempts += 1;
  } while (roundKey === previousRoundKey && attempts < 10);

  const holes = randomHoles(axes, holeCount);
  const correctPattern = unfoldHoles(holes, axes);
  const distractorPatterns = buildFoldingDistractors(holes, axes, correctPattern);

  const options = shuffle([
    { id: "opt-correct", pattern: correctPattern, correct: true },
    ...distractorPatterns.map((pattern, index) => ({
      id: `opt-d${index}`,
      pattern,
      correct: false,
    })),
  ]);

  return {
    mode: "folding",
    roundKey,
    describe: describeFolding(axes),
    gridSize: GRID_SIZE,
    axes,
    holes,
    correctPattern,
    options,
  };
}

export function createRoundForMode(mode, previousRoundKey = null) {
  if (mode === "matrix") return createMatrixRound(previousRoundKey);
  if (mode === "classification") return createClassificationRound(previousRoundKey);
  if (mode === "folding") return createFoldingRound(previousRoundKey);
  throw new Error(`Unknown shape pattern mode: ${mode}`);
}

function assertSingleCorrectOption(options, label) {
  const correctCount = options.filter((option) => option.correct).length;
  if (correctCount !== 1) {
    throw new Error(
      `${label} must have exactly one correct option (found ${correctCount}).`,
    );
  }
}

function assertNoDuplicateOptions(keys, label) {
  if (new Set(keys).size !== keys.length) {
    throw new Error(`${label} produced duplicate-looking options.`);
  }
}

function isMirroredLeftRight(pattern) {
  return pattern.every((row) =>
    row.every((cell, col) => cell === row[GRID_SIZE - 1 - col]),
  );
}

function isMirroredTopBottom(pattern) {
  return pattern.every((row, r) =>
    row.every((cell, c) => cell === pattern[GRID_SIZE - 1 - r][c]),
  );
}

function validateShapePatternGenerators() {
  const ITERATIONS = 150;

  for (let i = 0; i < ITERATIONS; i += 1) {
    const round = createMatrixRound();
    assertSingleCorrectOption(round.options, `matrix rule ${round.ruleId}`);
    assertNoDuplicateOptions(
      round.options.map((option) => figureKey(option.figure)),
      `matrix rule ${round.ruleId}`,
    );
  }

  for (let i = 0; i < ITERATIONS; i += 1) {
    const round = createClassificationRound();
    assertSingleCorrectOption(
      round.options,
      `classification rule ${round.ruleId}`,
    );
    assertNoDuplicateOptions(
      round.options.map((option) => figureKey(option.figure)),
      `classification rule ${round.ruleId}`,
    );
    round.examples.forEach((figure) => {
      if (!round.predicate(figure)) {
        throw new Error(
          `Classification rule ${round.ruleId} produced an example that fails its own predicate.`,
        );
      }
    });
    round.options.forEach((option) => {
      const satisfies = round.predicate(option.figure);
      if (option.correct && !satisfies) {
        throw new Error(
          `Classification rule ${round.ruleId}'s correct option fails its own predicate.`,
        );
      }
      if (!option.correct && satisfies) {
        throw new Error(
          `Classification rule ${round.ruleId} produced a distractor that also satisfies the rule.`,
        );
      }
    });
  }

  for (let i = 0; i < ITERATIONS; i += 1) {
    const round = createFoldingRound();
    assertSingleCorrectOption(round.options, "folding round");
    assertNoDuplicateOptions(
      round.options.map((option) => patternKey(option.pattern)),
      "folding round",
    );

    const vertical = round.axes.includes("vertical");
    const horizontal = round.axes.includes("horizontal");
    if (vertical && !isMirroredLeftRight(round.correctPattern)) {
      throw new Error(
        "Folding round's correct pattern is missing expected left-right symmetry.",
      );
    }
    if (horizontal && !isMirroredTopBottom(round.correctPattern)) {
      throw new Error(
        "Folding round's correct pattern is missing expected top-bottom symmetry.",
      );
    }
  }
}

validateShapePatternGenerators();
