import { ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import { CardItem, Header, TextButton } from '../../Components';
import { TextIconButton } from '../../Components';
import { SIZES,icons,COLORS, dummyData, FONTS } from '../../constants';
 const Payment=({navigation})=>{
  
    return (
      <View
      style={{
          flex:1,
          backgroundColor:COLORS.white
      }}
      >
        <Header
        navigation={navigation}
        isBackPresent={false}
    containerStye={{
            height:50,
            marginTop:10,
            alignItems:'center',
            paddingHorizontal:SIZES.padding
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
        <ScrollView
        contentContainerStyle={{
            flexGrow:1,
            marginTop:SIZES.radius,
            paddingHorizontal:SIZES.padding,
            paddingBottom:SIZES.radius
        }}
        >
            <Text
            style={{
                ...FONTS.h3,
                marginLeft:SIZES.radius
            }}
            >Payment Methods</Text>
            <View>
                {
                    dummyData.allCards.map((data,index)=>(
                        <CardItem
                        item={data}
                        isSelected={false}
                        />))
                }
            </View>
                <View
                style={{
                    paddingTop:SIZES.radius,
                    paddingBottom:SIZES.padding,
                    paddingHorizontal:SIZES.padding
                }}
                >
                    <TextButton
                    buttonContainerStyle={{
                        height:60,
                        borderRadius:SIZES.radius,
                        
                    }}
                    label="Place Your Order"
                    disabled={false}
                    onPress={()=>{navigation.navigate('checkout')}}
                    />
                </View>
        </ScrollView>
      </View>
    )
  
}
export default Payment;