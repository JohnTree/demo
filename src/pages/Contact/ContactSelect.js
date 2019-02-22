import React, {Component} from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Modal,
    Text,
    ListView,
    Platform,
    Dimensions,
    StyleSheet,
    Alert,
    TextInput
} from "react-native";
import _ from "lodash";
import data from "./city.json";
const {width, height} = Dimensions.get('window')
const SECTIONHEIGHT = 30, ROWHEIGHT = 40
//这是利用lodash的range和数组的map画出26个英文字母
const letters = _
    .range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1)
    .map(n => String.fromCharCode(n).substr(0))
_.pull(letters, 'O', 'V', 'U')//去掉o和V,这两个下面没有城市
let city = []//城市的数组
var totalheight = [];//每个字母对应的城市和字母的总高度
//把城市放到对应的字母中
for (let j = 0; j < letters.length; j++) {
    let each = []
    for (let i = 0; i < data.CITIES.length; i++) {
        if (letters[j] == data.CITIES[i].name_en.substr(0, 1)) {
            each.push(data.CITIES[i]);
        }
    }
    let _city = {}
    _city.index = letters[j]
    _city.city = each
    city.push(_city)
}

export default class CitySelecter extends Component {
    constructor(props) {
        super(props);
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[rowID];
        };
        let DataSource = new ListView.DataSource({
            getRowData: getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        this.state = {
            dataSource: DataSource,
            originDataSource: DataSource,
            filter: "",
            letters: []
        }
    }

    componentDidMount() {
        this.makeShowDate();
    }

    makeShowDate() {
        let dataBlob = {};
        let sectionIDs = [];
        let rowIDs = [];
        let _letters = [];
        for (let ii = 0; ii < city.length; ii++) {
            let _rowIDs = [];
            for (let j = 0; j < city[ii].city.length; j++) {
                if (this.state.filter && !city[ii].city[j].name.startsWith(this.state.filter))
                    continue;
                var rowName = ii + '-' + j;
                _rowIDs.push(rowName)
                dataBlob[rowName] = city[ii].city[j]
            }
            if (_rowIDs.length === 0)
                continue;
            rowIDs.push(_rowIDs);
            var sectionName = 'Section ' + ii;
            sectionIDs.push(sectionName)
            dataBlob[sectionName] = letters[ii]
            _letters.push(letters[ii]);

            //计算每个字母和下面城市的总高度，递增放到数组中
            // var eachheight = this.props.sectionHeight+this.props.rowHeight*newcity.length
            var eachheight = SECTIONHEIGHT + ROWHEIGHT * city[ii].city.length
            totalheight.push(eachheight)
        }
        this.setState({
            dataSource: this.state.originDataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            letters: _letters
        })
    }

    renderRow(rowData, rowId) {
        return (
            <TouchableOpacity
                key={rowId}
                style={{height: ROWHEIGHT, justifyContent: 'center', paddingLeft: 20, paddingRight: 30}}
                onPress={() => {
                    this.changedata(rowData)
                }}>
                <View style={styles.rowdata}><Text style={styles.rowdatatext}>{rowData.name}</Text></View>

            </TouchableOpacity>
        )
    }

    renderSectionHeader = (sectionData, sectionID) => {
        return (
            <View style={{backgroundColor: "#FFF", height: SECTIONHEIGHT, justifyContent: 'center', paddingLeft: 5}}>
                <Text style={{color: Theme.color.vision_main, fontWeight: 'bold'}}>
                    {sectionData}
                </Text>
            </View>
        )
    }
    // render ringht index Letters
    renderLetters(letter, index) {
        return (
            <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => {
                this.scrollTo(index)
            }}>
                <View style={styles.letter}>
                    <Text style={styles.letterText}>{letter}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    //回调改变显示的城市
    changedata = (cityname) => {
        this.props.changeCity(cityname)
    }

    //touch right indexLetters, scroll the left
    scrollTo = (index) => {
        let position = 0;
        for (let i = 0; i < index; i++) {
            position += totalheight[i]
        }
        this._listView.scrollTo({
            y: position
        })
    }

    renderHelder() {
        return <View style={{
            height: 100,
            width: Theme.size.width - 30,
            marginRight: 20
        }}>
            <Text style={{
                color: Theme.color.vision_main,
                marginTop: Theme.padding.less,
                marginLeft: Theme.padding.less / 2,
                fontSize: Theme.fontSize.base,
                fontWeight: 'bold'
            }}>热门城市</Text>
        </View>
    }

    render() {
        return (
            <View style={[{flex: 1}, this.props.style]}>
                <View style={{
                    flexDirection: "row",
                    width: Theme.size.width,
                    height: 40,
                    backgroundColor: Theme.color.background,
                }}>
                    <TextInput style={{
                        flex: 1,
                        height: 40 - Theme.padding.less,
                        marginLeft: Theme.padding.less,
                        borderWidth: Theme.pixel,
                        borderColor: Theme.color.line_horizontal,
                        backgroundColor: "#FFF",
                        fontSize: Theme.fontSize.base,
                        lineHeight: 30,
                        borderRadius: Theme.size.radius,
                        paddingLeft: Theme.padding.less,
                        marginTop: Theme.padding.less / 2,
                    }}
                               onChangeText={(text) => {
                                   this.state.filter = text;
                               }}/>
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: Theme.padding.less,
                        marginRight: Theme.padding.less
                    }}
                                      onPress={() => {
                                          this.makeShowDate();
                                      }}>
                        <FontIcon size={Theme.fontSize.larger}
                                  icon={"sousuo"}
                                  style={{color: Theme.color.vision_main}}/>
                    </TouchableOpacity>
                </View>
                <ListView
                    contentContainerStyle={styles.contentContainer}
                    ref={listView => this._listView = listView}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSectionHeader={this.renderSectionHeader}
                    enableEmptySections={true}
                    initialListSize={500}
                    renderHeader={this.renderHelder.bind(this)}
                />
                <View style={[styles.letters, this.props.lettersStyle]}>
                    {this.state.letters.map((letter, index) => this.renderLetters(letter, index))}
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    contentContainer: {
        width: width,
        backgroundColor: 'white',
    },
    letters: {
        position: 'absolute',
        top: 0,
        marginTop: 40,
        right: Theme.padding.less / 2,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    letter: {
        height: height * 3.3 / 100,
        width: width * 3 / 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letterText: {
        textAlign: 'center',
        fontSize: height * 1.1 / 50,
        color: Theme.color.vision_main
    },
    rowdata: {
        borderBottomColor: Theme.color.line_horizontal,
        borderBottomWidth: Theme.pixel
    },
    rowdatatext: {
        color: 'gray',
        marginBottom: Theme.padding.less / 2

    }
})