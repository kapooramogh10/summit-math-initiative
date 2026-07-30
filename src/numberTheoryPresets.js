function isPrime(number) {
  if (!Number.isInteger(number) || number < 2) {
    return false;
  }

  for (let divisor = 2; divisor * divisor <= number; divisor += 1) {
    if (number % divisor === 0) {
      return false;
    }
  }

  return true;
}

function isComposite(number) {
  return Number.isInteger(number) && number > 1 && !isPrime(number);
}

function isPerfectSquare(number) {
  if (!Number.isInteger(number) || number < 0) {
    return false;
  }

  const root = Math.floor(Math.sqrt(number));
  return root * root === number;
}

function isPerfectCube(number) {
  if (!Number.isInteger(number)) {
    return false;
  }

  const root = Math.round(Math.cbrt(number));
  return root * root * root === number;
}

function isFactorOf60(number) {
  return Number.isInteger(number) && number > 0 && 60 % number === 0;
}

export const NUMBER_THEORY_PRESETS = [
  {
    id: "prime-divisible-by-three",
    title: "Prime Numbers and Divisibility by 3",
    rangeLabel: "Numbers from 1 to 500",
    singletonCategoryId: "both",
    categories: [
      {
        id: "a",
        title: "Prime, Not Divisible by 3",
        subtitle: "Prime numbers other than 3",
        numbers: [
          2, 7, 13, 19, 29, 37, 43, 53, 61, 67, 73, 83,
          97, 103, 109, 127, 137, 149, 157, 167, 179, 191, 197,
          211, 223, 229, 239, 251, 263, 271, 281, 293, 311, 317,
          337, 349, 359, 373, 383, 397, 409, 419, 431, 439, 449,
          461, 467, 487, 499,
        ],
      },
      {
        id: "b",
        title: "Divisible by 3, Not Prime",
        subtitle: "Multiples of 3 that are not prime",
        numbers: [
          6, 15, 27, 36, 45, 57, 66, 75, 87, 96, 105, 117,
          126, 138, 147, 156, 168, 177, 186, 198, 207, 216, 228,
          237, 246, 258, 267, 276, 288, 297, 306, 318, 327, 336,
          348, 357, 366, 378, 387, 399, 408, 417, 429, 438, 447,
          459, 468, 477, 489, 498,
        ],
      },
      {
        id: "both",
        title: "Both",
        subtitle: "Prime and divisible by 3",
        numbers: [3],
      },
    ],
    classify(number) {
      if (number === 3) return "both";
      if (isPrime(number)) return "a";
      if (number % 3 === 0) return "b";
      return null;
    },
  },

  {
    id: "divisible-by-three-and-four",
    title: "Divisibility by 3 and 4",
    rangeLabel: "Numbers from 1 to 500",
    categories: [
      {
        id: "a",
        title: "Divisible by 3 Only",
        subtitle: "Divisible by 3, but not by 4",
        numbers: [
          3, 18, 33, 45, 63, 78, 93, 105, 123, 138, 153, 165,
          183, 198, 213, 225, 243, 258, 273, 285, 303, 318, 333,
          345, 363, 378, 393, 405, 423, 438, 453, 465, 483, 498,
        ],
      },
      {
        id: "b",
        title: "Divisible by 4 Only",
        subtitle: "Divisible by 4, but not by 3",
        numbers: [
          4, 20, 32, 52, 64, 80, 100, 112, 128, 140, 160, 176,
          188, 208, 220, 236, 256, 268, 284, 296, 316, 328, 344,
          364, 376, 392, 404, 424, 440, 452, 472, 484, 500,
        ],
      },
      {
        id: "c",
        title: "Divisible by Both",
        subtitle: "Divisible by both 3 and 4",
        numbers: [
          12, 24, 36, 60, 72, 84, 108, 120, 132, 144, 156, 180,
          192, 204, 228, 240, 252, 264, 276, 300, 312, 324, 348,
          360, 372, 384, 396, 420, 432, 444, 468, 480, 492,
        ],
      },
    ],
    classify(number) {
      const byThree = number % 3 === 0;
      const byFour = number % 4 === 0;

      if (byThree && byFour) return "c";
      if (byThree) return "a";
      if (byFour) return "b";
      return null;
    },
  },

  {
    id: "even-and-divisible-by-five",
    title: "Even Numbers and Divisibility by 5",
    rangeLabel: "Numbers from 1 to 500",
    categories: [
      {
        id: "a",
        title: "Even Only",
        subtitle: "Even, but not divisible by 5",
        numbers: [
          2, 16, 32, 46, 62, 76, 92, 106, 122, 136, 152, 166,
          182, 196, 212, 226, 242, 258, 274, 288, 304, 318, 334,
          348, 364, 378, 394, 408, 424, 438, 454, 468, 484, 498,
        ],
      },
      {
        id: "b",
        title: "Divisible by 5 Only",
        subtitle: "Divisible by 5, but odd",
        numbers: [
          5, 25, 35, 55, 65, 85, 95, 115, 125, 145, 155, 175,
          185, 205, 215, 235, 245, 265, 285, 295, 315, 325, 345,
          355, 375, 385, 405, 415, 435, 445, 465, 475, 495,
        ],
      },
      {
        id: "c",
        title: "Both",
        subtitle: "Even and divisible by 5",
        numbers: [
          10, 30, 40, 60, 70, 90, 100, 120, 130, 150, 160, 180,
          190, 210, 220, 240, 250, 270, 290, 300, 320, 330, 350,
          360, 380, 390, 410, 420, 440, 450, 470, 480, 500,
        ],
      },
    ],
    classify(number) {
      const even = number % 2 === 0;
      const byFive = number % 5 === 0;

      if (even && byFive) return "c";
      if (even) return "a";
      if (byFive) return "b";
      return null;
    },
  },

  {
    id: "odd-and-divisible-by-three",
    title: "Odd Numbers and Divisibility by 3",
    rangeLabel: "Numbers from 1 to 500",
    categories: [
      {
        id: "a",
        title: "Odd Only",
        subtitle: "Odd, but not divisible by 3",
        numbers: [
          1, 17, 31, 47, 61, 77, 91, 107, 121, 137, 151, 167,
          181, 197, 211, 227, 241, 259, 275, 289, 305, 319, 335,
          349, 365, 379, 395, 409, 425, 439, 455, 469, 485, 499,
        ],
      },
      {
        id: "b",
        title: "Divisible by 3 Only",
        subtitle: "Divisible by 3, but even",
        numbers: [
          6, 24, 36, 54, 66, 84, 96, 114, 126, 144, 162, 174,
          192, 204, 222, 234, 252, 270, 282, 300, 312, 330, 342,
          360, 378, 390, 408, 420, 438, 450, 468, 480, 498,
        ],
      },
      {
        id: "c",
        title: "Both",
        subtitle: "Odd and divisible by 3",
        numbers: [
          3, 21, 33, 51, 63, 81, 93, 111, 123, 141, 159, 171,
          189, 201, 219, 231, 249, 267, 279, 297, 309, 327, 339,
          357, 375, 387, 405, 417, 435, 447, 465, 477, 495,
        ],
      },
    ],
    classify(number) {
      const odd = Math.abs(number % 2) === 1;
      const byThree = number % 3 === 0;

      if (odd && byThree) return "c";
      if (odd) return "a";
      if (byThree) return "b";
      return null;
    },
  },

  {
    id: "square-parity",
    title: "Perfect Squares",
    rangeLabel: "Numbers from 1 to 500",
    categories: [
      {
        id: "a",
        title: "Odd Perfect Square",
        subtitle: "A perfect square that is odd",
        numbers: [1, 9, 25, 49, 81, 121, 169, 225, 289, 361, 441],
      },
      {
        id: "b",
        title: "Even Perfect Square",
        subtitle: "A perfect square that is even",
        numbers: [4, 16, 36, 64, 100, 144, 196, 256, 324, 400, 484],
      },
      {
        id: "c",
        title: "Not a Perfect Square",
        subtitle: "Cannot be written as a whole number squared",
        numbers: [
          2, 10, 17, 24, 31, 38, 44, 51, 58, 65, 71, 77,
          84, 91, 97, 104, 110, 116, 124, 130, 136, 142, 149,
          155, 162, 168, 175, 181, 187, 194, 201, 207, 213, 219,
          227, 233, 239, 245, 251, 259, 265, 271, 277, 283, 291,
          297, 303, 309, 315, 322, 329, 335, 341, 347, 354, 360,
          367, 373, 379, 385, 392, 398, 405, 411, 417, 424, 430,
          436, 443, 449, 456, 462, 468, 474, 480, 488, 494, 500,
        ],
      },
    ],
    classify(number) {
      if (!isPerfectSquare(number)) return "c";
      return number % 2 === 0 ? "b" : "a";
    },
  },

  {
    id: "multiples-of-four-and-six",
    title: "Multiples of 4 and 6",
    rangeLabel: "Numbers from 1 to 500",
    categories: [
      {
        id: "a",
        title: "Multiple of 4 Only",
        subtitle: "Divisible by 4, but not by 6",
        numbers: [
          4, 20, 32, 52, 64, 80, 92, 112, 124, 140, 152, 172,
          184, 200, 212, 232, 244, 260, 272, 292, 304, 320, 332,
          352, 364, 380, 392, 412, 424, 440, 452, 472, 484, 500,
        ],
      },
      {
        id: "b",
        title: "Multiple of 6 Only",
        subtitle: "Divisible by 6, but not by 4",
        numbers: [
          6, 18, 42, 54, 66, 78, 102, 114, 126, 150, 162, 174,
          186, 210, 222, 234, 246, 270, 282, 294, 318, 330, 342,
          354, 378, 390, 402, 426, 438, 450, 462, 486, 498,
        ],
      },
      {
        id: "c",
        title: "Multiple of Both",
        subtitle: "Divisible by both 4 and 6",
        numbers: [
          12, 24, 36, 60, 72, 84, 108, 120, 132, 144, 156, 180,
          192, 204, 228, 240, 252, 264, 276, 300, 312, 324, 348,
          360, 372, 384, 396, 420, 432, 444, 468, 480, 492,
        ],
      },
    ],
    classify(number) {
      const byFour = number % 4 === 0;
      const bySix = number % 6 === 0;

      if (byFour && bySix) return "c";
      if (byFour) return "a";
      if (bySix) return "b";
      return null;
    },
  },

  {
    id: "factors-of-sixty",
    title: "Factors of 60",
    rangeLabel: "Numbers from 1 to 500",
    categories: [
      {
        id: "a",
        title: "Even Factor of 60",
        subtitle: "An even number that divides 60 evenly",
        numbers: [2, 4, 6, 10, 12, 20, 30, 60],
      },
      {
        id: "b",
        title: "Odd Factor of 60",
        subtitle: "An odd number that divides 60 evenly",
        numbers: [1, 3, 5, 15],
      },
      {
        id: "c",
        title: "Not a Factor of 60",
        subtitle: "Does not divide 60 evenly",
        numbers: [
          7, 16, 22, 28, 34, 40, 46, 51, 57, 63, 69, 75,
          80, 86, 91, 97, 103, 108, 114, 119, 125, 131, 136,
          142, 147, 153, 159, 164, 170, 175, 181, 187, 192, 198,
          203, 209, 215, 220, 226, 231, 237, 243, 248, 254, 259,
          265, 270, 276, 282, 287, 293, 298, 304, 310, 315, 321,
          326, 332, 338, 343, 349, 354, 360, 366, 371, 377, 382,
          388, 394, 399, 405, 410, 416, 422, 427, 433, 438, 444,
          450, 455, 461, 466, 472, 478, 483, 489, 494, 500,
        ],
      },
    ],
    classify(number) {
      if (!isFactorOf60(number)) return "c";
      return number % 2 === 0 ? "a" : "b";
    },
  },

  {
    id: "multiples-of-seven",
    title: "Multiples of 7",
    rangeLabel: "Numbers from 1 to 500",
    categories: [
      {
        id: "a",
        title: "Odd Multiple of 7",
        subtitle: "Divisible by 7 and odd",
        numbers: [
          7, 21, 35, 49, 63, 77, 91, 105, 119, 147, 161, 175,
          189, 203, 217, 231, 245, 259, 273, 287, 301, 315, 329,
          343, 357, 385, 399, 413, 427, 441, 455, 469, 483, 497,
        ],
      },
      {
        id: "b",
        title: "Even Multiple of 7",
        subtitle: "Divisible by 7 and even",
        numbers: [
          14, 28, 42, 56, 70, 84, 98, 112, 126, 154, 168, 182,
          196, 210, 224, 238, 252, 266, 280, 294, 308, 322, 336,
          350, 378, 392, 406, 420, 434, 448, 462, 476, 490,
        ],
      },
      {
        id: "c",
        title: "Not Divisible by 7",
        subtitle: "Not a multiple of 7",
        numbers: [
          1, 16, 32, 47, 64, 79, 94, 110, 125, 141, 157, 172,
          187, 204, 219, 235, 250, 265, 282, 297, 313, 328, 344,
          360, 375, 390, 407, 422, 437, 453, 468, 485, 500,
        ],
      },
    ],
    classify(number) {
      if (number % 7 !== 0) return "c";
      return Math.abs(number % 2) === 1 ? "a" : "b";
    },
  },

  {
    id: "composite-and-divisible-by-five",
    title: "Composite Numbers and Divisibility by 5",
    rangeLabel: "Numbers from 1 to 500",
    categories: [
      {
        id: "a",
        title: "Composite and Divisible by 5",
        subtitle: "Composite multiples of 5",
        numbers: [
          10, 25, 40, 55, 70, 85, 100, 115, 130, 145, 160, 175,
          190, 205, 220, 235, 250, 260, 275, 290, 305, 320, 335,
          350, 365, 380, 395, 410, 425, 440, 455, 470, 485, 500,
        ],
      },
      {
        id: "b",
        title: "Composite, Not Divisible by 5",
        subtitle: "Composite numbers that are not multiples of 5",
        numbers: [
          4, 24, 39, 56, 74, 91, 106, 121, 136, 153, 168, 183,
          201, 214, 228, 244, 259, 276, 291, 303, 321, 334, 348,
          363, 378, 394, 408, 423, 438, 454, 471, 483, 498,
        ],
      },
      {
        id: "c",
        title: "Not Composite",
        subtitle: "Prime numbers or the number 1",
        numbers: [
          1, 5, 13, 23, 37, 47, 61, 73, 89, 103, 113, 137,
          151, 167, 181, 197, 223, 229, 241, 263, 277, 293, 313,
          337, 353, 373, 389, 409, 431, 443, 461, 479, 499,
        ],
      },
    ],
    classify(number) {
      if (!isComposite(number)) return "c";
      return number % 5 === 0 ? "a" : "b";
    },
  },

  {
    id: "prime-composite-neither",
    title: "Prime, Composite, or Neither",
    rangeLabel: "Includes negative numbers",
    categories: [
      {
        id: "a",
        title: "Prime",
        subtitle: "Exactly two positive factors",
        numbers: [
          2, 7, 17, 29, 37, 47, 61, 73, 89, 103, 109, 131,
          149, 163, 179, 193, 211, 227, 239, 257, 271, 283, 311,
          331, 347, 359, 379, 397, 419, 433, 443, 461, 479, 499,
        ],
      },
      {
        id: "b",
        title: "Composite",
        subtitle: "More than two positive factors",
        numbers: [
          4, 24, 39, 56, 72, 88, 105, 120, 135, 150, 166, 183,
          198, 213, 226, 244, 259, 274, 290, 303, 320, 333, 348,
          364, 378, 394, 408, 424, 440, 454, 471, 484, 500,
        ],
      },
      {
        id: "c",
        title: "Neither",
        subtitle: "Not prime and not composite",
        numbers: [
          -50, -48, -47, -45, -44, -42, -40, -39, -37, -36, -34,
          -32, -31, -29, -28, -26, -24, -23, -21, -20, -18, -17,
          -15, -13, -12, -10, -9, -7, -5, -4, -2, -1, 1,
        ],
      },
    ],
    classify(number) {
      if (isPrime(number)) return "a";
      if (isComposite(number)) return "b";
      return "c";
    },
  },

  {
    id: "positive-negative-zero",
    title: "Positive, Negative, or Zero",
    rangeLabel: "Numbers from −500 to 500",
    singletonCategoryId: "zero",
    categories: [
      {
        id: "a",
        title: "Positive",
        subtitle: "Greater than zero",
        numbers: [
          1, 11, 22, 32, 43, 53, 63, 74, 84, 95, 105, 115,
          126, 136, 147, 157, 167, 178, 188, 199, 209, 219, 230,
          240, 251, 261, 271, 282, 292, 302, 313, 323, 334, 344,
          354, 365, 375, 386, 396, 406, 417, 427, 438, 448, 458,
          469, 479, 490, 500,
        ],
      },
      {
        id: "b",
        title: "Negative",
        subtitle: "Less than zero",
        numbers: [
          -500, -490, -480, -469, -459, -449, -439, -429, -419,
          -408, -398, -388, -378, -368, -357, -347, -337, -327,
          -317, -307, -296, -286, -276, -266, -256, -245, -235,
          -225, -215, -205, -194, -184, -174, -164, -154, -144,
          -133, -123, -113, -103, -93, -82, -72, -62, -52, -42,
          -32, -21, -11, -1,
        ],
      },
      {
        id: "zero",
        title: "Neither",
        subtitle: "Zero is neither positive nor negative",
        numbers: [0],
      },
    ],
    classify(number) {
      if (number > 0) return "a";
      if (number < 0) return "b";
      return "zero";
    },
  },

  {
    id: "multiples-of-five-and-ten",
    title: "Multiples of 5 and 10",
    rangeLabel: "Numbers from 1 to 500",
    categories: [
      {
        id: "a",
        title: "Multiple of 10",
        subtitle: "Divisible by 10",
        numbers: [
          10, 20, 40, 50, 70, 80, 100, 110, 130, 140, 160, 170,
          190, 200, 220, 230, 250, 260, 280, 290, 310, 320, 340,
          350, 370, 380, 400, 410, 430, 440, 460, 470, 490, 500,
        ],
      },
      {
        id: "b",
        title: "Multiple of 5, Not 10",
        subtitle: "Ends in 5",
        numbers: [
          5, 25, 35, 55, 65, 85, 95, 115, 125, 145, 155, 175,
          185, 205, 215, 235, 245, 265, 285, 295, 315, 325, 345,
          355, 375, 385, 405, 415, 435, 445, 465, 475, 495,
        ],
      },
      {
        id: "c",
        title: "Not Divisible by 5",
        subtitle: "Does not end in 0 or 5",
        numbers: [
          1, 16, 32, 47, 63, 78, 94, 109, 126, 141, 157, 172,
          188, 203, 219, 234, 251, 266, 281, 297, 312, 328, 343,
          359, 374, 391, 406, 422, 437, 453, 468, 484, 499,
        ],
      },
    ],
    classify(number) {
      if (number % 10 === 0) return "a";
      if (number % 5 === 0) return "b";
      return "c";
    },
  },

  {
    id: "cubes-and-squares",
    title: "Perfect Cubes and Perfect Squares",
    rangeLabel: "Includes negative perfect cubes",
    categories: [
      {
        id: "a",
        title: "Perfect Cube",
        subtitle: "Can be written as a whole number cubed",
        numbers: [
          -343, -216, -125, -64, -27, -8, -1, 0, 1, 8, 27, 64,
          125, 216, 343,
        ],
      },
      {
        id: "b",
        title: "Perfect Square, Not Cube",
        subtitle: "A square that is not also a cube",
        numbers: [
          4, 9, 16, 25, 36, 49, 81, 100, 121, 144, 169, 196,
          225, 256, 289, 324, 361, 400, 441, 484,
        ],
      },
      {
        id: "c",
        title: "Neither",
        subtitle: "Neither a perfect cube nor a perfect square",
        numbers: [
          -500, -485, -470, -455, -440, -425, -410, -394, -379,
          -364, -349, -333, -318, -303, -288, -273, -258, -243,
          -228, -212, -196, -181, -166, -151, -136, -120, -105,
          -90, -75, -59, -44, -29, -13, 10, 28, 44, 60, 76, 92,
          108, 124, 140, 156, 172, 187, 204, 220, 236, 251, 267,
          282, 298, 313, 329, 345, 360, 376, 391, 408, 423, 438,
          454, 469, 485, 500,
        ],
      },
    ],
    classify(number) {
      if (isPerfectCube(number)) return "a";
      if (isPerfectSquare(number)) return "b";
      return "c";
    },
  },

  {
    id: "composite-and-divisible-by-seven",
    title: "Composite Numbers and Divisibility by 7",
    rangeLabel: "Numbers from 1 to 500",
    categories: [
      {
        id: "a",
        title: "Composite, Not Divisible by 7",
        subtitle: "Composite but not a multiple of 7",
        numbers: [
          4, 22, 38, 54, 69, 86, 102, 118, 132, 146, 162, 177,
          192, 207, 220, 236, 250, 267, 284, 297, 310, 325, 339,
          354, 368, 382, 396, 411, 426, 442, 456, 472, 485, 500,
        ],
      },
      {
        id: "b",
        title: "Composite and Divisible by 7",
        subtitle: "Composite multiples of 7",
        numbers: [
          14, 28, 42, 56, 77, 91, 105, 119, 133, 147, 168, 182,
          196, 210, 224, 238, 252, 273, 287, 301, 315, 329, 343,
          364, 378, 392, 406, 420, 434, 455, 469, 483, 497,
        ],
      },
      {
        id: "c",
        title: "Not Composite",
        subtitle: "Prime numbers or the number 1",
        numbers: [
          1, 5, 13, 23, 37, 47, 61, 73, 89, 103, 113, 137,
          151, 167, 181, 197, 223, 229, 241, 263, 277, 293, 313,
          337, 353, 373, 389, 409, 431, 443, 461, 479, 499,
        ],
      },
    ],
    classify(number) {
      if (!isComposite(number)) return "c";
      return number % 7 === 0 ? "b" : "a";
    },
  },
];

