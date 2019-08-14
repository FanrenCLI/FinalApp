let app = getApp();

//Page Object
Page({
  data: {
    oldpwd: "",
    newpwd: "",
    newpwd1: ""
  },
  oldpwd: function (e) {
    this.setData({ oldpwd: e.detail.value })
  },
  pwdinput: function (e) {
    this.setData({ newpwd: e.detail.value })
  },
  pwd1input: function (e) {
    this.setData({ newpwd1: e.detail.value })
  },
  Changepwd: function (e) {
    var oldpwd = this.data.oldpwd
    var newpwd = this.data.newpwd
    var newpwd1 = this.data.newpwd1
    if (newpwd1 == newpwd) {
      wx.showToast({
        title: '操作中...',
        icon:"none"
      })
      wx.request({
        url: app.globalData.mainurl + 'changepwd',
        data: {
          cookie: app.globalData.localCookie,
          stuid: app.globalData.stuid,
          oldpwd: oldpwd,
          newpwd: newpwd,
          newpwd1: newpwd1
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: (result) => {
          if (result.data == 'success') {
            wx.showToast({
              title: '操作成功',
              icon: 'none',
              duration: 1500,
            });
          } else {
            wx.showToast({
              title: '操作失败',
              icon: "none",
              duration: 1500
            })
          }
        },
        fail: () => { console.log('failure') }
      });
    }else{
      wx.showToast({
        title:"密码输入不一致",
        icon:"none",
        duration: 1500
      })
    }


  }
});
