/**
 * Created by sail on 2017/4/1.
 */
export default {
  /**
   * 同步设置到视图
   * @param DEFAULT：默认参数
   * @param param：构造参数
   */
  syncView (viewName, prop) {
    this.pageContext.setData({
      [`${viewName}`]: prop
    })
  }
}