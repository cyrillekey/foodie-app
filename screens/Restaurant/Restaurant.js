import React from 'react'
import { View ,Text} from 'react-native'
import { FONTS } from '../../constants'
const Restaurant = () => {
  return (
    <View>
        <Text
        style={{
            ...FONTS.body3
        }}
        >Restaurant</Text>
    </View>
  )
}

export default Restaurant