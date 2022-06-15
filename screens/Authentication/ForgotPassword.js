/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View ,Image} from 'react-native';
import { FormInput, TextButton } from '../../Components';
import { COLORS, icons, SIZES } from '../../constants';
import AuthLayout from './AuthLayout';
export const ForgotPassword = () => {
  const [phone,setPhone] = React.useState('');
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
      keyboardType="tel"
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
      label="Reset"
      buttonContainerStyle={{
        height:55,
        alignItems:'center',
        marginTop:SIZES.padding,
        borderRadius:SIZES.radius,
      }}
      onPress={()=>console.log("")}
      />
    </View>
    </AuthLayout>
  );
};

export default ForgotPassword;
