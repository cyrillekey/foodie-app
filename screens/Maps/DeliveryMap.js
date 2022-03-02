import { View, Text } from 'react-native'
import React from 'react'
import MapView,{PROVIDER_GOOGLE} from "react-native-maps"
import { COLORS } from '../../constants';
const DeliveryMap = () => {
        const mapView=React.createRef()
        const [region,setRegion] = React.useState(null);
        const [toLoc,setToLoc] = React.useState(null);
        const [fromLoc,setFromLoc] = React.useState(null);
        const [angle,setAngle] = React.useState(0)
        React.useEffect(() => {
            let initialRegion = {
                latitude: 1.5496614931250685,
                longitude: 110.36381866919922,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
            }
    
            let destination = {
                latitude: 1.5496614931250685,
                longitude: 110.36381866919922,
            }
            setToLoc(destination)
            setFromLoc(destination)
            setRegion(initialRegion)
        }, [])
    
  return (
    <View
    style={{
        flex:1,
        borderWidth:2,
    }}
    >
      <MapView
      ref={mapView}
      provider={PROVIDER_GOOGLE}
      initialRegion={region}
      >
    
      </MapView>
    </View>
  )
}

export default DeliveryMap