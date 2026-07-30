import { shuffle } from "./numberTheoryPresets.js";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ANGLE_CATEGORIES = [
  { id: "acute", label: "Acute" },
  { id: "right", label: "Right" },
  { id: "obtuse", label: "Obtuse" },
];

const SIDE_CATEGORIES = [
  { id: "equilateral", label: "Equilateral" },
  { id: "isosceles", label: "Isosceles" },
  { id: "scalene", label: "Scalene" },
];

const PYTHAGOREAN_TRIPLES = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
  [10, 24, 26],
  [12, 16, 20],
  [9, 40, 41],
];

function generateRightAngles() {
  const other = randomInt(20, 70);
  return [90, other, 90 - other];
}

function generateAcuteAngles() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const angleA = randomInt(40, 80);
    const angleB = randomInt(40, 80);
    const angleC = 180 - angleA - angleB;

    if (angleC >= 30 && angleC < 90) {
      return [angleA, angleB, angleC];
    }
  }

  return [60, 60, 60];
}

function generateObtuseAngles() {
  const big = randomInt(100, 150);
  const remaining = 180 - big;
  const small1 = randomInt(10, remaining - 10);
  const small2 = remaining - small1;
  return [big, small1, small2];
}

function generateAngleTriple(categoryId) {
  if (categoryId === "right") return generateRightAngles();
  if (categoryId === "obtuse") return generateObtuseAngles();
  return generateAcuteAngles();
}

function createAngleTypeRound(previousRoundKey) {
  const eligible = ANGLE_CATEGORIES.filter(
    (category) => category.id !== previousRoundKey,
  );
  const category = eligible[randomInt(0, eligible.length - 1)];
  const angles = generateAngleTriple(category.id);

  return {
    mode: "identify",
    subtype: "angle-type",
    roundKey: category.id,
    prompt: "Is this triangle acute, right, or obtuse?",
    figure: { angles },
    options: shuffle(ANGLE_CATEGORIES).map((option) => ({
      id: option.id,
      label: option.label,
      correct: option.id === category.id,
    })),
    describe: `The angles measure ${angles[0]}°, ${angles[1]}°, and ${angles[2]}°, which makes this ${
      category.id === "acute" ? "an acute" : category.id === "right" ? "a right" : "an obtuse"
    } triangle.`,
  };
}

function generateSideTriple(categoryId) {
  if (categoryId === "equilateral") {
    const side = randomInt(4, 10);
    return [side, side, side];
  }

  if (categoryId === "isosceles") {
    for (let attempt = 0; attempt < 100; attempt += 1) {
      const equalSide = randomInt(4, 12);
      const base = randomInt(3, 12);

      if (base !== equalSide && base < 2 * equalSide) {
        return [equalSide, equalSide, base];
      }
    }

    return [6, 6, 5];
  }

  for (let attempt = 0; attempt < 100; attempt += 1) {
    const sideA = randomInt(4, 12);
    const sideB = randomInt(4, 12);
    const sideC = randomInt(4, 12);
    const distinct = sideA !== sideB && sideB !== sideC && sideA !== sideC;
    const validTriangle =
      sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA;

    if (distinct && validTriangle) {
      return [sideA, sideB, sideC];
    }
  }

  return [5, 6, 7];
}

function createSideTypeRound(previousRoundKey) {
  const eligible = SIDE_CATEGORIES.filter(
    (category) => category.id !== previousRoundKey,
  );
  const category = eligible[randomInt(0, eligible.length - 1)];
  const sides = generateSideTriple(category.id);

  return {
    mode: "identify",
    subtype: "side-type",
    roundKey: category.id,
    prompt: "Is this triangle equilateral, isosceles, or scalene?",
    figure: { sides },
    options: shuffle(SIDE_CATEGORIES).map((option) => ({
      id: option.id,
      label: option.label,
      correct: option.id === category.id,
    })),
    describe: `The sides measure ${sides[0]}, ${sides[1]}, and ${sides[2]}, which makes this ${
      category.id === "equilateral"
        ? "an equilateral"
        : category.id === "isosceles"
          ? "an isosceles"
          : "a scalene"
    } triangle.`,
  };
}

