const api = require('../../utils/request.js')
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  goToIndex:function(e){    
    api.fetchRequest('/template-msg/wxa/formId', {
      token: wx.getStorageSync('token'),
      type: 'form',
      formId: e.detail.formId
    })
    if (app.globalData.isConnected) {
      wx.switchTab({
        url: '/pages/recommend/index',
      });
    } else {
      wx.showToast({
        title: '当前无网络',
        icon: 'none',
      })
    }
  },
  onLoad:function(){
    var that = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
  },
  onShow:function(){
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      // app.goLoginPageTimeOut()
    } else {
      that.setData({
        userInfo: userInfo
      })
    }

    wx.getLocation({
         type: 'wgs84', //wgs84返回gps坐标，gcj02返回国测局坐标
         success: function(res) {
          console.log(res)
         }
        })
  },
  onReady: function(){
    var that = this;
    setTimeout(function(){
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(that.data.angle !== angle){
        that.setData({
          angle: angle
        });
      }
    });
  }
});