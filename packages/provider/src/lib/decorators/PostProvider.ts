import { Trigger } from '../types';

/**
 * Decorator function that marks a method to be run post provider.
 * @since 1.0.0
 */
export function PostProvider(): MethodDecorator {
  return (target, propertyKey) => {
    if (!Reflect.hasMetadata(Trigger.PostProvider, target.constructor)) {
      Reflect.defineMetadata(Trigger.PostProvider, [], target.constructor);
    }

    const methods = Reflect.getMetadata(Trigger.PostProvider, target.constructor);

    if (Array.isArray(methods)) {
      methods.push(propertyKey);
    }
  };
}
