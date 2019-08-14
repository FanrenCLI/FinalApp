let app = getApp();

Page({
    data: {
        ablemajor: [],
        mymajor: [],
        majorgrade: []
    },
    onLoad: function (e) {
        var that = this
        wx.showToast({
            title: '查询中...',
            icon: 'loading',
        });

        wx.request({
            url: app.globalData.mainurl + 'changemajor',
            data: {
                cookie: app.globalData.localCookie,
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            success: (result) => {
                if (result.data != 'failure') {
                    that.setData({
                        ablemajor: result.data
                    })
                }
            },
            fail: () => {
                console.log('failure')
                wx.showToast({
                    title: "查询失败",
                    icon: "none",
                    duration: 1500
                })
            }
        });
        wx.request({
            url: app.globalData.mainurl + 'ybmajor',
            data: {
                cookie: app.globalData.localCookie,
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            success: (result) => {
                if (result.data != 'failure') {
                    that.setData({
                        mymajor: result.data
                    })
                }
            },
            fail: () => {
                console.log('failure')
                wx.showToast({
                    title: "查询失败",
                    icon: "none",
                    duration: 1500
                })
            }
        });
        wx.request({
            url: app.globalData.mainurl + 'changemajorgrade',
            data: {
                cookie: app.globalData.localCookie,
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            success: (result) => {
                // 当用户没有转专业的信息，则会返回500信息，此时length为几百
                if (result.data != 'failure' && result.data.length<5) {
                    that.setData({
                        majorgrade: result.data
                    })
                }
            },
            fail: () => {
                console.log('failure')
                wx.showToast({
                    title: "查询失败",
                    icon: "none",
                    duration: 1500
                })
            }
        });

    },

})