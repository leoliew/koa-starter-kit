import * as os from 'os'
import * as tracer from 'tracer'
import * as config from 'config'

const Logger = tracer.console({
  level: config.get('log.level'),
  dateformat: 'yyyy-mm-dd HH:MM:ss.L',
  inspectOpt: {
    showHidden: false, // if true then the object's non-enumerable properties will be shown too. Defaults to false
    depth: 3 // tells inspect how many times to recurse while formatting the object. This is useful for inspecting large complicated objects. Defaults to 2. To make it recurse indefinitely pass null.
  },
  transport: function (data) {
    data.server = os.hostname()
    console.log(data.output)
  }
})

export default Logger
