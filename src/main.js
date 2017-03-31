import DEFAULT from './default'
import handle from './handle'
import methods from './methods'

const { initialSlide } = DEFAULT

class weSwiper {

  constructor (param) {

    const pages = getCurrentPages()

		//  获取到当前page上下文
		this.pageContext = pages[pages.length - 1]
		//  把this依附在Page上下文的wecropper属性上，便于在page钩子函数中访问
		this.pageContext.swiper = this

    Object.assign(this, DEFAULT, param || {})

    const option = {
      swiper: Object.assign(DEFAULT, param || {})
    }
    this.pageContext.setData(option)

    this.rectDistance = this.direction === 'horizontal' ? this.width : this.height
    this.activeIndex = initialSlide  //  将初始页码赋给activeIndex
    this.noSwiper = false  //  阻止手势滑动
    this.previousIndex = initialSlide  //  返回上一个活动块的索引，切换前的索引

    /**
     * 处理callback
     */
     const { onInit } = this
     typeof onInit === 'function' && onInit(this)
  }
/**
 * start touch
 */
  touchstart (e) {
    const { direction, onTouchStart } = this
    const { clientX, clientY } = e.changedTouches[0]
    const distance = direction === 'horizontal' ? clientX : clientY

    typeof onTouchStart === 'function' && onTouchStart(this, e) //  当手指碰触到slide时执行
    this.start(distance)
  }
/**
 * touch moving
 */
  touchmove (e) {
    const { direction, onTouchMove } = this
    const { clientX, clientY } = e.changedTouches[0]
    const distance = direction === 'horizontal' ? clientX : clientY

    typeof onTouchMove === 'function' && onTouchMove(this, e) //  手指碰触slide并且滑动时执行
    this.move(distance)
  }
  /**
   * touch ending
   */
  touchend (e) {
    const { direction, onTouchEnd } = this
    const { clientX, clientY } = e.changedTouches[0]
    const distance = direction === 'horizontal' ? clientX : clientY

    typeof onTouchEnd === 'function' && onTouchEnd(this, e) //  手指离开slide时执行
    this.end(distance)
  }

}

Object.assign(weSwiper.prototype, handle)
Object.assign(weSwiper.prototype, methods)

export default weSwiper
