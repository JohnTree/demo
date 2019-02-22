/**
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-02 14:47
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from "react";
import {StyleSheet, View,Platform} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {NavBar} from "react-native-router-flux";
/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class MyNavBar extends NavBar {


    render() {
        return (
            <LinearGradient
                start={{x: 0.0, y: 1.0}} end={{
                x: 1.0, y: 1.0
            }}
                locations={[0.0, 0.8]}
                colors={[Theme.color.gradual_blue1,
                    Theme.color.gradual_blue3]}
                style={styles.NavBar}>
                {super.render()}
            </LinearGradient>
        )
    }
}

//@mark style
const styles = StyleSheet.create({
    NavBar: {
        width: Theme.size.width,
        paddingTop: 0,
        top: 0,
        ...Platform.select({
            ios: {
                height: 64,
            },
            android: {
                height: 54,
            },
        }),
        right: 0,
        left: 0,
        position: 'absolute',
    }
});
