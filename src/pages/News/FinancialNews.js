/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wsy
 *   联系方式：
 *   创建时间：2017-04-07 09:16
 *   简介：金融资讯页面
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
} from 'react-native';
import PullListView from "../../view/component/PullListView";
import FinancialCell from "./FinancialCell"

/**
 * @mark 文件内变量
 */
var functionMap = {
    select: (ref) => {
    },
}
//文件内变量结束

export default class FinancialNews extends React.Component {

    /***
     * default props value
     * @mark propTypes 默认属性值
     */
    static defaultProps = {

    }

    /***
     * props types for helper text
     * @mark propTypes 属性类型
     */
    static propTypes = {}

    /**
     * @mark state
     */
    state = {
        modalVisible: false,
    }

    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
        this.searchName = "";
        this.sortSelect = "2";
        functionMap.select = (ref) => {
            this.PoPPanel.show(ref)
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

    fetchDatas(page, callback, option) {
        Ajax("cmgController/queryMctRegisterInfo.do", {
            pageNum: page,
            pageSize: 10,
            status: "01",
            mctName: this.searchName,
            dataSelect: this.sortSelect
        }).then(v => {
            if (v.success) {
                var rows = v.result;
                if (rows.length < 10) {
                    callback(rows, {allLoaded: true});
                } else {
                    callback(rows);
                }

            } else {
                alert(v.message)
            }
        }).catch(e => {
            console.warn(e.message)
        })
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return <View style={styles.BusinessManagement}>
            <PullListView
                ref={(o) => {
                    this.PullListView = o
                }}
                style={styles.pullList}
                homePage={1}
                pageSize={10}
                fetchDatas={this.fetchDatas.bind(this)}
                renderRow={(rowData) => <FinancialCell {...rowData} key={rowData.mctId}/>}
            />
        </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    BusinessManagement: {
        marginTop: Theme.navigationBar.barHeight,
        flex: 1
    },
    searchBar: {
        marginTop: Theme.navigationBar.barHeight
    },
    pullList: {
        backgroundColor: Theme.color.background,
        flex: 1
    }
});
