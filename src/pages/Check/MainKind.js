/**
 *   创建人：wangshiyang
 *   创建时间：2017-03-06 18:02
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import {List,ListItem} from "react-native-elements";
import {
    StyleSheet,
    View,
    ListView,
    ScrollView,

} from 'react-native';
/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class MainKind extends React.Component {

    /***
     * default props value
     * @mark propTypes 默认属性值
     */
    static defaultProps = {
        style:null,
        onSelectValue:()=>{},
        width:Theme.size.width-2*Theme.pixel,
    }

    /***
     * props types for helper text
     * @mark propTypes 属性类型
     */
    static propTypes = {
        onSelectValue:React.PropTypes.func,
        // width:React.PropsType.float,
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
        super(props);
        this.state = {
            list:[],
            lists:[],
            firstObj:"",
            subList: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            zero_m:0,
            itemClick:false,
            mTypeName:null,
            mTypeCode:null,
            pTypeName:null,
            pTypeCode:null,
            toPoint_o:null,
            toPoint_t:null,
            itemString:"",


        };
    }

    /**
     * @mark 组件声明周期区域
     */

    /**
     * @mark 第一次加载 只运行一次
     */
    componentWillMount(){
        Ajax("portalController/menuType.do",
            {"topPoint":"00"}).then(v => {
            this.setState({toPoint_o:v.list[0].STypeCode})
            if (true === v.success) {
                this.setState({
                    list:v.list,
                    firstObj:v.list[0].STypeCode,
                    pTypeName:v.list[0].STypeName,
                    pTypeCode:v.list[0].STypeCode,
                })
            } else {
                console.warn(v.message)
            }
        }).then(()=>{
            return  Ajax("portalController/menuType.do",
                {"topPoint":this.state.toPoint_o});
        }).then(v => {
            if (true === v.success) {
                this.setState({
                    lists:v.list,
                    mTypeName:v.list[0].STypeName,
                    mTypeCode:v.list[0].STypeCode,
                });
            } else {
                console.warn(v.message)
            }

        }).catch(e => {
            console.error(e)
        });

    }

    componentWillUnmount(){
        this.setState({list:null,lists:null})
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */


    _getData(typeCode,typeName){
        this.setState({
            pTypeName:typeName,
            pTypeCode:typeCode,
        });
        Ajax("portalController/menuType.do",
            {"topPoint":typeCode}).then(v => {
            if (true === v.success) {
                this.setState({
                    lists:v.list,
                    mTypeName:v.list[0].STypeName,
                    mTypeCode:v.list[0].STypeCode,
                });
            } else {
                console.warn(v.message)
            }
        }).catch(e => {
            console.error(e)
        });

    }
    _selectData(code,name){
        this.setState({
            mTypeName:name,
            mTypeCode:code,
        })
        this.props.onSelectValue(this.state.pTypeCode,this.state.pTypeName,code,name);
    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render(){
        return (<View
            style={this.props.style?this.props.style:styles.cNstyle}>
            <ScrollView style={{borderTopWidth:0,paddingLeft:0,marginLeft:0}}>
            <View style={{width:(this.props.width-Theme.pixel)/3,borderColor:Theme.color.color_line,backgroundColor:"white"}}>
                <List containerStyle={styles.listsStyle}>
                    {
                        this.state.list.map((l, i) => (
                            <ListItem
                                onPress={()=>{this._getData(l.STypeCode,l.STypeName)}}
                                hideChevron={true}
                                key={l.STypeName}
                                scrollEnabled={false}
                                title={l.STypeName}
                                containerStyle={this.state.pTypeName==l.STypeName?styles.containerStyle:styles.containerUnStyle}
                                titleStyle={this.state.pTypeName==l.STypeName?styles.listItem:styles.listItems}
                            />
                        ))
                    }
                </List>
                {/*right:0,position:"absolute"*/}
            </View>
            </ScrollView>
            <ScrollView style={{borderTopWidth:0,paddingLeft:0,marginLeft:0}}>
                <View style={{backgroundColor:Theme.color.background,width:(this.props.width-Theme.pixel)*2/3,marginLeft:0}}>
                    <List containerStyle={styles.subListStyle}>
                        {
                            this.state.lists.map((l, i) => (
                                <ListItem
                                    onPress={()=>{this._selectData(l.STypeCode,l.STypeName)}}
                                    hideChevron={false}
                                    key={l.STypeName}
                                    title={l.STypeName}
                                    containerStyle={[{borderBottomWidth:Theme.pixel,borderBottomColor:Theme.color.line_horizontal},
                                        this.state.mTypeName==l.STypeName?
                                            {backgroundColor:"white"}:{backgroundColor:Theme.color.background}]}
                                    titleStyle={this.state.mTypeName==l.STypeName?styles.listItem:styles.listItems}
                                />
                            ))
                        }
                    </List>
                </View>
            </ScrollView>
        </View>)
    }

}

//@mark style
const styles = StyleSheet.create({
    listsStyle: {
        backgroundColor: Theme.color.vision_main,
        borderBottomWidth: 0,
        // width:(Theme.size.width-Theme.pixel)/3,
        marginTop: 0,
        borderTopWidth:Theme.pixel,

    },

    subListStyle: {
        backgroundColor: Theme.color.background,
        borderBottomWidth: 0,
        paddingLeft:0,
        borderTopWidth:Theme.pixel,
        // width:(Theme.size.width-Theme.pixel)*2/3,
        marginTop: 0,
    },
    listItem: {
        fontSize:Theme.fontSize.max,
        marginLeft:Theme.padding.base,
        color:Theme.color.vision_main,
        marginTop:Theme.padding.less,
        // height:25,
        alignItems:'center',
    },
    listItems: {
        fontSize:Theme.fontSize.max,
        marginLeft:Theme.padding.base,
        color:Theme.color.font_content,
        marginTop:Theme.padding.less,
        // height:25,
        alignItems: 'center',


    },
    separator: {
        height: Theme.pixel,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
     containerStyle:{
         borderBottomWidth:0,
         backgroundColor:Theme.color.background,
         marginLeft:Theme.padding.smaller,
         borderColor:"white",

      },
    containerUnStyle: {
        borderBottomWidth: 0,
        backgroundColor: "white",
    },
    cNstyle:{
        flexDirection:"row",
        marginTop:Theme.navigationBar.barHeight,
        backgroundColor:"white"
    }
});
