/**
 * Created by sail on 2017/4/1.
 */

export default {
  /**
   * 切换控制器
   * @param touchStartTime： 手指触碰slide时的时间戳
   * @param et： 手指离开slide时的时间戳
   * @param from： 手指触碰slide时的屏幕位置
   * @param to： 手指离开slide时的屏幕位置
   * @param wrapperDistance： slide滑动方向上的容器长度
   * @returns {*}
   */
  action (touchStartTime, touchEndTime, from, to, wrapperDistance) {
    const {
      activeIndex,
      slideLength,
      onTransitionStart } = this
    const deltaTime = touchEndTime - touchStartTime  //  手指触摸时长
    const distance = Math.abs(to - from)  //  滑动距离

    const k = distance / deltaTime

    if (to > from) {
      typeof onTransitionStart === 'function' && onTransitionStart(this)  // slide达到过渡条件时执行
      return (k > 0.3 || distance > wrapperDistance / 2) ? (activeIndex === 0 ? 'slideBack' : 'slidePrev') : 'slideBack'
    }

    if (to < from) {
      typeof onTransitionStart === 'function' && onTransitionStart(this)  // slide达到过渡条件时执行
      return (k > 0.3 || distance > wrapperDistance / 2) ? (activeIndex === slideLength - 1 ? 'slideBack' : 'slideNext') : 'slideBack'
    }

    if (to = from) {
      return 'slideBack'
    }
  }
}
