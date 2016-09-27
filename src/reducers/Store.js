
var ActionsTypes = require( '../actions/ActionsTypes');

/**
 * [Store description]
 * @param {[type]} state    []
 * @param {[type]} action   [description]
 * @returns {[null]} null
 */
function Store(state ={
        set:{
          loading:0,
        },
        get:{
          loading:0,
        },
        data:{
        }
      } , action) {

  var stateTemp = state;
  switch (action.type) {
    case ActionsTypes.STORE_SET:{
      stateTemp = Object.assign({}, state);
      switch (action.subtype) {
        case ActionsTypes.REQUEST_SUBTYPE.REQUEST:
          stateTemp.set.loading++;
          return  stateTemp ;
        case ActionsTypes.REQUEST_SUBTYPE.SUCCESS:
          if (stateTemp.set.loading>0) {stateTemp.set.loading--;}
          return  stateTemp ;
        case ActionsTypes.REQUEST_SUBTYPE.ERROR:
          if (stateTemp.set.loading>0) {stateTemp.set.loading--;}
          return  stateTemp ;
        default:
          return state;
      }
    }
    case ActionsTypes.STORE_GET:{
      stateTemp = Object.assign({}, state);
      switch (action.subtype) {
        case ActionsTypes.REQUEST_SUBTYPE.REQUEST:
          stateTemp.get.loading++;
          return  stateTemp ;
        case ActionsTypes.REQUEST_SUBTYPE.SUCCESS:
          if (stateTemp.get.loading>0) {stateTemp.get.loading--;}
          if (action.data) {
              stateTemp.data[action.data.key]=action.data.res;
          }
          return  stateTemp ;
        case ActionsTypes.REQUEST_SUBTYPE.ERROR:
          if (stateTemp.get.loading>0) {stateTemp.get.loading--;}
          return  stateTemp ;
        default:
          return state;
      }
    }
    default:
      // Debug.log('ServerConnection:unknown type:'+action.type);
      return state
  }
}


module.exports= Store;
