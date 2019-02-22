/**
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-02 22:15
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from "react";
import Calendar from "react-native-calendar";
import {StyleSheet, View} from "react-native";

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class CustomCalender extends React.Component {

    /***
     * default props value
     * @mark propTypes 默认属性值
     */
    static defaultProps = {
        selectedDate:''
    }

    /***
     * props types for helper text
     * @mark propTypes 属性类型
     */
    static propTypes = {
        selectedDate:React.PropTypes.string
    }

    /**
     * @mark state
     */
    state = {
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

    schedule() {
        const customStyle = {
            controlButtonText: {
                color: Theme.color.vision_main,
            },
            calendarContainer: {
                borderRadius: Theme.size.radius,
                backgroundColor: Theme.color.background,
                borderWidth: Theme.pixel,
                borderColor: Theme.color.line_horizontal
            }, dayButton: {
                alignItems: 'center',
                justifyContent: "center",
                padding: 5,
                width: Theme.size.width/7 ,
                height: Theme.size.width/7,
                borderTopWidth: Theme.pixel,
                borderTopColor: Theme.color.line_horizontal,
                borderLeftWidth: Theme.pixel,
                borderLeftColor: Theme.color.line_horizontal,
            }, dayButtonFiller: {
                alignItems: 'center',
                justifyContent: "center",
                padding: 5,
                width: Theme.size.width/7,
                height: Theme.size.width/7,
                borderTopWidth: Theme.pixel,
                borderTopColor: Theme.color.line_horizontal,
            }, currentDayCircle: {
                backgroundColor: Theme.color.vision_main,
            }, calendarHeading: {
                borderTopWidth: Theme.pixel,
                borderBottomWidth: 0,
                borderColor: Theme.color.line_horizontal
            }, weekendHeading: {
                flex: 1,
                fontSize: 15,
                textAlign: 'center',
                marginVertical: 5,
                color: Theme.color.green,
            }, weekendDayText: {
                color: Theme.color.green,
            },
            selectedDayCircle: {
                backgroundColor: Theme.color.vision_main,
            },
        }

        return <View style={{ position: "relative"}}><Calendar
            onDateSelect={(date) => this.onDateSelect(date)}
            showControls={true}
            selectedDate={this.props.selectedDate}
            prevButtonText={'上月'}
            nextButtonText={'下月'}
            dayHeadings={["周日", "周一", "周二", "周三", "周四", "周五", "周六"] }
            monthNames={["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]}
            titleFormat="MM YYYY"
            customStyle={customStyle}/></View>
    }
    onDateSelect(date) {
        callAsFunc(this.props.onDateSelect, [date])
    };

    //自定义代码区结束

    /**
     * @mark render
     */
    render() {
        return this.schedule()
    }
}

//@mark style
const styles = StyleSheet.create({
    CustomCalender: {}
});
