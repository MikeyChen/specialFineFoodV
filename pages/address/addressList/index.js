// pages/address/addressList/index.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
   grey:"#f5f5f5",
   green:"#7be22a",
   isSelected:false,
   id:0,
   selected:[],
   isShow:'isShow',
   isHide:'isHide',
   addressList:[],
   zIndexOne:"60",
   zIndexTwo:'50',
   none: "block",
   hid:"none"
  },
  //点击确定按钮
  formSubmit: function (e) {
    var that = this;
    var isAddress = that.data.address;
    var editAddress = e.detail.value;
    //表单内容为空校验
    if (editAddress.phone.length == 0 || editAddress.name.length == 0 || editAddress.address.length == 0 || editAddress.street.length == 0 || editAddress.sex.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请确保所有信息已填完整',
        success: function (res) {
        }
      })
    }
    else {
      //请求接口
      if (isAddress == "empty") {
        console.log("没数据11111111111");
        wx.request({
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'post',
          url: app.globalData.webSite + '/weixin.php/wechat/addressadd',
          data: {
            phone: editAddress.phone,
            name: editAddress.name,
            sex: editAddress.sex,
            address: editAddress.address,
            street: editAddress.street,
            weixin_user_id: wx.getStorageSync("weixin_user_id")
          },
          success: function (res) {
            console.log("scuesss");
            console.log(res);
              that.setData({
                isShow: 'isShow',
                isHide: 'isHide',
                none: "block",
                hid: "none"
              })
              that.getList();
          },
        })

      } else {
        console.log("有数据222222222");
        wx.request({
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'post',
          url: app.globalData.webSite + '/weixin.php/wechat/addressEdit',
          data: {
            id: isAddress.id,
            phone: editAddress.phone,
            name: editAddress.name,
            sex: editAddress.sex,
            address: editAddress.address,
            street: editAddress.street,
            weixin_user_id: wx.getStorageSync("weixin_user_id")
          },
          success: function (res) {
              that.setData({
                isShow: 'isShow',
                isHide: 'isHide',
                none: "block",
                hid: "none"
              })     
             that.getList();  
          },
        })
      }

    }
  },

  //选择地址
  selected:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    var addressList=that.data.addressList;
    var selected=that.data.selected;
    addressList.forEach(function(val,key){
      if(val.id==id){
        val.isSelected = true;
      }else{
        val.isSelected = false;
      }
    })
    that.setData({
      addressList: addressList,
      id:id,
      isSelected:true,//为true选中地址s
      selected:selected
    })
    
  },
  //删除收货地址
  delAddr:function(e){
    var that=this;
    //var obj = e.currentTarget.dataset.obj;
    var weixin_user_id = wx.getStorageSync("weixin_user_id");
    var addressList = [];
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '删除提示',
      content: '确定删除吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: 'get',
            url: app.globalData.webSite + '/weixin.php/wechat/addressDelete',
            data: {
              id: id,
            },
            success: function (res) {
             that.getList();

            },
          })
        } else {
          console.log('用户点击取消')
        }

      }
    })
    
  },
  // 新增收货地址
  addAddr:function(e){
    //console.log(obj);
    var that = this;
    var obj = e.currentTarget.dataset.obj; 
    that.setData({
      isShow: 'isHide',
      isHide: 'isShow',
      address:"empty",
      none: "none",
      hid: "block"
    })
  },
  //修改地址
  editAddr:function(e){
    var that=this;
    var obj=e.currentTarget.dataset.obj; 
      that.setData({
        isShow: 'isHide',
        isHide: 'isShow',
        address: obj,
        none: "none",
        hid: "block"
      })
  },
  // 点击确定按钮
  confirm:function(){
    var that=this;
    var selected=[];
    var addressList=that.data.addressList;
    addressList.forEach(function(val,key){
      if(val.isSelected){
       wx.setStorage({
         key: 'selected',
         data: val,
       })
      }
    })
    //返回上一层页面
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //请求所有接口
  getList(){
    var that = this;
    var addressList = [];
    var weixin_user_id = wx.getStorageSync("weixin_user_id");
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'get',
      url: app.globalData.webSite + '/weixin.php/wechat/addressGet',
      data: {
        weixin_user_id: weixin_user_id,
      },
      success: function (res) {
        if (res.data.code == 0) {
          res.data.data.forEach(function (val, key) {
            if(val.sex==1){
              val.sex="女士";
            }
            if (val.sex == 0){
              val.sex = "先生";
            }
            addressList.push(val);
           
          })
          
          if (addressList.length != 0) {
            var address_id=that.data.address_id;
            if (address_id){
              addressList.forEach(function (val, key) {
                if (val.id == address_id) {
                  addressList[key].isSelected = true;
                  that.setData({
                    //addressList: addressList,
                    id: addressList[key].id,//设置默认地址
                  })
                }
              })
            }else{
              addressList[0].isSelected = true;
              that.setData({
                id: addressList[0].id,//设置默认地址
              })
            }
             that.setData({
               addressList: addressList,
             })
          } else {
            that.setData({
              addressList: [],
            })
          }

        }
      },
    })
  },
  onLoad: function (options) {
    //console.log(options);
    var that = this;
    that.setData({
      address_id:options.address_id,
    })
    that.getList();
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