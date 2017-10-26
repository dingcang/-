// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',    
    mobile: '',
    code: '',
    tipflag: false,
    tip: '',	  
    codeflag: true,	
    codestate: '发送验证码',	
    country: ["美国", "加拿大", "英国", "日本", "澳大利亚", "新西兰", "香港", "新加坡",  "德国", "法国", "荷兰", "其他"],
    countryIndex: 0,
    stage: ["博士", "硕士", "MBA", "本科转学", "本科", "高中", "其他"],
    stageIndex: 0,
    major: ["商科类", "工程类", "自然科学类", "社会科学类", "教育学类", "法律学类", "公共事务类", "新闻传播类", "艺术类", "健康类","其他"],
    majorIndex: 0,
    currentStage: ["博士", "硕士", "MBA", "本科转学", "本科", "高中", "其他"],
    currentStageIndex: 0,
    currentMajor: ["管理学类", "经济学类", "法学类", "理学类", "工学类", "医学类", "艺术学类", "教育学", "文学", "农学类", "历史学类", "哲学类", "其他"],
    currentMajorIndex: 0,
    nameFocus: false,
    phoneFocus: false,
    phoneCodeFocus: false
  },
  nameFocus: function(){
    this.setData({
      nameFocus: true
    })
  },
  phoneFocus: function () {
    this.setData({
      phoneFocus: true
    })
  },
  phoneCodeFocus: function () {
    this.setData({
      phoneCodeFocus: true
    })
  },
  countryChange: function(e){
    this.setData({
      countryIndex: e.detail.value
    })
  },
  stageChange: function (e) {
    this.setData({
      stageIndex: e.detail.value
    })
  },
  majorChange: function (e) {
    this.setData({
      majorIndex: e.detail.value
    })
  },
  currentStageChange: function (e) {
    this.setData({
      currentStageIndex: e.detail.value
    })
  },
  currentMajorChange: function (e) {
    this.setData({
      currentMajorIndex: e.detail.value
    })
  },

  bindCodeTap: function(event){

    var that = this
    var mobile = that.data.mobile
 
    if (mobile != '' && that.data.codeflag) {

      that.data.codeflag = false

      var currentTime = 60
      var interval = setInterval(function(){  
          currentTime--;  
          that.setData({  
              codestate : '('+currentTime+')s'  
          })  

          if(currentTime == 0){  
              clearInterval(interval)   

              that.setData({
                'codestate': '重新发送'
              })
              that.data.codeflag = true
          }  
      }, 1000)  

      // 发送验证码
      wx.request({
        url: 'https://gmat.1gre.cn/weixin/sendsms.php',
        data: {
          shoujihao: mobile
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {

          if(res.data.Status != 0) {
            
            that.setData({
              'tipflag': true
            })
            
            that.setData({
              'tip': res.data.Messages
            })

            setTimeout(function(){
              that.setData({
                'tipflag': false
              })
            }
            ,3000)

          }else{
           wx.setStorageSync('code', res.data.code);			  
		  } 
        }
      })

    }

  },
  bindNameChange: function (event) {
    this.data.name = event.detail.value
  },  
  bindMobileChange: function(event){
    this.data.mobile = event.detail.value
  },
  bindSubmitTap: function(event){
    var that = this
    var name = event.detail.value.name	
    var mobile = event.detail.value.mobile
    var code = event.detail.value.code
    var country = event.detail.value.country
    var stage = event.detail.value.stage	
    var major = event.detail.value.major
    var currentStage = event.detail.value.currentStage
    var currentMajor = event.detail.value.currentMajor	
	
    if(name == '' || mobile == '' || code == '' || country == '' || stage == '' || major == '' || currentStage == '' || currentMajor == '') {
      that.setData({
        'tip': '信息请填写完整'
      })

      that.setData({
        'tipflag': true
      })

      setTimeout(function(){
        that.setData({
          'tipflag': false
        })
      }
      ,3000)

      return
    }  
	 
	var mcode=wx.getStorageSync('code');
    //验证码效验
	if(code != mcode) {
			  
			  that.setData({
				'tipflag': true
			  })
			  
			  that.setData({
				'tip': "请输入正确的验证码"
			  })

			  setTimeout(function(){
				that.setData({
				  'tipflag': false
				})
			  }
			  ,3000)

			}else{
          that.setData({
            hiddenLoading:false
          });
          wx.request({
            url: 'https://gmat.1gre.cn/weixin/pinggu_wx.php?ac=server',
            data: {
              name: name,
              phone: mobile,
			  country: country,
			  stage: stage,
			  major: major,		
			  currentStage: currentStage,		
			  currentMajor: currentMajor,					  
            },	
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              that.setData({
                hiddenLoading:true
              });

              if(res.data.Status != "1"){
				  				
				   if(res.data.Status == "-5"){
					   
					that.setData({
					  'tipflag': true,	
					  'tip': '该手机号近期已提交过'
					})						   
				   }else{
					   
					that.setData({
					  'tipflag': true,	
					  'tip': res.data.Message
					})						   
				   }

				
              wx.redirectTo({
                url: './submit/submit?type=failure'
              })
			  
                return;
              }
              wx.redirectTo({
                url: './submit/submit?type=success'
              })

            }
          })		  
				
	}
	  
  
  }  
})