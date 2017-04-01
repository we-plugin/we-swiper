export default {

  start (distance) {
    const self = this
    const { activeIndex, XORY, rectDistance } = self

    const translate =  - activeIndex * rectDistance

    const option = {
      [`swiper.translate${XORY}`]: translate,
      'swiper.duration': 0
    }

    self[`tmpStart${XORY}`] = distance
    self[`translate${XORY}`] = translate
    self.touchStartTime = new Date().getTime()
    // self.pageContext.setData(option)

    self.slideAnimation(translate, 0)
  },

  move (distance) {
    const self = this
    const { onSlideMove, XORY } = self

    const tmpMove = self[`translate${XORY}`] + distance - self[`tmpStart${XORY}`]

    const option = {
      [`swiper.translate${XORY}`]: tmpMove,
      'swiper.duration': 0
    }
    // self.pageContext.setData(option)
    self.slideAnimation(tmpMove, 0)
    typeof onSlideMove === 'function' && onSlideMove(self)
  },

  end (distance) {
    const self = this
    const { speed, touchStartTime, rectDistance, XORY } = self
    const touchEndTime = new Date().getTime()

    const action = self.action(touchStartTime, touchEndTime, self[`tmpStart${XORY}`], distance, rectDistance)

    self[action](true, speed)
  }
}
