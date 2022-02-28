import { View, Text ,Image} from 'react-native'
import React from 'react'
import { COLORS, FONTS, images, SIZES } from '../constants'
import { TextButton } from '.'

const OrderItem = ({
    name,
    price,
    date,qty,status
}) => {
  return (
    <View
        style={{
            height:140,
            backgroundColor:COLORS.lightGray2,
            marginTop:SIZES.radius,
            paddingHorizontal:SIZES.base,
            borderRadius:SIZES.radius,
        }}
    >
      <View
      style={{
          flex:1,flexDirection:'row'
      }}
      >
          <View>
              <Image
              source={images.profile}
              style={{
                  height:50,
                  width:50,
                  marginTop:SIZES.base,
                  borderRadius:SIZES.radius
              }}
              />
          </View>
          <View
            style={{
                flex:1,
                marginTop:SIZES.base,
                paddingHorizontal:SIZES.radius,
            }}
          >
              <Text
              style={{
                  ...FONTS.h2
              }}
              >Pizza Hut</Text>
              <Text
              style={{
                  ...FONTS.body3,
                  color:COLORS.gray
              }}
              >
                  19 Sep, 14:40</Text>
              <Text
              style={{
                  marginTop:4,
                  ...FONTS.body4,
                  color:COLORS.green,
              }}
              >Order Delivered</Text>
          </View>
          <View
          style={{
              marginTop:SIZES.base
          }}
          >
              <Text
              style={{
                  ...FONTS.h3,
                  color:COLORS.primary
              }}
              >$35.20</Text>
          </View>
      </View>
      <View
      style={{
          flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:SIZES.radius
      }}
      >
          <TextButton
            buttonContainerStyle={{
                height:40,
                borderRadius:SIZES.radius,
                width:130
            }}
            label="Re-Order"
          />
            <TextButton
            buttonContainerStyle={{
                height:40,
                borderRadius:SIZES.radius,
                width:130,
                backgroundColor:COLORS.lightOrange2
            }}
            labelStyle={{
                color:COLORS.primary
            }}
            label="Rate"
          />
      </View>
    </View>
  )
}

export default OrderItem