import React from 'react'
import { View ,Text} from 'react-native'
import { TextIconButton } from '.'
import { COLORS, FONTS, icons, SIZES } from '../constants'
const StepperIncrement = ({
    value=1,
    containerStyle,
    onAdd,
    onMinus,
}) => {
  return (
    <View
    style={{
        flexDirection:'row',
        height:60,
        width:130,
        backgroundColor:COLORS.lightGray2,
        borderRadius:SIZES.radius,
        ...containerStyle
    }}
    >
        <TextIconButton
            containerStyle={{
                width:50,
                alignItems:'center',
                justifyComponent:'center'
            }}
            iconLeft={icons.notification}
            iconStyle={{
                height:25,
                width:25,
                tintColor:value>1 ?COLORS.primary : COLORS.gray
            }}

            onPress={{
                onMinus
            }}
        />
        <View
        style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        }}
        >
    <Text
    style={{
        ...FONTS.h2
    }}
    >
        {value}
    </Text>
        </View>
        <TextIconButton
            containerStyle={{
                width:50,
                alignItems:'center',
                justifyComponent:'center'
            }}
            iconRight={icons.cross}
            iconStyle={{
                height:25,
                width:25,
                tintColor:value>1 ?COLORS.primary : COLORS.gray
            }}

            onPress={
                onAdd
            }
        />
    </View>
  )
}

export default StepperIncrement