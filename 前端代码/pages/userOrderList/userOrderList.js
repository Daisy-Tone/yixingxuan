// pages/userOrderList/userOrderList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[]
  },
  clicktoUserOrder:function(e){
    var orderNo = e.currentTarget.id;
    console.log(orderNo);
    wx.navigateTo({
      url: '/pages/userOrder/userOrder?userOrderNo='+JSON.stringify(orderNo),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    app.loadUserOrderList(false,1);
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
    app.userOrderListCallBack=res=>{
      this.setData({
        orderList:res,
      })
    }
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
    app.loadUserOrderList(true,1);
    this.onShow();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    app.loadUserOrderList(false,app.globalData.userOrderList.length+1);
    this.onShow();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})