import DEFAULT from './default'
import handle from './handle'
import controller from './controller'
import methods from './methods'
import animate from './animate'
import sync from './syncView'
import exception from './exception'

class weSwiper {

  constructor (param) {

    const pages = getCurrentPages()

		//  获取到当前page上下文
		this.pageContext = pages[pages.length - 1]
		//  把this依附在Page上下文的wecropper属性上，便于在page钩子函数中访问
		this.pageContext.weswiper = this

    const all = Object.assign(this, DEFAULT, param || {})

    this.init(all)
  }

  /**
   * 初始化配置
   */
  init (param) {
    const {
      speed,
      initialSlide,
      direction,
      autoplay,
      directionViewName
    } = param

    const directionClass = direction === 'horizontal' ? 'we-container-horizontal' : 'we-container-vertical'
    this.syncView(directionViewName, directionClass)
    this.rectDistance = direction === 'horizontal' ? this.width : this.height
    this.XORY = direction === 'horizontal' ? 'X' : 'Y'
    this.activeIndex = initialSlide  //  将初始页码赋给activeIndex
    this.noSwiper = false  //  阻止手势滑动
    this.previousIndex = initialSlide  //  返回上一个活动块的索引，切换前的索引
    this.slideTo(initialSlide, 0)
    typeof autoplay === 'number' && autoplay > 0 && setInterval(() => {
      if (this.isEnd) {
        this.slideTo(0, speed)
      } else {
        this.slideTo(this.activeIndex + 1, speed)
      }
    }, autoplay)
    /**
     * 处理callback
     */
    const { onInit } = this
    typeof onInit === 'function' && onInit(this)
  }
}

Object.assign(weSwiper.prototype, controller)
Object.assign(weSwiper.prototype, handle)
Object.assign(weSwiper.prototype, methods)
Object.assign(weSwiper.prototype, animate)
Object.assign(weSwiper.prototype, sync)
Object.assign(weSwiper.prototype, exception)

export default weSwiper
