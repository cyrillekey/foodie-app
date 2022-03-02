import { View, Text, PermissionsAndroid, StyleSheet } from 'react-native'
import React from 'react';
import Geolocation from 'react-native-geolocation-service'
import { COLORS, FONTS, SIZES } from '../../constants';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Header } from '../../Components';

const PickAddress = ({navigation}) => {
    const mapView = React.useRef();
    const [location,setLocation] = React.useState(null);
    const [mark,setMark] = React.useState({
        latitude:0,
        longitude:0
    });
    // const resuesr = async ()=>{
    //     try{
    //         const granted= await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
    //             title:'Foodie Use Location to determine where to deliver food'
    //         });
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
//    resuesr()

    React.useEffect(()=>{
        Geolocation.getCurrentPosition(
            (position) => {
              setLocation({latitude:position.coords.latitude,longitude:position.coords.longitude,latitudeDelta: 0 ,longitudeDelta: 0 });
              setMark({latitude:position.coords.latitude,longitude:position.coords.longitude})
            },
            (error) => {
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        
    },[]);
    console.log(location)
  return (
    <View
    style={{
        flex:1,
        alignItems:'center',
        height:SIZES.height,
        width:SIZES.width,
        backgroundColor:COLORS.white
    }}
    >
        <Header
        title={'Pick Address'}
        isBackPresent={true}
        containerStye={{
            marginTop:SIZES.padding,
            paddingHorizontal:SIZES.padding
        }}
        isCartpresent={false}
        navigation={navigation}
        />
        <MapView
        ref={mapView}
        initialRegion={
            location
        }
        onRegionChangeComplete={(value)=>{
            setMark({latitude:value.latitude,longitude:value.longitude})
        }}
        onPress={(e)=>{
            setMark({latitude:e.nativeEvent.coordinate.latitude,longitude:e.nativeEvent.coordinate.longitude})
        }}
        mapType="standard"
        userInterfaceStyle='dark'
        provider={PROVIDER_GOOGLE}
        style={{
            marginTop:SIZES.padding,
            height:SIZES.height,
            width:SIZES.width
        }}
        showsScale={true}
        showsCompass={true}
        showsIndoors={true}
        showsTraffic={true}
        showsBuildings={true}
        loadingEnabled={true}
        >
            <Marker
                coordinate={mark}
                title="Delivery"
            />
            </MapView>
    </View>
  );
};

export default PickAddress;
