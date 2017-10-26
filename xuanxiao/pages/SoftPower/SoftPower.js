// softStrength.js
var app = getApp();
var util = require('../../utils/util.js');
var md5 = require('../../utils/md5.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    internshipArr: ["知名外企", "知名国内企业", "普通外企", "普通国内企业", "暂无实习"],
    internshipIndex: '',
    internshipDefault: "请选择您的实习经历",
    researchArr: ["海外科研实验室", "拥有专利", "有论文发表或科研报告", "科研试验营", "暂无科研经历"],
    researchIndex: '',
    researchDefault: "请选择您的科研专利经历",
    rewardsArr: ["世界级", "中国国家级", "国外省/州级", "国内地方级", "国内校级", "暂无竞赛奖项经历"],
    rewardsIndex: '',
    rewardsDefault: "请选择您的赛事奖项",
    volunteerArr: ["世界级", "国家级", "地方级", "校级", "暂无志愿者经历"],
    volunteerIndex: '',
    volunteerDefault: "请选择您的志愿者经历",
    overseasArr: ["校友推荐", "教授面试", "海外访校", "暂无海外交流经历"],
    overseasIndex: '',
    overseasDefault: '请选择您的海外交流经历',
    letterArr: ["国外大学教授", "国外高中老师", "国内大学教授", "国内知名高中老师", "国内普通老师", "暂未联系"],
    letterIndex: '',
    letterDefault: '请选择您能得到的推荐信',    
    tipflag: false,
    tip: '',
  },

  internshipChange: function (e) {
    this.setData({
      'tipflag': false,
      internshipIndex: e.detail.value,
      internshipDefault: this.data.internshipArr[e.detail.value],
       
    })
  }, 
  researchChange: function (e) {
    this.setData({
      'tipflag': false,
      researchIndex: e.detail.value,
      researchDefault: this.data.researchArr[e.detail.value],
    })
  },

  rewardsChange: function (e) {
    this.setData({
      'tipflag': false,
      rewardsIndex: e.detail.value,
      rewardsDefault: this.data.rewardsArr[e.detail.value],
 
    })
  },

  volunteerChange: function (e) {
    this.setData({
      'tipflag': false,
      volunteerIndex: e.detail.value,
      volunteerDefault: this.data.volunteerArr[e.detail.value],

    })
  },

  overseasChange: function (e) {
    this.setData({
      'tipflag': false,      
      overseasIndex: e.detail.value,
      overseasDefault: this.data.overseasArr[e.detail.value],
    })
  },

  letterChange: function (e) {
    this.setData({
      'tipflag': false,      
      letterIndex: e.detail.value,
      letterDefault: this.data.letterArr[e.detail.value],
    })
  },
  //提交表单
  submitFn: function (event) {
    var that = this
    var userid = wx.getStorageSync('id')
    var internship = event.detail.value.internship
    var research = event.detail.value.research
    var rewards = event.detail.value.rewards
    var volunteer = event.detail.value.volunteer
    var overseas = event.detail.value.overseas
    var letter = event.detail.value.letter

    if (internship == '') {
      that.setData({
        'tip': '请选择您的实习经历'
      })

      that.setData({
        'tipflag': true
      })
      return
    }

    if (research == '') {
      that.setData({
        'tip': '请选择您的科研专利经历'
      })

      that.setData({
        'tipflag': true
      })
      return
    }

    if (rewards == '') {
      that.setData({
        'tip': '请选择您的赛事奖项'
      })

      that.setData({
        'tipflag': true
      })
      return
    }

    if (volunteer == '') {
      that.setData({
        'tip': '请选择您的志愿者经历'
      })

      that.setData({
        'tipflag': true
      })
      return
    }

    if (overseas == '') {
      that.setData({
        'tip': '请选择您的海外交流经历'
      })

      that.setData({
        'tipflag': true
      })
      return
    }

    if (letter == '') {
      that.setData({
        'tip': '请选择您能得到的推荐信'
      })

      that.setData({
        'tipflag': true
      })
      return
    }

    var obj = {
        userid: userid,
        sx_exp: encodeURIComponent(internship),
        kyzl_exp: encodeURIComponent(research),
        ssjx_exp: encodeURIComponent(rewards),
        zyz_exp: encodeURIComponent(volunteer),
        hwjl_exp: encodeURIComponent(overseas),
        tj_letter: encodeURIComponent(letter)	
    };
    /***生成sign 开始***/
    var str = util.makeSign(obj);
    var sign = md5.hex_md5(str);
    obj.sign = sign;
    /****生成sign结束****/
	
    wx.request({
      url: app.globalData.siteBaseUrl + 'Choose/soft_power',
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
        } else {
          var url = wx.getStorageSync('url')
          if (url == 'eduback') {
            wx.redirectTo({
              url: '../schoolList/schoolList',
            })
          } else {
            wx.redirectTo({
              url: '../target/target',
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