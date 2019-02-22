/**
 *   Copyright 2007-2017 by DHC Software co.
 *   联系方式：
 *   创建时间：2017-03-17 10:15
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import LinearGradient from "react-native-linear-gradient";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class AlyTopView extends React.Component {

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
        boxWidth:(Theme.size.width - Theme.pixel) / 2,
        middleCell:[{
            key: 0,
            top: "今天新增用户",
            bottom:"0",
        },{
            key: 1,
            top: "总排名",
            bottom:"0",
            icon:"youjiantou"
        },],
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
          this.showTopView()
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */
    /**
     * @mark 数据刷新
     */
    showTopView() {
        console.warn("6666666666666666666")
        Ajax("/CmgInfoRemakeController/getCmgOrderByDWM.do", {dateSelect:""}).then(v => {
            if (v.success) {
                this.state.middleCell[0].bottom=v.num;
                this.state.middleCell[1].bottom=v.rank;
                this.forceUpdate();
            }
        }).catch(e => {
            // 错误处理
        });

    }
    managerRank(){
        Actions.managerRank();
    }
    /**
     * @mark 信息详细
     */
    middleMessage(){
        var boxWidth=this.state.boxWidth;
        return this.state.middleCell.map(function (v,index) {
            if(index==0){
                return<View key={index} style={[{width:boxWidth},styles.middleCell]}>
                    <View style={styles.titleView}>
                        <View style={[{ alignItems: "center", justifyContent: "center",}]}>
                            <Text style={[{color: "white",fontSize:17,textAlign:'center'}]}>
                                {v.top}
                            </Text>
                            <Text style={[{color: "white",fontSize:17,textAlign:'center',marginTop:Theme.padding.smaller}]}>
                                {v.bottom}
                            </Text>
                        </View>
                    </View>
                </View>
            }else{
                return<TouchableOpacity key={index} style={[{width:boxWidth}]}
                                          onPress={() => {
                                            this.managerRank();
                                          }}>
                    <View style={styles.titleView}>
                        <View style={[{ alignItems: "center", justifyContent: "center",}]}>
                            <Text style={[{color: "white",fontSize:17,textAlign:'center'}]}>
                                {v.top}
                            </Text>
                            <Text style={[{color: "white",fontSize:17,textAlign:'center',marginTop:Theme.padding.smaller}]}>
                                {v.bottom}
                            </Text>
                        </View>
                        <FontIcon size={Theme.fontSize.base} icon={"youjiantou"}
                                  style={[{color:'white',marginLeft:10,position:'absolute',right:Theme.padding.less,top:Theme.padding.base}]}/>
                    </View>
                </TouchableOpacity>
            }
        },this)
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <LinearGradient
            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
            locations={[0.0, 0.8]}
            colors={[Theme.color.gradual_blue1, Theme.color.gradual_blue3]}
            style={styles.AlyTopView}>
            <View style={styles.middleMessage}>
                {this.middleMessage()}
            </View>
        </LinearGradient>
    }
}

//@mark style
const styles = StyleSheet.create({
    AlyTopView: {
        backgroundColor:Theme.color.gradual_blue2,
        marginBottom:Theme.padding.less,
        borderColor:'white',
        borderTopWidth:Theme.pixel,
        paddingTop:Theme.padding.smaller
    },
    titleView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    middleMessage:{
        flexDirection: "row",
        marginTop:Theme.padding.larger,
        paddingBottom:Theme.padding.larger,
        borderBottomWidth:Theme.pixel,
        borderColor:Theme.color.line_horizontal,
    },
    middleCell:{
        borderRightWidth:Theme.pixel,
        borderColor:'white'
    },
});
