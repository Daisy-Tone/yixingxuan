// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          wx.request({
            url: 'http://1.14.144.194:8080/yxx/test',
            data:{
              function:'loginAsUser',
              code:res.code,
            },
            success(res){
              var app = getApp();
              res.data.userAvatar = res.data.userAvatar.replace(/[\r\n]/g, "")
              app.globalData.User = res.data;
              if(app.userInfoReadyCallback){
                app.userInfoReadyCallback(res);
              }
              console.log(res.data);
            },
            fail(){
              console.log(res.data);
            }
          })
        }else{
          console.log("登录失败",res.errMsg);
        }
      }
    })
  },
  //获取用户积分
  getPoint(User){
    var app = getApp();
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'getPoints',
        userid:User.userid
      },success(res){
        var allPoint  = res.data[0].all_points;
        app.globalData.allPoints = allPoint;
        var pointDetail = res.data[1];
        for(var i = 0;i < pointDetail.length;i++){
          pointDetail[i].point_date = pointDetail[i].point_date.substring(0,10);
        }
        app.globalData.pointDetail = pointDetail;
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  //获取数据库中用户的历史步数信息
  getWxRun(User){
    var app = getApp();
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data :{
        function:"getStep",
        userid:User.userid,
      },
      success(res){
          app.globalData.WxRunStep = res.data;
          //console.log(app.globalData.WxRunStep);
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      })
  },
  //申请授权并获取用户当日的步数上传到数据库
  getUserRun(){
    var app = getApp();
      wx.getSetting({
        success(res){
          if(!res.authSetting['scope.werun']){
            //申请用户授权
            wx.authorize({
              scope: 'scope.werun',
              success(){
                wx.showToast({
                  title: '授权成功',
                })
              },fail(){
                wx.showToast({
                  title: '授权失败',
                })
              }
            })
          }else{
            //读取用户微信运动数据
            wx.getWeRunData({
              success(res){
                app.globalData.WxRun = res;
                console.log(app.globalData.WxRun);
                wx.request({
                  url: 'http://1.14.144.194:8080/yxx/test',
                  data:{
                    function: 'getStepToday',
                    encryptedData: app.globalData.WxRun.encryptedData,
                    iv: app.globalData.WxRun.iv,
                    sessionKey: app.globalData.User.sessionKey,
                    userid:app.globalData.User.userid
                  },
                  success(res){
                    console.log(res.data);
                    app.globalData.StepToday = res.data;
                  }
                })
              },fail(){
                wx.showModal({
                  title: '读取微信运动数据失败',
                  content: '请在小程序右上角[设置中开启授权]'
                })
              }
            })
          }
        }
      })
  },
  //以客户的方式登录
  loginAsClient(User){
    var app = getApp();
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'loginAsClient',
        userid:User.userid,
      },success(res){
        app.globalData.Client = res.data;
      }
    })
  },
  //加载商品流信息
  loadClothes(){
    const app = getApp();
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'loadClothes',
      },success(res){
        //app.globalData.Shop = res.data;
        if(app.clothesCallBack){
          app.clothesCallBack(res);
        }
        //console.log(app.globalData.Shop);
      }
    })
  },
  //加载用户订单列表
  loadUserOrderList(fresh,begin){
    var app = getApp();
    var that = this;
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'loadUserOrderList',
        userid:app.globalData.User.userid,
        begin:begin,
        offset:10,
      },success(res){
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        if(fresh){
          app.globalData.userOrderList = [];
        }
        for(var i = 0;i < res.data.length;i++){
          app.globalData.userOrderList.push(res.data[i])
        }
        if(app.userOrderListCallBack){
          app.userOrderListCallBack(app.globalData.userOrderList);
        }
        console.log(app.globalData.userOrderList);
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },
  //加载客户订单列表
  loadClientOrderList(begin,first,submit,fresh){
    const app = getApp();
    wx.showLoading({
      title: '请稍等片刻',
    })
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'getClientOrderList',
        clientid:app.globalData.Client.clientid,
        begin:begin,
        offset:10,
      },success(res){
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        console.log(app.globalData.clientOrderList);
        if(fresh){
          app.globalData.clientOrderList = [];
        }
        for(var i = 0;i < res.data.length;i++){
          app.globalData.clientOrderList.push(res.data[i])
        }
        if(first){
          if(submit){
            wx.redirectTo({
              url: '/pages/clientOrderList/clientOrderList',
            })
          }else{
            wx.navigateTo({
              url: '/pages/clientOrderList/clientOrderList',
            })
          }
        }
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },
  addToCart(obj) {
    // 1.判断是否已经添加进来
    const oldInfo = this.globalData.cartList.find((item) => item.color === obj.color&&item.size === obj.size)
    var index = 0,flag = 0;
    for(var i = 0; i < this.globalData.cartList.length; i++){
      var item = this.globalData.cartList[i];
      if(item.color === obj.color&&item.size === obj.size){
        index = i;
        flag = 1;
      }
    }
    console.log(index)
    if (flag) {
      this.globalData.cartList[index].num += obj.num
      var item = this.globalData.cartList[index];
      item.allPrice = item.num*item.price
    } else {
      this.globalData.temp += 1
      obj.count = this.globalData.temp
      this.globalData.cartList.push(obj)
    }
    console.log(this.globalData.cartList)

    // 2.购物车回调
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  },
  decrease:function(e){
    var i = e.currentTarget.dataset.id
    console.log(i)
  },
  getOrder:function(arr){
    this.globalData.orderList = arr
    console.log("orderList数组为")
    console.log(this.globalData.orderList)

  },
  globalData: {
    User: null,
    Client: null,
    cartList:[],
    orderList:[],
    clientOrderList:[],
    userOrderList:[],
    temp:-1,
    Shop:[],
  }
})
