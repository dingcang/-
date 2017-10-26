//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    formItem: [
      { label: '姓名', name: 'name', id: 'name' },
      { label: '手机号' },
      { label: '验证码' },
      { label: '目标州1' },
      { label: '目标州2' },
      { placeholder: '如果有明确目标学校，请填写' },
      { placeholder: '如果有特殊选校要求，请填写' },
    ],
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
