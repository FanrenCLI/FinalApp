let app = getApp();

Page({
  data: {
    times: [{ name: '1', class2: '' }, { name: '2', class2: '' }, { name: '3', class2: '' },
    { name: '4', class2: '' }, { name: '5', class2: '' }, { name: '6', class2: '' },
    { name: '7', class2: '' }, { name: '8', class2: '' }, { name: '9', class2: '' },
    { name: '10', class2: '' }, { name: '11', class2: '' }, { name: '12', class2: '' }],
    week_kecheng: [{ week_day: [{ week: '一' }, { week: '二' }, { week: '三' }, { week: '四' }, { week: '五' }, { week: '六' }, { week: '日' }] }],
    cardRightIn: false,
    cardLeftIn: false,
    currentIndex: 0,
    sw_kc: [],
    multiArray: [[], []],
    multiIndex: [0, 0],
    index_multiArray: [[], []],
    req_flag: false,
    req_dep: false
  },
  onLoad: function (params) {
    var that = this
    wx.showToast({
      title: '查询中...',
      icon: 'loading',
    });
    wx.request({
      url: app.globalData.mainurl + 'depart',
      data: {
        cookie: app.globalData.localCookie
      },
      success(res) {
        if (res.data.length != 0) {
          wx.hideToast();
          that.data.multiArray[0] = []
          that.data.index_multiArray[0] = []
          for (var i in res.data) {
            that.data.multiArray[0].push(res.data[i].text)
            that.data.index_multiArray[0].push(res.data[i].val)
          }
          that.setData({
            multiArray: that.data.multiArray
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '查询失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this
    var data = {
      multiArray: that.data.multiArray,
      multiIndex: that.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    if (e.detail.column == 0 && that.data.req_dep == false) {
      wx.request({
        url: app.globalData.mainurl + 'major',
        data: {
          depid: that.data.index_multiArray[0][e.detail.value],
          cookie: app.globalData.localCookie
        },
        method: "POST",
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        success(res) {
          that.data.multiArray[1] = []
          that.data.index_multiArray[1] = []
          if (res.data.length != 0) {
            for (var i in res.data) {
              that.data.multiArray[1].push(res.data[i].text)
              that.data.index_multiArray[1].push(res.data[i].val)
            }
            that.setData({
              multiArray: that.data.multiArray
            })
          }
        },
        fail(res) {
          console.log(res.data)
        }
      })
    }
    that.setData(data);
  },
  CourseSearch: function (e) {
    var that = this
    var bjid = this.data.index_multiArray[1][this.data.multiIndex[1]]
    var mydate = new Date()
    var month = mydate.getMonth()
    var year = mydate.getFullYear()
    var term = ''
    if (month > 8) {
      term = year + '-' + (year + 1) + '-1'
    } else {
      term = (year - 1) + '-' + year + '-2'
    }
      wx.request({
        url: app.globalData.mainurl + 'course',
        data: {
          cookie: app.globalData.localCookie,
          bjid: bjid,
          term: term
        },
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res.data)
          that.data.sw_kc = []
          var result = res.data
          for (var i in result) {
            var myset = new Set()
            for (var j in result[i]) {
              if (result[i][j] != '') {
                myset.add(result[i][j])
                myset.add(j)
              }
            }
            for (var n of myset) {
              if (n.length > 2) {
                var arr = n.split(' ')
                var crr = { 'kcmc': arr[0], 'teacher': arr[1].substring(1), 'zhouci': arr[2].substring(1, arr[2].length - 1), 'skdd': arr[3].substring(0, arr[3].length - 1),'skjc':0,'xqj':parseInt(i)+1,'bg':'color'+parseInt(i+1)%4}
                that.data.sw_kc.push(crr)
              }else{
                if(that.data.sw_kc[that.data.sw_kc.length-1].skjc==0){
                  that.data.sw_kc[that.data.sw_kc.length-1].skjc=parseInt(n)
                }else{
                  that.data.sw_kc[that.data.sw_kc.length-1].skcd=parseInt(n)-that.data.sw_kc[that.data.sw_kc.length-1].skjc+1
                }
              }
            }
          }
          that.data.req_flag = true
          that.setData({
            sw_kc:that.data.sw_kc
          })
        },
        fail(res) {
          console.log(res.data)
        }
      })
    

  }
})