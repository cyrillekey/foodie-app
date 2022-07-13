/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native'
import React from 'react'
import AuthLayout from './AuthLayout';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { COLORS, FONTS, SIZES } from '../../constants';
import { TextButton } from '../../Components';

const PasswordOtp = ({navigation,route}) => {
    const [timer,setTimer]= React.useState(50);
    const [code,setCode] = React.useState('');
    const phone = route.params.phone;
  return (
    <AuthLayout
    title="Password Reset"
    sutitle={`Enter Reset Code Sent To ${phone}`}
    >
        <View
        style={{
            flex:1,
            marginTop:SIZES.padding * 2
        }}
        >
        <OTPInputView
        code={code}
        pinCount={4}
        style={{
            width:'100%',
            height:50,
        }}
        codeInputFieldStyle={{
            width:65,
            height:65,
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.lightGray2,
            color:COLORS.black,
            ...FONTS.h3,
        }}
        onCodeChanged={(value)=>{
            setCode(value);
        }}
        />
        <View
        style={{
            flexDirection:'row',
            justifyContent:'center',
            marginTop: SIZES.padding * 3,
        }}
        >
            <Text
            style={{
                ...FONTS.body3,
                color:COLORS.darkGray,
            }}
            >Didn't Receive Code?</Text>
            <TextButton
            label={timer === 0 ? 'Resend' : `Resend in ${timer}s`}
            disabled={!(timer === 0)}
            buttonContainerStyle={{
                marginLeft:SIZES.radius,
                backgroundColor:null,
            }}
            labelStyle={{
                ...FONTS.h3,
                color:COLORS.primary,
            }}
            />
        </View>
        </View>
        <View>
            <TextButton
            label="Submit"
            disabled={code.length < 4}
            buttonContainerStyle={{
                borderRadius:SIZES.radius,
                height:55,
                alignItems:'center',
            }}
            onPress={()=>{}}
            />
        </View>
    </AuthLayout>
  );
};

export default PasswordOtp;
