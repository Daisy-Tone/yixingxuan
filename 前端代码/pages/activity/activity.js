// pages/activity/activity.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'',
    resource:[],
    uri:[],
    activityJson:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  activityJson(e){
    var point = e.currentTarget.id;
    var userid = app.globalData.User.userid;
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'activityPoint',
        userid:userid,
        point:point,
      },success(res){
        wx.showToast({
          title: res.data,
        })
      }
    })
  },
  onLoad: function (options) {
    this.loadActivity();
    this.loadActivityJSON();
  },
  /**加载服务器资源 */
  loadActivity(){
    var that = this;
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'load',
      },success(res){
        if(that.callBack){
          that.callBack(res)
        }
      }
    })
    //console.log(this.data);
  },
  loadActivityJSON(){
    var that = this;
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'loadActivity',
      },success(res){
        console.log(res.data);
        if(that.jsonCallBack){
          that.jsonCallBack(res);
        }
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
    this.loadActivity();
    var uri = [];
    this.callBack=res=>{
      this.data.url = res.data.url;
      this.data.resource = res.data.res;
      for(var i=0;i<this.data.resource.length;i++){
        uri[i] = this.data.url+this.data.resource[i];
        //console.log(uri);
      }
      this.setData({
        uri:uri,
      })
      //console.log(uri);
    }
    this.jsonCallBack=res=>{
      this.setData({
        activityJson:res.data,
      })
      console.log(this.data.activityJson);
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
    this.loadActivity();
    var uri = [];
    this.callBack=res=>{
      this.data.url = res.data.url;
      this.data.resource = res.data.res;
      for(var i=0;i<this.data.resource.length;i++){
        uri[i] = this.data.url+this.data.resource[i];
        //console.log(uri);
      }
      this.setData({
        uri:uri,
      })
      //console.log(uri);
    }
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