/**
 *   创建人：wangshiyang
 *   Copyright 2007-2017 by DHC Software co.
 *   创建时间：2017-03-20 18:34
 *   简介：未通过界面
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    View, ScrollView,
    Text, TextInput, Image, Alert, NativeModules, TouchableHighlight
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class NotPassCheck extends React.Component {

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
        data: {}
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
            console.warn(JSON.stringify(v))
            if (true === v.success) {
                // this.state = v.result
                this.setState({data: v.result});
            } else {
                Alert.alert(v.message)
            }
        }).catch(e => {
            console.warn(e.message)
        });
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */

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
        var area = ""
        area = data.provinceName + data.cityName + data.areaName + data.taName
        return <View style={styles.PassCheck}>
            <ScrollView style={styles.ScrollContentView}>
                <FontIcon size={20} icon={ "weitongguo"}
                          style={[{
                              color: Theme.color.red, marginTop: 2,
                              position: 'absolute', top: 20, right: 20
                          }]}/>
                <Text style={{
                    fontSize: Theme.fontSize.larger,
                    color: Theme.color.vision_main,
                    alignItems: "center",
                    padding: 10,
                    marginBottom: 5, marginTop: 10,
                    backgroundColor: "#ffffff"
                }}>
                    {"驳回原因：" + data.regAppDesc}
                </Text >
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
                <Text style={{
                    marginTop: 30
                }}>
                </Text >
            </ScrollView>
            <FontIcon size={80} icon={ "weitongguo"}
                      style={[{
                          color: Theme.color.red, marginTop: 2,
                          position: 'absolute', top: 20, right: 20,
                          backgroundColor: Theme.color.clean
                      }]}/>
        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    PassCheck: {
        width: Theme.size.width,
        height: Theme.size.height,
        backgroundColor: Theme.color.background,
        marginTop: Theme.navigationBar.barHeight, flex: 1
    },
    ScrollContentView: {
        width: Theme.size.width,
        height: Theme.size.height * 0.8,
    },
    bottomView: {
        height: Theme.size.height * 0.1,
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
