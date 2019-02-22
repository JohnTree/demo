/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   创建时间：2017-03-16 08:38
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import ShopRankCell from "./Components/ShopRankCell";
import AlyTopView from "./Components/AlyTopView";
import Echarts from "native-echarts";
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import PullListView from "../../view/component/PullListView";
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束
var i=0;
export default class Analyse extends React.Component {

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
        bottomCellWidth:(Theme.size.width)/3,
        monthNum:"0",
        execleXData:[],
        execleYData:[],
        showExecle:false,
        sumNum:0,
        good:0,
        less:0,
        gPercent:0,
        lPercent:0,
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
        this.showExecleData();
        this.showCricle();
    }


    //声明周期代码结束

    /**
     * @mark 自定义代码区
     */


    /**
     * @mark 上半部分数据整合
     */
    headView(){
        return<View>
            <AlyTopView ref={o=>{this.AlyTopView=o}}/>
            {this.renderExecle()}
            {this.renderCircle()}
            <View style={styles.shopTitle}>
                <FontIcon size={15} icon="shangjiahuoyueduwenzi"></FontIcon>
            </View>
        </View>
    }

    /**
     * @mark 请求接口显示图表
     */
    showExecleData(){
        Ajax("/CmgInfoRemakeController/getCmgInShopsByMonth.do", {}).then(v => {
            if (v.success) {
                var data=v.data;
                if(data.length!=0){
                    this.state.showExecle=true
                }
                this.state.execleXData=data.map(function (item) {
                    var {inDate,inNum} = item;
                    return inDate.substr(8 ,9)+"号"
                },this);
                this.state.execleYData=data.map(function (item) {
                        var {inDate,inNum} = item;
                        return inNum
                },this);
                this.state.monthNum=v.totalMonth;
                this.forceUpdate();
            }
        }).catch(e => {
            // 错误处理
        });
    }

    /**
     * @mark 图表的具体操作
     */
    execleView() {
        var option = {
            backgroundColor: "white",
            animation: false,
            title: {
                show: false
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['商户数'],
                align: 'right',
                bottom: '1%',
                right: '5%',
                textStyle: {
                    color: Theme.color.font_content,
                    fontSize: Theme.fontSize.larger
                },
                //图例选中状态
                selectedMode: false
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: false,
                    start: 1,
                    end: 100,
                    handleSize: 8,

                },
                {
                    type: 'inside',
                    start: 1,
                    end: 100,
                    zoomLock: true,
                }
            ],

            grid: {
                top: '5%',
                left: 10,
                width: Theme.size.width - 27,
                bottom: '15%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.state.execleXData,
                    axisTick: {
                        alignWithLabel: false,
                        lineStyle: {
                            width: 0,
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {color: Theme.color.font_assist}
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisTick: {
                        lineStyle: {width: 0}
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {color: Theme.color.font_assist}
                    },
                    splitLine: {
                        lineStyle: {
                            width: Theme.pixel,
                            color: Theme.color.line_horizontal
                        }
                    },
                }
            ],
            series: [
                {
                    name: '商户数',
                    type: 'line',
                    stack: '总量',
                    smooth: true,
                    itemStyle: {normal: {color: Theme.color.vision_main}},
                    data: this.state.execleYData,
                }
            ]
        };
        return <View style={{paddingTop: Theme.padding.smaller, width: Theme.size.width,}}>
            <Echarts
                option={option}
                height={200}/>
        </View>
    }

    /**
     * @mark 图表的所有显示
     */
    renderExecle() {
        var  num=this.state.monthNum;
        return <View style={{
            paddingTop: Theme.padding.less,
            width: Theme.size.width,
            paddingBottom: Theme.padding.less,
            backgroundColor: 'white',
            marginBottom:Theme.padding.less
        }}>
            <Text style={styles.sumNum}>
                最近30天新增商户数
            </Text>
            <View style={styles.Hcenter}>
                <Text style={[{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginRight: Theme.padding.smaller,
                    color: Theme.color.red,
                    marginLeft: Theme.padding.smaller
                }]}>
                    {num}
                </Text>
                <Text style={[{fontSize: 18, color: Theme.color.font_content}]}>
                    个
                </Text>
            </View>
            {this.showExecle()}
        </View>
    }

    /**
     * @mark 是否显示图表
     */
    showExecle(){
        if(this.state.showExecle){
            return this.execleView();
        }else{
            return<View style={[{width:Theme.size.width,padding:Theme.padding.less,alignItems:'center',justifyContent:'center'}]}>
                <FontIcon  size={60} icon="wushuju" style={[{color: Theme.color.line_horizontal,}]}/>
            </View>
        }
    }

    /**
     * @mark 百分比进度条数据
     *
     */
    showCricle(){
        Ajax("/CmgInfoRemakeController/getCmgGoodShop.do", {}).then(v => {
            if (v.success) {
                console.warn(JSON.stringify(v.good)+"66666666667")
                var total=v.totalMct;
                var good=v.good;
                var less=v.less;
                var gPercent=(good/total)*100;
                var lPercent=(less/total)*100;
                this.state.sumNum=v.totalMct;
                this.state.good=good;
                this.state.less=less;
                this.state.gPercent=gPercent;
                this.state.lPercent=lPercent;
                this.forceUpdate();
            }
        }).catch(e => {
            // 错误处理
        });
    }

    /**
     * @mark 百分比进度条Cell
     *
     */
    Circle(percent, color, text,num) {
        let percent2 =percent?percent:0;
        // let percent2 = 0;
        // if (percent == null || percent == "null" || percent == "") {
        //     percent2 = 0;
        // } else {
        //     percent2 = percent;
        // }
        return <View style={[{
            width: (Theme.size.width)/3,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: Theme.padding.less,
            marginBottom:Theme.padding.less,
        }]}>
            <AnimatedCircularProgress size={70}
                                      width={2}
                                      rotation={0}
                                      fill={percent2}
                                      tintColor={color}
                                      backgroundColor={Theme.color.background}>
                {(fill) => (
                    <View style={{
                        backgroundColor: 'transparent', position: 'absolute',
                        width: 70, height: 70, alignItems: "center", justifyContent: "center",
                    }}>
                        <Text style={[{
                            color: color,
                            fontSize: Theme.fontSize.bigMax
                        }]}>{num}</Text>
                        <Text style={styles.percentText}>{text}</Text>
                    </View>
                )}
            </AnimatedCircularProgress>
        </View>
    }

    /**
     * @mark 所有百分比的
     *
     */
    renderCircle() {
        var data=this.state.circleData;
        return <View style={[{flexDirection: 'row',backgroundColor:'white',  alignItems: 'center',
            justifyContent: 'center',}]}>
            <View style={[{
                width: (Theme.size.width)/3,
                marginTop: Theme.padding.less,
                marginBottom:Theme.padding.less
                 }]}>
                <View style={{
                            backgroundColor: 'transparent',alignItems: "center", justifyContent: "center"
                        }}>
                            <Text style={[{
                                color: Theme.color.gradual_blue1,
                                fontSize: 20
                            }]}>{this.state.sumNum}</Text>
                            <Text style={{fontSize: Theme.fontSize.bigMax,color: Theme.color.font_content} }>{"总计"}</Text>
                </View>
            </View>
            {this.Circle(this.state.gPercent,Theme.color.gradual_blue3,"优质",this.state.good)}
            {this.Circle(this.state.lPercent,Theme.color.vision_main,"低活跃",this.state.less)}
        </View>
    }

    /**
     * @mark 循环数组
     */
    fetchDatas(page, callback, options) {
        this.AlyTopView&&this.AlyTopView.showTopView();
        var rows=[];
        Ajax("/CmgInfoRemakeController/getCmgMctOrderInfoByPage.do", {pageNum: page, pageSize: 10}).then(v => {
            console.warn(JSON.stringify(v))
            if (v.success) {
                var zeroList=v.zeroList;
                var notZeroList=v.notZeroList;
                console.warn(zeroList.length+"ssssssssss")
                console.warn(notZeroList.length+"AAAAAAAAA")
                if(notZeroList.length>0){
                    rows=notZeroList.concat(zeroList)
                }else{
                    rows=zeroList;
                }
                // if(rows.length < 10){
                    callback(rows, {allLoaded: true});
                // } else {
                //     callback(rows);
                // }
            }
        }).catch(e => {
            // 错误处理
        });
    }

    //@mark 显示的border
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
            style={styles.Analyse}
            pageSize={10}
            homePage={1}
            removeClippedSubviews={false}
            renderSeparator={this.renderSeparator}
            fetchDatas={this.fetchDatas.bind(this)}
            renderRow={(rowData) => {
                return (
                    <ShopRankCell key={rowData.mctId} {...rowData}/>
                )
            }}
            renderHeader={this.headView.bind(this)}
        />
    }
}

//@mark style
const styles = StyleSheet.create({
    Analyse: {
        backgroundColor: Theme.color.background,
        flex:1,
        marginBottom:50,
        marginTop: Theme.navigationBar.barHeight,
    },
    sumNum: {
        fontSize: Theme.fontSize.max,
        marginRight: Theme.padding.less,
        color: Theme.color.font_content,
        textAlign: 'center',
        width: Theme.size.width,
        marginTop: Theme.padding.smaller,
    },
    //水平居中
    Hcenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    percentText: {
        fontSize: Theme.fontSize.base,
        color: Theme.color.font_content
    },
    shopTitle:{
        marginTop:Theme.padding.less,
        backgroundColor:'white',
        paddingTop:Theme.padding.less,
        paddingBottom:Theme.padding.less,
        paddingLeft:Theme.padding.base,
        borderBottomWidth:Theme.pixel,
        borderColor:Theme.color.line_horizontal
    }
});
