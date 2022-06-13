/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View,Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { OrderItem, TextButton } from '../../Components';
import { COLORS, FONTS, SIZES } from '../../constants';
const Orders = (navigation) => {
const [isHistory,setIsHistory] = React.useState(true);
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
        marginTop:SIZES.radius,
      }}
      >
        <TextButton
        label="History"
        onPress={()=>{
          setIsHistory(true);
        }}
        buttonContainerStyle={{
          height:45,
          borderRadius:SIZES.radius,
          width:150,
          backgroundColor:isHistory ? COLORS.primary : COLORS.lightOrange2,
        }}
        labelStyle={{
          color: isHistory ? COLORS.white :  COLORS.primary,
        }}
        />
        <TextButton
        label="Upcoming"
        onPress={()=>{
          setIsHistory(false);
        }}
        buttonContainerStyle={{
          height:45,
          borderRadius:SIZES.radius,
          width:150,
          backgroundColor: isHistory ? COLORS.lightOrange2 : COLORS.primary,
        }}
        labelStyle={{
          color: isHistory ? COLORS.primary :COLORS.white,
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
          ...FONTS.body3,
        }}
        >19 Sep 2021</Text>
        <OrderItem
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
};

export default Orders;