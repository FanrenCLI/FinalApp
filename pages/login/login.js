let app = getApp();

Page({
    data: {
        id: "",
        pwd: ""
    },
    idinput: function (e) {
        this.setData({ id: e.detail.value })
    },
    pwdinput: function (e) {
        this.setData({ pwd: e.detail.value })
    },
    getUserInfomation: function () {
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            app.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                            wx.hideToast({
                                success: () => {

                                }
                            });
                            wx.switchTab({
                                url: "../main/main"
                            })
                        }
                    })
                } else {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success() {
                            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                            wx.getUserInfo({
                                success: res => {
                                    // 可以将 res 发送给后台解码出 unionId
                                    app.globalData.userInfo = res.userInfo

                                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                    // 所以此处加入 callback 以防止这种情况
                                    if (this.userInfoReadyCallback) {
                                        this.userInfoReadyCallback(res)
                                    }
                                    wx.hideToast({
                                        success: () => {
                                        }
                                    });
                                    wx.switchTab({
                                        url: "../main/main"
                                    })
                                }
                            })
                        },
                        fail() {
                            wx.hideToast({
                                success: () => {
                                }
                            });
                        }
                    })
                }
            }
        })
    },
    login_in: function (e) {
        var that = this;
        wx.showToast({
            title: "登录请求中",
            icon: "loading"
        });
        // 登录-----此处在开发后台时使用
        wx.login({
            success(res) {
                if (res.code) {
                    // 发起网络请求
                    wx.request({
                        url: app.globalData.mainurl + 'login',
                        method: "POST",
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        data: {
                            code: res.code,
                            id: that.data.id,
                            pwd: that.data.pwd
                        },
                        success: function (res) {
                            console.log(res.data.stuid)
                            if(res.data.stuid!=undefined){
                                app.globalData.stuid=res.data.stuid;
                                app.globalData.username=res.data.name;
                                app.globalData.pwd=res.data.pwd;
                                that.getUserInfomation();
                                wx.hideToast({})
                            }else{
                                wx.showToast({
                                    title:'登录失败',
                                    icon:'none',
                                    duration:2000
                                })
                            }
                        },
                        fail(res) {
                            console.log("请求失败")
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })

    },
    login_in_wx:function(e){
        var that= this
        wx.showToast({
            title: "登录请求中",
            icon: "loading"
        });
        wx.login({
            success(res) {
                if (res.code) {
                    // 发起网络请求
                    wx.request({
                        url: app.globalData.mainurl + 'login_wx',
                        method: "POST",
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        data: {
                            code: res.code,
                        },
                        success: function (res) {
                            console.log(res.data)
                            if(res.data.stuid!=undefined){
                                app.globalData.stuid=res.data.stuid;
                                app.globalData.username=res.data.name;
                                app.globalData.pwd=res.data.pwd
                                that.getUserInfomation();
                                wx.hideToast({})
                            }else{
                                wx.showToast({
                                    title:'登录失败',
                                    icon:'none',
                                    duration:2000
                                })
                            }
                        },
                        fail(res) {
                            wx.showToast({
                                title:'登录失败',
                                icon:'none',
                                duration:2000
                            })
                            console.log("请求失败")
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    }

})

