// pages/clothdetail/clothdetail.js
const app = getApp()
Page({
  showRule: function () {
    this.setData({
      isRuleTrue: true
    })
  },
  hideRule:function(){
    this.setData({
      isRuleTrue:false
    })
  },
  // 点击加1
  addNum:function(){
    var inputNum = this.data.inputNum;
    this.setData({
      inputNum:inputNum+1
    })
  },
  // 点击减1
  reduceNum:function(){
    var inputNum = this.data.inputNum;
    if(inputNum>1){
      this.setData({
        inputNum:inputNum-1
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    isRuleTrue:false,
    animationData:{},
    inputNum:1,  //数量
    perPrice:0,//单价
    shopDetail:[],//衣服信息
    tempValue:[],
    textNum:0,//评价数量
    text:'',//评价内容
    userText:[],
    obj:{},
    appraise:[],
    chooseBlock:[
      {
        id:0,
        title:'选择款式',
        icon:'http://1.14.144.194:8080/download2/images/point.png',
        detail:[
          {name:"卫衣"},
          {name:"Polo衫"},
          {name:"T恤"}
        ]
      },
      {
        id:1,
        title:'选择颜色',
        icon:'http://1.14.144.194:8080/download2/images/point.png',
        detail:[
          {name:"白"},
          {name:"黑"},
          {name:"宝蓝"}
        ]
      },
      {
        id:2,
        title:'选择尺码',
        icon:'http://1.14.144.194:8080/download2/images/point.png',
        detail:[
          {name:"M"},
          {name:"L"},
          {name:"XL"},
          {name:"XXL"}
        ]
      }
    ],
    
//数据结构：以一组一组的数据来进行设定 
  commodityAttr: [],
  attrValueList: [],
  shopStyle:[
    {
      title:'',
      style:'',
      color:'',
      size:'',
      clientid: 0,
      clientOrderNo: '',
      userid:'',
      num:0,
      price:0,
      allPrice:0
    }],
  },
  showAppraise(begin,first){
    var that = this;
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'showAppraise',
        clientOrderNo:this.data.clientOrderNo,
        begin:begin,
        offset:10,
      },success(res){
        console.log(res.data);
        var list = that.data.appraise;
        if(first){
          list = [];
        }
        for(var i = 0;i < res.data.length;i++){
          list.push(res.data[i]);
        }
        if(that.appraiseCallBack){
          that.appraiseCallBack(list);
        }
      }
    })
  },
  evaluate:function(e){
    this.setData({
      text:e.detail.value
    })
    console.log(this.data.text);
  },
  submitText:function(){
    this.setData({
      obj:{
        userID:'用户id',
        text:this.data.text,
        time:'2020-06-11'
      },
    })
    var tempList = this.data.userText;
    console.log(tempList);
    tempList.push(this.data.obj)
    console.log(tempList);
    this.setData({
      userText:tempList,
      textNum:this.data.userText.length
    })
    // console.log(this.data.textNum)
  },
  submit: function () {
    var value = [];
    for (var i = 0; i < this.data.attrValueList.length; i++) {
     if (!this.data.attrValueList[i].selectedValue) {
      break;
     }
     value.push(this.data.attrValueList[i].selectedValue);
    }
    this.data.tempValue = value;
    console.log(this.data.tempValue);
    if (i < this.data.attrValueList.length) {
     wx.showToast({
      title: '请选择完整！',
      icon: 'error',
      duration: 500
     })
    } else {
     var valueStr = "";
     for(var i = 0;i < value.length;i++){
      console.log(value[i]);
      valueStr += value[i]+",";
    }
    // 将各属性传给数组shopStyle
    var style = "shopStyle.style"
    var clientid = "shopStyle.clientid"
    var userid = "shopStyle.userid"
    var clientOrderNo = "shopStyle.clientOrderNo"
    var color="shopStyle.color"
    var size="shopStyle.size"
    var num="shopStyle.num"
    var price="shopStyle.price"
    var allPrice="shopStyle.allPrice"
    this.setData({
      [style]:this.data.style,
      [clientid]:this.data.clientid,
      [userid]:app.globalData.User.userid,
      [clientOrderNo]:this.data.clientOrderNo,
      [color]:this.data.tempValue[0],
      [size]:this.data.tempValue[1],
      [num]:this.data.inputNum,
      [price]:this.data.price,
      [allPrice]:this.data.inputNum*this.data.price
    })
    console.log(this.data.shopStyle);
    valueStr += "，" + this.data.inputNum + "件";
    var shopStyle = this.data.shopStyle
    var that = this
     wx.showModal({
      title: '你选择的是',
      content: valueStr,
      success: function (res) {
       if (res.confirm) {
        console.log('用户点击确定')
        const obj = {}
        obj.style = that.data.shopStyle.style,
        obj.clientid = that.data.shopStyle.clientid,
        obj.userid = that.data.shopStyle.userid,
        obj.clientOrderNo = that.data.shopStyle.clientOrderNo,
        obj.title = that.data.shopStyle.title,
        obj.color = that.data.tempValue[0],
        obj.size = that.data.tempValue[1],
        obj.num = that.data.inputNum,
        obj.price = that.data.price,
        obj.allPrice = that.data.inputNum*that.data.price

        app.addToCart(obj);
        // wx.navigateTo({
        //   url: '/pages/buyCar/buyCar?shopStyle=' + JSON.stringify(shopStyle),
        // })
        // console.log(shopStyle);
       } else if (res.cancel) {
        console.log('用户点击取消')
       }
      }
     }) 
     console.log(valueStr);
    }
   },
  clickToBuyCar:function(){
    wx.navigateTo({
      url: '/pages/buyCar/buyCar',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      shopDetail:JSON.parse('['+options.shopDetail+']')
    })
    var cloth = this.data.shopDetail[0];
    var clientOrderNo = cloth.client_order_no;
    var styleName = cloth.style_name;
    this.data.clientOrderNo = clientOrderNo;
    this.data.styleName = styleName;
    wx.request({
      url: 'http://1.14.144.194:8080/yxx/test',
      data:{
        function:'loadClothDetail',
        clientOrderNo:clientOrderNo,
        styleName:styleName,
      },success(res){
        console.log(res.data);
        if(that.clothCallBack){
          that.clothCallBack(res);
        }
      }
    })
    this.showAppraise(1,true);
    console.log(clientOrderNo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onShow();
  },
  //组装数据
  combinaData(color,size){
    var data = [];
    var index = 1;
    for(var i = 0;i < color.length;i++){
      for(var j = 0;j < size.length;j++){
        var priceId = index;
        var price = this.data.shopDetail[0].use_points;
        //console.log(price);
        var color_array = {"attrKey": "选择颜色：","attrValue": color[i]};
        var size_array = {"attrKey": "选择尺码：","attrValue": size[j]};
        var attr = [color_array,size_array];
        var temp = {priceId:priceId,price:price,"attrValueList":attr};
        data[index-1] = temp;
        index++;
      }
    }
    console.log(this.data.commodityAttr);
    this.setData({
      commodityAttr:data,
    })
    console.log(this.data.commodityAttr);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.appraiseCallBack=res=>{
      this.setData({
        appraise:res,
      })
    }

    this.clothCallBack=res=>{
      var color = res.data[2];
      var size = res.data[1];
      var pic = res.data[0];
      this.setData({
        pic:pic,
        style:this.data.shopDetail[0].style_name,
        price:this.data.shopDetail[0].use_points,
        clientid:this.data.shopDetail[0].client_id,
        clientOrderNo:this.data.shopDetail[0].client_order_no,
      })
      this.combinaData(color,size);
      this.setData({
        includeGroup: this.data.commodityAttr
       });
       this.distachAttrValue(this.data.commodityAttr);
       // 只有一个属性组合的时候默认选中 
       // console.log(this.data.attrValueList); 
       if (this.data.commodityAttr.length == 1) {
        for (var i = 0; i < this.data.commodityAttr[0].attrValueList.length; i++) {
         this.data.attrValueList[i].selectedValue = this.data.commodityAttr[0].attrValueList[i].attrValue;
        }
        this.setData({
         attrValueList: this.data.attrValueList
        });
       }
    }
   },
   /* 获取数据 */
   distachAttrValue: function (commodityAttr) {
    /** 
    将后台返回的数据组合成类似 
    { 
    attrKey:'型号', 
    attrValueList:['1','2','3'] 
    } 
    */
    // 把数据对象的数据（视图使用），写到局部内 
    var attrValueList = this.data.attrValueList;
    // 遍历获取的数据 
    for (var i = 0; i < commodityAttr.length; i++) {
     for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
      var attrIndex = this.getAttrIndex(commodityAttr[i].attrValueList[j].attrKey, attrValueList);
      // console.log('属性索引', attrIndex); 
      // 如果还没有属性索引为-1，此时新增属性并设置属性值数组的第一个值；索引大于等于0，表示已存在的属性名的位置 
      if (attrIndex >= 0) {
       // 如果属性值数组中没有该值，push新值；否则不处理 
       if (!this.isValueExist(commodityAttr[i].attrValueList[j].attrValue, attrValueList[attrIndex].attrValues)) {
        attrValueList[attrIndex].attrValues.push(commodityAttr[i].attrValueList[j].attrValue);
       }
      } else {
       attrValueList.push({
        attrKey: commodityAttr[i].attrValueList[j].attrKey,
        attrValues: [commodityAttr[i].attrValueList[j].attrValue]
       });
      }
     }
    }
    // console.log('result', attrValueList) 
    for (var i = 0; i < attrValueList.length; i++) {
     for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
      if (attrValueList[i].attrValueStatus) {
       attrValueList[i].attrValueStatus[j] = true;
      } else {
       attrValueList[i].attrValueStatus = [];
       attrValueList[i].attrValueStatus[j] = true;
      }
     }
    }
    this.setData({
     attrValueList: attrValueList
    });
    
   },
   getAttrIndex: function (attrName, attrValueList) {
    // 判断数组中的attrKey是否有该属性值 
    for (var i = 0; i < attrValueList.length; i++) {
     if (attrName == attrValueList[i].attrKey) {
      break;
     }
    }
    return i < attrValueList.length ? i : -1;
   },
   isValueExist: function (value, valueArr) {
    // 判断是否已有属性值 
    for (var i = 0; i < valueArr.length; i++) {
     if (valueArr[i] == value) {
      break;
     }
    }
    return i < valueArr.length;
   },
   /* 选择属性值事件 */
   selectAttrValue: function (e) {
    /* 
    点选属性值，联动判断其他属性值是否可选 
    { 
    attrKey:'型号', 
    attrValueList:['1','2','3'], 
    selectedValue:'1', 
    attrValueStatus:[true,true,true] 
    } 
    console.log(e.currentTarget.dataset); 
    */
    var attrValueList = this.data.attrValueList;
    var index = e.currentTarget.dataset.index;//属性索引 
    var key = e.currentTarget.dataset.key;
    var value = e.currentTarget.dataset.value;
    if (e.currentTarget.dataset.status || index == this.data.firstIndex) {
     if (e.currentTarget.dataset.selectedvalue == e.currentTarget.dataset.value) {
      // 取消选中 
      this.disSelectValue(attrValueList, index, key, value);
     } else {
      // 选中 
      this.selectValue(attrValueList, index, key, value);
     }
    
    }
   },
   /* 选中 */
   selectValue: function (attrValueList, index, key, value, unselectStatus) {
    // console.log('firstIndex', this.data.firstIndex); 
    var includeGroup = [];
    if (index == this.data.firstIndex && !unselectStatus) { // 如果是第一个选中的属性值，则该属性所有值可选 
     var commodityAttr = this.data.commodityAttr;
     // 其他选中的属性值全都置空 
     // console.log('其他选中的属性值全都置空', index, this.data.firstIndex, !unselectStatus); 
     for (var i = 0; i < attrValueList.length; i++) {
      for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
       attrValueList[i].selectedValue = '';
      }
     }
    } else {
     var commodityAttr = this.data.includeGroup;
    }
    
    // console.log('选中', commodityAttr, index, key, value); 
    for (var i = 0; i < commodityAttr.length; i++) {
     for (var j = 0; j < commodityAttr[i].attrValueList.length; j++) {
      if (commodityAttr[i].attrValueList[j].attrKey == key && commodityAttr[i].attrValueList[j].attrValue == value) {
       includeGroup.push(commodityAttr[i]);
      }
     }
    }
    attrValueList[index].selectedValue = value;
    
    // 判断属性是否可选 
    for (var i = 0; i < attrValueList.length; i++) {
     for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
      attrValueList[i].attrValueStatus[j] = false;
     }
    }
    for (var k = 0; k < attrValueList.length; k++) {
     for (var i = 0; i < includeGroup.length; i++) {
      for (var j = 0; j < includeGroup[i].attrValueList.length; j++) {
       if (attrValueList[k].attrKey == includeGroup[i].attrValueList[j].attrKey) {
        for (var m = 0; m < attrValueList[k].attrValues.length; m++) {
         if (attrValueList[k].attrValues[m] == includeGroup[i].attrValueList[j].attrValue) {
          attrValueList[k].attrValueStatus[m] = true;
         }
        }
       }
      }
     }
    }
    // console.log('结果', attrValueList); 
    this.setData({
     attrValueList: attrValueList,
     includeGroup: includeGroup
    });
    
    var count = 0;
    for (var i = 0; i < attrValueList.length; i++) {
     for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
      if (attrValueList[i].selectedValue) {
       count++;
       break;
      }
     }
    }
    if (count < 2) {// 第一次选中，同属性的值都可选 
     this.setData({
      firstIndex: index
     });
    } else {
     this.setData({
      firstIndex: -1
     });
    }
   },
   /* 取消选中 */
   disSelectValue: function (attrValueList, index, key, value) {
    var commodityAttr = this.data.commodityAttr;
    attrValueList[index].selectedValue = '';
    
    // 判断属性是否可选 
    for (var i = 0; i < attrValueList.length; i++) {
     for (var j = 0; j < attrValueList[i].attrValues.length; j++) {
      attrValueList[i].attrValueStatus[j] = true;
     }
    }
    this.setData({
     includeGroup: commodityAttr,
     attrValueList: attrValueList
    });
    
    for (var i = 0; i < attrValueList.length; i++) {
     if (attrValueList[i].selectedValue) {
      this.selectValue(attrValueList, i, attrValueList[i].attrKey, attrValueList[i].selectedValue, true);
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
    this.data.appraise = [];
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.showAppraise(1,true)
    this.onShow();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.showAppraise(this.data.appraise.length+1,false)
    this.onShow();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  }
})