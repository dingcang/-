// shit.js
var app = getApp();
var util = require('../../utils/util.js');
var md5 = require('../../utils/md5.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '吐槽给产品经理',
    state: [true,false],
    result: '没有结果',
    tipflag: false,
    tip: '',    
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
      state: stateC,
      result: e.currentTarget.dataset.result
    })
  },

  bindtextChange: function (event) {
    this.setData({
      'tipflag': false
    })
  },

  //提交表单
  submitFn: function (event) {

    var that = this
    var userid = wx.getStorageSync('id')
    var textarea = encodeURIComponent(event.detail.value.textarea)
    var result = encodeURIComponent(event.detail.value.result)
    if (textarea == '') {
      that.setData({
        'tip': '请填写您要吐槽的信息'
      })

      that.setData({
        'tipflag': true
      })
      return
    }    

	var obj = {
        userid : userid,
        result : result,
        text_area : textarea,
    };
    /***生成sign 开始***/
    var str = util.makeSign(obj);
    var sign = md5.hex_md5(str);
    obj.sign = sign;
    /****生成sign结束****/
	
    wx.request({
      url: app.globalData.siteBaseUrl + 'Choose/feedback',
      data: obj,
      header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Lang": app.globalData.res.language,
          "Client-Version": app.globalData.res.version,
          "Os": app.globalData.res.platform,
      },
      method: "POST",
      success: function (res) {
        if (res.data.code) {
          that.setData({
            'tip': res.data.data
          })

          that.setData({
            'tipflag': true
          })
          return
        }else{
          wx.navigateTo({
            url: './success/success'
          })
        }        

      }
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