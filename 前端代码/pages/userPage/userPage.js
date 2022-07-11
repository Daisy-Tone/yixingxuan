// pages/userPage/userPage.js
const app = getApp();
Page({
  clickToClient:function(){
    app.loginAsClient(app.globalData.User);
    wx.navigateTo({
      url: '/pages/clientPage/clientPage',
    })
  },
  clicktoUserPerson:function(){
    wx.navigateTo({
      url: '/pages/userPersonInfo/userPersonInfo',
    })
  },
  clicktoMyStep:function(){
    app.getUserRun();
    app.getWxRun(app.globalData.User);
    wx.navigateTo({
      url: '/pages/myStep/myStep',
    })
  },
  clicktoMyPoint:function(){
    app.getPoint(app.globalData.User);
    wx.navigateTo({
      url: '/pages/myPoint/myPoint',
    })
  },
  clicktoOrder:function(){
    wx.navigateTo({
      url: '/pages/userOrderList/userOrderList',
    })
  },
  sign:function(){
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'sign',
        userid:app.globalData.User.userid,
      },success(res){
        console.log(res.data);
        wx.showToast({
          title: res.data,
        })
      }
    })
  },
  get1000Points:function(){
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'get1000Points',
        userid:app.globalData.User.userid,
      },success(res){
        console.log(res.data);
        wx.showToast({
          title: res.data,
        })
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    User:null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      User:app.globalData.User,
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //this.getUserRun();
    //this.getWxRun();
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