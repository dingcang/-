Page({
    data: {
        items: [],		
		professional_l: "",			
        hidden: false,
        toastHidden: true,		
        toastText: "数据无法正常显示，请将此问题上报管理员进行处理",		
    },
	
    onLoad: function (options) {
        that = this;
        if (options == null || options.professional_l == null || options.professional == null) {
            this.setData({hidden: true, toastHidden: false});
            return;
        }

        requestData(options);
    },
	
    onItemClick: function (event) {
        var targetUrl = Constant.PAGE_SPECIFIC;
        if (event.currentTarget.dataset.publishTime != null)
            targetUrl = targetUrl + "?publishTime=" + event.currentTarget.dataset.publishTime;

        wx.navigateTo({
            url: targetUrl
        });
    },

 
});

var that;
var Enroll = [];
var Background = [];
var mCurrentPage = -1;

/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 */
function requestData(options, professional_l) {
    wx.request({
      url: Constant.BASE_URL + "/Choice/get_enroll/professional/" + options.professional + "/professional_l/" + options.professional_l,
	
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

            //将获得的各种数据写入itemList，用于setData
            var itemList = [];
            for (var i = 0; i < Enroll.length; i++)
                itemList.push({enroll: Enroll[i], background: Background[i]});
			
            that.setData({
				professional_l: options.professional_l,	
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

var Constant = require('../../utils/constant.js');