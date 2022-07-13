/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React from 'react';
import { Text, View ,Image, Alert, ActivityIndicator} from 'react-native';
import { FormInput, TextButton } from '../../Components';
import { COLORS, icons, SIZES } from '../../constants';
import AuthLayout from './AuthLayout';
export const ForgotPassword = ({navigation}) => {
  const [phone,setPhone] = React.useState('');
  const [label ,setLabel] = React.useState('Reset');
  const requestPasswordReset = () =>{
    setLabel(<ActivityIndicator
    size="large"
    color={COLORS.white}
    />);
    axios({
      method:'post',
      headers:{
        'Content-Type':'application/json',
      },
      url:`/reset-password-request/${phone}`,
    }).then(response=>{
      setLabel('Reset');
      if (response.status === 200){
        navigation.navigate('passwordOtp',{
          phone:phone,
        });
      }
    }).catch(err=>{
      setLabel('Reset');
      Alert.alert('Error',err.response?.data?.message ?? 'Something Went Wrong Check The Number And Try Again',[
        {
          text:'Ok',
        },c
      ]);
    });
  };
  return (
  <AuthLayout
  title="Forgot password"
  sutitle="Enter phone number to reset password"
  >
    <View
    style={{
      flex:1,
      marginTop:SIZES.padding,
    }}
    >
      <FormInput
      label="Phone Number"
      placeholder="0712345678"
      keyboardType="phone-pad"
      onChange={(value)=>{
        setPhone(value);
      }}
      appendComponent={
        <View
        style={{
          justifyContent:'center',
        }}
        >
          <Image
          source={icons.profile}
          style={{
            height:20,
            width:20,
            tintColor:COLORS.white,
          }}
          />
        </View>
      }
      />
      <TextButton
      label={label}
      disabled={phone.length < 10}
      buttonContainerStyle={{
        height:55,
        alignItems:'center',
        marginTop:SIZES.padding,
        borderRadius:SIZES.radius,
      }}
      onPress={()=>requestPasswordReset()}
      />
    </View>
    </AuthLayout>
  );
};

export default ForgotPassword;
