// pages/search/search.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_list: [{
      url: '../search_fun/search_fun?choose=1',
      name: '课表查询(开发中)',
      src:"../../image/kb.png"
    }, {
      url: '../indexFun/indexFun?choose=2',
      name: '成绩查询',
      src:"../../image/cj.png"
    }, {
      url: '../search_fun/search_fun?choose=3',
      name: '学生考勤(开发中)',
      src:"../../image/kq.png"
    }, {
      url: '../search_fun/search_fun?choose=4',
      name: '教师信息(开发中)',
      src:"../../image/js.png"
    }, {
      url: '../search_fun/search_fun?choose=5',
      name: '考试安排(开发中)',
      src:"../../image/ks.png"
    }, {
      url: '../search_fun/search_fun?choose=6',
      name: '校园黄页(开发中)',
      src:"../../image/dhb.png"
    }, {
      url: '../search_fun/search_fun?choose=7',
      name: '人才培养方案(开发中)',
      src:"../../image/rc.png"
    }],
    
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

  }
})