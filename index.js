import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import AppWrapper from './App';
import {name as appName} from './app.json';
import axios from 'axios';
axios.defaults.baseURL="http://localhost:8080"
AppRegistry.registerComponent(appName, () => AppWrapper);
