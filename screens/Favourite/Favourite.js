/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Text,
    View,FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { FONTS ,SIZES} from '../../constants';
import { HorizontalFoodCard } from '../../Components';

const Favourite = (navigation) => {
    const favourite = useSelector(state=>state.productReducer.favourites);
    return (
        <View
        style={{
            flex:1,
        }}
        >
            <View
            style={{
                marginTop:SIZES.padding,
                marginBottom:SIZES.padding,
            }}
            >
            <Text style={{
                ...FONTS.h2,
                textAlign:'center',
            }}>Favourites</Text>
            </View>
            <FlatList
                data={favourite}
                keyExtractor={(item)=>`${item.food_id}`}
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index})=>{
                    return (
                        <HorizontalFoodCard
                            containerStyle={{
                                height:130,
                                alignItems:'center',
                                marginHorizontal:SIZES.padding,
                                marginBottom:SIZES.radius,
                            }}
                            imageStyle={{
                                height:110,
                                width:110,
                                borderRadius:50,
                                marginRight:10,
                                marginLeft:5,
                            }}
                            item={item}
                            onPress={()=>{
                                console.log(item.food_id);
                                //navigation.navigate('fooddetails',{
                                  //  id:item.food_id,
                                //});
                            }}
                        />
                    );
                }}
            />
        </View>
    );
};

export default Favourite;
