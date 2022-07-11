
const app = getApp();
Page({
  //清除历史记录
  cleanhistory: function(e) {
    this.setData({
      history: false, //隐藏历史记录
      historyArray: [], //清空历史记录数组
      newArray: [],
      shoptext: "" //清空搜索框
    })
  },
  //搜索  重新设计  发起请求
  search: function(e) {
    var searchtext = this.data.shoptext; //搜索框的值
    var sss = true;
    if (searchtext != "") {
      //将搜索框的值赋给历史数组
      this.data.historyArray.push(searchtext);
      //模糊查询 循环查询数组中的title字段
      for (var index in this.data.shop) {
        var num = this.data.shop[index].title.indexOf(searchtext);
        let temp = 'shop[' + index + '].status';
        if (num != -1) { //不匹配的不显示
          this.setData({
            [temp]: 1,
          })
          sss = false //隐藏未找到提示
        }
      }
      this.setData({
        history: false, //隐藏历史记录
        noneview: sss, //隐藏未找到提示
        shoplist: true, //显示商品列表
        newArray: this.data.historyArray //给新历史记录数组赋值
      })
    } else {
      this.setData({
        noneview: true, //显示未找到提示
        shoplist: false, //隐藏商品列表
        history: false, //隐藏历史记录
      })
    }
  },
  clicktoUserPerson:function(){
    wx.navigateTo({
      url: '/pages/userPersonInfo/userPersonInfo',
    })
  },
  clicktoDetail:function(e){
    let index = e.currentTarget.dataset.index;
    console.log("下标:"+ index);
    wx.navigateTo({
      // 传递所点击item的对象
      url: '/pages/clothdetail/clothdetail?shopDetail=' + JSON.stringify(this.data.shop[index]),
    })
    console.log(this.data.shop[index]);
  },
  data: {
    User:null,
    shoptext: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示
    shoplist: false, //显示商品列表
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组
    shoparray: [],
    // index数组
    shop:[],
  },
  //搜索框的值
  shoppinginput: function(e) {
    //当删除input的值为空时
    if (e.detail.value == "") {
      this.setData({
        history: true, //显示历史记录
        shoplist: false //隐藏商品列表
      });
      //所有商品列表的状态改为0
      for (var index in this.data.shop) {
        let temp = 'shop[' + index + '].status';
        this.setData({
          [temp]: 0,
        })
      }
    }
    this.setData({
      shoptext: e.detail.value
    })
  },
  //点击历史记录赋值给搜索框
  textfz: function(e) {
    this.setData({
      shoptext: e.target.dataset.text
    })
  },
  onLoad(){
    app.loadClothes();
    //页面加载时回调函数以确保数据加载进来了
    app.userInfoReadyCallback=res=>{
      this.setData({
        User:res.data,
      })
    }
  },
  onShow(){
    app.clothesCallBack=res=>{
      this.setData({
        shop:res.data,
      })
      console.log(this.data.shop);
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    app.loadClothes();
    this.onShow();
    wx.showToast({
      title: '刷新成功',
    })
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  
})