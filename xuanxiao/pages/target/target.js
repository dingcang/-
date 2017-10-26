// target.js
var app = getApp();
var util = require('../../utils/util.js');
var md5 = require('../../utils/md5.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryArr: ["美国", "加拿大", "日本", "英联邦", "欧洲", "其他"],
    countryKey: ["1", "4", "40", "2", "34", "64"],
    countryIndex: '',
    countryDefault: "请选择您想去的国家/地区",
    major: '',
    majortypeArr: ["商科", "理科", "工科", "文科", "公共管理", "法律", "医学", "艺术", "体育", "其他"],
    majorIndex: '',
    majorDefault: "请选择您的意向专业分类",
    degreeArr: ["本科", "硕士", "博士", "本转学", "高中"],
    degreeKey: ["1", "2", "3", "4", "5"],
    degreeIndex: '',
    degreeDefault: "请选择您的意向学位",
    timeArr: ["2017年秋季", "2018年春季", "2018年秋季", "2019春季", "未确定"],
    timeIndex: '',
    timeDefault: "请选择您计划入学的时间",
    majortwo: '',
    title: '留学目标',
    majortypetwoIndex: '',
    majortypetwoDefault: '请选择您的意向专业分类',
    tipflag: false,
    tip: '',
  },

  countryChange: function (e) {
    this.setData({
      'tipflag': false,
      countryIndex: e.detail.value,
      countryDefault: this.data.countryArr[e.detail.value],
      datacountry: this.data.countryKey[e.detail.value]
    })
  },

  bindMajorChange: function (event) {
    this.setData({
      'tipflag': false
    })
    this.data.major = event.detail.value
  },

  majortypeChange: function (e) {
    this.setData({
      'tipflag': false,
      majorIndex: e.detail.value,
      majorDefault: this.data.majortypeArr[e.detail.value],
    })
  },

  degreeChange: function (e) {
    this.setData({
      'tipflag': false,
      degreeIndex: e.detail.value,
      degreeDefault: this.data.degreeArr[e.detail.value],
      datadegree: this.data.degreeKey[e.detail.value]
    })
  },

  timeChange: function (e) {
    this.setData({
      'tipflag': false,
      timeIndex: e.detail.value,
      timeDefault: this.data.timeArr[e.detail.value],

    })
  },

  bindMajorTwoChange: function (event) {
    this.data.majortwo = event.detail.value
  },

  majortypetwoChange: function (e) {
    this.setData({
      majortypetwoIndex: e.detail.value,
      majortypetwoDefault: this.data.majortypeArr[e.detail.value],
    })
  },

  //提交表单
  submitFn: function (event) {

    var that = this
    var userid = wx.getStorageSync('id')
    var country = event.detail.value.country
    var major = event.detail.value.major
    var majortype = event.detail.value.majortype
    var degree = event.detail.value.degree
    var time = event.detail.value.time
    var majortwo = event.detail.value.majortwo
    var majortypetwo = event.detail.value.majortypetwo
    var test_status = wx.getStorageSync('teststatus')
    if (test_status == 'success'){
      var bg_read_zyfl = wx.getStorageSync('bg_read_zyfl')
      var bg_grade_gpa = wx.getStorageSync('bg_grade_gpa')      
    }
    if (country == '') {
      that.setData({
        'tip': '请选择您想去的国家/地区'
      })

      that.setData({
        'tipflag': true
      })
      return
    }

    if (major == '') {
      that.setData({
        'tip': '请输入您的意向专业名称'
      })

      that.setData({
        'tipflag': true
      })
      return
    }

    if (majortype == '') {
      that.setData({
        'tip': '请选择您的意向专业分类'
      })

      that.setData({
        'tipflag': true
      })
      return
    }

    if (degree == '') {
      that.setData({
        'tip': '请选择您的意向学位'
      })

      that.setData({
        'tipflag': true
      })
      return
    }

    if (time == '') {
      that.setData({
        'tip': '请选择您计划入学的时间'
      })

      that.setData({
        'tipflag': true
      })
      return
    }

	var obj = {
        userid: userid,
        country: encodeURIComponent(country),
        yx_pro: encodeURIComponent(major),
        yx_pro_type: encodeURIComponent(majortype),
        rx_time: encodeURIComponent(time),
        sec_yx_pro: encodeURIComponent(majortwo),
        sec_yx_type: encodeURIComponent(majortypetwo),
        yxxw: encodeURIComponent(degree),
        bg_read_zyfl: encodeURIComponent(bg_read_zyfl),
        bg_grade_gpa: encodeURIComponent(bg_grade_gpa)                
    };
    /***生成sign 开始***/
    var str = util.makeSign(obj);
    var sign = md5.hex_md5(str);
    obj.sign = sign;
    /****生成sign结束****/
	
    wx.request({
      url: app.globalData.siteBaseUrl + 'Choose/study_target',
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
          wx.setStorageSync('teststatus', '');
          that.setData({
            'tip': res.data.data
          })

          that.setData({
            'tipflag': true
          })
          return
        } else {
          var url = wx.getStorageSync('url')
          if (url == "eduback") {
            wx.redirectTo({
              url: '../eduback/eduback'
            })
          } else {
            wx.redirectTo({
              url: '../schoolList/schoolList'
            })
          }


        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.url == "eduback") {
      wx.setStorageSync('url', 'eduback'); 
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