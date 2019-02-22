// obtained from react native tutorials
import React from "react";
import {PixelRatio} from "react-native";
import Dimensions from "Dimensions";
import Platform from "Platform";
var navigationBarHeight;
var tabBarHeight;
var statuBarHeight;

if (Platform.OS === 'android') {
    navigationBarHeight = 54;
    tabBarHeight = 50;
    statuBarHeight = 20
} else {
    navigationBarHeight = 64;
    tabBarHeight = 50;
    statuBarHeight = 20
}

const Theme = {
    ratio: PixelRatio.get(),
    pixel: 1 / PixelRatio.get(),
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        radius: 4,
        statusBarHeight: Platform.OS === 'android' ? 0 : 20
    }, color: {
        background: "#F6F6F6",//通用背景色
        view_Background: "#FCFCFC",//视图背景色
        line_horizontal: "#DADADA",//横向分割线
        line_vertical: "#F1F1F1",//竖向分割线
        font_assist: "#BBBBBB",//辅助性文字
        font_content: "#666666",//内容文字
        font_classify: "#999999",//分类文字
        font_title: "#333333",//标题文字
        vision_main: "#F1524E",//视觉主色
        vision_main_alt: "#FE3838",//主色渐变
        vision_second: "#FE3838",//视觉第二主色
        red: "#F65C4B",//自定义红色
        blue: "#5DA4E5",//自定义蓝色
        orange: "#F7B33E",//自定义橘黄色
        green: "#6DB247",//自定义绿色
        bigBlue: "#1AA0E5",//自定义深蓝
        orange1: "#FE7C56",//自定义橘黄色2
        gradual_blue1: "#FE3838",
        gradual_blue2: "#FE3838",
        gradual_blue3: "#F35347",
        clean: "transparent",
        godRed: "#F35347",//自定义红色
        bigRed: "#F35347",//自定义红色
        smallGreen: "#7ED321"
    }, fontSize: {
        bigMax: 18,
        max: 16,
        larger: 14,
        base: 13,
        lesser: 12,
        min: 10,
    }, padding: {
        //间距定义
        max: 24,//最大
        larger: 21,//较大间距
        base: 15,//较中间距
        less: 10,//较小间距
        bsmaller: 8,//较小间距
        smaller: 5,//较小间距
    }, navigationBar: {
        //导航高度
        barHeight: navigationBarHeight,//导航栏高度
    }, tabBar: {
        barHeight: tabBarHeight
    }, statuBar: {
        barHeight: statuBarHeight
    }, heigth: {
        h1: 10,
    }

};
//noinspection JSAnnotator
export default Theme;