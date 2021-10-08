import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function TransferSuccess({route, navigation}) {
  const {dataTransfer} = route.params;
  console.log('ini data tranfer', dataTransfer);

  return (
    <View>
      <Text>INI TRANSFER SUCCESS</Text>
      <Text>{dataTransfer?.nominal_transfer}</Text>
      <Text>{dataTransfer?.waktu_transaksi}</Text>
      <Text>{dataTransfer?.data.nama_user}</Text>
      <Text>{dataTransfer?.data.nomor_handphone}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.replace('TabNavigator', {
            screen: `Transaction`,
          })
        }>
        <Text>FINISH</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
