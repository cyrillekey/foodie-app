import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import AppWrapper from './App';
import {name as appName} from './app.json';
import axios from 'axios';
axios.defaults.baseURL = 'https://foodieback.herokuapp.com';
//axios.defaults.baseURL = 'https://69ac-196-216-90-48.ngrok.io';
AppRegistry.registerComponent(appName, () =>AppWrapper);
