/* eslint-disable no-useless-escape */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {AuthLayout} from '..';
import {FormInput, TextButton} from '../../Components';
import {SIZES, FONTS, COLORS, icons} from '../../constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../stores/user/userActions';
import { universalErroHandlerWithAlert } from '../../constants/util';
const SignUp = ({navigation}) => {
  const [see, setSee] = React.useState(true);
  const [submit, setSubmit] = React.useState('Sign Up');
  const dispath = useDispatch();
  const [form, setForm] = React.useState({
    email: '',
    phone: '',
    password: '',
    emailError: '',
    passwordError: '',
    passWordvalid: '',
    emailValid: '',
    submitting: false,
  });
  const signUp = () => {
    setSubmit(
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <ActivityIndicator size="large" color="white" />
      </View>,
    );
    setForm({...form, submitting: true});
    var data = JSON.stringify({
      user_name: form.email,
      user_mail: form.email,
      password: form.password,
      user_phone: form.phone,
      accountType: 'CUSTOMER',
    });
    var config = {
      method: 'post',
      url: '/register',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setForm({...form, submitting: false});
        setSubmit('Sign Up');
        if (response.status === 201) {
            dispath(saveUser({user:response.data.customer}));
           navigation.navigate('Otp');
        } else {
          Alert.alert('Something Went Wrong!',response.response.data.message,[
            {
              text:'Cancel',
            },
            {
              text:'Ok',
            },
          ]);
        }
      })
      .catch(function (e) {
        setForm({...form, submitting: false});
        setSubmit('Sign Up');
        universalErroHandlerWithAlert(e,{label:'Ok'});
      });
  };
  const validateEmail = (text) => {
    const res =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!res.test(String(text).toLowerCase())) {
      setForm({...form, emailError: 'Invalid Email', emailValid: false,email:text});
    } else {
      setForm({...form, emailError: '', emailValid: true,email:text});
    }
  };
  const validatePassword = value => {
    if (value.length >= 6) {
      setForm({...form, passwordError: '', passWordvalid: true,password:value});
    } else {
      setForm({
        ...form,
        passwordError: 'Password to short',
        passWordvalid: false,
        password:value,
      });
    }
  };
  const isEnabled = () => {
    return (
      form.passWordvalid &&
      form.emailValid &&
      form.phone !== '' &&
      form.submitting === false
    );
  };
  return (
    <AuthLayout title="Sign Up" sutitle="Welcome to the land of munchies">
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding,
        }}>
        <FormInput
          label="Email"
          placeholder="Enter mail"
          keyboardType="email-address"
          autoCompleteType="email"
          errorMsg={form.emailError}
          onChange={text => {
            validateEmail(text);
          }}
          containerStyle={{
            marginTop: SIZES.padding,
          }}
        />
        <FormInput
          label="Phone Number"
          placeholder="0712345678"
          autoCompleteType="tel"
          keyboardType="phone-pad"
          onChange={text => {
            setForm({...form, phone: text});
          }}
          containerStyle={{
            marginTop: SIZES.padding,
          }}
        />
        <FormInput
          label="Password"
          placeholder="********"
          secureTextEntry={see}
          errorMsg={form.passwordError}
          onChange={value => {
            validatePassword(value);
          }}
          containerStyle={{
            marginTop: SIZES.padding,
          }}
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
        <TextButton
          label={submit}
          buttonContainerStyle={{
            height: 55,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            marginTop: SIZES.padding,
          }}
          disabled={isEnabled() ? false : true}
          onPress={() => {
            signUp();
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
            Already Have an account?
          </Text>
          <TextButton
            label="Sign In"
            buttonContainerStyle={{
              backgroundColor: null,
              marginLeft: SIZES.radius,
            }}
            labelStyle={{
              ...FONTS.h3,
              color: COLORS.primary,
            }}
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
            marginBottom: SIZES.padding * 2,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.darkGray,
            }}>
           Verify account?
          </Text>
          <TextButton
            label="Otp"
            buttonContainerStyle={{
              backgroundColor: null,
              marginLeft: SIZES.radius,
            }}
            labelStyle={{
              ...FONTS.h3,
              color: COLORS.primary,
            }}
            onPress={() => {
              navigation.navigate('Otp');
            }}
          />
        </View>
      </View>
    </AuthLayout>
  );
};
export default SignUp;
