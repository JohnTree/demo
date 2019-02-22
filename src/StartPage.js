/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-10 10:18
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from "react";
import {StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";
import Swiper from "react-native-swiper";
/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class StartPage extends React.Component {

    /***
     * default props value
     * @mark propTypes 默认属性值
     */
    static defaultProps = {}

    /***
     * props types for helper text
     * @mark propTypes 属性类型
     */
    static propTypes = {}

    /**
     * @mark state
     */
    state = {
        pageData: [
            {image: require("../imgs/1.png"), title: "极速收款", subTitle: "多平台扫码，结算零等待"},
            {image: require("../imgs/2.png"), title: "经营分析", subTitle: "可视化数据，助您精准分析"},
            {image: require("../imgs/3.png"), title: "多方位管理", subTitle: "随时随心管理，为您保驾护航"}
        ]
    }

    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
    }

    /**
     * @mark 组件声明周期区域
     */

    /**
     * @mark 第一次加载 只运行一次
     */
    componentDidMount() {

    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */


    //自定义代码区结束

    /**
     * @mark render
     */

    renderItem() {
        return (
            <View style={{flex: 1}}>
                <Swiper style={styles.StartPage}
                        showsButtons={false}
                        dotColor={Theme.color.background}
                        activeDotColor={Theme.color.vision_main}
                        loop={false}
                >
                    {  this.state.pageData.map((value, index) => {
                        return <View key={index} style={styles.slide2}>
                            <Image style={{flex: 1, width: Theme.size.width}}
                                   defaultSource={value.image}/>
                            <View style={{
                                position: "absolute",
                                bottom: 0,
                                height: 200,
                                width: Theme.size.width,
                                backgroundColor: Theme.color.clean,
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    marginBottom: 10,
                                    color: Theme.color.font_content
                                }}>{value.title}</Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        marginBottom: 20,
                                        color: Theme.color.font_assist
                                    }}>{value.subTitle}</Text>
                                {this.state.pageData.length - 1 == index ?
                                    <TouchableOpacity style={{
                                        height: 36,
                                        width: Theme.size.width / 2,
                                        backgroundColor: Theme.color.vision_main,
                                        borderRadius: 23,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}><Text style={{
                                        color: "#FFF",
                                        fontSize: Theme.fontSize.lesser
                                    }}>立即进入 </Text></TouchableOpacity> : null}
                            </View>
                        </View>
                    })}
                </Swiper>
            </View>
        );
    }

    renderIndex() {

    }

    render() {
        if (true) {
            return this.renderItem();
        } else {
            return this.renderIndex();
        }
    }
}

//@mark style
const styles = StyleSheet.create({
    StartPage: {
        backgroundColor: Theme.color.red
    },
    slide1: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    slide2: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    slide3: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});
