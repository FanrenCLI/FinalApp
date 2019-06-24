let app = getApp();


Page({
    data: {
        kcmc: "",
        skdd: "",
        teacher: "",
        week_time: "",
        day_time: "",
        zhouci: "",
    },
    onLoad: function (options) {
        var week_time="";
        switch (options.week_time) {
            case "1":week_time="周一";break;
            case "2":week_time="周二";break;
            case "3":week_time="周三";break;
            case "4":week_time="周四";break;
            case "5":week_time="周五";break;
        }
        this.setData({
            kcmc: options.kcmc,
            skdd: options.skdd,
            teacher: options.teacher,
            week_time: week_time,
            day_time: options.day_time,
            zhouci: options.zhouci
        })

    }
})