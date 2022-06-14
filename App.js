import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import CustomDrawer from './navigation/CustomDrawer';
import { FoodDetails, ForgotPassword, OnBoarding,OtpScreen,Signin, SignUp ,CartTab, Payment, PlaceOrder, Success, OrderStatus, DeliveryMap, PickAddress, OrderDetails} from "./screens";
import SplashScreen from 'react-native-splash-screen';
import {PermissionsAndroid} from 'react-native';
 import { store,persistor } from "./stores/store";
import { PersistGate } from "redux-persist/integration/react";
import userReducer from "./stores/user/userReducer";
const Stack = createStackNavigator();
const AppWrapper = () =>{
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App/>
      </PersistGate>
    </Provider>
  );
};
const App = () => {
  const user = useSelector(state=>state.userReducer.user);
  const onboarded = useSelector(state=>state.userReducer.onboarded);
    const askForLocationPermission = async () => {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Foodie Use Location to determine where to deliver food',
            },
          );
        } catch (err) {
          console.log(err);
        }
      };
    React.useEffect(()=>{
        askForLocationPermission();
        SplashScreen.hide();
    });
    return (
            <GestureHandlerRootView style={{flex:1}}>
              <NavigationContainer>
          <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={ onboarded === false ? 'onBoarding' : user == null ? 'SignIn' : 'Home'}
            >
                <Stack.Screen
                    name="onBoarding"
                    component={OnBoarding}
                />
                <Stack.Screen name="Home" component={CustomDrawer}/>
                <Stack.Screen name="SignIn" component={Signin}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="Otp" component={OtpScreen}/>
                <Stack.Screen name="forgotpassword" component={ForgotPassword}/>
                <Stack.Screen name="fooddetails" component={FoodDetails}/>
                <Stack.Screen name="cart" component={CartTab}/>
                <Stack.Screen name="payment" component={Payment}/>
                <Stack.Screen name="checkout" component={PlaceOrder}/>
                <Stack.Screen name="success" component={Success}/>
                <Stack.Screen name="orderStatus" component={OrderStatus} />
                <Stack.Screen name="deliveryMap" component={DeliveryMap} />
                <Stack.Screen name="pickAddress" component={PickAddress}/>
                <Stack.Screen name="orderDetails" component={OrderDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
        </GestureHandlerRootView>);
};

export default AppWrapper;