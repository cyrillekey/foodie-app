/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, View ,Image, Text, TouchableOpacity, ImageBackground} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Iconlabel, LineDivider, Ratings, StepperIncrement, TextButton, TextIconButton } from '../../Components';
import { COLORS ,SIZES,icons, FONTS,images} from '../../constants';
import { addToCart } from '../../stores/cart/cartActions';
import { addFavourite, removeFavourite } from '../../stores/products/productActions';
const FoodDetails = ({route,navigation}) => {
    const food = useSelector(state=>state.productReducer.products.find(element=>element.food_id == route.params.id));
    const isFav = useSelector(state=>state.productReducer.favourites.find(element=>element.food_id == route.params.id));
    const dispatch = useDispatch();
    const [count,setCount] = React.useState(1);
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
            paddingHorizontal:SIZES.padding,
    }}
        title={food.food_name}
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
    <ScrollView>
        <View style={{
            marginTop:SIZES.radius,
            marginBottom:SIZES.padding,
            paddingHorizontal:SIZES.padding,
        }}>
            <ImageBackground
            resizeMode="cover"
            source={{uri:food.food_image}}
            imageStyle={{
                borderRadius:SIZES.radius,
            }}
            >
            <View style={{
                height:200,
                borderRadius:SIZES.radius,
               // backgroundColor:COLORS.lightGray2,
            }}>
                <View
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    marginTop:SIZES.base,
                    paddingHorizontal:SIZES.radius,
                }}
                >
                    <View
                    style={{
                        flexDirection:'row',
                    }}
                    >
                        <Image
                            source={icons.calories}
                            style={{
                                width:30,
                                height:30,
                            }}
                        />
                        <Text style={{
                            ...FONTS.body4,
                            color:COLORS.darkGray2,
                        }}>
                            {food?.food_calories ?? 0.0} Calories
                        </Text>
                    </View>
                    <TouchableOpacity
                    onPress={
                        ()=>{
                            if (isFav){
                                dispatch(removeFavourite({id:food.food_id}));
                            } else {
                                dispatch(addFavourite({id:food.food_id}));
                            }
                        }
                    }
                    >
                    <Image
                    source={icons.love}
                    style={{
                        height:30,
                        width:30,
                        tintColor:isFav ? COLORS.red : COLORS.gray,
                    }}
                    />
                    </TouchableOpacity>
                </View>
                {/* <Image
                source={{uri:food.food_image}}
                resizeMode="cover"
                style={{
                    height:160,
                    width:'100%',
                }}
                /> */}
            </View>
            </ImageBackground>
            <View
            style={{
                marginTop:SIZES.padding,
            }}
            >
                <Text
                style={{
                    ...FONTS.h1,
                }}
                >
                    {food.food_name}
                </Text>
                <Text
                style={{
                    marginTop:SIZES.base,
                    ...FONTS.body3,
                    color:COLORS.darkGray,
                    textAlign:'justify',
                }}
                >
                {food.food_desc}
                </Text>
                <View
                style={{
                    flexDirection:'row',
                    marginTop:SIZES.padding,
                }}
                >
                <Iconlabel
                containerStyle={{
                    backgroundColor:COLORS.primary,
                }}
                    icon={icons.star}
                    label={food.ratings}
                    labelStyle={{
                        color:COLORS.white,
                    }}
                />
                <Iconlabel
                containerStyle={{
                    marginLeft:SIZES.radius,
                    paddingHorizontal:0,
                }}
                    icon={icons.clock}
                    label="30min"
                    labelStyle={{
                        color:COLORS.black,
                    }}
                    iconStyle={{
                        tintColor:COLORS.black,
                    }}
                />
                <Iconlabel
                containerStyle={{
                    marginLeft:SIZES.radius,
                    paddingHorizontal:0,
                }}
                    icon={icons.dollar}
                    label="Best Seller"
                    labelStyle={{
                        color:COLORS.black,
                    }}
                    iconStyle={{
                        tintColor:COLORS.black,
                    }}
                />
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        marginTop:SIZES.padding,
                        alignItems:'center',
                    }}
                >
                    <Text
                    style={{
                        ...FONTS.h3,
                    }}
                    >
                      Sizes:
                    </Text>
                    <View
                        style={{
                            flexDirection:'row',
                            flexWrap:'wrap',
                            marginLeft:SIZES.padding,
                        }}
                    >
                       <TextButton
                        label={'11\''}
                        buttonContainerStyle={{
                            width:45,
                            height:45,
                            borderRadius:SIZES.radius,
                            borderWidth:1,
                            backgroundColor:null,
                            margin:SIZES.base,
                            borderColor:COLORS.gray,
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                        }}
                       />
                       <TextButton
                        label={'12\''}
                        buttonContainerStyle={{
                            width:45,
                            height:45,
                            borderRadius:SIZES.radius,
                            borderWidth:1,
                            backgroundColor:null,
                            margin:SIZES.base,
                            borderColor:COLORS.gray,
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                        }}
                       />
                       <TextButton
                        label={'13\''}
                        buttonContainerStyle={{
                            width:45,
                            height:45,
                            borderRadius:SIZES.radius,
                            borderWidth:1,
                            backgroundColor:null,
                            margin:SIZES.base,
                            borderColor:COLORS.gray,
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                        }}
                       />
                    </View>
                </View>
            </View>
        </View>
        <LineDivider/>
        <View
            style={{
                flexDirection:'row',
                marginVertical:SIZES.padding,
                paddingHorizontal:SIZES.padding,
                alignItems:'center',
            }}
        >
            <Image
            source={{uri:food?.restaurant?.restaurant_image ?? 'https://res.cloudinary.com/dftgy3yfd/image/upload/v1654857099/foodie/photo-1653039001288-1ca7ee2596ab_vsdny6.webp'}}
            style={{
                width:50,
                height:50,
                borderRadius:SIZES.radius,
            }}
            />
            <View
            style={{
                flex:1,
                marginLeft:SIZES.radius,
                justifyContent:'center',
            }}
            >
                <Text style={{...FONTS.h3,width:SIZES.width * 0.8}}>{food?.restaurant?.restaurant_name ?? 'Testing' }</Text>
                <Text style={{...FONTS.body4,color:COLORS.gray}}>12.5 KM away from here</Text>
            </View>
            <Ratings
                rating={4}
                iconStyle={{
                    marginLeft:3,
                }}
                />
        </View>
    </ScrollView>
    <LineDivider/>
    <View
    style={{
        flexDirection:'row',
        height:90,
        alignItems:'center',
        paddingHorizontal:SIZES.padding,
        paddingBottom:SIZES.radius,
    }}
    ><StepperIncrement
            onAdd={()=>{
                if (count <= food.stock){
                setCount(count + 1);
                }
            }}
            onMinus={()=>{
                if (count !== 1){
                    setCount(count - 1);
                }
            }}
            value={count}
        />
        <TextButton
        buttonContainerStyle={{
            flex:1,
            flexDirection:'row',
            height:60,
            marginLeft:SIZES.radius,
            paddingHorizontal:SIZES.radius,
            borderRadius:SIZES.radius,
        }}
        label="Buy Now"
        label2={`Kes ${food.food_price}`}
        onPress={()=>{
            dispatch(addToCart({id:food
            .food_id,qty:count}));
        }}
        />
    </View>
    </View>
  );
};

export default FoodDetails;
