/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View,StyleSheet,Image, SafeAreaView, TouchableOpacity,ActivityIndicator } from 'react-native';
import { Iconlabel, LineDivider } from '../../Components';
import { COLORS, FONTS,icons,images, SIZES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../stores/user/userActions';
import { getAddressName } from '../../constants/util';
const Profile = (navigation) => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.userReducer.user);
    const [form,setForm] = React.useState(<ActivityIndicator/>);
    const address = useSelector(state=>state.userReducer.address);
    getAddressName(address.latitude,address.longitude,setForm);
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
        onMagicTap={()=>{
        }}
        >
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
            }}
            >
                <Image
                source={user?.profile_picture == null ? images.profile : {uri:user.profile_picture}}
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
        label={form}
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
            borderRightColor:COLORS.black,
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
    <View
    style={{
        marginTop:10,
    }}
    >
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate('editProfile');
        }}
        >
            <View
            style={{
                flexDirection:'row',
                paddingVertical:15,
                paddingHorizontal:30,
            }}
            >
                <Image source={icons.clock} style={{height:25,width:25,tintColor:'#FF6347'}}/>
                <Text
                style={{
                    color:'#777777',
                    marginLeft:20,
                    fontWeight:'600',
                    fontSize:16,
                    lineHeight:26,
                }}
                >Edit Profile</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View
            style={{
                flexDirection:'row',
                paddingVertical:15,
                paddingHorizontal:30,
            }}
            >
                <Image source={icons.clock} style={{height:25,width:25,tintColor:'#FF6347'}}/>
                <Text
                style={{
                    color:'#777777',
                    marginLeft:20,
                    fontWeight:'600',
                    fontSize:16,
                    lineHeight:26,
                }}
                >Support</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{
            dispatch(logoutUser());
                    navigation.reset({
                        index:0,
                        routes:[{name:'SignIn'}],
                    });
        }}
        >
            <View
            style={{
                flexDirection:'row',
                paddingVertical:15,
                paddingHorizontal:30,
            }}
            >
                <Image source={icons.logout} style={{height:25,width:25,tintColor:'#FF6347'}}/>
                <Text
                style={{
                    color:'#777777',
                    marginLeft:20,
                    fontWeight:'600',
                    fontSize:16,
                    lineHeight:26,
                }}
                >Logout</Text>
            </View>
        </TouchableOpacity>
    </View>
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
