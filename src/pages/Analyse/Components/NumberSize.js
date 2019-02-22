/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-17 16:34
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
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class NumberSize extends React.Component {

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
        var {num}=this.props;
        this.state={
            num:num,
            indexFont: [
                {key: 0,icon:"paihang1",},
                {key: 1,icon:"paihang2"},
                {key: 2,icon:"paihang3"},
                {key: 3,icon:"paihang5"},
                {key: 4,icon:"paihang"},
                {key: 5,icon:"paihang4"},
                {key: 6,icon:"paihang6"},
                {key: 7,icon:"paihang8"},
                {key: 8,icon:"paihang7"},
                {key: 9,icon:"paihang9"},
            ]
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
    componentWillReceiveProps(nextProps){
        var {num} = nextProps;
        this.setState({
            num: num,
        });
    }

    //声明周期代码结束
    renderNum(num){
        var num=num.split("");
        var indexFont=this.state.indexFont;
        return num.map(function (v,index) {
            var dex=parseInt(v);
            var icon=indexFont[dex];
            return<FontIcon key={index} style={[{color:Theme.color.font_content,width:13}]} size={20} icon={icon.icon}></FontIcon>
        },this)

    }
    /**
     * @mark 自定义代码区
     */


    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <View style={styles.NumberSize}>
            {this.renderNum(this.state.num)}
        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    NumberSize: {
        flexDirection:'row',
        width:29
    }
});
