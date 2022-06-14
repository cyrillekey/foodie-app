/* eslint-disable react-native/no-inline-styles */
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React from 'react';
import {View, Text, ActivityIndicator,Alert} from 'react-native';
import {AuthLayout} from '..';
import {TextButton} from '../../Components';
import {COLORS, FONTS, SIZES} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { saveToken, saveUser } from '../../stores/user/userActions';
const OtpScreen = ({navigation}) => {
  const [timer, setTimer] = React.useState(50);
  const [code, setCode] = React.useState('');
  const user = useSelector(state => state.userReducer.user);
  const [label, setLabel] = React.useState('Continue');
  const [clicked, setClicked] = React.useState(true);
  const dispatch = useDispatch();
  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const resendToken = () => {
    axios.get(
      `/get-activation-token/${user.user_phone}`,
    );
  };
  const checkCodeActivation = () => {
    setLabel(
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>,
    );
    setClicked(true);
    let data = JSON.stringify({
      user_id: user.customer_id,
      otp: code,
      phone_number: user.user_phone,
    });
    var config = {
      method: 'post',
      url: 'https://foodieback.herokuapp.com/activate-account',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(response => {
        setClicked(false);
        setLabel('Continue');
        if (response.status === 200){
          dispatch(saveToken({token:response.data.token}));
          dispatch(saveUser({user:response.data.customer}));
          navigation.reset({
            index:0,
            routes:[{name:'Home'}],
        });
        }
      })
      .catch(response => {
        setClicked(false);
        setLabel('Continue');
        Alert.alert('Error occured',response.response.data.message,[
          {
            text:'Cancel',
            onPress:()=>console.log('cancel'),
          },
          {
            text:'Ok',
            onPress:()=>console.log('Ok'),
          },
        ]);
      });
  };
  return (
    <AuthLayout
      title="Verification"
      sutitle={`Enter Verification code sent to ${user.user_phone}`}>
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding * 2,
        }}>
        <OTPInputView
          code={code}
          pinCount={4}
          style={{
            width: '100%',
            height: 50,
          }}
          codeInputFieldStyle={{
            width: 65,
            height: 65,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            color: COLORS.black,
            ...FONTS.h3,
          }}
          onCodeChanged={value => {
            if (value.length < 4) {
              setClicked(true);
            }
            setCode(value);
          }}
          onCodeFilled={value => {
            // console.log(value);
            setClicked(false);
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: SIZES.padding,
          }}>
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3,
            }}>
            Didn't receive code?
          </Text>
          <TextButton
            label={timer === 0 ? 'Resend' : `Resend (${timer})s`}
            disabled={timer === 0 ? false : true}
            buttonContainerStyle={{
              marginLeft: SIZES.radius,
              backgroundColor: null,
            }}
            labelStyle={{
              ...FONTS.h3,
              color: COLORS.primary,
            }}
            onPress={() => {
              setTimer(50);
              resendToken();
            }}
          />
        </View>
      </View>
      <View>
        <TextButton
          label={label}
          disabled={clicked}
          buttonContainerStyle={{
            borderRadius: SIZES.radius,
            height: 55,
            alignItems: 'center',
          }}
          onPress={() => {
            checkCodeActivation();
            //navigation.navigate("Home")
          }}
        />
        <View
          style={{
            marginTop: SIZES.padding,
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.darkGray,
            }}>
            By signing up, you agree
          </Text>
          <TextButton
            label="Terms and Condition"
            buttonContainerStyle={{
              backgroundColor: null,
              marginBottom: SIZES.base,
              marginTop: SIZES.base,
            }}
            labelStyle={{
              ...FONTS.h3,
              color: COLORS.primary,
            }}
          />
        </View>
      </View>
    </AuthLayout>
  );
};
export default OtpScreen;
