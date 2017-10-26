let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    sliderItems: [],
    country: [
      "美国",
      "日本",
      "英国",
      "澳洲",
      "加拿大",
      "泰国",
      "欧洲",
    ],
    currentCountry: "美国",
    mainBtn: [
      {
        imageSrc: "../../resources/images/icon01.png",
        content: "留学生租房"
      }, {
        imageSrc: "../../resources/images/icon02.png",
        content: "留学生租房"
      }
    ],
    usefulInfo: [
      {
        title: "热门置业项目",
        item: [
          {
            imageSrc: "../../resources/images/testHouse.jpg",
            name: '房屋名称',
            price: 'US 1000/月',
            keywords: [
              "关键字",
              "关键字",
            ]
          }, {
            imageSrc: "../../resources/images/testHouse.jpg",
            name: '房屋名称',
            price: 'US 1000/月',
            keywords: [
              "关键字",
              "关键字",
            ]
          }, {
            imageSrc: "../../resources/images/testHouse.jpg",
            name: '房屋名称',
            price: 'US 1000/月',
            keywords: [
              "关键字",
              "关键字",
            ]
          }
        ]
      }, {
        title: "热门置业项目",
        item: [
          {
            imageSrc: "../../resources/images/testHouse.jpg",
            name: '房屋名称',
            price: 'US 1000/月',
            keywords: [
              "关键字",
              "关键字",
            ]
          }, {
            imageSrc: "../../resources/images/testHouse.jpg",
            name: '房屋名称',
            price: 'US 1000/月',
            keywords: [
              "关键字",
              "关键字",
            ]
          }, {
            imageSrc: "../../resources/images/testHouse.jpg",
            name: '房屋名称',
            price: 'US 1000/月',
            keywords: [
              "关键字",
              "关键字",
            ]
          }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var countryLock = wx.getStorageSync('countryLock')
    if(!countryLock){
      this.setData({
        modalHidden: false
      })
      return
    }
    this.setData({
      currentCountry: countryLock
    })
    let _this =this
    wx.request({
      url: app.globalData.siteBaseUrl + 'House/index/get_banner',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Lang": app.globalData.res.language,
        "Client-Version": app.globalData.res.version,
        "Os": app.globalData.res.platform
      },
      success: function (res) {
        let sliderItems = []
        if(res.data.result == 'ok') {
          res.data.data.forEach(function (i) {
            sliderItems.push(i.apic)
          })
          _this.setData({
            sliderItems
          })
        }
      }
    })
  },
  changeCountry: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  cancalModal: function (e) {
    wx.setStorageSync('countryLock', e.currentTarget.dataset.country)
    this.setData({
      currentCountry: e.currentTarget.dataset.country,
      modalHidden: true
    })
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
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