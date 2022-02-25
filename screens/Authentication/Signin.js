/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View,Image, TouchableOpacity, Switch,Text } from "react-native";
import { AuthLayout } from "..";
import { FormInput, TextButton, TextIconButton } from "../../Components";
import { SIZES ,icons, COLORS, FONTS} from "../../constants";
const Signin=({navigation})=>{
    const [see,setSee]=React.useState(true)
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
                        source={icons.error_tick}
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
                    secureTextEntry={see}
                    autoCompleteType="password"
                    containerStyle={{
                        marginTop:SIZES.padding
                    }}
                    onChange={()=>{

                    }}
                    appendComponent={
                        <TouchableOpacity style={{
                            width:40,
                            alignItems:'flex-end',
                            justifyContent:'center'
                        }}
                        onPress={()=>setSee(!see)}
                        >
                            <Image
                            source={see ?icons.eye:icons.eye_closed}
                            style={{
                                height:20,
                                width:20,
                                tintColor:COLORS.gray
                            }}
                            
                            />
                            
                        </TouchableOpacity>
                    }
                />
                <View style={{
                    flexDirection:'row',
                    marginTop:SIZES.radius,
                    justifyContent:'space-between'
                }}>
                    <Switch
                        onValueChange={(value)=>{
                            console.log(value)
                        }}
                        value={true}
                    />
                    <TextButton
                        label="Forgot Password"
                        buttonContainerStyle={{
                            backgroundColor:null
                        }}
                        labelStyle={{
                            ...FONTS.body4,
                            color:COLORS.gray
                        }}
                        onPress={()=>{
                            navigation.navigate("forgotpassword")
                        }}
                    />
                </View>
                <TextButton
                    label="Sign In"
                    buttonContainerStyle={{
                        height:55,
                        alignItems:'center',
                        marginTop:SIZES.padding,
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.primary
                    }}
                    disabled={false}
                    onPress={()=>{
                        navigation.navigate('Home')
                    }}
                />
                <View 
                    style={{
                       flexDirection:'row',
                       marginTop:SIZES.radius,
                       justifyContent:'center' 
                    }}
                >
                    <Text
                    style={{
                        ...FONTS.body3,
                        color:COLORS.darkGray
                    }}
                    >
                    Don't have and account? 
                    </Text>
                    <TextButton
                        label="Sign Up"
                        buttonContainerStyle={{
                            backgroundColor:null,
                            marginLeft:SIZES.radius
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                            color:COLORS.primary
                        }}
                        onPress={()=>{
                            navigation.navigate("SignUp")
                        }}
                    />
                </View>
                
            </View>
            <View>
                    <TextIconButton
                    containerStyle={{
                        height:50,
                        alignItems:'center',
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.blue,
                        marginBottom:SIZES.padding
                    }}
                        label="Sign in With Facebook"
                        iconLeft={
                            icons.cart
                        }
                        iconStyle={{
                            marginLeft:SIZES.radius,
                            tintColor:COLORS.white
                        }}
                        labelStyle={{
                            marginLeft:SIZES.radius,
                            color:COLORS.white
                        }}
                        onPress={()=>{
                            console.log("exmpa")
                        }}
                    />
                </View>
            </AuthLayout>
    );
}

export default Signin;