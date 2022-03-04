/* eslint-disable react-native/no-inline-styles */
import { View, Text,Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS, dummyData, FONTS } from '../../constants';
import { CardItem, FooterTotal, FormInput, Header } from '../../Components';
import { SIZES,icons } from '../../constants';
import { TextIconButton } from '../../Components';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { useSelector } from 'react-redux';
import { getAddressName } from '../../constants/util';
const PlaceOrder = ({navigation}) => {
    const address = useSelector(state=>state.userReducer.address);
    const [form,setForm] = React.useState(<ActivityIndicator/>);
    getAddressName(address.latitude,address.longitude,setForm);
    const card = useSelector(state=>state.userReducer.selectedCard);
    console.log(card);
  return (
    <View
    style={{
        flex:1,
        backgroundColor:COLORS.white,
    }}
    >
        <Header
    navigation={navigation}
    containerStye={{
            height:50,
            marginTop:10,
            alignItems:'center',
            paddingHorizontal:SIZES.padding
    }}
        title="CHECKOUT"
        leftComponent={
            <TextIconButton
            iconLeft={icons.back}
            containerStyle={{
                width:40,
                height:40,
                justifyContent:'center',
                alignItems:'center',
                borderWidth:1,
                borderRadius:SIZES.radius,
                borderColor:COLORS.gray2
            }}
            iconStyle={{
                width:20,
                height:20,
                tintColor:COLORS.gray2,
                marginRight:SIZES.base
            }}
            onPress={()=>{
                navigation.pop()
            }}
            />
        }
    />
    <KeyboardAvoidingScrollView
    contentContainerStyle={{
        flexGrow:1,
        paddingHorizontal:SIZES.padding,
        paddingBottom:20
    }}
    >
        <View>
            <CardItem
            item={card}
            isSelected={true}
            />
        </View>
        <View
        style={{
            marginTop:SIZES.padding
        }}
        onMagicTap={()=>{
            console.log("hello")
        }}
        >
            <Text
            style={{
                ...FONTS.h3
            }}
            >Delivery Address</Text>
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:SIZES.radius,
                paddingVertical:SIZES.radius,
                paddingHorizontal:SIZES.padding,
                borderWidth:2,
                borderRadius:SIZES.radius,
                borderColor:COLORS.lightGray2,
            }}
            >
                <Image
                source={icons.location}
                style={{
                    width:20,
                    height:20,
                    tintColor:COLORS.black,
                }}
                />
                <Text
                style={{
                    ...FONTS.body3,
                    marginLeft:SIZES.radius,
                    width:'85%',
                }}
                >{form}</Text>
            </View>
        </View>
        <View
        style={{
            marginTop:SIZES.padding
        }}
        >
            <Text style={{...FONTS.h3}}>Add Coupon</Text>
            <FormInput
            inputContainerStyle={{
                marginTop:0,
                borderWidth:2,
                borderColor:COLORS.lightGray2,
                paddingRight:0,
                borderRadius:SIZES.radius
            }}
            placeholder="Coupon Code"
            appendComponent={
                <View
                style={{
                    width:60,
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor:COLORS.primary,
                    borderTopRightRadius:SIZES.radius,
                    borderBottomRightRadius:SIZES.radius
                }}
                >
                    <Image
                    source={icons.coupon}
                    style={{
                        width:40,
                        height:40,
                    }}
                    />
                </View>
            }
            />
        </View>
     
    </KeyboardAvoidingScrollView>
    <FooterTotal
    subTotal={120}
    total={500}
    shippingFee={150}
    onPress={()=>navigation.replace("success")}
    />
    </View>
  )
}

export default PlaceOrder;