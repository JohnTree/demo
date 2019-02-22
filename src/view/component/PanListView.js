/**
 *   Copyright 2007-2017 by DHC Software co.
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-21 10:55
 *   简介：
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';

import {
    ListView,
    LayoutAnimation,
    View,
    Animated,
    Dimensions,
    PanResponder,
    TouchableWithoutFeedback
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

// 获取屏幕高度
let HEIGHT = Dimensions.get('window').height;

class Row extends Component {
    constructor(props) {
        super(props);

    }

    /**
     * @mark 生命周期
     */
    shouldComponentUpdate(props) {
        if (props.hovering !== this.props.hovering) return true;
        if (props.active !== this.props.active) return true;
        if (props.rowData.data !== this.props.rowData.data) return true;
        if (props.rowHasChanged) return props.rowHasChanged(props.rowData.data, this._data);
        return false;
    }

    componentDidUpdate(props) {
        if (props.rowHasChanged) {
            this._data = (typeof props.rowData.data === 'object') ? Object.assign({}, props.rowData.data) : props.rowData.data;
        }
    }

    render() {
        let layout = this.props.list.layoutMap[this.props.rowData.index];
        let activeData = this.props.list.state.active;

        let activeIndex = activeData ? activeData.rowData.index : -5;
        let shouldDisplayHovering = activeIndex !== this.props.rowData.index;
        let Row = React.cloneElement(
            this.props.renderRow(
                this.props.rowData.data, this.props.rowData.section, this.props.rowData.index, null, this.props.active),
            {
                sortHandlers: {onLongPress: this.handleLongPress.bind(this), onPressOut: this.props.list.cancel.bind(this)},
                onLongPress: this.handleLongPress.bind(this), onPressOut: this.props.list.cancel.bind(this)
            });

        return <View onLayout={this.props.onRowLayout}
                     style={[
                         this.props.active && !this.props.hovering ? {height: 0.01} : null,
                         this.props.active && this.props.hovering ? {opacity: 0.0} : null
                     ]}
                     ref="view"
        >
            {this.props.hovering && shouldDisplayHovering ? this.props.activeDivider : null}
            {Row}
        </View>
    }

    /**
     * @mark 自定义函数
     */
    handleLongPress(e) {
        this.refs.view.measure((frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
            let layout = {frameX, frameY, frameWidth, frameHeight, pageX, pageY};
            this.props.onRowActive({
                layout: layout,
                touch: e.nativeEvent,
                rowData: this.props.rowData
            });
        });
    }

    measure() {
        return this.refs.view.measure.apply(this, Array.from(arguments));
    }
}

class SortRow extends Component {
    constructor(props) {
        super(props);
        let layout = this.props.list.state.active.layout;
        let wrapperLayout = this.props.list.wrapperLayout;

        this.state = {
            style: {
                position: 'absolute',
                left: 0,
                right: 0,
                opacity: .2,
                height: layout.frameHeight,
                overflow: 'hidden',
                backgroundColor: 'transparent',
                marginTop: layout.pageY - wrapperLayout.pageY //Account for top bar spacing
            }
        }
    }

    render() {
        let handlers = this.props.panResponder.panHandler;
        return (
            <Animated.View ref="view"
                           style={[this.state.style, this.props.sortRowStyle, this.props.list.state.pan.getLayout()]}>
                {this.props.renderRow(this.props.rowData.data, this.props.rowData.section, this.props.rowData.index, null, true)}
            </Animated.View>
        )
    }
}

let currentPanValue = {x: 0, y: 0}

