// form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechat:'',
    tipflag: false,
    tip: '',    
    major: ["商科类", "工程类", "自然科学类", "社会科学类", "教育学类", "法律学类", "公共事务类", "新闻传播类", "艺术类", "健康类", "其他"],
    majorIndex: 0,
    currentMajor: ["管理学类", "经济学类", "法学类", "理学类", "工学类", "医学类", "艺术学类", "教育学", "文学", "农学类", "历史学类", "哲学类", "其他"],
    currentMajorIndex: 0
  },
  majorChange: function (e) {
    this.setData({
      majorIndex: e.detail.value
    })
  },
  currentMajorChange: function (e) {
    this.setData({
      currentMajorIndex: e.detail.value
    })
  },
  bindwechatChange: function (event) {
    this.data.wechat = event.detail.value
  }, 
  wxFocus: function () {
    this.setData({
      wxFocus: true
    })
  },
  bindSubmitTap: function (event) {
    var that = this
    var wechat = event.detail.value.wechat
    var major = event.detail.value.major
    var currentMajor = event.detail.value.currentMajor

    if (wechat == '') {
      that.setData({
        'tip': '信息请填写完整'
      })

      that.setData({
        'tipflag': true
      })

      setTimeout(function () {
        that.setData({
          'tipflag': false
        })
      }
        , 3000)

      return
    }

      that.setData({
        hiddenLoading: false
      });
      wx.request({
        url: 'https://gmat.1gre.cn/weixin/pinggu_wx.php?ac=server',
        data: {
          wechat: wechat,
          major: major,
          currentMajor: currentMajor
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            hiddenLoading: true
          });
 
          if (res.data.Status != "1") {

            if (res.data.Status == "-5") {

              that.setData({
                'tipflag': true,
                'tip': '该微信号近期已提交过'
              })
            } else {

              that.setData({
                'tipflag': true,
                'tip': res.data.Message
              })
            }


            wx.redirectTo({
              url: '/pages/component3/submit/submit?type=failure'
            })

            return;
          }
          wx.navigateTo({
            url: '/pages/component3/submit/submit?type=success'
          })

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