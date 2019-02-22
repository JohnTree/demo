/**
 *   Created by wangshiyang on 2017/2/15.
 *
 */

'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';
import {List, ListItem} from "react-native-elements";
import Platform from "Platform";

class LoginSecond extends Component {

    constructor(props) {
        super(props);
       this.state = {
            loaded: false,
            userName:DataBus.get("user"),
            pswd:DataBus.get("pswd"),
            mctId:DataBus.get("mctId"),
        }
    }
    _clickItem(mctId){
        Ajax("authMctLoginController/authMctLogin.do",
            {"loginId": this.state.userName, "pwd":this.state.pswd, "mctId":mctId}).then(v => {
            if (true === v.success) {
                // console.warn( JSON.stringify(v))
                Actions.root()
            } else {
                console.warn(JSON.stringify(v));
            }
        }).catch(e => {

        });

    }
    render() {
        var  _list = [];
        _list = DataBus.get("data");
        return (
            <View style={styles.navBarStyle}>
                <List containerStyle={styles.listStyle}>
                    {
                        _list.map((l, i) => (
                            <ListItem
                                hideChevron={false}
                                roundAvatar
                                avatar={{uri:FS +l.mctLogoUrl}}
                                key={i}
                                titleStyle={styles.listItem}
                                onPress ={() =>this._clickItem(l.mctId)}
                                title={l.mctName}
                            />
                        ))
                    }
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    navBarStyle: {
        marginTop: Theme.navigationBar.barHeight,
        backgroundColor: Theme.color.background,

    },
    listStyle: {
        marginTop: 0,
        backgroundColor: "white",
        borderBottomWidth: 0,
    },
    listItem: {
        fontSize:Theme.fontSize.max,
    },

});

export default LoginSecond;
