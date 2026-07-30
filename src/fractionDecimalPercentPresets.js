import { shuffle } from "./numberTheoryPresets.js";

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y) {
    [x, y] = [y, x % y];
  }

  return x || 1;
}

function reduceFraction(numerator, denominator) {
  const divisor = gcd(numerator, denominator);
  return { num: numerator / divisor, den: denominator / divisor };
}

function toFraction(token) {
  if (token.endsWith("%")) {
    return reduceFraction(Number(token.slice(0, -1)), 100);
  }

  if (token.includes("/")) {
    const [numerator, denominator] = token.split("/").map(Number);
    return reduceFraction(numerator, denominator);
  }

  const [, decimalPart = ""] = token.split(".");
  return reduceFraction(
    Number(token.replace(".", "")),
    10 ** decimalPart.length,
  );
}

const EQUIVALENT_TO_HALF = [
  "1/2", "2/4", "3/6", "4/8", "5/10", "6/12", "7/14", "8/16", "9/18", "10/20",
  "11/22", "12/24", "13/26", "14/28", "15/30", "16/32", "17/34", "18/36",
  "19/38", "20/40", "0.5", "0.50", "0.500", "50%",
];

const EQUIVALENT_TO_QUARTER = [
  "1/4", "2/8", "3/12", "4/16", "5/20", "6/24", "7/28", "8/32", "9/36",
  "10/40", "11/44", "12/48", "13/52", "14/56", "15/60", "16/64", "17/68",
  "18/72", "19/76", "20/80", "0.25", "0.250", "25%",
];

const PROPER_FRACTIONS_UNDER_ONE = [
  "1/3", "2/3", "1/5", "2/5", "3/5", "4/5", "1/6", "5/6", "1/8", "3/8",
  "5/8", "7/8", "1/10", "3/10", "7/10", "9/10", "1/12", "5/12", "7/12",
  "11/12", "0.2", "0.3", "0.7", "0.75", "10%", "90%",
];

const GREATER_THAN_HALF = [
  "3/4", "5/6", "7/8", "9/10", "7/12", "11/12", "5/8", "3/5", "4/5", "2/3",
  "7/10", "11/20", "13/20", "17/20", "19/20", "51%", "60%", "70%", "75%",
  "80%", "90%", "99%", "0.6", "0.7", "0.75", "0.8", "0.9",
];

const LESS_THAN_HALF = [
  "1/4", "1/3", "1/6", "1/8", "3/8", "1/10", "3/10", "1/12", "5/12", "1/20",
  "3/20", "7/20", "9/20", "2/5", "1/5", "1%", "10%", "20%", "25%", "30%",
  "40%", "49%", "0.1", "0.2", "0.25", "0.3", "0.4", "0.49", "0.125",
];

const TERMINATING_DECIMALS = [
  "1/2", "1/4", "3/4", "1/5", "2/5", "3/5", "4/5", "1/8", "3/8", "5/8",
  "7/8", "1/10", "3/10", "7/10", "9/10", "1/20", "3/20", "1/25", "1/50",
  "1/100", "0.1", "0.2", "0.4", "0.6", "0.8", "0.75", "0.125", "0.375",
];

const REPEATING_DECIMALS = [
  "1/3", "2/3", "1/6", "5/6", "1/9", "2/9", "4/9", "5/9", "7/9", "8/9",
  "1/12", "5/12", "7/12", "11/12", "1/18", "5/18", "7/18", "11/18", "13/18",
  "17/18", "1/24", "5/24", "7/24", "11/24", "13/24", "17/24", "19/24",
  "23/24",
];

const WHOLE_NUMBERS = [
  "1", "2", "3", "4", "5", "6", "2/1", "3/1", "4/1", "5/1", "6/2", "8/2",
  "9/3", "12/4", "10/5", "1.0", "2.0", "3.0", "4.0", "100%", "200%", "300%",
  "400%", "500%",
];

const EQUAL_TO_ONE = [
  "1", "1.0", "1.00", "100%", "2/2", "3/3", "4/4", "5/5", "6/6", "7/7",
  "8/8", "9/9", "10/10", "12/12", "20/20", "25/25",
];

const GREATER_THAN_ONE = [
  "3/2", "4/3", "5/3", "5/4", "7/4", "9/4", "7/5", "8/5", "9/5", "11/5",
  "5/2", "7/2", "9/2", "11/2", "13/2", "7/6", "11/6", "13/6", "17/6",
  "1.5", "1.25", "1.75", "2.5", "1.1", "1.2", "150%", "125%", "175%",
  "200%", "110%",
];

const GREATER_THAN_QUARTER = [
  "3/8", "1/3", "2/5", "3/5", "3/4", "4/5", "5/8", "7/10", "9/10", "5/6",
  "7/8", "2/7", "30%", "60%", "0.3", "0.6",
];

const LESS_THAN_QUARTER = [
  "1/5", "1/6", "1/8", "1/10", "1/12", "1/20", "3/20", "1/16", "3/16",
  "1/50", "5%", "15%", "20%", "0.05", "0.1", "0.2",
];

