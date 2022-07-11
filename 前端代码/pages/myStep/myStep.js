// pages/myStep/myStep.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  clicktoMyPoint:function(){
    app.getPoint(app.globalData.User);
    wx.navigateTo({
      url: '/pages/myPoint/myPoint',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      WxRun:app.globalData.WxRun,
      StepToday:app.globalData.StepToday,
      WxRunStep:app.globalData.WxRunStep
    })
    console.log(this.data.WxRunStep);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onShow();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      WxRunStep:app.globalData.WxRunStep
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    //下拉刷新步数
    app.getWxRun(app.globalData.User);
    this.onShow();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})