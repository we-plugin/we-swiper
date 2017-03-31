export default {

  start (distance) {
    const self = this
    const { activeIndex, width, height, direction, rectDistance } = self

    const translate =  - activeIndex * rectDistance

    self.dProp = direction === 'horizontal' ? 'X' : 'Y'

    const option = {
      [`swiper.translate${self.dProp}`]: translate,
      'swiper.duration': 0
    }

    self[`tmpStart${self.dProp}`] = distance
    self[`translate${self.dProp}`] = translate
    self.bt = new Date().getTime()
    self.pageContext.setData(option)
  },

  move (distance) {
    const self = this
    const { onSlideMove } = self

    const tmpMove = self[`translate${self.dProp}`] + distance - self[`tmpStart${self.dProp}`]

    const option = {
      [`swiper.translate${self.dProp}`]: tmpMove,
      'swiper.duration': 0
    }
    self.pageContext.setData(option)
    typeof onSlideMove === 'function' && onSlideMove(self)
  },

  end (distance) {
    const self = this
    const { speed, bt, rectDistance } = self
    const et = new Date().getTime()

    const action = self.action(bt, et, self[`tmpStart${self.dProp}`], distance, rectDistance)

    self[action](true, speed)
  }
}
