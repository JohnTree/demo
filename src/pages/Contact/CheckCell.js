/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-04-13 08:39
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Button,
    Text,
    TouchableHighlight,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class CheckCell extends React.Component {
    static defaultProps = {
        checked: false,
        title: "",
        value: "",
        iconColor: "#58BDC5",
        onPress: (checked, callback) => {
            callback(Boolean)
        }
    };

    constructor(props) {
        super(props);
        var {title, value, checkedColor, iconColor, icon, photo, name, phoneNum} = this.props;
        this.state = {
            title: title,
            value: value,
            iconColor: iconColor,
            icon: icon,
            checkedColor: checkedColor,
            photo: photo,
            name: name,
            phoneNum: phoneNum
        }
        this.searchName = "";
    }

    refresh(checked) {
        this.setState({checked: checked})
    }

    _onPress() {
        this.props.onPress(this.props.checked);
    }

    makeShowDate() {
        //筛选
        // 设置数据源

    }

    renderDataFunc(item) {
        return (
            <View style={styles.center}>
                <Text style={styles.itemTitleOne}>
                    {/*{item.pinyin}*/}
                </Text >
                <TouchableHighlight onPress={this._onPress.bind(this)} underlayColor="#F0F0F0"
                                    style={{marginBottom: 1}}>
                    <View style={{backgroundColor: Theme.color.view_Background, height: 55}}>
                        <View style={{flexDirection: "row", alignItems: "center", flex: 1}}>
                            <View style={styles.cell}>
                                <View style={styles.content}>
                                    <Image style=
                                               {{
                                                   borderRadius: 14,
                                                   backgroundColor: "transparent",
                                                   width: 28,
                                                   height: 28,
                                                   marginLeft: 16
                                               }}
                                           source={this.state.photo == "" ? require("../../../imgs/pic_my_nophoto@3x.png") : {uri: this.state.photo} || require("../../../imgs/ico_store_news_type_1@3x.png")}/>
                                    <View style={[{marginLeft: Theme.padding.less}]}>
                                        <Text style={styles.left_top}>
                                            {this.state.name}
                                        </Text>
                                        <Text style={styles.left_bottom}>
                                            {this.state.phoneNum}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flex: 1, alignItems: "flex-end", marginRight: Theme.padding.larger}}>
                                <FontIcon color={this.props.checked ? "#58BDC5" : "#BBBBBB"}
                                          size={14}
                                          icon={this.props.checked ? "xuanzhong" : "weixuanzhong"}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    render() {
        return (
            this.renderDataFunc()
        )
    }
}

//@mark style
const styles = StyleSheet.create({
    CheckCell: {
    }  , center: {
        width: Theme.size.width,
        backgroundColor: Theme.color.clean,
    },
    topTitle: {
        paddingTop: Theme.navigationBar.barHeight
    },
    searchBtn: {
        marginBottom: Theme.padding.smaller,
        marginRight: Theme.padding.less,
        marginLeft: Theme.padding.less,
        backgroundColor: "rgba(0, 0, 0,0.2)",
        paddingRight: Theme.padding.smaller,
        paddingLeft: Theme.padding.smaller,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Theme.size.radius,
        height: 40,
        justifyContent: "space-between"
    }
    ,
    itemTitleOne: {
        width: Theme.size.width,
        marginLeft: Theme.padding.bsmaller
    }, content: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cell: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: Theme.padding.less,
        paddingBottom: Theme.padding.less,
        paddingRight: Theme.padding.max,
        marginBottom: Theme.pixel,
        backgroundColor: "#ffffff"
    },
    left_top: {
        color: Theme.color.font_content,
        fontSize: Theme.fontSize.larger
    },
    left_bottom: {
        color: Theme.color.font_classify,
        fontSize: Theme.fontSize.base
    }, dialogContentView: {
        marginTop: Theme.padding.larger,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: Theme.padding.smaller
    },
});
