/**
 * Created by sail on 2017/4/1.
 */
export default {
  /**
   * 同步动画到视图
   * @param animation：动画实例
   */
  syncAnimation (animation) {
    this.pageContext.setData({
      animationData: animation.export()
    })
  }
}