function angleDistractorReason(value, angleA, angleB) {
  if (value === angleA + angleB) {
    return "That's the sum of the two given angles — you still need to subtract that sum from 180° to find the missing angle.";
  }

  if (value === 180 - angleA || value === 180 - angleB) {
    return "That only subtracts one of the two given angles from 180° — subtract both given angles from 180°.";
  }

  return null;
}

function createMissingAngleRound(previousRoundKey) {
  let angleA;
  let angleB;
  let roundKey;

  do {
    angleA = randomInt(10, 150);
    angleB = randomInt(10, 179 - angleA);
    roundKey = `${angleA}-${angleB}`;
  } while (roundKey === previousRoundKey);

  const correctAngle = 180 - angleA - angleB;

  const distractorCandidates = [
    angleA + angleB,
    180 - angleA,
    180 - angleB,
    correctAngle + 10,
    correctAngle - 10,
    correctAngle + 20,
  ].filter((value) => value > 0 && value < 180 && value !== correctAngle);

  const distractors = [...new Set(distractorCandidates)].slice(0, 3);

  while (distractors.length < 3) {
    const filler = randomInt(1, 179);
    if (filler !== correctAngle && !distractors.includes(filler)) {
      distractors.push(filler);
    }
  }

  const options = shuffle([
    { id: "correct", label: `${correctAngle}°`, correct: true },
    ...distractors.map((value, index) => ({
      id: `distractor-${index}`,
      label: `${value}°`,
      correct: false,
      reason: angleDistractorReason(value, angleA, angleB),
    })),
  ]);

  return {
    mode: "calculate",
    subtype: "missing-angle",
    roundKey,
    prompt: "What is the measure of the missing angle?",
    figure: {
      angles: [angleA, angleB, correctAngle],
      vertexLabels: [`${angleA}°`, `${angleB}°`, "?"],
    },
    options,
    describe: `A triangle's three angles always sum to 180°, so the missing angle is 180° − ${angleA}° − ${angleB}° = ${correctAngle}°.`,
  };
}

function pythagoreanDistractorReason(value, linearMistake) {
  if (value === linearMistake) {
    return "That combines the side lengths directly — the Pythagorean theorem requires squaring the legs, adding (or subtracting) the squares, and then taking the square root.";
  }

  return null;
}

function pythagoreanDistractors(missing, legA, legB, hypotenuse, correctAnswer) {
  const linearMistake =
    missing === "hypotenuse" ? legA + legB : hypotenuse - (missing === "legA" ? legB : legA);

  const candidates = [
    linearMistake,
    correctAnswer + 1,
    correctAnswer - 1,
    correctAnswer + 2,
    correctAnswer - 2,
  ].filter((value) => value > 0 && value !== correctAnswer);

  const unique = [...new Set(candidates)].slice(0, 3);

  while (unique.length < 3) {
    const filler = correctAnswer + randomInt(-5, 5);
    if (filler > 0 && filler !== correctAnswer && !unique.includes(filler)) {
      unique.push(filler);
    }
  }

  return unique;
}

function createPythagoreanRound(previousRoundKey) {
  let triple;
  let missing;
  let roundKey;

  do {
    triple = PYTHAGOREAN_TRIPLES[randomInt(0, PYTHAGOREAN_TRIPLES.length - 1)];
    missing = ["hypotenuse", "legA", "legB"][randomInt(0, 2)];
    roundKey = `${triple.join("-")}-${missing}`;
  } while (roundKey === previousRoundKey);

  const [legA, legB, hypotenuse] = triple;

  const correctAnswer =
    missing === "hypotenuse" ? hypotenuse : missing === "legA" ? legA : legB;

  const distractors = pythagoreanDistractors(
    missing,
    legA,
    legB,
    hypotenuse,
    correctAnswer,
  );

  const linearMistake =
    missing === "hypotenuse" ? legA + legB : hypotenuse - (missing === "legA" ? legB : legA);

  const options = shuffle([
    { id: "correct", label: `${correctAnswer}`, correct: true },
    ...distractors.map((value, index) => ({
      id: `distractor-${index}`,
      label: `${value}`,
      correct: false,
      reason: pythagoreanDistractorReason(value, linearMistake),
    })),
  ]);

  return {
    mode: "calculate",
    subtype: "pythagorean",
    roundKey,
    prompt: "What is the length of the missing side?",
    figure: {
      sides: [legA, hypotenuse, legB],
      rightAngleAt: 0,
      sideLabels: [
        missing === "legA" ? "?" : `${legA}`,
        missing === "hypotenuse" ? "?" : `${hypotenuse}`,
        missing === "legB" ? "?" : `${legB}`,
      ],
    },
    options,
    describe:
      missing === "hypotenuse"
        ? `Using the Pythagorean theorem: ${legA}² + ${legB}² = ${legA * legA} + ${legB * legB} = ${
            legA * legA + legB * legB
          }, and the square root of that is ${correctAnswer}.`
        : `Using the Pythagorean theorem: ${correctAnswer}² = ${hypotenuse}² − ${
            missing === "legA" ? legB : legA
          }² = ${hypotenuse * hypotenuse} − ${
            missing === "legA" ? legB * legB : legA * legA
          } = ${correctAnswer * correctAnswer}, so the missing leg is ${correctAnswer}.`,
  };
}

