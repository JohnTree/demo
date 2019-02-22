/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-04-07 10:28
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import {Button} from "react-native-elements";
import {
    StyleSheet,
    View,
    Text, TextInput, Image, Alert, NativeModules, TouchableHighlight,TouchableOpacity
} from 'react-native';
import PopupDialog from 'react-native-popup-dialog';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class ForgetPswd extends React.Component {

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
        type: true,
        phone: '',
        code: '',
        sum: 60,
        btnTitle: '获取验证码',
        click: true,
        popText: ""
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

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */
    //判断下一步按钮是否可用
    _isTrue() {
        if (this.state.phone != null && this.state.code != null
            && this.state.phone != '' && this.state.code != '') {
            return false;
        } else {
            return true;

        }
    }

    //下一步点击事件
    handerRegisetClick() {
        DataBus.set("phone", this.state.phone);
        this.validateCode();
    }

    /**
     * @mark 校验验证码
     */
    validateCode() {
        if (this.state.phone != null) {
            Ajax("CmgInfoRemakeController/ckCmgForgetPhone.do", {phoneNo: this.state.phone,type: "2", veryCode: this.state.code}).then(v => {
                if (true === v.success) {
                    DataBus.set("phoneNo", this.state.phone);
                    DataBus.set("veryCode", this.state.code);
                    Actions.setNewPswd();
                } else {
                    Alert.alert(v.message)
                }
            }).catch(e => {
                Alert.alert(e.message)
            });
        } else {

        }
    }

    //获取验证码点击事件
    handerGetCode() {
        if (this.state.phone != null) {
            if (this.state.click) {
                Ajax("veryCodeController/veryCode.do", {phoneNo: this.state.phone, type: "22"}).then(v => {
                    if (true === v.success) {
                        DataBus.set("phoneNo", this.state.phone);
                        this.setState({click: false})
                        this.interval = setInterval(
                            () => {
                                this.setState({
                                    btnTitle: (this.state.sum - 1).toString() + "s后重新发送",
                                    sum: (this.state.sum - 1)
                                }, () => {
                                    if (this.state.sum <= 0) {
                                        clearInterval(this.interval);
                                        this.setState({
                                            btnTitle: "获取验证码",
                                            sum: 60,click: true
                                        });
                                    }
                                })
                            },
                            1000
                        );
                    } else {
                        this.setState({
                            btnTitle: "获取验证码",
                            sum: 60, click: true
                        });
                        this.state.popText = v.message;
                        this.forceUpdate();
                        this.popupDialog.show();
                    }
                }).catch(e => {
                    this.state.popText = e.message;
                    this.forceUpdate();
                    this.popupDialog.show();
                });
            } else {
                this.setState({
                    click: false
                });
                // this.state.popText="1分钟之内不能重复获取验证码";
                // this.forceUpdate();
                // this.popupDialog.show();
            }
        } else {

        }
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <View style={styles.ForgetPswd}>
            <View style={styles.center}>
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitle}>
                        手机号
                    </Text >
                    <TextInput style={styles.textInput} placeholder="请输入有效的手机号"
                               value={this.state.phone}
                               onChangeText={(phoneValue) => {
                                   this.setState({phone: phoneValue});
                               }}/>
                    {this.state.click? <TouchableHighlight underlayColor={Theme.color.vision_main_alt}
                                                           style={{borderRadius: Theme.size.radius, marginRight: Theme.padding.less}}
                                                           onPress={() => {
                                                               this.handerGetCode()
                                                           }}>
                        <Text style={{
                            color: Theme.color.bigBlue,
                            borderWidth: Theme.pixel * 2,
                            borderColor: Theme.color.bigBlue, padding: 5, borderRadius: Theme.size.radius,
                        }}>
                            {this.state.btnTitle}
                        </Text >
                    </TouchableHighlight>:
                        <Text style={{
                            color: Theme.color.font_classify,
                            borderWidth: Theme.pixel * 2,
                            borderColor: Theme.color.font_classify, padding: 5, borderRadius: Theme.size.radius,
                        }}>
                            {this.state.btnTitle}
                        </Text >

                   }


                </View>
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitle}>
                        验证码
                    </Text >
                    <TextInput style={styles.textInput} placeholder="请输入短信验证码"
                               value={this.state.code}
                               onChangeText={(codeValue) => {
                                   this.setState({code: codeValue});
                               }}/>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 20}}>
                </View>
                <Button
                    fontSize={Theme.fontSize.max}
                    buttonStyle={styles.regBtn}
                    onPress={this.handerRegisetClick.bind(this)}
                    disabled={this._isTrue()}
                    title='下一步'
                />
            </View>
            <PopupDialog
                width={Theme.size.width * 0.6}
                height={110}
                ref={(popupDialog) => {
                    this.popupDialog = popupDialog;
                }}>
                <View style={{height: 110, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{
                        height: 80,
                        textAlign: "center",
                        fontSize: Theme.fontSize.max,
                        padding: Theme.padding.less,
                        borderBottomWidth: Theme.pixel,
                        borderColor: Theme.color.line_horizontal,
                        paddingTop: 10,
                        width: Theme.size.width * 0.6,
                    }}>{this.state.popText}</Text>
                    <TouchableOpacity style={{
                        height: 20, alignItems: "center", justifyContent: "center"
                    }} onPress={() => {
                        this.popupDialog.dismiss()
                    } }>
                        <Text style={{
                            textAlign: "center",
                            fontSize: Theme.padding.base,
                            color: "#58BDC5",
                            width: Theme.size.width * 0.6
                        }}>
                            确定
                        </Text>
                    </TouchableOpacity>
                </View>
            </PopupDialog>
        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    ForgetPswd: {
        width: Theme.size.width,
        height: Theme.size.height,
        backgroundColor: Theme.color.background
    },
    center: {
        width: Theme.size.width,
        backgroundColor: Theme.color.clean,
        marginTop: Theme.navigationBar.barHeight + 10,
    },
    itemInput: {
        width: Theme.size.width,
        backgroundColor: "#ffffff",
        marginTop: 1,
        paddingLeft: 10,
        alignItems: "center",
        flexDirection: 'row'
    },
    textInput: {
        width: Theme.size.width - 200,
        height: 50,
        fontSize:Theme.fontSize.larger,
        color:Theme.color.font_content,

    },
    itemTitle: {
        width: 70,
        color:Theme.color.font_content,
        fontSize:Theme.fontSize.larger,

    },
    regBtn: {
        backgroundColor: Theme.color.orange1,
        borderRadius: Theme.size.radius,
        marginLeft: Theme.padding.max,
        marginRight: Theme.padding.max,
        marginTop: 5
    }
});

