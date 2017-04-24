const device = wx.getSystemInfoSync()  //  获取设备信息

export default {
  /**
   * 必填项
   */
  slideLength: 0,                       //  由于目前无法直接获取slide页数，目前只能通过参数写入
  /**
   * 可选参数
   */
  width: device.windowWidth,
  height: device.windowHeight,
  direction: 'horizontal',
  initialSlide: 0,
  speed: 300,
  effect: 'slide',                      //  过渡效果
  timingFunction: 'ease',               //  过渡动画速度曲线
  autoplay: 0,                          //  自动播放间隔，设置为0时不自动播放
  animationViewName: 'animationData',   //  对应视图wrapper中animation属性名
  /**
   * 事件回调
   * @type {[type]}
   */
  onInit: null,                         //  swiper初始化时执行
  onTouchStart: null,                   //  手指碰触slide时执行
  onTouchMove: null,                    //  手指碰触slide并且滑动时执行
  onTouchEnd: null,                     //  手指离开slide时执行
  onSlideChangeStart: null,             //  slide达到过渡条件时执行
  onSlideChangeEnd: null,               //  swiper从一个slide过渡到另一个slide结束时执行
  onTransitionStart: null,              //  过渡时触发
  onTransitionEnd: null,                //  过渡结束时执行
  onSlideMove: null,                    //  手指触碰swiper并且拖动slide时执行
  onSlideNextStart: null,               //  slide达到过渡条件 且规定了方向 向前（右、下）切换时执行
  onSlideNextEnd: null,                 //  slide达到过渡条件 且规定了方向 向前（右、下）切换结束时执行
  onSlidePrevStart: null,               //  slide达到过渡条件 且规定了方向 向前（左、上）切换时执行
  onSlidePrevEnd: null                  //  slide达到过渡条件 且规定了方向 向前（左、上）切换结束时执行
}
