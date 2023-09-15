import { MathOperator, doMath } from '../../../src';

describe('doMath', () => {
  test(MathOperator.Addition, () => {
    expect(doMath(MathOperator.Addition, 1, 1)).toBe(2);
    expect(doMath(MathOperator.Addition, 1, 2)).toBe(3);
    expect(doMath(MathOperator.Addition, 2, 1)).toBe(3);
  });

  test(MathOperator.Subtraction, () => {
    expect(doMath(MathOperator.Subtraction, 1, 1)).toBe(0);
    expect(doMath(MathOperator.Subtraction, 1, 2)).toBe(-1);
    expect(doMath(MathOperator.Subtraction, 2, 1)).toBe(1);
  });

  test(MathOperator.Multiplication, () => {
    expect(doMath(MathOperator.Multiplication, 1, 1)).toBe(1);
    expect(doMath(MathOperator.Multiplication, 1, 2)).toBe(2);
    expect(doMath(MathOperator.Multiplication, 2, 1)).toBe(2);
  });

  test(MathOperator.Division, () => {
    expect(doMath(MathOperator.Division, 1, 1)).toBe(1);
    expect(doMath(MathOperator.Division, 1, 2)).toBe(0.5);
    expect(doMath(MathOperator.Division, 2, 1)).toBe(2);
  });

  test(MathOperator.Remainder, () => {
    expect(doMath(MathOperator.Remainder, 1, 1)).toBe(0);
    expect(doMath(MathOperator.Remainder, 1, 2)).toBe(1);
    expect(doMath(MathOperator.Remainder, 2, 1)).toBe(0);
  });

  test(MathOperator.Exponent, () => {
    expect(doMath(MathOperator.Exponent, 1, 1)).toBe(1);
    expect(doMath(MathOperator.Exponent, 1, 2)).toBe(1);
    expect(doMath(MathOperator.Exponent, 2, 1)).toBe(2);
  });
});
