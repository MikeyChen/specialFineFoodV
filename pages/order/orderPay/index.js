// pages/hotel/order_pay/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      sum:options.price,
      orderid:options.orderid,
    });
    
  },
  clickChecked: function () {
    var that = this;
    that.setData({
      checked: true,
      active: 'active'
    });
  },
  switchTab:function(e){
    //console.log("支付");
    var that = this;
    if (that.data.checked == true){
          wx.request({
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'post',
            data: {
              weixin_user_id: wx.getStorageSync("weixin_user_id"),
              orderid: that.data.orderid,
            },
            url: app.globalData.webSite + 'weixin.php/wechat/pay',
            success:function(res){
              var timestamp = String(res.data.sdkData.timeStamp);
              var nonceStr = res.data.sdkData.nonceStr;
              var paySign = res.data.sdkData.paySign;
              var Package = res.data.sdkData.package;
              var signType = 'MD5';
              var order_id = res.data.orderid;
              wx.requestPayment({
                'timeStamp': timestamp,
                'nonceStr': nonceStr,
                'package': Package,
                'signType': signType,
                'paySign': paySign,
                'success': function (res) {
                  // console.log("支付成功");
                  wx.request({
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: 'post',
                    data: {
                      weixin_user_id: wx.getStorageSync("weixin_user_id"),
                      orderid: order_id,
                    },
                    url: app.globalData.webSite + 'weixin.php/wechat/confirmOrder',
                    success:function(){
                      wx.navigateBack();
                      // wx.navigateTo({
                      //   url: '/pages/order/orderList/index',
                      // })
                    },
                  })
                 
                },
                'fail': function (res) {
                  
                  console.log("-----------");
                  console.log(res);
                },
                
              })
            },
          })
        }
      
    
   
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