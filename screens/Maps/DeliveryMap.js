import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {COLORS} from '../../constants';
import MapViewDirections from 'react-native-maps-directions';
const DeliveryMap = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showUserLocation={true}
        initialRegion={{
          latitude: -1.2446236,
          longitude: 36.6630302,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        <Marker
          coordinate={{
            latitude: -1.2446236,
            longitude: 36.6630302,
          }}
          anchor={{x: 0.5, y: 0.5}}
        />

        <Marker
          coordinate={{
            latitude: -1.2446236,
            longitude: 36.6540302,
          }}
          anchor={{x: 0.5, y: 0.5}}
        />
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
            console.log(result)
          }}
        />
      </MapView>
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
});
export default DeliveryMap;
