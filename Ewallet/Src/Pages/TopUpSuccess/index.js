import axios from 'axios';
import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function TopUpSuccess({route, navigation}) {
  const {orderId} = route.params;
  // console.log('ini route', orderId);

  const [bank, setBank] = useState();
  const [nominalTopUp, setNominalTopUp] = useState();
  const [transaksiTime, setTransaksiTime] = useState();
  const [vaNumber, setVaNumber] = useState();

  const getTopUpSuccess = useCallback(async () => {
    let url = `https://emoneydti.basicteknologi.co.id/index.php/api/snap/transactionstatus?order_id=${orderId}`;
    try {
      const response = await axios.get(url);
      console.log('ini response dari GET TOP SUKSES', response.data.data);
      setBank(response.data.data.bank);
      setNominalTopUp(response.data.data.nominal_topUp);
      setTransaksiTime(response.data.data.transaction_time);
      setVaNumber(response?.data?.data?.va_number);
    } catch (error) {
      console.log('GAGAL TOP UP');
    }
  }, [orderId]);

  useEffect(() => {
    getTopUpSuccess();
  }, [getTopUpSuccess]);

  return (
    <View>
      <Text>TOP UP SUKSE</Text>
      <Text>{orderId}</Text>
      <Text>{bank}</Text>
      <Text>{nominalTopUp}</Text>
      <Text>{transaksiTime}</Text>
      <Text>{vaNumber}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.replace('TabNavigator', {
            screen: 'Transaction',
          })
        }>
        <Text>FINISH</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
