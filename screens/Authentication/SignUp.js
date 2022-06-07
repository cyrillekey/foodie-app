/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from 'react'
import { Text, View } from 'react-native';
import { AuthLayout } from '..';
import { FormInput, TextButton } from '../../Components';
import { SIZES ,FONTS,COLORS} from '../../constants';
import axios from 'axios';
const SignUp=({navigation})=>{
    const [form,setForm]=React.useState({
        email:"",
        phone:"",
        password:""
    });
    const signUp=()=>{
        var data = JSON.stringify({
              "user_name": form.email,
              "user_mail":form.email,
              "password": form.password,
              "user_phone": form.phone,
              "accountType": "CUSTOMER"
          });
          
          var config = {
            method: 'post',
            url: "https://foodieback.herokuapp.com/register",
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            if(response.status=="201"){
                navigation.navigate("Otp");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <AuthLayout
            title="Sign Uo"
            sutitle="Welcome to the land of munchies"
        >
            <View
                style={{
                    flex:1,
                    marginTop:SIZES.padding,
                }}
            >
                <FormInput
                    label="Email"
                    placeholder="Enter mail"
                    keyboardType="email-address"
                    autoCompleteType="email"
                    errorMsg="invalid email"
                    onChange={(text)=>{
                        setForm({...form,email:text});
                    }}
                    containerStyle={{
                        marginTop:SIZES.padding,
                    }}
                />
                <FormInput
                label="Phone Number"
                placeholder="+254712345678"
                autoCompleteType="tel"
                keyboardType="phone-pad"
                onChange={(text)=>{
                    setForm({...form,phone:text});
                }}
                containerStyle={{
                    marginTop:SIZES.padding,
                }}
                />
                <FormInput
                label="Password"
                placeholder="********"
                secureTextEntry={true}
                onChange = {(value)=>{
                    setForm({...form,password:value});
                }}
                containerStyle={{
                    marginTop:SIZES.padding,
                }}
                />
                <TextButton
                    label={'Sign Up'}
                    buttonContainerStyle={{
                        height:55,
                        borderRadius:SIZES.radius,
                        alignItems:'center',
                        marginTop:SIZES.padding,
                    }}
                    onPress={()=>{
                        signUp()
                        //navigation.navigate('Otp');
                    }}
                />
                <View
                    style={{
                       flexDirection:'row',
                       marginTop:SIZES.radius,
                       justifyContent:'center',
                       marginBottom:SIZES.padding * 2
                    }}
                >
                    <Text
                    style={{
                        ...FONTS.body3,
                        color:COLORS.darkGray,
                    }}
                    >
                    Already Have an account?
                    </Text>
                    <TextButton
                        label="Sign Up"
                        buttonContainerStyle={{
                            backgroundColor:null,
                            marginLeft:SIZES.radius,
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                            color:COLORS.primary,
                        }}
                        onPress={()=>{
                            navigation.navigate('SignIn');
                        }}
                    />
                </View>
            </View>
        </AuthLayout>
    );
}
export default SignUp;