export default class PanListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ds: new ListView.DataSource({
                rowHasChanged: (row1, row2) => {
                    if (this.props.rowHasChanged) return this.rowHasChanged(row1, row2);
                    return false;
                }
            }),
            active: false,
            hovering: false,
            pan: new Animated.ValueXY(currentPanValue)
        }
        this.layoutMap = [];
        this.mixins = [TimerMixin];
        this.scrollValue = 0;
        this.scrollContainerHeight = HEIGHT * 1.2;
        this.firstRowY = undefined;
        this._rowRefs = {};
        this.mounted = false;
        this.listener = this.state.pan.addListener(e => this.PanY = e.y);
    }

    componentWillMount() {
        let onPanResponderMoveCb = Animated.event([null, {
            dx: this.state.pan.x,
            dy: this.state.pan.y
        }])
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e) => true,
            onMoveShouldSetPanResponderCapture: (e, a) => {
                let vy = Math.abs(a.vy);
                let vx = Math.abs(a.vx);
                return (vy) > vx && this.state.active;
            },
            onPanResponderMove: (evt, gestureState) => {
                gestureState.dx = 0;
                this.moveY = gestureState.moveY;
                onPanResponderMoveCb(evt, gestureState);
            },
            onPanResponderGrant: (e, gesureState) => {
                this.move = true;
                this.props.onMoveStart && this.props.onMoveStart();
                this.state.pan.setOffset(currentPanValue);
                this.state.pan.setValue(currentPanValue);
            },
            onPanResponderRelease: (e) => {
                this.moved = false;
                this.props.onMoveEnd && this.onMoveEnd();
                if (!this.state.active) {
                    if (this.state.hovering) this.setState({hovering: false});
                    this.moveY = null;
                    return;
                }
                let itemHeight = this.state.active.layout.frameHeight;
                let fromIndex = this.order.indexOf(this.state.active.rowData.index);
                let toIndex = this.state.hovering === false ? fromIndex : Number(this.state.hovering);
                let up = toIndex > fromIndex;
                if (up) {
                    toIndex--;
                }
                if (toIndex === fromIndex) return this.setState({active: false, hovering: false});
                let args = {
                    row: this.state.active.rowData,
                    from: fromIndex,
                    to: toIndex
                };

                this.props.onRowMoved && this.props.onRowMoved(args);
                if (this.props._legacySupport) {
                    this.state.active = false;
                    this.state.hovering = false;
                } else {
                    this.setState({active: false, hovering: false});
                }

                let MAX_HEIGHT = Math.max(0, this.scrollContainerHeight - this.listener.height + itemHeight);
                if (this.scrollValue > MAX_HEIGHT) {
                    this.scrollResponder.scrollTo({y: MAX_HEIGHT});
                }
                this.state.active = false;
                this.state.hovering = false;
                this.state.moveY = null;
            }
        })
        this.setOrde(this.props);
    }

    componentDidMount() {
        this.mounted = true;
        setTimeout(() => {
            this.scrollResponder = this.refs.list.getScrollResponder();
        }, 1)
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    /**
     * 自定义方法
     */

    cancel() {
        if (!this.moved) {
            this.setState({
                active: false,
                hovering: false
            });
        }
    }

    getScrollResponde() {
        return this.scrollResponder;
    }

    setOrde(props) {
        this.order = props.order || Object.keys(props.data) || [];
    }

    renderActive() {
        if (!this.state.active) return;
        let index = this.state.active.rowData.index;
        return this.renderRow(this.props.data[index], 's1', index, () => {
        }, {active: true, thumb: true});
    }

    // 获取容器 Layout
    measureWrapper() {
        if (this.refs.wrapper) {
            this.refs.wrapper.measure((frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
                let layout = {frameX, frameY, frameWidth, frameHeight, pageX, pageY};
                this.wrapperLayout = layout;
            });
        }
    }

    scrollAnimation() {
        if (this.mounted && this.state.active) {
            if (this.moveY == undefined) return requestAnimationFrame(this.scrollAnimation.bind(this));
            let SCROLL_OFFSET = this.wrapperLayout.pageY;
            let moveY = this.moveY - SCROLL_OFFSET;
            let SCROLL_LOWER_BOUND = 80;
            let SCROLL_HIGHER_BOUND = this.listLayout.height - SCROLL_LOWER_BOUND;
            let NORMAL_SCROLL_MAX = this.scrollContainerHeight - this.listLayout.height;
            let MAX_SCROLL_VALUE = NORMAL_SCROLL_MAX + (this.state.active.layout.frameHeight * 2);
            let currentScrollValue = this.scrollValue;
            let newScrollValue = null;
            let SCROLL_MAX_CHANGE = 20;

            if (moveY < SCROLL_LOWER_BOUND && currentScrollValue > 0) {
                let PERCENTAGE_CHANGE = 1 - (moveY / SCROLL_LOWER_BOUND);
                newScrollValue = currentScrollValue - (PERCENTAGE_CHANGE * SCROLL_MAX_CHANGE);
                if (newScrollValue < 0) newScrollValue = 0;
            }
            if (moveY > SCROLL_HIGHER_BOUND && currentScrollValue < MAX_SCROLL_VALUE) {
                let PERCENTAGE_CHANGE = 1 - ((this.listLayout.height - moveY) / SCROLL_LOWER_BOUND);
                newScrollValue = currentScrollValue + (PERCENTAGE_CHANGE * SCROLL_MAX_CHANGE);
                if (newScrollValue > MAX_SCROLL_VALUE) newScrollValue = MAX_SCROLL_VALUE;
            }
            if (moveY < SCROLL_HIGHER_BOUND && currentScrollValue > NORMAL_SCROLL_MAX
                && NORMAL_SCROLL_MAX > 0) {
                let PERCENTAGE_CHANGE = 1 - ((this.listLayout.height - moveY) / SCROLL_LOWER_BOUND);
                // pc = PERCENTAGE_CHANGE;

                //newScrollValue = currentScrollValue + (PERCENTAGE_CHANGE * SCROLL_MAX_CHANGE);
            }
            if (newScrollValue !== null) {
                this.scrollValue = newScrollValue;
                //this.scrollResponder.scrollWithoutAnimationTo(this.scrollValue, 0);
                this.scrollResponder.scrollTo({y: this.scrollValue, x: 0, animated: false});
            }
            this.checkTargetElement();
            requestAnimationFrame(this.scrollAnimation.bind(this));
        }
    }

    checkTargetElement() {
        let SLOP = 1.0 // assume rows will be > 1 pixel high
        let scrollValue = this.scrollValue;

        let moveY = this.moveY - this.wrapperLayout.pageY;

        let activeRowY = scrollValue + moveY - this.firstRowY;

        let indexHeight = 0.0;
        let i = 0;
        let row;
        let order = this.order;
        let isLast = false;
        while (indexHeight < activeRowY + SLOP) {
            let key = order[i];
            row = this.layoutMap[key];
            if (!row) {
                isLast = true;
                break;
            }
            indexHeight += row.height;
            i++;
        }
        if (!isLast) i--;

        if (i != this.state.hovering && i >= 0) {
            LayoutAnimation.easeInEaseOut();
            this._previouslyHovering = this.state.hovering;
            this.__activeY = this.panY;
            this.setState({
                hovering: String(i)
            })
        }
    }

    handleRowActive(row) {
        if (this.props.disableSorting) return;
        this.state.pan.setValue({x: 0, y: 0});
        LayoutAnimation.easeInEaseOut();
        this.moveY = row.layout.pageY;
        this.setState({
            active: row,
            hovering: row.rowData.index,
        }, this.scrollAnimation.bind(this));
    }

    _updateLayoutMap(index, layout) {
        if (this.firstRowY === undefined || layout.y < this.firstRowY) {
            this.firstRowY = layout.y;
        }
        this.layoutMap[index] = layout;
    }

    scrollTo(...args) {
        this.scrollResponder.scrollTo.apply(this.scrollResponder, args);
    }

    renderActive() {
        if (!this.state.active) return;
        let index = this.state.active.rowData.index;
        return this.renderRow(this.props.data[index], 's1', index, () => {
        }, {active: true, thumb: true});
    }

    renderActiveDivider() {
        let height = this.state.active ? this.state.active.layout.frameHeight : null
        if (this.props.renderActiveDivider) return this.props.renderActiveDivider(height);
        return <View style={{height: height}}/>
    }

    // 渲染条目
    renderRow(data, section, index, highlightfn, active) {

        let Component = active ? SortRow : Row;
        let isActiveRow = (!active && this.state.active && this.state.active.rowData.index === index);
        if (!active && isActiveRow) {
            active = {active: true};
        }
        let hoveringIndex = this.order[this.state.hovering] || this.state.hovering;
        return (<Component
            {...this.props}
            activeDivider={this.renderActiveDivider()}
            key={index}
            active={active}
            list={this}
            ref={view => {
                this._rowRefs[active ? 'ghost' : index] = view;
            }}
            hovering={hoveringIndex == index}
            panResponder={this.panResponder}
            rowData={{data, section, index}}
            onRowActive={this.handleRowActive.bind(this)}
            onRowLayout={layout => this._updateLayoutMap(index, layout.nativeEvent.layout)}
        />);
    }

    render() {
        let dataSource = this.state.ds.cloneWithRows(this.props.data, this.props.order)
        return <View ref="wrapper" style={{flex: 1}} onLayout={() => {
            this.measureWrapper()
        }}>
            <ListView
                enableEmptySections={true}
                {...this.props}
                {...this.panResponder.panHandlers}
                ref="list"
                dataSource={dataSource}
                onScroll={e => {
                    this.scrollValue = e.nativeEvent.contentOffset.y;
                    if (this.props.onScroll) this.props.onScroll(e);
                }}
                onContentSizeChange={(width, height) => {
                    this.scrollContainerHeight = height;
                }}
                onLayout={(e) => this.listLayout = e.nativeEvent.layout}
                scrollEnabled={!this.state.active && (this.props.scrollEnabled !== false)}
                renderRow={this.renderRow.bind(this)}
            />
            {this.renderActive()}
        </View>
    }

}