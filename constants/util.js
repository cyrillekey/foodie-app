import axios from 'axios';
import PermissionsAndroid from 'react-native';
export const getAddressName = (latitude, longitude) => {
    let AddressName;
  axios
    .get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}`,
    )
    .then(response => {
    })
    .catch(err => {});
};

export const askForLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Foodie Use Location to determine where to deliver food',
      },
    );
  } catch (err) {
    console.log(err);
  }
};
