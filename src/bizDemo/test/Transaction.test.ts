import { bizService } from '../service'
import { Account, Order } from '../model'
import { Logger } from '../../lib'

describe.skip('转账with事务装饰器测试', () => {
  beforeEach(async () => {
    await Account.create([{ name: 'John', balance: 10 }, { name: 'Doe', balance: 10 }])
    Logger.info('data initiated')
  })

  test('转账成功', async () => {
    const params = {
      from: 'John',
      to: 'Doe',
      amount: 6
    }
    const ret = await bizService.transfer(params)
    const order = await Order.findOne({ from: 'John', to: 'Doe', amount: 6 })
    expect(order).not.toEqual(null)
    expect(ret[0].balance).toBe(4)
    expect(ret[1].balance).toBe(16)
  })

  test('转账失败', async () => {
    const params = {
      from: 'John',
      to: 'Doe',
      amount: 11
    }
    try {
      await bizService.transfer(params)
    } catch (err) {
      expect(err.message).toBe('Subtract account balance not enough')
    }
    const john = await Account.findOne({ name: 'John' })
    const doe = await Account.findOne({ name: 'Doe' })
    const order = await Order.findOne({ from: 'John', to: 'Doe', amount: 6 })
    expect(order).toEqual(null)
    expect(john.balance).toBe(10)
    expect(doe.balance).toBe(10)
  })

  test('错误装饰函数', async () => {
    try {
      await bizService.wrongFunc('A', 'B', 100)
    } catch (err) {
      expect(err.message).toBe('被装饰函数wrongFunc参数格式错误')
    }
  })
})
