//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    lastTapTime: 0,
    scaleControl: true,
    scaleWidth: 750,
    scaleHeight: 1720 * 750 / 2409,
    scrollTop: 0,
    scrollLeft: 0,
    lastDistance: 0,
    show: 'hide',
    state: [
      {
      classname: '',
      top:100,
      left: 440,
      state: '华盛顿州'
      }, {
        classname: '',
        top: 346,
        left: 374,
        state: '俄勒冈州'
      }, {
        classname: '',
        top: 1450,
        left: 374,
        state: '阿拉斯加州'
      }, {
        classname: '',
        top: 800,
        left: 260,
        state: '加利福尼亚州',
        rotate: 60
      }, {
        classname: '',
        top: 230,
        left: 920,
        state: '蒙塔拿州'
      }, {
        classname: '',
        top: 420,
        left: 670,
        state: '爱达荷州'
      }, {
        classname: '',
        top: 650,
        left: 460,
        state: '内华达州'
      }, {
        classname: '',
        top: 250,
        left: 1300,
        state: '北达科他州'
      }, {
        classname: '',
        top: 440,
        left: 1300,
        state: '南达科他州'
      }, {
        classname: '',
        top: 500,
        left: 950,
        state: '怀俄明州'
      }, {
        classname: '',
        top: 720,
        left: 750,
        state: '犹他州'
      }, {
        classname: '',
        top: 1060,
        left: 660,
        state: '亚利桑那州'
      }, {
        classname: '',
        top: 780,
        left: 1020,
        state: '科罗拉多州'
      }, {
        classname: '',
        top: 1100,
        left: 960,
        state: '新墨西哥州'
      }, {
        classname: '',
        top: 626,
        left: 1332,
        state: '内布拉斯加州'
      }, {
        classname: '',
        top: 840,
        left: 1400,
        state: '堪萨斯州'
      }, {
        classname: '',
        top: 1040,
        left: 1434,
        state: '俄克拉荷马州'
      }, {
        classname: '',
        top: 1320,
        left: 1400,
        state: '德克萨斯州'
      },{
        classname: '',
        top: 250,
        left: 1300,
        state: '北达科他州'
      }, {
        classname: '',
        top: 250,
        left: 1596,
        state: '明尼苏达州'
      }, {
        classname: '',
        top: 586,
        left: 1652,
        state: '爱荷华州'
      }, {
        classname: '',
        top: 826,
        left: 1720,
        state: '密苏里州'
      }, {
        classname: '',
        top: 1080,
        left: 1720,
        state: '阿肯色州'
      }, {
        classname: '',
        top: 1328,
        left: 1710,
        rotate: 45,
        state: '路易斯安那州'
      }, {
        classname: '',
        top: 284,
        left: 1906,
        state: '密歇根州',
        rotate: 20
      }, {
        classname: '',
        top: 388,
        left: 1790,
        state: '威斯康星州',
      }, {
        classname: '',
        top: 724,
        left: 1846,
        state: '伊利诺斯州',
      }
    ]
  },
  //双击处理函数
  doubleClick: function (e) {
    var curTime = e.timeStamp
    var lastTime = e.currentTarget.dataset.time
    var scaleWidth = this.data.scaleWidth
    var scaleHeight = this.data.scaleHeight
    if (curTime - lastTime > 0 && curTime - lastTime < 300) {
      if (this.data.scaleControl){
        this.setData({
          scaleWidth: scaleWidth * 4,
          scaleHeight: scaleHeight * 4,
          scaleControl: false,
          show: ''
        })
        this.setData({
          scrollTop: e.touches[0].pageY * 4 - app.globalData.windowH,
          scrollLeft: e.touches[0].pageX * 4 - app.globalData.windowW
        })
      }else{
        this.setData({
          scaleWidth: scaleWidth / 4,
          scaleHeight: scaleHeight / 4,
          scaleControl: true,
          show: 'hide'
        })
        this.setData({
          scrollTop: 0,
          scrollLeft: 0
        })
      }
    }
    this.setData({
      lastTapTime: curTime
    })
  },
  touchmove: function (e) {
    var scaleWidth = this.data.scaleWidth
    var scaleHeight = this.data.scaleHeight
    var lastDistance = this.data.lastDistance
    if(e.touches.length == 2 ) {
      var xMove = e.touches[1].clientX - e.touches[0].clientX
      var yMove = e.touches[1].clientY - e.touches[0].clientY
      var newDistance = Math.sqrt(xMove * xMove + yMove * yMove)
      if (lastDistance == 0 || lastDistance == newDistance){
        this.setData({
          lastDistance: newDistance
        })
      } else{
        this.setData({
          scaleWidth: scaleWidth * (1 + 0.005 * (newDistance - lastDistance)),
          scaleHeight: scaleHeight * (1 + 0.005 * (newDistance - lastDistance)),
          lastDistance: newDistance
        })
      }
    }
  },
  touchend: function () {
    this.setData({
      lastDistance: 0
    })
  },
  onLoad: function () {
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
