import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import AppWrapper from './App';
import {name as appName} from './app.json';
import axios from 'axios';
import { Notifications } from 'react-native-notifications';
axios.defaults.baseURL = 'https://foodieback.herokuapp.com';
Notifications.registerRemoteNotifications();
Notifications.events().registerNotificationReceivedBackground((notification,completion)=>{
    completion({alert:true,sound:true,badge:true});
  });
  Notifications.events().registerNotificationReceivedForeground((notification,completion)=>{
    if (Platform.OS == 'android'){
      if (!notification.payload || (!notification.payload.android_channel_id && !notification.payload['gcm.notification.android_channel_id'])) {
        notification.payload.android_channel_id = 'my-notification-channel-id';
        Notifications.postLocalNotification(notification.payload);
      }
    }
    completion({alert:true,sound:false,badge:true});
  });
  Notifications.events().registerNotificationOpened((notification,completion)=>{
    completion();
  });
//axios.defaults.baseURL = 'https://69ac-196-216-90-48.ngrok.io';
AppRegistry.registerComponent(appName, () =>AppWrapper);
