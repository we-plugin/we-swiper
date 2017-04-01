export default {

  start (distance) {
    const self = this
    const { activeIndex, XORY, rectDistance } = self

    const translate =  - activeIndex * rectDistance

    self[`touchStart${XORY}`] = distance
    self[`translate${XORY}`] = translate
    self.touchStartTime = new Date().getTime()

    self.slideAnimation(translate, 0)
  },

  move (distance) {
    const self = this
    const { onSlideMove, XORY } = self

    const tmpMove = self[`translate${XORY}`] + distance - self[`touchStart${XORY}`]

    self.slideAnimation(tmpMove, 0)
    typeof onSlideMove === 'function' && onSlideMove(self)
  },

  end (distance) {
    const self = this
    const { speed, touchStartTime, rectDistance, XORY } = self
    const touchEndTime = new Date().getTime()

    const action = self.action(touchStartTime, touchEndTime, self[`touchStart${XORY}`], distance, rectDistance)

    self[action](true, speed)
  }
}
