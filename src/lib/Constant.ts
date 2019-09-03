import * as config from 'config'

const Constant = {
  VERIFICATION_CODE: {
    TYPE: {
      LOGIN: 'LOGIN' // 登录app
    }
  },

  TOKEN: {
    SECRET: '8uouo00ouou8', // 加密密钥,
    EXPIRES_IN: 2 * 24 * 60 * 60 // 过期时间，秒数
  },

  RESPONSE: {
    SUCCESS: 0, // 成功
    FAILURE: 1, // 错误
    MINOR_FAIL: 2, // 轻微错误（用于区别捕获时与1区别）
    MINOR_FAIL_NO_BINDING: 4, // 轻微错误（用户未绑定微信公众号时）
    AUTH_FAIL: 401, // 用户授权验证失败
    BUSINESS_CODE: {
      WARN_CODE: 10000
    },
    SYSTEM_ERROR: 3
  },
  USER_INFO_OPTIONS: {
    PERSONAL_INFO: 'personalInfo', // 个人信息
    EMPLOYMENT_INFO: 'employmentInfo', // 企业信息
    BANK_DETAIL: 'bankDetail', // 银行卡信息 (借款APP专用)
    KYC_DOCUMENTS: 'KYC', // KYC 验证
    LOAN_HISTORIES: 'loanHistories' // 借款历史(征信APP专用)
  },

  // 学历
  EDUCATION_QUALIFICATION: {
    PRIMARY_SCHOOL: 'Primary School', // 小学
    SENIOR_SCHOOL: 'Senior School', // 高级中学
    HIGH_SCHOOL: 'High School', // 完全中学
    UNDERGRADUATE: 'Undergraduate', // 本科生
    POSTGRADUATE_DEGREE: 'Postgraduate Degree', // 研究生
    PHD: 'PhD', // 博士生
    OTHER: 'Other' // 其他
  },

  // 贷超链接
  MARKET: {
    MONEY_TAP: {
      NAME: 'money tap',
      URL: ''
    },
    CASHBEAN: {
      NAME: 'CashBean',
      URL: ''
    },
    PAYSENSE: {
      NAME: 'PaySense',
      URL: ''
    },
    SMARTCOIN: {
      NAME: 'SmartCoin',
      URL: ''
    }
  }
}

export default Constant
