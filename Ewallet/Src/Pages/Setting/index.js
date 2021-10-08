import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {AuthContext} from '../Contex';

export default function Setting() {
  const {signOut} = useContext(AuthContext); // mo ambil apa di context

  return (
    <View>
      <Text>Setting</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({});
