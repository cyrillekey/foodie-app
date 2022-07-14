import axios from 'axios';
import PermissionsAndroid, { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
var convert = require('xml-js');
import Toast  from 'react-native-toast-message';
export const getAddressName = async (latitude, longitude,setAdd) => {
return axios
    .get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}`,
    )
    .then(response => {
      setAdd(JSON.parse(convert.xml2json(response.data)).elements[0].elements[0].elements[0].text);
    //  parseString(response.data,(err, result) => {
    //    if (!err){
    //     setAdd(`${result.reversegeocode.addressparts[0].town[0]}, ${result.reversegeocode.addressparts[0].state[0]}, ${result.reversegeocode.addressparts[0].country[0]}`);
    //    }else{
    //      console.log("this type of error")
    //    }
    // });
    })
    .catch(err => {
      universalErrorhandlerWithSnackbar(err);
    });
};

export const askForLocationPermission = async () => {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Foodie Use Location to determine where to deliver food',
      },
    );
  } catch (err) {
  }
};
export const setLocation = ()=>{
   Geolocation.getCurrentPosition(
    (position) => {
      return {latitude:position.coords.latitude,longitude:position.coords.longitude,latitudeDelta: 0 ,longitudeDelta: 0 };
      //  ({latitude:position.coords.latitude,longitude:position.coords.longitude})
    },
    (error) => {
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
);
};
export const getDate = (date)=>{
  var dat = new Date(date);
  var month = '';
  switch (dat.getMonth()) {
    case 0:
      month = 'Jan';
      break;
    case 1:
      month = 'Feb';
      break;
    case 2:
      month = 'Mar';
      break;
    case 3:
      month = 'Apr';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'Jun';
      break;
    case 6:
      month = 'Jul';
      break;
    case 7:
      month = 'Aug';
      break;
    case 8:
      month = 'Sep';
      break;
    case 9:
      month = 'Oct';
      break;
    case 10:
      month = 'Nov';
      break;
    case 11:
      month = 'Dec';
      break;
    default:
      month = dat.getMonth();
      break;
  }
  return `${dat.getDate()} ${month}, ${dat.getHours()}:${dat.getMinutes()}`;
};

export const universalErroHandlerWithAlert = (err,{label = 'Ok',onPress = ()=>{}}) => {
  let message = err?.response?.data?.message ?? 'Something Went Wrong Please Try Again or Contact Support If It Persist';
  Alert.alert('Error',message,[
    {
      text:label,
      onPress:onPress,
    },
  ]);
};
export const universalErrorhandlerWithSnackbar = (err,onPress = ()=>{}) =>{
  let message = err?.response?.data?.message ?? 'Something Went Wrong Please Try Again or Contact Support If It Persist';
  Toast.show({
    position:'bottom',
    text1:'Error',
    text2:message,
    onPress:onPress,
    type:'error',
  });
  console.log(err);
};
