// pages/order/orderDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    price: 15.58,
    sum: 0,
    show: '',
    flag: true,
    shadeShow: "",
  },
  //点击添加购餐数量
  add: function () {
    var that = this;
    var nums = that.data.num;
    var singlePrice = that.data.price;
    that.setData({
      num: nums + 1,
      sum: ((nums + 1) * singlePrice).toFixed(2),//输出结果保留两位小数
    })
  },
  //点击减少购餐数量
  reduce: function () {
    var that = this;
    var nums = that.data.num;
    var singlePrice = that.data.price;
    var sums = that.data.sum;
    if (nums == 0) {
      that.setData({
        num: 0,
      })
    }
    else {
      if (sums <= 0) {
        that.setData({
          sum: 0,
        })
      } else {
        that.setData({
          num: nums - 1,
          sum: (sums - singlePrice).toFixed(2),
        })
      }

    }

  },
  //点击购物车显示具体购物信息
  bindImg: function () {
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
  //点击结算按钮
  account: function () {
    wx.navigateTo({
      url: '/pages/order/addOrder/index',
    })
  },
  //点击cart消失
  hidCart: function () {
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
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight,
          width: res.windowWidth,
        })
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