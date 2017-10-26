//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  },
  nextStep:function(){
    wx.redirectTo({
      url: '../baseinfo/baseinfo'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '知道选校-天道教育',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
