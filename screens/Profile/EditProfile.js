/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, icons, images, SIZES} from '../../constants';
import Animated from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-gesture-handler';
import {Header} from '../../Components';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {saveUser} from '../../stores/user/userActions';
import { API_ENDPOINT } from '../../constants/api';
import Toast from 'react-native-toast-message';
import { universalErrorhandlerWithSnackbar } from '../../constants/util';
const EditProfile = navigation => {
  const user = useSelector(state => state.userReducer.user);
  const token = useSelector(state => state.userReducer.jwtToken);
  const dispatch = useDispatch();
  const [form, setForm] = React.useState({
    user_name: user.user_name,
    user_phone: user.user_phone,
    user_mail: user.user_mail,
  });
  const [submitting,setSubmitting] = React.useState('Update');
  const [label,setLabel] = React.useState(
    <Image
      source={icons.call}
      style={{
        height: 35,
        width: 35,
        tintColor: '#fff',
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
      }}
    />,
  );
  const imagePicker = async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
      selectionLimit: 1,
    });
    const file = result.assets[0];
    let data = new FormData();
    data.append('category_image', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });
    setLabel(<ActivityIndicator
      key="indicator"
      size="large"
      color="#fff"
      />);
    const response = await fetch(
      `${API_ENDPOINT}/customer/upload-profile-image/${user.customer_id}`,
      {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'multipart/form-data',
        },
      },
    );
    if (response.status === 200) {
      const test = await response.json();
      dispatch(saveUser({user: test}));
    } else {
      Alert.alert('Error', 'Something went wrong trying to upload image');
    }
    setLabel(<Image
      source={icons.call}
      style={{
        height: 35,
        width: 35,
        tintColor: '#fff',
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
      }}
    />,);
  };
  const updateProfile = () => {
    let updateUser = user;
    updateUser.user_mail = form.user_mail;
    updateUser.user_phone = form.user_phone;
    updateUser.user_name = form.user_name;
    setSubmitting(<ActivityIndicator
      key="indicator"
      size="large"
      color="#fff"
      />);
    axios(
      {
        method:'POST',
    url: `/customer/update-profile/${user.customer_id}`,
       data: JSON.stringify(updateUser),
       headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`,
       },
  })
      .then(val => {
        dispatch(saveUser({user: val.data}));
        Toast.show({
          position:'bottom',
          text1:'Success',
          text2:'Profile Updated',
        });
        setSubmitting('Update');
      })
      .catch(err => {
        universalErrorhandlerWithSnackbar(err);
        setSubmitting('Update');
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Header
        containerStye={{
          height: 50,
          marginTop: 10,
          alignItems: 'center',
          paddingHorizontal: SIZES.padding,
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
          <TouchableOpacity onPress={() => imagePicker()}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={
                  user?.profile_picture == null
                    ? images.profile
                    : {uri: user.profile_picture}
                }
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {label}
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {user?.user_name ?? 'John Doe'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5,
          }}>
          <FontAwesome size={20} color={COLORS.black} name="user-o" />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={form.user_name}
            onChangeText={value => {
              setForm({...form, user_name: value});
            }}
            style={{
              flex: 1,
              marginTop: Platform.OS === 'ios' ? '0' : -12,
              paddingLeft: 10,
              color: '#05375a',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5,
          }}>
          <FontAwesome size={20} color={COLORS.black} name="user-circle" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={form.user_mail}
            onChangeText={value => {
              setForm({...form, user_mail: value});
            }}
            style={{
              flex: 1,
              marginTop: Platform.OS === 'ios' ? '0' : -12,
              paddingLeft: 10,
              color: '#05375a',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5,
          }}>
          <FontAwesome size={20} color={COLORS.black} name="phone" />

          <TextInput
            value={form.user_phone}
            placeholder="User Phone"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={value => {
              setForm({...form, user_phone: value});
            }}
            style={{
              flex: 1,
              marginTop: Platform.OS === 'ios' ? '0' : -12,
              paddingLeft: 10,
              color: '#05375a',
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            padding: 15,
            borderRadius: 10,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={()=>updateProfile()}
          >
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.white,
            }}>
            {submitting}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditProfile;
