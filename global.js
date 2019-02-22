import awesomelib from "./libs/Awesomelib";
import {Actions} from "react-native-router-flux";
import FontIcon from "./src/utils/FontIcon";
import CountEmitter from "./src/utils/CountEmitter";
import Theme from "./src/view/style/Theme";
//noinspection JSAnnotator
import PinYin from "./src/utils/PinYin";

//noinspection JSAnnotator
global.Theme = Theme;
//小黄BOX出现限制
console.disableYellowBox = !__DEV__;
global.getMyIcon = type => {
    // console.error("getMyIcon");
    if (type == "iconfont") {
        return FontIcon;
    }

}
global.Pinyin = PinYin;
global.CountEmitter = CountEmitter;
global.FontIcon = FontIcon;
for (var i in awesomelib) {
    global[i] = awesomelib[i];
}
global.Actions = Actions;

global.BS = __DEV__ ? "" : ""//业务主机域名
global.FS = __DEV__ ? "http://nxbk.dhjyzf.com/blpFsp/" : "http://nxbk.dhjyzf.com/blpFsp/"//图片主机域名

global.callAsFunc = (func, args, obj) => {
    if (typeof func == "function") {
        func.apply(obj, args);
    }
}
/***
 * 数据总线
 */
global.DataBus = (function () {
    var map = {};
    var set = function (name, value) {
        map[name] = value;
    }
    var get = function (name) {
        return map[name];
    }
    var clear = function () {
        map = {};
    }
    var remove = function () {
        delete  map[name];
    }
    var getAndClear = function (name) {
        var old = map[name];
        delete  map[name];
        return old;
    }
    return {
        set: set,
        get: get,
        remove: remove,
        clear: clear,
        getAndClear: getAndClear
    }
})();

/**
 * @ mark  date类型扩展
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function (fmt) {
    var date = this;
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "H+": date.getHours(24),                 //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}




