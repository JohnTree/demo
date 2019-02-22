/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-21 10:51
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React from "react";

import {StyleSheet} from "react-native";
import {MapTypes, MapView} from "react-native-pandora/BmpIndex";
/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class BaidMapForShow extends React.Component {

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
        mayType: MapTypes.NORMAL,
        zoom: 15,
        center: {
            longitude: 113.981718,
            latitude: 22.542449
        },
        trafficEnabled: false,
        baiduHeatMapEnabled: false,
        zoomControlsVisible: false,
        location: null,
        locationInfo: {
            district: "",
            streetNumber: "",
            province: "",
            city: "",
            streetName: "",
            address: "",
            latitude: 0,
            longitude: 0
        },
        markers: [],
        searchText: "",
        searchPageIndex: 0,
        poiList: [],
        selectLocation: {}
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
     * @mark 自定义代码区
     */


    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return (<MapView
            location={this.state.location}
            trafficEnabled={this.state.trafficEnabled}
            baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
            zoom={this.state.zoom}
            zoomControlsVisible={false}
            mapType={this.state.mapType}
            center={this.state.center}
            markers={this.state.markers}
            ref={(self) => {
                this.mapView = self;
            }}
            {...this.props}
        >
        </MapView>);
    }
}

//@mark style
const styles = StyleSheet.create({
    BaidMapForShow: {},
});
