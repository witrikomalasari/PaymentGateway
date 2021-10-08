'use strict';
import axios from 'axios';
import React, {PureComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

class QrPay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      alamatMerchant: '',
      idMerchant: '',
      namaMerchant: '',
      codeMerchants: 0,
    };
  }

  checkCodeMerchant = async codeMerchant => {
    let url = `https://emoneydti.basicteknologi.co.id/index.php/api/merchant/?kode_merchant=${codeMerchant}`;

    try {
      const response = await axios.get(url);
      console.log('ini response CODE MERCHANT', response.data);
      this.setState({
        codeMerchants: response?.data?.kode_merchant,
        alamatMerchant: response?.data?.alamat_merchant,
        idMerchant: response?.data?.id_merchant,
        namaMerchant: response?.data?.nama_merchant,
      });
      this.props.navigation.navigate('MerchantPaymentConfirmasi', {
        dataQR: response?.data?.data,
      });
    } catch (error) {
      console.log('CODE MERCHANT TIDAK DAPAT');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={barcode => {
            console.log(barcode.data);
            if (barcode.type === 'QR_CODE') {
              this.checkCodeMerchant(barcode.data);
            }
          }}
        />

        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}

export default QrPay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
