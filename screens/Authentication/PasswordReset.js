/* eslint-disable react-native/no-inline-styles */
import { View,TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import AuthLayout from './AuthLayout';
import { COLORS, icons, images, SIZES } from '../../constants';
import { FormInput, Header, TextButton } from '../../Components';
import axios from 'axios';
import { universalErrorhandlerWithSnackbar } from '../../constants/util';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../../stores/user/userActions';
import Toast from 'react-native-toast-message';
const PasswordReset = ({navigation,route}) => {
  const phone = route.params.phone;
  const logged_in = route.params.logged_in;
  const dispatch = useDispatch();
  const token = useSelector(state=>state.userReducer.jwtToken);
  const [password,setPassword] = React.useState({
    see1:true,
    see2:true,
  });
  const [form,setForm] = React.useState({
    password:'',
    password_repeat:'',
    phone:phone,
  });
  const [label,setLabel] = React.useState('Reset');
  const isEnabled = () =>{
    return form.password.length > 5 && form.password_repeat.length > 5  && form.password === form.password_repeat;
  };
  const resetPassword = () =>{
    setLabel(<ActivityIndicator
    size="large"
    color={COLORS.white}
    style={{
      alignSelf:'center',
      alignContent:'center',
      justifyContent:'center',
    }}
    />);
    let auth = logged_in ? {'Authorization':`Bearer ${token}`} : null;
    axios({
      method:'post',
      url:logged_in ? '/customer/reset-user-password' : '/reset-user-password',
      data:{
        user_phone:form.phone,
        password:form.password,
        password_repeat:form.password_repeat,
      },
      headers:{
        'Content-Type':'application/json',
        ...auth,
      },
    }).then(response=>{
      if (response.status === 200){
        console.log(response.data);
        logged_in ?
      dispatch(saveUser({user:response.data})) : navigation.reset({
        index:0,
        routes:[{name:'SignIn'}],
    });
      Toast.show();
      }
      setLabel('Reset');
    }).catch(err=>{
      universalErrorhandlerWithSnackbar(err);
      setLabel('Reset');
    });
  };
  return (
      <View
      style={{
        flex:1,
        marginTop:SIZES.padding ,
        paddingHorizontal: SIZES.padding,
      }}
      >
        <Header
    title="Password Reset"
    isCartpresent={false}
    isBackPresent={true}
    navigation={navigation}
    containerStye={{
      height: 50,
      alignItems: 'center',
      marginBottom:20,
    }}
    />
    <Image
    source={images.password_image}
    style={{
      width:SIZES.width * 0.9,
      height:230,
    }}
    />
    <View
    style={{
      marginTop:SIZES.padding * 2,
    }}
    >
        <FormInput
        label="Password"
        placeholder="*******"
        secureTextEntry={password.see1}
        autoCompleteType="password"
        containerStyle={{
          marginTop:SIZES.padding,
        }}
        onChange={value=>{
          setForm({...form,password:value});
        }}
        errorMsg={form.password.length < 6 ? 'Password Too Short' : form.password.trim() !== form.password_repeat.trim() ? 'Passwords Do Not Match' : null}
        appendComponent={
          <TouchableOpacity
          style={{
            width:40,
            alignItems:'flex-end',
            justifyContent:'center',
          }}
          onPress={()=>setPassword({...password,see1:!password.see1})}
          >
            <Image
            source={password.see1 ? icons.eye : icons.eye_closed}
            style={{
              height:20,
              width:20,
              tintColor:COLORS.gray,
            }}
            />
          </TouchableOpacity>
        }
        />
        <FormInput
        label="Password Repeat"
        placeholder="******"
        secureTextEntry={password.see2}
        autoCompleteType="password"
        containerStyle={{
          marginTop:SIZES.padding,
        }}
        errorMsg={form.password_repeat.length < 6 ? 'Password Too Short' : form.password.trim() !== form.password_repeat.trim() ? 'Passwords Do Not Match' : null}
        onChange={value =>{
          setForm({...form,password_repeat:value});
        }}
        appendComponent={
          <TouchableOpacity
          style={{
            width:40,
            alignItems:'flex-end',
            justifyContent:'center',
          }}
          onPress={()=>setPassword({...password,see2:!password.see2})}
          >
            <Image
            source={password.see2 ? icons.eye : icons.eye_closed}
            style={{
              height:20,
              width:20,
              tintColor:COLORS.gray,
            }}
            />
          </TouchableOpacity>
        }
        />
        </View>
        <TextButton
        label={label}
        buttonContainerStyle={{
          height:55,
          alignItems:'center',
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          justifyContent:'center',
        }}
        disabled={isEnabled() ? false : true}
        onPress={()=>resetPassword()}
        />
      </View>
  );
};

export default PasswordReset;
