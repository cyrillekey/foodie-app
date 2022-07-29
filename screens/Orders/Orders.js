/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React from 'react';
import { View,Text, RefreshControl} from 'react-native';
import { FlatList} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { OrderItem, ShimmerWrapper, TextButton } from '../../Components';
import { COLORS, dummyData, FONTS, SIZES } from '../../constants';
import { getDate, universalErrorhandlerWithSnackbar } from '../../constants/util';
import { addOrders } from '../../stores/products/productActions';
const Orders = (navigation) => {
const [isHistory,setIsHistory] = React.useState(true);
const dispatch = useDispatch();
const [fetching,setFetching] = React.useState(false);
const orders = useSelector(state=>state.productReducer.order);
const user = useSelector(state=>state.userReducer.user);
const token = useSelector(state=>state.userReducer.jwtToken);
const [refreshing,setRefreshing] = React.useState(false);
const getOrders = (type) =>{
  setFetching(true);
  var config = {
    method: 'get',
    url: `/customer/get-customer-order/${user?.customer_id}/${type}`,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  axios(config).then(response=>{
    dispatch(addOrders(response.data));
    setFetching(false);
  }).catch(response=>{
    setFetching(false);
  universalErrorhandlerWithSnackbar(response);
  });
};
const onRefresh = () => {
  setRefreshing(true);
  setFetching(true);
  var config = {
    method: 'get',
    url: `/customer/get-customer-order/${user?.customer_id}/${Number(isHistory) + 1}`,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  axios(config).then(response=>{
    dispatch(addOrders(response.data));
    setFetching(false);
    setRefreshing(false);
  }).catch(response=>{
    setFetching(false);
    setRefreshing(false);
  universalErrorhandlerWithSnackbar(response);
  });
};
// const onRefresh = React.useCallback(()=>{
//   setRefreshing(true);
//   var config = {
//     method: 'get',
//     url: `/customer/get-customer-order/${user?.customer_id}/${Number(isHistory)}`,
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//   };
//   axios(config).then(response=>{
//     //dispatch(addOrders(response.data));
//     console.log(response.data);
//     setRefreshing(false);
//   }).catch(response=>{
//     setRefreshing(false);
//   universalErrorhandlerWithSnackbar(response);
//   });
// },[]);

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
          getOrders(2);
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
          getOrders(1);
          setIsHistory(false);
        }}
        buttonContainerStyle={{
          height:45,
          borderRadius:SIZES.radius,
          width:150,
          backgroundColor: isHistory ? COLORS.lightOrange2 : COLORS.primary,
        }}
        labelStyle={{
          color: isHistory ? COLORS.primary : COLORS.white,
        }}
        />
      </View>
      {

        fetching === true ?
        <FlatList
        data={dummyData.menu[0].list}
        key={(item)=>`${item.id}`}
        style={{
          marginTop:SIZES.padding,
          paddingHorizontal:SIZES.padding,
        }}
        refreshing={refreshing}
        renderItem={({item,index})=>{
          return (
            <ShimmerWrapper
            style={{
              height:140,
              marginTop:SIZES.radius,
               borderRadius:SIZES.radius,
               marginBottom:SIZES.radius,
            }}
            width={SIZES.width * 0.85}
            >
              <View>
                <Text> </Text>
              </View>
            </ShimmerWrapper>
          );
        }}
        />
        :
      <FlatList
      data={orders}
      keyExtractor={(item)=>`${item.order_id}`}
      showsHorizontalScrollIndicator={false}
      style={{
        marginTop:SIZES.padding,
        paddingHorizontal:SIZES.padding,
      }}
      enabled={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={
          onRefresh} />
      }
      renderItem={({item,index})=>{
        var formatted = getDate(item.order_date);
        return (<View>
          <Text
          style={{
            ...FONTS.body3,
          }}
          >{formatted}</Text>
          <OrderItem
            index={index}
            name={item.order_id}
            status={item.orderStatus}
            navigation={navigation}
            date={formatted}
            price={item.order_amount + item.delivery_cost}
            courier={item?.courier?.courier_id}
            onPress={()=>{
              navigation.navigate('orderDetails',{
                id:index,
            });
            }}
          />
          </View>);
      }}
      />
    }
    </View>
  );
};

export default Orders;
