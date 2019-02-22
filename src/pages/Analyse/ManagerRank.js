/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-17 15:24
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import RankCell from "./Components/RankCell";
import ORankCell from "./Components/ORankCell";
import PullListView from "../../view/component/PullListView";
import {
    StyleSheet,
    View,
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束
    var i=0;
export default class ManagerRank extends React.Component {

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
        this.state={
            rank: "0",
            logoPath:"",
            userName:"",
            bankName:"",
            totalMct:"0"
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
     * @mark 循环数组
     */
    fetchDatas(page, callback, options) {
        var rows = [];
         Ajax("/CmgInfoRemakeController/getCmgOrderByMct.do", {pageNum: page, pageSize: 10,dateSelect:""}).then(v => {
             var rows=[]
         if (v.success) {
             var  my=v.my;
             this.state.rank=my.rank;
             this.state.bankName=my.bankName;
             this.state.logoPath=my.logoPath;
             this.state.totalMct=my.totalMct;
             this.state.userName=my.userName;
             this.forceUpdate();
             rows = v.all;
             if(rows.length < 10){
                 callback(rows, {allLoaded: true});
             } else {
                 callback(rows);
             }
             }
             }).catch(e => {
             // 错误处理
         });
    }

    /**
     * @mark 经理个人信息
     */
    headView(){
        return<View style={{marginBottom:Theme.padding.less}}>
              <ORankCell rank={this.state.rank} logoPath={this.state.logoPath} userName={this.state.userName}
                         bankName={this.state.bankName} totalMct={this.state.totalMct}/>
        </View>
    }

    //@mark 显示的PullList的border
    renderSeparator(){
        return (
            <View key={i++} style={{ backgroundColor:Theme.color.line_horizontal, marginLeft:Theme.padding.base}}></View>
        )
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <PullListView
            style={styles.ManagerRank}
            pageSize={10}
            homePage={1}
            removeClippedSubviews={false}
            renderSeparator={this.renderSeparator}
            fetchDatas={this.fetchDatas.bind(this)}
            renderRow={(rowData) => {
                return (
                    <RankCell key={rowData.orderId} {...rowData}/>
                )
            }}
            renderHeader={this.headView.bind(this)}
        />
    }
}

//@mark style
const styles = StyleSheet.create({
    ManagerRank: {
        backgroundColor: Theme.color.background,
        flex:1,
        marginTop: Theme.navigationBar.barHeight,
    }
});
