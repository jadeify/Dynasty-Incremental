var lib;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@antimatter-dimensions/notations/dist/ad-notations.esm.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@antimatter-dimensions/notations/dist/ad-notations.esm.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AllNotation: () => (/* binding */ AllNotation),
/* harmony export */   BarNotation: () => (/* binding */ BarNotation),
/* harmony export */   BlindNotation: () => (/* binding */ BlindNotation),
/* harmony export */   BlobsNotation: () => (/* binding */ BlobsNotation),
/* harmony export */   BracketsNotation: () => (/* binding */ BracketsNotation),
/* harmony export */   ClockNotation: () => (/* binding */ ClockNotation),
/* harmony export */   CustomNotation: () => (/* binding */ CustomNotation),
/* harmony export */   DotsNotation: () => (/* binding */ DotsNotation),
/* harmony export */   EmojiNotation: () => (/* binding */ EmojiNotation),
/* harmony export */   EngineeringNotation: () => (/* binding */ EngineeringNotation),
/* harmony export */   HexNotation: () => (/* binding */ HexNotation),
/* harmony export */   ImperialNotation: () => (/* binding */ ImperialNotation),
/* harmony export */   InfinityNotation: () => (/* binding */ InfinityNotation),
/* harmony export */   LettersNotation: () => (/* binding */ LettersNotation),
/* harmony export */   LogarithmNotation: () => (/* binding */ LogarithmNotation),
/* harmony export */   MixedEngineeringNotation: () => (/* binding */ MixedEngineeringNotation),
/* harmony export */   MixedLogarithmSciNotation: () => (/* binding */ MixedLogarithmSciNotation),
/* harmony export */   MixedScientificNotation: () => (/* binding */ MixedScientificNotation),
/* harmony export */   Notation: () => (/* binding */ Notation),
/* harmony export */   PrimeNotation: () => (/* binding */ PrimeNotation),
/* harmony export */   RomanNotation: () => (/* binding */ RomanNotation),
/* harmony export */   ScientificNotation: () => (/* binding */ ScientificNotation),
/* harmony export */   Settings: () => (/* binding */ Settings),
/* harmony export */   ShiNotation: () => (/* binding */ ShiNotation),
/* harmony export */   StandardNotation: () => (/* binding */ StandardNotation),
/* harmony export */   ZalgoNotation: () => (/* binding */ ZalgoNotation),
/* harmony export */   abbreviateStandard: () => (/* binding */ abbreviateStandard),
/* harmony export */   formatMantissa: () => (/* binding */ formatMantissa),
/* harmony export */   formatMantissaBaseTen: () => (/* binding */ formatMantissaBaseTen),
/* harmony export */   formatMantissaWithExponent: () => (/* binding */ formatMantissaWithExponent)
/* harmony export */ });
/* harmony import */ var break_infinity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! break_infinity.js */ "./node_modules/break_infinity.js/dist/break_infinity.esm.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");



var Settings = {
  isInfinite: function isInfinite(decimal) {
    return decimal.gte(break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"].MAX_VALUE);
  },
  exponentCommas: {
    show: true,
    min: 100000,
    max: 1000000000
  },
  exponentDefaultPlaces: 3
};

function commaSection(value, index) {
  if (index === 0) {
    return value.slice(-3);
  }

  return value.slice(-3 * (index + 1), -3 * index);
}

function addCommas(value) {
  return Array.from(Array(Math.ceil(value.length / 3))).map(function (_, i) {
    return commaSection(value, i);
  }).reverse().join(",");
}

function formatWithCommas(value) {
  var decimalPointSplit = value.toString().split(".");
  decimalPointSplit[0] = decimalPointSplit[0].replace(/\w+$/g, addCommas);
  return decimalPointSplit.join(".");
}
function toEngineering(value) {
  var exponentOffset = value.exponent % 3;
  return break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromMantissaExponent_noNormalize(value.mantissa * Math.pow(10, exponentOffset), value.exponent - exponentOffset);
}
var STANDARD_ABBREVIATIONS = ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"];
var STANDARD_PREFIXES = [["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"], ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"], ["", "Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]];
var STANDARD_PREFIXES_2 = ["", "MI-", "MC-", "NA-", "PC-", "FM-", "AT-", "ZP-"];
function abbreviateStandard(rawExp) {
  var exp = rawExp - 1;

  if (exp === -1) {
    return "";
  }

  if (exp < STANDARD_ABBREVIATIONS.length) {
    return STANDARD_ABBREVIATIONS[exp];
  }

  var prefix = [];
  var e = exp;

  while (e > 0) {
    prefix.push(STANDARD_PREFIXES[prefix.length % 3][e % 10]);
    e = Math.floor(e / 10);
  }

  while (prefix.length % 3 !== 0) {
    prefix.push("");
  }

  var abbreviation = "";

  for (var i = prefix.length / 3 - 1; i >= 0; i--) {
    abbreviation += prefix.slice(i * 3, i * 3 + 3).join("") + STANDARD_PREFIXES_2[i];
  }

  return abbreviation.replace(/-[A-Z]{2}-/g, "-").replace(/U([A-Z]{2}-)/g, "$1").replace(/-$/, "");
}
function noSpecialFormatting(exponent) {
  return exponent < Settings.exponentCommas.min;
}
function showCommas(exponent) {
  return Settings.exponentCommas.show && exponent < Settings.exponentCommas.max;
}
function isExponentFullyShown(exponent) {
  return noSpecialFormatting(exponent) || showCommas(exponent);
}
function formatMantissaWithExponent(mantissaFormatting, exponentFormatting, base, steps, useLogIfExponentIsFormatted, separator, forcePositiveExponent) {
  if (separator === void 0) {
    separator = "e";
  }

  if (forcePositiveExponent === void 0) {
    forcePositiveExponent = false;
  }

  return function (n, precision, precisionExponent) {
    var realBase = Math.pow(base, steps);
    var exponent = Math.floor(n.log(realBase)) * steps;

    if (forcePositiveExponent) {
      exponent = Math.max(exponent, 0);
    }

    var mantissa = n.div(break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"].pow(base, exponent)).toNumber();

    if (!(1 <= mantissa && mantissa < realBase)) {
      var adjust = Math.floor(Math.log(mantissa) / Math.log(realBase));
      mantissa /= Math.pow(realBase, adjust);
      exponent += steps * adjust;
    }

    var m = mantissaFormatting(mantissa, precision);

    if (m === mantissaFormatting(realBase, precision)) {
      m = mantissaFormatting(1, precision);
      exponent += steps;
    }

    if (exponent === 0) {
      return m;
    }

    var e = exponentFormatting(exponent, precisionExponent);

    if (useLogIfExponentIsFormatted && !isExponentFullyShown(exponent)) {
      m = "";
    }

    return "".concat(m).concat(separator).concat(e);
  };
}
function formatMantissaBaseTen(n, precision) {
  return n.toFixed(Math.max(0, precision));
}
function formatMantissa(base, digits) {
  return function (n, precision) {
    var value = Math.round(n * Math.pow(base, Math.max(0, precision)));
    var d = [];

    while (value > 0 || d.length === 0) {
      d.push(digits[value % base]);
      value = Math.floor(value / base);
    }

    var result = d.reverse().join("");

    if (precision > 0) {
      result = result.padStart(precision + 1, "0");
      result = "".concat(result.slice(0, -precision), ".").concat(result.slice(-precision));
    }

    return result;
  };
}

var Notation = function () {
  function Notation() {}

  Notation.prototype.format = function (value, places, placesUnder1000, placesExponent) {
    if (places === void 0) {
      places = 0;
    }

    if (placesUnder1000 === void 0) {
      placesUnder1000 = 0;
    }

    if (placesExponent === void 0) {
      placesExponent = places;
    }

    if (typeof value === "number" && !Number.isFinite(value)) {
      return this.infinite;
    }

    var decimal = break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromValue_noAlloc(value);

    if (decimal.exponent < -300) {
      return decimal.sign() < 0 ? this.formatVerySmallNegativeDecimal(decimal.abs(), placesUnder1000) : this.formatVerySmallDecimal(decimal, placesUnder1000);
    }

    if (decimal.exponent < 3) {
      var number = decimal.toNumber();
      return number < 0 ? this.formatNegativeUnder1000(Math.abs(number), placesUnder1000) : this.formatUnder1000(number, placesUnder1000);
    }

    if (Settings.isInfinite(decimal.abs())) {
      return decimal.sign() < 0 ? this.negativeInfinite : this.infinite;
    }

    return decimal.sign() < 0 ? this.formatNegativeDecimal(decimal.abs(), places, placesExponent) : this.formatDecimal(decimal, places, placesExponent);
  };

  Object.defineProperty(Notation.prototype, "negativeInfinite", {
    get: function get() {
      return "-".concat(this.infinite);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Notation.prototype, "infinite", {
    get: function get() {
      return "Infinite";
    },
    enumerable: false,
    configurable: true
  });

  Notation.prototype.formatVerySmallNegativeDecimal = function (value, places) {
    return "-".concat(this.formatVerySmallDecimal(value, places));
  };

  Notation.prototype.formatVerySmallDecimal = function (value, places) {
    return this.formatUnder1000(value.toNumber(), places);
  };

  Notation.prototype.formatNegativeUnder1000 = function (value, places) {
    return "-".concat(this.formatUnder1000(value, places));
  };

  Notation.prototype.formatUnder1000 = function (value, places) {
    return value.toFixed(places);
  };

  Notation.prototype.formatNegativeDecimal = function (value, places, placesExponent) {
    return "-".concat(this.formatDecimal(value, places, placesExponent));
  };

  Notation.prototype.formatExponent = function (exponent, precision, specialFormat, largeExponentPrecision) {
    if (precision === void 0) {
      precision = Settings.exponentDefaultPlaces;
    }

    if (specialFormat === void 0) {
      specialFormat = function specialFormat(n, _) {
        return n.toString();
      };
    }

    if (largeExponentPrecision === void 0) {
      largeExponentPrecision = Math.max(2, precision);
    }

    if (noSpecialFormatting(exponent)) {
      return specialFormat(exponent, Math.max(precision, 1));
    }

    if (showCommas(exponent)) {
      return formatWithCommas(specialFormat(exponent, 0));
    }

    return this.formatDecimal(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](exponent), largeExponentPrecision, largeExponentPrecision);
  };

  return Notation;
}();

var ScientificNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(ScientificNotation, _super);

  function ScientificNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(ScientificNotation.prototype, "name", {
    get: function get() {
      return "Scientific";
    },
    enumerable: false,
    configurable: true
  });

  ScientificNotation.prototype.formatDecimal = function (value, places, placesExponent) {
    return formatMantissaWithExponent(formatMantissaBaseTen, this.formatExponent.bind(this), 10, 1, false)(value, places, placesExponent);
  };

  return ScientificNotation;
}(Notation);

var EngineeringNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(EngineeringNotation, _super);

  function EngineeringNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(EngineeringNotation.prototype, "name", {
    get: function get() {
      return "Engineering";
    },
    enumerable: false,
    configurable: true
  });

  EngineeringNotation.prototype.formatDecimal = function (value, places, placesExponent) {
    return formatMantissaWithExponent(formatMantissaBaseTen, this.formatExponent.bind(this), 10, 3, false)(value, places, placesExponent);
  };

  return EngineeringNotation;
}(Notation);

var CustomNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(CustomNotation, _super);

  function CustomNotation(letters, mantissaExponentSeparator, separator) {
    if (mantissaExponentSeparator === void 0) {
      mantissaExponentSeparator = "";
    }

    if (separator === void 0) {
      separator = "";
    }

    var _this = this;

    if (letters.length < 2) {
      throw new Error("The supplied letter sequence must contain at least 2 letters");
    }

    _this = _super.call(this) || this;
    _this.letters = letters;
    _this.mantissaExponentSeparator = mantissaExponentSeparator;
    _this.separator = separator;
    return _this;
  }

  Object.defineProperty(CustomNotation.prototype, "name", {
    get: function get() {
      return "Custom";
    },
    enumerable: false,
    configurable: true
  });

  CustomNotation.prototype.formatDecimal = function (value, places) {
    var engineering = toEngineering(value);
    var mantissa = engineering.mantissa.toFixed(places);
    return mantissa + this.mantissaExponentSeparator + this.transcribe(engineering.exponent).join(this.separator);
  };

  CustomNotation.prototype.transcribe = function (exponent) {
    var normalizedExponent = exponent / 3;
    var base = this.letters.length;

    if (normalizedExponent <= base) {
      return [this.letters[normalizedExponent - 1]];
    }

    var letters = [];

    while (normalizedExponent > base) {
      var remainder = normalizedExponent % base;
      var letterIndex = (remainder === 0 ? base : remainder) - 1;
      letters.push(this.letters[letterIndex]);
      normalizedExponent = (normalizedExponent - remainder) / base;

      if (remainder === 0) {
        normalizedExponent--;
      }
    }

    letters.push(this.letters[normalizedExponent - 1]);
    return letters.reverse();
  };

  return CustomNotation;
}(EngineeringNotation);

var LETTERS = "abcdefghijklmnopqrstuvwxyz";

var LettersNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(LettersNotation, _super);

  function LettersNotation() {
    return _super.call(this, LETTERS) || this;
  }

  Object.defineProperty(LettersNotation.prototype, "name", {
    get: function get() {
      return "Letters";
    },
    enumerable: false,
    configurable: true
  });
  return LettersNotation;
}(CustomNotation);

var EMOJI = ["😠", "🎂", "🎄", "💀", "🍆", "👪", "🌈", "💯", "🍦", "🎃", "💋", "😂", "🌙", "⛔", "🐙", "💩", "❓", "☢", "🙈", "👍", "☂", "✌", "⚠", "❌", "😋", "⚡"];

var EmojiNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(EmojiNotation, _super);

  function EmojiNotation() {
    return _super.call(this, EMOJI) || this;
  }

  Object.defineProperty(EmojiNotation.prototype, "name", {
    get: function get() {
      return "Emoji";
    },
    enumerable: false,
    configurable: true
  });
  return EmojiNotation;
}(CustomNotation);

var StandardNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(StandardNotation, _super);

  function StandardNotation() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.name = "Standard";
    return _this;
  }

  StandardNotation.prototype.formatDecimal = function (value, places, placesExponent) {
    return formatMantissaWithExponent(formatMantissaBaseTen, abbreviateStandard, 1000, 1, false, " ", true)(value, places, placesExponent);
  };

  return StandardNotation;
}(Notation);

var standard$1 = new StandardNotation();

var MixedScientificNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(MixedScientificNotation, _super);

  function MixedScientificNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MixedScientificNotation.prototype, "name", {
    get: function get() {
      return "Mixed scientific";
    },
    enumerable: false,
    configurable: true
  });

  MixedScientificNotation.prototype.formatDecimal = function (value, places, placesExponent) {
    if (value.exponent < 33) {
      return standard$1.formatDecimal(value, places, placesExponent);
    }

    return formatMantissaWithExponent(formatMantissaBaseTen, this.formatExponent.bind(this), 10, 1, false)(value, places, placesExponent);
  };

  return MixedScientificNotation;
}(Notation);

var standard = new StandardNotation();

var MixedEngineeringNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(MixedEngineeringNotation, _super);

  function MixedEngineeringNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MixedEngineeringNotation.prototype, "name", {
    get: function get() {
      return "Mixed engineering";
    },
    enumerable: false,
    configurable: true
  });

  MixedEngineeringNotation.prototype.formatDecimal = function (value, places, placesExponent) {
    if (value.exponent < 33) {
      return standard.formatDecimal(value, places, placesExponent);
    }

    return formatMantissaWithExponent(formatMantissaBaseTen, this.formatExponent.bind(this), 10, 3, false)(value, places, placesExponent);
  };

  return MixedEngineeringNotation;
}(Notation);

var LogarithmNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(LogarithmNotation, _super);

  function LogarithmNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(LogarithmNotation.prototype, "name", {
    get: function get() {
      return "Logarithm";
    },
    enumerable: false,
    configurable: true
  });

  LogarithmNotation.prototype.formatDecimal = function (value, places, placesExponent) {
    var log10 = value.log10();
    return "e".concat(this.formatExponent(log10, places, function (n, p) {
      return n.toFixed(p);
    }, placesExponent));
  };

  return LogarithmNotation;
}(Notation);

var scientific = new ScientificNotation();

var MixedLogarithmSciNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(MixedLogarithmSciNotation, _super);

  function MixedLogarithmSciNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MixedLogarithmSciNotation.prototype, "name", {
    get: function get() {
      return "Mixed Logarithm (Sci)";
    },
    enumerable: false,
    configurable: true
  });

  MixedLogarithmSciNotation.prototype.formatDecimal = function (value, places, placesExponent) {
    if (value.exponent < 33) {
      return scientific.formatDecimal(value, places, placesExponent);
    }

    var log10 = value.log10();
    return "e".concat(this.formatExponent(log10, places, function (n, p) {
      return n.toFixed(p);
    }, placesExponent));
  };

  return MixedLogarithmSciNotation;
}(Notation);

var BracketsNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(BracketsNotation, _super);

  function BracketsNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(BracketsNotation.prototype, "name", {
    get: function get() {
      return "Brackets";
    },
    enumerable: false,
    configurable: true
  });

  BracketsNotation.prototype.formatDecimal = function (value) {
    var table = [")", "[", "{", "]", "(", "}"];
    var log6 = Math.LN10 / Math.log(6) * value.log10();
    var wholePartOfLog = Math.floor(log6);
    var decimalPartOfLog = log6 - wholePartOfLog;
    var decimalPartTimes36 = Math.floor(decimalPartOfLog * 36);
    var string = "";

    while (wholePartOfLog >= 6) {
      var remainder = wholePartOfLog % 6;
      wholePartOfLog -= remainder;
      wholePartOfLog /= 6;
      string = table[remainder] + string;
    }

    string = "e".concat(table[wholePartOfLog]).concat(string, ".");
    string += table[Math.floor(decimalPartTimes36 / 6)];
    string += table[decimalPartTimes36 % 6];
    return string;
  };

  return BracketsNotation;
}(Notation);

var LOG10_MAX_VALUE = Math.log10(Number.MAX_VALUE);

var InfinityNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(InfinityNotation, _super);

  function InfinityNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(InfinityNotation.prototype, "name", {
    get: function get() {
      return "Infinity";
    },
    enumerable: false,
    configurable: true
  });

  InfinityNotation.prototype.formatDecimal = function (value, places) {
    var log10 = value.log10();
    var infinities = log10 / LOG10_MAX_VALUE;
    var infPlaces = infinities < 1000 ? 4 : 3;
    var formatted = infinities.toFixed(Math.max(infPlaces, places));

    if (Settings.exponentCommas.show) {
      return "".concat(formatWithCommas(formatted), "\u221E");
    }

    return "".concat(formatted, "\u221E");
  };

  return InfinityNotation;
}(Notation);

var ROMAN_NUMBERS = [[1000000, "M̄"], [900000, "C̄M̄"], [500000, "D̄"], [400000, "C̄D̄"], [100000, "C̄"], [90000, "X̄C̄"], [50000, "L̄"], [40000, "X̄L̄"], [10000, "X̄"], [9000, "ⅯX̄"], [5000, "V̄"], [4000, "ⅯV̄"], [1000, "Ⅿ"], [900, "ⅭⅯ"], [500, "Ⅾ"], [400, "ⅭⅮ"], [100, "Ⅽ"], [90, "ⅩⅭ"], [50, "Ⅼ"], [40, "ⅩⅬ"], [10, "Ⅹ"], [9, "ⅠⅩ"], [5, "Ⅴ"], [4, "ⅠⅤ"], [1, "Ⅰ"]];
var ROMAN_FRACTIONS = ["", "·", ":", "∴", "∷", "⁙"];
var MAXIMUM = 4000000;
var MAX_LOG_10 = Math.log10(MAXIMUM);

var RomanNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(RomanNotation, _super);

  function RomanNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(RomanNotation.prototype, "name", {
    get: function get() {
      return "Roman";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(RomanNotation.prototype, "infinite", {
    get: function get() {
      return "Infinitus";
    },
    enumerable: false,
    configurable: true
  });

  RomanNotation.prototype.formatUnder1000 = function (value) {
    return this.romanize(value);
  };

  RomanNotation.prototype.formatDecimal = function (value) {
    if (value.lt(MAXIMUM)) {
      return this.romanize(value.toNumber());
    }

    var log10 = value.log10();
    var maximums = log10 / MAX_LOG_10;
    var current = Math.pow(MAXIMUM, maximums - Math.floor(maximums));
    return "".concat(this.romanize(current), "\u2191").concat(this.formatDecimal(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](maximums)));
  };

  RomanNotation.prototype.romanize = function (value) {
    var romanized = "";

    for (var _i = 0, ROMAN_NUMBERS_1 = ROMAN_NUMBERS; _i < ROMAN_NUMBERS_1.length; _i++) {
      var numberPair = ROMAN_NUMBERS_1[_i];
      var decimal = numberPair[0];
      var roman = numberPair[1];

      while (decimal <= value) {
        romanized += roman;
        value -= decimal;
      }
    }

    var duodecimal = Math.round(Math.floor(value * 10) * 1.2);

    if (duodecimal === 0) {
      return romanized === "" ? "nulla" : romanized;
    }

    if (duodecimal > 5) {
      duodecimal -= 6;
      romanized += "Ｓ";
    }

    romanized += ROMAN_FRACTIONS[duodecimal];
    return romanized;
  };

  return RomanNotation;
}(Notation);

var DOT_DIGITS = "⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿" + "⡀⡁⡂⡃⡄⡅⡆⡇⡈⡉⡊⡋⡌⡍⡎⡏⡐⡑⡒⡓⡔⡕⡖⡗⡘⡙⡚⡛⡜⡝⡞⡟⡠⡡⡢⡣⡤⡥⡦⡧⡨⡩⡪⡫⡬⡭⡮⡯⡰⡱⡲⡳⡴⡵⡶⡷⡸⡹⡺⡻⡼⡽⡾⡿" + "⢀⢁⢂⢃⢄⢅⢆⢇⢈⢉⢊⢋⢌⢍⢎⢏⢐⢑⢒⢓⢔⢕⢖⢗⢘⢙⢚⢛⢜⢝⢞⢟⢠⢡⢢⢣⢤⢥⢦⢧⢨⢩⢪⢫⢬⢭⢮⢯⢰⢱⢲⢳⢴⢵⢶⢷⢸⢹⢺⢻⢼⢽⢾⢿" + "⣀⣁⣂⣃⣄⣅⣆⣇⣈⣉⣊⣋⣌⣍⣎⣏⣐⣑⣒⣓⣔⣕⣖⣗⣘⣙⣚⣛⣜⣝⣞⣟⣠⣡⣢⣣⣤⣥⣦⣧⣨⣩⣪⣫⣬⣭⣮⣯⣰⣱⣲⣳⣴⣵⣶⣷⣸⣹⣺⣻⣼⣽⣾⣿";

var DotsNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(DotsNotation, _super);

  function DotsNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(DotsNotation.prototype, "name", {
    get: function get() {
      return "Dots";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DotsNotation.prototype, "infinite", {
    get: function get() {
      return "⣿⠀⣿";
    },
    enumerable: false,
    configurable: true
  });

  DotsNotation.prototype.formatUnder1000 = function (value) {
    return this.dotify(value * 254);
  };

  DotsNotation.prototype.formatDecimal = function (value) {
    if (value.lt(16387063.9980315)) {
      return this.dotify(value.toNumber() * 254);
    }

    var log = value.log(254);
    var exponent = Math.floor(log - 2);
    var mantissa = Math.pow(254, log - exponent);
    return "".concat(this.dotify(exponent), "\u28FF").concat(this.dotify(mantissa * 254));
  };

  DotsNotation.prototype.dotify = function (rawValue, pad) {
    if (pad === void 0) {
      pad = false;
    }

    var value = Math.round(rawValue);

    if (!pad && value < 254) {
      return DOT_DIGITS[value + 1];
    }

    if (value < 64516) {
      return DOT_DIGITS[Math.floor(value / 254) + 1] + DOT_DIGITS[value % 254 + 1];
    }

    return this.dotify(Math.floor(value / 64516)) + this.dotify(value % 64516, true);
  };

  return DotsNotation;
}(Notation);

var ZALGO_CHARS = ["\u030D", "\u0336", "\u0353", "\u033F", "\u0489", "\u0330", "\u031A", "\u0338", "\u035A", "\u0337"];
var HE_COMES = ["H", "E", " ", "C", "O", "M", "E", "S"];

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var ZalgoNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(ZalgoNotation, _super);

  function ZalgoNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(ZalgoNotation.prototype, "name", {
    get: function get() {
      return "Zalgo";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ZalgoNotation.prototype, "infinite", {
    get: function get() {
      return HE_COMES.map(function (_char) {
        return _char + randomElement(ZALGO_CHARS);
      }).join("");
    },
    enumerable: false,
    configurable: true
  });

  ZalgoNotation.prototype.formatUnder1000 = function (value) {
    return this.heComes(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](value));
  };

  ZalgoNotation.prototype.formatDecimal = function (value) {
    return this.heComes(value);
  };

  ZalgoNotation.prototype.heComes = function (value) {
    var scaled = value.plus(1).log10() / 66666 * 1000;
    var displayPart = Number(scaled.toFixed(2));
    var zalgoPart = Math.floor(Math.abs(Math.pow(2, 30) * (scaled - displayPart)));
    var displayChars = Array.from(formatWithCommas(displayPart));
    var zalgoIndices = Array.from(zalgoPart.toString() + scaled.toFixed(0));

    for (var i = 0; i < zalgoIndices.length; i++) {
      var zalgoIndex = parseInt(zalgoIndices[i], 10);
      var displayIndex = 37 * i % displayChars.length;
      displayChars[displayIndex] += ZALGO_CHARS[zalgoIndex];
    }

    return displayChars.join("");
  };

  return ZalgoNotation;
}(Notation);

var SIGNS = {
  positive: 0,
  negative: 1
};

var HexNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(HexNotation, _super);

  function HexNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(HexNotation.prototype, "name", {
    get: function get() {
      return "Hex";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(HexNotation.prototype, "negativeInfinite", {
    get: function get() {
      return "00000000";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(HexNotation.prototype, "infinite", {
    get: function get() {
      return "FFFFFFFF";
    },
    enumerable: false,
    configurable: true
  });

  HexNotation.prototype.formatVerySmallNegativeDecimal = function (value) {
    return this.formatDecimal(value.negate());
  };

  HexNotation.prototype.formatVerySmallDecimal = function (value) {
    return this.formatDecimal(value);
  };

  HexNotation.prototype.formatNegativeUnder1000 = function (value) {
    return this.formatDecimal(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](-value));
  };

  HexNotation.prototype.formatUnder1000 = function (value) {
    return this.formatDecimal(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](value));
  };

  HexNotation.prototype.formatNegativeDecimal = function (value) {
    return this.formatDecimal(value.negate());
  };

  HexNotation.prototype.formatDecimal = function (value) {
    return this.rawValue(value, 32).toString(16).toUpperCase().padStart(8, "0");
  };

  HexNotation.prototype.modifiedLogarithm = function (x) {
    var floorOfLog = Math.floor(break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"].log2(x));
    var previousPowerOfTwo = break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"].pow(2, floorOfLog);
    var fractionToNextPowerOfTwo = break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"].div(x, previousPowerOfTwo).toNumber() - 1;
    return floorOfLog + fractionToNextPowerOfTwo;
  };

  HexNotation.prototype.isFinite = function (x) {
    if (typeof x === "number") {
      return isFinite(x);
    }

    return isFinite(x.e) && isFinite(x.mantissa);
  };

  HexNotation.prototype.rawValue = function (inputValue, numberOfBits) {
    var value = inputValue;
    var signs = [];

    for (var i = 0; i < numberOfBits; i++) {
      if (!this.isFinite(value)) {
        break;
      }

      if (break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"].lt(value, 0)) {
        signs.push(SIGNS.negative);
        value = -this.modifiedLogarithm(break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"].times(value, -1));
      } else {
        signs.push(SIGNS.positive);
        value = this.modifiedLogarithm(value);
      }
    }

    var resultValue = parseInt(signs.map(function (x) {
      return x === SIGNS.positive ? 1 : 0;
    }).join("").padEnd(numberOfBits, "0"), 2);

    if (resultValue !== Math.pow(2, numberOfBits) - 1 && (value > 0 || value === 0 && resultValue % 2 === 1)) {
      resultValue += 1;
    }

    return resultValue;
  };

  return HexNotation;
}(Notation);

var VOLUME_UNITS = [[0, "pL", 0], [61611520, "minim", 0], [61611520 * 60, "dram", 1], [61611520 * 60 * 8, "ounce", 2], [61611520 * 60 * 8 * 4, "gill", 2], [61611520 * 60 * 8 * 4 * 2, "cup", 3], [61611520 * 60 * 8 * 4 * 2 * 2, "pint", 4], [61611520 * 60 * 8 * 4 * 2 * 2 * 2, "quart", 4], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4, "gallon", 4], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 4.5, "pin", 3], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 9, "firkin", 3], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 18, "kilderkin", 4], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 36, "barrel", 4], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 54, "hogshead", 5], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 72, "puncheon", 6], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 108, "butt", 7], [61611520 * 60 * 8 * 4 * 2 * 2 * 2 * 4 * 216, "tun", 7]];
var MINIMS = VOLUME_UNITS[1];
var VOLUME_ADJECTIVES = ["minute ", "tiny ", "petite ", "small ", "modest ", "medium ", "generous ", "large ", "great ", "grand ", "huge ", "gigantic ", "immense ", "colossal ", "vast ", "galactic ", "cosmic ", "infinite ", "eternal "];
var VOWELS = new Set("aeiouAEIOU");
var MAX_VOLUME = 10 * VOLUME_UNITS[VOLUME_UNITS.length - 1][0];
var LOG_MAX_VOLUME = Math.log10(MAX_VOLUME);
var REDUCE_RATIO = Math.log10(MAX_VOLUME / MINIMS[0]);

var ImperialNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(ImperialNotation, _super);

  function ImperialNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(ImperialNotation.prototype, "name", {
    get: function get() {
      return "Imperial";
    },
    enumerable: false,
    configurable: true
  });

  ImperialNotation.prototype.formatUnder1000 = function (value) {
    return this.formatDecimal(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](value));
  };

  ImperialNotation.prototype.formatDecimal = function (value) {
    if (value.lt(MAX_VOLUME)) {
      return this.convertToVolume(value.toNumber(), VOLUME_ADJECTIVES[0]);
    }

    var logValue = value.log10() - LOG_MAX_VOLUME;
    var adjectiveIndex = 1;

    while (logValue > REDUCE_RATIO) {
      adjectiveIndex++;
      logValue /= REDUCE_RATIO;
    }

    return this.convertToVolume(Math.pow(10, logValue) * MINIMS[0], VOLUME_ADJECTIVES[adjectiveIndex]);
  };

  ImperialNotation.prototype.convertToVolume = function (x, adjective) {
    var volIdx = this.findVolumeUnit(x);

    if (volIdx === 0) {
      return this.formatMetric(x);
    }

    var smallStr = this.checkSmallUnits(adjective, x, volIdx);

    if (smallStr !== undefined) {
      return smallStr;
    }

    var big = VOLUME_UNITS[volIdx];
    var numBig = Math.floor(x / big[0]);
    var remainder = x - numBig * big[0];

    if (volIdx < VOLUME_UNITS.length - 1) {
      var volume = this.checkAlmost(adjective, x, 0, volIdx + 1);

      if (volume !== undefined) {
        return volume;
      }
    }

    var nearMultiple = this.checkAlmost(adjective, remainder, numBig, volIdx);

    if (nearMultiple !== undefined) {
      return nearMultiple;
    }

    if (remainder < VOLUME_UNITS[volIdx - big[2]][0]) {
      return this.pluralOrArticle(numBig, adjective + big[1]);
    }

    var numBest = Math.floor(remainder / VOLUME_UNITS[volIdx - 1][0]);
    var bestUnitIndex = volIdx - 1;
    var bestUnitError = remainder - numBest * VOLUME_UNITS[volIdx - 1][0];

    for (var thirdUnitIndex = volIdx - 2; thirdUnitIndex > 0 && thirdUnitIndex > volIdx - big[2]; --thirdUnitIndex) {
      var third = VOLUME_UNITS[thirdUnitIndex];
      var numThird = Math.floor(remainder / third[0]);

      if (numThird > 9 && thirdUnitIndex !== 1) {
        break;
      }

      var thirdUnitError = remainder - numThird * third[0];

      if (thirdUnitError < 0.99 * bestUnitError) {
        numBest = numThird;
        bestUnitIndex = thirdUnitIndex;
        bestUnitError = thirdUnitError;
      }
    }

    return this.bigAndSmall(adjective, numBig, big, numBest, VOLUME_UNITS[bestUnitIndex]);
  };

  ImperialNotation.prototype.formatMetric = function (x) {
    if (x < 1000) {
      return "".concat(x < 10 || x === Math.round(x) ? x.toFixed(2) : x.toFixed(0), "pL");
    }

    if (x < 1e6) {
      return "".concat((x / 1000).toPrecision(4), "nL");
    }

    return "".concat((x / 1e6).toPrecision(4), "\u03BCL");
  };

  ImperialNotation.prototype.checkSmallUnits = function (adjective, x, volIdx) {
    var big = VOLUME_UNITS[volIdx];

    if (volIdx <= 3 && x + 9.5 * MINIMS[0] > VOLUME_UNITS[volIdx + 1][0]) {
      return this.almostOrShortOf(x, adjective, 1, VOLUME_UNITS[volIdx + 1], MINIMS);
    }

    if (volIdx === 1) {
      var deciMinims = Math.round(x * 10 / big[0]);

      if (deciMinims === 10) {
        return this.addArticle(adjective + big[1]);
      }

      var places = deciMinims < 100 ? 1 : 0;
      return "".concat((deciMinims / 10).toFixed(places), " ").concat(adjective).concat(big[1], "s");
    }

    if (volIdx === 2) {
      var numBig = Math.floor(x / big[0]);
      var remainder = x - numBig * big[0];

      if (remainder > 50.5 * MINIMS[0]) {
        return this.almostOrShortOf(x, adjective, numBig + 1, big, MINIMS);
      }

      var numSmall = Math.round(remainder / MINIMS[0]);
      return this.bigAndSmall(adjective, numBig, big, numSmall, MINIMS);
    }

    return undefined;
  };

  ImperialNotation.prototype.findVolumeUnit = function (x) {
    var low = 0;
    var high = VOLUME_UNITS.length;
    var guess = 0;

    while (high - low > 1) {
      guess = Math.floor((low + high) / 2);

      if (VOLUME_UNITS[guess][0] > x) {
        high = guess;
      } else {
        low = guess;
      }
    }

    return low;
  };

  ImperialNotation.prototype.checkAlmost = function (adjective, x, numBig, bigIndex) {
    var big = VOLUME_UNITS[bigIndex];

    if (x + VOLUME_UNITS[bigIndex - big[2]][0] >= big[0]) {
      return this.almost(adjective, numBig + 1, big);
    }

    var small = VOLUME_UNITS[bigIndex + 1 - big[2]];

    if (x + small[0] >= big[0]) {
      return this.shortOf(adjective, numBig + 1, big, 1, small);
    }

    return undefined;
  };

  ImperialNotation.prototype.bigAndSmall = function (adjective, numBig, big, numSmall, small) {
    var bigStr = this.pluralOrArticle(numBig, adjective + big[1]);
    return numSmall === 0 ? bigStr : "".concat(bigStr, " and ").concat(this.pluralOrArticle(numSmall, small[1]));
  };

  ImperialNotation.prototype.almost = function (adjective, numBig, big) {
    return "almost ".concat(this.pluralOrArticle(numBig, adjective + big[1]));
  };

  ImperialNotation.prototype.almostOrShortOf = function (x, adjective, numBig, big, small) {
    var _short = Math.round((numBig * big[0] - x) / small[0]);

    return _short === 0 ? this.almost(adjective, numBig, big) : this.shortOf(adjective, numBig, big, _short, small);
  };

  ImperialNotation.prototype.shortOf = function (adjective, numBig, big, numSmall, small) {
    return "".concat(this.pluralOrArticle(numSmall, small[1]), " short of ").concat(this.pluralOrArticle(numBig, adjective + big[1]));
  };

  ImperialNotation.prototype.pluralOrArticle = function (num, str) {
    return num === 1 ? this.addArticle(str) : "".concat(num, " ").concat(str, "s");
  };

  ImperialNotation.prototype.addArticle = function (x) {
    return (VOWELS.has(x[0]) ? "an " : "a ") + x;
  };

  return ImperialNotation;
}(Notation);

var HOURS = ["🕛", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚"];
var LOG12 = Math.log10(12);

var ClockNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(ClockNotation, _super);

  function ClockNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(ClockNotation.prototype, "name", {
    get: function get() {
      return "Clock";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ClockNotation.prototype, "infinite", {
    get: function get() {
      return "🕛🕡";
    },
    enumerable: false,
    configurable: true
  });

  ClockNotation.prototype.formatUnder1000 = function (value) {
    return this.clockwise(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](value));
  };

  ClockNotation.prototype.formatDecimal = function (value) {
    return this.clockwise(value);
  };

  ClockNotation.prototype.clockwise = function (value) {
    if (value.lt(12)) {
      return this.hour(value.toNumber());
    }

    var log = value.log10() / LOG12;
    var exponent = Math.floor(log);

    if (log < 301) {
      var clockLow = (Math.pow(12, log - exponent + 1) - 12) / 11;

      if (exponent < 13) {
        return this.hour(exponent - 1) + this.hour(clockLow);
      }

      exponent -= 13;
      var prefix = "";

      if (exponent >= 144) {
        prefix = this.hour(0);
        exponent -= 144;
      }

      return prefix + this.hour(exponent / 12) + this.hour(exponent % 12) + this.hour(clockLow);
    }

    exponent -= 301;
    var clockHigh = 1;

    while (exponent >= 1728) {
      exponent = (exponent - 1728) / 12;
      ++clockHigh;
    }

    return this.hour(clockHigh) + this.hour(exponent / 144) + this.hour(exponent % 144 / 12) + this.hour(exponent % 12);
  };

  ClockNotation.prototype.hour = function (number) {
    return HOURS[Math.max(Math.min(Math.floor(number), 11), 0)];
  };

  return ClockNotation;
}(Notation);

var MAX_INT = 10006;
var MAX_INT_DECIMAL = new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](MAX_INT);
var MAX_INT_LOG_10 = Math.log10(MAX_INT);
var PRIMES = [];
var visitedMarks = new Array(MAX_INT).fill(false);
var sieveLimit = Math.ceil(Math.sqrt(MAX_INT));

for (var number = 2; number < sieveLimit; number++) {
  if (visitedMarks[number]) {
    continue;
  }

  PRIMES.push(number);

  for (var mark = number; mark <= MAX_INT; mark += number) {
    visitedMarks[mark] = true;
  }
}

for (var number = sieveLimit; number < MAX_INT; number++) {
  if (!visitedMarks[number]) {
    PRIMES.push(number);
  }
}

var LAST_PRIME_INDEX = PRIMES.length - 1;
var MAX_PRIME = PRIMES[LAST_PRIME_INDEX];
var EXPONENT_CHARACTERS = ["\u2070", "\xB9", "\xB2", "\xB3", "\u2074", "\u2075", "\u2076", "\u2077", "\u2078", "\u2079", "\xB9\u2070", "\xB9\xB9", "\xB9\xB2", "\xB9\xB3"];

var PrimeNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(PrimeNotation, _super);

  function PrimeNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(PrimeNotation.prototype, "name", {
    get: function get() {
      return "Prime";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(PrimeNotation.prototype, "infinite", {
    get: function get() {
      return "Primefinity?";
    },
    enumerable: false,
    configurable: true
  });

  PrimeNotation.prototype.formatUnder1000 = function (value) {
    return this.primify(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](value));
  };

  PrimeNotation.prototype.formatDecimal = function (value) {
    return this.primify(value);
  };

  PrimeNotation.prototype.primify = function (value) {
    if (value.lte(MAX_INT_DECIMAL)) {
      var floored = Math.floor(value.toNumber());

      if (floored === 0) {
        return "0";
      }

      if (floored === 1) {
        return "1";
      }

      return this.formatFromList(this.primesFromInt(floored));
    }

    var exp = value.log10() / MAX_INT_LOG_10;
    var base = Math.pow(MAX_INT, exp / Math.ceil(exp));

    if (exp <= MAX_INT) {
      return this.formatBaseExp(base, exp);
    }

    var exp2 = Math.log10(exp) / Math.log10(MAX_INT);
    var exp2Ceil = Math.ceil(exp2);
    exp = Math.pow(MAX_INT, exp2 / exp2Ceil);
    base = Math.pow(MAX_INT, exp / Math.ceil(exp));
    var exp2List = this.primesFromInt(exp2Ceil);
    var formatedExp2 = exp2List.length === 1 ? EXPONENT_CHARACTERS[exp2List[0]] : "^(".concat(this.formatFromList(exp2List), ")");
    return this.formatBaseExp(base, exp) + formatedExp2;
  };

  PrimeNotation.prototype.formatBaseExp = function (base, exp) {
    var formatedBase = this.formatFromList(this.primesFromInt(Math.floor(base)));
    var formatedExp = this.formatFromList(this.primesFromInt(Math.ceil(exp)));
    return "(".concat(formatedBase, ")^(").concat(formatedExp, ")");
  };

  PrimeNotation.prototype.formatFromList = function (list) {
    var out = [];
    var last = 0;
    var count = 0;

    for (var i = 0; i < list.length; i++) {
      if (list[i] === last) {
        count++;
      } else {
        if (last > 0) {
          if (count > 1) {
            out.push("".concat(last).concat(EXPONENT_CHARACTERS[count]));
          } else {
            out.push(last);
          }
        }

        last = list[i];
        count = 1;
      }

      if (i === list.length - 1) {
        if (count > 1) {
          out.push("".concat(list[i]).concat(EXPONENT_CHARACTERS[count]));
        } else {
          out.push(list[i]);
        }
      }
    }

    return out.join("\xD7");
  };

  PrimeNotation.prototype.findGreatestLtePrimeIndex = function (value) {
    if (value >= MAX_PRIME) {
      return LAST_PRIME_INDEX;
    }

    var min = 0;
    var max = LAST_PRIME_INDEX;

    while (max !== min + 1) {
      var middle = Math.floor((max + min) / 2);
      var prime = PRIMES[middle];

      if (prime === value) {
        return middle;
      }

      if (value < prime) {
        max = middle;
      } else {
        min = middle;
      }
    }

    return min;
  };

  PrimeNotation.prototype.primesFromInt = function (value) {
    var factors = [];
    var factoringValue = value;

    while (factoringValue !== 1) {
      var ltePrimeIndex = this.findGreatestLtePrimeIndex(factoringValue);
      var ltePrime = PRIMES[ltePrimeIndex];

      if (ltePrime === factoringValue) {
        factors.push(factoringValue);
        break;
      }

      var halfFactoring = factoringValue / 2;
      var primeIndex = this.findGreatestLtePrimeIndex(halfFactoring);
      var factor = void 0;

      while (factor === undefined) {
        var prime = PRIMES[primeIndex--];

        if (factoringValue % prime === 0) {
          factor = prime;
        }
      }

      factoringValue /= factor;
      factors.push(factor);
    }

    return factors.reverse();
  };

  return PrimeNotation;
}(Notation);

var BARS = ["", "", "", "", "", "", "", ""];
var NEGATIVE_BARS = ["", "", "", "", "", "", "", ""];
var LOG8 = Math.log(8);

var BarNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(BarNotation, _super);

  function BarNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(BarNotation.prototype, "name", {
    get: function get() {
      return "Bar";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BarNotation.prototype, "negativeInfinite", {
    get: function get() {
      return "";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BarNotation.prototype, "infinite", {
    get: function get() {
      return "";
    },
    enumerable: false,
    configurable: true
  });

  BarNotation.prototype.formatVerySmallNegativeDecimal = function (value) {
    return this.flipBars(this.formatDecimal(value));
  };

  BarNotation.prototype.formatVerySmallDecimal = function (value) {
    return this.formatDecimal(value);
  };

  BarNotation.prototype.formatNegativeUnder1000 = function (value) {
    return this.flipBars(this.formatDecimal(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](value)));
  };

  BarNotation.prototype.formatUnder1000 = function (value) {
    return this.formatDecimal(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](value));
  };

  BarNotation.prototype.formatNegativeDecimal = function (value) {
    return this.flipBars(this.formatDecimal(value));
  };

  BarNotation.prototype.formatDecimal = function (value) {
    if (value.eq(0)) {
      return "0";
    }

    if (value.lessThan(1) && value.greaterThan(0)) {
      return "/".concat(this.formatDecimal(break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"].div(1, value)));
    }

    var log8 = Math.LN10 / LOG8 * value.log10();
    var wholeLog = Math.floor(log8);
    var decimalLog = log8 - wholeLog;
    var decimalLog64 = Math.floor(decimalLog * 64);
    var parts = [BARS[decimalLog64 % 8], BARS[Math.floor(decimalLog64 / 8)]];

    while (wholeLog >= 8) {
      var remainder = wholeLog % 8;
      wholeLog = (wholeLog - remainder) / 8;
      parts.push(BARS[remainder]);
    }

    parts.push(BARS[wholeLog]);
    return parts.join("");
  };

  BarNotation.prototype.flipBars = function (parts) {
    var newParts = [];

    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
      var part = parts_1[_i];
      newParts.push(NEGATIVE_BARS[BARS.indexOf(part)]);
    }

    return newParts.join("");
  };

  return BarNotation;
}(Notation);

var SHI = "世使侍勢十史嗜士始室實屍市恃拭拾施是時氏濕獅矢石視試詩誓識逝適釋食";

var ShiNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(ShiNotation, _super);

  function ShiNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(ShiNotation.prototype, "name", {
    get: function get() {
      return "Shi";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(ShiNotation.prototype, "infinite", {
    get: function get() {
      return this.shi(break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"].NUMBER_MAX_VALUE);
    },
    enumerable: false,
    configurable: true
  });

  ShiNotation.prototype.formatUnder1000 = function (value) {
    return this.shi(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](value));
  };

  ShiNotation.prototype.formatDecimal = function (value) {
    return this.shi(value);
  };

  ShiNotation.prototype.getShiCharacter = function (x) {
    return SHI[Math.floor(x) % SHI.length];
  };

  ShiNotation.prototype.shi = function (value) {
    var scaled = Math.pow(value.plus(1).log10() * 1000, 0.08);
    var shi = "";

    for (var i = 0; i < 3; i++) {
      shi += this.getShiCharacter(scaled * Math.pow(SHI.length, i));
    }

    return shi;
  };

  return ShiNotation;
}(Notation);

var _a;
var LEN = 23;
var START = "\uE010";
var START_HEX = (_a = START.codePointAt(0)) !== null && _a !== void 0 ? _a : 65;
var INFINITY = "\uE027";
var NEGATIVE = "\uE028";
var BLOBS = [];

for (var i = 0; i < LEN; i++) {
  var _char = String.fromCharCode(START_HEX + i);

  BLOBS.push(_char);
}

var LOG3 = Math.log10(3);

var BlobsNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(BlobsNotation, _super);

  function BlobsNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(BlobsNotation.prototype, "name", {
    get: function get() {
      return "Blobs";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BlobsNotation.prototype, "infinite", {
    get: function get() {
      return "".concat(INFINITY);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BlobsNotation.prototype, "negativeInfinite", {
    get: function get() {
      return "".concat(NEGATIVE).concat(INFINITY);
    },
    enumerable: false,
    configurable: true
  });

  BlobsNotation.prototype.formatNegativeUnder1000 = function (num) {
    return "".concat(NEGATIVE).concat(this.blobify(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](num - 1)));
  };

  BlobsNotation.prototype.formatNegativeDecimal = function (num) {
    return "".concat(NEGATIVE).concat(this.blobify(num.minus(1)));
  };

  BlobsNotation.prototype.formatUnder1000 = function (num) {
    return this.blobify(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](num));
  };

  BlobsNotation.prototype.formatDecimal = function (num) {
    return this.blobify(num);
  };

  BlobsNotation.prototype.blobify = function (num) {
    var number = this.reduceNumber(num.abs());

    if (number < LEN) {
      return BLOBS[Math.floor(number)];
    }

    if (Math.floor(number / LEN) < LEN + 1) {
      return BLOBS[Math.floor(number / LEN) - 1] + BLOBS[Math.floor(number % LEN)];
    }

    return this.blobify(break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"].floor(number / LEN - 1)) + BLOBS[Math.floor(number % LEN)];
  };

  BlobsNotation.prototype.reduceNumber = function (num) {
    if (num.lte(1000)) {
      return num.toNumber();
    }

    return (Math.log10(num.log10()) - LOG3) / Math.log10(1.0002) + 1000;
  };

  return BlobsNotation;
}(Notation);

var BlindNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(BlindNotation, _super);

  function BlindNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(BlindNotation.prototype, "name", {
    get: function get() {
      return "Blind";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BlindNotation.prototype, "negativeInfinite", {
    get: function get() {
      return " ";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(BlindNotation.prototype, "infinite", {
    get: function get() {
      return " ";
    },
    enumerable: false,
    configurable: true
  });

  BlindNotation.prototype.formatVerySmallNegativeDecimal = function () {
    return " ";
  };

  BlindNotation.prototype.formatVerySmallDecimal = function () {
    return " ";
  };

  BlindNotation.prototype.formatNegativeUnder1000 = function () {
    return " ";
  };

  BlindNotation.prototype.formatUnder1000 = function () {
    return " ";
  };

  BlindNotation.prototype.formatNegativeDecimal = function () {
    return " ";
  };

  BlindNotation.prototype.formatDecimal = function () {
    return " ";
  };

  return BlindNotation;
}(Notation);

var notationList = [new ScientificNotation(), new LettersNotation(), new StandardNotation(), new LogarithmNotation(), new BracketsNotation(), new InfinityNotation(), new RomanNotation(), new DotsNotation(), new ZalgoNotation(), new HexNotation(), new ImperialNotation(), new ClockNotation(), new PrimeNotation(), new BarNotation(), new ShiNotation(), new BlobsNotation(), new BlindNotation()];

var AllNotation = function (_super) {
  (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(AllNotation, _super);

  function AllNotation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(AllNotation.prototype, "name", {
    get: function get() {
      return "ALL";
    },
    enumerable: false,
    configurable: true
  });

  AllNotation.prototype.formatNegativeUnder1000 = function (value, places) {
    return this.formatDecimal(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](-value), places);
  };

  AllNotation.prototype.formatUnder1000 = function (value, places) {
    return this.formatDecimal(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](value), places);
  };

  AllNotation.prototype.formatNegativeDecimal = function (value, places) {
    return this.formatDecimal(new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](-value), places);
  };

  AllNotation.prototype.formatDecimal = function (value, places) {
    var index = Math.floor(Math.log2(value.abs().plus(2).log2()));
    var notation = notationList[index % notationList.length];
    return notation.format(value, places, places);
  };

  return AllNotation;
}(Notation);




/***/ }),

/***/ "./node_modules/break_infinity.js/dist/break_infinity.esm.js":
/*!*******************************************************************!*\
  !*** ./node_modules/break_infinity.js/dist/break_infinity.esm.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var pad_end__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pad-end */ "./node_modules/pad-end/index.js");
/* harmony import */ var pad_end__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pad_end__WEBPACK_IMPORTED_MODULE_0__);
var n=9e15,e=function(){for(var t=[],n=-323;n<=308;n++)t.push(Number("1e"+n));return function(n){return t[n+323]}}(),r=function(t){return t instanceof a?t:new a(t)},i=function(t,n){return(new a).fromMantissaExponent(t,n)},o=function(t,n){return(new a).fromMantissaExponent_noNormalize(t,n)};function u(t,n,e,r){var i=n.mul(e.pow(r));return a.floor(t.div(i).mul(e.sub(1)).add(1).log10()/e.log10())}function s(t,n,e,r){return n.mul(e.pow(r)).mul(a.sub(1,e.pow(t))).div(a.sub(1,e))}var a=function(){function a(t){this.mantissa=NaN,this.exponent=NaN,void 0===t?(this.m=0,this.e=0):t instanceof a?this.fromDecimal(t):"number"==typeof t?this.fromNumber(t):this.fromString(t)}return Object.defineProperty(a.prototype,"m",{get:function(){return this.mantissa},set:function(t){this.mantissa=t},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"e",{get:function(){return this.exponent},set:function(t){this.exponent=t},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"s",{get:function(){return this.sign()},set:function(t){if(0===t)return this.e=0,void(this.m=0);this.sgn()!==t&&(this.m=-this.m)},enumerable:!1,configurable:!0}),a.fromMantissaExponent=function(t,n){return(new a).fromMantissaExponent(t,n)},a.fromMantissaExponent_noNormalize=function(t,n){return(new a).fromMantissaExponent_noNormalize(t,n)},a.fromDecimal=function(t){return(new a).fromDecimal(t)},a.fromNumber=function(t){return(new a).fromNumber(t)},a.fromString=function(t){return(new a).fromString(t)},a.fromValue=function(t){return(new a).fromValue(t)},a.fromValue_noAlloc=function(t){return t instanceof a?t:new a(t)},a.abs=function(t){return r(t).abs()},a.neg=function(t){return r(t).neg()},a.negate=function(t){return r(t).neg()},a.negated=function(t){return r(t).neg()},a.sign=function(t){return r(t).sign()},a.sgn=function(t){return r(t).sign()},a.round=function(t){return r(t).round()},a.floor=function(t){return r(t).floor()},a.ceil=function(t){return r(t).ceil()},a.trunc=function(t){return r(t).trunc()},a.add=function(t,n){return r(t).add(n)},a.plus=function(t,n){return r(t).add(n)},a.sub=function(t,n){return r(t).sub(n)},a.subtract=function(t,n){return r(t).sub(n)},a.minus=function(t,n){return r(t).sub(n)},a.mul=function(t,n){return r(t).mul(n)},a.multiply=function(t,n){return r(t).mul(n)},a.times=function(t,n){return r(t).mul(n)},a.div=function(t,n){return r(t).div(n)},a.divide=function(t,n){return r(t).div(n)},a.recip=function(t){return r(t).recip()},a.reciprocal=function(t){return r(t).recip()},a.reciprocate=function(t){return r(t).reciprocate()},a.cmp=function(t,n){return r(t).cmp(n)},a.compare=function(t,n){return r(t).cmp(n)},a.eq=function(t,n){return r(t).eq(n)},a.equals=function(t,n){return r(t).eq(n)},a.neq=function(t,n){return r(t).neq(n)},a.notEquals=function(t,n){return r(t).notEquals(n)},a.lt=function(t,n){return r(t).lt(n)},a.lte=function(t,n){return r(t).lte(n)},a.gt=function(t,n){return r(t).gt(n)},a.gte=function(t,n){return r(t).gte(n)},a.max=function(t,n){return r(t).max(n)},a.min=function(t,n){return r(t).min(n)},a.clamp=function(t,n,e){return r(t).clamp(n,e)},a.clampMin=function(t,n){return r(t).clampMin(n)},a.clampMax=function(t,n){return r(t).clampMax(n)},a.cmp_tolerance=function(t,n,e){return r(t).cmp_tolerance(n,e)},a.compare_tolerance=function(t,n,e){return r(t).cmp_tolerance(n,e)},a.eq_tolerance=function(t,n,e){return r(t).eq_tolerance(n,e)},a.equals_tolerance=function(t,n,e){return r(t).eq_tolerance(n,e)},a.neq_tolerance=function(t,n,e){return r(t).neq_tolerance(n,e)},a.notEquals_tolerance=function(t,n,e){return r(t).notEquals_tolerance(n,e)},a.lt_tolerance=function(t,n,e){return r(t).lt_tolerance(n,e)},a.lte_tolerance=function(t,n,e){return r(t).lte_tolerance(n,e)},a.gt_tolerance=function(t,n,e){return r(t).gt_tolerance(n,e)},a.gte_tolerance=function(t,n,e){return r(t).gte_tolerance(n,e)},a.log10=function(t){return r(t).log10()},a.absLog10=function(t){return r(t).absLog10()},a.pLog10=function(t){return r(t).pLog10()},a.log=function(t,n){return r(t).log(n)},a.log2=function(t){return r(t).log2()},a.ln=function(t){return r(t).ln()},a.logarithm=function(t,n){return r(t).logarithm(n)},a.pow10=function(t){return Number.isInteger(t)?o(1,t):i(Math.pow(10,t%1),Math.trunc(t))},a.pow=function(t,n){return"number"==typeof t&&10===t&&"number"==typeof n&&Number.isInteger(n)?o(1,n):r(t).pow(n)},a.exp=function(t){return r(t).exp()},a.sqr=function(t){return r(t).sqr()},a.sqrt=function(t){return r(t).sqrt()},a.cube=function(t){return r(t).cube()},a.cbrt=function(t){return r(t).cbrt()},a.dp=function(t){return r(t).dp()},a.decimalPlaces=function(t){return r(t).dp()},a.affordGeometricSeries=function(t,n,e,i){return u(r(t),r(n),r(e),i)},a.sumGeometricSeries=function(t,n,e,i){return s(t,r(n),r(e),i)},a.affordArithmeticSeries=function(t,n,e,i){return function(t,n,e,r){var i=n.add(r.mul(e)).sub(e.div(2)),o=i.pow(2);return i.neg().add(o.add(e.mul(t).mul(2)).sqrt()).div(e).floor()}(r(t),r(n),r(e),r(i))},a.sumArithmeticSeries=function(t,n,e,i){return function(t,n,e,r){var i=n.add(r.mul(e));return t.div(2).mul(i.mul(2).plus(t.sub(1).mul(e)))}(r(t),r(n),r(e),r(i))},a.efficiencyOfPurchase=function(t,n,e){return function(t,n,e){return t.div(n).add(t.div(e))}(r(t),r(n),r(e))},a.randomDecimalForTesting=function(t){if(20*Math.random()<1)return o(0,0);var n=10*Math.random();10*Math.random()<1&&(n=Math.round(n)),n*=Math.sign(2*Math.random()-1);var e=Math.floor(Math.random()*t*2)-t;return i(n,e)},a.prototype.normalize=function(){if(this.m>=1&&this.m<10)return this;if(0===this.m)return this.m=0,this.e=0,this;var t=Math.floor(Math.log10(Math.abs(this.m)));return this.m=-324===t?10*this.m/1e-323:this.m/e(t),this.e+=t,this},a.prototype.fromMantissaExponent=function(t,n){return isFinite(t)&&isFinite(n)?(this.m=t,this.e=n,this.normalize(),this):(t=Number.NaN,n=Number.NaN,this)},a.prototype.fromMantissaExponent_noNormalize=function(t,n){return this.m=t,this.e=n,this},a.prototype.fromDecimal=function(t){return this.m=t.m,this.e=t.e,this},a.prototype.fromNumber=function(t){return isNaN(t)?(this.m=Number.NaN,this.e=Number.NaN):t===Number.POSITIVE_INFINITY?(this.m=1,this.e=n):t===Number.NEGATIVE_INFINITY?(this.m=-1,this.e=n):0===t?(this.m=0,this.e=0):(this.e=Math.floor(Math.log10(Math.abs(t))),this.m=-324===this.e?10*t/1e-323:t/e(this.e),this.normalize()),this},a.prototype.fromString=function(t){if(-1!==t.indexOf("e")){var n=t.split("e");this.m=parseFloat(n[0]),this.e=parseFloat(n[1]),this.normalize()}else if("NaN"===t)this.m=Number.NaN,this.e=Number.NaN;else if(this.fromNumber(parseFloat(t)),isNaN(this.m))throw Error("[DecimalError] Invalid argument: "+t);return this},a.prototype.fromValue=function(t){return t instanceof a?this.fromDecimal(t):"number"==typeof t?this.fromNumber(t):"string"==typeof t?this.fromString(t):(this.m=0,this.e=0,this)},a.prototype.toNumber=function(){if(!isFinite(this.e))return Number.NaN;if(this.e>308)return this.m>0?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(this.e<-324)return 0;if(-324===this.e)return this.m>0?5e-324:-5e-324;var t=this.m*e(this.e);if(!isFinite(t)||this.e<0)return t;var n=Math.round(t);return Math.abs(n-t)<1e-10?n:t},a.prototype.mantissaWithDecimalPlaces=function(t){if(isNaN(this.m)||isNaN(this.e))return Number.NaN;if(0===this.m)return 0;var n=t+1,e=Math.ceil(Math.log10(Math.abs(this.m))),r=Math.round(this.m*Math.pow(10,n-e))*Math.pow(10,e-n);return parseFloat(r.toFixed(Math.max(n-e,0)))},a.prototype.toString=function(){return isNaN(this.m)||isNaN(this.e)?"NaN":this.e>=n?this.m>0?"Infinity":"-Infinity":this.e<=-n||0===this.m?"0":this.e<21&&this.e>-7?this.toNumber().toString():this.m+"e"+(this.e>=0?"+":"")+this.e},a.prototype.toExponential=function(e){if(isNaN(this.m)||isNaN(this.e))return"NaN";if(this.e>=n)return this.m>0?"Infinity":"-Infinity";if(this.e<=-n||0===this.m)return"0"+(e>0?pad_end__WEBPACK_IMPORTED_MODULE_0___default()(".",e+1,"0"):"")+"e+0";if(this.e>-324&&this.e<308)return this.toNumber().toExponential(e);isFinite(e)||(e=17);var r=e+1,i=Math.max(1,Math.ceil(Math.log10(Math.abs(this.m))));return(Math.round(this.m*Math.pow(10,r-i))*Math.pow(10,i-r)).toFixed(Math.max(r-i,0))+"e"+(this.e>=0?"+":"")+this.e},a.prototype.toFixed=function(e){return isNaN(this.m)||isNaN(this.e)?"NaN":this.e>=n?this.m>0?"Infinity":"-Infinity":this.e<=-n||0===this.m?"0"+(e>0?pad_end__WEBPACK_IMPORTED_MODULE_0___default()(".",e+1,"0"):""):this.e>=17?this.m.toString().replace(".","").padEnd(this.e+1,"0")+(e>0?pad_end__WEBPACK_IMPORTED_MODULE_0___default()(".",e+1,"0"):""):this.toNumber().toFixed(e)},a.prototype.toPrecision=function(t){return this.e<=-7?this.toExponential(t-1):t>this.e?this.toFixed(t-this.e-1):this.toExponential(t-1)},a.prototype.valueOf=function(){return this.toString()},a.prototype.toJSON=function(){return this.toString()},a.prototype.toStringWithDecimalPlaces=function(t){return this.toExponential(t)},a.prototype.abs=function(){return o(Math.abs(this.m),this.e)},a.prototype.neg=function(){return o(-this.m,this.e)},a.prototype.negate=function(){return this.neg()},a.prototype.negated=function(){return this.neg()},a.prototype.sign=function(){return Math.sign(this.m)},a.prototype.sgn=function(){return this.sign()},a.prototype.round=function(){return this.e<-1?new a(0):this.e<17?new a(Math.round(this.toNumber())):this},a.prototype.floor=function(){return this.e<-1?Math.sign(this.m)>=0?new a(0):new a(-1):this.e<17?new a(Math.floor(this.toNumber())):this},a.prototype.ceil=function(){return this.e<-1?Math.sign(this.m)>0?new a(1):new a(0):this.e<17?new a(Math.ceil(this.toNumber())):this},a.prototype.trunc=function(){return this.e<0?new a(0):this.e<17?new a(Math.trunc(this.toNumber())):this},a.prototype.add=function(t){var n,o,u=r(t);if(0===this.m)return u;if(0===u.m)return this;if(this.e>=u.e?(n=this,o=u):(n=u,o=this),n.e-o.e>17)return n;var s=Math.round(1e14*n.m+1e14*o.m*e(o.e-n.e));return i(s,n.e-14)},a.prototype.plus=function(t){return this.add(t)},a.prototype.sub=function(t){return this.add(r(t).neg())},a.prototype.subtract=function(t){return this.sub(t)},a.prototype.minus=function(t){return this.sub(t)},a.prototype.mul=function(t){if("number"==typeof t)return t<1e307&&t>-1e307?i(this.m*t,this.e):i(1e-307*this.m*t,this.e+307);var n="string"==typeof t?new a(t):t;return i(this.m*n.m,this.e+n.e)},a.prototype.multiply=function(t){return this.mul(t)},a.prototype.times=function(t){return this.mul(t)},a.prototype.div=function(t){return this.mul(r(t).recip())},a.prototype.divide=function(t){return this.div(t)},a.prototype.divideBy=function(t){return this.div(t)},a.prototype.dividedBy=function(t){return this.div(t)},a.prototype.recip=function(){return i(1/this.m,-this.e)},a.prototype.reciprocal=function(){return this.recip()},a.prototype.reciprocate=function(){return this.recip()},a.prototype.cmp=function(t){var n=r(t);if(0===this.m){if(0===n.m)return 0;if(n.m<0)return 1;if(n.m>0)return-1}if(0===n.m){if(this.m<0)return-1;if(this.m>0)return 1}if(this.m>0)return n.m<0||this.e>n.e?1:this.e<n.e?-1:this.m>n.m?1:this.m<n.m?-1:0;if(this.m<0)return n.m>0||this.e>n.e?-1:this.e<n.e||this.m>n.m?1:this.m<n.m?-1:0;throw Error("Unreachable code")},a.prototype.compare=function(t){return this.cmp(t)},a.prototype.eq=function(t){var n=r(t);return this.e===n.e&&this.m===n.m},a.prototype.equals=function(t){return this.eq(t)},a.prototype.neq=function(t){return!this.eq(t)},a.prototype.notEquals=function(t){return this.neq(t)},a.prototype.lt=function(t){var n=r(t);return 0===this.m?n.m>0:0===n.m?this.m<=0:this.e===n.e?this.m<n.m:this.m>0?n.m>0&&this.e<n.e:n.m>0||this.e>n.e},a.prototype.lte=function(t){return!this.gt(t)},a.prototype.gt=function(t){var n=r(t);return 0===this.m?n.m<0:0===n.m?this.m>0:this.e===n.e?this.m>n.m:this.m>0?n.m<0||this.e>n.e:n.m<0&&this.e<n.e},a.prototype.gte=function(t){return!this.lt(t)},a.prototype.max=function(t){var n=r(t);return this.lt(n)?n:this},a.prototype.min=function(t){var n=r(t);return this.gt(n)?n:this},a.prototype.clamp=function(t,n){return this.max(t).min(n)},a.prototype.clampMin=function(t){return this.max(t)},a.prototype.clampMax=function(t){return this.min(t)},a.prototype.cmp_tolerance=function(t,n){var e=r(t);return this.eq_tolerance(e,n)?0:this.cmp(e)},a.prototype.compare_tolerance=function(t,n){return this.cmp_tolerance(t,n)},a.prototype.eq_tolerance=function(t,n){var e=r(t);return a.lte(this.sub(e).abs(),a.max(this.abs(),e.abs()).mul(n))},a.prototype.equals_tolerance=function(t,n){return this.eq_tolerance(t,n)},a.prototype.neq_tolerance=function(t,n){return!this.eq_tolerance(t,n)},a.prototype.notEquals_tolerance=function(t,n){return this.neq_tolerance(t,n)},a.prototype.lt_tolerance=function(t,n){var e=r(t);return!this.eq_tolerance(e,n)&&this.lt(e)},a.prototype.lte_tolerance=function(t,n){var e=r(t);return this.eq_tolerance(e,n)||this.lt(e)},a.prototype.gt_tolerance=function(t,n){var e=r(t);return!this.eq_tolerance(e,n)&&this.gt(e)},a.prototype.gte_tolerance=function(t,n){var e=r(t);return this.eq_tolerance(e,n)||this.gt(e)},a.prototype.log10=function(){return this.e+Math.log10(this.m)},a.prototype.absLog10=function(){return this.e+Math.log10(Math.abs(this.m))},a.prototype.pLog10=function(){return this.m<=0||this.e<0?0:this.log10()},a.prototype.log=function(t){return Math.LN10/Math.log(t)*this.log10()},a.prototype.log2=function(){return 3.321928094887362*this.log10()},a.prototype.ln=function(){return 2.302585092994045*this.log10()},a.prototype.logarithm=function(t){return this.log(t)},a.prototype.pow=function(t){var n,e=t instanceof a?t.toNumber():t,r=this.e*e;if(Number.isSafeInteger(r)&&(n=Math.pow(this.m,e),isFinite(n)&&0!==n))return i(n,r);var o=Math.trunc(r),u=r-o;if(n=Math.pow(10,e*Math.log10(this.m)+u),isFinite(n)&&0!==n)return i(n,o);var s=a.pow10(e*this.absLog10());return-1===this.sign()?1===Math.abs(e%2)?s.neg():0===Math.abs(e%2)?s:new a(Number.NaN):s},a.prototype.pow_base=function(t){return r(t).pow(this)},a.prototype.factorial=function(){var t=this.toNumber()+1;return a.pow(t/Math.E*Math.sqrt(t*Math.sinh(1/t)+1/(810*Math.pow(t,6))),t).mul(Math.sqrt(2*Math.PI/t))},a.prototype.exp=function(){var t=this.toNumber();return-706<t&&t<709?a.fromNumber(Math.exp(t)):a.pow(Math.E,t)},a.prototype.sqr=function(){return i(Math.pow(this.m,2),2*this.e)},a.prototype.sqrt=function(){return this.m<0?new a(Number.NaN):this.e%2!=0?i(3.16227766016838*Math.sqrt(this.m),Math.floor(this.e/2)):i(Math.sqrt(this.m),Math.floor(this.e/2))},a.prototype.cube=function(){return i(Math.pow(this.m,3),3*this.e)},a.prototype.cbrt=function(){var t=1,n=this.m;n<0&&(t=-1,n=-n);var e=t*Math.pow(n,1/3),r=this.e%3;return i(1===r||-1===r?2.154434690031883*e:0!==r?4.641588833612778*e:e,Math.floor(this.e/3))},a.prototype.sinh=function(){return this.exp().sub(this.negate().exp()).div(2)},a.prototype.cosh=function(){return this.exp().add(this.negate().exp()).div(2)},a.prototype.tanh=function(){return this.sinh().div(this.cosh())},a.prototype.asinh=function(){return a.ln(this.add(this.sqr().add(1).sqrt()))},a.prototype.acosh=function(){return a.ln(this.add(this.sqr().sub(1).sqrt()))},a.prototype.atanh=function(){return this.abs().gte(1)?Number.NaN:a.ln(this.add(1).div(new a(1).sub(this)))/2},a.prototype.ascensionPenalty=function(t){return 0===t?this:this.pow(Math.pow(10,-t))},a.prototype.egg=function(){return this.add(9)},a.prototype.lessThanOrEqualTo=function(t){return this.cmp(t)<1},a.prototype.lessThan=function(t){return this.cmp(t)<0},a.prototype.greaterThanOrEqualTo=function(t){return this.cmp(t)>-1},a.prototype.greaterThan=function(t){return this.cmp(t)>0},a.prototype.decimalPlaces=function(){return this.dp()},a.prototype.dp=function(){if(!isFinite(this.mantissa))return NaN;if(this.exponent>=17)return 0;for(var t=this.mantissa,n=-this.exponent,e=1;Math.abs(Math.round(t*e)/e-t)>1e-10;)e*=10,n++;return n>0?n:0},Object.defineProperty(a,"MAX_VALUE",{get:function(){return h},enumerable:!1,configurable:!0}),Object.defineProperty(a,"MIN_VALUE",{get:function(){return c},enumerable:!1,configurable:!0}),Object.defineProperty(a,"NUMBER_MAX_VALUE",{get:function(){return p},enumerable:!1,configurable:!0}),Object.defineProperty(a,"NUMBER_MIN_VALUE",{get:function(){return f},enumerable:!1,configurable:!0}),a}(),h=o(1,n),c=o(1,-n),p=r(Number.MAX_VALUE),f=r(Number.MIN_VALUE);/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (a);


/***/ }),

/***/ "./node_modules/pad-end/index.js":
/*!***************************************!*\
  !*** ./node_modules/pad-end/index.js ***!
  \***************************************/
/***/ ((module) => {



module.exports = function (string, maxLength, fillString) {

  if (string == null || maxLength == null) {
    return string;
  }

  var result    = String(string);
  var targetLen = typeof maxLength === 'number'
    ? maxLength
    : parseInt(maxLength, 10);

  if (isNaN(targetLen) || !isFinite(targetLen)) {
    return result;
  }


  var length = result.length;
  if (length >= targetLen) {
    return result;
  }


  var filled = fillString == null ? '' : String(fillString);
  if (filled === '') {
    filled = ' ';
  }


  var fillLen = targetLen - length;

  while (filled.length < fillLen) {
    filled += filled;
  }

  var truncated = filled.length > fillLen ? filled.substr(0, fillLen) : filled;

  return result + truncated;
};


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.mjs":
/*!******************************************!*\
  !*** ./node_modules/tslib/tslib.es6.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
  function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose;
    if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buyBuilding: () => (/* binding */ buyBuilding),
/* harmony export */   changeWorkerAmount: () => (/* binding */ changeWorkerAmount),
/* harmony export */   hireWorker: () => (/* binding */ hireWorker),
/* harmony export */   sellResources: () => (/* binding */ sellResources)
/* harmony export */ });
/* harmony import */ var break_infinity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! break_infinity.js */ "./node_modules/break_infinity.js/dist/break_infinity.esm.js");
/* harmony import */ var _antimatter_dimensions_notations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @antimatter-dimensions/notations */ "./node_modules/@antimatter-dimensions/notations/dist/ad-notations.esm.js");


const mixedScientific=new _antimatter_dimensions_notations__WEBPACK_IMPORTED_MODULE_1__.MixedScientificNotation();
let resources={
	money:{amt:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](15)},
	wheat:{amt:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0),er:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](2)},
	cotton:{amt:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0),er:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](5)},
	stone:{amt:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0),er:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](3)},
	metal:{amt:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0),er:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](7)},
	coal:{amt:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0),er:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](4)}
};
let previousResources={money:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](15),wheat:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0),cotton:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0),stone:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0),metal:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0),coal:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0)};
let buildings={
	farm:{amt:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0),price:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](15),rate1:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0.15),rate2:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0.07)},
	mine:{amt:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0),price:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](100),rate1:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0.13),rate2:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0.06),rate3:new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0.1)}
};
let employees=[];
function addEmployee(name, intelligence, charisma, strength, vitality, dexterity){
	employees.push({name:name, intelligence:intelligence, charisma:charisma, strength:strength, vitality:vitality, dexterity:dexterity});
}
function buyBuilding(building){
	if(resources.money.amt.greaterThanOrEqualTo(buildings[building].price)){
		resources.money.amt=resources.money.amt.minus(buildings[building].price);
		buildings[building].price=buildings[building].price.times(1.2);
		buildings[building].amt=buildings[building].amt.add(1);
	}
}
function hireWorker(){

}
function updateValues(){
	document.getElementById("money").innerHTML=mixedScientific.format(resources.money.amt,2,2);
	document.getElementById("wheat").innerHTML=mixedScientific.format(resources.wheat.amt,2,2);
	document.getElementById("cotton").innerHTML=mixedScientific.format(resources.cotton.amt,2,2);
	document.getElementById("stone").innerHTML=mixedScientific.format(resources.stone.amt,2,2);
	document.getElementById("metal").innerHTML=mixedScientific.format(resources.metal.amt,2,2);
	document.getElementById("coal").innerHTML=mixedScientific.format(resources.coal.amt,2,2);
	document.getElementById("farmCost").innerHTML=mixedScientific.format(buildings.farm.price,2,2)+" Money";
	document.getElementById("farms").innerHTML=mixedScientific.format(buildings.farm.amt,0,0);
	document.getElementById("mineCost").innerHTML=mixedScientific.format(buildings.mine.price,2,2)+" Money";
	document.getElementById("mines").innerHTML=mixedScientific.format(buildings.mine.amt,0,0);
	document.getElementById("moneyPS").innerHTML=mixedScientific.format((resources.money.amt.minus(previousResources.money).times(20)),2,2);
	document.getElementById("wheatPS").innerHTML=mixedScientific.format((resources.wheat.amt.minus(previousResources.wheat).times(20)),2,2);
	document.getElementById("cottonPS").innerHTML=mixedScientific.format((resources.cotton.amt.minus(previousResources.cotton).times(20)),2,2);
	document.getElementById("stonePS").innerHTML=mixedScientific.format((resources.stone.amt.minus(previousResources.stone).times(20)),2,2);
	document.getElementById("metalPS").innerHTML=mixedScientific.format((resources.metal.amt.minus(previousResources.metal).times(20)),2,2);
	document.getElementById("coalPS").innerHTML=mixedScientific.format((resources.coal.amt.minus(previousResources.coal).times(20)),2,2);
}
function sellResources(){
	for (let i = 1; i < Object.keys(resources).length; i++) {
		resources.money.amt=resources.money.amt.add((resources[Object.keys(resources)[i]].amt*resources[Object.keys(resources)[i]].er));
		resources[Object.keys(resources)[i]].amt=new break_infinity_js__WEBPACK_IMPORTED_MODULE_0__["default"](0);
	}
}
function storePastValues(){
	for (let i = 0; i < Object.keys(resources).length; i++) {
		previousResources[Object.keys(resources)[i]]=resources[Object.keys(resources)[i]].amt;
	}
}
function changeWorkerAmount(building,amount){

}
function runGameTick(){
	storePastValues();
	resources.wheat.amt=resources.wheat.amt.add(buildings.farm.amt.times(buildings.farm.rate1.dividedBy(20)));
	resources.cotton.amt=resources.cotton.amt.add(buildings.farm.amt.times(buildings.farm.rate2.dividedBy(20)));
	resources.stone.amt=resources.stone.amt.add(buildings.mine.amt.times(buildings.mine.rate1.dividedBy(20)));
	resources.metal.amt=resources.metal.amt.add(buildings.mine.amt.times(buildings.mine.rate2.dividedBy(20)));
	resources.coal.amt=resources.coal.amt.add(buildings.mine.amt.times(buildings.mine.rate3.dividedBy(20)));
	document.title = "$"+mixedScientific.format(resources.money.amt,2,2)+" - Dynasty Incremental";
	updateValues();
}
setInterval(runGameTick,50);
})();

lib = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=main.js.map