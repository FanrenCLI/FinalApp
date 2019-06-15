let app =  getApp();

  Page({
    data:{
        gradelist:[]
    },
    onLoad:function(options){
        var that = this;
        that.setData({
          choose: options.choose,
        })
        switch (that.data.choose) {
            case "2":
              wx.setNavigationBarTitle({ title: '成绩查询' });
              break;
        }
        wx.showToast({
          title: '查询中...',
          icon: 'loading'
        });
        wx.request({
          url:app.globalData.mainurl+'grade',
          data:{
            // stuid:app.globalData.stuid,
            // pwd:app.globalData.pwd
            stuid:'1622022033',
            pwd:'320621199704096734'
          },
          success(res){
            console.log(res.data)
            var gradename=[]
            var grade=[]
            for(var i in res.data){
              gradename.push(i)
              grade.push(res.data[i])
            }
            that.data.gradelist.push(gradename)
            that.data.gradelist.push(grade)
            that.setData({
              gradelist:that.data.gradelist
            })
            wx.hideToast();
          },
          fail(res){
            wx.showToast({
              title:'查询失败,请刷新',
              icon:'none',
              duration:3000
            })
            console.log("查询成绩失败")
          }
        })
    }
  })