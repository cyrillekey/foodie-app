/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, FlatList } from 'react-native';
import React from 'react';
import { COLORS, dummyData, icons, images, SIZES } from '../../constants';
import { HorizontalFoodCard, LineDivider, ShimmerWrapper, TextIconButton } from '../../Components';
import axios from 'axios';
import { universalErrorhandlerWithSnackbar } from '../../constants/util';

const RestaurantDetails = ({navigation,route}) => {
    const id = route.params.id;
    const [loading,setLoading] = React.useState(true);
    const [restaurant,setRestaurant] = React.useState({});
    const [food,setFood] = React.useState([]);
    React.useEffect(()=>{
        axios.get(`/get-single-restaurant/${id}`,{
        }).then(response=>{
            if (response.status === 200){
                setRestaurant(response.data);
            }
        }).catch(err=>{
            universalErrorhandlerWithSnackbar(err);
        });
        axios.get(`/food-by-restaurant/${id}`).then(resp=>{
            if (resp.status === 200){
                setLoading(false);
                setFood(resp.data);
            }
        }).catch(err=>{
            setLoading(false);
            universalErrorhandlerWithSnackbar(err);
        });
    },[id]);
    console.log(restaurant);
  return (
    <View
    style={{
        flex:1,
        backgroundColor:COLORS.white,
    }}
    >
        <View>
            <View
            style={{
                zIndex:1,
                position:'absolute',
                top:10,
                left:20,
            }}
            >
            <TextIconButton
            iconLeft={icons.back}
            containerStyle={{
                width:40,
                height:40,
                justifyContent:'center',
                alignItems:'center',
                borderWidth:1,
                borderRadius:SIZES.radius,
                borderColor:COLORS.white,
            }}
            iconStyle={{
                width:20,
                height:20,
                tintColor:COLORS.white,
                marginRight:SIZES.base,
            }}
            onPress={()=>{
                navigation.pop();
            }}
            />
            </View>
        <Image source={{uri:restaurant?.restaurant_image}} style={{width:'100%',height:200}}/>
        <Text style={{
            fontSize:29,
            fontWeight:'600',
            marginTop:10,
            marginHorizontal:15,
            color:COLORS.black,
        }}>{restaurant?.restaurant_name}</Text>
        <Text
        style={{
            marginTop:10,
            marginHorizontal:15,
            fontWeight:'400',
            fontSize:15.5,
            color:COLORS.black,
        }}
        >{
            restaurant?.restaurantTags?.map((item)=>(item.title))
        } . $$ .⭐ 4.5</Text>
        </View>
        <LineDivider lineStyle={{
            marginVertical:20,
        }}/>
        {
            loading ?
            <FlatList
            data={dummyData.restaurant}
            keyExtractor={item=>`${item.id}`}
            renderItem={(item,index)=>(<ShimmerWrapper
            height={130}
            width={SIZES.width * 0.90}
            style={{
                borderRadius:SIZES.radius,
                marginHorizontal:SIZES.padding,
                marginBottom:SIZES.radius,
            }}
            />)}
            />
            :
            <FlatList
        data={food}
        key={item=>`${item.food_id}`}
        renderItem={({item,index})=>
            (
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
                navigation.navigate('fooddetails',{
                    id:item.food_id,
                });
            }}
            />
            )}
        />
        }
    </View>
  );
};

export default RestaurantDetails;
