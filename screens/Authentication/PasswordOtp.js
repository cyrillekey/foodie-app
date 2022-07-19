/* eslint-disable react-native/no-inline-styles */
import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import AuthLayout from './AuthLayout';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { COLORS, FONTS, SIZES } from '../../constants';
import { TextButton } from '../../Components';
import axios from 'axios';
import { universalErroHandlerWithAlert } from '../../constants/util';

const PasswordOtp = ({navigation,route}) => {
    const phone = route.params.phone;
    const [timer,setTimer] =  React.useState(50);
    const [code,setCode] = React.useState('');
    const [disabled,setSubmitting] = React.useState(true);
    const [label,setLabel] = React.useState('Submit');
    React.useEffect(()=>{
        let interval = setInterval(()=>{
            setTimer(prevTimer=>{
              return  prevTimer > 0 ? ( prevTimer - 1 ) : prevTimer;
            });
        },1000);
        return ()=>clearInterval(interval);
    },[]);
    const verify_otp = () =>{
        setSubmitting(true);
        setLabel(<ActivityIndicator
        size="large"
        color={COLORS.white}
        />);
        axios({
            method:'post',
            headers:{
                'Content-Type':'application/json',
            },
            url:'/validate-password-token',
            data:{
                otp:code,
                phone_number:phone,
            },
        }).then(response=>{
            if (response.status === 200){
             navigation.navigate('passwordReset',{
                phone:phone,
                logged_in:false,
             });
            }
            setLabel('Submit');
            setSubmitting(false);
        }).catch(err=>{
            universalErroHandlerWithAlert(err,{label:'Ok'});
            setSubmitting(false);
            setLabel('Submit');
        });
    };
  return (
    <AuthLayout
    title="Password Reset"
    sutitle={`Enter Reset Code Sent To ${phone}`}
    >
        <View
        style={{
            flex:1,
            marginTop:SIZES.padding * 2,
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
            value.length < 4 ? setSubmitting(true) : setSubmitting(false);
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
            label={label}
            disabled={disabled}
            buttonContainerStyle={{
                borderRadius:SIZES.radius,
                height:55,
                alignItems:'center',
                justifyContent:'center',
            }}
            onPress={()=>verify_otp()}
            />
        </View>
    </AuthLayout>
  );
};

export default PasswordOtp;
