var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcoderesult:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },toAuthentication(){
   
    
    var that=this;
    wx.scanCode({
      onlyFromCamera: false,
      success (res) {
        wx.showLoading({
          title: '验证中',
        })
        var address=res.result;
        console.log(address);
        wx.request({
          url: util.apiUrl+'/verificationUser/'+address, 
          success (res) {
            that.setData({
              qrcoderesult:res.data
            })
            wx.hideLoading();
            if(res.data.username!=""){
              wx.showToast({
                title: '验证成功',
                icon: 'success',
                duration: 2000
              })
            }else{
              wx.showToast({
                title: '验证失败',
                icon: 'fail',
                duration: 2000
              })
              
            }
          }
        })

        
   

      }
    })
  },toReduce(){
   

    wx.scanCode({
      onlyFromCamera: false,
      success (res) {
    
        var address=res.result;
        console.log(address);

        wx.navigateTo({
          url: '../reducePoint/reducePoint',
        })
        
   

      }
    })

    
  }
})