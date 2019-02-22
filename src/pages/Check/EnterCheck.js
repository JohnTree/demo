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
export default class EnterCheck extends React.Component {

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
        titleIndex: "00",
        titles: [{
            key: 0,
            titleName: "待审核"
        },
            {
                key: 1,
                titleName: "已通过"
            },
            {
                key: 2,
                titleName: "未通过"
            }],
    }

    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
        this.foraaa = this.foraaa.bind(this)
        this.addClick = this.addClick.bind(this)
        this.addStore=this.addStore.bind(this)
        CountEmitter.on("repleseEnterCheckListView", this.foraaa)
        CountEmitter.on("enterCheckRightBtn", this.addClick)
        CountEmitter.on("addStorepage", this.addStore)

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
        CountEmitter.removeListener("enterCheckRightBtn", this.addClick);
        CountEmitter.removeListener("addStorepage", this.addStore);
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */

    addClick() {
        Actions.storeCertification();
    }

    addStore(){
        this.forceUpdate();
        this.PullListView._onRefresh();
    }

    titleClick(index) {
        if (index == 0) {
            this.state.titleIndex = "00";
        }
        if (index == 1) {
            this.state.titleIndex = "01";
        }
        if (index == 2) {
            this.state.titleIndex = "03";
        }
        this.forceUpdate();
        this.PullListView._onRefresh();
    }


    fetchDatas(page, callback, options) {
        var rows = [];
        console.warn(this.state.titleIndex);
        Ajax("cmgController/queryMctRegisterInfo.do", {
            mctName: this.state.mctName,
            status: this.state.titleIndex,
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
        this.forceUpdate();
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
        return <View style={styles.EnterCheck}>
            <LinearGradient
                start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                locations={[0.1, 0.7]}
                colors={[Theme.color.gradual_blue1,Theme.color.gradual_blue3]}
                style={{
                    marginTop: Theme.navigationBar.barHeight,
                    justifyContent: "center", alignItems: "center"
                }}>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 15,
                    justifyContent: "center", alignItems: "center",
                    marginRight: 15, backgroundColor: Theme.color.vision_main_alt,
                    borderRadius: Theme.size.radius, marginBottom: 10
                }}>
                    <TextInput style={styles.textInput} placeholder="查找商户名称"
                               value={this.state.name}
                               placeholderTextColor={"#dfdfdf"}
                               onChangeText={(mctNameValue) => {
                                   this.setState({mctName: mctNameValue});
                               }}/>
                    <TouchableHighlight underlayColor='transparent' style={{flex: 1, marginLeft: 0}}
                                        onPress={() => {
                                            this.PullListView._onRefresh();
                                        }}>
                        <View>
                            <FontIcon size={20} icon={"sousuo"}
                                      style={{color: "#ffffff", marginLeft: 5}}/>
                        </View>
                    </TouchableHighlight>
                </View>
            </LinearGradient>
            <SelectBar titles={this.state.titles} column={3} color="transparent" onClick={this.titleClick.bind(this)}/>
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
    EnterCheck: {
        width: Theme.size.width,
        height: Theme.size.height,
        backgroundColor: Theme.color.background, flex: 1
    },
    textInput: {
        width: Theme.size.width,
        height: 40,
        flex: 9, backgroundColor:Theme.color.gradual_blue2, marginRight: 5, color: "#ffffff",
        marginLeft: 10
    }
});
