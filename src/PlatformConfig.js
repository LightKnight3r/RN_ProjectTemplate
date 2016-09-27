
import {Platform, Dimensions} from 'react-native';

var RNFS = require('react-native-fs');
var ExtraDimensions = require('react-native-extra-dimensions-android');
var widthScreen = Dimensions.get('window').width;
var heightScreen = Dimensions.get('window').height;

// console.log('RNFS.DocumentDirectoryPath' )
// console.log(RNFS.DocumentDirectoryPath )
// console.log(RNFS.MainBundlePath )

/**
 * [processAssetIos description]
 * @param {[type]} assets    [description]
 * @param {[type]} mapAssets [description]
 */
function processAssetIos(assets,mapAssets,parentPath='assets', hasAssetsDir = false){
  var retObj={};

  Object.keys(assets).forEach((key)=>{
    var obj1 = assets[key];
    if (typeof obj1 === 'object') {
      retObj[key] = processAssetIos(obj1,mapAssets,parentPath+'/'+key, hasAssetsDir);
    }else{
      const uri = 'file://'+RNFS.DocumentDirectoryPath+'/assets/'+parentPath +'/'+key;
      const obj = {
        uri: uri,
        isStatic: true
      }

      if (mapAssets[key]) {
        retObj[mapAssets[key]] = hasAssetsDir ? obj : assets[key];
      }
      retObj[key] = hasAssetsDir ? obj : assets[key];
    }
  });

  return retObj;
}




/**
 * [processAssetAndroid description]
 * @param {[type]} assets    [description]
 * @param {[type]} mapAssets [description]
 */
function processAssetAndroid(assets,mapAssets,assetsContent={},parentPath='assets'){

  var retObj={};

  Object.keys(assets).forEach((key)=>{
    var obj1 = assets[key];
    if (typeof obj1 === 'object') {
      retObj[key] = processAssetAndroid(obj1,mapAssets,assetsContent,parentPath+'_'+key.toLowerCase());
    }else{
      if (mapAssets[key]) {
        if (assetsContent[parentPath+'_'+key.toLowerCase()]) {
          retObj[mapAssets[key]] = {uri:'file://'+assetsContent[parentPath+'_'+key.toLowerCase()].path,isStatic:true};
          retObj[key] = {uri:'file://'+assetsContent[parentPath+'_'+key.toLowerCase()].path,isStatic:true};
        }else{
          retObj[mapAssets[key]] = {uri:parentPath+'_'+key.toLowerCase(),isStatic:true};
          retObj[key] = {uri:parentPath+'_'+key.toLowerCase(),isStatic:true};
        }
      }else{
        if (assetsContent[parentPath+'_'+key.toLowerCase()]) {
          retObj[key] = {uri:'file://'+assetsContent[parentPath+'_'+key.toLowerCase()].path,isStatic:true};
        }else{
          retObj[key] = {uri:parentPath+'_'+key.toLowerCase(),isStatic:true};
        }

      }
    }
  });
  return retObj;
}

const PlatformConfig = {
  ...Platform.select({
    ios:{
      availableHeightScreen:heightScreen,
      videoWidth: widthScreen<heightScreen? heightScreen:widthScreen,
      navBarHeight: 44,
      font: 'Roboto-Regular',
      fontBold: 'Roboto-Bold',
      token: {
        APNTokenWait:true,
        APNToken:'',
      },
      hybridVersion:'0.0.1',
      processAsset:processAssetIos,
    },
    android:{
      availableHeightScreen: heightScreen-(ExtraDimensions.get('STATUS_BAR_HEIGHT')),
      videoWidth: widthScreen<heightScreen? heightScreen + ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT'):widthScreen,
      navBarHeight: 50,
      font: 'roboto-regular',
      fontBold: 'roboto-bold',
      token: {
        GCMTokenWait:true,
        GCMToken:'',
      },
      hybridVersion:'0.3.1',
      processAsset:processAssetAndroid,
    }
  }),
}

export default PlatformConfig;
