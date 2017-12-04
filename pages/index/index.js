//index.js
//获取应用实例
var app = getApp();
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'ACWBZ-XGQKO-SRPWW-SHFCA-XIYGS-NHBQK'
});

Page({
  data: {
    imgUrls: [
      '/imgs/circle_1.jpg',
      '/imgs/circle_2.jpg',
      '/imgs/circle_3.jpg'
    ],
    webSite: app.globalData.webSite,
    shopAddress: "云南省昆明市西山区H公寓",
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    shoplng: '',//商家地址
    shoplat: '',
    personlng: '',
    personlat: '',
    model:"",
    none:'none',
    box:''
  },
  //点击关闭打烊提示
  close:function(){
    var that = this;
    that.setData({
      model: "",
      none: "none",
      box:''
    })
  },
  //打烊店铺提示
  closeTip:function(e){
    var that=this;
    that.setData({
      model:"model",
      none:"block",
      box:"box"
    })
  },
  //点击跳转到相应的店铺点餐页面
  jump: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var img = e.currentTarget.dataset.img;
    var name = e.currentTarget.dataset.name;
    var begin_price = e.currentTarget.dataset.begin_price;
    var packing_fee = e.currentTarget.dataset.packing_fee;
    wx.navigateTo({
      url: '/pages/order/index/index?id=' + id+'&img='+img+'&name='+name+'&begin_price='+begin_price+'&packing_fee='+packing_fee,
    })
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight,
          width:res.windowWidth,
          top:res.windowHeight/3,
        })
      },
    })
    var far;
    //////////////////////////////不能删//////////////////////////
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          wx.request({
            url: app.globalData.webSite+'/weixin.php/wechat/saveUserinfo', //仅为示例，并非真实的接口地址
            data: {
              rawData: res.rawData,
              weixin_user_id: wx.getStorageSync('weixin_user_id'),
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function (res) {
              if (res.data.code == 0) {
                // console.log(res.data.info);
              }
            }
          })
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
      })
    }
    /////////////////////////////不能删///////////////////////////////////////
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'get',
      url: app.globalData.webSite + '/weixin.php/wechat/getstore',
      success: function (res) {
        res.data.forEach(function (val, key) {
          res.data[key].begin_priceAZ = res.data[key].begin_price / 100;
          res.data[key].packing_fee = res.data[key].packing_fee / 100;
          qqmapsdk.geocoder({
            address: val.address,
            success: function (add) {
              wx.getLocation({
                type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                success: function (map) {
                  //console.log("oooooooooooo");
                  //console.log(map);
                  
                  var latitude = map.latitude
                  var longitude = map.longitude
                  that.setData({
                    latitude: latitude,
                    longitude: longitude
                  })
                 
                  qqmapsdk.calculateDistance({
                    mode: 'driving',
                    from: {
                      latitude: latitude,
                      longitude: longitude
                    },
                    to: [
                      {
                        latitude: add.result.location.lat,
                        longitude: add.result.location.lng
                      },
                    ],
                    success: function (dis) {
                      //console.log(dis);
                      var duration = (dis.result.elements[0].duration) / 60;
                      var sendTime = Math.round(duration);
                      wx.setStorage({
                        key: 'sendTime',
                        data: sendTime,
                      })
                      res.data[key]['distance'] = ((dis.result.elements[0].distance) / 1000).toFixed(2);
                      console.log(res.data[key]['distance']);
                      that.setData({
                        shopList: res.data
                      });
                    },
                    fail: function (d) {
                      res.data[key]['distance'] = '超过10';
                      that.setData({
                        shopList: res.data
                      });
                    }
                  })
                }
              })
              
            },
          })
        });


       //console.log(res.data);
      }
    })
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
