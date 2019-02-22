/**
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-01 14:43
 *   简介：菜单list
 *   路由：
 *   更改历史：
 *   更改人 wangshiyang
 *   更改时间 2017/03/07 9:47
 *   更改内容 将ListItem的render合并到renderListItemByType 可以通过数据统一控制ListItem样式
 *   |代码位置编号|
 */
'use strict';

import React, {Component} from "react";
import {StyleSheet, View, ScrollView, Text} from "react-native";
import {List, ListItem} from "react-native-elements";

const ITEM_TYPE={
    GROUP:"group", // ListItem 是组中的
    SINGLE:"single"// ListItem 是普通的
}

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class MenuList extends React.Component {

    /***
     * default props value
     * @mark propTypes 默认属性值
     */
    static defaultProps = {
        items: [],
        type: 2
    }

    /***
     * props types for helper text
     * @mark propTypes 属性类型
     */
    static propTypes = {
        items: React.PropTypes.array,
        clickItem: React.PropTypes.func,
        type: React.PropTypes.any
    }

    /**
     * @mark state
     */
    state = {}

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
     * @mark 自定义代码区
     */
    /**
     * @mark 组件点击
     */
    handleItemPress(item) {
        if (typeof this.props.clickItem == "function") {
            this.props.clickItem(item);
        }
    }

    renderListItemByType(type,item,index){
        let label = void 0;
        let hideChevron=false;
        if(item.label||item.renderLabel){
            hideChevron=true;
            label=item.label||item.renderLabel(item);
        }
        let style={
            backgroundColor: "#fff",
            marginTop: Theme.padding.base,
            marginBottom: 0,
            borderTopWidth: 0,
            borderColor: "#fff",
            borderRadius: Theme.size.radius,
            borderBottomColor: "#fff",
            borderBottomWidth: Theme.pixel,
            borderWidth: Theme.pixel,
        }
        if(type==ITEM_TYPE.GROUP) {
            style = {
                backgroundColor: "#fff",
                borderColor: Theme.color.line_horizontal,
                borderBottomWidth: Theme.pixel,
            };
        }
        return <ListItem
            containerStyle={style}
            onPress={() => this.handleItemPress(item)}
            titleStyle={{fontSize: Theme.fontSize.larger}}
            roundAvatar
            hideChevron={hideChevron}
            label={label}
            key={index}
            title={item.title}
            rightTitle={item.subtitle}
            leftIcon={{type: "iconfont", color: item.color, name: item.icon}}
            rightIcon={{type: "iconfont", color: Theme.color.font_assist,name:"youjiantou",style:{fontSize:Theme.fontSize.min}}}
        />
    }

    renderList() {
        var showArray = new Array();
        var swap = false;
        this.props.items.forEach((v) => {
            if (Array.isArray(v)) {
                showArray.push({type: 1, items: v});
                swap = true;
            } else {
                if (swap) {
                    var array = new Array();
                    array.push(v);
                    showArray.push({type: 2, items: array});
                } else {
                    if (showArray.length > 0) {
                        showArray[showArray.length - 1]["items"].push(v);
                    } else {
                        var array = new Array();
                        array.push(v);
                        showArray.push({type: 2, items: array});
                    }
                }
                swap = false;
            }
        });
        return (<ScrollView style={{marginBottom: Theme.padding.base}}>
            { showArray.map((v, index) => {
                if (v.type == 1) {
                    return this.renderItemGroup(v.items, index);
                } else {
                    return this.renderItemList(v.items, index);
                }
            })}
        </ScrollView>)
    }

    renderItemList(items, index) {
        return (
            <List key={index} containerStyle={{
                marginBottom: 0,
                marginTop: 0,
                borderWidth: 0,
                borderTopWidth: 0,
                borderBottomWidth: 0,
                marginLeft: Theme.padding.base,
                marginRight: Theme.padding.base,
                backgroundColor: Theme.color.clean
            }}>
                {
                    items.map(this.renderListItemByType.bind(this,ITEM_TYPE.SINGLE))
                }
            </List>);
    }

    renderItemGroup(items, index) {
        let style = {
            marginBottom: 2,
            borderColor: "#fff",
            marginTop: Theme.padding.base,
            borderWidth: Theme.pixel,
            borderTopWidth: Theme.pixel,
            borderBottomWidth: Theme.pixel,
            backgroundColor: "#fff",
            borderRadius: Theme.size.radius,
        };
        if (this.props.type != 2) {
            style = Object.assign(style, {
                marginLeft: Theme.padding.base,
                marginRight: Theme.padding.base
            });
        }
        return (
            <List key={index} containerStyle={style}>
                {
                    items.map(this.renderListItemByType.bind(this,ITEM_TYPE.GROUP))
                }
            </List>);
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return (
            <ScrollView style={styles.MenuList}>
                {this.renderList()}
            </ScrollView>
        );
    }
}


//@mark style
const styles = StyleSheet.create({
    MenuList: {flex: 1, marginTop: 0}
});
