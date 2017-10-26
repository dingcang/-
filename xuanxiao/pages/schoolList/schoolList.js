// schoolList.js
var app = getApp();
var util = require('../../utils/util.js');
var md5 = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '选校列表',
    schoolList:'',
    notice:'',
    listShow:false,
  },
  //调取选校列表
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = wx.getStorageSync('id');
    var dataList = this.data.schoolList;
    var obj = {id:id};
    /***生成sign 开始***/
    var str = util.makeSign(obj);
    var sign = md5.hex_md5(str);
    obj.sign = sign;
        /****生成sign结束****/
    wx.setStorageSync('url', ''); 
    wx.request({
      url: app.globalData.siteBaseUrl + "Choose/school_list",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Lang": app.globalData.res.language,
        "Client-Version": app.globalData.res.version,
        "Os": app.globalData.res.platform,
      },
      method: "POST",
      data: obj,
      success: function (res) {
        wx.showToast({
          title: '加载中...',
          icon: 'loading',
          duration: 1000
        })
        wx.setStorageSync('teststatus', 'success');
        if(res.data.data.data){
            that.setData({
                listShow:true,
                schoolList:res.data.data.data,
                notice:res.data.data.notice
            });
        }else{
          that.setData({
            listShow:false,
            notice: res.data.data.notice
          });
        }
       
      },
      fail: function () {
        wx.showToast({
          title: '服务器网络错误!',
          icon: 'loading',
          duration: 1500
        })
      }
    })
  }
})