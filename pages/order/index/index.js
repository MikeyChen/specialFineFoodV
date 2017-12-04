// pages/order/index/index.js
var app = getApp(); 
var order = [0, 1, 2, 3, 4]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //购餐数量
    width: "300",
    height: "100",
    toView: 'B',
    A: 'A',
    scrollTop: 200,
    letter: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    num:0,
    price:15.58,
    sum:0, 
    show:'',
    flag:true,
    shadeShow:"",
    colorNum:0,
    webSite: app.globalData.webSite, 
    arrInfo:[],
    allPrice:0,
    typeList:[],
    totalPrice:0,
    allNum:0,
    allCartNum:0,
    allDish:[],
    allNumber:0,
    allPrices:0,
    fee:0,
    sendFee:3,
    className: 'model',
    appear:''
  },
  showDetail:function(e){
    console.log(e);
    var that=this;
      that.setData({
        className: 'model1',
        appear: 'appear',
        detailImg:e.currentTarget.dataset.img,
        detailName: e.currentTarget.dataset.name,
        detailInfo: e.currentTarget.dataset.info,
        detailPrice: e.currentTarget.dataset.price
      });
    
    
  },
  model:function(){
  var that=this;
    that.setData({
      className: 'model',
      appear: ''
    });
  },
  //  点击美食分类改变背景色,相应内容置顶
  click: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var num = e.currentTarget.dataset.num;
    that.data.foodList.forEach(function (val, key) {
      if (id== val.id) {
        that.setData({
          toView: id,
         colorNum:num
          
        })
      }
    })
  },
  //计算总价，总数
  getTotalPrice() {
    var click=true;
    var that=this;
    let total = 0;
    let numbers = 0;
    let foodList = that.data.foodList;  // 获取购物车列表
    var fee;//总餐盒费
    var money=that.data.wrap_fee;//单个餐盒费
    var sendFee = parseInt(that.data.packing_fee);
    foodList.forEach(function(val,key){
      if(val.child){
        val.child.forEach(function (val1, key1) {
          if (val.flag != 0) {
            if(click){
              total += val.child[key1].flag * val.child[key1].price+sendFee;
              numbers += val.child[key1].flag;
              click=false;
            }
            else{
              total += val.child[key1].flag * val.child[key1].price;
              numbers += val.child[key1].flag;
            }
          }
        })
      } 
    }) 
     fee=money*numbers;  //餐盒费
    total = total + fee ;//配送费
    that.setData({                                // 最后赋值到data中渲染到页面
      foodList: foodList,
      totalPrice: total.toFixed(2),
      allNum: numbers,
      fee:fee
    });
    wx.setStorage({
      key: 'price',
      data: total,
    })
  },
  //点击添加购餐数量
  add: function (e) {
    var that = this;
    var foodList = that.data.foodList;
    var allDish=that.data.allDish;//所有菜品
    var id = e.currentTarget.dataset.id;
   // console.log(id);
    foodList.forEach(function(val,key){
      if(val.child){
        val.child.forEach(function (val1, key1) {
          if (val1.dish_id == id) {

            let num = val.child[key1].flag;
            num = num + 1;
            val.child[key1].flag = num;
            val.child[key1].total = num * val.child[key1].price;
          }
        })
      }
    })
    that.setData({
      foodList: foodList,
    });
   
     that.getTotalPrice();
     
    wx.setStorage({
      key: 'typeList',
      data:  { typeList: that.data.foodList },
    })   
  },
  //点击减少购餐数量
  reduce: function (e) {
    var that = this;
    var foodList = that.data.foodList;
    var allDish = that.data.allDish;//所有菜品
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    foodList.forEach(function (val, key) {
      if (val.child){
        val.child.forEach(function (val1, key1) {
          if (val1.dish_id == id) {
            let num = val.child[key1].flag;
            if (num <= 0) {
              return false;
            }
            num = num - 1;
            val.child[key1].flag = num;

            val.child[key1].total = val.child[key1].total - val.child[key1].price;
          }
        })
      }
      
    }) 
    that.setData({
      foodList: foodList,
    });
    that.getTotalPrice();
    wx.setStorage({
      key: 'typeList',
      data: { typeList: that.data.foodList},
     })   
  },
 //点击购物车显示具体购物信息
 bindImg:function(){
   var that = this;
   var _flag = that.data.flag;
   if(_flag){
     that.setData({
       show: "show",
       flag:false,
       shadeShow:'shadeShow'
     })
   }
   if(!_flag){
     that.setData({
       show: "",
       flag:true,
       shadeShow: ''
     })
   }  
 },


//点击结算按钮
account:function(e){
  var that=this;
  var total = that.data.totalPrice;
  var fee=that.data.fee;//总餐盒费
  var sendFee = that.data.packing_fee
 // var wrap_fee=that.data.fee;//总餐盒费
  wx.navigateTo({
    url: '/pages/order/addOrder/index?total='+total+'&fee='+fee+'&sendFee='+sendFee,
  })
},
//点击cart消失
hidCart:function(){
  var that = this;
  var _flag = that.data.flag;
  if (_flag) {
    that.setData({
      show: "show",
      flag: false,
      shadeShow: 'shadeShow'
    })
  }
  if (!_flag) {
    that.setData({
      show: "",
      flag: true,
      shadeShow: ''
    })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("参数");
    console.log(options);
    //获取屏幕信息
    wx.getSystemInfo({
     
      success: function(res) {
        var elementWidth = that.data.width;
        var elementHeight = that.data.height;
        var left = (res.windowWidth - elementWidth) / 2;
        var top = (res.windowHeight - elementHeight) /4;
       that.setData({
         height:res.windowHeight,
         left: left,
         top:top,
         width:res.windowWidth,
       })
      },
    })
    //请求接口
    var id = options.id;
   that.setData({
     logoImg: options.img,
     store_name:options.name,
     begin_price: options.begin_price,
     packing_fee:options.packing_fee
   })
    //var typeList=[];
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'get',
      url: app.globalData.webSite + '/weixin.php/wechat/getdish/id/3',
      data:{
          id:id,
      },
      success:function(res){
        
        if (res.data.length!=0){
         
          var typeList = [];
          var list = [];
          res.data.forEach(function (val, key) {
            typeList.push(val.category_name);
            if(val.child){
              val.child.forEach(function(val1,key1){
                val.child[key1].price = val.child[key1].price/100;
              })
              that.setData({
                wrap_fee: res.data[0].child[0].wrap_fee/100,
              })
            }
            list.push(val);
          })
          list.forEach(function (val, key) {
            list[key]['id'] = 'A' + val.id
          });
          //   list.push(ff);
          that.setData({
            foodList: list,
            name: res.data[0].category_name,
           
            //typeList:typeList
          })
          
         
        }else{
          res.data=[]
        }
        
         
      },
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