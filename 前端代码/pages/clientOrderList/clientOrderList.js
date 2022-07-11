// pages/userOrderList/userOrderList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderList:app.globalData.clientOrderList,
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
  onShow: function (fresh) {
    //console.log(fresh);
    this.setData({
      orderList:app.globalData.clientOrderList,
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
    app.globalData.clientOrderList = [];
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    //app.globalData.clientOrderList = [];
    app.loadClientOrderList(1,false,false,true);
    this.onShow();
    
  },
  clicktoClientOrder:function(e){
    var orderNo = e.currentTarget.id;
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'getClientOrderData',
        clientOrderNo:orderNo,
      },success(res){
        console.log(res.data);
        wx.navigateTo({
          url: '/pages/clientOrder/clientOrder?orderDetail='+JSON.stringify(res.data),
        })
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    app.loadClientOrderList(app.globalData.clientOrderList.length+1);
    this.onShow();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})