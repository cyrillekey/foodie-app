/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View,Image, TouchableOpacity, Switch,Text, Button } from "react-native";
import { AuthLayout } from "..";
import { FormInput, TextButton, TextIconButton } from "../../Components";
import { SIZES ,icons, COLORS, FONTS} from "../../constants";
const Signin = ({navigation})=>{
    const [see,setSee] = React.useState(true);
    const [form,setFrom]=React.useState({
        password:'',
        email:'',
        emailError:'',
        passwordError:'',
        passWordvalid:false,
        emailValid:false
    });
    const validateEmail = (email)=> {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!res.test(String(email).toLowerCase())){
            setFrom({...form,emailError:'Invalid Email',emailValid:false})
        } else {
            setFrom({...form,emailError:'',email:true})
        }
      };
    const validatePassword = (value)=>{
        if(value.length>=6){
            setFrom({...form,passwordError:'',passWordvalid:true})
        } else {
            setFrom({...form,passwordError:'Password to short',passWordvalid:false})
        }
    };
    return (
        <AuthLayout
            title="Lets join"
            sutitle="Do uou want tno"
        >
            <View style={{
                flex:1,
                marginTop:SIZES.padding * 2,
            }}>
                <FormInput
                label="Email"
                placeholder="Enter Email"
                keyboardType="email-address"
                autoCompleteType="email"
                onChange={(value)=>{
                    validateEmail(value);
                }}
                errorMsg={form.emailError}
                appendComponent={
                    <View
                    style={{
                        justifyContent:'center',
                    }}
                    >
                        <Image
                        source={icons.error_tick}
                        style={{
                            height:20,
                            width:20,
                            tintColor:form.emailError === '' ? COLORS.green : COLORS.red,
                        }}
                        />
                    </View>
                }
                />
                <FormInput
                    label={'Password'}
                    placeholder={'password here'}
                    secureTextEntry={see}
                    autoCompleteType="password"
                    containerStyle={{
                        marginTop:SIZES.padding,
                    }}
                    onChange={(value)=>{
                        validatePassword(value);
                    }}
                    errorMsg={form.passwordError}
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
                        value={false}
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
                    }}
                    disabled={!form.passWordvalid && !form.emailValid}
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
                <View
            ><TextIconButton
                    containerStyle={{
                        height:50,
                        alignItems:'center',
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.blue,
                        marginTop:SIZES.padding*2,
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
                            console.log("exmpa");
                        }}
                    />
                </View>
            </View> 
            </AuthLayout>
    );
}

export default Signin;