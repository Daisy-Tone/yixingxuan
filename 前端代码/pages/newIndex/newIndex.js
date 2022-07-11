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
  //搜索
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
  data: {
    shoptext: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示
    shoplist: false, //显示商品列表
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组
    shoparray: [
      { //商品
        id: 0,
        images: "http://1.14.144.194:8080/download2/images/repray.png",
        title: "完达山甄选牧场酸奶饮品牛奶饮料常温发酵乳包...",
        money: "88.00",
        sold: "78箱",
        status: 0
      }, {
        id: 1,
        images: "http://1.14.144.194:8080/download2/images/repray2.png",
        title: "网红 天日盐饼干 粗粮早餐 代餐宿舍小吃零食 130g*...",
        money: "26.80",
        sold: "34包",
        status: 0
      },
      {
        id: 2,
        images: "http://1.14.144.194:8080/download2/images/repray2.png",
        title: "我是侍郎 代餐宿舍小吃零食 130g*...",
        money: "20.80",
        sold: "32包",
        status: 0
      },
      {
        id: 3,
        images: "http://1.14.144.194:8080/download2/images/repray2.png",
        title: "我是侍郎 代餐宿舍小吃零食 130g*...",
        money: "20.80",
        sold: "32包",
        status: 0
      }
    ],
    // index数组
    shop:[
      {
        id:0,
        title:'我是剑骨头',
        clientName:'Archer',
        image:'http://1.14.144.194:8080/download2/images/repray.png',
        icon:'http://1.14.144.194:8080/download2/images/point.png',
        price:'520',
        status: 0
      },
      {
        id:1,
        title:'我是侍郎',
        clientName:'saber',
        image:'http://1.14.144.194:8080/download2/images/repray2.png',
        icon:'http://1.14.144.194:8080/download2/images/point.png',
        price:'555',
        status: 0
      },
      {
        id:2,
        title:'我是老干妈',
        clientName:'mother',
        image:'http://1.14.144.194:8080/download2/images/repray.png',
        icon:'http://1.14.144.194:8080/download2/images/point.png',
        price:'666',
        status: 0
      },
      {
        id:3,
        title:'我是曹贼',
        clientName:'ruler',
        image:'http://1.14.144.194:8080/download2/images/repray2.png',
        icon:'http://1.14.144.194:8080/download2/images/point.png',
        price:'220',
        status: 0
      },
      {
        id:4,
        title:'我是教师',
        clientName:'teacher',
        image:'http://1.14.144.194:8080/download2/images/repray.png',
        icon:'http://1.14.144.194:8080/download2/images/point.png',
        price:'5660',
        status: 0
      }
    ]
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
  }
})