// pages/submitRequest/submitRequest.js
const app = getApp()
var style_array = new Array();
var size_array = new Array();
var all_array = new Array();
Page({
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Client:app.globalData.Client,
      User:app.globalData.User,
    })
    
  },
  showStyle: function () {
    this.setData({
      isRuleTrue: true
    })
  },
  showFleece: function () {
    this.setData({
      fleeceTrue:true
    })
  },
  showNum: function () {
    this.setData({
      isRuleTrue: true
    })
  },
  hideRule:function(){
    this.setData({
      isRuleTrue:false,
    })
  },
  //输入需求
  changeTextarea:function(e){
    this.setData({
      text:e.detail.value
    })
    console.log(this.data.text)
  },
  decTshirtNum:function(e){
    var index = e.currentTarget.id;
    console.log(index);
    //更新每一个项的num
    var tempData = this.data.style_num;
    for(var i = 0;i < tempData.length;i++){
      if(i == index){
        tempData[i].num = tempData[i].num>=1400 ? tempData[i].num-400:tempData[i].num;
      }
    }
    this.setData({
      style_num:tempData
    })
  },
  incTshirtNum:function(e){
    var index = e.currentTarget.id;
    console.log(index);
    //更新每一个项的num
    var tempData = this.data.style_num;
    for(var i = 0;i < tempData.length;i++){
      if(i == index){
        tempData[i].num = tempData[i].num<1000 ? tempData[i].num+1000:tempData[i].num+400;
      }
    }
    this.setData({
      style_num:tempData
    })
  },
  getID:function(e){
    //console.log(e.currentTarget.dataset.id);//打印index
    this.setData({
      index:e.currentTarget.dataset.id//获取index
    })
  },
  // 多选框
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.data.size_array = e.detail.value;
  },
  //确定
  confirmRule:function(){
    var isRuleTrue = true;
    var sizeIsOK = false;
    var styleIsOK = false;
    if(this.data.size_array.length == 0){
      sizeIsOK = false;
    }else{
      sizeIsOK = true;
    }
    for(var i = 0;i < this.data.style_num.length;i++){
      console.log(this.data.style_num[i])
      if(this.data.style_num[i].num != 0){
        styleIsOK = true;
        break;
      }
    }
    if(sizeIsOK && styleIsOK){
      isRuleTrue = false;
      this.setData({
        allOK: true
      })
    }
    this.setData({
      isRuleTrue:isRuleTrue
    })
    //如果符合关闭对话框的条件
    if(this.data.isRuleTrue){
      wx.showToast({
        title: '请检查尺码和数量',
        icon: 'none',
        duration: 1500,
      })
    }else{
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1500,
      })
    }
    var Size = "你选择的尺码为：";
    for(var i=0; i<this.data.size_array.length;i++){        
        Size = Size + this.data.size_array[i] + ' '
      this.setData({
        selected:Size
      })
    }
  },
  // 提交
  summit:function(){
    var that = this
    //获取衣服款式及数量
    all_array = [];
    style_array = [];
    this.data.style_array = [];
    for(var i = 0;i<this.data.style_num.length;i++){
      var obj = {
        style:this.data.style_num[i].style,
        num:this.data.style_num[i].num
      }
      this.data.style_array.push(obj);
    }
    console.log("getStyle:" + JSON.stringify( this.data.style_array));
    
    all_array.unshift(this.data.text),
    all_array.push(this.data.style_array),
    all_array.push(this.data.size_array)
    console.log(all_array);

    var style_array = this.data.style_array;
    var size_array = this.data.size_array;
    //console.log(JSON.stringify(all_array))
    if(this.data.allOK){
      wx.request({
        url: 'http://1.14.144.194:8080/yxx/test',
        header:{
          'Content-Type':'application/json'
        },
        method:"GET",
        data:{
          function:'newClientOrder',
          clientid:app.globalData.Client.clientid,
          all_array:all_array
        },
        success:function(res){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 500,
          })
          app.loadClientOrderList(1,true,true);
        }
      })
    }else{
      wx.showToast({
        title: '请检查输入是否为空',
        icon: 'none',
        duration: 1500,
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    Client:null,
    isRuleTrue:false,//控制显示弹窗开关
    text:"",
    index:0,//获取数组下标
    newNum:0,//给style_num每个对象的num传值的中间变量
    selected:[],//已选框
    style_array:[],//衣服款式及对应数量
    size_array:[],//衣服尺码
    all_array:[],//存储上两个数组并传到后台
    style_num:[
      {
        id:0,
        style:"卫衣",
        icon:"/images/point.png",
        num:0
      },
      {
        id:1,
        style:"T恤",
        icon:"/images/point.png",
        num:0
      },
      {
        id:2,
        style:"Polo衫",
        icon:"/images/point.png",
        num:0
      }
    ],
    items:[
      {value: "M", name: "M",},
      {value: "L", name: "L"},
      {value: "XL", name: "XL"},
      {value: "XXL", name: "XXL"}
    ]

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
    all_array = new Array();
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