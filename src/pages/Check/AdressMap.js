/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-13 13:08
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import BaiduMap from "../../view/component/Map/BaiduMap"

import {
    StyleSheet,
    View,
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class AdressMap extends React.Component {

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
    state = {}

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
    render() {
        return <BaiduMap style={{marginTop: Theme.navigationBar.barHeight}} closeMapView={(localhostInfo) => {
            {/*console.warn(JSON.stringify(localhostInfo));*/
            }
            {/*console.warn(localhostInfo.latitude)*/
            }
            {/*console.warn(localhostInfo.address)*/
            }
            {/*console.warn(localhostInfo.longitude)*/
            }
            DataBus.set("lat", localhostInfo.latitude);
            DataBus.set("lng", localhostInfo.longitude);
            DataBus.set("address", localhostInfo.detAddress ? localhostInfo.detAddress : localhostInfo.address);
            CountEmitter.emit("addressmap", "");
            Actions.pop();
        }}/>
    }
}

//@mark style
const styles = StyleSheet.create({
    AdressMap: {}
});
