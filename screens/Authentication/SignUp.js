/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React from 'react'
import { Text, View } from 'react-native';
import { AuthLayout } from '..';
import { FormInput, TextButton } from '../../Components';
import { SIZES ,FONTS,COLORS} from '../../constants';
const SignUp=({navigation})=>{
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
                        console.log(text);
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
                    console.log(text);
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
                    console.log(value);
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
                        navigation.navigate('Otp');
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