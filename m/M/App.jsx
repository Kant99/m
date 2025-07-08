import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import  {createStackNavigator}  from '@react-navigation/stack';
import SplashScreen from './CommonScreens/SplashScreen';
import HomeScreen from './CommonScreens/HomeScreen';
import WholesalerHomeScreen from './WholeSaler/WholesalerHomeScreen';
import OrderScreen from './WholeSaler/OrderScreen';
import AccountScreen from './WholeSaler/AccountScreen';
import Transaction from './WholeSaler/Transaction';
import NotificationScreen from './WholeSaler/NotificationScreen';
import ProfileScreen from './WholeSaler/ProfileScreen';
import KycScreen1 from './WholeSaler/KycScreen1';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash">
        {({ navigation }) => (
          <SplashScreen
            onReady={() => {
              setTimeout(() => navigation.replace('Home'), 10);
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="WholesalerHome" component={WholesalerHomeScreen} />
      <Stack.Screen name="Orders" component={OrderScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Transactions" component={Transaction} />
      {/* <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Kyc" component={KycScreen1} /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;