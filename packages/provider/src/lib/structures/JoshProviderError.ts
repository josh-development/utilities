import type { Method } from '../types';

/**
 * An error to be used in providers and middlewares.
 * @since 1.0.0
 */
export class JoshProviderError extends Error {
  /**
   * The identifier for this error.
   * @since 1.0.0
   */
  public identifier: string;

  /**
   * The method this error applies to.
   * @since 1.0.0
   */
  public method: Method | null;

  /**
   * The origin of this error.
   * @since 1.0.0
   */
  public origin: JoshProviderError.Origin;

  /**
   * The context for this error.
   * @since 1.0.0
   */
  public context: Record<PropertyKey, unknown>;

  public constructor(options: JoshProviderError.Options) {
    const { name, identifier, method, origin, context } = options;

    super(JoshProviderError.formatMessage(options));
    this.name = name ?? 'JoshProviderError';
    this.identifier = identifier;
    this.method = method ?? null;
    this.origin = origin;
    this.context = context ?? {};
  }

  public static formatMessage: (options: JoshProviderError.Options) => string | undefined = ({ message }) => message;
}

export namespace JoshProviderError {
  /**
   * The options for {@link JoshProviderError}.
   * @since 1.0.0
   */
  export interface Options {
    /**
     * The name for this error.
     * @since 1.0.0
     */
    name?: string;

    /**
     * The identifier for this error.
     * @since 1.0.0
     */
    identifier: string;

    /**
     * The method this error applies to.
     * @since 1.0.0
     */
    method?: Method;

    /**
     * The origin of this error.
     * @since 1.0.0
     */
    origin: Origin;

    /**
     * The context for this error.
     * @since 1.0.0
     */
    context?: Record<PropertyKey, unknown>;

    /**
     * The message for this error.
     * @since 1.0.0
     */
    message?: string;
  }

  export interface Origin {
    /**
     * The origin type for this origin.
     * @since 1.0.0
     */
    type: OriginType;

    /**
     * The origin name for this origin.
     * @since 1.0.0
     */
    name: string;
  }

  /**
   * The origin type for {@link JoshProviderError.Origin}.
   * @since 1.0.0
   */
  export enum OriginType {
    Provider = 'provider',

    Middleware = 'middleware',
  }
}
