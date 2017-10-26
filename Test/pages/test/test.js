var app = getApp();  
Page({  
  data:{  
    // text:"这是一个页面"  
    country:["美国","英国","加拿大","澳大利亚","德国","法国"],  
    education:["中学","本科","硕士","博士"],  	
    toast1Hidden:true,  
    modalHidden: true,  
    modalHidden2: true,  
    notice_str: '',  
    index:0  
  },  
  toast1Change:function(e){  
    this.setData({toast1Hidden:true});  
  },  
  //弹出确认框  
  modalTap: function(e) {  
    this.setData({  
      modalHidden: false  
    })  
  },  
  confirm_one: function(e) {  
    console.log(e);  
    this.setData({  
      modalHidden: true,  
      toast1Hidden:false,  
      notice_str: '提交成功'  
    });  
  },  
  cancel_one: function(e) {  
    console.log(e);  
    this.setData({  
      modalHidden: true,  
      toast1Hidden:false,  
      notice_str: '取消成功'  
    });  
  },  
  //弹出提示框  
  modalTap2: function(e) {  
    this.setData({  
      modalHidden2: false  
    })  
  },  
  modalChange2: function(e) {  
    this.setData({  
      modalHidden2: true  
    })  
  },  
  bindPickerChange: function(e) {  
    console.log('picker发送选择改变，携带值为', e.detail.value)  
    this.setData({  
      index: e.detail.value  
    })  
  },  
  onLoad:function(options){  
    // 页面初始化 options为页面跳转所带来的参数  
  },  
  onReady:function(){  
    // 页面渲染完成  
  },  
  onShow:function(){  
    // 页面显示  
  },  
  onHide:function(){  
    // 页面隐藏  
  },  
  onUnload:function(){  
    // 页面关闭  
  },  
  
  

 
  
  formSubmit: function(e) { 

	  if(e.detail.value.telephone.length==0){
	 
	   wx.showToast({
	 
		title: '联系方式不得为空!',
	 
		icon: 'loading',
	 
		duration: 1500
	 
	   })
	 
	   setTimeout(function(){
	 
		 wx.hideToast()
	 
		},2000)
	 
	  }else if(e.detail.value.telephone.length != 11){
	 
		wx.showToast({
	 
		title: '请输入11位手机号码!',
	 
		icon: 'loading',
	 
		duration: 1500
	 
	   })
	 
	   setTimeout(function(){
	 
		 wx.hideToast()
	 
		},2000)
	 
	  }else{
    var that = this;  
    var formData = e.detail.value;   
    wx.request({  
      url: 'http://test.com:8080/test/socket.php?msg=2',  
      data: formData,  
      header: {  
          'Content-Type': 'application/json'  
      },  
      success: function(res) {  
        console.log(res.data)  
        that.modalTap();  
      }  
    })  	  
	  } 
  

  },  
  formReset: function() {  
    console.log('form发生了reset事件');  
    this.modalTap2();  
  }  
}) 