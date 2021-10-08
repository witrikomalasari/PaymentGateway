import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function MerchantPaymentSuccess({route, navigation}) {
  const {merchantData} = route.params;
  console.log('ini merchantDATA', merchantData);

  return (
    <View>
      <Text>ini MerchantPaymentSuccess</Text>
      <Text>{merchantData?.nominal_bayar}</Text>
      <Text>{merchantData?.nama_merchant}</Text>
      <Text>{merchantData?.alamat_merchant}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.replace('TabNavigator', {
            screen: 'Transaction',
          })
        }>
        <Text>Finish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
