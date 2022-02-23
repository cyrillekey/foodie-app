import OTPInputView from '@twotalltotems/react-native-otp-input';
import React from 'react'
import { View,Text } from 'react-native'
import { AuthLayout } from '..';
import { TextButton } from '../../Components';
import { COLORS, FONTS, SIZES } from '../../constants';
const OtpScreen = ({navigation}) => {
  const [timer,setTimer]=React.useState(50)
  React.useEffect(()=>{
    let interval = setInterval(()=>{
      setTimer(prevTimer=>{
        if(prevTimer>0){
          return prevTimer-1
        }else{
          return prevTimer
        }
      })
    },1000)

    return () =>clearInterval(interval)
  },[])
  return (
    <AuthLayout
    title="Verification"
    sutitle="Enter Verification code sent to 0712345678"
    >
      <View style={{
        flex:1,
        marginTop:SIZES.padding * 2
      }}>
        <OTPInputView
          pinCount={4}
          style={{
            width:'100%',
            height:50
          }}
          codeInputFieldStyle={{
            width:65,
            height:65,
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.lightGray2,
            color:COLORS.black,
            ...FONTS.h3
          }}
          onCodeFilled={(code)=>{
            console.log(code)
          }}
        />
      <View style={{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:SIZES.padding
      }}>
        <Text
          style={{
            color:COLORS.darkGray,...FONTS.body3
          }}
        >
          Didn't receive code?
        </Text>
        <TextButton

          label={ timer==0 ?'Resend' :`Resend (${timer})s`}
          disabled={timer==0 ?false:true}
          buttonContainerStyle={{
            marginLeft:SIZES.radius,
            backgroundColor:null
          }}
          labelStyle={{
            ...FONTS.h3,
            color:COLORS.primary,
          }}
          onPress={()=>{
            setTimer(50)
          }}
        />
      </View>
      </View>
      <View>
        <TextButton
          label="Continue"
          buttonContainerStyle={{
            borderRadius:SIZES.radius,
            height:55,
            alignItems:'center',
          }}
          onPress={()=>{
            navigation.navigate("Home")
          }}
        />
        
      <View
      style={{
        marginTop:SIZES.padding,
        alignItems:'center',
      }}
      >
        <Text
        style={{
          ...FONTS.h3,
          color:COLORS.darkGray,
        }}
        >
          By signing up, you agree
        </Text>
        <TextButton
          label="Terms and Condition"
          buttonContainerStyle={{
            backgroundColor:null,
            marginBottom:SIZES.base,
            marginTop:SIZES.base
          }}
          labelStyle={{
            ...FONTS.h3,
            color:COLORS.primary
          }}
        />
      </View>
      </View>
      
    </AuthLayout>
  )
}

export default OtpScreen;