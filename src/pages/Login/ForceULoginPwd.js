/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-10-07 10:05
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';
import PopupDialog from 'react-native-popup-dialog';
import React, {Component} from 'react';
import {Button} from "react-native-elements";
import {
    StyleSheet,
    View,
    Text, TextInput, Image, Alert, NativeModules, TouchableHighlight,TouchableOpacity
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class ForceULoginPwd extends React.Component {

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
        newpwd: '',
        cnewpwd:'',
        oldPwd:"",
        popText:"",
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
    checkNumber(theObj) {
        let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/;
        return  reg.test(theObj) || theObj === "";
    }
    /**
     * @mark 第一次加载 只运行一次
     */
    componentDidMount() {

    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */
    //判断下一步按钮是否可用
    _isTrue() {
        if (this.state.newpwd != null && this.state.oldPwd!=null && this.state.oldPwd!=""
            && this.state.cnewpwd!=null&& this.state.newpwd != ''&&this.state.cnewpwd != ''&&this.state.oldPwd.length>5&&this.state.newpwd.length>5&&this.state.cnewpwd.length>5) {
            return false;
        } else {
            return true;
        }
    }
    //下一步点击事件
    handerRegisetClick() {
        if(this.state.newpwd!=this.state.cnewpwd){
            this.state.popText="新密码和确认密码不同";
            this.forceUpdate();
            this.popupDialog.show();
        }else if(!this.checkNumber(this.state.newpwd)){
            this.state.popText = "密码中必须是数字和字母";
            this.forceUpdate();
            this.popupDialog.show();
        }else{
            if (this.state.newpwd != null&&this.state.cnewpwd != null) {
                Ajax("/CmgInfoRemakeController/updCmgLoginPwd.do", {oldPwd: this.state.oldPwd,newPwd: this.state.newpwd,surePwd:this.state.cnewpwd}).then(v => {
                    if (true === v.success) {
                        DataBus.set("loginPwd",this.state.newpwd);
                        this.state.popText="修改成功";
                        this.forceUpdate();
                        this.popupDialog.show();
                        // Actions.root();
                    } else {
                        this.state.popText=v.message;
                        this.forceUpdate();
                        this.popupDialog.show();
                    }
                }).catch(e => {
                    this.state.popText=e.message;
                    this.forceUpdate();
                    this.popupDialog.show();
                });
            }else {

            }
        }
    }
    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <View style={styles.ForceULoginPwd}>
            <View style={styles.center}>
                <Text style={{marginLeft:Theme.padding.less,marginBottom:Theme.padding.less}}>
                    请输入6到15位字母或者数字
                </Text>
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitle}>
                        原密码
                    </Text>
                    <TextInput style={styles.textInput} placeholder="请输入原密码"
                               value={this.state.oldPwd}
                               secureTextEntry={true}
                               maxLength={15}
                               onChangeText={(codeValue) => {
                                   this.setState({oldPwd: codeValue});
                               }}/>
                </View>

                <View style={styles.itemInput}>
                    <Text style={styles.itemTitle}>
                        新密码
                    </Text>
                    <TextInput style={styles.textInput} placeholder="请输入新密码"
                               value={this.state.newpwd}
                               secureTextEntry={true}
                               maxLength={15}
                               onChangeText={(codeValue) => {
                                   this.setState({newpwd: codeValue});
                               }}/>
                </View>
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitle}>
                        确认密码
                    </Text >
                    <TextInput style={styles.textInput} placeholder="请再次输入新密码"
                               value={this.state.cnewpwd}
                               secureTextEntry={true}
                               maxLength={15}
                               onChangeText={(codesValue) => {
                                   this.setState({cnewpwd: codesValue});
                               }}/>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 20}}>
                </View>
                <View>
                    <Text style={styles.point}>注意：您当前登录密码为系统初始化密码，请修改登录密码后才能进行其他操作。</Text>
                    <Text style={styles.point}>原密码输错超过五次，账户将被锁定，10分钟后自动解锁</Text>
                </View>
                <Button
                    fontSize={Theme.fontSize.max}
                    buttonStyle={styles.regBtn}
                    onPress={this.handerRegisetClick.bind(this)}
                    disabled={this._isTrue()}
                    title='确认修改'
                />
            </View>
            <PopupDialog
                width={Theme.size.width * 0.6}
                height={100}
                ref={(popupDialog) => {
                    this.popupDialog = popupDialog;
                }}>
                <View style={{height: 100, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{
                        height: 60,
                        textAlign: "center",
                        fontSize: Theme.fontSize.max,
                        padding: Theme.padding.less,
                        borderBottomWidth: Theme.pixel,
                        borderColor: Theme.color.line_horizontal,
                        paddingTop: 10,
                        width: Theme.size.width * 0.6
                    }}>{this.state.popText}</Text>
                    <TouchableOpacity style={{
                        height: 20, alignItems: "center", justifyContent: "center"
                    }} onPress={() => {
                        if(this.state.popText=="修改成功"){
                            this.popupDialog.dismiss();
                            LocalPersistence.getData("cmgType").then((type) => {
                                if(type=="01"){
                                    Actions.finalHome();
                                }else{
                                    Actions.root();
                                }
                            });
                        }else{
                            this.popupDialog.dismiss();
                        }
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
    ForceULoginPwd: {
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
        color:Theme.color.font_content,
        fontSize:Theme.fontSize.larger,
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
    },
    point:{
        marginLeft: Theme.padding.base,
        marginRight:Theme.padding.base,
        color:"#000000",
        fontSize:Theme.fontSize.min,
        marginBottom:Theme.padding.less
    }
});
