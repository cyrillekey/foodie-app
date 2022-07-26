/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet,Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {COLORS, FONTS, icons, images, SIZES} from '../../constants';
import MapViewDirections from 'react-native-maps-directions';
import { ShimmerWrapper, TextIconButton } from '../../Components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { getAddressName, universalErrorhandlerWithSnackbar } from '../../constants/util';
const DeliveryMap = ({navigation,route}) => {
  const order_id = (route.params.order_id);
  const token = useSelector(state=>state.userReducer.jwtToken);
  const [order,setOrder] = React.useState({});
  const [courier,setCourier] = React.useState({});
  const [isLoading,setisLoading] = React.useState(true);
  const [address,setAddress] = React.useState(<ActivityIndicator/>);
  React.useEffect(()=>{
        axios({
            url:`customer/get-order-details/${order_id}`,
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
        }).then(response=>{
            if (response.status === 200){
                setOrder(response.data);
                setisLoading(false);
            }
        }).catch(err=>{
            universalErrorhandlerWithSnackbar(err);
            setisLoading(false);
        });
        get_courier_details();
        getAddressName(order.latitude,order.longitude,setAddress);
// eslint-disable-next-line react-hooks/exhaustive-deps
},[order_id,token]);
const get_courier_details = () =>{
  axios({
    url:`/customer/get-courier-details/${order?.courier?.courier_id}`,
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`,
    },
  }).then(response=>{
    setCourier(response.data);
  }).catch(err=>{
    universalErrorhandlerWithSnackbar(err);
  }
  );
};
  return (
    <View
      style={{
        flex: 1,
      }}>
        {
          isLoading === true ?
          <ShimmerWrapper
          style={styles.map}
          />
          :
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showUserLocation={true}
        initialRegion={{
          latitude:order?.currentLatitude ?? -1.2446236,
          longitude: order?.currentLongitude ?? 36.6630302,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        <Marker
          coordinate={{
            latitude: order?.currentLatitude ?? -1.2446236,
            longitude: order?.currentLongitude ?? 36.6630302,
          }}
          anchor={{x: 0.5, y: 0.5}}
        />
         {
          order?.courier !== null ?  <Marker
          coordinate={{
            latitude: (order?.courier?.currentLatitude),
            longitude: (order?.courier?.currentLongitude),
          }}
          anchor={{x: 0.5, y: 0.5}}
        /> : null
        }
        <MapViewDirections
          origin={{
              latitude: -1.2446236,
              longitude: 36.6630302,
            }}
          destination={{
            latitude: -1.2446236,
            longitude: 36.6540302,
          }}
          apikey={'AIzaSyDWR7R8I0jiBnleKRKLVb6r8vr2WrCBClQ'}
          strokeWidth={5}
          strokeColor={COLORS.primary}
          optimizeWaypoints={true}
          onReady={result=>{
            console.log(result);
          }}
          onError={
            (err)=>{
              Toast.show({
                type:'error',
                position:'bottom',
                text1:'Failed',
                text2:err,
              });
            }
          }
        />
      </MapView>
  }
      <>
      <TextIconButton
      iconLeft={icons.back}
      containerStyle={{
        position:'absolute',
        top: SIZES.padding * 2,
        left:SIZES.padding,
        ...styles.buttonStyle,
      }}
      iconStyle={{
        width:20,
        height:20,
        tintColor:COLORS.gray2,
      }}
      onPress={()=>navigation.pop()}
      />
      </>
      <View
      style={{
        position:'absolute',
        top:SIZES.padding * 2,
        right:SIZES.padding,
      }}
      >
        <TextIconButton
        iconLeft={icons.location_pin}
        containerStyle={{
          ...styles.buttonStyle,
        }}
        iconStyle={{
          width:20,
          height:20,
          tintColor: COLORS.gray,
        }}
        />
        <TextIconButton
        iconLeft={icons.location}
        containerStyle={{
          ...styles.buttonStyle,
        }}
        iconStyle={{
          width:20,
          height:20,
          tintColor:COLORS.gray,
        }}
        />
      </View>
      <View
      style={{
        position:'absolute',
        bottom:0,
        width:'100%',
      }}
      >
        <View
        style={{
          padding:SIZES.padding,
          borderTopLeftRadius:30,
          borderTopRightRadius:30,
          backgroundColor:COLORS.white,
        }}
        >
          <View
          style={{
            flexDirection:'row',
            alignItems:'center',
          }}
          >
            <Image
            source={icons.clock}
            style={{
              width:40,
              height:40,
              tintColor:COLORS.black,
            }}
            />
            <View
            style={{
              marginLeft:SIZES.padding,
            }}
            >
              <Text
              style={{
                ...FONTS.body4,
                color:COLORS.gray,
              }}
              >Your Order Will be delivered in</Text>
              <Text style={{...FONTS.h3}}>12 Minutes</Text>
            </View>
          </View>
          <View
          style={{
            flexDirection:'row',
            alignItems:'center',
            marginTop:SIZES.padding,
          }}
          >
            <Image
            source={icons.location}
            style={{
              width:40,
              height:40,
              tintColor:COLORS.black,
            }}
            />
            <View
            style={{
              marginLeft:SIZES.padding,
            }}
            >
              <Text
              style={{
                ...FONTS.body3,
                color:COLORS.gray,
              }}
              >Your Address</Text>
              <Text
              style={{
                ...FONTS.h3,
              }}
              >{address}</Text>
            </View>
          </View>
          <TouchableOpacity
          style={{
            flexDirection:'row',
            height:70,
            marginTop:SIZES.padding,
            borderRadius:SIZES.radius,
            paddingHorizontal:SIZES.padding,
            alignItems:'center',
            justifyContent:'space-between',
            backgroundColor:COLORS.primary,
          }}
          >
            <Image
            source={ courier?.profile_picture ? {uri:courier?.profile_picture} : images.placeholder}
            style={{
              width:40,
              height:40,
              borderRadius:5,
            }}
            />
            <View>
              <Text>{courier?.user_name}</Text>
              <Text>{courier?.user_phone}</Text>
            </View>
            <Image
            source={icons.call}
            style={{
              width:40,
              height:40,
              borderRadius:5,
              borderColor:'#fff',
              borderWidth:1,
            }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mapcontainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonStyle:{
    width:40,
    height:40,
    borderRadius:SIZES.radius,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:COLORS.gray2,
    backgroundColor:COLORS.white,
  },
});
export default DeliveryMap;
