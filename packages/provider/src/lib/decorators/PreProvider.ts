import { Trigger } from '../types';

/**
 * Decorator function that marks a method to be run pre provider.
 * @since 1.0.0
 */
export function PreProvider(): MethodDecorator {
  return (target, propertyKey) => {
    if (!Reflect.hasMetadata(Trigger.PreProvider, target.constructor)) {
      Reflect.defineMetadata(Trigger.PreProvider, [], target.constructor);
    }

    const methods = Reflect.getMetadata(Trigger.PreProvider, target.constructor);

    if (Array.isArray(methods)) {
      methods.push(propertyKey);
    }
  };
}
