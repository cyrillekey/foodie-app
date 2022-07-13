/* eslint-disable react-native/no-inline-styles */
import { View, Text} from 'react-native';
import React from 'react';
import { COLORS, FONTS, SIZES} from '../../constants';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Header, TextButton } from '../../Components';
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '../../stores/user/userActions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { universalErrorhandlerWithSnackbar } from '../../constants/util';
const PickAddress = ({navigation}) => {
    const mapView = React.useRef();
    const address = useSelector(state=>state.userReducer.address);
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
        backgroundColor:COLORS.white,
    }}
    >
        <Header
        title={'Pick Address'}
        isBackPresent={true}
        containerStye={{
            marginTop:SIZES.padding,
            paddingHorizontal:SIZES.padding,
        }}
        isCartpresent={false}
        navigation={navigation}
        />
         <View style={{
                flexDirection:'row',
                height:50,
                alignItems:'center',
                marginHorizontal:SIZES.padding,
                paddingHorizontal:SIZES.radius,
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.lightGray2,
                position:'absolute',
                top:80,
                zIndex:1,
                width:'90%',
            }}>
                <GooglePlacesAutocomplete
            placeholder="Search"
            styles={{
                marginTop:SIZES.padding,
            }}
            textInputProps={{
                style:{marginLeft:SIZES.radius,
                    color:'black',
                    ...FONTS.body3,
                flex:1},
                placeholderTextColor:COLORS.black,
            }}
            query={{
                key: '',
                language: 'en',
              }}
              onFail={(e)=>{universalErrorhandlerWithSnackbar(e);}}
        />
            </View>
        <MapView
        ref={mapView}
        initialRegion={
            location
        }
        onRegionChangeComplete={(value)=>{
            setMark({latitude:value.latitude,longitude:value.longitude});
            setLocation(value);
        }}
        onPress={(e)=>{
            setMark({latitude:e.nativeEvent.coordinate.latitude,longitude:e.nativeEvent.coordinate.longitude});
            setLocation({latitude:e.nativeEvent.coordinate.latitude,longitude:e.nativeEvent.coordinate.longitude,latitudeDelta:0.02,longitudeDelta:0.02});
        }}
        mapType="standard"
        userInterfaceStyle="dark"
        provider={PROVIDER_GOOGLE}
        style={{
            height:SIZES.height * 0.90,
            width:SIZES.width,
            marginBottom:SIZES.padding,
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
            borderTopRightRadius:SIZES.padding,
            backgroundColor:COLORS.white,
            width:'100%',
            bottom:0,
            position:'absolute',
        }}
        >
        <Text style={{
            ...FONTS.h3,
            textAlign:'center',
        }}>Pick Delivery Location</Text>
        <TextButton
            buttonContainerStyle={{
                marginTop:SIZES.base * 2,
                height:45,
                borderRadius:SIZES.radius,
                marginBottom:SIZES.base,
            }}
            label="Pick Delivery Location"
            onPress={()=>{
                dispatch(saveAddress(location));
                navigation.pop();
            }}
        />
        </View>
    </View>
  );
};

export default PickAddress;
