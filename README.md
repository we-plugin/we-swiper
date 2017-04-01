# we-swiper
微信小程序触摸内容滑动解决方案，API设计细节及命名参考于[swiper.js](http://www.swiper.com.cn/).
## 为什么要开发这款插件
#### 官方swiper组件：
* 支持的事件回调很单一
* 从文档上看只是能支持横向滑动
* 拓展性不强

#### we-swiper插件:
* 丰富的事件回调
* 丰富的属性
* 支持横、纵向滑动
* 强拓展（可在原插件基础上二次开发）

## ScreenShots
#### 横向滚动
![Alt text](https://github.com/dlhandsome/we-swiper/blob/master/screenshots/Gif_20170401_013729.gif?raw=true)
#### 纵向滚动
![Alt text](https://github.com/dlhandsome/we-swiper/blob/master/screenshots/Gif_20170401_013701.gif?raw=true)

## 使用方式
#### 克隆项目至你的目录
```bash
cd my-project

git clone https://github.com/dlhandsome/we-swiper.git
```

在项目文件引入``` dist/weSwiper.js```进行开发

> es6 module
``` javascript
import weSwiper from 'dist/weSwiper'
```
> commonjs
```javascript
var weSwiper = require('dist/weSwiper')
```

## 示例
> example.wxml
``` html
 <view class="we-container {{swiper.direction === 'horizontal' ? 'we-container-horizontal' : 'we-container-vertical'}}">
   <view class="we-wrapper"
     bindtouchstart="touchstart"
     bindtouchmove="touchmove"
     bindtouchend="touchend"
     animation="{{animationData}}">
     <view class="we-slide">slide 1</view>
     <view class="we-slide">slide 2</view>
     <view class="we-slide">slide 3</view>
   </view>
 </view>
```
> example.js
``` javascript
import weSwiper from '../src/main'

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
    /**
     * weSwiper实例化后，其实例在Page钩子函数中可通过this.swiper访问
     */
    new weSwiper({
      // direction: 'vertical',
      slideLength: 3,
      /**
       * swiper初始化后执行
       * @param swiper
       */
      onInit (swiper) {

      },
      /**
       * 手指碰触slide时执行
       * @param swiper
       * @param event
       */
      onTouchStart (swiper, event) {

      },
      /**
       * 手指碰触slide并且滑动时执行
       * @param swiper
       * @param event
       */
      onTouchMove (swiper, event) {

      },
      /**
       * 手指离开slide时执行
       * @param swiper
       * @param event
       */
      onTouchEnd (swiper, event) {

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


```

## 属性

* swiper.activeIndex

返回当前活动块(激活块)的索引

* swiper.previousIndex

返回上一个活动块的索引

* swiper.width

返回swiper容器的宽度

* swiper.height

返回swiper容器的高度

* swiper.isBeginning

如果swiper处于最初始位置，返回true

* swiper.isEnd

如果swiper处于最末尾位置，返回true

* swiper.speed

返回当前swiper的过渡时长
