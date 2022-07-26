/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import React from 'react';
import { COLORS, dummyData, FONTS, images, SIZES } from '../../constants';
import { FormInput, Header, TextButton } from '../../Components';
import  StarRating from 'react-native-star-rating-widget';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { universalErrorhandlerWithSnackbar } from '../../constants/util';
import  Toast  from 'react-native-toast-message';
const DriverRatings = ({navigation,route}) => {
    const [ratings,setRatings] = React.useState(1.0);
    const [form,setForm] = React.useState({
        subject:'',
        message:'',
    });
    const [label,setLabel] = React.useState('Submit');
    const [tip,setTip] = React.useState(1);
    const [courier,setCourier] = React.useState({});
    const user = useSelector(state=>state.userReducer.user);
    const token = useSelector(state=>state.userReducer.jwtToken);
    const id = route.params.order_id;
    React.useEffect(()=>{
        axios({
            url:`/customer/get-courier-details/${id}`,
            method:'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization':`Bearer ${token}`,
            },
          }).then(response=>{
            setCourier(response.data);
          }).catch(err=>{
            universalErrorhandlerWithSnackbar(err);
          });
    },[courier,token,id]);
    const rate_driver = () =>{
        setLabel(<ActivityIndicator size= "large" color={COLORS.white}/>);
        axios({
            url:`/customer/add-review/courier/${id}/${user?.customer_id}`,
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
            data:{
                rating:ratings,
                subject:'',
                message:'message',
            },
        }).then(response=>{
            if ( response.status === 201){
                Toast.show({
                    text1:'Success',
                    text2:'Ratings Updated Succesfully',
                    position:'bottom',
                    onShow:()=>{},
                });
                navigation.navigate('Home');
            }
        }).catch(err=>{
            setLabel('Submit');
            universalErrorhandlerWithSnackbar(err);
        });
    };
  return (
    <ScrollView
    style={{
        flex:1,
        backgroundColor:COLORS.white,
    }}
    >
        <Header
        navigation={navigation}
        isBackPresent={true}
        title="Rate Driver"
        containerStye={{
            marginTop:SIZES.padding,
            paddingHorizontal:SIZES.padding,
        }}
        isCartpresent={false}
        />
        <View
        style={{
            marginTop:SIZES.padding ,
            alignItems:'center',
            justifyContent:'center',
        }}
        >
            <Image source={courier?.profile_picture ? {uri:courier?.profile_picture} : images.profile}
            resizeMode="center"
            style={{
                height:120,
                width:120,
            }}
            borderRadius={SIZES.padding * 2}
            />
            <Text
            style={{
                marginTop:SIZES.padding,
                ...FONTS.h3,
            }}
            >{courier.user_name}</Text>
            <Text
            style={{
                ...FONTS.body3,
                color:COLORS.darkGray,
                marginTop:SIZES.radius * 0.5,
            }}
            >Delivery Man</Text>
            <Text
            style={{
                ...FONTS.body3,
                marginTop:SIZES.radius,
            }}
            >Please Rate Our Services</Text>
            <StarRating
            minRating={1.0}
            rating={ratings}
            onChange={(value)=>{
                setRatings(value);
            }}
            color={COLORS.orange}
            emptyColor={COLORS.lightOrange3}
            style={{
                justifyContent:'center',
                alignSelf:'center',
                marginVertical:SIZES.radius,
            }}
            starSize={40}
            />
        </View>
        <View
        style={{
            marginHorizontal:SIZES.radius,
            marginTop:SIZES.radius,
        }}
        >
            <Text
            style={{
                ...FONTS.h2,
            }}
            >Add Tip</Text>
            <FlatList
            horizontal
            data={dummyData.tips}
            keyExtractor={item=>`${item.id}`}
            renderItem={({item,index})=>(
                <TextButton
                        label={item.value}
                        onPress={()=>setTip(item.id)}
                        buttonContainerStyle={{
                            width:65,
                            height:45,
                            borderRadius:SIZES.radius,
                            borderWidth:1,
                            backgroundColor: tip === item.id ? COLORS.primary : null,
                            margin:SIZES.base,
                            borderColor: tip === item.id ? COLORS.white : COLORS.gray,
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                            color:tip === item.id ? COLORS.white : COLORS.black,
                        }}
                       />
            )}
            />
            <FormInput
            placeholder="Subject"
            onChange={(text)=>setForm({...form,subject:text})}
            />
            <FormInput
            placeholder="Add Review"
            multiLines={true}
            lines = {4}
            inputContainerStyle={{
                height:120,
            }}
            onChange={(text)=>setForm({...form,message:text})}
            />
        </View>
        <TextButton
        label={label}
        buttonContainerStyle={{
            height:55,
            marginHorizontal:SIZES.radius,
            borderRadius:SIZES.radius,
            marginTop:SIZES.padding,
            marginBottom:SIZES.padding,
        }}
        onPress = {rate_driver}
        disabled={!(form.message.length > 0 && form.subject.length > 0) }
        />
    </ScrollView>
  );
};

export default DriverRatings;