function generateInvalidSideTriple() {
  const sideA = randomInt(3, 12);
  const sideB = randomInt(3, 12);
  const violation = randomInt(0, 4);
  const sideC = sideA + sideB + violation;
  return [sideA, sideB, sideC];
}

function createTriangleInequalityRound(previousRoundKey) {
  let invalidTriple;
  let validA;
  let validB;
  let roundKey;

  do {
    invalidTriple = generateInvalidSideTriple();
    validA = generateSideTriple(["equilateral", "isosceles", "scalene"][randomInt(0, 2)]);
    validB = generateSideTriple(["equilateral", "isosceles", "scalene"][randomInt(0, 2)]);
    roundKey = `ineq-${invalidTriple.join(",")}`;
  } while (roundKey === previousRoundKey);

  const options = shuffle([
    { id: "invalid", label: invalidTriple.join(", "), correct: true },
    {
      id: "valid-a",
      label: validA.join(", "),
      correct: false,
      reason: `${validA.join(", ")} satisfies the triangle inequality (every pair of sides sums to more than the third), so it CAN form a triangle.`,
    },
    {
      id: "valid-b",
      label: validB.join(", "),
      correct: false,
      reason: `${validB.join(", ")} satisfies the triangle inequality, so it CAN form a triangle.`,
    },
  ]);

  return {
    mode: "identify",
    subtype: "triangle-inequality",
    roundKey,
    prompt: "Which set of side lengths CANNOT form a triangle?",
    figure: null,
    options,
    describe: `A triangle can only be formed when the sum of any two sides is greater than the third. For ${invalidTriple.join(
      ", ",
    )}: ${invalidTriple[0]} + ${invalidTriple[1]} = ${
      invalidTriple[0] + invalidTriple[1]
    }, which is not greater than ${invalidTriple[2]}, so these lengths cannot form a triangle.`,
  };
}

const EDGE_OPPOSITE_LETTER = ["c", "a", "b"];

function createSideAngleRound(previousRoundKey) {
  let angleA;
  let angleB;
  let angleC;
  let roundKey;

  do {
    angleA = randomInt(30, 110);
    angleB = randomInt(30, 179 - angleA);
    angleC = 180 - angleA - angleB;
    roundKey = `sar-${angleA}-${angleB}-${angleC}`;
  } while (
    angleC < 20 ||
    angleC > 130 ||
    new Set([angleA, angleB, angleC]).size < 3 ||
    roundKey === previousRoundKey
  );

  const angles = [angleA, angleB, angleC];
  const maxVertex = angles.indexOf(Math.max(...angles));
  const correctEdge = (maxVertex + 1) % 3;
  const correctLetter = EDGE_OPPOSITE_LETTER[correctEdge];
  const otherLetters = EDGE_OPPOSITE_LETTER.filter((letter) => letter !== correctLetter);

  const options = shuffle([
    { id: "correct", label: `Side ${correctLetter}`, correct: true },
    {
      id: "wrong-1",
      label: `Side ${otherLetters[0]}`,
      correct: false,
      reason: `Side ${otherLetters[0]} is not opposite the largest angle, so it isn't the longest side.`,
    },
    {
      id: "wrong-2",
      label: `Side ${otherLetters[1]}`,
      correct: false,
      reason: `Side ${otherLetters[1]} is not opposite the largest angle, so it isn't the longest side.`,
    },
  ]);

  return {
    mode: "identify",
    subtype: "side-angle",
    roundKey,
    prompt:
      "Each side is labeled with the lowercase letter of the angle it's opposite (side a is opposite angle A, and so on). Which side is the longest?",
    figure: {
      angles,
      vertexLabels: [`A (${angleA}°)`, `B (${angleB}°)`, `C (${angleC}°)`],
      sideLabels: EDGE_OPPOSITE_LETTER,
    },
    options,
    describe: `The longest side is always opposite the largest angle. The largest angle here is ${Math.max(
      ...angles,
    )}°, and side ${correctLetter} is opposite it, so side ${correctLetter} is the longest.`,
  };
}

