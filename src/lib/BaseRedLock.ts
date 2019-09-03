const Redlock = require('redlock')
const {redis} = require('../connection')
import AppError from './AppError'

let singleton = Symbol('singleton')
const singletonEnforcer = Symbol('singletonEnforcer')

const MUTEX = 'mutex' // 互斥锁
const RETRY = 'retry' // 重试锁

class BaseRedLock {
  redlock

  constructor (enforcer, type) {
    if (enforcer !== singletonEnforcer) {
      throw new AppError('Cannot construct singleton')
    }

    let options = {
      driftFactor: 0.01,
      // 重试次数
      retryCount: 3,
      // 每秒重试一次
      retryDelay: 1000
    }
    if (type === MUTEX) {
      options.retryCount = 0
      options.retryDelay = 0
    }

    this.redlock = new Redlock([redis], options)
    this.redlock.on('clientError', function (err) {
      throw new AppError('A redis error has occurred:' + err)
    })
  }

  /**
   * 构造单例的实例
   */
  static getInstance (type) {
    if (!this[singleton]) {
      this[singleton] = new BaseRedLock(singletonEnforcer, type)
    }
    return this[singleton]
  }

  /**
   * 锁操作
   *
   * @param {String} resource 要加锁的资源
   * @param {String} ttl 加锁时间(ms)
   * @param {Function} operation 操作
   */
  async lockProcess (resource, ttl, operation) {
    // 默认锁24小时
    ttl = ttl || 60 * 60 * 24
    let lock
    try {
      lock = await this.redlock.lock(resource, ttl)
    } catch (err) {
      console.warn('RetryLock err:' + err)
      throw new AppError('尝试锁资源' + resource + '失败')
    }
    console.info('加锁成功:', resource, ttl)
    let result
    try {
      result = await operation()
    } catch (e) {
      console.warn('lockProcess error' + e)
      await lock.unlock()
      if (e instanceof AppError) {
        throw new AppError(`${e.message}`, e.code)
      } else {
        throw e
      }
    }
    await lock.unlock()
    console.info('解锁成功:', resource, ttl)

    return result
  }
}

export default BaseRedLock
