/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View,Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { OrderItem, TextButton } from '../../Components'
import { COLORS, FONTS, SIZES } from '../../constants'
const Orders = (navigation) => {
  return (
    <View
    style={{
        flex:1,
    }}
    >
      <View
      style={{
        flexDirection:'row',
        paddingHorizontal:SIZES.padding,
        justifyContent:'space-between',
        marginTop:SIZES.radius
       
      }}
      >
        <TextButton
        label="History"
        buttonContainerStyle={{
          height:45,
          borderRadius:SIZES.radius,
          width:150
        }}
        />
        <TextButton
        label="Upcoming"
        buttonContainerStyle={{
          height:45,
          borderRadius:SIZES.radius,
          width:150,
          backgroundColor:COLORS.lightOrange2
        }}
        labelStyle={{
          color:COLORS.primary
        }}
        />
      </View>
      <ScrollView
      style={{
        marginTop:SIZES.padding ,
        paddingHorizontal:SIZES.padding,
      }}
      >
        <Text
        style={{
          ...FONTS.body3
        }}
        >19 Sep 2021</Text>
        <OrderItem
          navigation={navigation}
        />
      </ScrollView>
    </View>
  )
}

export default Orders