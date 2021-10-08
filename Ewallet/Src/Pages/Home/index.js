import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {UserContext} from '../Contex';

export default function Home({navigation}) {
  const userContext = useContext(UserContext);
  // console.log('ini isi usercontext', userContext);

  const [nama, setNama] = useState();
  const [saldoAwal, setSaldoAwal] = useState();
  const [transaction, setTransaction] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDashboardHome(userContext);
      getDataUser();
    });

    return unsubscribe;
  }, [navigation, userContext]);

  const getDataUser = async () => {
    const namaUser = await AsyncStorage.getItem('nama');
    setNama(namaUser);
  };

  const getDashboardHome = async id => {
    // console.log('ini IDUSER', id);

    let url = `https://emoneydti.basicteknologi.co.id/index.php/api/dashboard?id_user=${id}`;
    try {
      const response = await axios.get(url);
      // console.log('ini response get API', response.data.data);
      if (response.data.status === 'true') {
        setSaldoAwal(response?.data?.data?.saldo);
        setTransaction(response?.data?.data?.transaksi);
      }
    } catch (error) {
      console.log('DATA GET GK DAPAT');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{color: 'blue'}}>{nama}</Text>
      <Text style={{color: 'blue'}}>{saldoAwal}</Text>

      <View style={{marginVertical: 4}}>
        <Button
          title="TOP UP"
          onPress={() => {
            navigation.navigate('TopUp');
          }}
        />
      </View>
      <View style={{marginVertical: 4}}>
        <Button
          title="QR PAY"
          onPress={() => {
            navigation.navigate('QrPay');
          }}
        />
      </View>
      <View style={{marginVertical: 4}}>
        <Button
          title="TRANSFER"
          onPress={() => {
            navigation.navigate('Transfer');
          }}
        />
      </View>
      <View>
        <FlatList
          data={transaction}
          keyExtractor={item => item.id_transaction}
          renderItem={item => {
            console.log('dfadfadfa', item);
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: 'pink',
                  padding: 20,
                  marginVertical: 10,
                }}>
                <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

{
  /**
shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,
*/
}
