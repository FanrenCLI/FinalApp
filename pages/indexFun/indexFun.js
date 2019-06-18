let app =  getApp();

  Page({
    data:{
      termlist:['大一上学期','大一下学期','大二上学期','大二下学期','大三上学期','大三下学期','大四上学期','大四下学期'],
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
            stuid:app.globalData.stuid,
            pwd:app.globalData.pwd
            // stuid:'1622022035',
            // pwd:'lu8023lu'
          },
          success(res){
            var arr=[]
            for(var n in res.data){
              arr.push(n)
            }
            arr.sort()
            for(var i in res.data){
              var gradename=[]
              var grade=[]
              for(var j in res.data[i]){
                gradename.push(j)
                grade.push(res.data[i][j])
              }
              that.data.gradelist[arr.indexOf(i)]=[]
              that.data.gradelist[arr.indexOf(i)].push(gradename)
              that.data.gradelist[arr.indexOf(i)].push(grade)
            }
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