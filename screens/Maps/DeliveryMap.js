import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import MapView,{PROVIDER_GOOGLE,Marker} from "react-native-maps"
import { COLORS } from '../../constants';
const DeliveryMap = () => {
  return (
    <View style={styles.mapcontainer}>
   <MapView
       provider={PROVIDER_GOOGLE}
       style={styles.map}
       showUserLocation={true} >
   </MapView>
</View>
  )
}
const styles = StyleSheet.create({
  mapcontainer: {
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
  },
  map: {
        ...StyleSheet.absoluteFillObject,
  },
})
export default DeliveryMap