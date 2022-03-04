import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, constants, FONTS, images, SIZES } from '../../constants';
import { TextButton } from '../../Components';

const Success = ({navigation}) => {
  return (
    <View
    style={{
        flex:1,
        paddingHorizontal:SIZES.padding,
        backgroundColor:COLORS.white
    }}
    >
        <View
        style={{
           flex:1,
           alignItems:'center',
           justifyContent:'center' 
        }}
        >
            <Image
            source={constants.onboarding_screens[0].bannerImage}
            resizeMode="contain"
            style={{
                width:150,
                height:150
            }}
            />
            <Text style={{
                marginTop:SIZES.padding,
                ...FONTS.h1
            }}>Congratulations!</Text>
            <Text
            style={{
                textAlign:'center',
                marginTop:SIZES.base,
                ...FONTS.body3,color:COLORS.darkGray
            }}
            >Payment was successfully</Text>
        </View>
        <TextButton
            label="Success"
            buttonContainerStyle={{
                height:55,
                marginBottom:SIZES.padding,
                borderRadius:SIZES.radius
            }}
            onPress={()=>{
                navigation.navigate('Home')
            }}
        />
    </View>
  );
};

export default Success;

