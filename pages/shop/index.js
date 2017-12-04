// pages/shop/index.js
var app = getApp(); 
var winWidth = 0;
var winHeight = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 3,
    className: 'model',
    on: 'on1',
    seconds: "60",
    name:'',
    phone:'',
    message:''
  },
  //获取参数
  name: function (e) {
    var that=this;
    that.setData({
      name: e.detail.value
    })
  },
  phone: function (e) {
    var that = this;
    that.setData({
      phone: e.detail.value
    })
  },
  message: function (e) {
    var that = this;
    that.setData({
      message: e.detail.value
    })
  },
  submit:function(){
    var that=this;
   var name=that.data.name;
   var phone=that.data.phone;
   var message=that.data.message;
   console.log(that.data.name);
   if (name ==''|| phone == '' || message ==''){
     wx.showModal({
       title: '提示',
       content: '有信息填写不完整',
       success: function (res) {
         if (res.confirm) {
           console.log('用户点击确定')
         }
       }
     })
   }else{
     
    wx.request({
      header: {
         "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'post',
      data: {
         weixin_user_id: wx.getStorageSync("weixin_user_id"),
         name:name,
         phone:phone,
         message:message
       },
      url: app.globalData.webSite + 'weixin.php/wechat/brandApply',
      success:function(res){
        that.setData({
          className: 'model1',
          on: 'on'
        });
        var num = that.data.second;
        var timer = setInterval(function () {
          num--;
          that.setData({
            second: num
          });
          if (num == 0) {
            clearInterval(timer);
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }, 1000);
      },
    })
   }
      
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        winHeight = res.windowHeight;
        winWidth = res.windowWidth;
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