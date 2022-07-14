/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, FlatList } from 'react-native';
import React from 'react';
import { COLORS, dummyData, FONTS, images, SIZES } from '../../constants';
import { FormInput, Header, TextButton } from '../../Components';
import  StarRating from 'react-native-star-rating-widget';

const DriverRatings = ({navigation,route}) => {
    const [ratings,setRatings] = React.useState(0.5);
    const [tip,setTip] = React.useState(1);
  return (
    <View
    style={{
        flex:1,
        backgroundColor:COLORS.white,
    }}
    >
        <Header
        navigation={navigation}
        isBackPresent={true}
        title="Rate Driver"
        containerStye={{
            marginTop:SIZES.padding,
            paddingHorizontal:SIZES.padding,
        }}
        />
        <View
        style={{
            marginTop:SIZES.padding ,
            alignItems:'center',
            justifyContent:'center',
        }}
        >
            <Image source={images.profile}
            resizeMode="center"
            style={{
                height:120,
                width:120,
            }}
            borderRadius={SIZES.padding * 2}
            />
            <Text
            style={{
                marginTop:SIZES.padding,
                ...FONTS.h3,
            }}
            >John Doe</Text>
            <Text
            style={{
                ...FONTS.body3,
                color:COLORS.darkGray,
            }}
            >Delivery Man</Text>
            <Text
            style={{
                ...FONTS.h3,
                color:COLORS.green,
                marginVertical:SIZES.radius,
            }}
            >Order Delivered</Text>
            <Text
            style={{
                ...FONTS.body3,
            }}
            >Please Rate Our Services</Text>
            <StarRating
            rating={ratings}
            onChange={(value)=>{
                setRatings(value);
            }}
            color={COLORS.orange}
            emptyColor={COLORS.lightOrange3}
            style={{
                justifyContent:'center',
                alignSelf:'center',
                marginVertical:SIZES.radius,
            }}
            starSize={40}
            />
        </View>
        <View
        style={{
            marginHorizontal:SIZES.radius,
            marginTop:SIZES.radius,
        }}
        >
            <Text
            style={{
                ...FONTS.h2,
            }}
            >Add Tip</Text>
            <FlatList
            horizontal
            data={dummyData.tips}
            keyExtractor={item=>`${item.id}`}
            renderItem={({item,index})=>(
                <TextButton
                        label={item.value}
                        onPress={()=>setTip(item.id)}
                        buttonContainerStyle={{
                            width:65,
                            height:45,
                            borderRadius:SIZES.radius,
                            borderWidth:1,
                            backgroundColor: tip === item.id ? COLORS.primary : null,
                            margin:SIZES.base,
                            borderColor: tip === item.id ? COLORS.white : COLORS.gray,
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                            color:tip === item.id ? COLORS.white : COLORS.black,
                        }}
                       />
            )}
            />
            <FormInput
            placeholder="Add Review"
            multiLines={true}
            lines = {4}
            />
        </View>
    </View>
  );
};

export default DriverRatings;
