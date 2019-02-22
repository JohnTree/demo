/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-04-14 14:08
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
    Picker,
    Modal,
    TouchableOpacity,
    Text
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class ModalPicker extends React.Component {

    /***
     * default props value
     * @mark propTypes 默认属性值
     */
    static defaultProps = {
        datas: [],
        selectedValue: "",
        onValueChange: (itemValue, item, itemPosition) => {
        }
    }

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
        let {selectedValue, datas, onValueChange} = this.props;
        this.state = {
            modalVisible: false,
            selectedValue: selectedValue,
            datas: datas,
            onValueChange: onValueChange,
            position: 0
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
    show(datas, onValueChange, selectedValue) {
        this.setState({
            modalVisible: true,
            datas: datas ? datas : this.props.datas,
            selectedValue: selectedValue ? selectedValue : this.props.selectedValue,
            onValueChange: onValueChange ? onValueChange : this.props.onValueChange,
            position:0
        })
    }

    hidden() {
        this.setState({
            modalVisible: false
        })
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        let strLength = 15;
        return <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            style={styles.ModalPicker}
            onRequestClose={() => {
                this.setState({modalVisible: false})
            }}
        >
            <View style={{backgroundColor: "rgba(0,0,0,0.3)", flex: 1}}>
                <View style={{flex: 1}}/>
                <View>
                    <View style={{
                        backgroundColor: "#F3F3F3",
                        flexDirection: "row",
                        alignItems: "center",
                        height: 40
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.hidden();
                        }}>
                            <Text style={{
                                fontSize: Theme.fontSize.max,
                                margin: Theme.padding.base,
                                color: Theme.color.font_classify
                            }}>取消</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1}}/>
                        <TouchableOpacity onPress={() => {
                            this.hidden();
                            this.state.onValueChange(this.state.selectedValue, this.state.datas[this.state.position], this.state.position);
                        }}>
                            <Text style={{
                                fontSize: Theme.fontSize.max,
                                margin: Theme.padding.base,
                                color: Theme.color.font_content
                            }}>确定</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Picker selectedValue={this.state.selectedValue}
                                style={{backgroundColor: Theme.color.view_Background}}
                                onValueChange={(value, itemPosition) => {
                                    this.setState({selectedValue: value, position: itemPosition})
                                }}
                        >
                            {this.state.datas.map((item, i) => <Picker.Item key={i}
                                                                            label={item.label.length >= strLength ? "..." + item.label.substr(item.label.length - strLength,strLength) : item.label}
                                                                            value={item.value}/>)}
                        </Picker>
                    </View>
                </View>
            </View>
        </Modal>
    }
}

//@mark style
const styles = StyleSheet.create({
    ModalPicker: {}
});
