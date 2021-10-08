import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  PermissionsAndroid,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {UserContext} from '../Contex';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default function TransferProcess({route, navigation}) {
  const userContex = useContext(UserContext);
  const {dataReceiver} = route.params;
  console.log('ini DATA RECEIVERJ', dataReceiver);

  const [nominal, setNominal] = useState();
  const [LATITUDE, setLatitude] = useState(-4.24); // -6.2421159
  const [LONGITUDE, setLongitude] = useState(97.032); // 107.0326193

  useEffect(() => {
    RequestGeoLocation();
  }, []);

  Geolocation.getCurrentPosition(
    async position => {
      await setLatitude(position?.coords?.latitude);
      await setLongitude(position?.coords?.longitude);
    },
    error => {
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );

  const RequestGeoLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Aplikasi ini membutuhkan akses lokasi',
          message: '-',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postTransferProcess = async () => {
    let url =
      'https://emoneydti.basicteknologi.co.id/index.php/api/transfer/process';
    const data = {
      id_pengirim: userContex,
      id_penerima: dataReceiver.id_user,
      nominal_transfer: nominal,
      latitude_transaksi: LATITUDE,
      longitude_transaksi: LONGITUDE,
    };
    try {
      const response = await axios.post(url, data);
      // console.log('ini response post transfer process', response.data.status);
      if (response?.data?.status === 'true') {
        navigation.navigate('TransferSuccess', {
          dataTransfer: response.data.data,
        });
      }
    } catch (error) {
      console.log('POST TRANSFER TIDAK BERHASIL');
    }
  };

  return (
    <View>
      <Text>ini TransferProcess</Text>
      <TextInput
        placeholder="Nominal Transfer"
        value={nominal}
        onChangeText={text => setNominal(text)}
        keyboardType="number-pad"
        style={{color: '#000000'}}
      />
      <Text>Receiver: </Text>
      <Text>{dataReceiver?.nama_user}</Text>
      <TouchableOpacity onPress={postTransferProcess}>
        <Text>TRANSFER</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(LATITUDE),
            longitude: parseFloat(LONGITUDE),
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          showsUserLocation={true}>
          <Marker
            coordinate={{
              latitude: parseFloat(LATITUDE),
              longitude: parseFloat(LONGITUDE),
            }}
            description={'Here i am'}>
            <Text style={{color: 'red', fontWeight: 'bold'}}>HERE I AM</Text>
            <Image
              source={require('../../Assets/Marker.png')}
              style={{height: 40, width: 40}}
            />
          </Marker>
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 400,
    height: 240, // console.log('ini lati', latitude);
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    left: 10,
    right: 10,
    bottom: 0,
  },
});
