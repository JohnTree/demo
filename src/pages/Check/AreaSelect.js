/**
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-06 18:02
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import {List, ListItem} from "react-native-elements";
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

export default class AreaSelect extends React.Component {

    /***
     * default props value
     * @mark propTypes 默认属性值
     */
    static defaultProps = {
        style: null,
        onSelectValue: () => {
        },
        width: Theme.size.width - 2 * Theme.pixel,
    }

    /***
     * props types for helper text
     * @mark propTypes 属性类型
     */
    static propTypes = {
        // onSelectValue: React.PropTypes.func,
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
            list: [],
            lists: [],
            firstObj: "",
            subList: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            zero_m: 0,
            cityCode: DataBus.getAndClear("cityCode"),
            city: DataBus.getAndClear("cityName"),
            itemClick: false,
            taName: null,
            taId: null,
            areaName: null,
            areaId: null,
            toPoint_o: null,
            toPoint_t: null,
            itemString: "",
            update: DataBus.getAndClear("update"),

        };
    }

    /**
     * @mark 组件声明周期区域
     */

    /**
     * @mark 第一次加载 只运行一次
     */
    componentWillMount() {
        Ajax("GateCityController/getAreaByCityId.do",
            {"cityId": this.state.cityCode}).then(v => {
            if (true === v.success) {
                this.setState({
                    list: v.result
                })
            } else {
                console.warn(v.message)
            }
        }).catch(e => {
            console.error(e)
        });

    }

    componentWillUnmount() {
        this.setState({list: null, lists: null})
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */


    _getData(typeCode, typeName) {
        this.setState({
            areaName: typeName,
            areaId: typeCode,
        });
        Ajax("GateCityController/getTaInfoByAreaId.do",
            {"areaId": typeCode}).then(v => {
            if (true === v.success) {
                var li = [];
                li = v.result;
                this.setState({
                    lists: v.result
                });
                if (li.length == 0) {
                    DataBus.set("areaId", typeCode);
                    DataBus.set("areaName", typeName);
                    DataBus.set("cityId", this.state.cityCode);
                    DataBus.set("cityName", this.state.city);
                    DataBus.set("taId", typeCode);
                    DataBus.set("taName", "");
                    CountEmitter.emit("taSelect", "");
                    if(DataBus.getAndClear("updateMctCity")){
                        Actions.popTo("updateMctMessage");
                    }else{
                        Actions.popTo("storeCertification");
                    }
                }
            } else {
                console.warn(v.message)
            }
        }).catch(e => {
            console.error(e)
        });

    }

    _selectData(code, name) {
        this.setState({
            taName: name,
            taId: code,
        })
        DataBus.set("areaId", this.state.areaId);
        DataBus.set("areaName", this.state.areaName);
        DataBus.set("cityId", this.state.cityCode);
        DataBus.set("cityName", this.state.city);
        DataBus.set("taId", code);
        DataBus.set("taName", name);
        CountEmitter.emit("taSelect", "");
        console.warn(this.state.update)
        var updateMct=  DataBus.getAndClear("updateMctCity");
        console.warn(updateMct+"sssssssssssssssss");
        if(updateMct){
            Actions.popTo("updateMctMessage");
        }else if (this.state.update == true) {
            Actions.popTo("upDateStoreCertification");
        } else {
            Actions.popTo("storeCertification");
        }

    }

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return (<View
            style={styles.cNstyle}>
            <ScrollView style={{borderTopWidth: 0, paddingLeft: 0, marginLeft: 0}}>
                <View style={{
                    width: (this.props.width - Theme.pixel) / 3,
                    borderColor: Theme.color.line_vertical,
                    backgroundColor: "white", marginBottom: 100
                }}>
                    <List containerStyle={styles.listsStyle}>
                        {
                            this.state.list.map((l, i) => (
                                <ListItem
                                    onPress={() => {
                                        this._getData(l.areaId, l.areaName)
                                    }}
                                    hideChevron={true}
                                    key={l.areaName}
                                    scrollEnabled={false}
                                    title={l.areaName}
                                    containerStyle={this.state.areaName == l.areaName ? styles.containerStyle : styles.containerUnStyle}
                                    titleStyle={this.state.areaName == l.areaName ? styles.listItem : styles.listItems}
                                />
                            ))
                        }
                    </List>
                    {/*right:0,position:"absolute"*/}
                </View>
            </ScrollView>
            <ScrollView style={{borderTopWidth: 0, paddingLeft: 0, marginLeft: 0}}>
                <View style={{
                    backgroundColor: Theme.color.background,
                    width: (this.props.width - Theme.pixel) * 2 / 3,
                    marginLeft: 0, marginBottom: 100
                }}>
                    <List containerStyle={styles.subListStyle}>
                        {
                            this.state.lists.map((l, i) => (
                                <ListItem
                                    onPress={() => {
                                        this._selectData(l.taId, l.taName)
                                    }}
                                    hideChevron={false}
                                    key={l.taName}
                                    title={l.taName}
                                    containerStyle={[{
                                        borderBottomWidth: Theme.pixel,
                                        borderBottomColor: Theme.color.line_horizontal
                                    },
                                        {backgroundColor: Theme.color.background}]}
                                    titleStyle={styles.listItems}
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
        backgroundColor: Theme.color.background,
        borderBottomWidth: 0,
        marginTop: 0,
        borderTopWidth: Theme.pixel,
    },

    subListStyle: {
        backgroundColor: Theme.color.background,
        borderBottomWidth: 0,
        paddingLeft: 0,
        borderTopWidth: Theme.pixel,
        marginTop: 0,
    },
    listItem: {
        fontSize: Theme.fontSize.max,
        marginLeft: Theme.padding.base,
        color: Theme.color.vision_main,
        marginTop: Theme.padding.less,
        height: 40,
        alignItems: 'center',
    },
    listItems: {
        fontSize: Theme.fontSize.max,
        marginLeft: Theme.padding.base,
        color: Theme.color.font_content,
        marginTop: Theme.padding.less,
        height: 40,
        alignItems: 'center',
    },
    separator: {
        height: Theme.pixel,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    containerStyle: {
        borderBottomWidth: 0,
        backgroundColor: Theme.color.background,
        marginLeft: Theme.padding.smaller,
        borderColor: "white",
    },
    containerUnStyle: {
        backgroundColor: "#fff", marginTop: Theme.pixel
    },
    cNstyle: {
        flexDirection: "row",
        marginTop: Theme.navigationBar.barHeight,
        backgroundColor: "white",
        width: Theme.size.width,
        height: Theme.size.height,
    }
});
