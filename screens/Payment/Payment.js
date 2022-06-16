/* eslint-disable react-native/no-inline-styles */
import { ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import { CardItem, Header, TextButton } from '../../Components';
import { TextIconButton } from '../../Components';
import { SIZES,icons,COLORS, dummyData, FONTS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { saveCard } from '../../stores/user/userActions';
 const Payment = ({navigation})=>{
     const dispatch = useDispatch();
     const cards = useSelector(state=>state.userReducer.paymentMethods);
     const [card,setCard] = React.useState(null);
    return (
      <View
      style={{
          flex:1,
          backgroundColor:COLORS.white,
      }}
      >
        <Header
        navigation={navigation}
        isBackPresent={false}
    containerStye={{
            height:50,
            marginTop:10,
            alignItems:'center',
            paddingHorizontal:SIZES.padding,
    }}
        title="Payment"
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
                borderColor:COLORS.gray2,
            }}
            iconStyle={{
                width:20,
                height:20,
                tintColor:COLORS.gray2,
                marginRight:SIZES.base,
            }}
            onPress={()=>{
                navigation.pop();
            }}
            />
        }
    />
        <ScrollView
        contentContainerStyle={{
            flexGrow:1,
            marginTop:SIZES.radius,
            paddingHorizontal:SIZES.padding,
            paddingBottom:SIZES.radius,
        }}
        >
            <Text
            style={{
                ...FONTS.h3,
                marginLeft:SIZES.radius,
            }}
            >Payment Methods</Text>
            <View>
                {
                cards.map((data,index)=>(
                        <CardItem
                        key={index}
                        item={data}
                        isSelected={data.id == card}
                        onPress={()=>{
                            setCard(data.id);
                        }}
                        />))
                }
            </View>
                <View
                style={{
                    paddingTop:SIZES.radius,
                    paddingBottom:SIZES.padding,
                    paddingHorizontal:SIZES.padding,
                    marginTop:SIZES.padding,
                }}
                >
                    <TextButton
                    buttonContainerStyle={{
                        height:60,
                        borderRadius:SIZES.radius,
                    }}
                    label="Place Your Order"
                    disabled={card === null}
                    onPress={()=>{
                        dispatch(saveCard({id:card}))
                        navigation.navigate('checkout');
                    }}
                    />
                </View>
        </ScrollView>
      </View>
    )
  
}
export default Payment;