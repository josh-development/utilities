export interface QueryOperators<Value> {
  ne?: Value; // Not equal
  gt?: Value; // Greater than
  gte?: Value; // Greater than or equal to
  lt?: Value; // Less than
  lte?: Value; // Less than or equal to
  in?: Value[]; // In array
  nin?: Value[]; // Not in array
  regex?: RegExp; // Regular expression
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
