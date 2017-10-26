//eduback.js
var app = getApp();
var util = require('../../utils/util.js');
var md5 = require('../../utils/md5.js');

Page({
  data: {
    array: ['商科', '理科', '工科', '文科', '公共管理', '法律', '医学', '艺术', '体育', '其他'],//专业类型
    fenzhi1: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2.0', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9', '3.0', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '3.9', '4.0'],  //4分制数组
    fenzhi2: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],//百分制数组
    index: -1,    //专业类型索引
    index1: 29,      //4分制索引值
    index2: 59,    //百分制索引
    fourIndex: false,   //4分制是否替换
    fenzhiValue: "3.0",  //GPA分制
    fenzhi1style: "background-color:#94acc8", // 4分制背景色
    fenzhi1Color: "color:#ffffff",  // 4分制字体颜色
    baiIndex: false,   // 百分制是否替换
    fenzhi2style: "",  //百分制背景色
    fenzhi2Color: "",  //百分制字体颜色
    tipflag: false,
    tip: '',
    title: '教育背景',
    scroll: false,
    items: {},
    school: ''
  },
  //专业类型
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
    })
  },
  //四分制
  bindFenzhi1Change: function (e) {
    this.setData({
      index1: e.detail.value,
      fenzhiValue: this.data.fenzhi1[e.detail.value],
      fenzhi2style: "",
      fenzhi2Color: "",
      fenzhi1style: "background-color:#94acc8",
      fenzhi1Color: "color:#ffffff",
    })
  },
  //百分制
  bindFenzhi2Change: function (e) {
    this.setData({
      index2: e.detail.value,
      fenzhiValue: this.data.fenzhi2[e.detail.value],
      fenzhi2style: "background-color:#94acc8",
      fenzhi2Color: "color:#ffffff",
      fenzhi1style: "",
      fenzhi1Color: "",
    })
  },
  //匹配学校
  selectschool: function (event) {
    var that = this
    var schoolkey = event.detail.value
    that.setData({
      'tipflag': false
    })
    wx.request({
      url: app.globalData.siteBaseUrl + 'Choose/select_school',
      data: {
        keyword: schoolkey
      },
      header: {
        'content-type': 'application/json',
        "Lang": app.globalData.res.language,
        "Client-Version": app.globalData.res.version,
        "Os": app.globalData.res.platform
      },
      success: function (res) {
        that.setData({
          items: res.data.data,
          'scroll': true
        })

      }
    })
  },
  //设置学校值
  setschool: function (event) {
    this.setData({
      'school': event.currentTarget.dataset.school,
      'scroll': false
    })
  },
  //提交表单
  submitFn: function (event) {

    var that = this
    var userid = wx.getStorageSync('id')
    var school = event.detail.value.school
    var professional = event.detail.value.professional
    var major = event.detail.value.major
    var score = event.detail.value.score
    wx.setStorageSync('bg_read_zyfl', major);
    wx.setStorageSync('bg_grade_gpa', score);

    if (school == '') {
      that.setData({
        'tip': '请输入您就读/毕业学校!'
      })

      that.setData({
        'tipflag': true
      })
      return
    }
    
    if (professional == '') {
      that.setData({
        'tip': '请输入您的专业名称,若是高中请填写无!'
      })

      that.setData({
        'tipflag': true
      })
      return
    }

    if (major == '') {
      that.setData({
        'tip': '请选择您的专业类型,若是高中请选择其他!'
      })

      that.setData({
        'tipflag': true
      })
      return
    }
    that.setData({
      'tipflag': false
    })

    wx.request({
      url: app.globalData.siteBaseUrl + 'Choose/check_status',
      data: {
        userid: userid,
        read_zyfl: major,
        grade_gpa: score
      },
      header: {
        'content-type': 'application/json',
        "Lang": app.globalData.res.language,
        "Client-Version": app.globalData.res.version,
        "Os": app.globalData.res.platform
      },
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
          wx.request({
            url: app.globalData.siteBaseUrl + 'Choose/background',
            data: {
              userid: userid,
              read_school: school,
              read_zymc: professional,
              read_zyfl: major,
              grade_gpa: score
            },
            header: {
              'content-type': 'application/json',
              "Lang": app.globalData.res.language,
              "Client-Version": app.globalData.res.version,
              "Os": app.globalData.res.platform
            },
            success: function (res) {
              if (res.data.code) {
                that.setData({
                  'tip': res.data.data
                })

                that.setData({
                  'tipflag': true
                })
                return
              } else {
                wx.redirectTo({
                  url: '../testscore/testscore'
                })
              }

            }
          })

        }

      }
    })
  }
})
