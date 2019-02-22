/**
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-03 13:37
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
    TouchableHighlight,
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class SelectBar extends React.Component {

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
        titles:this.props.titles,
        column:this.props.column,
        width:Theme.size.width/this.props.column,
        selectIndex:0
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

    }


    //声明周期代码结束

    /**
     * @mark 回调事件
     */
    titleClick( index) {
        callAsFunc(this.props.onClick, [index])
    };
    /**
     * @mark 对每个的题头进行定义
     */

    renderCells(){
        return this.state.titles.map(function (v,index) {
            return <View key={index} style={[styles.cellView,{width:this.state.width}]}>
                <TouchableHighlight underlayColor={'transparent'}
                                    style={styles.dateBtn}
                                    onPress={() => {
                                        this.setState({selectIndex:index});
                                        this.titleClick(index)
                                    }}>
                    <View style={index==this.state.selectIndex?[styles.showNLine,{ borderBottomWidth:9/this.state.column,}]:styles.showLine}>
                        <Text style={index==this.state.selectIndex?styles.titleNText:styles.titleText}>{v.titleName}</Text>

                    </View>
                </TouchableHighlight>
            </View>
        },this)

    }

    //自定义代码区结束
    /**
     * @mark render
     */



    /**
     * @mark render
     */
    render() {
        return <View style={styles.SelectBar} >
            {this.renderCells()}
        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    SelectBar: {
        flexDirection:'row',
        width:Theme.size.width,
    },
    cellView:{
        paddingLeft:Theme.padding.less,
        paddingRight:Theme.padding.less,
        backgroundColor:"#ffffff"
    },
    showNLine:{
        borderBottomColor:Theme.color.vision_main,
        paddingRight:Theme.padding.base,
        paddingLeft:Theme.padding.base,
        paddingTop:Theme.padding.smaller,
        paddingBottom:Theme.padding.smaller,
        justifyContent:'center',
        alignItems:'center'
    },
    showLine:{
        paddingRight:Theme.padding.base,
        paddingLeft:Theme.padding.base,
        paddingTop:Theme.padding.smaller,
        paddingBottom:Theme.padding.smaller,
        justifyContent:'center',
        alignItems:'center'
    },
    titleText:{
        fontSize:Theme.fontSize.larger,
        color:Theme.color.font_content,
        textAlign:'center'
    },
    titleNText:{
        fontSize:Theme.fontSize.max,
        color:Theme.color.vision_main,
        textAlign:'center'
    }
});
