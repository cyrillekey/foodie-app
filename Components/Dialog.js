/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import Dialog from 'react-native-dialog';
import { FONTS } from '../constants';
const AlertDialog = ({see,title,message,cancelOption,secondLabel,secondOption}) => {
  return (
    <Dialog.Container visible={see}>
          <Dialog.Title
          style={{
              textAlign:'center',
              fontSize:18,
              color:'#fff'
          }}
          >{title}</Dialog.Title>
          <Dialog.Description
          style={{
              textAlign:'center',
              padding:5,
          }}
          >
            {message}
          </Dialog.Description>
          <View
          style={{
              flexDirection:'row',
              justifyContent:'flex-end',
              paddingEnd:10,
          }}
          >
          <Dialog.Button label="Cancel" onPress={cancelOption}/>
          <Dialog.Button label={secondLabel} onPress={secondOption} />
          </View>
        </Dialog.Container>
  );
};

export default AlertDialog;