export function shuffle(items) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [result[index], result[randomIndex]] = [
      result[randomIndex],
      result[index],
    ];
  }

  return result;
}

function chooseUniqueNumbers(numbers, amount) {
  if (numbers.length < amount) {
    throw new Error(
      `A preset category has only ${numbers.length} numbers, but ${amount} were requested.`,
    );
  }

  return shuffle(numbers).slice(0, amount);
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

export function createNumberTheoryRound(previousPresetId = null) {
  const eligiblePresets =
    NUMBER_THEORY_PRESETS.length > 1
      ? NUMBER_THEORY_PRESETS.filter(
          (preset) => preset.id !== previousPresetId,
        )
      : NUMBER_THEORY_PRESETS;

  const preset =
    eligiblePresets[Math.floor(Math.random() * eligiblePresets.length)];

  const distribution = getDistribution(preset);

  const numbers = shuffle(
    preset.categories.flatMap((category) =>
      chooseUniqueNumbers(category.numbers, distribution[category.id]),
    ),
  );

  return {
    preset,
    numbers,
    distribution,
    categoryOrder: shuffle(preset.categories),
  };
}

function validatePresetBanks() {
  NUMBER_THEORY_PRESETS.forEach((preset) => {
    const allNumbers = preset.categories.flatMap(
      (category) => category.numbers,
    );

    if (allNumbers.length !== 100) {
      throw new Error(
        `${preset.title} must contain exactly 100 numbers. It currently contains ${allNumbers.length}.`,
      );
    }

    if (new Set(allNumbers).size !== 100) {
      throw new Error(`${preset.title} contains duplicate numbers.`);
    }

    preset.categories.forEach((category) => {
      category.numbers.forEach((number) => {
        const classification = preset.classify(number);

        if (classification !== category.id) {
          throw new Error(
            `${number} is incorrectly placed in "${category.title}" for the "${preset.title}" preset.`,
          );
        }
      });
    });
  });
}

validatePresetBanks();