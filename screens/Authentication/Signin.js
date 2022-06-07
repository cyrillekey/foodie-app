/* eslint-disable no-useless-escape */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Switch,
  Text,
  ActivityIndicator,
} from 'react-native';
import {AuthLayout} from '..';
import {FormInput, TextButton, TextIconButton,AlertDialog} from '../../Components';
import {SIZES, icons, COLORS, FONTS} from '../../constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveToken, saveUser } from '../../stores/user/userActions';
const Signin = ({navigation}) => {
  const dispatch = useDispatch();
  const [see, setSee] = React.useState(true);
  const [form, setFrom] = React.useState({
    password: '',
    email: '',
    emailError: '',
    passwordError: '',
    passWordvalid: false,
    emailValid: false,
    submittin:false,
  });
  const [label,setLabel] = React.useState('Sign In');
  const [remeberMe, setRememberMe] = React.useState(false);
  const validateEmail = email => {
    const res =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!res.test(String(email).toLowerCase())) {
      setFrom({...form, emailError: 'Invalid Email', emailValid: false,email:email});
    } else {
      setFrom({...form, emailError: '', emailValid: true,email:email});
    }
  };
  const [dialog,setDialog] = React.useState({
    show:false,
    title:'',
    message:'',
  });
  const validatePassword = value => {
    if (value.length >= 6) {
      setFrom({...form, passwordError: '', passWordvalid: true,password:value});
    } else {
      setFrom({
        ...form,
        passwordError: 'Password to short',
        passWordvalid: false,
        password:value,
      });
    }
  };
  const isEnabled = () => {
    return form.passWordvalid && form.emailValid && form.submittin === false;
  };
  const login = () =>{
    setFrom({...form,submittin:true});
    setLabel(<View>
      <ActivityIndicator color="#fff" style="large" />
    </View>);
    var data = JSON.stringify({
      user_mail:form.email,
      user_password:form.password,
    });
    axios({
      method:'POST',
      url: 'https://foodieback.herokuapp.com/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data:data,
    }).then(response=>{
      setFrom({...form,submittin:false});
    setLabel('Sign In');
      if (response.status === 200){
        dispatch(saveUser({user:response.data.customer}));
        dispatch(saveToken({token:response.data.token}));
        navigation.navigate('Home');
      } else {
        setDialog({...dialog,show:true,title:'Error occured',message:response.response.data.message});
      }
    }).catch(response=>{
      setFrom({...form,submittin:false});
    setLabel('Sign In');
      setDialog({...dialog,show:true,title:'Error occured',message:response.response.data.message});
    });
  };
  return (
    <AuthLayout title="Lets join" sutitle="Do uou want tno">
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}>
          <AlertDialog
          see={dialog.show}
          title={dialog.title}
          message={dialog.message}
          secondLabel="OK"
          secondOption={()=>setDialog({...dialog,show:false})}
          cancelOption={()=>setDialog({...dialog,show:false})}
          />
        <FormInput
          label="Email"
          placeholder="Enter Email"
          keyboardType="email-address"
          autoCompleteType="email"
          onChange={value => {
            validateEmail(value);
          }}
          errorMsg={form.emailError}
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={icons.error_tick}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: form.emailError === '' ? COLORS.green : COLORS.red,
                }}
              />
            </View>
          }
        />
        <FormInput
          label={'Password'}
          placeholder={'password here'}
          secureTextEntry={see}
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.padding,
          }}
          onChange={value => {
            validatePassword(value);
          }}
          errorMsg={form.passwordError}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setSee(!see)}>
              <Image
                source={see ? icons.eye : icons.eye_closed}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'space-between',
          }}>
          <Switch
            onValueChange={value => {
              setRememberMe(!remeberMe);
            }}
            value={remeberMe}
          />
          <TextButton
            label="Forgot Password"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              ...FONTS.body4,
              color: COLORS.gray,
            }}
            onPress={() => {
              navigation.navigate('forgotpassword');
            }}
          />
        </View>
        <TextButton
          label={label}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
          }}
          disabled={isEnabled() ? false : true}
          onPress={() => {
           login();
           // navigation.navigate('Home');
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.darkGray,
            }}>
            Don't have and account?
          </Text>
          <TextButton
            label="Sign Up"
            buttonContainerStyle={{
              backgroundColor: null,
              marginLeft: SIZES.radius,
            }}
            labelStyle={{
              ...FONTS.h3,
              color: COLORS.primary,
            }}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
        </View>
        <View>
          <TextIconButton
            containerStyle={{
              height: 50,
              alignItems: 'center',
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.blue,
              marginTop: SIZES.padding * 2,
            }}
            label="Sign in With Facebook"
            iconLeft={icons.cart}
            iconStyle={{
              marginLeft: SIZES.radius,
              tintColor: COLORS.white,
            }}
            labelStyle={{
              marginLeft: SIZES.radius,
              color: COLORS.white,
            }}
            onPress={() => {
              console.log('exmpa');
            }}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

export default Signin;
