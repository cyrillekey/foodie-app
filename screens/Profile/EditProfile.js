/* eslint-disable react-native/no-inline-styles */

import {View, Text, TouchableOpacity, ImageBackground, Image, Platform} from 'react-native';
import React from 'react';
import {COLORS, FONTS, icons, images, SIZES} from '../../constants';
import Animated from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';
import { Header } from '../../Components';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { saveUser } from '../../stores/user/userActions';
var fs = require('react-native-fs');
const EditProfile = (navigation) => {
  const user = useSelector(state=>state.userReducer.user);
  const token = useSelector(state=>state.userReducer.jwtToken);
  const dispatch = useDispatch();
  const [form,setForm] = React.useState({
    user_name:user.user_name,
    user_phone:user.user_phone,
    user_mail:user.user_mail,
  });
  const imagePicker = async() =>{
    const result = await launchImageLibrary({
    });
     const data = new FormData();
      data.append('category_image',result.assets[0].bitrate);
      axios({
        url:`/customer/upload-profile-image/${user.customer_id}`,
        headers:{
        'Authorization':`Bearer ${token}`,
        },
        method:'post',
        data:data,
      }).then(res=>{
        if (res.status === 200){
          dispatch(saveUser({user:res.data}));
        }
      }).catch(err=>{
        console.log(err);
      });
  };
  const updateProfile = () =>{
    axios.post(`/customer/update-profile/${user.customer_id}`,{}).then(val=>{}).catch(err=>{});
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
        <Header
        containerStye={{
            height:50,
            marginTop:10,
            alignItems:'center',
            paddingHorizontal:SIZES.padding,
            }}
            isCartpresent={false}
           isBackPresent={true}
            navigation={navigation.navigation}
        title="Edit Profile"
        />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(
            0.1,
            Animated.multiply(new Animated.Value(1), 1.0),
          ),
        }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => imagePicker()}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={user?.profile_picture ?? images.profile}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                }}
                >
                    <Image
                    source={icons.call}
                    style={{
                        height:35,
                        width:35,
                        tintColor:'#fff',
                        opacity:0.7,
                        alignItems:'center',
                        justifyContent:'center',
                        borderWidth:1,
                        borderColor:'#fff',
                        borderRadius:10,
                    }}
                    />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text
          style={{
            marginTop:10,
            fontSize:18,
            fontWeight:'bold',
          }}
          >{user?.user_name ?? 'John Doe'}</Text>
        </View>
        <View
        style={{
            flexDirection:'row',
            marginTop:10,
            marginBottom:10,
            borderBottomWidth:1,
            borderBottomColor:'#f2f2f2',
            paddingBottom:5,
        }}
        >
            <FontAwesome
            size={20}
            color={COLORS.black}
            name="user-o"
            />
            <TextInput
            placeholder="Username"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value = {form.user_name}
            onChangeText={(value)=>{
              setForm({...form,user_name:value});
            }}
            style={{
                flex:1,
                marginTop:Platform.OS === 'ios' ? '0' : -12,
                paddingLeft:10,
                color:'#05375a',
            }}
            />
        </View>
        <View
        style={{
            flexDirection:'row',
            marginTop:10,
            marginBottom:10,
            borderBottomWidth:1,
            borderBottomColor:'#f2f2f2',
            paddingBottom:5,
        }}
        >
            <FontAwesome
            size={20}
            color={COLORS.black}
            name="user-circle"
            />
            <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value= {form.user_mail}
            onChangeText={(value)=>{
              setForm({...form,user_mail:value});
            }}
            style={{
                flex:1,
                marginTop:Platform.OS === 'ios' ? '0' : -12,
                paddingLeft:10,
                color:'#05375a',
            }}
            />
        </View>
        <View
        style={{
            flexDirection:'row',
            marginTop:10,
            marginBottom:10,
            borderBottomWidth:1,
            borderBottomColor:'#f2f2f2',
            paddingBottom:5,
        }}
        >
            <FontAwesome
            size={20}
            color={COLORS.black}
            name="phone"
            />

            <TextInput
            value={form.user_phone}
            placeholder="User Phone"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(value)=>{
              setForm({...form,user_phone:value});
            }}
            style={{
                flex:1,
                marginTop:Platform.OS === 'ios' ? '0' : -12,
                paddingLeft:10,
                color:'#05375a',
            }}
            />
        </View>
        <TouchableOpacity
        style={{
            padding:15,
            borderRadius:10,
            backgroundColor:COLORS.primary,
            alignItems:'center',
            marginTop:10,
        }}
        >
            <Text
            style={{
                ...FONTS.h3,
                color:COLORS.white,
            }}
            >Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditProfile;
