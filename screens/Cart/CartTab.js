/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useDispatch, useSelector } from 'react-redux';
import { FooterTotal, Header, TextButton, StepperIncrement, TextIconButton } from '../../Components';
import { COLORS, constants, FONTS, icons,images,SIZES } from '../../constants';
import { increaseQty, reduceQty, removeFromCart } from '../../stores/cart/cartActions';

const CartTab = ({navigation}) => {
    const cartList = useSelector(state=>state.productReducer.cartItems);
    const totalCost = useSelector(state=>state.productReducer.cartTotal);
    const dispatch = useDispatch();
    return (
            cartList.length > 0 ?
        <View
        style={{
            flex:1,
            backgroundColor:COLORS.white,
        }}
        >
            <Header
            containerStye={{
            height:50,
            marginTop:10,
            alignItems:'center',
            paddingHorizontal:SIZES.padding,

            }}
            title={"Cart"}
            isBackPresent={true}
            navigation={navigation}
            />
            <SwipeListView
            data={cartList}
            keyExtractor={item=>`${item.food_id}`}
            contentContainerStyle={{
                marginTop:SIZES.radius,
                paddingHorizontal:SIZES.padding,
                paddingBottom:SIZES.padding * 2,
            }}
            disableRightSwipe
            rightOpenValue={-75}
            renderHiddenItem={(data,roadMap)=>(
                <TextIconButton
                iconRight={icons.delete_icon}
                containerStyle={{
                    flex:1,
                    justifyContent:'flex-end',
                    backgroundColor:COLORS.primary,
                    ...styles.cartItemContainer,
                }}
                iconStyle={{
                    marginRight:10,
                    tintColor:COLORS.white,
                }}
                onPress={()=>{
                    dispatch(removeFromCart({id:data.item.food_id}));
                }}
                />
            )}
            renderItem={(data,index)=>{
               return (<View
                style={{
                    height:90,
                    backgroundColor:COLORS.lightGray2,
                    ...styles.cartItemContainer,
                }}
                >
                    <View
                    style={{
                        width:90,
                        height:80,
                        marginLeft:-10,
                    }}
                    >
                        <Image
                        source={{uri:data.item.food_image}}
                        resizeMode="contain"
                        style={{
                            width:'100%',
                            height:'100%',
                            position:'absolute',
                            borderRadius:360,
                            padding:5,
                        }}
                        />
                    </View>
                    <View
                    style={{
                        flex:1,
                    }}
                    >
                        <Text
                        style={{...FONTS.body3}}
                        >{data.item.name}</Text>
                        <Text style={{
                            ...FONTS.h3,
                            color:COLORS.primary,
                        }} >Kes {data.item.food_price}</Text>
                    </View>
                    <StepperIncrement
                    containerStyle={{
                        height:50,
                        width:125,
                        backgroundColor:COLORS.white,
                    }}
                    value={data.item.qty}
                    onMinus={()=>{
                        dispatch(reduceQty({id:data.item.food_id}));
                    }}
                    onAdd={
                        ()=>dispatch(increaseQty({id:data.item.food_id}))
                    }
                    />
                </View>
                );
            }
            }
            />
            <FooterTotal
            onPress={()=>{
                navigation.navigate('payment');
            }}
            />
        </View>
        : <View
        style={{
            flex:1,
            paddingHorizontal:SIZES.padding,
            backgroundColor:COLORS.white,
        }}
        >
            <Header
            containerStye={{
            height:50,
            marginTop:SIZES.padding,
            alignItems:'center',

            }}
            title={'Cart'}
            isBackPresent={true}
            navigation={navigation}
            isCartpresent={false}
            />
            <View
            style={{
               flex:1,
               alignItems:'center',
               justifyContent:'center',
            }}
            >
                <Image
                source={images.empty_cart}
                resizeMode="contain"
                style={{
                    width:150,
                    height:150,
                }}
                />
                <Text style={{
                    marginTop:SIZES.padding,
                    ...FONTS.h1,
                }}>Empty Cart!</Text>
                <Text
                style={{
                    textAlign:'center',
                    marginTop:SIZES.base,
                    ...FONTS.body3,color:COLORS.darkGray,
                }}
                >Begin Shopping</Text>
            </View>
            <TextButton
                label="Begin Shopping"
                buttonContainerStyle={{
                    height:55,
                    marginBottom:SIZES.padding,
                    borderRadius:SIZES.radius,
                }}
                onPress={()=>{
                    navigation.navigate('Home');
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    cartItemContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:SIZES.radius,
        paddingHorizontal:SIZES.radius,
        borderRadius:SIZES.radius
    }
});
export default CartTab