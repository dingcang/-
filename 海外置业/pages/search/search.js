// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: []
  },
  search: function (e) {
    var history = this.data.history
    history.unshift(e.detail.value)
    wx.setStorageSync('history', history)
    this.setData({
      history
    })
    wx.navigateTo({
      url: '../list/list?search=' + e.detail.value,
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var history = wx.getStorageSync('history')
    if (history) {
      this.setData({
        history
      })
    }
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