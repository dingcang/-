// submit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stage: "failure",
    success: "none",
    failure: "block"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	if(options.type=="success"){
	  this.setData({
		'success': 'block',
		'failure': 'none',
        'stage': "success",		
	  })		
		
	}else if(options.type=="failure"){
		
	  this.setData({
		'success': 'none',
		'failure': 'block',
        'stage': "failure",		
	  })	
	  
	}


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	  
	setTimeout(function(){  				
              wx.switchTab({
                url: '../../component1/index',
 
              })           
      }, 4000) 
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