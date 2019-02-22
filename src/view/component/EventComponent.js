/**
 *   创建人：wangshiyang
 *   联系方式：带有事件监听的基础类
 *   创建时间：2017-03-04 14:31
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import Event from "events";
/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class EventComponent extends React.Component {


    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
        this._event = new Event();
    }

    on(name, callback) {
        this._event.on(name, callback);
    }

    emit(name, data) {
        this._event.emit(name, data);
    }

    componentWillUnmount() {
        this._event.removeAllListeners();
    }
}
