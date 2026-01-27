enum Operators {
  Equal = 'equal',
  NotEqual = 'notEqual',
  GreaterThan = 'greaterThan',
  GreaterThanOrEqual = 'greaterThanOrEqual',
  LessThan = 'lessThan',
  LessThanOrEqual = 'lessThanOrEqual',
  In = 'in',
  NotIn = 'notIn',
  Contains = 'contains',
  NotContains = 'notContains',
  Regex = 'regex'
}

export interface QueryOperators<Value> {
  [Operators.Equal]?: Value; // Not equal
  [Operators.NotEqual]?: Value; // Not equal
  [Operators.GreaterThan]?: Value; // Greater than
  [Operators.GreaterThanOrEqual]?: Value; // Greater than or equal
  [Operators.LessThan]?: Value; // Less than
  [Operators.LessThanOrEqual]?: Value; // Less than or equal
  [Operators.In]?: Value[]; // In
  [Operators.NotIn]?: Value[]; // Not in
  [Operators.Contains]?: Value; // Contains
  [Operators.NotContains]?: Value; // Not contains
  [Operators.Regex]?: RegExp; // Regex
}

export type QueryOptions<Value> =
  | {
      [key in keyof Value]: QueryOptions<Value[keyof Value]> | Value;
    }
  | QueryOperators<Value>;

export interface Query<StoredValue> {
  key?: string | QueryOperators<string>;
  value?: StoredValue | QueryOptions<StoredValue>;
}
