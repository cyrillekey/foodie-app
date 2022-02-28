import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'

export default function CardItem({
  item,isSelected,onPress
}) {
  return (
    <TouchableOpacity
    style={{
      flexDirection:'row',
      height:80,
      alignItems:'center',
      marginTop:SIZES.radius,
      paddingHorizontal:SIZES.padding,
      borderWidth:2,
      borderRadius:SIZES.radius,
      borderColor: isSelected ?COLORS.primary :COLORS.lightGray2
    }}
    onPress={onPress}
    >
      <View
      style={{
        width:60,
        height:45,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,
        borderRadius:SIZES.radius,
        borderColor:COLORS.lightGray2
      }}
      >
        <Image
        source={item.icon}
        resizeMode='center'
        style={{
          width:35,
          height:35
        }}
        />
      </View>
      <Text
      style={{
        flex:1,
        marginLeft:SIZES.radius,
        ...FONTS.h3
      }}
      >{item.name}</Text>
      <Image
      source={isSelected ? icons.check_on : icons.check_off}
      style={{
        width:25,
        height:25
      }}
      />
    </TouchableOpacity>
  )
}