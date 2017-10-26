var majorData = require('../common/majorData2.js');
Page({
  data: {
    majorList: majorData.majorData
  },
  //事件处理函数
  onLoad: function () {
    
  },
  switchToBnx: () => {
    wx.switchTab({
      url: '/pages/component3/index',
    })
  }
})
