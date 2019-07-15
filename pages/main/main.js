let app = getApp();

Page({
  data: {
    "index_list": [{
      "url": "../grade/grade",
      "img": "cj.png",
      "name": '成绩查询',
      "id": 0,
      "dis": ''
    }, {
      "url": "../curriculum/curriculum",
      "img": "kb.png",
      "name": '课表查询',
      "id": 1,
      "dis": ''
    }, {
      "url": "../pubcourse/pubcourse",
      "img": "gxk.png",
      "name": '公选课',
      "id": 2,
      "dis": ''
    }, {
      "url": "../main_detail/jwtz/jwtz",
      "img": "tongzhi.png",
      "name": '教务通知',
      "id": 3,
      "dis": ''
    }, {
      "url": "../main_detail/dining/dining",
      "img": "canting.png",
      "name": '校园食堂',
      "id": 4,
      "dis": ''
    }, {
      "url": "../main_detail/discussion/discussion",
      "img": "shequ.png",
      "name": '社区讨论',
      "id": 5,
      "dis": ''
    }, {
      "url": "../main_detail/leisureClass/leisureClass",
      "img": "classes.png",
      "name": '空闲教室',
      "id": 6,
      "dis": ''
    }, {
      "url": "../main_detail/more/more",
      "img": "more.png",
      "name": '更多',
      "id": 7,
      "dis": ''
    }],
    weather:{},
    daytimes:45
  },
  happyblock:function(res){
    wx.navigateTo({
      url:"../main_detail/happyblock/happyblock",
    })
  },
  learnblock:function(res){
    wx.navigateTo({
      url:"../main_detail/learnblock/learnblock"
    })
  },
  onLoad:function(res){
    var that=this;
    wx.request({
      url:"https://fanrencli.cn/weather_mini?city=南通",
      data:{
 
      },
      success(res){
        var backdata=res.data.data.forecast[0];
        console.log(backdata);
        var weather={};
        weather.date=backdata.date.substring(backdata.date.indexOf("星"));
        weather.temperature=backdata.low.substring(3)+"~"+backdata.high.substring(3);
        weather.wind=backdata.fengxiang;
        weather.status=backdata.type;
        weather.ganmao=res.data.data.ganmao;
        weather.winddegree=backdata.fengli.substring(9,backdata.fengli.indexOf("级")+1);
        that.setData({
          weather:weather,
        })
      }
    })
  },
})