function createExteriorAngleRound(previousRoundKey) {
  let angleA;
  let angleB;
  let angleC;
  let roundKey;

  do {
    angleA = randomInt(20, 120);
    angleB = randomInt(20, 179 - angleA);
    angleC = 180 - angleA - angleB;
    roundKey = `ext-${angleA}-${angleB}`;
  } while (angleC < 20 || roundKey === previousRoundKey);

  const correctAnswer = angleA + angleB;

  const distractorCandidates = [
    angleC,
    180 - angleA,
    correctAnswer + 10,
    correctAnswer - 10,
  ].filter((value) => value > 0 && value < 180 && value !== correctAnswer);

  const distractors = [...new Set(distractorCandidates)].slice(0, 3);

  while (distractors.length < 3) {
    const filler = correctAnswer + randomInt(-8, 8);
    if (filler > 0 && filler !== correctAnswer && !distractors.includes(filler)) {
      distractors.push(filler);
    }
  }

  function exteriorDistractorReason(value) {
    if (value === angleC) {
      return "That's the interior angle at that vertex, not the exterior angle — the exterior angle is 180° minus the interior angle there.";
    }

    if (value === 180 - angleA) {
      return "That only accounts for one of the two remote interior angles — the exterior angle equals the sum of BOTH remote angles.";
    }

    return null;
  }

  return {
    mode: "calculate",
    subtype: "exterior-angle",
    roundKey,
    prompt:
      "The exterior angle at the marked vertex equals the sum of the two remote (non-adjacent) interior angles. What is the exterior angle?",
    figure: {
      angles: [angleA, angleB, angleC],
      vertexLabels: [`${angleA}°`, `${angleB}°`, "?"],
      exteriorAngleAt: 2,
      exteriorAngleLabel: "?",
    },
    options: shuffle([
      { id: "correct", label: `${correctAnswer}°`, correct: true },
      ...distractors.map((value, index) => ({
        id: `distractor-${index}`,
        label: `${value}°`,
        correct: false,
        reason: exteriorDistractorReason(value),
      })),
    ]),
    describe: `An exterior angle equals the sum of the two remote interior angles: ${angleA}° + ${angleB}° = ${correctAnswer}°.`,
  };
}

