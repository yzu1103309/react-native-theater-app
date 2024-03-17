import React, {useState} from 'react';
import {View} from 'react-native';
import Dialog from 'react-native-dialog';

const InviteDialog = ({visible, setVisible}) => {
  return (
    <View>
      <Dialog.Container visible={visible} keyboardVerticalOffset={250}>
        <Dialog.Title>Invite New User</Dialog.Title>
        <Dialog.Input placeholder={'user_name'}></Dialog.Input>
        <Dialog.Input
          placeholder={'password'}
          secureTextEntry={true}></Dialog.Input>
        <Dialog.Input
          placeholder={'confirm_password'}
          secureTextEntry={true}></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
        <Dialog.Button label="Create" onPress={() => setVisible(false)} />
      </Dialog.Container>
    </View>
  );
};

export default InviteDialog;
