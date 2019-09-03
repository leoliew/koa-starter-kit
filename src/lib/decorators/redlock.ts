import { BaseRedLock, Logger } from '../index'

/**
 * @param type
 * @param resource
 * @param lockId
 * @param ttl
 */
export function redlock (type: string, resource: string, lockId: string, ttl = 5000): any {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = async function (...args) {
      await BaseRedLock.getInstance(type).lockProcess(
        `${args[0][lockId]}_${resource}`,
        ttl,
        async () => {
          await originalMethod.apply(this, args)
        }
      )
    }
    return descriptor
  }
}
