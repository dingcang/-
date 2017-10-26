// pages/list/list.js
const modal = require('../../lib/modal.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integrateValue: '综合排序',
    regionValue: '区域',
    priceValue: '价格',
    list: [
      {
        imageSrc: "../../resources/images/list-item.jpg",
        name: '房屋名称',
        university: '去往伦敦大学',
        price: '$1000',
        keywords: [
          "关键字",
          "关键字",
        ]
      }
    ],
    modalItem: [
      "综合排序",
      "距离学校由近到远",
      "价格由低到高",
      "价格有高到低",
      "最新房源"
    ],
    modalHidden: true
  },
  showModal: function (e) {
    e.currentTarget.dataset.index
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