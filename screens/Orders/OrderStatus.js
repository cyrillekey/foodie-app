/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';
import React from 'react';
import { Header, LineDivider, TextButton } from '../../Components';
import { COLORS, constants, FONTS, icons, SIZES } from '../../constants';
import { useSelector } from 'react-redux';
import axios from 'axios';

const OrderStatus = ({navigation,route}) => {
    const order = useSelector(state=>state.productReducer.order)[route.params.id];
    const [currentStep,setCurrentStep] = React.useState(0);
    React.useEffect(()=>{
        //DELIVERED,PLACED,CANCELLED,PENDING,INTRANSIT
        let status = (order.orderStatus);
        switch (status) {
            case 'PENDING':
                setCurrentStep(0);
                break;
            case 'PLACED':
                setCurrentStep(1);
                break;
            case 'DELIVERED':
                setCurrentStep(3);
                break;
            case 'INTRANSIT':
                setCurrentStep(2);
                break;
            case 'RECEIVED':
                setCurrentStep(4);
                break;
            default:
                setCurrentStep(0);
                break;
        }
    },[order.orderStatus]);
    const [label,setLabel] = React.useState(
        'Cancel'
    );
    const cancelOrder = () =>{
        setLabel(
            <ActivityIndicator
            size="large"
            style={{
                alignItems:'center',
                borderColor:COLORS.white,
            }}
            />
        );
        axios.post(`/customer/cancel-order/${order.order_id}`).then(
            response=>{
                setLabel('Cancel');
                if (response.status === 200){
                    Alert.alert('Ok','Order has been cancelled succesfully.');
                }
            }
        ).catch(response=>{
            setLabel('Cancel');
            Alert.alert('Error','Something went wrong trying to cancel this order');});
    };
  return (
    <View
    style={{
        flex:1,
        paddingHorizontal:SIZES.padding,
        backgroundColor:COLORS.white,
    }}
    >
      <Header
        title={'Order Status'}
        isBackPresent={true}
        containerStye={{
            height:50,
            marginTop:SIZES.padding,
        }}
        isCartpresent={false}
        navigation={navigation}
      />
      <View
      style={{
          marginTop:SIZES.radius,
          paddingHorizontal:SIZES.padding,
      }}
      >
          <Text style={{
              textAlign:'center',
              ...FONTS.body4,
              color:COLORS.gray,
          }} >Estimated Delivery</Text>
          <Text
          style={{
              textAlign:'center',
              ...FONTS.h2,
          }}
          >21 Sept 2020 / 12:30PM</Text>
      </View>
      <View
      style={{
          marginTop:SIZES.padding,
          paddingVertical:SIZES.padding,
          borderRadius:SIZES.radius,
          borderWidth:2,
          borderColor:COLORS.lightGray2,
          backgroundColor:COLORS.white2,
      }}
      >
          <View
          style={{
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'space-between',
              marginBottom:20,
              paddingHorizontal:SIZES.padding,
          }}
          >
            <Text style={{...FONTS.h3}}>Track Order</Text>
            <Text style={{...FONTS.body3,color:COLORS.gray}}>NP4556464</Text>
          </View>
          <LineDivider
          lineStyle={{
              backgroundColor:COLORS.lightGray2,
          }}
          />
          <View
          style={{
              marginTop:SIZES.padding,
              paddingHorizontal:SIZES.padding,
          }}
          >
              {
                  constants.track_order_status.map((item,index)=>(
                      <View
                      key={item.id}
                      >
                      <View
                      style={{
                          flexDirection:'row',
                          alignItems:'center',
                          marginVertical:-5,
                      }}
                      >
                      <Image
                      source={icons.correct}
                      style={{
                          width:40,
                          height:40,
                          tintColor: index <= currentStep ? COLORS.primary : COLORS.lightGray1,
                      }}
                      />
                      <View
                      style={{
                          marginLeft:SIZES.radius,
                      }}
                      >
                          <Text style={{...FONTS.h3}}>{item.title}</Text>
                          <Text style={{
                              ...FONTS.body4,
                              color:COLORS.gray,
                          }}>{item.sub_title}</Text>
                      </View>
                      </View>
                      {index < constants.track_order_status.length - 1 &&
                      <View>
                        {index < currentStep &&
                        <View
                        style={{
                            height:40,
                            width:3,
                            marginLeft:18,
                            backgroundColor:COLORS.primary,
                            zIndex:1,
                        }}
                        />
                        }
                        {
                            index >= currentStep &&
                            <Image
                            source={icons.dotted_line}
                            resizeMode="cover"
                            style={{
                                width:4,
                                height:40,
                                marginLeft:17,
                            }}
                            />
                        }
                      </View>
                      }
                      </View>
                  ))
              }
          </View>
      </View>
      {
        order.orderStatus === 'CANCELLED' ?
         <View/> :
      <View
      style={{
        height:55,
        flexDirection:'row',
          marginTop:SIZES.radius,
          marginBottom:SIZES.padding,
          justifyContent:'space-between',
      }}
      >
          <TextButton
          onPress={()=>Alert.alert(
            'Are you Sure',
            'Are you sure you want to cancel this order',
            [
                {text:'Yes',onPress:()=>cancelOrder()},
                {text:'No',onPress:()=>{console.log('');}},
            ]
            )}
          buttonContainerStyle={{
              width:'40%',
              borderRadius:SIZES.base,
              backgroundColor:COLORS.lightGray2,
          }}
          label={label}
          labelStyle={{
              color:COLORS.primary,
          }}
          />
          <TextButton
          label="Map View"
          buttonContainerStyle={{
            width:'40%',
            borderRadius:SIZES.base,
          }}
          onPress={()=>navigation.navigate('deliveryMap',{
            order_id:order.order_id,
          })}
          />
      </View>
        }
    </View>
  );
};

export default OrderStatus;
