
'use strict';

import React, {Component} from "react";
const EventEmitter = require('events');
var uniqueInstance;
class CountEmitter extends EventEmitter {

}
const SingleCountEmitter = new CountEmitter();
export default SingleCountEmitter;
