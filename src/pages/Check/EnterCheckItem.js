/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   创建时间：2017-03-18 09:48
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    View, Text, TouchableHighlight, Image
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class EnterCheckItem extends React.Component {

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
    state = {}

    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
        var {
            mctId, mctName, phoneId, regAppStatus, regAppStatusName,
            photoCdUrl, mctDesc, address, mctLogoUrl, levelId, sTypeCode, updTime
        } = this.props;
        this.state = {
            mctId: mctId,
            mctName: mctName,
            phoneId: phoneId,
            regAppStatus: regAppStatus,
            regAppStatusName: regAppStatusName,
            photoCdUrl: photoCdUrl,
            mctDesc: mctDesc,
            address: address,
            mctLogoUrl: mctLogoUrl,
            levelId: levelId,
            sTypeCode: sTypeCode,
            updTime: updTime
        }
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
    handerItemClick() {
        DataBus.set("mctId", this.state.mctId);
        if (this.state.regAppStatus == "00") {
            Actions.waitCheck();
        } else if (this.state.regAppStatus == "01") {
            Actions.passCheck();
        } else if (this.state.regAppStatus == "02") {
            Actions.waitFinalCheck();
        }else if (this.state.regAppStatus == "03") {
            Actions.notPassCheck();
        }
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <TouchableHighlight underlayColor='transparent'
                                  >
            <View style={styles.content}>
                <Text style={styles.left_top}>
                    dddd
                </Text>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Text style={styles.left_b}>
                        {this.leaveOffice(item.status)}
                    </Text>
                </View>

                <TouchableOpacity style={{
                    flexDirection: "row",
                }} onPress={() => {
                    {/*Phone.makingCalls(item.mctUserId)*/}
                } }>
                    <FontIcon
                        icon="bodadianhua"
                        style={{
                            color: "#58BDC5",
                            fontSize: Theme.fontSize.min * 2,
                            marginRight: Theme.padding.less / 2,
                            marginLeft: Theme.padding.less / 2
                        }}/>
                </TouchableOpacity>
            </View>
            <View style={styles.EnterCheckItem}>
                <Image style=
                           {{
                               borderRadius: 25,
                               backgroundColor: "transparent",
                               width: 50,
                               height: 50,
                               marginLeft: 16
                           }}
                       source={{uri: FS + this.state.mctLogoUrl} || require("../../../imgs/ico_store_news_type_1@3x.png")}/>
                <View style={{flex: 7, marginLeft: 10}}>
                    <Text style={{
                        fontSize: 16, color: Theme.color.font_title,
                    }}>
                        {this.state.mctName}
                    </Text>
                    <Text style={{
                        fontSize: 12, color: Theme.color.font_assist, marginTop: 5
                    }}>
                        {"联系方式：" + this.state.phoneId}
                    </Text>
                    <Text style={{
                        fontSize: 12, color: Theme.color.font_classify, marginTop: 5
                    }}>
                        {this.state.updTime}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    }
}

//@mark style
const styles = StyleSheet.create({
    EnterCheckItem: {
        width: Theme.size.width, flexDirection: 'row',
        height: 80,
        backgroundColor: "#ffffff",
        alignItems: "center",
        marginTop: 10,
    }
});
