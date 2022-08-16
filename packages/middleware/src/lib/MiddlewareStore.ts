import { JoshProvider, Method, Trigger } from '@joshdb/provider';
import type { NonNullObject } from '@sapphire/utilities';
import type { Middleware } from './Middleware';

/**
 * The store to contain {@link Middleware} classes.
 * @since 1.0.0
 */
export class MiddlewareStore<StoredValue = unknown> extends Map<string, Middleware<NonNullObject, StoredValue>> {
  /**
   * The link {@link JoshProvider} instance for this store.
   * @since 1.0.0
   */
  public provider: JoshProvider<StoredValue>;

  public constructor(options: MiddlewareStoreOptions<StoredValue>) {
    super();

    const { provider } = options;

    this.provider = provider;
  }

  /**
   * Get pre provider middlewares by method.
   * @since 1.0.0
   * @param method The method to filter by.
   * @returns The middlewares after filtered.
   */
  public getPreMiddlewares(method: Method): Middleware<NonNullObject, StoredValue>[] {
    return this.filterByCondition(method, Trigger.PreProvider);
  }

  /**
   * Get post provider middlewares by method.
   * @since 1.0.0
   * @param method The method to filter by.
   * @returns The middlewares after filtered.
   */
  public getPostMiddlewares(method: Method): Middleware<NonNullObject, StoredValue>[] {
    return this.filterByCondition(method, Trigger.PostProvider);
  }

  /**
   * Filter middlewares by their conditions.
   * @since 1.0.0
   * @param method
   * @param trigger
   * @returns
   */
  private filterByCondition(method: Method, trigger: Trigger): Middleware<NonNullObject, StoredValue>[] {
    return Array.from(this.values()).filter((middleware) =>
      trigger === Trigger.PreProvider ? middleware.conditions.pre.includes(method) : middleware.conditions.post.includes(method)
    );
  }
}

export interface MiddlewareStoreOptions<StoredValue = unknown> {
  provider: JoshProvider<StoredValue>;
}