const GREATER_THAN_THREE_QUARTERS = [
  "4/5", "5/6", "7/8", "9/10", "11/12", "13/16", "19/20", "0.8", "0.9",
  "80%", "90%", "85%",
];

const LESS_THAN_THREE_QUARTERS = [
  "1/2", "2/3", "3/5", "7/10", "11/16", "1/4", "1/3", "5/8", "70%", "60%",
  "0.7", "0.6",
];

const EQUAL_TO_THREE_QUARTERS = [
  "3/4", "6/8", "9/12", "12/16", "15/20", "18/24", "21/28", "24/32",
  "27/36", "30/40", "0.75", "0.750", "75%",
];

const GREATER_THAN_ONE_THIRD = [
  "2/5", "3/7", "1/2", "3/8", "5/12", "7/18", "40%", "50%", "0.4", "0.5",
  "0.375", "3/5",
];

const LESS_THAN_ONE_THIRD = [
  "1/4", "1/5", "2/7", "1/6", "3/10", "1/8", "5/16", "25%", "30%", "0.25",
  "0.3", "0.2",
];

const EQUAL_TO_ONE_THIRD = [
  "1/3", "2/6", "3/9", "4/12", "5/15", "6/18", "7/21", "8/24", "9/27",
  "10/30", "11/33", "12/36",
];

export const FRACTION_DECIMAL_PERCENT_PRESETS = [
  {
    id: "equivalent-to-half-or-quarter",
    title: "Equivalent to 1/2 or 1/4",
    rangeLabel: "Fractions, decimals, and percents",
    categories: [
      {
        id: "a",
        title: "Equivalent to 1/2",
        subtitle: "Reduces exactly to one half",
        tokens: EQUIVALENT_TO_HALF,
      },
      {
        id: "b",
        title: "Equivalent to 1/4",
        subtitle: "Reduces exactly to one quarter",
        tokens: EQUIVALENT_TO_QUARTER,
      },
      {
        id: "c",
        title: "Neither",
        subtitle: "Not equal to 1/2 or 1/4",
        tokens: PROPER_FRACTIONS_UNDER_ONE,
      },
    ],
    classify(token) {
      const value = toFraction(token);
      if (value.num === 1 && value.den === 2) return "a";
      if (value.num === 1 && value.den === 4) return "b";
      return "c";
    },
  },

  {
    id: "compared-to-half",
    title: "Compared to One Half",
    rangeLabel: "Fractions, decimals, and percents",
    singletonCategoryId: "c",
    categories: [
      {
        id: "a",
        title: "Greater Than 1/2",
        subtitle: "Value is more than one half",
        tokens: GREATER_THAN_HALF,
      },
      {
        id: "b",
        title: "Less Than 1/2",
        subtitle: "Value is less than one half",
        tokens: LESS_THAN_HALF,
      },
      {
        id: "c",
        title: "Exactly 1/2",
        subtitle: "Reduces exactly to one half",
        tokens: EQUIVALENT_TO_HALF,
      },
    ],
    classify(token) {
      const value = toFraction(token);
      const cross = value.num * 2;
      if (cross === value.den) return "c";
      return cross > value.den ? "a" : "b";
    },
  },

  {
    id: "terminating-repeating-whole",
    title: "Terminating, Repeating, or Whole",
    rangeLabel: "Fractions, decimals, and percents",
    categories: [
      {
        id: "a",
        title: "Terminating Decimal",
        subtitle: "The decimal form ends",
        tokens: TERMINATING_DECIMALS,
      },
      {
        id: "b",
        title: "Repeating Decimal",
        subtitle: "The decimal form repeats forever",
        tokens: REPEATING_DECIMALS,
      },
      {
        id: "c",
        title: "Whole Number",
        subtitle: "Equal to a whole number",
        tokens: WHOLE_NUMBERS,
      },
    ],
    classify(token) {
      const { num, den } = toFraction(token);
      if (num % den === 0) return "c";

      let remainingDen = den;
      while (remainingDen % 2 === 0) remainingDen /= 2;
      while (remainingDen % 5 === 0) remainingDen /= 5;

      return remainingDen === 1 ? "a" : "b";
    },
  },

  {
    id: "compared-to-one",
    title: "Compared to One",
    rangeLabel: "Fractions, decimals, and percents",
    singletonCategoryId: "b",
    categories: [
      {
        id: "a",
        title: "Less Than 1",
        subtitle: "Value is less than one",
        tokens: PROPER_FRACTIONS_UNDER_ONE,
      },
      {
        id: "b",
        title: "Equal to 1",
        subtitle: "Value equals exactly one",
        tokens: EQUAL_TO_ONE,
      },
      {
        id: "c",
        title: "Greater Than 1",
        subtitle: "Value is more than one",
        tokens: GREATER_THAN_ONE,
      },
    ],
    classify(token) {
      const { num, den } = toFraction(token);
      if (num === den) return "b";
      return num < den ? "a" : "c";
    },
  },

  {
    id: "compared-to-quarter",
    title: "Compared to One Quarter",
    rangeLabel: "Fractions, decimals, and percents",
    singletonCategoryId: "c",
    categories: [
      {
        id: "a",
        title: "Greater Than 1/4",
        subtitle: "Value is more than one quarter",
        tokens: GREATER_THAN_QUARTER,
      },
      {
        id: "b",
        title: "Less Than 1/4",
        subtitle: "Value is less than one quarter",
        tokens: LESS_THAN_QUARTER,
      },
      {
        id: "c",
        title: "Exactly 1/4",
        subtitle: "Reduces exactly to one quarter",
        tokens: EQUIVALENT_TO_QUARTER,
      },
    ],
    classify(token) {
      const value = toFraction(token);
      const cross = value.num * 4;
      if (cross === value.den) return "c";
      return cross > value.den ? "a" : "b";
    },
  },

  {
    id: "compared-to-three-quarters",
    title: "Compared to Three Quarters",
    rangeLabel: "Fractions, decimals, and percents",
    singletonCategoryId: "c",
    categories: [
      {
        id: "a",
        title: "Greater Than 3/4",
        subtitle: "Value is more than three quarters",
        tokens: GREATER_THAN_THREE_QUARTERS,
      },
      {
        id: "b",
        title: "Less Than 3/4",
        subtitle: "Value is less than three quarters",
        tokens: LESS_THAN_THREE_QUARTERS,
      },
      {
        id: "c",
        title: "Exactly 3/4",
        subtitle: "Reduces exactly to three quarters",
        tokens: EQUAL_TO_THREE_QUARTERS,
      },
    ],
    classify(token) {
      const value = toFraction(token);
      const cross = value.num * 4;
      const target = value.den * 3;
      if (cross === target) return "c";
      return cross > target ? "a" : "b";
    },
  },

  {
    id: "compared-to-one-third",
    title: "Compared to One Third",
    rangeLabel: "Fractions, decimals, and percents",
    singletonCategoryId: "c",
    categories: [
      {
        id: "a",
        title: "Greater Than 1/3",
        subtitle: "Value is more than one third",
        tokens: GREATER_THAN_ONE_THIRD,
      },
      {
        id: "b",
        title: "Less Than 1/3",
        subtitle: "Value is less than one third",
        tokens: LESS_THAN_ONE_THIRD,
      },
      {
        id: "c",
        title: "Exactly 1/3",
        subtitle: "Reduces exactly to one third",
        tokens: EQUAL_TO_ONE_THIRD,
      },
    ],
    classify(token) {
      const value = toFraction(token);
      const cross = value.num * 3;
      if (cross === value.den) return "c";
      return cross > value.den ? "a" : "b";
    },
  },
];

