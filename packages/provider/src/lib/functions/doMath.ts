import { MathOperator } from '../types';

/**
 * Perform a math operation on the data.
 * @param operator The math operator to use.
 * @param data The data to perform the operation on.
 * @param operand The operand to use in the operation.
 * @returns The result of the operation.
 * @since 1.0.0
 */
export function doMath(operator: MathOperator, data: number, operand: number): number {
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
