// @flow
// var _ = require('lodash')
var RDActionsTypes = require('./RDActionsTypes');

var Debug = require('../Util/Debug');
/*
 * action creators
 */

class RDActions{
  constructor(){
    // this.name = name;
    // this.sortName = name.slice(0,name.indexOf('Actions'));
    this.init();
  }

  init(){
    Object.keys(RDActionsTypes).forEach((groupKey)=>{
      if (groupKey === 'constants') { return;}
      Object.keys(RDActionsTypes[groupKey]).forEach((key)=>{
        if (key === 'constants') { return;}
        var typeString = RDActionsTypes[groupKey][key];
        // create function
        if (!this[groupKey]) {this[groupKey] = {}}
        this[groupKey][key] = function(data) {
                Debug.log(groupKey +':'+key);
                return { type: typeString,subtype:RDActionsTypes.constants.REQUEST_SUBTYPE.SUCCESS, data:data };
              };
        this[groupKey][key+'OnRequest'] = function(data) {
                Debug.log(groupKey +':'+key+'OnRequest');
                return { type: typeString,subtype:RDActionsTypes.constants.REQUEST_SUBTYPE.REQUEST, data:data };
              };
        this[groupKey][key+'OnResult'] = function(subtype,data) {
                Debug.log(groupKey +':'+key+'OnResult');
                return { type: typeString,subtype:subtype, data:data };
              };
        this[groupKey][key+'OnError'] = function(data) {
                Debug.log(groupKey +':'+key+'OnError');
                return { type: typeString,subtype:RDActionsTypes.constants.REQUEST_SUBTYPE.ERROR, data:data };
              };
      })
    });
    return this;
  }
}

module.exports= new RDActions();
