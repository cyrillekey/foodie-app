import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import AppWrapper from './App';
import {name as appName} from './app.json';
import axios from 'axios';
axios.defaults.baseURL = 'https://foodieback.herokuapp.com';
//axios.defaults.baseURL = 'https://62e2-41-139-140-111.ngrok.io';
AppRegistry.registerComponent(appName, () => AppWrapper);
