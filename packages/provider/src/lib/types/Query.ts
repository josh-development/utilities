export interface QueryOptions<Value> {
  ne?: Value;
  gt?: Value;
  gte?: Value;
  lt?: Value;
  lte?: Value;
  in?: Value[];
  nin?: Value[];
  regex?: RegExp;
}

export interface QueryOptionsValue<Value> extends QueryOptions<Value> {
  path?: [];
}

// TODO: Need Nova's ts expertise to match type of Value with the path specified

export interface Query<StoredValue> {
  key?: string | QueryOptions<string>;
  value?: StoredValue | QueryOptionsValue<StoredValue>;
}
