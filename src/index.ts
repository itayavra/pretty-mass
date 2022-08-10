export enum Units {
  G = 'g',
  KG = 'kg',
  T = 't',
}

export interface IMetricOptions {
  verbose?: boolean;
  targetUnit?: Units;
  formatResult?: boolean;
  maxFractionDigits?: number | false;
}

const defaultMetricOptions: IMetricOptions = {
  verbose: false,
  formatResult: true,
  maxFractionDigits: 3,
};

export const prettyMetric = (grams: number, options: IMetricOptions = {}) => {
  const _options: IMetricOptions = { ...defaultMetricOptions, ...options };

  if ((!_options.targetUnit && grams >= 1_000_000) || _options.targetUnit === Units.T) {
    const t = truncateFractionDigitsIfNeeded(grams / 1_000_000, _options.maxFractionDigits);
    const formatted = formatNumberIfNeeded(t, _options.formatResult);
    return options.verbose ? `${formatted} tonne` : `${formatted} t`;
  }

  if ((!_options.targetUnit && grams >= 1_000) || _options.targetUnit === Units.KG) {
    const kg = truncateFractionDigitsIfNeeded(grams / 1000, _options.maxFractionDigits);
    const formatted = formatNumberIfNeeded(kg, _options.formatResult);
    return options.verbose ? `${formatted} kilogram` : `${formatted} kg`;
  }

  if (!_options.targetUnit || _options.targetUnit === Units.G) {
    const g = truncateFractionDigitsIfNeeded(grams, _options.maxFractionDigits);
    const formatted = formatNumberIfNeeded(g, _options.formatResult);
    return options.verbose ? `${formatted} gram` : `${formatted} g`;
  }
};

function truncateFractionDigitsIfNeeded(number: number, maxFractionDigits: number | false = false): string {
  const scientificNotationIndex = number.toString().indexOf('e-');
  if (scientificNotationIndex >= 0) {
    const exponent = Number(number.toString()[scientificNotationIndex + 2]);
    return maxFractionDigits === false || maxFractionDigits >= exponent
      ? number.toFixed(exponent)
      : parseFloat(number.toFixed(maxFractionDigits)).toString();
  }

  if (maxFractionDigits === false) {
    return number.toString();
  }

  const regExp = new RegExp(`^-?\\d+(?:.\\d{0,${maxFractionDigits || -1}})?`);
  return Number(number.toString().match(regExp)?.[0]).toString() || number.toString();
}

function formatNumberIfNeeded(numberString: string, formatResult = true) {
  if (!formatResult) {
    return numberString;
  }

  let [integerString, fractionString] = numberString.split('.');
  integerString = integerString.split(/(?=(?:\d{3})+(?:\.|$))/g).join(',');

  if (fractionString) {
    return `${integerString}.${fractionString}`;
  }

  return integerString;
}
