// pages/me/phone/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second:10,
    word:"重新获取",
  },
  //绑定手机号成功跳转页面
  submit:function(){
    wx.navigateTo({
      url: '/pages/order/addOrder/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //定时器，获取验证码
    var num=that.data.second;
    var timer=setInterval(function(){
        that.setData({
          second:num--,
        })
        if (num<=0){
          that.setData({
            second:0,
          })
          clearInterval(timer);
        }
    },1000)
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