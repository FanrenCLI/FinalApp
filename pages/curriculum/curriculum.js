let app = getApp();

Page({
  data: {
    times: [{ name: '1', class2: '' }, { name: '2', class2: '' }, { name: '3', class2: '' },
    { name: '4', class2: '' }, { name: '5', class2: '' }, { name: '6', class2: '' },
    { name: '7', class2: '' }, { name: '8', class2: '' }, { name: '9', class2: '' },
    { name: '10', class2: '' }, { name: '11', class2: '' }, { name: '12', class2: '' }],
    week_kecheng: [{ week_day: [{ week: '一' }, { week: '二' }, { week: '三' }, { week: '四' }, { week: '五' }] }],
    cardRightIn: false,
    cardLeftIn: false,
    currentIndex: 0,
    sw_kc: [],
  },
  onLoad: function (params) {
    var that = this
    wx.showToast({
      title: '查询中...',
      icon: 'loading',
    });
    wx.request({
      url: app.globalData.mainurl + 'curr',
      data: {
        stuid:app.globalData.stuid
        // stuid: "1622022035"
      },
      success(res) {
        wx.hideToast();
        that.data.sw_kc=[]
        var currinfo = res.data
        var bgindex = 0
        for (var i in currinfo) {
          var temp = {}
          temp["kcmc"] = currinfo[i][0]
          temp["skdd"] = currinfo[i][4]
          temp["zhouci"] = currinfo[i][1]
          switch (currinfo[i][2]) {
            case '周一':
              temp["xqj"] = 1
              break;
            case '周二':
              temp["xqj"] = 2
              break;
            case '周三':
              temp["xqj"] = 3
              break;
            case '周四':
              temp["xqj"] = 4
              break;
            case '周五':
              temp["xqj"] = 5
              break;
          }
          var arrstr = currinfo[i][3].split(',')
          temp["skjc"] = parseInt(arrstr[0]) 
          temp['skcd'] = arrstr.length
          temp["teacher"] = currinfo[i][6]
          temp['bg'] = "color" + (bgindex % 4)
          bgindex = bgindex + 1
          that.data.sw_kc.push(temp)
        }
        that.setData({
          sw_kc:that.data.sw_kc
        })
      },
      fail(res) {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})