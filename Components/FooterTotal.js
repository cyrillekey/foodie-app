import React from 'react'
import { View ,Text} from 'react-native'
import { LineDivider, TextButton } from '.'
import { COLORS, FONTS, SIZES } from '../constants'
const FooterTotal = ({
    subTotal,
    shippingFee,
    total,
    onPress
}) => {
  return (
    <View>
        <View
        style={{
            padding:SIZES.padding,
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
            backgroundColor:COLORS.white2,

        }}
        >
            <View
            style={{
                flexDirection:'row'
            }}
            >
                <Text
                style={{
                    flex:1,
                    ...FONTS.h3
                }}
                >Subtotal</Text>
                <Text style={{
                    ...FONTS.h3
                }}>{subTotal.toFixed(2)}</Text>
            </View>
            <View
            style={{
                flexDirection:'row',
                marginTop:SIZES.base,
                marginBottom:SIZES.padding
            }}
            >
                <Text style={{
                    flex:1,
                    ...FONTS.body3
                }}>Delivery Fee</Text>
                <Text style={{
                        ...FONTS.h3
                }}>$ {shippingFee.toFixed(2)}</Text>
            </View>
            <LineDivider
            lineStyle={{
                backgroundColor:COLORS.gray2
            }}
            />
            <View
            style={{
                flexDirection:'row',
                marginTop:SIZES.padding
            }}
            >
            <Text style={{
                flex:1,
                ...FONTS.h2,
            }} >Total</Text>
            <Text style={{
                ...FONTS.h2,
            }} >$ {total.toFixed(2)}</Text>
            </View>
            <TextButton
            label="Proceed"
            buttonContainerStyle={{
                height:60,
                marginTop:SIZES.padding,
                borderRadius:SIZES.radius,
            }}
            onPress={
                onPress}
            />
        </View>
    </View>
  )
}

export default FooterTotal