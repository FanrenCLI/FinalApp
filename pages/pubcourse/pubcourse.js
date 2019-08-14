let app = getApp();

Page({
    data: {
        xqj: 0,
        leisureClass: [
        ],
        myleisureClass: [
            ],
    },
    onLoad: function (e) {
        var that = this
        wx.showToast({
            title: '查询中...',
            icon: 'loading',
        });
        wx.request({
            url: app.globalData.mainurl + 'gxk',
            data: {
                cookie: app.globalData.localCookie,
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            success: (res) => {
                that.setData({
                    leisureClass: res.data
                })
            },
            fail: () => { console.log('failure') },
        });
        wx.request({
            url: app.globalData.mainurl + 'ybgxk',
            data: {
                cookie: app.globalData.localCookie,
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            success: (res) => {
                if (res.data.length != 0) {
                    that.setData({
                        myleisureClass: res.data
                    })
                }

            },
            fail: () => { console.log('failure') },
        });

    },
    DeleteMajor: function (e) {
        wx.request({
            url: app.globalData.mainurl + 'deletegxk',
            data: {
                cookie: app.globalData.localCookie,
                oid: e.target.dataset.oid
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            success: (res) => {
                if (res.data == 'success') {
                    wx.showToast({
                        title: '操作成功',
                        duration: 1500,
                    });
                } else {
                    wx.showToast({
                        title: '不可删除',
                        icon: 'none',
                        duration: 1500,
                    });
                }
            },
            fail: () => { console.log('failure') },
        });
    },
    ChooseMajor: function (e) {
        wx.request({
            url: app.globalData.mainurl + 'submitgxk',
            data: {
                cookie: app.globalData.localCookie,
                jxrwid: e.target.dataset.jxrwid
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            success: (res) => {
                if (res.data == 'success') {
                    wx.showToast({
                        title: '操作成功',
                        duration: 1500,
                    });
                } else {
                    wx.showToast({
                        title: '不可报名',
                        icon:"none",
                        duration: 1500,
                    });
                }
            },
            fail: () => { console.log('failure') },
        });
    }
})