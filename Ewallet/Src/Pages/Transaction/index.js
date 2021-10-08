import axios from 'axios';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {UserContext} from '../Contex';

export default function Transaction({navigation}) {
  const userContext = useContext(UserContext);
  // console.log('userCOntext dari TOPUP', userContext);
  const [transaksiList, setTransaksiList] = useState();
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    getTransactionList(userContext);
  }, [userContext]);

  const getTransactionList = async id => {
    // console.log('ini id', id);
    setIsRefresh(true);
    let url = `https://emoneydti.basicteknologi.co.id/index.php/api/transaction?id_user=${id}`;
    try {
      const response = await axios.get(url);
      // console.log('ini response transalist', response.data);
      setTransaksiList(response.data.data);
      setIsRefresh(false);
    } catch (error) {
      console.log('GET LIST TRANSAKSI GAGAL');
      setIsRefresh(true);
    }
  };

  // console.log('ini isi list transaksi', transaksiList);
  return (
    <View style={styles.container}>
      <Text>INI TRANSAKSI LIST</Text>
      <FlatList
        refreshing={isRefresh}
        data={transaksiList}
        keyExtractor={item => item.id_transaction}
        renderItem={item => {
          console.log('dfadfadfa', item);
          return (
            <TouchableOpacity
              style={{
                backgroundColor: 'pink',
                padding: 20,
                marginVertical: 10,
              }}
              onPress={async () => {
                await getTransactionList(item.id_user);
                navigation.navigate('DetailTransaction', {
                  dataAllTransaksi: item.item,
                });
              }}>
              <View>
                <Text style={{color: 'black'}}>{item.item.id_transaction}</Text>
                <Text style={{color: 'black'}}>
                  {item.item.nominal_transaksi}
                </Text>
                <Text style={{color: 'black'}}>
                  {item.item.berita_transaksi}
                </Text>
                <Text style={{color: 'black'}}>
                  {item.item.waktu_transaksi}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        // onRefresh={() => getTransactionList()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
});