function chooseUniqueTokens(tokens, amount) {
  if (tokens.length < amount) {
    throw new Error(
      `A preset category has only ${tokens.length} tokens, but ${amount} were requested.`,
    );
  }

  return shuffle(tokens).slice(0, amount);
}

function getDistribution(preset) {
  const counts = {};

  if (preset.singletonCategoryId) {
    const otherCategories = preset.categories.filter(
      (category) => category.id !== preset.singletonCategoryId,
    );

    const largerFirst = Math.random() < 0.5;

    counts[preset.singletonCategoryId] = 1;
    counts[otherCategories[0].id] = largerFirst ? 5 : 4;
    counts[otherCategories[1].id] = largerFirst ? 4 : 5;

    return counts;
  }

  const balancedCounts = shuffle([4, 3, 3]);

  preset.categories.forEach((category, index) => {
    counts[category.id] = balancedCounts[index];
  });

  return counts;
}

export function createFractionDecimalPercentRound(previousPresetId = null) {
  const eligiblePresets =
    FRACTION_DECIMAL_PERCENT_PRESETS.length > 1
      ? FRACTION_DECIMAL_PERCENT_PRESETS.filter(
          (preset) => preset.id !== previousPresetId,
        )
      : FRACTION_DECIMAL_PERCENT_PRESETS;

  const preset =
    eligiblePresets[Math.floor(Math.random() * eligiblePresets.length)];

  const distribution = getDistribution(preset);

  const numbers = shuffle(
    preset.categories.flatMap((category) =>
      chooseUniqueTokens(category.tokens, distribution[category.id]),
    ),
  );

  return {
    preset,
    numbers,
    distribution,
    categoryOrder: shuffle(preset.categories),
  };
}

function validateFractionPresetBanks() {
  FRACTION_DECIMAL_PERCENT_PRESETS.forEach((preset) => {
    const allTokens = preset.categories.flatMap(
      (category) => category.tokens,
    );

    if (new Set(allTokens).size !== allTokens.length) {
      throw new Error(`${preset.title} contains duplicate tokens.`);
    }

    preset.categories.forEach((category) => {
      if (category.tokens.length < 8) {
        throw new Error(
          `"${category.title}" in "${preset.title}" needs at least 8 tokens.`,
        );
      }

      category.tokens.forEach((token) => {
        const classification = preset.classify(token);

        if (classification !== category.id) {
          throw new Error(
            `${token} is incorrectly placed in "${category.title}" for the "${preset.title}" preset.`,
          );
        }
      });
    });
  });
}

validateFractionPresetBanks();
