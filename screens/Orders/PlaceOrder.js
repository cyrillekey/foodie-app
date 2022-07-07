/* eslint-disable react-native/no-inline-styles */
import { View, Text,Image, ActivityIndicator, Alert } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../../constants';
import { CardItem, FooterTotal, FormInput, Header } from '../../Components';
import { SIZES,icons } from '../../constants';
import { TextIconButton } from '../../Components';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressName } from '../../constants/util';
import axios from 'axios';
import { clearCart } from '../../stores/products/productActions';
const PlaceOrder = ({navigation}) => {
    const address = useSelector(state=>state.userReducer.address);
    const [submitting,setSubmitting] = React.useState(false);
    const [form,setForm] = React.useState(<ActivityIndicator/>);
    getAddressName(address.latitude,address.longitude,setForm);
    const card = useSelector(state=>state.userReducer.selectedCard);
    const cart = useSelector(state=>state.productReducer.cartItems);
    const user = useSelector(state=>state.userReducer.user);
    const token = useSelector(state=>state.userReducer.jwtToken);
    const dispatch = useDispatch();
    const formatted = cart.map((item)=>({
        'food_id':item.food_id,
        'quantity':item.qty,
    }));
    const placeOrder = () => {
        setSubmitting(true);
        var config = {
            method: 'post',
            url: `/customer/create-order/${user.customer_id}/${card.payment_id}`,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            data :
            {
                'latitude':address.latitude,
                'longitude':address.longitude,
                'item':formatted,
            },
          };
        axios(config).then(
            response=>{
                setSubmitting(false);
                if (response.status === 201){
                    dispatch(clearCart());
                    navigation.reset({
                        index:0,
                        routes:[{name:'success'}],
                    });
                }
            }
        ).catch(err => {
            setSubmitting(false);
            Alert.alert('Error', 'Something went wrong');
            console.log(err);
        });
    };
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
        title="CHECKOUT"
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
    <KeyboardAvoidingScrollView
    contentContainerStyle={{
        flexGrow:1,
        paddingHorizontal:SIZES.padding,
        paddingBottom:20,
    }}
    >
        <View>
            <CardItem
            item={card}
            isSelected={true}
            />
        </View>
        <View
        style={{
            marginTop:SIZES.padding,
        }}
        onMagicTap={()=>{
        }}
        >
            <Text
            style={{
                ...FONTS.h3,
            }}
            >Delivery Address</Text>
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:SIZES.radius,
                paddingVertical:SIZES.radius,
                paddingHorizontal:SIZES.padding,
                borderWidth:2,
                borderRadius:SIZES.radius,
                borderColor:COLORS.lightGray2,
            }}
            >
                <Image
                source={icons.location}
                style={{
                    width:20,
                    height:20,
                    tintColor:COLORS.black,
                }}
                />
                <Text
                style={{
                    ...FONTS.body3,
                    marginLeft:SIZES.radius,
                    width:'85%',
                }}
                >{form}</Text>
            </View>
        </View>
        <View
        style={{
            marginTop:SIZES.padding,
        }}
        >
            <Text style={{...FONTS.h3}}>Add Coupon</Text>
            <FormInput
            inputContainerStyle={{
                marginTop:0,
                borderWidth:2,
                borderColor:COLORS.lightGray2,
                paddingRight:0,
                borderRadius:SIZES.radius,
            }}
            placeholder="Coupon Code"
            appendComponent={
                <View
                style={{
                    width:60,
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor:COLORS.primary,
                    borderTopRightRadius:SIZES.radius,
                    borderBottomRightRadius:SIZES.radius,
                }}
                >
                    <Image
                    source={icons.coupon}
                    style={{
                        width:40,
                        height:40,
                    }}
                    />
                </View>
            }
            />
        </View>
    </KeyboardAvoidingScrollView>
    <FooterTotal
    active={submitting}
    subTotal={120}
    total={500}
    label={submitting ? <ActivityIndicator style={{
        color:COLORS.white,
    }} size="large"/> : 'Proceed'}
    shippingFee={150}
    onPress={()=>placeOrder()}
    />
    </View>
  );
};

export default PlaceOrder;
