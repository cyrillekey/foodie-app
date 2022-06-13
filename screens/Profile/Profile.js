/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View,StyleSheet,Image, SafeAreaView } from 'react-native';
import { Iconlabel, LineDivider } from '../../Components';
import { COLORS, FONTS,icons,images, SIZES } from '../../constants';
import { useSelector } from 'react-redux';
const Profile = () => {
    const user = useSelector(state=>state.userReducer.user);
    console.log(user);
  return (
    <SafeAreaView
    style={styles.container}
    >
    <View
    style={{
    }}
    >
        <View
        style={styles.userInfoSection}
        >
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
            }}
            >
                <Image
                source={images.profile}
                style={{
                    height:60,
                    width:60,
                    borderRadius:40,
                }}
                />
                <View
                style={{
                    marginLeft:SIZES.padding,
                }}
                >
                    <Text
                    style={{
                        ...FONTS.h3,
                    }}
                    >{user?.user_name}</Text>
                    <Text
                    style={{
                        ...FONTS.h5,
                    }}
                    >
                        {user?.user_mail ?? 'test@mail.com'}
                    </Text>
                </View>
            </View>
        </View>
    </View>
    <View
    style={{
        marginBottom:SIZES.padding,
    }}
    >
    <Iconlabel
    containerStyle={{
        marginLeft:SIZES.padding,
    }}
    icon={icons.location}
    iconStyle={{
        tintColor:COLORS.black,
    }}
        label="Kaluta indi"
        labelStyle={{
            paddingLeft:SIZES.base,
        }}
    />
    <Iconlabel
    containerStyle={{
        marginLeft:SIZES.padding,
    }}
    icon={icons.cart}
    iconStyle={{
        tintColor:COLORS.black,
    }}
        label="cyrilleotieno7@gmail.com"
        labelStyle={{
            paddingLeft:SIZES.base,
        }}
    />
    <Iconlabel
    containerStyle={{
        marginLeft:SIZES.padding,
    }}
    icon={icons.call}
    iconStyle={{
        tintColor:COLORS.black,
    }}
        label={user?.user_phone}
        labelStyle={{
            paddingLeft:SIZES.base,
        }}
    />
    </View>
    <LineDivider
    lineStyle={{
        backgroundColor:COLORS.transparentBlack7,
    }}
    />
    <View
    style={{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        padding:SIZES.padding * 1.5,
    }}
    ><View
        style={{
            alignItems:'center',
            alignSelf:'center',
        }}
        ><Text
            style={{
                ...FONTS.body4,
            }}
            >$1250</Text>
            <Text
            style={{
                ...FONTS.body4,
            }}
            >Wallet</Text>
        </View>
        <View>
           <Text
           style={{
               ...FONTS.body4,
           }}
           >Hello wor</Text>
        </View>
    </View>
    <LineDivider
    lineStyle={{
        backgroundColor:COLORS.black,
    }}
    />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    userInfoSection:{
        paddingHorizontal:30,
        paddingBottom:25,
        paddingTop:SIZES.padding,
    },
});
export default Profile;
