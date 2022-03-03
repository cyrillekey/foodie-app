/* eslint-disable react-native/no-inline-styles */
import { View, Text, PermissionsAndroid, StyleSheet } from 'react-native'
import React from 'react';
import Geolocation from 'react-native-geolocation-service'
import { COLORS, FONTS, SIZES } from '../../constants';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Header, TextButton } from '../../Components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '../../stores/user/userActions';
const PickAddress = ({navigation}) => {
    const mapView = React.useRef();
    const address= useSelector(state=>state.userReducer.address);
    const [location,setLocation] = React.useState(address);
    const [mark,setMark] = React.useState({
        latitude:address.latitude,
        longitude:address.longitude,
    });
    const dispatch = useDispatch();
  return (
    <View
    style={{
        flex:1,
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
            setLocation(value)
        }}
        onPress={(e)=>{
            setMark({latitude:e.nativeEvent.coordinate.latitude,longitude:e.nativeEvent.coordinate.longitude})
            setLocation({latitude:e.nativeEvent.coordinate.latitude,longitude:e.nativeEvent.coordinate.longitude,latitudeDelta:0,longitudeDelta:0})
        }}
        mapType="standard"
        userInterfaceStyle='dark'
        provider={PROVIDER_GOOGLE}
        style={{
            marginTop:SIZES.base,
            height:SIZES.height*0.90,
            width:SIZES.width,
            marginBottom:SIZES.padding
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
        <View
        style={{
            padding:SIZES.padding,
            borderTopLeftRadius:SIZES.padding,
            borderTopRightRadius:SIZES.paddings,
            backgroundColor:COLORS.white,
            position:"absolute",
            width:'100%',
            bottom:0
        }}
        >
        <Text style={{
            ...FONTS.h3,
            textAlign:'center'
        }}>Pick Delivery Location</Text>
        <TextButton
            buttonContainerStyle={{
                marginTop:SIZES.padding,
                height:45,
                borderRadius:SIZES.radius,
                marginBottom:SIZES.padding
            }}
            label="Pick Delivery Location"
            onPress={()=>{
                dispatch(saveAddress(location))
                navigation.pop()
            }}
        />
        </View>
    </View>
  );
};

export default PickAddress;
