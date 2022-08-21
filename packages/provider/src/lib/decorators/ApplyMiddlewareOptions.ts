import type { Ctor, NonNullableProperties, PartialRequired } from '@sapphire/utilities';
import type { JoshMiddleware } from '../structures/JoshMiddleware';
import { createClassDecorator } from './utils/createClassDecorator';
import { createProxy } from './utils/createProxy';

/**
 * Decorator function that applies given options to {@link JoshMiddleware} class.
 * @since 1.0.0
 * @param options The middleware options.
 *
 * @example
 * ```typescript
 * import { ApplyMiddlewareOptions, Middleware } from '@joshdb/provider';
 *
 * @ApplyMiddlewareOptions({
 *   name: 'name',
 *   // More options...
 * })
 * export class CoreMiddleware extends JoshMiddleware {}
 * ``` */
export function ApplyMiddlewareOptions(options: PartialRequired<JoshMiddleware.Options, 'name'>): ClassDecorator {
  return createClassDecorator((target: Ctor<ConstructorParameters<typeof JoshMiddleware>, JoshMiddleware<NonNullableProperties>>) =>
    createProxy(target, {
      construct(ctor, [context]) {
        const pre = Reflect.getMetadata('pre', target.constructor) ?? [];
        const post = Reflect.getMetadata('post', target.constructor) ?? [];

        return new ctor(context, { ...options, conditions: { pre, post } });
      }
    })
  );
}
