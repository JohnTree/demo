/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   创建时间：2017-03-15 18:24
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import MainKind from "./MainKind"

import {
    StyleSheet,
    View,
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class StypeCodePage extends React.Component {

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
        return <View style={styles.StypeCodePage}>
            {!this.state.hide && <MainKind
                style={{
                    marginTop: Theme.navigationBar.barHeight,
                    flexDirection: "row", width: Theme.size.width,
                    height: Theme.size.height,flex:1
                }}
                width={Theme.size.width}
                onSelectValue={(pCode, pName, mCode, mName) => {
                    console.warn(pCode, pName, mCode, mName)
                    DataBus.set("parentSTypeCode", pCode);
                    DataBus.set("sTypeCode", mCode);
                    DataBus.set("sTypeText", pName + "-" + mName);
                    CountEmitter.emit("stpyeCcodeSelect", "");
                    Actions.pop()
                }}
            />}
        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    StypeCodePage: {
        width: Theme.size.width,
        height: Theme.size.height,
        flex: 1
    }
});