function createAreaRound(previousRoundKey) {
  let base;
  let height;
  let footOffset;
  let askFor;
  let roundKey;

  do {
    base = randomInt(6, 14);
    height = randomInt(4, 12);
    footOffset = randomInt(Math.ceil(base * 0.3), Math.floor(base * 0.7));
    askFor = Math.random() < 0.5 ? "area" : "height";
    roundKey = `area-${base}-${height}-${footOffset}-${askFor}`;
  } while ((base * height) % 2 !== 0 || roundKey === previousRoundKey);

  const sideAB = base;
  const sideCA = Math.sqrt(footOffset ** 2 + height ** 2);
  const sideBC = Math.sqrt((base - footOffset) ** 2 + height ** 2);
  const correctArea = (base * height) / 2;

  const figureBase = {
    sides: [sideAB, sideBC, sideCA],
    sideLabels: [`${base}`, null, null],
    altitudeFromVertex: 2,
  };

  if (askFor === "area") {
    const distractorCandidates = [
      base * height,
      Math.round(0.5 * (base + height)),
      correctArea + Math.max(2, Math.round(correctArea * 0.15)),
      correctArea - Math.max(2, Math.round(correctArea * 0.15)),
    ].filter((value) => value > 0 && value !== correctArea);

    const distractors = [...new Set(distractorCandidates)].slice(0, 3);

    while (distractors.length < 3) {
      const filler = correctArea + randomInt(-8, 8);
      if (filler > 0 && filler !== correctArea && !distractors.includes(filler)) {
        distractors.push(filler);
      }
    }

    function areaDistractorReason(value) {
      if (value === base * height) {
        return "That's base × height with no ½ — that's the area of a rectangle, not a triangle.";
      }

      if (value === Math.round(0.5 * (base + height))) {
        return "That averages the base and height instead of multiplying them.";
      }

      return null;
    }

    return {
      mode: "calculate",
      subtype: "area",
      roundKey,
      prompt: "What is the area of this triangle?",
      figure: { ...figureBase, altitudeLabel: `h = ${height}` },
      options: shuffle([
        { id: "correct", label: `${correctArea} sq. units`, correct: true },
        ...distractors.map((value, index) => ({
          id: `distractor-${index}`,
          label: `${value} sq. units`,
          correct: false,
          reason: areaDistractorReason(value),
        })),
      ]),
      describe: `Area = ½ × base × height = ½ × ${base} × ${height} = ${correctArea} square units.`,
    };
  }

  const distractorCandidates = [
    Math.round(correctArea / base),
    height + 2,
    Math.max(1, height - 2),
  ].filter((value) => value > 0 && value !== height);

  const distractors = [...new Set(distractorCandidates)].slice(0, 3);

  while (distractors.length < 3) {
    const filler = height + randomInt(-4, 4);
    if (filler > 0 && filler !== height && !distractors.includes(filler)) {
      distractors.push(filler);
    }
  }

  function heightDistractorReason(value) {
    if (value === Math.round(correctArea / base)) {
      return "That's area ÷ base — remember area = ½ × base × height, so height = (2 × area) ÷ base.";
    }

    return null;
  }

  return {
    mode: "calculate",
    subtype: "area",
    roundKey,
    prompt: `This triangle has an area of ${correctArea} square units and a base of ${base} units. What is its height?`,
    figure: { ...figureBase, altitudeLabel: "?" },
    options: shuffle([
      { id: "correct", label: `${height}`, correct: true },
      ...distractors.map((value, index) => ({
        id: `distractor-${index}`,
        label: `${value}`,
        correct: false,
        reason: heightDistractorReason(value),
      })),
    ]),
    describe: `Since area = ½ × base × height, height = (2 × area) ÷ base = (2 × ${correctArea}) ÷ ${base} = ${height}.`,
  };
}

export function createRoundForMode(mode, previousRoundKey = null) {
  const roll = Math.random();

  if (mode === "identify") {
    if (roll < 0.25) return createAngleTypeRound(previousRoundKey);
    if (roll < 0.5) return createSideTypeRound(previousRoundKey);
    if (roll < 0.75) return createTriangleInequalityRound(previousRoundKey);
    return createSideAngleRound(previousRoundKey);
  }

  if (roll < 0.25) return createMissingAngleRound(previousRoundKey);
  if (roll < 0.5) return createPythagoreanRound(previousRoundKey);
  if (roll < 0.75) return createExteriorAngleRound(previousRoundKey);
  return createAreaRound(previousRoundKey);
}

function classifyAngleTriple(angles) {
  const rightCount = angles.filter((angle) => angle === 90).length;
  const obtuseCount = angles.filter((angle) => angle > 90).length;

  if (rightCount === 1) return "right";
  if (obtuseCount === 1) return "obtuse";
  if (angles.every((angle) => angle < 90)) return "acute";
  return "invalid";
}

function classifySideTriple(sides) {
  const uniqueCount = new Set(sides).size;
  if (uniqueCount === 1) return "equilateral";
  if (uniqueCount === 2) return "isosceles";
  return "scalene";
}

