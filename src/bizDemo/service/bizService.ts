import { Logger, transaction, ITransaction } from '../../lib'
import { Account, Order } from '../model'

interface ITransferParams extends ITransaction {
  from: string,
  to: string,
  amount: number
}

export class BizService {
  @transaction
  async transfer (params: ITransferParams) {
    const {session, from, to, amount} = params
    const opts = {new: true, session}
    Logger.info(`start transfer: from ${from} to ${to}, amount ${amount}`)
    await Order.create({
      from,
      to,
      amount
    })
    const subInfo = await Account.findOneAndUpdate({name: from}, {$inc: {balance: -amount}}, opts)
    if (subInfo.balance < 0) throw Error('Subtract account balance not enough')
    const addInfo = await Account.findOneAndUpdate({name: to}, {$inc: {balance: amount}}, opts)
    Logger.info(`transfer done: ${subInfo.name} balance ${subInfo.balance}, ${addInfo.name} balance ${addInfo.balance}`)
    return [subInfo, addInfo]
  }

  @transaction
  async wrongFunc (from, to, amount) {
    console.log(from, to, amount)
    return 0
  }
}
