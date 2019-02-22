/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wsy
 *   联系方式：
 *   创建时间：2017-04-07 18:06
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
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

/**
 * @mark 文件内变量
 */
//文件内变量结束

export default class FinancialCell extends React.Component {

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
        var {
            mctId,
            mctName,
            phoneId,
            regAppStatus,
            regAppStatusName,
            photoCdUrl,
            mctDesc,
            address,
            mctLogoUrl,
            levelId,
            sTypeCode
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
            sTypeCode: sTypeCode
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


    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <View style={styles.FinancialCell}>
            <TouchableOpacity onPress={()=> {
                Actions.financialDetails({...this.state});
            }}>
                <View style={styles.container}>
                    <Image source={{uri: FS + this.state.mctLogoUrl}} style={styles.logo}/>
                    <View style={styles.infoContainer}>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>{this.state.mctName}</Text>
                        </View>
                        <Text style={styles.desc} numberOfLines={1}>{this.state.mctDesc}</Text>
                        <View style={styles.otherInfo}>
                            <Text style={styles.type}>
                                {/*{this.state.sTypeCode}*/}
                                221篇文章</Text>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <FontIcon icon="youjiantou" size={10} color="#DDDDDD"/>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    FinancialCell: {},
    container: {
        marginTop: Theme.padding.less,
        backgroundColor: Theme.color.view_Background,
        flexDirection: "row",
        alignItems: "center"
    },
    logo: {
        width: 60,
        height: 60,
        margin: Theme.padding.base,
        borderRadius: 30
    },
    infoContainer: {
        marginTop: Theme.padding.base,
        marginBottom: Theme.padding.base,
        flex: 1
    },
    titleBar: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: Theme.fontSize.max,
        color: Theme.color.font_title
    },
    levelPanel: {
        borderRadius: 3,
        marginLeft: Theme.padding.smaller
    },
    level: {
        margin: 2,
        marginTop: 1,
        marginBottom: 1,
        color: "white",
        fontSize: Theme.fontSize.min
    },
    desc: {
        fontSize: Theme.fontSize.lesser,
        color: Theme.color.font_assist,
        marginTop: Theme.padding.smaller,
        marginBottom: Theme.padding.smaller,
    },
    otherInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    address: {
        fontSize: Theme.fontSize.lesser,
        color: Theme.color.font_classify,
        marginRight: Theme.padding.smaller
    },
    type: {
        fontSize: Theme.fontSize.lesser,
        color: Theme.color.font_classify
    },
    right: {
        margin: Theme.padding.less
    }
});
