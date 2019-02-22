/**
 *   创建人：wangshiyang
 *   Copyright 2007-2017 by DHC Software co.
 *   创建时间：2017-03-20 17:39
 *   简介：驳回原因
 *   路由：WhScene
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import {Button} from "react-native-elements";

import {
    StyleSheet,
    View, ScrollView,
    Text, TextInput, Image, Alert, NativeModules
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class RefuseCause extends React.Component {

    /***
     * default props value
     * @mark propTypes 默认属性值0
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
        cause: '',
        mctId: DataBus.getAndClear("mctId"),
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



    cimmitClick() {
        var popText=""
        LocalPersistence.getData("cmgType").then(type => {
            if(type=="01"){
                popText="finalCheck";
                this.forceUpdate();
            }else{
                popText="enterCheck";
            }
            if (this.state.cause == '') {
                Alert.alert("请输入驳回原因再提交");
            } else {
                Ajax("cmgController/cmgAuditMctInfo.do", {
                    mctId: this.state.mctId,
                    status: '03',
                    ps: this.state.cause
                }).then(v => {
                    console.warn(JSON.stringify(v))
                    if (true === v.success) {
                        CountEmitter.emit("repleseEnterCheckListView", "");
                        Actions.popTo(popText)
                    } else {
                        Alert.alert(v.message)
                    }
                }).catch(e => {
                    console.warn(e.message)
                });
            }
        });

    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <ScrollView style={styles.RefuseCause} keyboardDismissMode="on-drag">
            <View style={{width: Theme.size.width, height: Theme.size.height * 0.8, flex: 1}}>
                <TextInput style={{
                    width: Theme.size.width, height: 80,
                    backgroundColor: "#ffffff",
                    marginTop: 10,textAlign:'justify',paddingLeft:10,paddingRight:10,
                    textAlignVertical:'top'
                }}
                           placeholder="请输入驳回原因，50字以内"
                           value={this.state.cause}
                           placeholderTextColor={"#9b9b9b"}
                           maxLength={50}
                           multiline={true}
                           onChangeText={(causeValue) => {
                               this.setState({cause: causeValue});
                           }}/>
            </View>
            <Button
                fontSize={Theme.fontSize.max}
                buttonStyle={styles.regBtn}
                title='确认提交'
                color={Theme.color.vision_main}
                onPress={this.cimmitClick.bind(this)}
            />
        </ScrollView>
    }
}

//@mark style
const styles = StyleSheet.create({
    RefuseCause: {
        width: Theme.size.width,
        height: Theme.size.height,
        backgroundColor: Theme.color.background,
        marginTop: Theme.navigationBar.barHeight, flex: 1
    },
    regBtn: {
        backgroundColor: "#ffffff",
        borderRadius: Theme.size.radius,
        height: Theme.size.height * 0.07, marginBottom: 20,
    }
});
