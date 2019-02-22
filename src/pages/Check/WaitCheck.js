/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   创建时间：2017-03-17 09:48
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';
import PopupDialog from 'react-native-popup-dialog';
import React, {Component} from 'react';

import {
    StyleSheet,
    View, ScrollView,
    Text, TextInput, Image, Alert, NativeModules, TouchableHighlight, TouchableOpacity
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class WaitCheck extends React.Component {

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
        mctId: DataBus.getAndClear("mctId"),
        data: {},
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
        Ajax("cmgController/queryBackMctInfo.do", {
            mctId: this.state.mctId
        }).then(v => {
            if (true === v.success) {
                // this.state = v.result
                this.setState({data: v.result});
            } else {
                this.state.popText = v.message
                this.forceUpdate();
                this.popupDialog.show();
            }
        }).catch(e => {
            this.state.popText = v.message
            this.forceUpdate();
            this.popupDialog.show();
        });
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */

    passOnClick() {

        console.warn(this.state.mctId + "______")
        Ajax("/ConsRegisterController/auditMctByBranch.do", {
            mctId: this.state.mctId,
            status: '02',
            ps: ""
        }).then(v => {
            console.warn(JSON.stringify(v))
            if (true === v.success) {
                CountEmitter.emit("repleseEnterCheckListView", "");
                this.state.popText = "审批通过";
                this.forceUpdate();
                this.popupDialog.show();
            } else {
                this.state.popText = v.message
                this.forceUpdate();
                this.popupDialog.show();
            }
        }).catch(e => {
            this.state.popText = v.message
            this.forceUpdate();
            this.popupDialog.show();
        });
    }

    bankInfo(certNo, certName, certPhone, subbranch, encryptBankAccount, acctType) {
        this.certNo = certNo
        this.certName = certName
        this.certPhone = certPhone
        this.subbranch = subbranch
        this.encryptBankAccount = encryptBankAccount
        this.acctType = acctType
        if (this.acctType == "0") {
            return (
                <View>
                    <Text style={{
                        fontSize: Theme.fontSize.larger,
                        color: "#999999",
                        marginLeft: 10,
                        marginBottom: 5, marginTop: 5
                    }}>
                        对公账户
                    </Text >
                    {/*<View style={styles.itemInput}>*/}
                    {/*<Text style={styles.itemTitle}>*/}
                    {/*开户行*/}
                    {/*</Text >*/}
                    {/*<Text style={styles.textInput}>*/}
                    {/*{this.subbranch}*/}
                    {/*</Text >*/}
                    {/*</View>*/}
                    <View style={styles.itemInput}>
                        <Text style={styles.itemTitle}>
                            账户号
                        </Text >
                        <Text style={styles.textInput}>
                            {this.encryptBankAccount}
                        </Text >
                    </View>
                    <View style={styles.itemInput}>
                        <Text style={styles.itemTitle}>
                            账户名称
                        </Text >
                        <Text style={styles.textInput}>
                            {this.subbranch}
                        </Text >
                    </View>
                    {/*// <View style={styles.itemInput}>*/}
                    {/*//     <Text style={styles.itemTitle}>*/}
                    {/*//         手机号*/}
                    {/*/!*</Text >*!/*/}
                    {/*/!*<Text style={styles.textInput}>*!/*/}
                    {/*/!*{this.certPhone}*!/*/}
                    {/*/!*</Text >*!/*/}
                    {/*/!*</View>*!/*/}
                </View>
            )
        }
        if (this.acctType == "1") {
            return (
                <View>
                    <Text style={{
                        fontSize: Theme.fontSize.larger,
                        color: "#999999",
                        marginLeft: 10,
                        marginBottom: 5, marginTop: 5
                    }}>
                        个人银行卡
                    </Text >
                    {/*{this.mctSubbranch(this.subbranch)}*/}
                    <View style={styles.itemInput}>
                        <Text style={styles.itemTitle}>
                            账户号
                        </Text >
                        <Text style={styles.textInput}>
                            {this.encryptBankAccount}
                        </Text >
                    </View>
                    <View style={styles.itemInput}>
                        <Text style={styles.itemTitle}>
                            账户名称
                        </Text >
                        <Text style={styles.textInput}>
                            {this.certName}
                        </Text >
                    </View>
                    <View style={styles.itemInput}>
                        <Text style={styles.itemTitle}>
                            身份证号
                        </Text >
                        <Text style={styles.textInput}>
                            {this.certNo}
                        </Text >
                    </View>
                </View>
            )
        }

    }

    refueOnClick() {
        DataBus.set("mctId", this.state.mctId);
        Actions.refuseCause();
    }

    /**
     * @mark 开户行是否显示
     */
    mctSubbranch(subbranch) {
        if (subbranch != null && subbranch != "")
            return <View style={styles.itemInput}>
                <Text style={styles.itemTitle}>
                    开户行
                </Text >
                <Text style={styles.textInput}>
                    {subbranch}
                </Text >
            </View>
    }


    /**
     * @mark 门店电话是否显示
     */
    mctPhone(mctTel) {
        if (mctTel != null && mctTel != "")
            return <View style={styles.itemInput}>
                <Text style={styles.itemTitle}>
                    门店电话
                </Text >
                <Text style={styles.textInput}>
                    {mctTel}
                </Text >
            </View>
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        var {data} = this.state;
        console.warn(JSON.stringify(data))
        var area = ""
        area = data.provinceName + data.cityName + data.areaName + data.taName
        console.warn(area)
        return <View style={styles.WaitCheck}>
            <ScrollView style={styles.ScrollContentView}>
                <Text style={{
                    fontSize: Theme.fontSize.larger,
                    color: "#999999",
                    marginLeft: 10,
                    alignItems: "center",
                    marginBottom: 5, marginTop: 5
                }}>
                    基本信息
                </Text >
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitle}>
                        门店名称
                    </Text >
                    <Text style={styles.textInput}>
                        {data.mctName}
                    </Text >
                </View>
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitle}>
                        手机号
                    </Text >
                    <Text style={styles.textInput}>
                        {data.phoneId}
                    </Text >
                </View>
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitle}>
                        主营品类
                    </Text >
                    <Text style={styles.textInput}>
                        {data.typeName}
                    </Text >
                </View>
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitle}>
                        所在商圈
                    </Text >
                    <Text style={styles.textInput}>
                        {area}
                    </Text >
                </View>
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitle}>
                        详细地址
                    </Text >
                    <Text style={styles.textInput}>
                        {data.address}
                    </Text >
                </View>
                {this.mctPhone(data.mctTel)}
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitle}>
                        推荐人
                    </Text >
                    <Text style={styles.textInput}>
                        {data.cmgName}
                    </Text >
                </View>

                <Text style={{
                    fontSize: Theme.fontSize.larger,
                    color: "#999999",
                    marginLeft: 10,
                    marginBottom: 5, marginTop: 5
                }}>
                    店铺照片
                </Text >
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: (Theme.size.width - 2 * Theme.padding.base) * 9 / 16,
                    backgroundColor: "#ffffff",
                    flexDirection: 'row',
                }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Image
                            style={{
                                width: (Theme.size.width - Theme.padding.base * 2) / 2,
                                height: ((Theme.size.width - 2 * Theme.padding.base) / 2) * 9 / 16,
                                resizeMode: "stretch",
                            }}
                            source={{uri: FS + data.doorPicUrl}}/>
                        <Text style={{fontSize: Theme.fontSize.larger, color: "#666666", marginTop: 5}}>
                            店铺外部照片
                        </Text>
                    </View>

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center", marginLeft: 10
                    }}>
                        <Image
                            style={{
                                width: (Theme.size.width - Theme.padding.base * 2) / 2,
                                height: ((Theme.size.width - 2 * Theme.padding.base) / 2) * 9 / 16,
                                resizeMode: "stretch",
                            }}
                            source={{uri: FS + data.insidePicUurl}}/>
                        <Text style={{fontSize: Theme.fontSize.larger, color: "#666666", marginTop: 5}}>
                            店铺内部照片
                        </Text>
                    </View>
                </View>

                <Text style={{
                    fontSize: Theme.fontSize.larger,
                    color: "#999999",
                    marginLeft: 10,
                    marginBottom: 5, marginTop: 5
                }}>
                    资质信息
                </Text >
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitles}>
                        工商注册名称
                    </Text >
                    <Text style={styles.textInput}>
                        {data.companyName}
                    </Text >
                </View>
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitles}>
                        营业执照编号
                    </Text >
                    <Text style={styles.textInput}>
                        {data.licenseNo}
                    </Text >
                </View>
                {/*<View style={styles.itemInput}>*/}
                    {/*<Text style={styles.itemTitle}>*/}
                        {/*法人姓名*/}
                    {/*</Text >*/}
                    {/*<Text style={styles.textInput}>*/}
                        {/*{data.legalName}*/}
                    {/*</Text >*/}
                {/*</View>*/}
                <Text style={{
                    fontSize: Theme.fontSize.larger,
                    color: "#999999",
                    marginLeft: 10,
                    marginBottom: 5, marginTop: 5
                }}>
                    营业执照
                </Text >
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: (Theme.size.width - 2 * Theme.padding.base) * 9 / 16,
                    backgroundColor: "#ffffff"
                }}>
                    <Image
                        style={{
                            width: Theme.size.width - Theme.padding.base * 2,
                            height: (Theme.size.width - 2 * Theme.padding.base) * 9 / 16,
                            resizeMode: "stretch",
                        }}
                        source={{uri: FS + data.licUrl}}/>
                </View>
                <Text style={{
                    fontSize: Theme.fontSize.larger,
                    color: "#999999",
                    marginLeft: 10,
                    marginBottom: 5, marginTop: 5
                }}>
                    身份证信息
                </Text >
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitle}>
                        法人姓名
                    </Text >
                    <Text style={styles.textInput}>
                        {data.legalName}
                    </Text >
                </View>
                <View style={styles.itemInput}>
                    <Text style={styles.itemTitle}>
                        身份证号
                    </Text >
                    <Text style={styles.textInput}>
                        {data.encryptCertId}
                    </Text >
                </View>
                <Text style={{
                    fontSize: Theme.fontSize.larger,
                    color: "#999999",
                    marginLeft: 10,
                    marginBottom: 5, marginTop: 5
                }}>
                    身份证
                </Text >
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: (Theme.size.width - 2 * Theme.padding.base) * 9 / 16,
                    backgroundColor: "#ffffff",
                    flexDirection: 'row',
                }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Image
                            style={{
                                width: (Theme.size.width - Theme.padding.base * 2) / 2,
                                height: ((Theme.size.width - 2 * Theme.padding.base) / 2) * 9 / 16,
                                resizeMode: "stretch",
                            }}
                            source={{uri: FS + data.certIdFaceUrl}}/>
                        <Text style={{fontSize: Theme.fontSize.larger, color: "#666666", marginTop: 5}}>
                            身份证正面
                        </Text>
                    </View>

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center", marginLeft: 10
                    }}>
                        <Image
                            style={{
                                width: (Theme.size.width - Theme.padding.base * 2) / 2,
                                height: ((Theme.size.width - 2 * Theme.padding.base) / 2) * 9 / 16,
                                resizeMode: "stretch",
                            }}
                            source={{uri: FS + data.certIdBackUrl}}/>
                        <Text style={{fontSize: Theme.fontSize.larger, color: "#666666", marginTop: 5}}>
                            身份证反面
                        </Text>
                    </View>
                </View>
                {this.bankInfo(data.certNo, data.certName, data.certPhone, data.subbranch, data.encryptBankAccount, data.acctType)}
                <Text style={{
                    marginTop: 30
                }}>
                </Text >
            </ScrollView>
            <View style={styles.bottomView}>
                <TouchableHighlight underlayColor={Theme.color.line_horizontal} style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: Theme.size.width / 2,
                    borderColor: Theme.color.line_horizontal,
                    borderRightWidth: Theme.pixel * 2
                }} onPress={() => {
                    this.passOnClick()
                }}>
                    <Text style={{
                        color: "#4CAF50",
                    }}>
                        通过
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={Theme.color.line_horizontal} style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: Theme.size.width / 2,
                }} onPress={() => {
                    this.refueOnClick()
                }}>
                    <Text style={{
                        color: "#D32F2F",
                    }}>
                        驳回
                    </Text>
                </TouchableHighlight>
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
                        width: Theme.size.width * 0.6,
                        borderColor: Theme.color.line_horizontal,
                        paddingTop: 10
                    }}>{this.state.popText}</Text>
                    <TouchableOpacity style={{
                        height: 20, alignItems: "center", justifyContent: "center"
                    }} onPress={() => {
                        this.popupDialog.dismiss()
                        if (this.state.popText == "审批通过") {
                            Actions.pop();
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
    WaitCheck: {
        width: Theme.size.width,
        height: Theme.size.height,
        backgroundColor: Theme.color.background,
        marginTop: Theme.navigationBar.barHeight, flex: 1
    },
    ScrollContentView: {
        width: Theme.size.width,
        height: Theme.size.height * 0.8, flex: 1
    },
    bottomView: {
        height: Theme.size.height * 0.07,
        flexDirection: 'row',
        backgroundColor: "#ffffff",
        borderColor: Theme.color.line_horizontal,
        borderTopWidth: Theme.pixel * 2,
    },
    itemInput: {
        width: Theme.size.width,
        backgroundColor: "#ffffff",
        marginTop: 1,
        paddingLeft: 10,
        alignItems: "center",
        flexDirection: 'row',
        height: 50,
    },
    textInput: {
        width: Theme.size.width - 100,
        color: Theme.color.font_content,
        fontSize: Theme.fontSize.max,
        marginLeft: 5
    },
    itemTitle: {
        width: 70,
        color: Theme.color.font_classify,
        fontSize: Theme.fontSize.max
    },
    itemTitles: {
        width: 110,
        color: Theme.color.font_classify,
        fontSize: Theme.fontSize.max
    }
});
