import type { Method } from '../types';

/**
 * The base class for errors in `Josh`
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

  /**
   * The context for this error.
   * @since 2.0.0
   */
  public context: Record<PropertyKey, unknown>;

  public constructor(options: JoshProviderErrorOptions) {
    const { name, identifier, method, context } = options;

    super(JoshProviderError.formatMessage(options));
    this.name = name ?? 'JoshError';
    this.identifier = identifier;
    this.method = method ?? null;
    this.context = context ?? {};
  }

  public static formatMessage: (options: JoshProviderErrorOptions) => string | undefined = ({ message }) => message;
}

/**
 * The options for `JoshError`
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
   * The context for this error.
   * @since 2.0.0
   */
  context?: Record<PropertyKey, unknown>;

  /**
   * The message for this error.
   * @since 2.0.0
   */
  message?: string;
}
