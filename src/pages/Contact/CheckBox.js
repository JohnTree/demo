/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-04-13 08:40
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import CheckCell from "./CheckCell"
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

export default class CheckBox extends React.Component {

    static defaultProps = {
        isMulti: false,
        datas: [],
        // select: 0,
        selects: [0],
        onChange: (index, datas) => {
        }
    };

    constructor(props) {
        super(props);
        var {datas, isMulti, select, selects} = this.props;
        console.warn(datas)
        this.state = {
            datas: datas,
            isMulti: isMulti,
            select: select,
            selects: selects
        }
    }

    render() {
        var components = this.props.datas.map((l, i) => (

            <CheckCell {...l}
                       key={l.phoneNum+i}
                       ref={"cell" + i}
                       checked={this.state.isMulti ? this.state.selects.indexOf(i) != -1 : this.state.select == i}
                       onPress={(checked) => {
                           if (this.state.isMulti) {
                               var arr = this.state.selects;
                               console.warn(checked)
                               if (!checked) {
                                   arr.push(i);
                                   console.warn(arr)
                               } else {
                                   arr.splice(arr.indexOf(i), 1)
                               }
                               this.setState({selects: arr});
                               this.props.onChange(arr, this.state.datas);
                           } else {
                               if (!checked && this.state.select !== i) {
                                   this.setState({select: i});
                                   this.props.onChange(i, this.state.datas);
                               }
                           }
                       }}/>
        ));
        return (
            <View {...this.props}>
                {components}
            </View>
        )
    }
}

//@mark style
const styles = StyleSheet.create({
    CheckBox: {}
});
