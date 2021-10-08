import React, {useContext, useState} from 'react';
import {Button, TextInput, View} from 'react-native';

import {AuthContext} from '../Contex';

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('siska@gmail.com');
  const [password, setPassword] = useState('siska123');

  const {signIn} = useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#000000"
        value={email}
        onChangeText={setEmail}
        style={{color: '#000000'}}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#000000"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{color: '#000000'}}
      />
      <Button
        title="Sign in"
        onPress={() => {
          signIn({email, password});
        }}
      />
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
    </View>
  );
}
