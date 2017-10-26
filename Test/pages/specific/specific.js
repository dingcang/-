Page({
    data: {
		list: [
		  {
			id: 'view',
			name: '商科',
			url: 'specific',		
			top: true
		  }, {
			id: 'content',
			name: '工程',
			url: 'specific',
			top: true
		  }, {
			id: 'test',
			name: '自然科学',
			url: 'specific',		
			top: true
		  }, {
			id: 'view',
			name: '社会科学',
			url: 'specific',
			top: true
		  }, {
			id: 'content',
			name: '教育学',
			url: 'specific',
			top: true
		  }, {
			id: 'test',
			name: '法律学',
			url: 'specific',
			top: true
		  }, {
			id: 'view',
			name: '公共事务',
			url: 'specific',
			top: true
		  }, {
			id: 'content',
			name: '新闻传播',
			url: 'specific',
			top: true
		  }, {
			id: 'test',
			name: '艺术',
			url: 'specific',
			top: true
		  }, {
			id: 'view',
			name: '健康',
			url: 'specific',
			top: true
		  }
		],		
        items: [],	
		professional: "",	
        hidden: false,
        toastHidden: true,
        modalHidden: true,
        toastText: "数据无法正常显示，请将此问题上报管理员进行处理",
        loadingText: "加载中..."
    },

    onLoad: function (options) {
        var that = this;
        if (options == null || options.professional == null) {
            this.setData({hidden: true, toastHidden: false});
            return;
        }

        requestData(that, options.professional, mCurrentPage + 1);
    },

    onItemClick: function (event) {
		
        var targetUrl = Constant.PAGE_SPECIFIC;
        if (event.currentTarget.dataset.professional_l != null)
            targetUrl = targetUrl + "?professional_l=" + event.currentTarget.dataset.professional_l + "&professional=" + app.professional ;
		
        wx.navigateTo({
            url: targetUrl
        });        
 
    },
	
    onToastChanged: function (event) {
        this.setData({toastHidden: true});
    }
});

var app=getApp();
var mCurrentPage = -1;

/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 */
function requestData(that, professional, targetPage) {
    wx.request({
      url: Constant.BASE_URL + "/Choice/get_choice/professional/" + professional,
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
		    app.professional=professional;
            var i = 0;
			var mTitles = [];
            for (; i < res.data.data.length; i++)
                bindData(res.data.data[i], mTitles);

            //将获得的各种数据写入itemList，用于setData
            var itemList = [];
            for (var i = 0; i < mTitles.length; i++)
                itemList.push({title: mTitles[i]});

            that.setData({
				professional: professional,	
                items: itemList,
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


var Constant = require('../../utils/constant.js');
var Util = require('../../utils/util.js');