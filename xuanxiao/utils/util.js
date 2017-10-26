var app = getApp();
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//检测手机格式
function checkPhoneNumer(phone){
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!reg.test(phone)) {
      return false;
    }
    return true;
}

function checkJlpt(jlpt){
    var reg = /^(N|n)[1-5]$/;
    if(!reg.test(jlpt)){
        return false;
    }
    return true;
}

//拼成签名字符串
function makeSign(obj){
  var arr = [];
  for (var i in obj) {
    arr.push(i);
  }
  arr.sort();
  var arr1 = [];
  for (var x = 0; x < arr.length; x++) {
    for (var j in obj) {
      if (j == arr[x]) {
        arr1[arr[x]] = obj[j];
      }
    }
  }
  var str = '';
  for (var a in arr1) {
     if(arr1[a]!=''){
       str += a + '=' + arr1[a] + '&';
     }
  }
  str += app.globalData.key;
  var lastIndex = str.lastIndexOf('&'),
    left = str.substr(0, lastIndex),
    right = str.substr(lastIndex + 1);
  str = left + right;
  return str;
}

module.exports = {
  formatTime: formatTime,
  checkPhoneNumer:checkPhoneNumer,
  makeSign:makeSign,
  checkJlpt: checkJlpt
}
