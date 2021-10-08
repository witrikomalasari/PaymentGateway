import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  View,
  StyleSheet,
} from 'react-native';
import {WebView} from 'react-native-webview';
import coin from '../../Assets/coin.png';
import coins from '../../Assets/coins.png';
import money from '../../Assets/money.png';
import alotMoney from '../../Assets/money2.png';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {UserContext} from '../Contex';

export default function TopUp({navigation}) {
  const userContext = useContext(UserContext);
  // console.log('userCOntext dari TOPUP', userContext);
  const [redirectUrlMidtrans, setRedirectUrlMidtrans] = useState();
  const [isMidtranz, setIsMidtranz] = useState(false);
  const [orderId, setOrderId] = useState();
  const [LATITUDE, setLatitude] = useState(-5.242); // -6.2421159
  const [LONGITUDE, setLongitude] = useState(100.032); // 107.0326193

  const [listNominal] = useState([
    {
      id: 1,
      nominal: 20000,
      icon: coin,
    },
    {
      id: 2,
      nominal: 50000,
      icon: coins,
    },
    {
      id: 3,
      nominal: 100000,
      icon: money,
    },
    {
      id: 4,
      nominal: 200000,
      icon: alotMoney,
    },
  ]);

  useEffect(() => {
    RequestGeoLocation();
    // setLatitude();
    // setLongitude();
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

  const TopUpPost = async nominalTopUp => {
    // console.log('ini NOMINAL TOP UP', nominalTopUp);
    let url = 'https://emoneydti.basicteknologi.co.id/index.php/api/snap/token';
    const data = {
      id_user: userContext,
      nominal_topup: nominalTopUp,
      latitude_transaksi: LATITUDE,
      longitude_transaksi: LONGITUDE,
    };
    try {
      const response = await axios.post(url, data);
      // console.log(response.data.data.redirect_url);
      if (response.data.status === 'true') {
        await setRedirectUrlMidtrans(response?.data?.data?.redirect_url);
        await setOrderId(response?.data?.data?.order_id);
        await setIsMidtranz(true);
      } else {
        Alert.alert('GAGAL TOP UP');
        // ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('GAGAL TOP UP');
    }
  };

  if (isMidtranz === true) {
    return (
      <WebView
        style={{flex: 1}}
        onNavigationStateChange={navState => {
          // console.log(navState.url);
          // console.log('ini order ID', orderId);
          if (navState.url.search('basicteknologi.co.id') > 0) {
            navigation.replace('TopUpSuccess', {
              orderId: orderId,
            });
          }
        }}
        source={{uri: redirectUrlMidtrans}}
      />
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <Text>Top Up</Text>
        <View style={{backgroundColor: '#ffffff', margin: 10}}>
          <FlatList
            data={listNominal}
            keyExtractor={item =>
              // console.log('ini unik key', item);
              item.id
            }
            numColumns={2}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    TopUpPost(item.nominal);
                  }}
                  style={{
                    flex: 1,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#E9E9E9',
                    marginHorizontal: 10,
                    marginVertical: 10,
                    borderRadius: 20,
                  }}>
                  <View
                    style={{
                      marginVertical: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 30, height: 30, marginVertical: 10}}
                      source={item.icon}
                    />
                    <Text>Rp.{item.nominal}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
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
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 260,
    height: 390, // console.log('ini lati', latitude);
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    left: 20,
    right: 20,
    bottom: 0,
  },
});
