import axios from 'axios';
import PermissionsAndroid from 'react-native';
import Geolocation from 'react-native-geolocation-service';
var convert = require('xml-js');
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
      console.log(err);
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
    console.log(err);
  }
};
export const setLocation = ()=>{
   Geolocation.getCurrentPosition(
    (position) => {
      return {latitude:position.coords.latitude,longitude:position.coords.longitude,latitudeDelta: 0 ,longitudeDelta: 0 };
      //  ({latitude:position.coords.latitude,longitude:position.coords.longitude})
    },
    (error) => {
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
);
};
