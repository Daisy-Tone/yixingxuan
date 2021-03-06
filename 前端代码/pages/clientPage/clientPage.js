// pages/clientPage/clientPage.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  clickToSubmitRequest:function(){
    wx.navigateTo({
      url: '/pages/submitRequest/submitRequest'
    })
  },
  clickToClientOrder:function(){
    app.loadClientOrderList(1,true);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      User:app.globalData.User,
      Client:app.globalData.Client,
    })
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
      User:app.globalData.User,
      Client:app.globalData.Client,
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