/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Image, TouchableOpacity, View,Text} from 'react-native';
import { createDrawerNavigator,DrawerContentScrollView } from '@react-navigation/drawer';
import {COLORS, SIZES,icons, dummyData, FONTS, constants} from '../constants';
import { MainLayout } from '../screens';
import Animated from 'react-native-reanimated';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setSelectedTab, setTest } from '../stores/tab/tabActions';
import { logoutUser } from '../stores/user/userActions';

const Drawer = createDrawerNavigator();
const CustomDrawerItem = ({label,icon,isFocus,onPress})=>{
    return (
        <TouchableOpacity style={{
            flexDirection:'row',
            height:40,
            marginBottom:SIZES.base,
            alignItems:'center',
            paddingLeft:SIZES.radius,
            borderRadius:SIZES.base,
            backgroundColor: isFocus ? COLORS.transparentBlack1 : null,
        }} 
        onPress={onPress}
        >
            <Image
            source={icon}
            style={{
                width:20,
                height:20,
                tintColor:COLORS.white,
                //...FONTS.h3
            }}
            />
            <Text
            style={{
                marginLeft:15,
                color:COLORS.white,
            }}
            >{label}</Text>
        </TouchableOpacity>
    );
};
const CustomDrawerComponent = ({navigation,selectedTab})=>{
    const user = useSelector(state=>state.userReducer.user);
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView
        scrollEnabled={true}
        contentContainerStyle={{flex:1}}
        >
            <View style={{flex:1,paddingHorizontal:SIZES.radius}}>
                <View style={{alignItems:'flex-start',justifyContent:'center'}}>
                    <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}} onPress={()=>navigation.closeDrawer()}>
                        <Image
                            source={icons.cross}
                            style={{
                                height:35,
                                width:35,
                                tintColor:COLORS.white,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{
                    flexDirection:'row',
                    marginTop:SIZES.radius,
                    alignItems:'center',
                }}>
                    <Image source={dummyData.myProfile.profile_image} style={{width:50,height:50,borderRadius:SIZES.radius}}/>
                    <View style={{marginLeft:SIZES.radius}}>
                        <Text
                            style={{
                                color:COLORS.white,...FONTS.h3,
                            }}
                        >{user?.user_name ?? 'Test'}</Text>
                        <Text style={{color:COLORS.white,...FONTS.body4}}>View Profile</Text>
                    </View>
                </TouchableOpacity>
                <View 
                style={{
                    flex:1,
                    marginTop:SIZES.padding
                }}
                >
                    <CustomDrawerItem
                     label={constants.screens.home}
                     icon={icons.home}
                     isFocus={selectedTab == constants.screens.home}
                     onPress={()=>{
                        dispatch(setSelectedTab({selectedTab:constants.screens.home}));
                        navigation.navigate('MainLayout');
                    }}/>
                    <CustomDrawerItem label={constants.screens.my_wallet} icon={icons.wallet} onPress={()=>{
                        dispatch(setSelectedTab({selectedTab:constants.screens.my_wallet}));
                        //navigation.navigate('MainLayout');
                    }}/>
                    <CustomDrawerItem label={constants.screens.notification} icon={icons.notification} onPress={()=>{
                        dispatch(setSelectedTab({selectedTab:constants.screens.notification}));
                        navigation.navigate('MainLayout');
                    }}/>
                    <CustomDrawerItem label={constants.screens.favourite} icon={icons.favourite} onPress={()=>{
                        //dispatch(setSelectedTab({test:constants.screens.favourite}))
                        navigation.navigate('MainLayout');
                    }}/>
                    <View style={{
                        height:1,
                        marginVertical:SIZES.radius,
                        marginLeft:SIZES.radius,
                        backgroundColor:COLORS.lightGray1
                    }}/>
                    <CustomDrawerItem label="Track your order" icon={icons.location}/>
                    <CustomDrawerItem label="Settings" icon={icons.setting}/>
                </View>
                <View style={{marginBottom:SIZES.padding}}>
                <CustomDrawerItem label="Logout" icon={icons.logout} onPress={()=>{
                    dispatch(logoutUser());
                    navigation.reset({
                        index:0,
                        routes:[{name:'SignIn'}],
                    });
                }}/>
                </View>
            </View>
        </DrawerContentScrollView>
    );};
const CustomDrawer = ({selectedTab,setSelectedTab}) =>{
    const [progress,setProgress] = React.useState(new Animated.Value(0));
    const scale = Animated.interpolateNode(progress,{
        inputRange:[0,1],
        outputRange:[1,0.8],
    });
    const borderRadius=Animated.interpolateNode(progress,{
        inputRange:[0,1],
        outputRange:[1,26],
    });
    const animatedStyle = {
        borderRadius,transform:[
            {     scale,
            },
        ],
    };
    return (
        <View style={{
            flex:1,
            backgroundColor:COLORS.primary,
        }}>
            <Drawer.Navigator
                screenOptions={{
                    drawerType:'slide',
                    drawerStyle:{
                        flex:1,
                        width:'65%',
                        paddingRight:20,
                        backgroundColor:'transparent',
                    },
                    overlayColor:'transparent',
                    swipeEnabled:true,
                    headerShown:false,
                }}
                initialRouteName="MainLayout"
                drawerContent={
                    props=>{
                        setTimeout(()=>{
                            setProgress(props.progress);
                        },0);
                        return (
                            <CustomDrawerComponent navigation={props.navigation} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
                        );
                    }
                }
            >
                <Drawer.Screen name="MainLayout">
                    { props=><MainLayout {...props} drawerAnimationStyle={animatedStyle} />}
                </Drawer.Screen>
            </Drawer.Navigator>

        </View>
    );
};

export default CustomDrawer;