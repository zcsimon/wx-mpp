// pages/recommend/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getLocation()
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

  },

  getLocation: function (userLocation) {
    console.log(userLocation)
    let vm = this
    wx.getLocation({
        type: "wgs84",
        success: function (res) {
          console.log(111111111);
          console.log(res)
          console.log(111111111)
            var latitude = res.latitude
            var longitude = res.longitude
            vm.getDaiShu(latitude, longitude) // 根据经纬度获取具体信息
        },
        fail: function (res) {
          console.log(2222222);
          console.log(res.errMsg)
          console.log(2222222);
            if (res.errMsg === 'getLocation:fail:auth denied') {
                wx.showToast({
                    title: '拒绝授权',
                    icon: 'none'
                })
                setTimeout(() => {
                    wx.navigateBack()
                }, 1500)
                return
            }else if (res.errMsg === "getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF" || userLocation.authSetting['scope.userLocation']) {
              wx.showModal({
                  title: '',
                  content: '请在系统设置中打开定位服务',
                  showCancel: false,
                  success: result => {
                      if (result.confirm) {
                          wx.navigateBack()
                      }
                  }
              })
          }
            if (!userLocation || !userLocation.authSetting['scope.userLocation']) {
                vm.getUserLocation()
            } else if (res.errMsg === "getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF" || userLocation.authSetting['scope.userLocation']) {
                wx.showModal({
                    title: '',
                    content: '请在系统设置中打开定位服务',
                    showCancel: false,
                    success: result => {
                        if (result.confirm) {
                            wx.navigateBack()
                        }
                    }
                })
            } else {
                wx.showToast({
                    title: '授权失败',
                    icon: 'none'
                })
                setTimeout(() => {
                    wx.navigateBack()
                }, 1500)
            }
        }
    })
}
})