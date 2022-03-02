import React from 'react';
import {
    Text,
    View,FlatList
} from 'react-native';
import { useSelector } from 'react-redux';
import { FONTS ,SIZES} from '../../constants';
import { HorizontalFoodCard } from '../../Components';

const Favourite = (navigation) => {
    const favourite = useSelector(state=>state.productReducer.favourites)
    return (
        <View
        style={{
            flex:1
        }}
        >
            <View
            style={{
                marginTop:SIZES.padding,
                marginBottom:SIZES.padding
            }}
            >
            <Text style={{
                ...FONTS.h2,
                textAlign:'center'
            }}>Favourites</Text>
            </View>
            <FlatList
                data={favourite}
                keyExtractor={(item)=>`${item.id}`}
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index})=>{
                    return (
                        <HorizontalFoodCard
                            containerStyle={{
                                height:130,
                                alignItems:'center',
                                marginHorizontal:SIZES.padding,
                                marginBottom:SIZES.radius
                            }}
                            imageStyle={{
                                marginTop:20,
                                height:110,
                                width:110,
                            }}
                            item={item}
                            onPress={()=>{
                                //console.log(navigation)
                                navigation.navigate("fooddetails",{
                                    id:item.id
                                })
                            }}
                        />
                    );
                }}
            />
        </View>
    )
}

export default Favourite