//testscore.js
var app = getApp();
var util = require('../../utils/util.js');
var md5 = require('../../utils/md5.js');
function showValue(index, val,listC,sectionC) {
  if(val) {
    listC[index].value = val;
    sectionC[index].styleFlag = !sectionC[index].styleFlag;
    listC[index].Falg = !listC[index].Falg;
  }
}

function checkNum(val){
  var reg  = /^[0-9]+.?[0-9]*$/;
  if(reg.test(val)){
    return true;
  }
  return false;
}

Page({
  data: {
    errorMsg:'',  // 错误信息
    list:[
      {
        itemClass: 'GRE',
        Falg: true,
        content: 'GRE',
        name: 'gre',
        placeholder: '请输入您的GRE成绩',
        value: '',
      }, {
        itemClass: 'GRESUB',
        Falg: true,
        content: 'GRE SUB',
        name: 'gresub',
        placeholder: '请输入您的GRE SUB成绩',
        value: '',
      }, {
        itemClass: 'GMAT',
        Falg: true,
        content: 'GMAT',
        name: 'gmat',
        placeholder: '请输入您的GMAT成绩',
        value: '',
      }, {
        itemClass: 'LSAT',
        Falg: true,
        content: 'LSAT',
        name: 'lsat',
        placeholder: '请输入您的LSAT成绩',
        value: '',
      }, {
        itemClass: 'JLPT',
        Falg: true,
        content: 'JLPT',
        name: 'jlpt',
        placeholder: '请输入您的JLPT成绩',
        value: '',
      }, {
        itemClass: 'SAT',
        Falg: true,
        content: 'SAT',
        name: 'sat',
        placeholder: '请输入您的SAT成绩',
        value: '',
      }, {
        itemClass: 'SATCR',
        Falg: true,
        content: 'SAT CR',
        name: 'satcr',
        placeholder: '请输入您的SAT CR成绩',
        value: '',
      }, {
        itemClass: 'SSAT',
        Falg: true,
        content: 'SSAT',
        name: 'ssat',
        placeholder: '请输入您的SSAT成绩',
        value: '',
      }, {
        itemClass: 'ACT',
        Falg: true,
        content: 'ACT',
        name: 'act',
        placeholder: '请输入您的ACT成绩',
        value: '',
      }
    ],
    section: [
      {
        name: 'GRE',
        styleFlag: false
      }, {
        name: 'GRE SUB',
        styleFlag: false
      }, {
        name: 'GMAT',
        styleFlag: false
      }, {
        name: 'LSAT',
        styleFlag: false
      }, {
        name: 'JLPT',
        styleFlag: false
      }, {
        name: 'SAT',
        styleFlag: false
      }, {
        name: 'SAT CR',
        styleFlag: false
      }, {
        name: 'SSAT',
        styleFlag: false
      }, {
        name: 'ACT',
        styleFlag: false
      }
    ]
  },
 /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var that = this;
    var id = wx.getStorageSync('id');
    wx.request({
      url: app.globalData.siteBaseUrl +'Choose/get_score', //仅为示例，并非真实的接口地址
        data: {id:id},
        header: {
          'content-type': 'application/json',
          "Lang": app.globalData.res.language,
          "Client-Version": app.globalData.res.version,
          "Os": app.globalData.res.platform,
        },
        success: function (res) {
          if (res.data.data) {
            var data = res.data.data[0],
                sectionC = that.data.section,
                listC = that.data.list;
           
                showValue(0, data.gre, listC, sectionC);
                showValue(1, data.gre_sub, listC, sectionC);
                showValue(2, data.gmat, listC, sectionC);
                showValue(3, data.lsat, listC, sectionC);
                showValue(4, data.jlpt, listC, sectionC);
                showValue(5, data.sat, listC, sectionC);
                showValue(6, data.sat_cr, listC, sectionC);
                showValue(7, data.ssat, listC, sectionC);
                showValue(8, data.act, listC, sectionC);
                that.setData({
                  list: listC,
                  section: sectionC
                })
             }
        }
    })
  },

  /*点击添加对应的input框 */
  show: function(e) {
    // console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index,
        listC = this.data.list,
        sectionC = this.data.section;
    sectionC[index].styleFlag = !sectionC[index].styleFlag;
    listC[index].Falg = !listC[index].Falg;
    if (sectionC[index].styleFlag) listC[index].value = '';
    this.setData({
      list: listC,
      section: sectionC
    })
  },

  // 失去焦点设置list的value值
  setValue: function(e) {
    var listC = this.data.list,
        currentValue = e.detail.value,
        index = e.currentTarget.dataset.index;
    listC[index].value = currentValue;
    this.setData({
      list: listC
    })
  },

//获取焦点的时候清空错误信息
  focusFn:function(){
      this.setData({
          errorMsg:'', 
      });
  },
   submitFn:function(e){
     
      var that = this;
      var id = wx.getStorageSync('id');
      var toefl = e.detail.value.toefl;
      var ielts = e.detail.value.ielts;
      //判断托福成绩和雅思成绩是否为空
      if (toefl == "" && ielts == ""){
            that.setData({
                errorMsg:"托福成绩或雅思成绩不能为空!",
            });
            return false;
        }

       if(toefl>120 || toefl<0){
             that.setData({
                 errorMsg:"托福成绩输入错误!",
                 //toeflStyle:'toeflStyle',
             });
             return false;
       }
        
       if(ielts>9 || ielts<0){
          that.setData({
            errorMsg: "雅思成绩输入错误!",
          });
          return false;
       } 
        var arr = e.detail.value;
        var flag= true;
        for(var i in arr){
         
             if(arr[i]!='' && !checkNum(arr[i]) && i !='jlpt'){
               that.setData({
                   errorMsg:"输入的考试成绩格式不正确!"
               });
               return false;
             }
             /*if(arr[i] == '' && i !='toefl' && i !='ielts'){
                //flag=false;
               that.setData({
                 errorMsg: "您增加的考试成绩不能为空!"
               });
               return false;
             }*/

             if (arr['gre'] < 260 || arr['gre'] > 340 || arr['gre'] == '' ){
               that.setData({
                 errorMsg: "GRE的成绩输入错误!",
                 
               });
               return false;
             }   
             if (arr['gresub'] < 200 || arr['gresub'] > 990 || arr['gresub'] == ''){
               that.setData({
                 errorMsg: "GRE SUB的成绩输入错误!",
               });
               return false;
             }
             if (arr['gmat'] < 200 || arr['gmat'] > 800 || arr['gmat'] == '' ) {
               that.setData({
                 errorMsg: "GMAT的成绩输入错误!",
               });
               return false;
             }
             if (arr['lsat'] < 120 || arr['lsat'] > 180 || arr['lsat'] == '') {
               that.setData({
                 errorMsg: "LSAT的成绩输入错误!",
               });
               return false;
             }
             if ( arr['jlpt'] && (!util.checkJlpt(arr['jlpt']) || arr['jlpt'] =='')){
               that.setData({
                 errorMsg: "JLPT的成绩输入错误!",
               });
               return false;
             }
             if (arr['sat'] < 0 || arr['sat'] > 1600 || arr['sat'] == '') {
               that.setData({
                 errorMsg: "SAT的成绩输入错误!",
               });
               return false;
             }
             if (arr['satcr'] < 200 || arr['satcr'] > 800 || arr['satcr'] == '') {
               that.setData({
                 errorMsg: "SAT CR的成绩输入错误!",
               });
               return false;
             }
             if (arr['ssat'] < 1500 || arr['ssat'] > 2400 || arr['ssat'] == '' ) {
               that.setData({
                 errorMsg: "SSAT的成绩输入错误!",
               });
               return false;
             }
             if (arr['act'] < 0 || arr['act'] > 36 || arr['act'] == '' ) {
               that.setData({
                 errorMsg: "act的成绩输入错误!",
               });
               return false;
             }

        }
        
        //把id的值保存到数组中
        arr['id'] = id;
        /***生成sign 开始***/
        var str = util.makeSign(arr);
        var sign = md5.hex_md5(str);
        console.log(str);
        arr.sign = sign;
        console.log(sign);
        /****生成sign结束****/
        wx.request({
           url: app.globalData.siteBaseUrl + "Choose/test_score", 
            header: {
             "Content-Type": "application/x-www-form-urlencoded",
              "Lang": app.globalData.res.language,
              "Client-Version": app.globalData.res.version,
              "Os": app.globalData.res.platform
            },
            method: "POST",
            data:  arr,
            success: function (res) {
               wx.showToast({
                 title: '加载中...',
                 icon: 'loading',
                 duration: 1500
               })
               if(res.data.result=="ok"){
                   wx.redirectTo({
                     url: '../SoftPower/SoftPower',
                   })
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
