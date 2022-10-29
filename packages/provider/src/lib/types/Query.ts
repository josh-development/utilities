export interface QueryOptions<Value> {
  ne: Value;
  gt: Value;
  gte: Value;
  lt: Value;
  lte: Value;
  in: Value[];
  nin: Value[];
  regex: RegExp;
}

export interface Query<StoredValue> {
  key: string | QueryOptions<string>;
  value: StoredValue | QueryOptions<StoredValue>;
}
