/**
 * Created by sail on 2017/4/1.
 */
const REG = {
  SPEED: /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/,
  TIMINGFUNCTION: /linear|ease|ease-in|ease-in-out|ease-out|step-start|step-end/
}

export default {
  /**
   * 平移动画
   * @param translate：平移位置
   * @param speed：过渡时长
   * @param timingFunction：过渡类型
   */
  slideAnimation (translate = 0, speed = 300, timingFunction = 'ease') {
    const { XORY, animationViewName, consoleException } = this
    try {
      /**
       * 异常处理
       */
      if(!REG.SPEED.test(speed)) throw 'paramType'
      if(!REG.TIMINGFUNCTION.test(timingFunction)) throw 'paramType'
      /**
       * 创建一个动画实例
       */
      const animation = wx.createAnimation({
        transformOrigin: '50% 50%',
        duration: speed,
        timingFunction,
        delay: 0
      })

      animation[`translate${XORY}`](translate).step()  //  动画描述

      this.syncView(animationViewName, animation.export())  //  同步动画到视图

    } catch (err) {
      consoleException(err, 'slideAnimation[Function]')
    }
  }
}
