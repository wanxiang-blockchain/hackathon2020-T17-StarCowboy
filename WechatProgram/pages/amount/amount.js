var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chainPoint:"",
    offlineSpent:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var address="qZxDyuPu6qcC7w19xBBYShynQ8KXJScogj";
    var that=this;
    wx.request({
      url: util.apiUrl+'/getAmount/'+address, 
      success (res) {
        console.log(res)
        that.setData({
          chainPoint:res.data.chainPoint,
          offlineSpent:res.data.layer2spent
        })
      
      }
    })
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

  }
})