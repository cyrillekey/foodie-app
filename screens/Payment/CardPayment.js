/* eslint-disable react-native/no-inline-styles */
import { View, Text, ImageBackground ,Image} from 'react-native'
import React from 'react';
import { FormInput, Header, TextButton, TextIconButton } from '../../Components';
import { COLORS, dummyData, FONTS, icons, images, SIZES } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const CardPayment = ({navigation}) => {
    const [card,setCard] = React.useState({
        card_number:'',
        card_name:'',
        card_month:'',
        card_year:'',
        card_cvc:'',
    });
  return (
    <View
    style={{
        flex:1,
        backgroundColor:'#fff',
    }}
    >
    <Header
    navigation={navigation}
    isBackPresent={true}
    isCartpresent={false}
    title="Card Payment"
    containerStye={{
        height:50,
        marginTop:10,
        alignItems:'center',
        paddingHorizontal:SIZES.padding,
    }}
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
        onPress={
            ()=>{
                navigation.pop();
            }
        }
        />
    }
    />
    <KeyboardAwareScrollView
    keyboardDismissMode="on-drag"
    contentContainerStyle={{
        flexGrow:1,
        paddingHorizontal:SIZES.padding * 0.5,
    }}
    ><ImageBackground
    source={images.card}
    style={{
        height:200,
        width:"100%",
        marginTop:SIZES.radius,
        borderRadius:SIZES.radius,
        overflow:'hidden'
    }}
    >
        <Image
        source={dummyData.allCards[0].icon}
        resizeMode="contain"
        style={{
            position:'absolute',
            top:20,
            right:20,
            height:40,
            width:80,
        }}
        />
        <View
        style={{
            position:'absolute',
            bottom:10,
            left:0,
            right:0,
            paddingHorizontal:SIZES.padding
        }}
        >
            <Text
            style={{
                ...FONTS.h3,
                color:COLORS.white,
            }}
            >{card.card_name}</Text>
            <View
            style={{
                flexDirection:'row',
                justifyContent:'space-between',
            }}
            >
            <Text
            style={{
              flex:1,
              ...FONTS.body3,
              color:COLORS.white,
            }}
            >{card.card_number}</Text>
            <Text
            style={{
                ...FONTS.body3,
                color:COLORS.white,
            }}
            >12/35</Text>
            </View>
        </View>
    </ImageBackground>
    <View
    style={{
        marginTop:SIZES.padding * 2,
    }}
    >
        <FormInput
        label="Card Number"
        keyboardType="number-pad"
        onChange={(value)=>{
            setCard({...card,card_number:value.replace(/\s/g,'').replace(/(\d{4})/g,'$1 ').trim()});
        }}
        />
        <FormInput
        label="Cardholder Name"
        containerStyle={{
            marginTop:SIZES.padding,
        }}
        onChange={(value)=>{
            setCard({...card,card_name:value});
        }}
        />
        <View
        style={{
            flexDirection:'row',
            marginTop:SIZES.radius,
        }}
        >
            <FormInput
            label="Expiry Date"
            placeholder="MM/YY"
            containerStyle={{
                flex:1,
            }}
            />
            <FormInput
            label="CVC"
            placeholder="145"
            containerStyle={{
                flex:1,
                marginLeft:SIZES.radius,
            }}
            onChange={
                (value)=>{
                    setCard({...card,card_cvc:value});
                }
            }
            />
        </View>
    </View>
    </KeyboardAwareScrollView>
    <View
    style={{
        padding:SIZES.radius,
        paddingBottom:SIZES.padding,
        paddingHorizontal:SIZES.padding,
    }}
    >
        <TextButton
        label="Add Card"
    buttonContainerStyle={{
        height:60,
        borderRadius:SIZES.radius,

    }}
        />
    </View>
    </View>
  );
};

export default CardPayment;
