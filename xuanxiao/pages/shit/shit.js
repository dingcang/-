// shit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '吐槽给产品经理',
    state: [true,false]
  },
  state: function(e) {
    var stateC = this.data.state;
    if(e.currentTarget.dataset.index == 1) {
      stateC[0] = false;
      stateC[1] = true;
    }else {
      stateC[0] = true;
      stateC[1] = false;
    }
    this.setData({
      state: stateC
    })
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