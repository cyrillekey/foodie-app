import React from 'react'
import { View,Text } from 'react-native'
import { FONTS } from '../../constants'
const Orders = () => {
  return (
    <View
    style={{
        flex:1,
        alignItems:'center',
        alignContent:'center'
    }}
    >
        <Text
        style={{
            ...FONTS.body4
        }}
        >Orders</Text>
    </View>
  )
}

export default Orders