/**
 * Created by sail on 2017/4/1.
 */
const ERROR = {
  'paramType': '参数类型错误',
  'bound': '参数越界'
}

export default {
  /**
   * 错误对照
   */
  consoleException (type, place) {
    console.log(type)
    console.log(`%c${place}:${ERROR[type]}`, 'color: red')
  }
}