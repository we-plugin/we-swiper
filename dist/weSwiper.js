(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.weSwiper = factory());
}(this, (function () { 'use strict';

var device = wx.getSystemInfoSync(); //  获取设备信息

var DEFAULT = {
  width: device.windowWidth,
  height: device.windowHeight,
  direction: 'horizontal',
  initialSlide: 0,
  slideLength: 3, //  由于目前无法直接获取slide页数，目前只能通过参数写入
  speed: 300,
  autoplay: false,
  isBeginning: true, //  是否是初始活动块
  /**
   * 事件回调
   * @type {[type]}
   */
  onInit: null, //  swiper初始化时执行
  onTouchStart: null, //  手指碰触slide时执行
  onTouchMove: null, //  手指碰触slide并且滑动时执行
  onTouchEnd: null, //  手指离开slide时执行
  onSlideChangeStart: null, //  slide达到过渡条件时执行
  onSlideChangeEnd: null, //  swiper从一个slide过渡到另一个slide结束时执行
  onTransitionStart: null, //  过渡时触发
  onTransitionEnd: null, //  过渡结束时执行
  onSlideMove: null, //  手指触碰swiper并且拖动slide时执行
  onSlideNextStart: null, //  slide达到过渡条件 且规定了方向 向前（右、下）切换时执行
  onSlideNextEnd: null, //  slide达到过渡条件 且规定了方向 向前（右、下）切换结束时执行
  onSlidePrevStart: null, //  slide达到过渡条件 且规定了方向 向前（左、上）切换时执行
  onSlidePrevEnd: null //  slide达到过渡条件 且规定了方向 向前（左、上）切换结束时执行
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var handle = {
  start: function start(distance) {
    var _option;

    var self = this;
    var activeIndex = self.activeIndex,
        width = self.width,
        height = self.height,
        direction = self.direction,
        rectDistance = self.rectDistance;


    var translate = -activeIndex * rectDistance;

    self.dProp = direction === 'horizontal' ? 'X' : 'Y';

    var option = (_option = {}, defineProperty(_option, 'swiper.translate' + self.dProp, translate), defineProperty(_option, 'swiper.duration', 0), _option);

    self['tmpStart' + self.dProp] = distance;
    self['translate' + self.dProp] = translate;
    self.bt = new Date().getTime();
    self.pageContext.setData(option);
  },
  move: function move(distance) {
    var _option2;

    var self = this;
    var onSlideMove = self.onSlideMove;


    var tmpMove = self['translate' + self.dProp] + distance - self['tmpStart' + self.dProp];

    var option = (_option2 = {}, defineProperty(_option2, 'swiper.translate' + self.dProp, tmpMove), defineProperty(_option2, 'swiper.duration', 0), _option2);
    self.pageContext.setData(option);
    typeof onSlideMove === 'function' && onSlideMove(self);
  },
  end: function end(distance) {
    var self = this;
    var speed = self.speed,
        bt = self.bt,
        rectDistance = self.rectDistance;

    var et = new Date().getTime();

    var action = self.action(bt, et, self['tmpStart' + self.dProp], distance, rectDistance);

    self[action](true, speed);
  }
};

var methods = {
  /**
   * bt: begin time
   * et: end time
   */
  action: function action(bt, et, from, to, wrapperDistance) {
    var activeIndex = this.activeIndex,
        slideLength = this.slideLength,
        onTransitionStart = this.onTransitionStart;

    var st = et - bt; //  手指触摸时长
    var distance = Math.abs(to - from); //  滑动距离

    var k = distance / st;

    if (to > from) {
      typeof onTransitionStart === 'function' && onTransitionStart(self); // slide达到过渡条件时执行
      return k > 0.3 || distance > wrapperDistance / 2 ? activeIndex === 0 ? 'slideBack' : 'slidePrev' : 'slideBack';
    }

    if (to < from) {
      typeof onTransitionStart === 'function' && onTransitionStart(self); // slide达到过渡条件时执行
      return k > 0.3 || distance > wrapperDistance / 2 ? activeIndex === slideLength - 1 ? 'slideBack' : 'slideNext' : 'slideBack';
    }

    if (to = from) {
      return 'back';
    }
  },

  /**
   * next
   */
  slideNext: function slideNext() {
    var _option;

    var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

    var self = this;
    var activeIndex = self.activeIndex,
        width = self.width,
        height = self.height,
        direction = self.direction,
        rectDistance = self.rectDistance,
        onSlideChangeStart = self.onSlideChangeStart,
        onSlideChangeEnd = self.onSlideChangeEnd,
        onTransitionEnd = self.onTransitionEnd,
        onSlideNextStart = self.onSlideNextStart,
        onSlideNextEnd = self.onSlideNextEnd;


    var translate = -(activeIndex + 1) * rectDistance;

    self.previousIndex = activeIndex;
    self.activeIndex++;
    self.isBeginning = self.activeIndex === self.initialSlide;

    runCallbacks && typeof onSlideChangeStart === 'function' && onSlideChangeStart(self); // slide达到过渡条件时执行
    typeof onSlideNextStart === 'function' && onSlideNextStart(self); // slide达到过渡条件时执行

    var option = (_option = {}, defineProperty(_option, 'swiper.translate' + self.dProp, translate), defineProperty(_option, 'swiper.duration', speed), _option);
    self.pageContext.setData(option);

    typeof onSlideChangeEnd === 'function' && setTimeout(function () {
      onSlideChangeEnd(self);
    }, speed); //  swiper从一个slide过渡到另一个slide结束后执
    typeof onTransitionEnd === 'function' && setTimeout(function () {
      onTransitionEnd(self);
    }, speed); //  slide过渡结束后执行
    typeof onSlideNextEnd === 'function' && setTimeout(function () {
      onSlideNextEnd(self);
    }, speed); //  slide过渡结束后执行
  },

  /**
   * prev
   */
  slidePrev: function slidePrev() {
    var _option2;

    var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

    var self = this;
    var activeIndex = self.activeIndex,
        width = self.width,
        height = self.height,
        rectDistance = self.rectDistance,
        onSlideChangeStart = self.onSlideChangeStart,
        onSlideChangeEnd = self.onSlideChangeEnd,
        onTransitionEnd = self.onTransitionEnd,
        onSlidePrevStart = self.onSlidePrevStart,
        onSlidePrevEnd = self.onSlidePrevEnd;


    var translate = -(activeIndex - 1) * rectDistance;

    self.previousIndex = activeIndex;
    self.activeIndex--;
    self.isBeginning = self.activeIndex === self.initialSlide;

    runCallbacks && typeof onSlideChangeStart === 'function' && onSlideChangeStart(self); // slide达到过渡条件时执行
    typeof onSlidePrevStart === 'function' && onSlidePrevStart(self); // slide达到过渡条件时执行

    var option = (_option2 = {}, defineProperty(_option2, 'swiper.translate' + self.dProp, translate), defineProperty(_option2, 'swiper.duration', speed), _option2);
    self.pageContext.setData(option);

    typeof onSlideChangeEnd === 'function' && setTimeout(function () {
      onSlideChangeEnd(self);
    }, speed); //  swiper从一个slide过渡到另一个slide结束后执行
    typeof onTransitionEnd === 'function' && setTimeout(function () {
      onTransitionEnd(self);
    }, speed); //  slide过渡结束后执行
    typeof onSlidePrevEnd === 'function' && setTimeout(function () {
      onSlidePrevEnd(self);
    }, speed); //  slide过渡结束后执行
  },

  /**
   * 回弹
   */
  slideBack: function slideBack() {
    var _option3;

    var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

    var self = this;
    var activeIndex = self.activeIndex,
        width = self.width,
        height = self.height,
        rectDistance = self.rectDistance,
        onTransitionEnd = self.onTransitionEnd;


    var translate = -activeIndex * rectDistance;

    var option = (_option3 = {}, defineProperty(_option3, 'swiper.translate' + self.dProp, translate), defineProperty(_option3, 'swiper.duration', speed), _option3);
    self.pageContext.setData(option);
    typeof onTransitionEnd === 'function' && setTimeout(function () {
      onTransitionEnd(self);
    }, speed); //  slide过渡结束后执行
  }
};

var initialSlide = DEFAULT.initialSlide;

var weSwiper = function () {
  function weSwiper(param) {
    classCallCheck(this, weSwiper);


    var pages = getCurrentPages();

    //  获取到当前page上下文
    this.pageContext = pages[pages.length - 1];
    //  把this依附在Page上下文的wecropper属性上，便于在page钩子函数中访问
    this.pageContext.swiper = this;

    Object.assign(this, DEFAULT, param || {});

    var option = {
      swiper: Object.assign(DEFAULT, param || {})
    };
    this.pageContext.setData(option);

    this.rectDistance = this.direction === 'horizontal' ? this.width : this.height;
    this.activeIndex = initialSlide; //  将初始页码赋给activeIndex
    this.noSwiper = false; //  阻止手势滑动
    this.previousIndex = initialSlide; //  返回上一个活动块的索引，切换前的索引

    /**
     * 处理callback
     */
    var onInit = this.onInit;

    typeof onInit === 'function' && onInit(this);
  }
  /**
   * start touch
   */


  createClass(weSwiper, [{
    key: 'touchstart',
    value: function touchstart(e) {
      var direction = this.direction,
          onTouchStart = this.onTouchStart;
      var _e$changedTouches$ = e.changedTouches[0],
          clientX = _e$changedTouches$.clientX,
          clientY = _e$changedTouches$.clientY;

      var distance = direction === 'horizontal' ? clientX : clientY;

      typeof onTouchStart === 'function' && onTouchStart(this, e); //  当手指碰触到slide时执行
      this.start(distance);
    }
    /**
     * touch moving
     */

  }, {
    key: 'touchmove',
    value: function touchmove(e) {
      var direction = this.direction,
          onTouchMove = this.onTouchMove;
      var _e$changedTouches$2 = e.changedTouches[0],
          clientX = _e$changedTouches$2.clientX,
          clientY = _e$changedTouches$2.clientY;

      var distance = direction === 'horizontal' ? clientX : clientY;

      typeof onTouchMove === 'function' && onTouchMove(this, e); //  手指碰触slide并且滑动时执行
      this.move(distance);
    }
    /**
     * touch ending
     */

  }, {
    key: 'touchend',
    value: function touchend(e) {
      var direction = this.direction,
          onTouchEnd = this.onTouchEnd;
      var _e$changedTouches$3 = e.changedTouches[0],
          clientX = _e$changedTouches$3.clientX,
          clientY = _e$changedTouches$3.clientY;

      var distance = direction === 'horizontal' ? clientX : clientY;

      typeof onTouchEnd === 'function' && onTouchEnd(this, e); //  手指离开slide时执行
      this.end(distance);
    }
  }]);
  return weSwiper;
}();

Object.assign(weSwiper.prototype, handle);
Object.assign(weSwiper.prototype, methods);

return weSwiper;

})));
