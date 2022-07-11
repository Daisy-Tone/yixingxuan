// pages/clientOrder/clientOrder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    style_array:[],
    size_array:[],
    num:0,
    text:'',
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    showSelectBox:true,//点击更新后消失
    selectData:['未通过','通过'],//下拉列表的数据
    index:0,//选择的下拉列表下标,
    state:'未通过',
    size:[],
    style_num:[],
    clientOrder:null,
  },
  selectTap(){
    this.setData({
     show: !this.data.show
    });
    console.log();
  },
    // 点击下拉列表
  optionTap(e){
    let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
     index:Index,
     show:!this.data.show
    });
  },
  update:function(){
    var that = this
    if(this.data.index==1){
      wx.showModal({
        title:'通过审核',
        content:'是否通过审核？通过审核后不可修改',
        success(res){
          if(res.confirm){
            wx.request({
              url: 'http://1.14.144.194:8080/yxx/test',
              data:{
                function:'updateClientOrderVerify',
                clientOrderNo:that.data.clientOrder.client_order_no,
                status:that.data.selectData[that.data.index],
              },success(res){
                console.log(res.data);
                that.setData({
                  state:that.data.selectData[that.data.index],
                  showSelectBox:!that.data.showSelectBox
                })
                that.data.clientOrder.client_verify_status = that.data.state;
                wx.showToast({
                  title: '状态更新完成',
                })
                that.onShow();
              }
            })
            console.log("用户点击确定")
          }
          else if(res.cancel){
            console.log("用户点击取消")
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var temp = JSON.parse(options.orderDetail)
    var clientOrder = temp[0][0];
    var style_num = temp[1];
    var size = temp[2];
    this.setData({
      orderDetail:temp,
      clientOrder:clientOrder,
      style_num:style_num,
      size:size,
      state:clientOrder.client_verify_status,
    })
    console.log(clientOrder);
    console.log(style_num);
    console.log(size)
    if(this.data.state === "通过"){
      this.setData({
        showSelectBox:false,
      })
    }else {
      this.setData({
        showSelectBox:true,
      })
    }
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
      clientOrder:this.data.clientOrder
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
    //app.loadClientOrderList(1,true);
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