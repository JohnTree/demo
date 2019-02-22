/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-07 12:25
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ListView,
    Animated,
    Easing
} from "react-native";
import {Geolocation, MapView, MapTypes} from "react-native-pandora/BmpIndex";
import PullListView from "../PullListView";
import {Button} from "react-native-elements";
/**
 *
 * @mark 文件内变量
 */

//文件内变量结束

export default class BaiduMap extends React.Component {

    /***
     * default props value
     * @mark propTypes 默认属性值
     */
    static defaultProps = {}

    /***
     * props types for helper text
     * @mark propTypes 属性类型
     */
    static propTypes = {
        closeMapView: React.PropTypes.func
    }

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
        poiViewHeight: 0,
        poiViewAniHeight: new Animated.Value(0),
        addrViewAniHeight: new Animated.Value(0),
        bottomChange: new Animated.Value(0),
        poiListHeight: 0,
        poiLisAnitHeight: new Animated.Value(0),
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
        this.makeLocation();
        setTimeout(this.measureBmapVIew.bind(this));
    }

    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */

    measureBmapVIew() {
        this.measureBmap.measure((a, b, width, height, px, py) => {
                this.state.poiViewHeight = height / 3;
                this.state.poiListHeight = height;
            }
        );
    }


    /**
     * @mark 缩放按钮
     * @returns {XML}
     */
    renderZoomController() {
        return (
            <Animated.View style={{
                position: "absolute",
                bottom: this.state.bottomChange,
                width: 30,
                height: 60,
                right: Theme.padding.less / 2,
                borderWidth: Theme.pixel,
                borderColor: Theme.color.line_horizontal,
                borderRadius: Theme.size.radius,
                backgroundColor: "rgba(255,255,255,0.9)",
            }}>

                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomColor: Theme.color.line_horizontal,
                    borderBottomWidth: Theme.pixel,
                    backgroundColor: Theme.color.clean,
                    flex: 1,
                }} onPress={() => {
                    if (this.state.zoom < 21) {
                        this.state.zoom++;
                        this.forceUpdate();
                    }
                }}><Text style={{
                    fontSize: Theme.fontSize.larger,
                    color: Theme.color.font_content,
                    backgroundColor: Theme.color.clean,
                }}>+</Text></TouchableOpacity>
                <TouchableOpacity style={
                    {
                        backgroundColor: Theme.color.clean,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                } onPress={
                    () => {
                        if (this.state.zoom > 12) {
                            this.state.zoom--;
                            this.forceUpdate();
                        }
                    }
                }>
                    <Text style={
                        {
                            fontSize: Theme.fontSize.larger,
                            color: Theme.color.font_content,
                            backgroundColor: Theme.color.clean,
                        }
                    }>-</Text>
                </TouchableOpacity>
            </Animated.View>);

    }

    /**
     * @mark  搜索框
     * @returns {XML}
     */
    renderSearchBar() {
        return (  < View style={{
            position: "absolute",
            width: Theme.size.width - Theme.padding.less * 2,
            top: Theme.padding.less,
            left: Theme.padding.less,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: Theme.pixel,
            borderColor: Theme.color.line_horizontal,
            borderRadius: Theme.size.radius,
            backgroundColor: "rgba(255,255,255,0.9)",
            flexDirection: "row"
        }}>
            < TextInput style={{
                flex: 1,
                flexDirection: "row",
                paddingLeft: Theme.padding.base,
                fontSize: Theme.fontSize.base,
                color: Theme.color.font_content
            }} onChangeText={(text) => {
                this.state.searchText = text;
            }}
            />
            <TouchableOpacity style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Theme.color.clean,
                width: 40, height: 40
            }} onPress={this.makePoiCity.bind(this)}>
                <FontIcon icon={"sousuo"} style={[{
                    fontSize: Theme.fontSize.base,
                    color: Theme.color.vision_main
                }]
                }
                />
            </TouchableOpacity>
        </View>);
    }

    //@mark  我的位置View
    renderMyLocation() {
        return (
            <Animated.View style={{
                position: "absolute",
                bottom: this.state.bottomChange,
                width: 30,
                height: 30,
                left: Theme.padding.less / 2,
            }}>
                <TouchableOpacity activeOpacity={0.7} style={{
                    position: "absolute",
                    width: 30,
                    height: 30,
                    left: 0,
                    bottom: 0,
                    borderWidth: Theme.pixel,
                    borderColor: Theme.color.line_horizontal,
                    borderRadius: Theme.size.radius,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    alignItems: 'center',
                    justifyContent: 'center',
                }} onPress={this.makeLocation.bind(this)}>
                    <FontIcon
                        icon={"weizhi"}
                        style={
                            [{
                                textAlign: "center",
                                fontSize: Theme.fontSize.base,
                                color: Theme.color.vision_main
                            }]
                        }
                    />
                </TouchableOpacity>
            </Animated.View>
        );
    }

    //@mark主map
    renderMap() {
        return (  <MapView
            onMapLoaded={() => {
            }}
            location={this.state.location}
            trafficEnabled={this.state.trafficEnabled}
            baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
            zoom={this.state.zoom}
            zoomControlsVisible={false}
            mapType={this.state.mapType}
            center={this.state.center}
            markers={this.state.markers}
            style={[styles.map]}
            onMapClick={(e) => {
                this.state.selectLocation = {latitude: e.latitude, longitude: e.longitude};
                this.makeReverseGeoCode();
                this.setState({
                    markers: [{
                        longitude: e.longitude,
                        latitude: e.latitude,
                        title: " 选择了这里 "
                    }]
                });
            }}
            onMapPoiClick={(e) => {
                this.state.selectLocation = {latitude: e.latitude, longitude: e.longitude};
                this.makeReverseGeoCode();
                this.setState({
                    markers: [{
                        longitude: e.longitude,
                        latitude: e.latitude,
                        title: " 选择了这里 "
                    }]
                });
            }}
            onMarkerClick={(e) => {
                this.state.selectLocation = {latitude: e.position.latitude, longitude: e.position.longitude};
                this.makeReverseGeoCode();
            }}
            ref={(self) => {
                this.mapView = self;
            }}
        >
        </MapView>);
    }

    //mark 小poiView
    renderPoiView() {
        return (
            <Animated.View style={{
                backgroundColor: "rgba(255,255,255,0.9)",
                position: "absolute",
                left: 0,
                bottom: 0,
                height: this.state.poiViewAniHeight,
                width: Theme.size.width,
            }}>
                <TouchableOpacity style={{
                    width: Theme.size.width, height: 20,
                    backgroundColor: Theme.color.clean,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomWidth: Theme.pixel,
                    borderBottomColor: Theme.color.line_horizontal,
                }} onPress={() => {
                    this.makePoiListShow()
                }}>
                    < FontIcon icon={"shangjiantou"} style={[{
                        fontSize: 4,
                        color: Theme.color.font_assist
                    }]
                    }
                    />
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    borderTopWidth: Theme.pixel,
                    borderTopColor: Theme.color.line_horizontal
                }}>
                    {this.state.poiList.map((value, index) => {
                        return (
                            <TouchableOpacity key={index} style={{
                                width: Theme.size.width - 2 * Theme.padding.base,
                                marginTop: Theme.padding.base,
                                marginLeft: Theme.padding.base,
                                marginRight: Theme.padding.base
                            }} onPress={() => {
                                this.state.selectLocation = {
                                    latitude: value.latitude,
                                    longitude: value.longitude,
                                    name: value.name,
                                    detAddress: value.city + " " + value.address
                                };
                                this.makeReverseGeoCode();
                            }}>
                                <Text style={{
                                    fontSize: Theme.fontSize.max,
                                    marginBottom: Theme.padding.less / 2,
                                    color: Theme.color.font_content
                                }}>{ value.name}</Text>
                                <Text
                                    style={{
                                        color: Theme.color.font_assist,
                                        marginBottom: Theme.padding.base,
                                    }}>{value.city + " " + value.address}</Text>
                                <View style={{
                                    height: Theme.pixel,
                                    width: Theme.size.width,
                                    marginLeft: -1 * Theme.padding.base,
                                    backgroundColor: Theme.color.line_horizontal
                                }}/>
                            </TouchableOpacity>

                        )
                    })}
                </View>
            </Animated.View>   );
    }


    renderPoiList() {
        let i = 0;
        return (
            <Animated.View style={{
                backgroundColor: "#fff",
                position: "absolute",
                left: 0,
                bottom: 0,
                height: this.state.poiLisAnitHeight,
                width: Theme.size.width,
            }}>
                <TouchableOpacity style={{
                    borderBottomWidth: Theme.pixel,
                    borderBottomColor: Theme.color.line_horizontal,
                    width: Theme.size.width, height: 20,
                    backgroundColor: Theme.color.clean,
                    alignItems: 'center',
                    justifyContent: 'center',
                }} onPress={() => {
                    this.makePoiListHide()
                }}>
                    <FontIcon icon={"xiajiantou"} style={[{
                        fontSize: 4,
                        color: Theme.color.font_assist
                    }]}/>
                </TouchableOpacity>
                <PullListView
                    ref={(self) => {
                        if (self) {
                            this.pullList = self
                        }
                    }}
                    style={{
                        backgroundColor: Theme.color.clean,
                    }}
                    showEmpty={true}
                    renderRow={(rowData) => {
                        return (
                            <TouchableOpacity key={rowData.uid} style={{
                                width: Theme.size.width - 2 * Theme.padding.base,
                                marginTop: Theme.padding.base,
                                marginLeft: Theme.padding.base,
                                marginRight: Theme.padding.base
                            }} onPress={() => {
                                // console.warn(JSON.stringify(rowData));
                                this.setState({
                                    selectLocation: {
                                        latitude: rowData.latitude,
                                        longitude: rowData.longitude,
                                        name: rowData.name,
                                        detAddress: rowData.city + " " + rowData.address
                                    },
                                    markers: [{
                                        latitude: parseFloat(rowData.latitude),
                                        longitude: parseFloat(rowData.longitude),
                                        title: rowData.name
                                    }],
                                    center: {
                                        latitude: parseFloat(rowData.latitude),
                                        longitude: parseFloat(rowData.longitude)
                                    }
                                });
                                this.makeReverseGeoCode();
                            }}>
                                <Text style={{
                                    fontSize: Theme.fontSize.max,
                                    marginBottom: Theme.padding.less / 2,
                                    color: Theme.color.font_content
                                }}>{ rowData.name}</Text>
                                <Text style={{
                                    color: Theme.color.font_assist,
                                    marginBottom: Theme.padding.base,
                                }}>{rowData.city + " " + rowData.address}</Text>

                            </TouchableOpacity>
                        )
                    }}
                    pageSize={10}
                    fetchDatas={(page, callback, options) => {
                        Geolocation.getCityPoi(this.state.locationInfo.city, this.state.searchText, page / 10, 10).then((data) => {
                            if (data["data"]) {
                                callback(data["data"], {allLoaded: false});
                            } else {
                                callback([], {allLoaded: true});
                            }
                        }).catch(e => {
                            console.warn(e)
                        });
                    }}

                />
            </Animated.View>    );
    }

