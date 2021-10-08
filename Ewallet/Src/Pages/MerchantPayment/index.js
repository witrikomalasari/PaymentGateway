import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  TextInput,
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {UserContext} from '../Contex';

export default function MerchantPaymentConfirmasi({route, navigation}) {
  const userContext = useContext(UserContext);
  const {dataQR} = route.params;
  console.log(dataQR);
  const [nominal, setNominal] = useState();
  const [LATITUDE, setLatitude] = useState(-1.24); // -6.2421159
  const [LONGITUDE, setLongitude] = useState(77.03); // 107.0326193

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

  const postMerchantPay = async () => {
    let url =
      'https://emoneydti.basicteknologi.co.id/index.php/api/merchant/pay';
    const data = {
      id_merchant: dataQR?.id_merchant,
      nominal_bayar: nominal,
      id_user: userContext,
      latitude_transaksi: LATITUDE,
      longitude_transaksi: LONGITUDE,
    };
    try {
      const response = await axios.post(url, data);
      console.log('ini GET MERCHANT PAYMENT CONFIRMATION', response.data);
      navigation.replace('MerchantPaymentSuccess', {
        merchantData: response.data.data,
      });
    } catch (error) {
      console.log('TIDAK DAPAT POST MERCHANT PAY');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'yellow'}}>
      <Text>INI MERCHANT PAYMENT CONFIMRASI</Text>
      <TextInput
        placeholder="Nominal Payment"
        value={nominal}
        onChangeText={text => setNominal(text)}
        style={{color: '#000000'}}
      />
      <Text>{dataQR?.nama_merchant}</Text>
      <Text>{dataQR?.alamat_merchant}</Text>
      <TouchableOpacity
        onPress={() => postMerchantPay()}
        style={{backgroundColor: 'pink', height: 50}}>
        <Text>SUBMIT</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(LATITUDE), //-6.2421159
            longitude: parseFloat(LONGITUDE), // 107.0326193,
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
