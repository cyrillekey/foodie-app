/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View,Text, Image, ImageBackground } from 'react-native';
import Animated from 'react-native-reanimated';
import { FONTS, SIZES ,images, COLORS, constants} from '../../constants';
import { TextButton } from '../../Components';
import { useDispatch } from 'react-redux';
import { viewedOnboarding } from '../../stores/user/userActions';
const OnBoarding = ({navigation})=>{
    const scrollX = new Animated.Value(8);
    const flatListRef = React.useRef();
    const dispatch = useDispatch();
    //dispatch(saveAddress(setLocatiosn()))
    const Dots = ()=>{
        return (
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    marginTop:20,
                }}
            >
                {
                    constants.onboarding_screens.map((item,index)=>{
                        // const dotColor=dotposition.interpolate({
                        //     inputRange:[index-1,index,index+1],
                        //     outputRange:[COLORS.lightOrange,COLORS.primary,COLORS.lightOrange],
                        //     extrapolate:"clamp"
                        // // });
                        // const dotWidth=dotposition.interpolate({
                        //     inputRange:[index-1,index,index+1],
                        //     outputRange:[10,30,10],
                        //     extrapolate:"clamp"
                        // });
                     return (
                        <Animated.View
                         key={index}
                         style={{
                             borderRadius:5,
                             marginHorizontal:6,
                             width:10,
                             height:10,backgroundColor:COLORS.primary,
                         }}
                        />
                         );}, )
                }
            </View>
        );
    };
    const renderHeaderLogo = ()=>{
        return (
            <View
            style={{
                position:'absolute',
                top:SIZES.height > 800 ? 50 : 25,
                left:0,
                right:0,
                alignItems:'center',
                justifyContent:'center',
            }}
            >
                <Image
                source={images.logo}
                resizeMode="contain"
                style={{
                    width:SIZES.width * 0.5,
                    height:100,
                }}
                />
            </View>
        );
    };
    const renderFooter = ( )=>{
        return (
            <View style={{
                height:120,
            }}>
                <View style={{
                    flex:1,
                    justifyContent:'center',
                }}>
                    <Dots/>
                </View>
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    paddingHorizontal:SIZES.padding,
                    marginVertical:SIZES.padding}}>
                <TextButton
                    label="Skip"
                    buttonContainerStyle={{
                        backgroundColor:null,
                    }}
                    labelStyle={{
                        color:COLORS.black,
                    }}
                    onPress={()=>{
                        dispatch(viewedOnboarding(true));
                        navigation.navigate('SignIn');
                    }
                    }
                />
                <TextButton
                    label="Next"
                    buttonContainerStyle={{
                    height:60,
                    width:130,
                    borderRadius:SIZES.radius,
                    }}
                    onPress={()=>{
                        console.log(constants.onboarding_screens.length);
                        let index = Math.ceil(Number(scrollX._value / SIZES.width));
                        if (index < constants.onboarding_screens.length - 1){
                            navigation.replace('SignIn');
                        }
                    }}
                />
                </View>
            </View>
        );
    };
    return (
        <View style={{
            flex:1,
            backgroundColor:COLORS.white,
        }}>
            {renderHeaderLogo()}
            <Animated.FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled
                data={constants.onboarding_screens}
                scrollEventThrottle={1}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={
                    Animated.event(
                        [
                          {nativeEvent:{contentOffset:{x:scrollX}}},
                        ],{useNativeDriver:false}
                    )
                }
                keyExtractor={(item)=>`${item.id}`}
                renderItem={({item,index})=>(
                        <View
                            style={{
                                flex:1,
                                width:SIZES.width * 0.98,
                            }}
                        >
                            <View
                                style={{
                                    flex:3,
                                }}
                            >
                                <ImageBackground
                                style={{
                                    flex:1,
                                    alignItems:'center',
                                    justifyContent:'flex-end',
                                    height:index === 1 ? '92%' : '100%',
                                    width:'100%',
                                }}
                                >
                                    <Image
                                    source={item.bannerImage}
                                    resizeMode="contain"
                                    style={{
                                        height:SIZES.height * 0.3,
                                        width:SIZES.width * 0.6,
                                        marginBottom:-SIZES.padding,
                                    }}
                                    />
                                </ImageBackground>
                            </View>
                            <View style={{
                             flex:1,
                             marginTop:30,
                            alignItems:'center',
                            justifyContent:'center',
                            paddingHorizontal:SIZES.radius,
                            }}>
                                <Text
                                style={{
                                    ...FONTS.h1,fontSize:25,
                                }}
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    style={{
                                        marginTop:SIZES.radius,
                                        textAlign:'center',
                                        paddingHorizontal:SIZES.padding,
                                        ...FONTS.h3,
                                        color:COLORS.darkGray,
                                    }}
                                >
                                    {item.description}
                                </Text>
                            </View>
                          </View>
                )}
            />
            {renderFooter()}
        </View>
    );
};
 export default OnBoarding;
