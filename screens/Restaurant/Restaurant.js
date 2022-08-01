/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React from 'react';
import { View ,Text, FlatList, TouchableOpacity, Image,ActivityIndicator} from 'react-native';
import { COLORS, dummyData, FONTS, icons, images, SIZES } from '../../constants';
import { useSelector } from 'react-redux';
import { universalErrorhandlerWithSnackbar } from '../../constants/util';

import  Toast from 'react-native-toast-message';
import { ShimmerWrapper } from '../../Components';
const Restaurant = (navigation) => {
  const [restaurant,setRestaurant] = React.useState([]);
  const selected = useSelector(state=>state.tabReducer.selectedTab);
  const [loading,setLoading] = React.useState(true);
  React.useEffect(()=>{
    if (selected === 'Restaurant'){
    axios.get('/get-all-restaurants/').then(response=>{
      if (response.status === 200){
        setLoading(false);
        setRestaurant(response.data);
      }
    }).catch(resp=>{
      setLoading(false);
      universalErrorhandlerWithSnackbar(resp);
    });

  }
  },[selected]);
  return (
    <View
    style={{
      flex:1,
      backgroundColor:COLORS.white,
    }}
    >
      {
        loading ?
          <FlatList
          data={dummyData.menu[0].list}
          keyExtractor={item=>`${item.id}`}
          contentContainerStyle={{
            paddingHorizontal:SIZES.radius,
            paddingBottom:38,
            marginTop:SIZES.padding,
          }}
          renderItem={(item,index)=>(
            <ShimmerWrapper
            style={{
              marginBottom:SIZES.padding,
              borderRadius:SIZES.radius,
            }}
            height={200}
            width={SIZES.width * 0.95}
            />
            )}
          />
          :
        <FlatList
       data={restaurant}
       keyExtractor={item=>`${item.restaurant_id}`}
       contentContainerStyle={{
         paddingHorizontal:SIZES.radius,
         paddingBottom:38,
         marginTop:SIZES.padding,
       }}
       renderItem={({item,index})=>(
         <TouchableOpacity
         style={{
           marginBottom:SIZES.padding * 2,
         }}
         onPress={()=>{
          item.isOpen ?
          navigation.navigate('restaurantDetails',{
            id:item.restaurant_id,
          }) :
          Toast.show({
            position:'bottom',
            text1:'Sorry',
            text2: 'Restaurant Is Currently Clossed',
            type:'error',
          });
        }}
         >
           <View
           style={{
             marginBottom:SIZES.padding,
           }}
           >
             <Image
             source={{uri:item.restaurant_image}}
             resizeMode="cover"
             style={{
               width:'100%',
               height:200,
               borderRadius:SIZES.radius,
             }}
             loadingIndicatorSource={<ActivityIndicator size={'large'} color={COLORS.white}/>}
             />
             <View
             style={{
               position:'absolute',
               bottom:0,
               height:50,
               width:SIZES.width * 0.3,
               backgroundColor:COLORS.white,
               borderTopRightRadius:SIZES.radius,
               borderBottomLeftRadius:SIZES.radius,
               alignItems:'center',
               justifyContent:'center',
             }}
             >
               <Text
               style={{
                 ...FONTS.h4,
               }}
               >30-45 min</Text>
             </View>
           </View>
           <Text style={{...FONTS.body2}}>{item.restaurant_name}</Text>
           <View
           style={{
             flexDirection:'row',
             marginTop:SIZES.padding,
           }}
           >
             <Image
             source={icons.star}
             style={{
               height:20,
               width:20,
               tintColor:COLORS.primary,
               marginRight:10,
             }}
             />
             <Text style={{
               ...FONTS.body3,
             }} >{4.5}</Text>
             <View
             style={{
               flexDirection:'row',
               marginLeft:10,
             }}
             >
               {
                 item?.categories?.map((cat,index1)=>(
                   <View
                   style={{
                     flexDirection:'row',
                   }}
                   key={`${index1}cat`}
                   >
                     <Text style={{
                       ...FONTS.body3,
                     }}>Burger</Text>
                     <Text
                     style={{
                       ...FONTS.h3,color:COLORS.darkGray,
                     }}
                     > . </Text>
                   </View>
                 ))
               }
               <Text
               style={{
                 ...FONTS.body3,
                 color:COLORS.lightGray1,
               }}
               >
                 $$$
               </Text>
             </View>
           </View>
         </TouchableOpacity>
       )}
       />
      }
    </View>
  );
};

export default Restaurant;
