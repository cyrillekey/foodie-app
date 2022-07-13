/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {Header} from '../Components';
import { COLORS, SIZES,icons, FONTS, constants } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import { Favourite, Home ,Orders,Profile,Restaurant} from './index';
import axios from 'axios';
import { addOrders } from '../stores/products/productActions';
import { universalErrorhandlerWithSnackbar } from '../constants/util';
const TabButton = ({label,icon,isFocus,onPress,innerContainerStyle,outerContainerStyle,navigation})=>{
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View style={[{
                flex:1,
                alignItems:'center',
                justifyContent:'center',
                },
                outerContainerStyle,
            ]}>
                <Animated.View style={[{
                    flexDirection:'row',
                    width:'80%',
                    height:50,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:25,
                },innerContainerStyle]
                }>
                    <Image source={icon} style={{
                        width:20,
                        height:20,
                        tintColor: isFocus ? COLORS.white : COLORS.gray,
                        borderWidth:4,
                    }}/>
                    {
                        isFocus && <Text
                            numberOfLines={1}
                        style={{
                            marginLeft:SIZES.base,
                            ...FONTS.h3,
                            color:COLORS.white,
                        }}>
                            {label}
                        </Text>
                    }
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};
const MainLayout = ({drawerAnimationStyle,navigation}) => {
    const flasListRef = React.useRef();
    const homeTabFlex = useSharedValue(1);
    const homeTabColor = useSharedValue(COLORS.white);
    const searchTabFlex = useSharedValue(1);
    const searchTabColor = useSharedValue(COLORS.white);
    const favouriteTabFlex = useSharedValue(1);
    const favouriteTabColor = useSharedValue(COLORS.white);
    const notificationTabFlex = useSharedValue(1);
    const notificationTabColor = useSharedValue(COLORS.white);
    const orderTabFlex = useSharedValue(1);
    const orderTabColor = useSharedValue(COLORS.white);
    const dispatch = useDispatch();
    const user = useSelector(state=>state.userReducer.user);
    const token = useSelector(state=>state.userReducer.jwtToken);
    const getOrders = (type) =>{
        var config = {
          method: 'get',
          url: `/customer/get-customer-order/${user?.customer_id}/2`,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        axios(config).then(response=>{
          dispatch(addOrders(response.data));
        }).catch(response=>{
            universalErrorhandlerWithSnackbar(response);
        });
      };
    //Animation stylr
    const homeFlexStyle = useAnimatedStyle(()=>{
        return {
            flex:homeTabFlex.value,
        };
    });
    const homeColorrStyle = useAnimatedStyle(()=>{
        return {
            backgroundColor:homeTabColor.value,
        };
    });
    const searchFlexStyle = useAnimatedStyle(()=>{
        return {
            flex:searchTabFlex.value,
        };
    });
    const searchColorrStyle = useAnimatedStyle(()=>{
        return {
            backgroundColor:searchTabColor.value,
        };
    });
    const favouriteFlexStyle = useAnimatedStyle(()=>{
        return {
            flex:favouriteTabFlex.value,
        };
    });
    const favouriteColorrStyle = useAnimatedStyle(()=>{
        return {
            backgroundColor:favouriteTabColor.value,
        };
    });
    const notificationFlexStyle = useAnimatedStyle(()=>{
        return {
            flex:notificationTabFlex.value,
        };
    });
    const notificationColorrStyle = useAnimatedStyle(()=>{
        return {
            backgroundColor:notificationTabColor.value,
        };
    });
    const orderFlexStyle = useAnimatedStyle(()=>{
        return {
            flex:orderTabFlex.value,
        };
    });
    const orderColorrStyle = useAnimatedStyle(()=>{
        return {
            backgroundColor:orderTabColor.value,
        };
    });
    const selected = useSelector(state=>state.tabReducer.selectedTab);
    React.useEffect(()=>{
        dispatch(setSelectedTab({selectedTab:constants.screens.home}));
    },[dispatch]);
    React.useEffect(()=>{
        if (selected === constants.screens.home){
            flasListRef?.current?.scrollToIndex({
                index:0,
                amimated:false,
            });
            homeTabFlex.value = withTiming(4,{duration:500});
            homeTabColor.value = withTiming(COLORS.primary,{duration:500});
        } else {
            homeTabFlex.value = withTiming(1,{duration:500});
            homeTabColor.value = withTiming(COLORS.white,{duration:500});
        }
        if (selected === constants.screens.favourite){
            flasListRef?.current?.scrollToIndex({
                index:1,
                amimated:false,
            });
            favouriteTabFlex.value = withTiming(4,{duration:500});
            favouriteTabColor.value = withTiming(COLORS.primary,{duration:500});
        } else {
            favouriteTabFlex.value = withTiming(1,{duration:500});
            favouriteTabColor.value = withTiming(COLORS.white,{duration:500});
        }
        if (selected === constants.screens.restaurant){
            flasListRef?.current?.scrollToIndex({
                index:2,
                amimated:false,
            });
            searchTabFlex.value = withTiming(4,{duration:500});
            searchTabColor.value = withTiming(COLORS.primary,{duration:500});
        } else {
            searchTabFlex.value = withTiming(1,{duration:500});
            searchTabColor.value = withTiming(COLORS.white,{duration:500});
        }
        if (selected === constants.screens.orders){
            flasListRef?.current?.scrollToIndex({
                index:3,
                amimated:false,
            });
            orderTabFlex.value = withTiming(4,{duration:500});
            orderTabColor.value = withTiming(COLORS.primary,{duration:500});
        } else {
            orderTabFlex.value = withTiming(1,{duration:500});
            orderTabColor.value = withTiming(COLORS.white,{duration:500});
        }
        if (selected === constants.screens.profile){
            flasListRef?.current?.scrollToIndex({
                index:4,
                amimated:false,
            });
            notificationTabFlex.value = withTiming(4,{duration:500});
            notificationTabColor.value = withTiming(COLORS.primary,{duration:500});
        } else {
            notificationTabFlex.value = withTiming(1,{duration:500});
            notificationTabColor.value = withTiming(COLORS.white,{duration:500});
        }
    });
    return (
        <Animated.View
        style={{
            flex:1,
            backgroundColor:COLORS.white2,
            color:COLORS.black,
            ...drawerAnimationStyle,

        }}
        >
            <Header title={selected} containerStye={{
                height:50,
                marginTop:10,
                alignItems:'center',
                paddingHorizontal:SIZES.padding,
            }}
            leftComponent={
                <TouchableOpacity style={{
                    width:40,
                    height:40,
                    alignItems:'center',
                    justifyContent:'center',
                    borderWidth:1,
                    borderColor:COLORS.gray2,
                    borderRadius:SIZES.radius,
                }}
                onPress={()=>navigation.openDrawer()}

                >
                    <Image source={icons.menu}/>
                </TouchableOpacity>
            }
            quantity={14}
            navigation={navigation}
            />
            <View style={{
                flex:1,
            }}>
            <FlatList ref={flasListRef}
                horizontal
                scrollEnabled={false}
                pagingEnabled
                snapToAlignment = "center"
                snapToInterval={SIZES.width}
                showsHorizontalScrollIndicator={false}
                data={constants.bottom_tabs}
                keyExtractor={item=>`${item.id}`}
                renderItem={({item,index})=>{
                    return (
                        <View style={{
                            height:'100%',
                            width:SIZES.width,
                        }}>
                            {item.label == constants.screens.home && <Home {...navigation}/>}
                            {item.label == constants.screens.favourite && <Favourite {...navigation}/>}
                            {item.label == constants.screens.restaurant && <Restaurant {...navigation}/>}
                            {item.label == constants.screens.orders && <Orders {...navigation} />}
                            {item.label == constants.screens.profile && <Profile {...navigation} />}
                        </View>
                    );}}
            />
            </View>
            <View style={{
                height:80,
                justifyContent:'flex-end',
            }}>
                <View style={{
                    flex:1,
                    flexDirection:'row',
                    paddingHorizontal:SIZES.radius,
                    paddingBottom:10,
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    backgroundColor:COLORS.white,
                }}>
                    <TabButton
                        label="Home"
                        icon={icons.home}
                        isFocus={selected == constants.screens.home}
                        onPress={()=>{dispatch(setSelectedTab({selectedTab:constants.screens.home}));}}
                        outerContainerStyle={homeFlexStyle}
                        innerContainerStyle={homeColorrStyle}
                        />
                    <TabButton label="Favourite" icon={icons.favourite} isFocus={selected == constants.screens.favourite} onPress={()=>{dispatch(setSelectedTab({selectedTab:constants.screens.favourite}));}}
                    outerContainerStyle={favouriteFlexStyle}
                    innerContainerStyle={favouriteColorrStyle}
                    />
                    <TabButton label="Restaurants" icon={icons.menu} isFocus={selected == constants.screens.restaurant} onPress={()=>{dispatch(setSelectedTab({selectedTab:constants.screens.restaurant}));}}
                    outerContainerStyle={searchFlexStyle}
                    innerContainerStyle={searchColorrStyle}
                    />
                    <TabButton label="Orders" icon={icons.cart} isFocus={selected == constants.screens.orders} onPress={()=>{
                        getOrders();
                        dispatch(setSelectedTab({selectedTab:constants.screens.orders}));
                    }}
                    outerContainerStyle={orderFlexStyle}
                    innerContainerStyle={orderColorrStyle}/>
                    <TabButton label="Profile" icon={icons.profile} isFocus={selected == constants.screens.profile} onPress={()=>{dispatch(setSelectedTab({selectedTab:constants.screens.profile}));}}
                    outerContainerStyle={notificationFlexStyle}
                    innerContainerStyle={notificationColorrStyle}/>
                </View>
            </View>
        </Animated.View>
    );
};
export default MainLayout;
