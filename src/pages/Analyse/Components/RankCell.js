/**
 *   创建人：wangshiyang
 *   联系方式：
 *   创建时间：2017-03-17 11:04
 *   简介：微信支付宝的信息返回
 *   路由：
 *   更改历史：
 *   更改人|更改时间|更改内容|代码位置编号|
 */
'use strict';

import React, {Component} from 'react';
import NumberSize from "./NumberSize";
import {
    StyleSheet,
    View,
    Text,
    Image

} from 'react-native';

/**
 * @mark 文件内变量
 */

//文件内变量结束

export default class RankCell extends React.Component {

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

    }

    /**
     * @mark state
     */



    /**
     * @mark constructor
     */
    constructor(props) {
        super(props);
        var {rank, logoPath, userName, bankName,totalMct} = this.props;
        this.state = {
            index: parseInt(rank),
            rankImg:logoPath,
            name: userName,
            area:bankName,
            rankNum: totalMct+"个",
            indexFont: [
                {key: 0,icon:"paihangjiangpai",color:Theme.color.golden},
                {key: 1,icon:"paihangjiangpai",color:Theme.color.gradual_blue4},
                {key: 2,icon:"paihangjiangpai",color:Theme.color.orange1},
            ]
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
    indexStyle(index){
        if(index<=3){
            var indexIcon=this.state.indexFont[index-1];
            return<FontIcon  style={[styles.index,{color:indexIcon.color}]} size={20} icon={indexIcon.icon}></FontIcon>
        }else{
            return<NumberSize num={index.toString()} />
        }
    }


    /**
     * @mark render
     */
    render() {
        var {index,rankImg, name, area, rankNum} = this.state;
        return<View style={styles.cell}>
                <View style={styles.content}>
                    {this.indexStyle(index)}
                    <Image style={styles.Img}
                           defaultSource={require
                           ("../../../../imgs/ico_store_news_type_1@3x.png")}
                           source={this.state.rankImg==null||this.state.rankImg==""?require("../../../../imgs/pic_my_nophoto@3x.png"):{uri:FS+rankImg}}/>
                </View>
                <View style={styles.rightContent}>
                    <View>
                        <Text style={styles.left_top}>
                            {name}
                        </Text>
                        <Text  style={styles.left_bottom}>
                            {area}
                        </Text>
                    </View>
                    <Text style={styles.rankNum}>{rankNum}</Text>
                </View>
            </View>
    }
}

//@mark style
const styles = StyleSheet.create({
    cell:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop:Theme.padding.less,
        backgroundColor:'white'
    },
    content:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:Theme.padding.less,
        paddingBottom:Theme.padding.less,
        marginRight:Theme.padding.smaller
    },
    index:{
        color:Theme.color.font_content,
        marginRight:Theme.padding.less
    },
    rightContent:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom:Theme.padding.less,
        paddingRight:Theme.padding.smaller,
        width:Theme.size.width*0.78,
        borderColor:Theme.color.line_horizontal,
        borderBottomWidth:Theme.pixel*1,
    },
    Img:{
        width:40,
        height:40,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:"transparent",
        borderRadius:20
    },

    left_top:{
        color:Theme.color.font_content,
        fontSize:Theme.fontSize.larger
    },
    left_bottom:{
        color:Theme.color.font_classify,
        fontSize:Theme.fontSize.base
    },

    rankNum:{
        color:Theme.color.font_content,
        fontSize:Theme.fontSize.max,
        marginRight:Theme.padding.less
    },
});
