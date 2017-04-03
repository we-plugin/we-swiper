export default {
  /**
   * 切换至下一个slide
   * @param runCallbacks： 可选，boolean，设置为false时不会触发onSlideChange回调函数
   * @param speed: 可选，num(单位ms)，切换速度
   */
  slideNext (runCallbacks = false, speed = 300) {
    const self = this
    const {
      onSlideNextStart,
      onSlideNextEnd
    } = self

    typeof onSlideNextStart === 'function' && onSlideNextStart(self)  // slide达到过渡条件时执行

    self.slideTo(self.activeIndex + 1, speed, runCallbacks)

    typeof onSlideNextEnd === 'function' && setTimeout(() => { onSlideNextEnd(self) }, speed)  //  slide过渡结束后执行
  },
  /**
   * 切换至上一个slide
   * @param runCallbacks： 可选，boolean，设置为false时不会触发onSlideChange回调函数
   * @param speed: 可选，num(单位ms)，切换速度
   */
  slidePrev (runCallbacks = false, speed = 300) {
    const self = this
    const {
      onSlidePrevStart,
      onSlidePrevEnd
    } = self

    typeof onSlidePrevStart === 'function' && onSlidePrevStart(self)  // slide达到过渡条件时执行

    self.slideTo(self.activeIndex - 1, speed, runCallbacks)

    typeof onSlidePrevEnd === 'function' && setTimeout(() => { onSlidePrevEnd(self) }, speed)  //  slide过渡结束后执行
  },
  /**
   * 回弹
   * @param runCallbacks: 可选，boolean，设置为false时不会触发onSlideChange回调函数
   * @param speed: 可选，num(单位ms)，切换速度
   */
  slideBack (runCallbacks = false, speed = 300) {
    const self = this
    const {
      XORY,
      activeIndex,
      rectDistance,
      onTransitionEnd
    } = self

    const translate = - activeIndex * rectDistance

    self.slideAnimation(translate, speed)

    typeof onTransitionEnd === 'function' && setTimeout(() => { onTransitionEnd(self) }, speed)  //  slide过渡结束后执行
  },
  /**
   * 切换到指定slide
   * @param index：必选，num，指定将要切换到的slide的索引
   * @param speed：可选，num(单位ms)，切换速度
   * @param runCallbacks：可选，boolean，设置为false时不会触发onSlideChange回调函数
   */
  slideTo (index, speed = 300, runCallbacks = false) {
    const self = this
    const {
      slideLength,
      activeIndex,
      rectDistance,
      onSlideChangeStart,
      onSlideChangeEnd,
      onTransitionEnd,
      consoleException
    } = self

    try {
      if (typeof  index !== 'number') throw 'paramType' //  参数类型错误
      if (index < 0 || index > slideLength - 1) throw 'bound'   //  越界

      const translate = - index * rectDistance
      self.previousIndex = activeIndex
      self.activeIndex = index
      self.isBeginning = self.activeIndex === self.initialSlide
      self.isEnd = self.activeIndex === self.slideLength - 1

      runCallbacks && typeof onSlideChangeStart === 'function' && onSlideChangeStart(self)  // slide达到过渡条件时执行

      self.slideAnimation(translate, speed)

      runCallbacks &&  typeof onSlideChangeEnd === 'function' && setTimeout(() => { onSlideChangeEnd(self) }, speed)  //  swiper从一个slide过渡到另一个slide结束后执行
      typeof onTransitionEnd === 'function' && setTimeout(() => { onTransitionEnd(self) }, speed)  //  slide过渡结束后执行
    } catch (err) {
      consoleException(err, 'slideTo[Function]')
    }

  }
}
