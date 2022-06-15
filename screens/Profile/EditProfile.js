/* eslint-disable react-native/no-inline-styles */

import {View, Text, TouchableOpacity, ImageBackground, Image, Platform} from 'react-native';
import React from 'react';
import {COLORS, FONTS, icons, images, SIZES} from '../../constants';
import Animated from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';
import { Header } from '../../Components';
const EditProfile = (navigation) => {
    console.log(navigation)
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
        <Header
        containerStye={{
            height:50,
            marginTop:10,
            alignItems:'center',
            paddingHorizontal:SIZES.padding,
            }}
            isCartpresent={false}
           isBackPresent={true}
            navigation={navigation.navigation}
        title="Edit Profile"
        />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(
            0.1,
            Animated.multiply(new Animated.Value(1), 1.0),
          ),
        }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => React.createRef().current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={images.profile}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                }}
                >
                    <Image
                    source={icons.call}
                    style={{
                        height:35,
                        width:35,
                        tintColor:'#fff',
                        opacity:0.7,
                        alignItems:'center',
                        justifyContent:'center',
                        borderWidth:1,
                        borderColor:'#fff',
                        borderRadius:10,
                    }}
                    />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text
          style={{
            marginTop:10,
            fontSize:18,
            fontWeight:'bold',
          }}
          >John Doe</Text>
        </View>
        <View
        style={{
            flexDirection:'row',
            marginTop:10,
            marginBottom:10,
            borderBottomWidth:1,
            borderBottomColor:'#f2f2f2',
            paddingBottom:5,
        }}
        >
            <FontAwesome
            size={20}
            color={COLORS.black}
            name="user-o"
            />
            <TextInput
            placeholder="Username"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={{
                flex:1,
                marginTop:Platform.OS === 'ios' ? '0' : -12,
                paddingLeft:10,
                color:'#05375a',
            }}
            />
        </View>
        <View
        style={{
            flexDirection:'row',
            marginTop:10,
            marginBottom:10,
            borderBottomWidth:1,
            borderBottomColor:'#f2f2f2',
            paddingBottom:5,
        }}
        >
            <FontAwesome
            size={20}
            color={COLORS.black}
            name="user-o"
            />
            <TextInput
            placeholder="Username"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={{
                flex:1,
                marginTop:Platform.OS === 'ios' ? '0' : -12,
                paddingLeft:10,
                color:'#05375a',
            }}
            />
        </View>
        <View
        style={{
            flexDirection:'row',
            marginTop:10,
            marginBottom:10,
            borderBottomWidth:1,
            borderBottomColor:'#f2f2f2',
            paddingBottom:5,
        }}
        >
            <FontAwesome
            size={20}
            color={COLORS.black}
            name="user-o"
            />
            <TextInput
            placeholder="Username"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={{
                flex:1,
                marginTop:Platform.OS === 'ios' ? '0' : -12,
                paddingLeft:10,
                color:'#05375a',
            }}
            />
        </View>
        <TouchableOpacity
        style={{
            padding:15,
            borderRadius:10,
            backgroundColor:COLORS.primary,
            alignItems:'center',
            marginTop:10,
        }}
        >
            <Text
            style={{
                ...FONTS.h3,
                color:COLORS.white,
            }}
            >Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditProfile;