# we-swiper
微信小程序触摸内容滑动解决方案，API设计细节及命名参考于[swiper.js](http://www.swiper.com.cn/).
### 为什么要开发这款插件
#### 官方swiper组件：
* 支持的事件回调很单一
* ~~从文档上看只是能支持横向滑动~~(官方swiper组件实际是支持纵向滚动的，设置属性vertical="true"即可，但并未在官方文档提及，感谢[@pangz1](https://github.com/pangz1)指正)
* 拓展性不强

#### we-swiper插件:
* 丰富的事件回调
* 丰富的属性
* 支持横、纵向滑动
* 强拓展（可在原插件基础上二次开发）

## ScreenShots
#### 横向滚动
![Alt text](https://github.com/we-plugin/we-swiper/blob/master/screenshots/Gif_20170401_013729.gif?raw=true)
#### 纵向滚动
![Alt text](https://github.com/we-plugin/we-swiper/blob/master/screenshots/Gif_20170401_013701.gif?raw=true)

## 使用方式
#### 克隆项目至你的目录
```bash
cd my-project

git clone https://github.com/dlhandsome/we-swiper.git
```

#### 在项目文件引入``` dist/weSwiper.js```进行开发

##### es6 module
``` javascript
import weSwiper from 'dist/weSwiper'
```
##### commonjs
```javascript
var weSwiper = require('dist/weSwiper')
```

## 示例
#### example.wxml
``` html
 <view class="we-container {{directionClass}}">
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
#### example.js
``` javascript
import weSwiper from '../dist/weSwiper'

const option = {
  touchstart (e) {
    this.weswiper.touchstart(e)
  },
  touchmove (e) {
    this.weswiper.touchmove(e)
  },
  touchend (e) {
    this.weswiper.touchend(e)
  },
  onLoad () {
    new weSwiper({
      animationViewName: 'animationData',
      slideLength: 3,
      initialSlide: 0,
      /**
       * swiper初始化后执行
       * @param weswiper
       */
      onInit (weswiper) {

      },
      /**
       * 手指碰触slide时执行
       * @param weswiper
       * @param event
       */
      onTouchStart (weswiper, event) {

      },
      /**
       * 手指碰触slide并且滑动时执行
       * @param weswiper
       * @param event
       */
      onTouchMove (weswiper, event) {

      },
      /**
       * 手指离开slide时执行
       * @param weswiper
       * @param event
       */
      onTouchEnd (weswiper, event) {

      },
      /**
       *  slide达到过渡条件时执行
       */
      onSlideChangeStart (weswiper) {

      },
      /**
       *  weswiper从一个slide过渡到另一个slide结束时执行
       */
      onSlideChangeEnd (weswiper) {

      },
      /**
       *  过渡时触发
       */
      onTransitionStart (weswiper) {

      },
      /**
       *  过渡结束时执行
       */
      onTransitionEnd (weswiper) {

      },
      /**
       *  手指触碰weswiper并且拖动slide时执行
       */
      onSlideMove (weswiper) {

      },
      /**
       * slide达到过渡条件 且规定了方向 向前（右、下）切换时执行
       */
      onSlideNextStart (weswiper) {

      },
      /**
       *  slide达到过渡条件 且规定了方向 向前（右、下）切换结束时执行
       */
      onSlideNextEnd (weswiper) {

      },
      /**
       *  slide达到过渡条件 且规定了方向 向前（左、上）切换时执行
       */
      onSlidePrevStart (swiper) {

      },
      /**
       *  slide达到过渡条件 且规定了方向 向前（左、上）切换结束时执行
       */
      onSlidePrevEnd (weswiper) {

      }
    })
  }
}
Page(option)

```

## we-swiper初始化

#### weSwiper在onLoad方法中实例化

```javascript
onLoad () {
  new weSwiper({
    slideLength: 3  // 必填，由于目前无法直接获取slide页数，目前只能通过参数写入
  }) 
}
```

#### 可通过this.weswiper在Page的钩子函数中访问实例

```javascript
touchstart (e) {
  this.weswiper.touchstart(e)
}
```

#### WXML结构配置

```html
<view class="we-container {{directionClass}}">
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
小提示：WXML中的字段不需要在Page的data中给出默认值，we-swiper内部有同步视图机制。

## 构造器参数

### 必填项


#### slideLength

- Type: `Number`
- Default: `0`

表示slide的页数

### 可选项


#### width

- Type: `Number`
- Default: `device.windowWidth`

设定slide的宽度（横向滑动时slide滑动间隔距离会根据其值计算）


#### height

- Type: `Number`
- Default: `device.windowHeight`

设定slide的高度（纵向滑动时slide滑动间隔距离会根据其值计算）


#### direction

- Type: `String`
- Default: `horizontal`
- Option:
    - `horizontal`: slide水平方向滑动
    - `vertical`: slide垂直方向滑动

设定slide滑动方向


#### initialSlide

- Type: `Number`
- Default: `0`

设定初始化时slide的索引


#### speed

- Type: `Number`
- Default: `300`

设定slide过渡时长


#### timingFunction

- Type: `String`
- Default: `ease`
- Option:
    - `linear`: slide水平方向滑动
    - `ease`: slide垂直方向滑动
    - `ease-in`: slide垂直方向滑动
    - `ease-in-out`: slide垂直方向滑动
    - `ease-out`: slide垂直方向滑动
    - `step-start`: slide垂直方向滑动
    - `step-end`: slide垂直方向滑动
    
设定slide过渡动画速度曲线


#### autoplay

- Type: `Number`
- Default: `0`

设定slide自动播放间隔时长，设置为0时不自动播放


#### directionViewName

- Type: `String`
- Default: `directionClass`

对应视图中direction类名


#### animationViewName

- Type: `String`
- Default: `animationData`

对应视图中animation属性名         


## 属性


####  weswiper.activeIndex

返回当前活动块(激活块)的索引


####  weswiper.previousIndex

返回上一个活动块的索引


#### weswiper.width

返回swiper容器的宽度


####  weswiper.height

返回swiper容器的高度


####  weswiper.isBeginning

如果swiper处于最初始位置，返回true


####  weswiper.isEnd

如果swiper处于最末尾位置，返回true


####  weswiper.speed

返回当前swiper的过渡时长


## 方法


####  weswiper.slideNext(runCallbacks, speed)

滑动到后一个slide

- Params:
    - `runCallbacks`:  可选，设为false不触发onSlideChange回调函数
    - `speed`:  可选，切换速度
    

####  weswiper.slidePrev(runCallbacks, speed)

滑动到前一个slide。

- Params:
    - `runCallbacks`:  可选，设为false不触发onSlideChange回调函数
    - `speed`:  可选，切换速度
    

####  weswiper.slideTo(index, speed, runCallbacks)

切换到指定slide。

- Params:
    - `index`:  必选，num，指定将要切换到的slide的索引
    - `speed`:  可选，切换速度
    - `runCallbacks`:  可选，设为false不触发onSlideChange回调函数
    
    
## 事件回调


####  onInit (weswiper)

回调函数，初始化后执行。
可选weswiper实例作为参数。


####  onTouchStart (weswiper, event)

回调函数，当碰触到slider时执行。可选weswiper和touchstart事件作为参数


####  onTouchMove (weswiper, event)

回调函数，手指触碰weswiper并滑动（手指）时执行。此时slide不一定会发生移动，比如你手指的移动方向和weswiper的切换方向垂直时


####  onTouchEnd (weswiper, event)

回调函数，当释放slider时执行。（释放即执行）


####  onSlideChangeStart (weswiper)

回调函数，weswiper从当前slide开始过渡到另一个slide时执行。触摸情况下，如果释放slide时没有达到过渡条件而回弹时不会触发这个函数，此时可用onTransitionStart。

可接受weswiper实例作为参数，输出的activeIndex是过渡后的slide索引


####  onSlideChangeEnd (weswiper)

回调函数，weswiper从一个slide过渡到另一个slide结束时执行。

可接受swiper实例作为参数。


####  onTransitionStart (weswiper)

回调函数，过渡开始时触发，接受weswiper实例作为参数。


####  onTransitionEnd (weswiper)

回调函数，过渡结束时触发，接收weswiper实例作为参数。


####  onSlideMove (weswiper)
     
回调函数，手指触碰weswiper并拖动slide时执行。


####  onSlideNextStart (weswiper)

回调函数，滑块释放时如果触发slider向前(右、下)切换则执行。类似于onSlideChangeStart，但规定了方向。


####  onSlideNextEnd (weswiper)

回调函数，slider向前(右、下)切换结束时执行。类似于onSlideChangeEnd，但规定了方向。


####  onSlidePrevStart (weswiper)

回调函数，滑块释放时如果触发slider向后(左、上)切换则执行。类似于onSlideChangeStart，但规定了方向。

####  onSlidePrevEnd (weswiper)

回调函数，slider向后(左、上)切换结束时执行。类似于onSlideChangeEnd，但规定了方向。


## TODO

- 增加切换效果：fade，flip等

## License
The MIT License(http://opensource.org/licenses/MIT)

请自由地享受和参与开源

## 贡献

如果你有好的意见或建议，欢迎给我提issue或pull request。




