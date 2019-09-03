// for some simple crypto like md5

import * as crypto from 'crypto'

export class Crypto {
  static MD5Encrypt (encryptString) {
    const hasher = crypto.createHash('md5')
    hasher.update(encryptString)
    return hasher.digest('hex')
  }
}
