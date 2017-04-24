export default {

  touchstart (e) {
    if (this.noSwiper) return
    const { onTouchStart, XORY, activeIndex, rectDistance } = this
    const touch = e.changedTouches[0]
    const distance = touch[`client${XORY}`]
    const translate =  - activeIndex * rectDistance

    this[`touchStart${XORY}`] = distance
    this[`translate${XORY}`] = translate
    this.touchStartTime = new Date().getTime()

    typeof onTouchStart === 'function' && onTouchStart(this, e) //  当手指碰触到slide时执行

    this.slideAnimation(translate, 0)
  },

  touchmove (e) {
    if (this.noSwiper) return
    const { onTouchMove, XORY, onSlideMove } = this
    const touch = e.changedTouches[0]
    const distance = touch[`client${XORY}`]
    const tmpMove = this[`translate${XORY}`] + distance - this[`touchStart${XORY}`]


    typeof onTouchMove === 'function' && onTouchMove(this, e) //  手指碰触slide并且滑动时执行

    this.slideAnimation(tmpMove, 0)

    typeof onSlideMove === 'function' && onSlideMove(this)
  },

  touchend (e) {
    if (this.noSwiper) return
    const { onTouchEnd, XORY, speed, touchStartTime, rectDistance } = this
    const touch = e.changedTouches[0]
    const distance = touch[`client${XORY}`]
    const touchEndTime = new Date().getTime()

    const action = this.action(touchStartTime, touchEndTime, this[`touchStart${XORY}`], distance, rectDistance)

    typeof onTouchEnd === 'function' && onTouchEnd(this, e) //  手指离开slide时执行

    this[action](true, speed)
  }
}
