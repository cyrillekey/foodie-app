/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import { View, Text ,Image,ScrollView, ActivityIndicator, RefreshControl} from 'react-native';
import React from 'react';
import { COLORS, FONTS, icons, images, SIZES } from '../../constants';
import { Header ,LineDivider, TextButton} from '../../Components';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { universalErrorhandlerWithSnackbar } from '../../constants/util';
const OrderDetails = ({navigation,route}) => {
    const id = route.params.id;
    const token = useSelector(state=>state.userReducer.jwtToken);
    const order_id = route.params.order_id;
    let details = (useSelector(state=>state.productReducer.order)[id]);
    const [temp,setTemp] = React.useState();
    const [refreshing,setRefreshing] = React.useState(true);
    React.useEffect(()=>{
        if (!details && order_id){
            axios({
                url:`customer/get-order-details/${order_id}`,
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
            }).then(response=>{
                if (response.status === 200){
                    setTemp(response.data);
                }
                setRefreshing(false);
            }).catch(err=>{
                setRefreshing(false);
                universalErrorhandlerWithSnackbar(err);
            });
        } else {
            setTemp(details);
            setRefreshing(false);
        }
    },[details,order_id,token]);
    const onRefresh = () =>{
        setRefreshing(true);
        axios({
            url:`customer/get-order-details/${temp.order_id}`,
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        }).then(response=>{
            if (response.status === 200){
                setTemp(response.data);
                setRefreshing(false);
            }
        }).catch(err=>{
            universalErrorhandlerWithSnackbar(err);
            setRefreshing(false);
        });
    };
  return (
    <View
    style={{
        flex:1,
        backgroundColor:COLORS.white
    }}
    ><Header
            title={'#' + temp?.order_id ?? '123'}
            containerStye={{
                marginTop:SIZES.padding,
                paddingHorizontal:SIZES.padding
            }}
            isBackPresent={true}
            isCartpresent={false}
            navigation={navigation}
        />
        <ScrollView
        style={{
            marginTop:SIZES.padding * 2,
            borderRadius:SIZES.radius,
        }}
        contentContainerStyle={{
            justifyContent:'center',
            alignItems:'center'
        }}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh ={onRefresh}/>
        }
        >
            <QRCode
              value={temp?.delivery_id ?? '125'}
              size={220}
            />
            <Text
            style={{
                ...FONTS.h3,
                textAlign:'center',
                marginTop:SIZES.padding
            }}
            >Scan to confirm Order Received</Text>
        </ScrollView>
        <View
        style={{
            position:'absolute',
            bottom:0,
            width:'100%',
            height:300
        }}
        >
            <LinearGradient
                start={{x:0,y:0}}
                end={{x:0,y:1}}
                colors={[
                    COLORS.transparent,
                    COLORS.lightGray1
                ]}
                style={{
                    position:'absolute',
                    top:-20,
                    left:0,
                    right:0,
                    height:50,
                }}
            />
            <ScrollView
            bounces={true}
            style={{
                padding:SIZES.padding,
                borderTopLeftRadius:30,
                borderTopRightRadius:30,
                backgroundColor:COLORS.white,
            }}
            >
                <Text style={{...FONTS.h3,marginLeft:SIZES.padding}}>Order items</Text>
                {
                    temp?.productOrder?.map((item)=>(
                        <View
                        key={item?.food?.food_id}
            style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:SIZES.radius
            }}
            >
            <Image
            source={{uri:item?.food?.food_image}}
            style={{
                width:40,
                height:40,
            }}
            loadingIndicatorSource={images.placeholder}
            />
            <View
                style={{
                    marginLeft:SIZES.padding
                }}
            >
                <Text
                style={{
                    ...FONTS.body4,
                    color:COLORS.gray,
                }}
                >{item?.food?.food_name}</Text>
                <Text style={{...FONTS.h3}}>Qty: {item.qunatity}</Text>
            </View>
            </View>
                    ))
                }
            <LineDivider
            lineStyle={{
                marginTop:SIZES.padding
            }}
            />
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:SIZES.padding,
                marginBottom:SIZES.padding
            }}
            >
            <Image
            source={icons.location}
            style={{
                width:40,
                height:40,
                tintColor:COLORS.black
            }}
            />
            <View
                style={{
                    marginLeft:SIZES.padding
                }}
            >
                <Text
                style={{
                    ...FONTS.body4,
                    color:COLORS.gray
                }}
                >Delivery Time</Text>
                <Text style={{...FONTS.h3}}>8 mins</Text>
            </View>
            </View>
            </ScrollView>
        </View>
    </View>
  );
};

export default OrderDetails;
