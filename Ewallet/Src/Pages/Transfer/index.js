import axios from 'axios';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

export default function Transfer({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('082240206861');

  const compareNoTerdaftar = data => {
    // console.log('compare no terdaftar', data.data);
    let a = data?.data;
    let dataReceiver;
    for (let dataPenerima of a) {
      dataReceiver = {...dataPenerima};
    }
    return dataReceiver;
  };

  const showConfirmNumber = async datas => {
    // console.log('adfaer', datas.id_user);
    // console.log(typeof datas);

    return Alert.alert(
      'Confirm Number',
      `Apakah anda ingin transfer ke ${datas?.nama_user}  ${datas?.nomor_handphone} ?`,
      [
        {
          text: 'Yes',
          onPress: () => {
            navigation.replace('TransferProcess', {
              dataReceiver: datas,
            });
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const getCheckNumber = async noTelp => {
    let url = `https://emoneydti.basicteknologi.co.id/index.php/api/transfer/checknumber?nomor_handphone=${noTelp}`;
    try {
      const response = await axios.get(url);
      // console.log(response.data.status);
      if (response?.data?.status === 'true') {
        // jika no telp yg diinput terdaftar di backend
        let dataReceipt = await compareNoTerdaftar(response?.data);
        // console.log(typeof dataReceipt);
        showConfirmNumber(dataReceipt);
      }
    } catch (error) {
      console.log('TIDAK BISA GET CHECK NUMBER');
    }
  };

  return (
    <View>
      <Text>Transfer</Text>
      <TextInput
        placeholder="Receiver Phone Number"
        style={{color: '#000000'}}
        keyboardType="number-pad"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TouchableOpacity
        style={{backgroundColor: 'yellow', height: 50}}
        onPress={() => getCheckNumber(phoneNumber)}>
        <Text>CHECK NUMBER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
