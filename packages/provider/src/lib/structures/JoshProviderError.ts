import type { Method } from '../types';

/**
 * The base class for errors in {@link Josh}
 * @since 2.0.0
 */
export class JoshProviderError extends Error {
  /**
   * The identifier for this error.
   * @since 2.0.0
   */
  public identifier: string;

  /**
   * The method this error applies to.
   * @since 2.0.0
   */
  public method: Method | null;

  public constructor(options: JoshProviderErrorOptions) {
    const { name, message, identifier, method } = options;

    super(message);
    this.name = name ?? 'JoshError';
    this.identifier = identifier;
    this.method = method ?? null;
  }
}

/**
 * The options for {@link JoshError}
 * @since 2.0.0
 */
export interface JoshProviderErrorOptions {
  /**
   * The name for this error.
   * @since 2.0.0
   */
  name?: string;

  /**
   * The identifier for this error.
   * @since 2.0.0
   */
  identifier: string;

  /**
   * The method this error applies to.
   * @since 2.0.0
   */
  method?: Method;

  /**
   * The message for this error.
   * @since 2.0.0
   */
  message?: string;
}
