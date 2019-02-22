/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   创建时间：2017-03-15 09:32
 *   简介：城市选择
 *   路由：WhScene
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import CitySelecter from "../../view/component/CitySelecter/CitySelecter";

import {
    StyleSheet,
    View,
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class CitySelectPage extends React.Component {

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
        update: DataBus.getAndClear("update"),
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
    render() {
        return <View style={styles.CitySelectPage}>
            <CitySelecter style={{
                marginTop: Theme.navigationBar.barHeight,
            }}
                          lettersStyle={{
                              flex: 1,
                              top: Theme.padding.less
                          }}
                          changeCity={(data) => {
                              DataBus.set("cityCode", data.code);
                              DataBus.set("cityName", data.name);
                              DataBus.set("update", this.state.update);
                              Actions.areaSelect();
                          }}/>
        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    CitySelectPage: {
        width: Theme.size.width,
        height: Theme.size.height,
        backgroundColor: Theme.color.background
    }
});
