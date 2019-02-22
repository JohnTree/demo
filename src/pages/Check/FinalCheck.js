/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   创建时间：2017-03-17 09:46
 *   简介：入驻审核列表
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import PullListView from "../../view/component/PullListView";
import LinearGradient from "react-native-linear-gradient";
import SelectBar from "../../view/component/SelectBar";
import EnterCheckItem from "./EnterCheckItem";

import {
    StyleSheet,
    View, ScrollView,
    Text, TextInput, Image, Alert, NativeModules, TouchableHighlight
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束
var i = 0;
export default class FinalCheck extends React.Component {

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
        mctName: '',
    }

    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
        this.foraaa = this.foraaa.bind(this)
        CountEmitter.on("repleseEnterCheckListView", this.foraaa)
    }

    /**
     * @mark 组件声明周期区域
     */

    /**
     * @mark 第一次加载 只运行一次
     */
    componentDidMount() {

    }

    componentWillUnmount() {
        CountEmitter.removeListener("repleseEnterCheckListView", this.foraaa);
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */



    fetchDatas(page, callback, options) {
        var rows = [];
        Ajax("cmgController/queryMctRegisterInfo.do", {
            mctName: this.state.mctName,
            status: "02",
            pageNum: page,
            pageSize: 10
        }).then(v => {
            console.warn(JSON.stringify(v))
            if (true == v.success) {
                rows = v.result;
                if (rows.length < 10) {
                    callback(rows, {allLoaded: true});
                } else {
                    callback(rows);
                }

            } else {
                Alert.alert(v.message)
            }
        }).catch(e => {
            console.warn(e.message)
        });
    }

    foraaa() {
        this.PullListView._onRefresh();
    }

    renderSeparator() {
        return (
            <View key={i++} style={{
                height: Theme.pixel,
                backgroundColor: Theme.color.background,
                marginLeft: Theme.padding.base
            }}></View>
        )
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <View style={styles.FinalCheck}>
            <LinearGradient
                start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                locations={[0.1, 0.7]}
                colors={[Theme.color.gradual_blue1,Theme.color.gradual_blue3]}
                style={{
                    marginTop: Theme.navigationBar.barHeight,
                    justifyContent: "center", alignItems: "center"
                }}>
            </LinearGradient>
            <PullListView
                ref={(o) => this.PullListView = o}
                pageSize={10}
                homePage={1}
                removeClippedSubviews={false}
                fetchDatas={this.fetchDatas.bind(this)}
                renderSeparator={this.renderSeparator}
                renderRow={rowData =>
                    <EnterCheckItem key={rowData.mctId} {...rowData}/>
                }
            />
        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    FinalCheck: {
        width: Theme.size.width,
        height: Theme.size.height,
        backgroundColor: Theme.color.background, flex: 1,
    },
    textInput: {
        width: Theme.size.width,
        height: 40,
        flex: 9, backgroundColor:Theme.color.gradual_blue2, marginRight: 5, color: "#ffffff",
        marginLeft: 10
    }
});
