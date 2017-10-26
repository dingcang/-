var majorData = require('../../common/majorData.js').majorData;
var Constant = require('../../../utils/constant.js');
var Util = require('../../../utils/util.js');
var mTitles = [];
	  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    majorData: {},
    next:{},
    items: {

    },
    major: "",
    hidden: false,
    toastHidden: true,
    modalHidden: true,
    toastText: "数据无法正常显示，请将此问题上报管理员进行处理",
    loadingText: "加载中..."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var major = options.major;
    var majordata,nextdata;
    for(var i=0; i<majorData.length; i++){
      if(majorData[i].name==major){
        majordata = majorData[i];
        nextdata = majorData[i+1];
        break;
      }
    }
    this.setData({
      major: major,
      majorData: majordata,
      next: nextdata
    });
	mTitles = [];

    if (options == null || options.major == null) {
      this.setData({ hidden: true, toastHidden: false });
      return;
    }
    requestData(that, major)
  },
  toform: function () {
	wx.switchTab({
            url: '../../component3/index',				 
              })   
  },  
  jumpmajor: function (event) {
	wx.redirectTo({
            url: '../major/major?major=' +event.currentTarget.dataset.majorto,				 
              })   
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

var app=getApp();

/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 */
function requestData(that, major) {
  wx.request({
    url: Constant.BASE_URL + "/Choice/get_choice?type=professional&professional=" + encodeURIComponent(major),
    header: {
      "Content-Type": "application/json"
    },

    success: function (res) {
      if (res == null ||
        res.data == null ||
        res.data.data == null ||
        res.data.data.length <= 0) {

        console.error(Constant.ERROR_DATA_IS_NULL);
        return;
      }

      var i = 0;

      for (; i < res.data.data.length; i++)
        bindData(res.data.data[i], mTitles);

      //将获得的各种数据写入itemList，用于setData
      var itemList = [];
      for (var i = 0; i < mTitles.length; i++)
        itemList.push({ title: mTitles[i] });
	
	  app.professional_l=itemList;	  
      var ob = that.data.items;
      ob[major] = itemList;
      that.setData({
        items: ob,
        hidden: true
      });

    }
  });
}


/**
 * 绑定数据
 * @param itemData 接口返回的data值，里面有各种相关的信息
 */
function bindData(itemData, mTitles) {

  mTitles.push(itemData.professional_l);

}
