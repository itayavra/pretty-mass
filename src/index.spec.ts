import {prettyMetric, Units} from './index';

describe('metric', () => {
  it('should print t', () => {
    expect(prettyMetric(10_000_000)).toEqual('10 t');
    expect(prettyMetric(1_000_000)).toEqual('1 t');
    expect(prettyMetric(1_234_567)).toEqual('1.234 t');
    expect(prettyMetric(1_234_567, { maxFractionDigits: 1 })).toEqual('1.2 t');
    expect(prettyMetric(1_234_567, { verbose: true, maxFractionDigits: 0 })).toEqual('1 tonne');
    expect(prettyMetric(1_234_567, { verbose: true, maxFractionDigits: 5 })).toEqual('1.23456 tonne');
    expect(prettyMetric(1_234_567, { verbose: true, maxFractionDigits: 10 })).toEqual('1.234567 tonne');
    expect(prettyMetric(1_234_567.89, { verbose: true, maxFractionDigits: 10 })).toEqual('1.23456789 tonne');
    expect(prettyMetric(1_234_567.89, { verbose: true, maxFractionDigits: false })).toEqual('1.23456789 tonne');
    expect(prettyMetric(1_234_567_890.987654, { verbose: true, maxFractionDigits: false })).toEqual(
      '1,234.567890987654 tonne',
    );
    expect(prettyMetric(1_234_567_890, { verbose: true, maxFractionDigits: false })).toEqual('1,234.56789 tonne');
    expect(prettyMetric(1_234_567_890, { verbose: true, maxFractionDigits: false, formatResult: false })).toEqual(
      '1234.56789 tonne',
    );

    expect(prettyMetric(100_000_000.001, { targetUnit: Units.T })).toBe('100 t');
    expect(prettyMetric(100_000, { targetUnit: Units.T })).toBe('0.1 t');
    expect(prettyMetric(1000, { targetUnit: Units.T })).toBe('0.001 t');
    expect(prettyMetric(0.1, { targetUnit: Units.T, maxFractionDigits: false })).toBe('0.0000001 t');
    expect(prettyMetric(0.1, { targetUnit: Units.T, maxFractionDigits: 400 })).toBe('0.0000001 t');
    expect(prettyMetric(0.1, { targetUnit: Units.T, maxFractionDigits: 7 })).toBe('0.0000001 t');
    expect(prettyMetric(0.1, { targetUnit: Units.T, maxFractionDigits: 0 })).toBe('0 t');
    expect(prettyMetric(0.1, { targetUnit: Units.T })).toBe('0 t');
  });

  it('should print kg', () => {
    expect(prettyMetric(123_456)).toEqual('123.456 kg');
    expect(prettyMetric(123_456.789)).toEqual('123.456 kg');
    expect(prettyMetric(123_456, { verbose: true })).toEqual('123.456 kilogram');
    expect(prettyMetric(123_456, { verbose: true, maxFractionDigits: 0 })).toEqual('123 kilogram');
    expect(prettyMetric(123_456, { verbose: true, maxFractionDigits: 1 })).toEqual('123.4 kilogram');
    expect(prettyMetric(123_456, { verbose: true, maxFractionDigits: 5 })).toEqual('123.456 kilogram');
    expect(prettyMetric(123_456.789, { verbose: true, maxFractionDigits: 5 })).toEqual('123.45678 kilogram');
    expect(prettyMetric(123_456.789, { verbose: true, maxFractionDigits: false })).toEqual('123.456789 kilogram');

    expect(prettyMetric(100_000_000.001, { targetUnit: Units.KG })).toBe('100,000 kg');
    expect(prettyMetric(100_000_000.001, { targetUnit: Units.KG, maxFractionDigits: 6 })).toBe('100,000.000001 kg');
    expect(prettyMetric(100_000_000, { targetUnit: Units.KG })).toBe('100,000 kg');
    expect(prettyMetric(1000, { targetUnit: Units.KG })).toBe('1 kg');
    expect(prettyMetric(100, { targetUnit: Units.KG })).toBe('0.1 kg');
    expect(prettyMetric(1, { targetUnit: Units.KG })).toBe('0.001 kg');
    expect(prettyMetric(0.1, { targetUnit: Units.KG })).toBe('0 kg');
  });

  it('should print g', () => {
    expect(prettyMetric(123)).toEqual('123 g');
    expect(prettyMetric(123.4)).toEqual('123.4 g');
    expect(prettyMetric(1.2345)).toEqual('1.234 g');
    expect(prettyMetric(0.12345)).toEqual('0.123 g');
    expect(prettyMetric(123.456, { maxFractionDigits: 0 })).toEqual('123 g');
    expect(prettyMetric(123.456, { maxFractionDigits: 1 })).toEqual('123.4 g');
    expect(prettyMetric(0.12345, { maxFractionDigits: 1 })).toEqual('0.1 g');
    expect(prettyMetric(0.12345, { maxFractionDigits: false })).toEqual('0.12345 g');
    expect(prettyMetric(123, { verbose: true, maxFractionDigits: 5 })).toEqual('123 gram');
    expect(prettyMetric(123.456, { verbose: true, maxFractionDigits: 5 })).toEqual('123.456 gram');

    expect(prettyMetric(100_000_000.001, { targetUnit: Units.G })).toBe('100,000,000.001 g');
    expect(prettyMetric(100_000_000, { targetUnit: Units.G })).toBe('100,000,000 g');
    expect(prettyMetric(100, { targetUnit: Units.G })).toBe('100 g');
    expect(prettyMetric(1, { targetUnit: Units.G, maxFractionDigits: false })).toBe('1 g');
    expect(prettyMetric(0.1, { targetUnit: Units.G })).toBe('0.1 g');
  });
});