//     renderSeparator={() => {
//     return (
// <View key={i++}
// style={{
//     backgroundColor: Theme.color.line_horizontal,
//     marginLeft: Theme.padding.base
// }}/>
// )
// }}
    renderAddrView() {
        // console.warn(JSON.stringify( this.state.locationInfo));
        return (
            <Animated.View style={{
                backgroundColor: "rgba(255,255,255,0.9)",
                position: "absolute",
                left: 0,
                bottom: 0,
                height: this.state.addrViewAniHeight,
                width: Theme.size.width,
                alignItems: 'center',
                justifyContent: "center",
                borderTopWidth: Theme.pixel,
                borderTopColor: Theme.color.line_horizontal
            }}>
                <View key={1} style={{
                    width: Theme.size.width - 2 * Theme.padding.base,
                    marginTop: Theme.padding.base,
                    marginLeft: Theme.padding.base,
                    marginRight: Theme.padding.base
                }}>
                    <Text style={{
                        fontSize: Theme.fontSize.max,
                        height: 20,
                        marginBottom: Theme.padding.less / 2,
                        color: Theme.color.font_content
                    }}>{ this.state.locationInfo.name ? this.state.locationInfo.name : this.state.locationInfo.address}</Text>
                    <Text
                        style={{
                            color: Theme.color.font_assist,
                            height: 15,
                            marginBottom: Theme.padding.less,
                        }}>{this.state.locationInfo.detAddress ? this.state.locationInfo.detAddress : ( this.state.locationInfo.province + " " + this.state.locationInfo.district + " " + this.state.locationInfo.streetName)}
                    </Text>
                    <Button
                        fontSize={Theme.fontSize.max}
                        buttonStyle={{
                            backgroundColor: Theme.color.orange1,
                            borderRadius: Theme.size.radius,
                            marginLeft: 0,
                            marginRight: 0,
                            height: 40
                        }}
                        onPress={() => {
                            this.props.closeMapView(this.state.locationInfo);
                        }}
                        title='选择这里'/>
                </View>
            </Animated.View>
        );
    }

    removeAllMarkers() {
        this.setState({markers: []});
    }

    makeLocation() {
        this.setState({markers: []});
        let me = this;
        // console.warn("定位");
        this.mapView.gainLocation().then(data => {
            this.setState({
                center: {
                    longitude: 0,
                    latitude: 0
                }
            });
            this.setState({
                center: {
                    longitude: parseFloat(data.longitude),
                    latitude: parseFloat(data.latitude)
                }
            });
            this.state.selectLocation = {latitude: data.latitude, longitude: data.longitude};
            this.makeReverseGeoCode();
        });
    }

    makeReverseGeoCode() {
        Geolocation.reverseGeoCode(parseFloat(this.state.selectLocation.latitude), parseFloat(this.state.selectLocation.longitude)).then(v => {
            this.state.locationInfo = v;
            v.latitude = this.state.selectLocation.latitude;
            v.longitude = this.state.selectLocation.longitude;
            v.name = this.state.selectLocation.name;
            v.detAddress = this.state.selectLocation.detAddress;
            this.setState({locationInfo: v});
            this.makePoiViewHide();
            this.makePoiListHide();
        })
    }

    makePoiListShow() {
        // console.warn(this.state.poiListHeight)
        Animated.parallel([
            Animated.timing(          // Uses easing functions
                this.state.poiLisAnitHeight,    // The value to drive
                {
                    toValue: this.state.poiListHeight,
                    easing: Easing.ease,
                    duration: 100
                })
        ]).start(() => {

        });

    }

    makePoiListHide() {
        Animated.parallel([
            Animated.timing(          // Uses easing functions
                this.state.poiLisAnitHeight,    // The value to drive
                {
                    toValue: 0,
                    easing: Easing.ease,
                    duration: 100
                })
        ]).start();
    }

    makePoiViewHide() {
        Animated.parallel([Animated.timing(          // Uses easing functions
            this.state.poiViewAniHeight,    // The value to drive
            {
                toValue: 0,
                easing: Easing.ease,
                duration: 100
            },           // Configuration
        ), Animated.timing(this.state.bottomChange,    // The value to drive
            {
                toValue: 120 + Theme.padding.less / 2,
                easing: Easing.ease,
                duration: 100
            },           // Configuration
        ), Animated.timing(          // Uses easing functions
            this.state.addrViewAniHeight, // The value to drive
            {
                toValue: 120,
                easing: Easing.ease,
                duration: 100
            },           // Configuration
        )]).start();
    }

    makePoiViewShow() {
        this.removeAllMarkers();
        Animated.parallel([Animated.timing(          // Uses easing functions
            this.state.poiViewAniHeight,    // The value to drive
            {
                toValue: this.state.poiViewHeight,
                easing: Easing.ease,
                duration: 100
            },           // Configuration
        ), Animated.timing(this.state.bottomChange,    // The value to drive
            {
                toValue: this.state.poiViewHeight + Theme.padding.less / 2,
                easing: Easing.ease,
                duration: 100
            },           // Configuration
        ), Animated.timing(          // Uses easing functions
            this.state.addrViewAniHeight, // The value to drive
            {
                toValue: 0,
                easing: Easing.ease,
                duration: 100
            },           // Configuration
        )]).start();
    }


    makePoiCity() {
        this.state.searchPageIndex = 0;
        this.pullList._onRefresh();
        Geolocation.getCityPoi(this.state.locationInfo.city, this.state.searchText, this.state.searchPageIndex, 10).then((data) => {
            this.setState({poiList: data["data"]});
            this.renderPoiView();
            this.makePoiViewShow();
        });
    }

    //自定义代码区结束
    /**
     * @mark render
     */
    render() {
        return (<View ref={(view) => {
            if (view) {
                this.measureBmap = view;
            }
        }} style={[styles.BaiduMap, this.props.style]}>
            {this.renderMap()}
            {this.renderSearchBar()}
            {this.renderZoomController()}
            {this.renderMyLocation()}
            {this.renderPoiView()}
            {this.renderAddrView()}
            {this.renderPoiList()}
        </View>);
    }
}

//@mark style
const styles = StyleSheet.create({
    BaiduMap: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    }, map: {
        width: Theme.size.width,
        flex: 1,

    }
});
