/* eslint-disable react/self-closing-comp */
import React from 'react'
import { Text, View } from 'react-native';
import { AuthLayout } from '..';
import { FormInput, TextButton } from '../../Components';
import { SIZES } from '../../constants';
const SignUp=({navigation})=>{
    return (
        <AuthLayout
            title="Sign Uo"
            sutitle="Welcome to the land of munchies"
        >
            <View
                style={{
                    flex:1,
                    marginTop:SIZES.padding * 1.5
                }}
            >
                <FormInput
                    label="Email"
                    placeholder="Enter mail"
                    keyboardType='email-address'
                    autoCompleteType='email'
                    errorMsg='invalid email'
                    onChange={(text)=>{
                        console.log(text)
                    }}
                />
                <TextButton
                    label={"Otp Section"}
                    buttonContainerStyle={{
                        height:55,
                        borderRadius:SIZES.radius,
                        alignItems:'center',
                        marginTop:SIZES.padding
                    }}
                    onPress={()=>{
                        navigation.navigate("Otp")
                    }}
                />
            </View>
        </AuthLayout>
    );
}
export default SignUp;