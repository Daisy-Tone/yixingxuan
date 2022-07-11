// pages/userOrder/userOrder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:[],
    orderList:[],
    title:'',
    hidden:false,
    appraiseH: true,
    text:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  changeTextarea:function(e){
    this.setData({
      text:e.detail.value
    })
    console.log(this.data.text)
  },
  loadUserOrder(userOrderNo){
    console.log(userOrderNo)
    var that = this;
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'loadUserOrder',
        userOrderNo:userOrderNo,
      },success(res){
        console.log(res.data);
        if(that.userOrderCallBack){
          that.userOrderCallBack(res);
        }
      }
    })
  },
  onLoad: function (options) {
    var userOrderNo = JSON.parse(options.userOrderNo)
    this.setData({
      userOrderNo:userOrderNo,
    })
    this.loadUserOrder(userOrderNo);
  },
  //确认收货物
  comfirm:function(){
    var that = this
    wx.showModal({
      title: '点击确认收货',
      content: '是否确认？',
      success: function (res) {
       if (res.confirm) {
        console.log('用户点击确定')
        wx.request({
          url: 'http://1.14.144.194:8080/yxx/test',
          data:{
            function:'updateUserOrderStatus',
            userOrderNo:that.data.orderInfo.user_order_no,
            status:'已收货',
          },success(res){
            wx.showToast({
              title: res.data,
            })
            that.loadUserOrder(that.data.orderInfo.user_order_no);
            that.onShow();
          }
        })
       } else if (res.cancel) {
        console.log('用户点击取消')
       }
      }
    }) 
  },
  //评价此单
  appraise:function(){
    var appraise = this.data.text;
    var userid = app.globalData.User.userid;
    var userOrderNo = this.data.userOrderNo;
    var that = this;
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'userAppraise',
        userid:userid,
        userOrderNo:userOrderNo,
        clientOrderNo:this.data.clientOrderNo,
        appraise:appraise,
        status:'已评价',
      },success(res){
        wx.showToast({
          title: res.data,
        })
        that.loadUserOrder(userOrderNo);
        that.onShow();
      }
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
    this.userOrderCallBack=res=>{
      this.setData({
        orderInfo:res.data[0][0],
        orderList:res.data[1],
        clientOrderNo:res.data[1][0].client_order_no,
      })
      console.log(res.data[0][0].user_order_status);
      if(res.data[0][0].user_order_status==="已收货"){
        this.setData({
          hidden:true,
          appraiseH:false,
        })
      }else if(res.data[0][0].user_order_status==="已评价"){
        this.setData({
          hidden:true,
          appraiseH:true,
        })
      }
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