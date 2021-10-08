import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../Contex';

export default function Profile({navigation}) {
  const {signOut} = useContext(AuthContext);

  const [nama, setNama] = useState('');
  const [nomorHandphone, setNomorHandphone] = useState();

  useEffect(() => {
    ProfileUser();
  }, []);

  const ProfileUser = async () => {
    const namaUser = await AsyncStorage.getItem('nama');
    const noHandphone = await AsyncStorage.getItem('nomorHandphone');

    setNama(namaUser);
    setNomorHandphone(noHandphone);
  };

  return (
    <View>
      <View>
        <Text>INI PROFILE</Text>
        <Text>{nama}</Text>
        <Text>{nomorHandphone}</Text>
      </View>
      <Button
        title="SIGN OUT"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
