// pages/buyCar/buyCar.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:null,
    totalPrice:0
  },
  decrease:function(e){
    var i = e.currentTarget.id;
    var index = 0;
    var arr = this.data.cartList;
    // 遍历arr数组，获取与订单相同的下标，将该订单删除
    for(var a = 0;a < arr.length;a++){
      if(i === arr[a].count){
        index = a;
      }
    }
    arr.splice(index,1);
    this.setData({
      cartList:arr,
    })
    // app.globalData.cartList = this.data.cartList
    // console.log(this.data.cartList)
    // console.log(arr)
    // console.log(app.globalData.cartList)

    // var item = this.data.cartList[i]
    // if(this.data.cartList.length==1 && i==0)
    // console.log(this.data.cartList.length)

    // console.log(this.data.cartList)
    // console.log(e.currentTarget.id)
    // console.log(this.data.cartList[e.currentTarget.id])
  },
  /**
   * 生命周期函数--监听页面加载
   */
  showData:function(){

  },
  onLoad: function (options) {
    this.setData({
      cartList:app.globalData.cartList,
    })
    
    //console.log(this.data.cartList[0].title);
    // console.log(this.globalData.cartList.title);

    // var that = this;
    // that.setData({
    //   cartList:JSON.parse('[' + options.shopStyle + ']')
    // })
    // console.log(this.data.cartList);
  },
  // decrease:function(){
  //   var 
  // },

  submit:function(){
    for(var i = 0;i < this.data.cartList.length;i++){
      var item = this.data.cartList[i]
      this.data.totalPrice += item.allPrice;
    }
    console.log(this.data.totalPrice)
    var that = this
    wx.showModal({
      title: '点击确定提交订单',
      content: '积分金额为：'+ this.data.totalPrice+' 是否确定支付？',
      success: function (res) {
       if (res.confirm) {
        console.log('用户点击确定')
        const arr = [] = that.data.cartList
        console.log('提交后数组为')
        console.log(arr)
        app.getOrder(arr);


        //用户点击提交后发送请求
        wx.request({
          url: 'http://1.14.144.194:8080/yxx/test',
          data:{
            function:'newUserOrder',
            clothes:that.data.cartList,
          },success(res){
            console.log(res.data);
            var status = res.data.status;
            if(status==="success"){
              var userOrderNo = res.data.userOrderNo;
              wx.redirectTo({
                url: '/pages/userOrder/userOrder?userOrderNo=' + JSON.stringify(userOrderNo),
              })
            }else if(status==="failed"){
              var reason = res.data.reason;
              wx.showToast({
                title: reason,
                icon:'none',
              })
            }else{
              wx.showToast({
                title: '未知错误',
                icon:'none',
              })
            }
          }
        })
        console.log(that.data.cartList);
        console.log(that.data.totalPrice);
       } else if (res.cancel) {
        console.log('用户点击取消')
        that.data.totalPrice=0
        console.log(that.data.totalPrice)
       }
      }
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