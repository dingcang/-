//baseinfo.js
var app = getApp();
var util = require('../../utils/util.js');
var md5 = require('../../utils/md5.js');
Page({
  data: {
    array: ['大四', '大三', '大二', '大一','本科毕业','高三','高二','高一','高中毕业','初三','初二','初一','初中毕业','研究生在读','研究生毕业','其他'],
    index: -1,  //数组索引
    errorMsg:'',    //错误提示
    phone:'',    //手机号
    codeInterval:120, //发送短信时间提示
    codeStatus:"获取验证码", 
    codeBtnDisabled: false,  //发送短信按钮是否禁用
    newCode:''
  },
  //获取选择值的索引
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
    })
  },
  //获取焦点清空错误提示
  focusFn:function(){
      this.setData({
           errorMsg:''
      });
  },
   //获取手机号码
  inputFn:function(e){
      this.setData({
          phone:e.detail.value, 
      })
  },
  
  //发送短信
  sendSMS:function(){
    var phone = this.data.phone;
    var that = this;
    if(this.data.codeBtnDisabled){
      return;
    }
  
    //检验手机号 
    if(!util.checkPhoneNumer(phone)){
       that.setData({
          errorMsg:'请输入正确的手机号',
       });
       return false;
    }
     
    this.setData({
      codeStatus: '正在发送...',
      codeBtnDisabled: true
    })
   
    wx.request({
      url: app.globalData.siteBaseUrl +"Choose/send_yzm", //发送短信接口地址
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Lang": app.globalData.res.language,
        "Client-Version": app.globalData.res.version,
        "Os": app.globalData.res.platform,
      },
       data: {
         phone: phone,
       },
      success: function (res) {
        console.log(res);
        if(res.data.result == 'error'){
             that.setData({
                 errorMsg:res.data.data.msg ? res.data.data.msg : res.data.data,
                 codeStatus:'获取验证码',
                 codeBtnDisabled:false,
             });
        }else{
            that.setData({
              newCode: res.data.data
            });
            var second = that.data.codeInterval;
            var interval;
            //获取弹出提示发送
            wx.showToast({
              title: '已发送',
              icon: 'success'
            });
            interval = setInterval(function () {
              if (second < 0) {
                clearInterval(interval);
                that.setData({
                  codeStatus: '获取验证码',
                  codeBtnDisabled: false
                });
              } else {
                that.setData({
                  codeStatus: second + 's',
                });
                second--;
              }
            }, 1000);
          } 
      },
      fail: function () {
          that.setData({
            codeStatus: '获取验证码',
            codeBtnDisabled: false,
          });
          wx.showToast({
            title: '服务器网络错误!',
            icon: 'loading',
            duration: 1500
          })
      }

    })
  },
  submitFn:function(e){
    var that = this;
    var username = encodeURIComponent(e.detail.value.username);
    var edu = encodeURIComponent(e.detail.value.edu);
    var phone = encodeURIComponent(e.detail.value.phone);
    var code = e.detail.value.code;

    if(username == ''){
         that.setData({
           errorMsg:'姓名不能为空！'
         })
         return false;
    }

    if(edu == ''){
       that.setData({
         errorMsg:'就读年级不能为空！'
       })
       return false;
    }

    if (!util.checkPhoneNumer(phone)) {
      that.setData({
        errorMsg:'请输入正确的手机号!'
      })
      return false;
    }
    if(code.length < 5 || code != that.data.newCode){
      that.setData({
        errorMsg:'验证码错误!'
      })
      return false;
    }
    
    var obj = {
      phone: phone,
      name: username,
      edu: edu,
    };
    /***生成sign 开始***/
    var str = util.makeSign(obj);
    var sign = md5.hex_md5(str);
    obj.sign = sign;
    /****生成sign结束****/

    wx.request({
        url: app.globalData.siteBaseUrl +"Choose/base_info", //接口地址
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Lang": app.globalData.res.language,
          "Client-Version": app.globalData.res.version,
          "Os": app.globalData.res.platform,
        },
        method: "POST", 
        data: obj,
        success: function (res) {
           if(res.data.data.id){
              wx.showToast({
                   title:'正在提交...',
                   icon:'loading',
                   duration:1500
              });
              wx.setStorageSync('id',res.data.data.id);
              wx.redirectTo({
                url: '../eduback/eduback'
              });
           }else{
              that.setData({
                 errorMsg:res.data.data.msg?res.data.data.msg:'测试失败请稍后重试!',
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

