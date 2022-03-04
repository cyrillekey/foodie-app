/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View,Text,Image} from 'react-native';
import { COLORS, SIZES,images, FONTS } from '../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const AuthLayout = ({title,sutitle,titlecontainerStyle,children})=>{
    return (
            <View
            style={{
                flex:1,
                paddingVertical:SIZES.padding,
                backgroundColor:COLORS.white,
            }}>
                <KeyboardAwareScrollView
                keyboardDismissMode="on-drag"
                contentContainerStyle={{
                    flex:1,
                    paddingHorizontal:SIZES.padding,
                }}>
                    <View style={{
                    alignItems:'center',
                }}>
                    <Image
                     source={images.logo}
                     resizeMode="contain"
                     style={{
                        height:100,
                         width:200,
                         marginTop:SIZES.padding,
                     }}
                    />
                </View>
                <View
                style={{
                    marginTop:SIZES.padding,
                    ...titlecontainerStyle,
                }}
                >
                <Text
                        style={{
                            textAlign:'center',
                            ...FONTS.h2,
                        }}
                    >
                        {title}
                    </Text>
                    <Text style={{
                        textAlign:'center',
                        color:COLORS.darkGray,
                        marginTop:SIZES.base,
                        ...FONTS.body3,
                    }}>
                        {sutitle}
                    </Text>
                </View>
                {children}
                </KeyboardAwareScrollView>
            </View>
    );
};
export default AuthLayout;
