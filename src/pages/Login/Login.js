/**
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：09:04
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';
import PopupDialog from 'react-native-popup-dialog';
import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    Alert,
    NativeModules,
    TouchableOpacity,
    AsyncStorage
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {Button} from "react-native-elements";
import co from "co";
/**
 * @mark 文件内变量
 */
let STORAGE_NAME_KEY = "StorageUserName";
//文件内变量结束

export default class Login extends React.Component {

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
     * @mark constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            passWord: '',
            popText: "",
        }
    }

    /**
     * @mark 组件声明周期区域
     */

    /**
     * @mark 第一次加载 只运行一次
     */
    componentDidMount() {
        this._switchToken();
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */
    //判断登录按钮是否可用
    _isTrue() {
        if (this.state.userName != null && this.state.passWord != null
            && this.state.userName != '' && this.state.passWord != '') {
            if (this.state.passWord.length > 5) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;

        }
    }

    _ajax(url, param) {
        return new Promise((resole, reject) => {
            CountEmitter.emit("popLoading");
            var aj = NativeModules.Ajax;
            aj.POST(url, param, (error, v) => {
                resole(v);
                CountEmitter.emit("closeLoading");
            }, (error, v) => {
                reject({error: error, message: v});
                CountEmitter.emit("closeLoading");
            });
        })

    }

    _switchToken() {
        var self = this;
        return co(function*() {
            var param = {};
            let devToken = yield HardwareDrivers.deviceToken();
            param.token = devToken;
            console.warn(devToken);
            var signature = yield Serializer.rsaSerializer(param);
            param.signature = signature
            var serverToken = yield  self._ajax("initController/initToken.do", param);
            console.warn(serverToken);
            if (JSON.parse(serverToken).token) {
                LocalPersistence.pushData("token", JSON.parse(serverToken).token);
                var sendV = yield Serializer.getDHPubMap();
                sendV["token"] = JSON.parse(serverToken).token;
                var _secureData = yield   Serializer.rsaEncoding(JSON.stringify(sendV));
                console.warn("____" + _secureData)
                var dh_y = yield self._ajax("/baseController/getDH_Y.do", {"_secureData": _secureData});
                dh_y = JSON.parse(dh_y)["HD_Y"];
                var deskey = yield Serializer.getDHKeyWith(dh_y);
                LocalPersistence.pushData("DESKey", deskey);
                console.warn(deskey);
            } else {
                CountEmitter.emit("30001");
            }
            return;
        });
    }

    /**
     * 登录方法
     */
    handlerLoginClick() {
        var me = this;
        co(function*() {
            yield me._switchToken();
            if (me.state.userName != null && me.state.passWord != null
                && me.state.userName != '' && me.state.passWord != '') {
                DataBus.set("loginPwd", me.state.passWord);
                Ajax("cmgController/cmgLogin.do",
                    {"loginId": me.state.userName, "pwd": me.state.passWord}).then(v => {
                    console.warn(JSON.stringify(v))
                    if (true === v.success) {
                        if (v.result != null) {
                            LocalPersistence.pushData("cmgType",v.result.cmgType);
                            LocalPersistence.pushData("cmgId",v.result.cmgId);
                            // if(v.result.cmgType=="01"){
                            //                 Actions.finalHome();
                            //             }else{
                            //                 Actions.root();
                            //             }
                            switch (v.result.pwdStatus) {
                                case "0":
                                    if(v.result.cmgType=="01"){
                                        Actions.finalHome();
                                    }else{
                                        Actions.root();
                                    }
                                    break;
                                case "1":
                                    Actions.forceULoginPwd();
                                    break;
                                case "2":
                                    Actions.forceULoginPwdT();
                                    break;
                                default:
                            }
                        } else {
                            me.state.popText = "登录名或者密码不正确";
                            me.forceUpdate();
                            me.popupDialog.show();
                        }

                    } else {
                        me.state.popText = v.message;
                        me.forceUpdate();
                        me.popupDialog.show();
                    }
                }).catch(e => {
                    me.state.popText = e.message;
                    me.forceUpdate();
                    me.popupDialog.show();
                });
            } else {
                me.state.popText = "用户名或密码不能为空";
                me.forceUpdate();
                me.popupDialog.show();
            }
            return;
        });
    }

    /**
     * @mark 忘记密码
     */
    handleItemClick() {
        var me = this;
        co(function*() {
            yield me._switchToken();
            Actions.forgetPswd();
        });
    }

    /**
     * 免费注册点击事件
     */
    handerRegisetClick() {
        // Actions.quickRegisterPhone();
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return (
            <LinearGradient
                start={{x: 1.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                locations={[0.0, 0.3]}
                colors={[Theme.color.gradual_blue1, Theme.color.gradual_blue2]}
                style={styles.linearGradient}>
                <View style={styles.top}>
                    {/*<Image style={{width: 39, height: 44, backgroundColor: "#fff"}}/>*/}
                    <FontIcon color={"#FFFFFF"} size={30}
                              icon="nyf"
                              style={[{textAlign: "center", marginBottom: 0}]}/>
                    <Text style={{color: "#fff", fontSize: 24, marginTop: Theme.padding.max}} t>客服版</Text>
                </View>
                <View style={styles.center}>
                    <View style={styles.centerForm}>
                        <TextInput style={{
                            height: 35,
                            width: Theme.size.width - 4 * Theme.padding.max,
                            fontSize: Theme.fontSize.base,
                        }} placeholder="手机号" value={this.state.userName} autoCorrect={false}
                                   onChangeText={(testValue) => {
                                       this.setState({userName: testValue});
                                   }}/>
                        <View style={{
                            width: Theme.size.width - 4 * Theme.padding.max,
                            height: Theme.pixel,
                            backgroundColor: Theme.color.line_horizontal
                        }}/>
                        <TextInput style={{
                            height: 35,
                            width: Theme.size.width - 4 * Theme.padding.max,
                            fontSize: Theme.fontSize.base,
                        }} placeholder="密码" secureTextEntry={true} value={this.state.passWord}
                                   onChangeText={(passValue) => {
                                       if (passValue != '') {
                                           this._isTrue()
                                       }
                                       this.setState({passWord: passValue});

                                   }}
                        />
                    </View>
                    <Button
                        fontSize={Theme.fontSize.max}
                        buttonStyle={styles.loginBtn}
                        onPress={this.handlerLoginClick.bind(this)}
                        title='登录'
                        disabled={this._isTrue()}/>
                    <View style={{
                        height: 40,
                        alignItems: "flex-end",
                        justifyContent: "center",
                        marginRight: Theme.padding.max
                    }}>
                        <Text style={{color: "#fff",}} onPress={this.handleItemClick.bind(this)}>忘记密码 ?</Text>
                    </View>
                </View>

                <View style={styles.bottom}>
                    <Text style={{color: "#fff", height: 40}} onPress={this.handerRegisetClick.bind(this)}>
                        {/*免费注册*/}
                    </Text>
                </View>
                <PopupDialog
                    width={Theme.size.width * 0.6}
                    height={110}
                    ref={(popupDialog) => {
                        this.popupDialog = popupDialog;
                    }}>
                    <View style={{height: 110, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{
                            height: 70,
                            textAlign: "center",
                            fontSize: Theme.fontSize.larger,
                            padding: Theme.padding.less,
                            borderBottomWidth: Theme.pixel,
                            width: Theme.size.width * 0.6,
                            borderColor: Theme.color.line_horizontal,
                            paddingTop: 20
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
            </LinearGradient>
        )
    }
}

//@mark style
const styles = StyleSheet.create({
    linearGradient: {
        width: Theme.size.width,
        height: Theme.size.height,
        borderRadius: 0
    },
    top: {
        flex: 1,
        width: Theme.size.width,
        backgroundColor: Theme.color.clean,
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: Theme.padding.max
    },
    center: {
        // flex: 1,
        width: Theme.size.width,
        backgroundColor: Theme.color.clean,
        // justifyContent: "flex-end"
    },
    centerForm: {
        width: Theme.size.width - 2 * Theme.padding.max,
        backgroundColor: "#fff",
        margin: Theme.padding.max,
        padding: Theme.padding.max,
        borderRadius: Theme.size.radius,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 4},
        shadowRadius: Theme.size.radius,
        shadowOpacity: 0.2,

    }, loginBtn: {
        backgroundColor: Theme.color.orange1,
        borderRadius: Theme.size.radius,
        marginLeft: Theme.padding.max,
        marginRight: Theme.padding.max,
    },
    bottom: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: Theme.color.clean,
        padding: Theme.padding.max,
    },
    point:{
        marginLeft: 30,
        marginRight:30,
        color:"#fff",
        fontSize:Theme.fontSize.min,
        marginBottom:Theme.padding.less
    }
});