function validateTrianglePresets() {
  ANGLE_CATEGORIES.forEach((category) => {
    for (let attempt = 0; attempt < 200; attempt += 1) {
      const angles = generateAngleTriple(category.id);

      if (angles[0] + angles[1] + angles[2] !== 180) {
        throw new Error(
          `Angle triple for "${category.id}" does not sum to 180.`,
        );
      }

      if (classifyAngleTriple(angles) !== category.id) {
        throw new Error(
          `Angle triple ${angles} does not match category "${category.id}".`,
        );
      }
    }
  });

  SIDE_CATEGORIES.forEach((category) => {
    for (let attempt = 0; attempt < 200; attempt += 1) {
      const sides = generateSideTriple(category.id);
      const [sideA, sideB, sideC] = sides;

      if (
        sideA + sideB <= sideC ||
        sideA + sideC <= sideB ||
        sideB + sideC <= sideA
      ) {
        throw new Error(
          `Side triple ${sides} for "${category.id}" fails the triangle inequality.`,
        );
      }

      if (classifySideTriple(sides) !== category.id) {
        throw new Error(
          `Side triple ${sides} does not match category "${category.id}".`,
        );
      }
    }
  });

  PYTHAGOREAN_TRIPLES.forEach(([legA, legB, hypotenuse]) => {
    if (legA * legA + legB * legB !== hypotenuse * hypotenuse) {
      throw new Error(
        `[${legA}, ${legB}, ${hypotenuse}] is not a valid Pythagorean triple.`,
      );
    }
  });

  for (let attempt = 0; attempt < 200; attempt += 1) {
    const invalid = generateInvalidSideTriple();
    const [sideA, sideB, sideC] = invalid;

    if (sideA + sideB > sideC) {
      throw new Error(`generateInvalidSideTriple produced a valid triangle: ${invalid}.`);
    }
  }

  function placeFromAnglesForValidation(angles) {
    const [angleA, angleB, angleC] = angles.map((degrees) => (degrees * Math.PI) / 180);
    const sideAB = 100;
    const scale = sideAB / Math.sin(angleC);
    const sideAC = scale * Math.sin(angleB);

    return [
      { x: 0, y: 0 },
      { x: sideAB, y: 0 },
      { x: sideAC * Math.cos(angleA), y: sideAC * Math.sin(angleA) },
    ];
  }

  function distanceBetween(pointA, pointB) {
    return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);
  }

  for (let attempt = 0; attempt < 200; attempt += 1) {
    const angleA = randomInt(30, 110);
    const angleB = randomInt(30, 179 - angleA);
    const angleC = 180 - angleA - angleB;

    if (angleC < 20 || angleC > 130 || new Set([angleA, angleB, angleC]).size < 3) continue;

    const points = placeFromAnglesForValidation([angleA, angleB, angleC]);
    const edgeLengths = [
      distanceBetween(points[0], points[1]),
      distanceBetween(points[1], points[2]),
      distanceBetween(points[2], points[0]),
    ];
    const maxVertex = [angleA, angleB, angleC].indexOf(Math.max(angleA, angleB, angleC));
    const expectedEdge = (maxVertex + 1) % 3;
    const longestEdge = edgeLengths.indexOf(Math.max(...edgeLengths));

    if (longestEdge !== expectedEdge) {
      throw new Error(
        `Side-angle mapping mismatch: expected edge ${expectedEdge} to be longest, geometry says ${longestEdge}.`,
      );
    }
  }

  for (let attempt = 0; attempt < 200; attempt += 1) {
    const angleA = randomInt(20, 120);
    const angleB = randomInt(20, 179 - angleA);
    const angleC = 180 - angleA - angleB;

    if (angleC < 20) continue;

    if (angleA + angleB !== 180 - angleC) {
      throw new Error("Exterior angle identity failed.");
    }
  }

  for (let attempt = 0; attempt < 200; attempt += 1) {
    const base = randomInt(6, 14);
    const footOffset = randomInt(Math.ceil(base * 0.3), Math.floor(base * 0.7));

    if (!(footOffset > 0 && footOffset < base)) {
      throw new Error("Area generator's altitude foot would fall outside the base.");
    }
  }
}

validateTrianglePresets();
