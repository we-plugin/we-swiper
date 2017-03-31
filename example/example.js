import weSwiper from '../dist/weSwiper'

const option = {
  data: {
    swiper: {}
  },
  touchstart (e) {
    this.swiper.touchstart(e)
  },
  touchmove (e) {
    this.swiper.touchmove(e)
  },
  touchend (e) {
    this.swiper.touchend(e)
  },
  onLoad () {
    new weSwiper({
      direction: 'vertical',
      slideLength: 3,
      /**
       * swiper初始化后执行
       * @param swiper
       */
      onInit (swiper) {
        console.log('init swiper-----------------')
        console.log(`current activeIndex is ${swiper.activeIndex}`)
      },
      /**
       * 手指碰触slide时执行
       * @param swiper
       * @param event
       */
      onTouchStart (swiper, event) {
        console.log('touchstart-----------------')
      },
      /**
       * 手指碰触slide并且滑动时执行
       * @param swiper
       * @param event
       */
      onTouchMove (swiper, event) {
        console.log('touchmove-----------------')
      },
      /**
       * 手指离开slide时执行
       * @param swiper
       * @param event
       */
      onTouchEnd (swiper, event) {
        console.log('touchend-----------------')
      },
      /**
       *  slide达到过渡条件时执行
       */
      onSlideChangeStart (swiper) {
        console.log(swiper)
      },
      /**
       *  swiper从一个slide过渡到另一个slide结束时执行
       */
      onSlideChangeEnd (swiper) {

      },
      /**
       *  过渡时触发
       */
      onTransitionStart (swiper) {

      },
      /**
       *  过渡结束时执行
       */
      onTransitionEnd (swiper) {

      },
      /**
       *  手指触碰swiper并且拖动slide时执行
       */
      onSlideMove (swiper) {

      },
      /**
       * slide达到过渡条件 且规定了方向 向前（右、下）切换时执行
       */
      onSlideNextStart (swiper) {

      },
      /**
       *  slide达到过渡条件 且规定了方向 向前（右、下）切换结束时执行
       */
      onSlideNextEnd (swiper) {

      },
      /**
       *  slide达到过渡条件 且规定了方向 向前（左、上）切换时执行
       */
      onSlidePrevStart (swiper) {

      },
      /**
       *  slide达到过渡条件 且规定了方向 向前（左、上）切换结束时执行
       */
      onSlidePrevEnd (swiper) {

      }
    })
  }
}
Page(option)
