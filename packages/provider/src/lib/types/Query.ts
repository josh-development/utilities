export interface QueryOperators<Value> {
  ne?: Value;
  gt?: Value;
  gte?: Value;
  lt?: Value;
  lte?: Value;
  in?: Value[];
  nin?: Value[];
  regex?: RegExp;
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
