import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function DetailTransaction({route, navigation}) {
  const {dataAllTransaksi} = route.params;
  console.log('ini detail Transa', dataAllTransaksi);

  return (
    <View>
      <Text>Detail Transaction</Text>
      <Text>{dataAllTransaksi.nominal_transaksi}</Text>
      <Text>{dataAllTransaksi.berita_transaksi}</Text>
      <Text>{dataAllTransaksi.jenis_transaksi}</Text>
      <Text>{dataAllTransaksi.waktu_transaksi}</Text>
      <Text>{dataAllTransaksi.latitude_transaksi}</Text>
      <Text>{dataAllTransaksi.longitude_transaksi}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
