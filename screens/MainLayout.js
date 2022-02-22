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
import Animated, { useSharedValue } from 'react-native-reanimated';
import {Header} from '../Components';
import { COLORS, SIZES,icons, dummyData, FONTS, constants } from '../constants';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';

const TabButton=({label,icon,isFocus,onPress})=>{
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View style={{
                flex:1,
                alignItems:"center",
                justifyContent:"center"
            }}>
                <Animated.View style={{
                    flexDirection:"row",
                    width:"80%",
                    height:50,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:25
                }}>
                    <Image source={icon} style={{
                        width:20,
                        height:20,
                        tintColor:COLORS.gray,
                        borderWidth:4
                    }}/>
                    {
                        isFocus && <Text 
                            numberOfLines={1}
                        style={{
                            marginLeft:SIZES.base,
                            color:COLORS.gray,
                            ...FONTS.h3
                        }}>
                            {label}
                        </Text>
                    }
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}
const MainLayout = ({drawerAnimationStyle,navigation}) => {
    const flasListRef = React.useRef();
    //const homeTabFlex= useSharedValue(1);
    //const homeTabColor = useSharedValue(COLORS.white);
    const selected = useSelector(state=>state.tabReducer.selectedTab);
    const dispatch=useDispatch();
    return (
        <Animated.View
        style={{
            flex:1,
            backgroundColor:'white',
            ...drawerAnimationStyle,

        }}
        >
            <Header title={selected} containerStye={{
                height:50,
                marginTop:10,
                alignItems:'center',
                paddingHorizontal:SIZES.padding
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
            rightComponent={
                <TouchableOpacity style={{
                    borderRadius:SIZES.radius,
                    alignItems:'center',
                    justifyContent:'center',
                }}>
                    <Image source={dummyData.myProfile.profile_image} style={{
                        width:40,
                        height:40,
                        borderRadius:SIZES.radius,
                    }}/>
                </TouchableOpacity>
            }
            />
            <View style={{
                flex:1,
            }}>
            <FlatList ref={flasListRef}
                horizontal
                scrollEnabled
                pagingEnabled
                snapToAlignment = "center"
                snapToInterval={SIZES.width}
                showsHorizontalScrollIndicator={false}
                data={constants.bottom_tabs}
                keyExtractor={item=>`${item.id}`}
                renderItem={(item,index)=>{
                    return (
                        <View style={{
                            height:SIZES.height,
                            width:SIZES.width,
                        }}>
                            {item.label}
                        </View>
                    );
                }}
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
                    <TabButton label="Home" icon={icons.home} isFocus={selected==constants.screens.home} onPress={()=>{dispatch(setSelectedTab({selectedTab:constants.screens.home}));}}/>
                    <TabButton label="Favourite" icon={icons.favourite} isFocus={selected==constants.screens.favourite} onPress={()=>{dispatch(setSelectedTab({selectedTab:constants.screens.favourite}));}}/>
                    <TabButton label="Search" icon={icons.search} isFocus={selected==constants.screens.search} onPress={()=>{dispatch(setSelectedTab({selectedTab:constants.screens.search}));}}/>
                    <TabButton label="Notification" icon={icons.notification} isFocus={selected==constants.screens.notification} onPress={()=>{dispatch(setSelectedTab({selectedTab:constants.screens.notification}));}}/>
                </View>
            </View>
        </Animated.View>
    );
};
export default MainLayout;
