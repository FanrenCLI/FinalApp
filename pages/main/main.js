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
      "url": "../sportcourse/sportcourse",
      "img": "sp.png",
      "name": '体育选课',
      "id": 3,
      "dis": ''
    }, {
      "url": "../grade/offset_grade",
      "img": "cj1.png",
      "name": '冲抵成绩',
      "id": 4,
      "dis": ''
    }, {
      "url": "../kcpj/kcpj",
      "img": "kcpj.png",
      "name": '课程评教',
      "id": 5,
      "dis": ''
    }, {
      "url": "../changeMajor/changeMajor",
      "img": "zzy.png",
      "name": '转专业信息',
      "id": 5,
      "dis": ''
    },{
      "url": "../changepwd/changepwd",
      "img": "mm.png",
      "name": '修改密码',
      "id": 6,
      "dis": ''
    }],
    weather:{},
    daytimes:45
  },
  happyblock:function(res){
    wx.navigateTo({
      url:"../heaven/heaven",
    })
  },
  learnblock:function(res){
    wx.navigateTo({
      url:"../scholar/scholar"
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