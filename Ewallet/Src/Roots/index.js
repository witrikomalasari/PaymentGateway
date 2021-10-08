import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {UserContext} from '../Pages/Contex';
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';
import QrPay from '../Pages/QrPay';
import Register from '../Pages/Registration';
import SignIn from '../Pages/SignIn';
import SplashScreen from '../Pages/SplashScreen';
import TopUp from '../Pages/TopUp';
import Transaction from '../Pages/Transaction';
import Transfer from '../Pages/Transfer';
import TopUpSuccess from '../Pages/TopUpSuccess';
import MerchantPaymentConfirmasi from '../Pages/MerchantPayment';
import MerchantPaymentSuccess from '../Pages/MerchantPaymentSuccess';
import TransferSuccess from '../Pages/TransferSuccess';
import TransferProcess from '../Pages/TransferProcess';
import DetailTransaction from '../Pages/DetailTransaction';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function Roots() {
  const userContext = useContext(UserContext);
  const TabNavigator = () => (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );

  return (
    <Stack.Navigator>
      {userContext == null ? (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QrPay"
            component={QrPay}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="TopUp"
            component={TopUp}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Transfer"
            component={Transfer}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="TopUpSuccess"
            component={TopUpSuccess}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="MerchantPaymentConfirmasi"
            component={MerchantPaymentConfirmasi}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="MerchantPaymentSuccess"
            component={MerchantPaymentSuccess}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="TransferProcess"
            component={TransferProcess}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="TransferSuccess"
            component={TransferSuccess}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="DetailTransaction"
            component={DetailTransaction}
            options={{headerShown: true}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
