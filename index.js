import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import AppWrapper from './App';
import {name as appName} from './app.json';
import axios from 'axios';
import { API_ENDPOINT } from './constants/api';
axios.defaults.baseURL = API_ENDPOINT;
AppRegistry.registerComponent(appName, () =>AppWrapper);
