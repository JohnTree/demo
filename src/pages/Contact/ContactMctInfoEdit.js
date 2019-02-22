/**
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-21 13:51
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from "react";
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class ContactMctInfoEdit extends React.Component {

    /***
     * default props value
     * @mark propTypes 默认属性值
     */
    static defaultProps = {
        name: "",
        keyValue: ""
    }

    /***
     * props types for helper text
     * @mark propTypes 属性类型
     */
    static propTypes = {
        name: React.PropTypes.string,
        keyValue: React.PropTypes.string

    }

    /**
     * @mark state
     */
    state = {
        isTure: false,
        textValue: "",
        textHeight: 40,
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
    /**
     * @mark 提交
     */
    submits() {
        var varr = DataBus.getAndClear("storeInfo");
        if (this.props.keyValue == "mctName") {
            Ajax("MctTradeRemarkController/updMctInfo.do",
                {"mctName": this.state.textValue}).then(v => {
                if (true === v.success) {
                    varr.emit("mctName", this.state.textValue);
                    Actions.pop();
                    CountEmitter.emit("updateUserInfo");
                } else {
                    console.warn(v.message)
                }
            }).catch(e => {
                console.error(e)
            });
        } else if (this.props.keyValue == "mctDesc") {
            Ajax("MctTradeRemarkController/updMctInfo.do",
                {"mctDesc": this.state.textValue}).then(v => {
                if (true === v.success) {
                    varr.emit("mctDesc", this.state.textValue);
                    Actions.pop();
                    CountEmitter.emit("updateUserInfo");
                } else {
                    console.warn(v.message)
                }
            }).catch(e => {
                console.error(e)
            });
        } else if (this.props.keyValue == "mctLinkPhone") {
            Ajax("MctTradeRemarkController/updMctInfo.do",
                {"mctLinkPhone": this.state.textValue}).then(v => {
                if (true === v.success) {
                    varr.emit("mctLinkPhone", this.state.textValue);
                    Actions.pop();
                    CountEmitter.emit("updateUserInfo");
                } else {
                    console.warn(v.message)
                }
            }).catch(e => {
                console.error(e)
            });
        }
    }

    /**
     * @mark 自定义代码区
     */
    /**
     * @mark 判断按钮是否可以点击
     */
    _isTrue() {
        if (this.state.textValue != null && this.state.textValue != '') {
            return false;

        } else {
            return true;

        }
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <TouchableOpacity onPress={() => {
            this.refs["textInput"].blur();
        }} activeOpacity={1} style={styles.StoreInfoEdit}>
            <View style={styles.storeText}>
                <TextInput style={{
                    height: this.state.textHeight,
                    color: Theme.color.font_content,
                    fontSize: Theme.fontSize.larger,
                    padding: Theme.padding.less,
                    backgroundColor: "#FFF"
                }}
                           ref="textInput"
                           onContentSizeChange={({nativeEvent}) => {
                               let {width, height}=nativeEvent.contentSize;
                               this.setState({textHeight: height});
                           }}
                           multiline={this.props.keyValue == "mctDesc" ? true : false}
                           clearButtonMode="while-editing"
                           enablesReturnKeyAutomatically={false}
                           underlineColorAndroid='white'
                           defaultValue={this.props.name}
                           onChangeText={(textValue) => {
                               textValue = textValue.replace(/ /g, '');
                               if (textValue != '') {
                                   this._isTrue()
                               }
                               this.setState({textValue});

                           }}
                />
            </View>
            <Button
                onPress={this.submits.bind(this)}
                secondary
                fontSize={Theme.fontSize.H2}
                buttonStyle={styles.storeBtn}
                textStyle={{color: Theme.color.orange1}}
                disabled={this._isTrue()}
                title='提交'/>
        </TouchableOpacity>
    }
}

//@mark style
const styles = StyleSheet.create({
    StoreInfoEdit: {
        flex: 1,
        marginTop: Theme.navigationBar.barHeight,
        backgroundColor: Theme.color.background,
        height: Theme.size.height - Theme.navigationBar.barHeight,
        flexDirection: 'column',
    },
    storeText: {
        marginTop: Theme.padding.base,
        backgroundColor: Theme.color.background,
        flex: 1
    },
    storeBtn: {
        backgroundColor: 'white',
        borderTopWidth: Theme.pixel,
        borderTopColor: Theme.color.line_horizontal,
        width: Theme.size.width - Theme.padding.less * 2,
        margin: Theme.padding.less,
        borderRadius: Theme.size.radius
    }

});
