//index.js
//获取应用实例
var QRCode = require('../../utils/weapp-qrcode.js')
var util = require('../../utils/util.js')

const app = getApp()
var  qrcode ;
Page({
  data: {
    name:""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that=this;
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: "qZxDyuPu6qcC7w19xBBYShynQ8KXJScogj",
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });  

    // wx.request({
    //   url: 'http://192.168.0.106:3000/getkey', //仅为示例，并非真实的接口地址
    //   data: {
    
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success (res) {
    //     that.setData({
    //       name:res.data
    //     })
         
    //   }
    // })

  },makecode(){
    qrcode.makeCode("123")
  },toAmount(){
    console.log(1)
    wx.navigateTo({
      url: '../amount/amount',
    })
  }
  
})
