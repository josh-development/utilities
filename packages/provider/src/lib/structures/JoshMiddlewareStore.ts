import type { NonNullObject } from '@sapphire/utilities';
import { Method, Trigger } from '../types';
import type { JoshMiddleware } from './JoshMiddleware';
import type { JoshProvider } from './JoshProvider';

/**
 * The store to contain {@link JoshMiddleware} classes.
 * @since 1.0.0
 */
export class JoshMiddlewareStore<StoredValue = unknown> extends Map<string, JoshMiddleware<NonNullObject, StoredValue>> {
  /**
   * The {@link JoshProvider} instance for this store.
   * @since 1.0.0
   */
  public provider: JoshProvider<StoredValue>;

  public constructor(options: JoshMiddlewareStoreOptions<StoredValue>) {
    super();

    const { provider } = options;

    this.provider = provider;
  }

  /**
   * Get pre provider middlewares by method.
   * @since 1.0.0
   * @param method The method to filter by.
   * @returns The filtered middlewares
   */
  public getPreMiddlewares(method: Method): JoshMiddleware<NonNullObject, StoredValue>[] {
    return this.filterByCondition(method, Trigger.PreProvider);
  }

  /**
   * Get post provider middlewares by method.
   * @since 1.0.0
   * @param method The method to filter by.
   * @returns The filtered middlewares.
   */
  public getPostMiddlewares(method: Method): JoshMiddleware<NonNullObject, StoredValue>[] {
    return this.filterByCondition(method, Trigger.PostProvider);
  }

  /**
   * Filter middlewares by their conditions.
   * @since 1.0.0
   * @param method The method to filter by.
   * @param trigger The trigger to filter by.
   * @returns The filtered middlewares.
   */
  private filterByCondition(method: Method, trigger: Trigger): JoshMiddleware<NonNullObject, StoredValue>[] {
    return Array.from(this.values()).filter((JoshMiddleware) =>
      trigger === Trigger.PreProvider
        ? JoshMiddleware.conditions[Trigger.PreProvider].includes(method)
        : JoshMiddleware.conditions[Trigger.PostProvider].includes(method)
    );
  }
}

export interface JoshMiddlewareStoreOptions<StoredValue = unknown> {
  provider: JoshProvider<StoredValue>;
}
