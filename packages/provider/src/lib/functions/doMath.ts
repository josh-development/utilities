import { MathOperator } from '../types';

export function doMath(operator: string, data: number, operand: number): number {
  switch (operator) {
    case MathOperator.Addition:
      data += operand;

      break;

    case MathOperator.Subtraction:
      data -= operand;

      break;

    case MathOperator.Multiplication:
      data *= operand;

      break;

    case MathOperator.Division:
      data /= operand;

      break;

    case MathOperator.Remainder:
      data %= operand;

      break;

    case MathOperator.Exponent:
      data **= operand;

      break;
  }

  return data;
}
