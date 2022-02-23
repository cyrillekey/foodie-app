import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk"
import rootReducer from './stores/rootReducer';
import CustomDrawer from './navigation/CustomDrawer';
import { FoodDetails, ForgotPassword, OnBoarding,OtpScreen,Signin, SignUp } from "./screens";
const Stack = createStackNavigator();
const store=createStore(
    rootReducer,
    applyMiddleware(thunk)
)
const App = () => {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{flex:1}}>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={'OnBoarding'}
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
            </Stack.Navigator>
        </NavigationContainer>
        </GestureHandlerRootView>
        </Provider>
    )
}

export default App;