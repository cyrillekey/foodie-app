/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View,Image } from "react-native";
import { AuthLayout } from "..";
import { FormInput } from "../../Components";
import { SIZES ,icons, COLORS} from "../../constants";
const Signin=()=>{
    return (
        <AuthLayout
            title="Lets join"
            sutitle="Do uou want tno"
        >
            <View style={{
                flex:1,
                marginTop:SIZES.padding * 2
            }}>
                <FormInput
                label="Email"
                placeholder="Enter Email"
                keyboardType="email-address"
                autoCompleteType="email"
                onChange={(value)=>{

                }}
                errorMsg="Invalid email"
                appendComponent={
                    <View 
                    style={{
                        justifyContent:'center'
                    }}
                    >
                        <Image
                        source={icons.cherry}
                        style={{
                            height:20,
                            width:20,
                            tintColor:COLORS.green
                        }}
                        />
                    </View>
                }
                />
                <FormInput
                    label={"Password"}
                    placeholder={"password here"}
                />
            </View>
            </AuthLayout>
    );
}

export default Signin;