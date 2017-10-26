// majorExpand.js
var Constant = require('../../../utils/constant.js');
Page({

  /**
   * 页面的初始数据
   */
	data: {
		items: [],	
		professional_list: "",		
		professional_l: "",	
		professional: "",			
		hidden: false,
    modalHidden: true,  
		fileimg: "",		
		toastHidden: true,		
		toastText: "数据无法正常显示，请将此问题上报管理员进行处理",		
	},
	
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        that = this;
        if (options == null || options.major == null || options.majorExpand == null) {
            this.setData({hidden: true, toastHidden: false});
            return;
        }
		Enroll = [];
		Background = [];
		PadImage = [];
		FileAddress = [];		
        requestData(options);
  },

  onImageClick: function (event) {
 
    this.setData({ 
	modalHidden: false,
	fileimg: event.currentTarget.dataset.fileimg
	})
  },
  
  toform: function () {
	wx.switchTab({
            url: '../../component3/index',				 
              })   
  },

  jumpexpand: function (event) {
	wx.redirectTo({
            url: '../majorExpand/majorExpand' +event.currentTarget.dataset.expand,				 
              })   
  },
  
  onCancelClick: function (event) {
	  
	this.setData({
	 modalHidden: true,
	fileimg: ''		
	});
  },  
})

var app=getApp();
var that;
var Enroll = [];
var Background = [];
var PadImage = [];
var FileAddress = [];
var mCurrentPage = -1;

/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 */
function requestData(options, professional_l) {
    wx.request({
      url: Constant.BASE_URL + "/Choice/get_enroll?professional=" + encodeURIComponent(options.major) + "&professional_l=" + encodeURIComponent(options.majorExpand) + "&type=" + options.type,
      
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
                bindData(res.data.data[i]);    
            requestOffer(res.data.data[0].enroll);
            //将获得的各种数据写入itemList，用于setData
            var itemList = [];
            for (var i = 0; i < Enroll.length; i++)
                itemList.push({enroll: Enroll[i], background: Background[i]});


            that.setData({
				professional_list: app.professional_l,			
				professional_l: options.majorExpand,
				professional: options.major,	
				type: options.type,	
				end: app.professional_l.length,					
                items: itemList,
                hidden: true
            });

        }
    });
}

/**
 * 绑定数据
 * @param itemData 接口返回的值，里面有各种相关的信息
 */
function bindData(itemData) {

	Enroll.push(itemData.enroll);
	Background.push(itemData.background);
	
}

/**
 * 请求offer展示数据
 * @param that Page的对象，用其进行数据的更新
 */
function requestOffer(professional) {
  wx.request({
	url: 'https://gmat.1gre.cn/weixin/studyabroad.php?keyword=' +professional,   
    header: {
      "Content-Type": "application/json"
    },


    success: function (res) {
	if (res == null ||
        res.data == null ||
        res.data.Status == '-2'		
		) {			
		requestOffer('');
        console.error(Constant.ERROR_DATA_IS_NULL);
        return;
      }

	  if (res.data.Result.length < 4){
		requestOffer('');
        return		
	  }

      var i = 0;
      for (; i < res.data.Result.length; i++)
        ReData(res.data.Result[i]);   

      //将获得的各种数据写入imgList，用于setData
      var imgList = [];
      for (var i = 0; i < PadImage.length; i++)
        imgList.push({ padimg: PadImage[i], fileimg: FileAddress[i] }); 
	
		that.setData({		 	
			img: imgList,
			hidden: true
		});
    }
  });
}
/**
 * 绑定数据
 * @param itemData 接口返回的值，里面有各种相关的信息
 */
function ReData(itemData) {

  PadImage.push(itemData.PadImageThumb);
  FileAddress.push(itemData.FileAddress);

}