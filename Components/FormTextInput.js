/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
const FormInput = ({
    containerStyle,
    label,
    placeholder,
    inputStyle,
    prependComponent,
    appendComponent,
    onChange,
    secureTextEntry,
    keyboardType = 'default',
    autoCompleteType = 'off',
    autoCapitalize = 'none',
    errorMsg = ' ',
})=>{
    return (
        <View style={{...containerStyle}}>
            <View
                style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                }}
            >
                <Text
                style={{
                    ...FONTS.body4,
                    color:COLORS.gray,
                }}
                >{label}</Text>
                <Text
                style={{...FONTS.body4,color:COLORS.red}}
                >
                    {errorMsg}
                </Text>
            </View>
            <View
            style={{
                flexDirection:'row',
                height:55,
                paddingHorizontal:SIZES.padding,
                marginTop:SIZES.base,
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.lightGray2,
            }}
            >
                {prependComponent}
                <TextInput
                    style={{
                        flex:1,
                        ...inputStyle,
                        color:COLORS.black
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoComplete={autoCompleteType}
                    autoCapitalize={autoCapitalize}
                    onChangeText={(text)=>onChange(text)}
                />
                {appendComponent}
            </View>
        </View>
    );
};

export default FormInput;
