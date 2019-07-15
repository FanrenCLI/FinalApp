let app =  getApp();

  Page({
    data:{
      termlist:['大一上学期','大一下学期','大二上学期','大二下学期','大三上学期','大三下学期','大四上学期','大四下学期'],
      gradelist:[],
      gradeToollist:[]
    },
    onLoad:function(options){
        var that = this;
        wx.setNavigationBarTitle({ title: '成绩查询' });
        wx.showToast({
          title: '查询中...',
          icon: 'loading'
        });
        wx.request({
          url:app.globalData.mainurl+'grade',
          data:{
            // cookie:'ASP.NET_SessionId=btb5g2rtdmddl2berxzlvcyb'
            cookie:app.globalData.localCookie
          },
          method:'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success(res){
            if(res.data!='0'){
              that.setData({
                gradelist:res.data
              })
              let termSet=new Set()
              for(let i=0;i<res.data.length;i++){
                termSet.add(res.data[i].xq)
              }
              let list= Array.from(termSet).sort()
              that.setData({
                gradeToollist:list,
                termlist:that.data.termlist.slice(0,list.length)
              })
            }
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