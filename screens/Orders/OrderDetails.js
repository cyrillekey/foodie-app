import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants';
import { Header } from '../../Components';
import MapView, { PROVIDER_GOOGLE ,Polyline, Marker} from 'react-native-maps';

const OrderDetails = ({navigation}) => {
    console.log(navigation)
  return (
    <View
    style={{
        flex:1,
        backgroundColor:COLORS.white
    }}
    >
        <Header
            title="#4525445"
            containerStye={{
                marginTop:SIZES.padding,
                paddingHorizontal:SIZES.padding
            }}
            isBackPresent={true}
            isCartpresent={false}
            navigation={navigation}
        />
        <MapView
            showsBuildings={true}
            provider={PROVIDER_GOOGLE}
            style={{
                borderRadius:SIZES.padding,
                height:SIZES.height * 0.90,
                marginTop:SIZES.padding
            }}
            region={{
                latitude: -1.244605, longitude: 36.6630327,latitudeDelta:0,longitudeDelta:0
            }}
            maxZoomLevel={14}
            >
            <Marker
            coordinate={{
                latitude: -1.244605, longitude: 36.6630327,latitudeDelta:0,longitudeDelta:0
            }}
            />
            <Marker
            coordinate={{ latitude: -1.244605, longitude: 36.5630327 }}
            pinColor="#00FF00"
            />
            <Polyline
		coordinates={[
			{ latitude: -1.244605, longitude: 36.6630327 },
			{ latitude: -1.244605, longitude: 36.5630327 },
		]}
		strokeColor={COLORS.primary} // fallback for when `strokeColors` is not supported by the map-provider
		strokeColors={[
			'#7F0000',
			'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
			'#B24112',
			'#E5845C',
			'#238C23',
			'#7F0000'
		]}
		strokeWidth={6}
	/>
            </MapView>
        
        <View
        style={{
            position:"absolute",
            bottom:0,
            borderTopLeftRadius:SIZES.radius,
            borderTopRightRadius:SIZES.radius,
            paddingVertical:SIZES.padding,
            backgroundColor:COLORS.white,
            width:'100%'
        }}
        >
            <Text>Hello wordl</Text>
        </View>
    </View>
  );
};

export default OrderDetails;
