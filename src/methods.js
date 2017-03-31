export default {
  /**
   * bt: begin time
   * et: end time
   */
  action (bt, et, from, to, wrapperDistance) {
    const { activeIndex, slideLength, onTransitionStart } = this
    const st = et - bt  //  手指触摸时长
    const distance = Math.abs(to - from)  //  滑动距离

    const k = distance / st

    if (to > from) {
      typeof onTransitionStart === 'function' && onTransitionStart(self)  // slide达到过渡条件时执行
      return (k > 0.3 || distance > wrapperDistance / 2) ? (activeIndex === 0 ? 'slideBack' : 'slidePrev') : 'slideBack'
    }

    if (to < from) {
      typeof onTransitionStart === 'function' && onTransitionStart(self)  // slide达到过渡条件时执行
      return (k > 0.3 || distance > wrapperDistance / 2) ? (activeIndex === slideLength - 1 ? 'slideBack' : 'slideNext') : 'slideBack'
    }

    if (to = from) {
      return 'back'
    }
  },
  /**
   * next
   */
  slideNext (runCallbacks = false, speed = 300) {
    const self = this
    const { activeIndex, width, height, direction, rectDistance, onSlideChangeStart, onSlideChangeEnd, onTransitionEnd, onSlideNextStart, onSlideNextEnd } = self

    const translate = - (activeIndex + 1) * rectDistance

    self.previousIndex = activeIndex
    self.activeIndex ++
    self.isBeginning = self.activeIndex === self.initialSlide


    runCallbacks && typeof onSlideChangeStart === 'function' && onSlideChangeStart(self)  // slide达到过渡条件时执行
    typeof onSlideNextStart === 'function' && onSlideNextStart(self)  // slide达到过渡条件时执行

    const option = {
      [`swiper.translate${self.dProp}`]: translate,
      'swiper.duration': speed
    }
    self.pageContext.setData(option)

    typeof onSlideChangeEnd === 'function' && setTimeout(() => { onSlideChangeEnd(self) }, speed)  //  swiper从一个slide过渡到另一个slide结束后执
    typeof onTransitionEnd === 'function' && setTimeout(() => { onTransitionEnd(self) }, speed)  //  slide过渡结束后执行
    typeof onSlideNextEnd === 'function' && setTimeout(() => { onSlideNextEnd(self) }, speed)  //  slide过渡结束后执行
  },
  /**
   * prev
   */
  slidePrev (runCallbacks = false, speed = 300) {
    const self = this
    const { activeIndex, width, height, rectDistance, onSlideChangeStart, onSlideChangeEnd, onTransitionEnd, onSlidePrevStart, onSlidePrevEnd } = self

    const translate = - (activeIndex - 1) * rectDistance

    self.previousIndex = activeIndex
    self.activeIndex --
    self.isBeginning = self.activeIndex === self.initialSlide

    runCallbacks && typeof onSlideChangeStart === 'function' && onSlideChangeStart(self)  // slide达到过渡条件时执行
    typeof onSlidePrevStart === 'function' && onSlidePrevStart(self)  // slide达到过渡条件时执行

    const option = {
      [`swiper.translate${self.dProp}`]: translate,
      'swiper.duration': speed
    }
    self.pageContext.setData(option)

    typeof onSlideChangeEnd === 'function' && setTimeout(() => { onSlideChangeEnd(self) }, speed)  //  swiper从一个slide过渡到另一个slide结束后执行
    typeof onTransitionEnd === 'function' && setTimeout(() => { onTransitionEnd(self) }, speed)  //  slide过渡结束后执行
    typeof onSlidePrevEnd === 'function' && setTimeout(() => { onSlidePrevEnd(self) }, speed)  //  slide过渡结束后执行
  },
  /**
   * 回弹
   */
  slideBack (runCallbacks = false, speed = 300) {
    const self = this
    const { activeIndex, width, height, rectDistance, onTransitionEnd } = self

    const translate = - activeIndex * rectDistance

    const option = {
      [`swiper.translate${self.dProp}`]: translate,
      'swiper.duration': speed
    }
    self.pageContext.setData(option)
    typeof onTransitionEnd === 'function' && setTimeout(() => { onTransitionEnd(self) }, speed)  //  slide过渡结束后执行
  }
}
