/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：John
 *   联系方式：
 *   创建时间：2017-04-06 14:36
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

export default class FinancialDetails extends React.Component {

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
        for (var i in this.props) {
            this.state[i] = this.props[i];
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
        return <View style={styles.FinancialDetails}>
            <View style={styles.container}>
                <Image source={{uri: FS + this.state.mctLogoUrl}} style={styles.logo}/>
                <View style={styles.infoContainer}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.state.mctName}</Text>
                    </View>
                    <Text style={styles.desc} numberOfLines={1}>
                        {/*{this.state.mctDesc}*/}
                        微信号：wallstreetch
                        </Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.type}>
                        {/*{this.state.sTypeCode}*/}
                        221篇文章</Text>
                </View>
            </View>
            <View style={styles.containerMiddle}>
                    <View style={styles.titleBarMiddle}>
                        <Text style={styles.titleMiddle}>功能介绍</Text>
                        <Text style={styles.titleMiddles}>
                            {/*{this.state.mctName}*/}
                            理财第一的交流和学习平台
                            </Text>
                    </View>
                <View style={styles.titleBarMiddle}>
                    <Text style={styles.titleMiddle}>认证信息</Text>
                    <Text style={styles.titleMiddles}>
                        {/*{this.state.mctName}*/}
                        上海阿牛信息科技有限公司
                        </Text>
                </View>
            </View>
                <View style={styles.container}>
                    <View style={styles.titleBarMiddle}>
                        <Text style={styles.titleMiddle}>最新文章</Text>
                        <Text style={styles.titleMiddles}>
                            {/*{this.state.mctName}*/}
                        </Text>
                    </View>
                </View>
            <View style={styles.containersss}>
                <View style={styles.titleBarMiddle}>
                    <Text style={{ fontSize: Theme.fontSize.larger,
                        color: Theme.color.font_assist, marginLeft:Theme.padding.base,}}>2017-04-05 星期三</Text>
                    <Text style={styles.titleMiddles}>
                        {/*{this.state.mctName}*/}
                    </Text>
                </View>
            </View>
            <View style={styles.containersss}>
                <View style={styles.infoContainersss}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>
                            {/*{this.state.mctName}*/}
                            硅谷创业教父Steve Hoffman做客同济大学EMBA畅谈企业创新
                            </Text>
                    </View>
                    <Text style={styles.desc} numberOfLines={1}>
                        {/*{this.state.mctDesc}*/}
                        阅读：245
                    </Text>
                </View>
                <Image source={{uri: FS + this.state.mctLogoUrl}} style={styles.logo}/>
            </View>
            <View style={styles.containersss}>
                <View style={styles.infoContainersss}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>
                            {/*{this.state.mctName}*/}
                           全球瞩目的这件事公布了！
                        </Text>
                    </View>
                    <Text style={styles.desc} numberOfLines={1}>
                        {/*{this.state.mctDesc}*/}
                        阅读：245
                    </Text>
                </View>
                <Image source={{uri: FS + this.state.mctLogoUrl}} style={styles.logo}/>
            </View>

        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    FinancialDetails: {
        marginTop: Theme.navigationBar.barHeight,
        backgroundColor: Theme.color.background,
        flex: 1
    }, container:{
        marginTop: Theme.padding.less,
        backgroundColor: Theme.color.view_Background,
        flexDirection: "row",
        alignItems: "center"
    },
    containersss:{
        backgroundColor: Theme.color.view_Background,
        flexDirection: "row",
        alignItems: "center"
    },
    containerMiddle:{
        backgroundColor: Theme.color.view_Background,
        flexDirection: "column",
        alignItems: "center",
        borderTopWidth:Theme.pixel,
        borderTopColor:Theme.color.line_vertical
    },
    infoContainer: {
        marginTop: Theme.padding.base,
        marginBottom: Theme.padding.base,
        flex: 1
    },infoContainersss:{
        flex: 1,
        marginLeft:Theme.padding.larger,
    } ,
    titleBar: {
        flexDirection: "row",
        alignItems: "center",
    },
    titleBarMiddle:{
        padding:5,
        flexDirection: "row",
        alignItems: "center",
},
    title: {
        fontSize: Theme.fontSize.max,
        color: Theme.color.font_title
    }, titleMiddle:{
        marginLeft:Theme.padding.base,
        fontSize: Theme.fontSize.max,
        color: Theme.color.font_title
    },
     titleMiddles:{
            marginLeft:Theme.padding.max,
        flex:1,
        fontSize: Theme.fontSize.max,
        color: Theme.color.font_title
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
    }, type: {
        fontSize: Theme.fontSize.lesser,
        color: Theme.color.vision_main
    },
    right: {
        margin: Theme.padding.less
    },
    logo: {
        width: 60,
        height: 60,
        margin: Theme.padding.base,
        borderRadius: 30
    },
});
