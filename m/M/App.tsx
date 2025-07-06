/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import SplashScreen from './CommonScreens/SplashScreen';
import HomeScreen from './CommonScreens/HomeScreen';
import WholesalerHomeScreen from './WholeSaler/WholesalerHomeScreen';
import OrderScreen from './WholeSaler/OrderScreen';
import AccountScreen from './WholeSaler/AccountScreen';
import Transaction from './WholeSaler/Transaction';
import NotificationScreen from './WholeSaler/NotificationScreen';
import ProfileScreen from './WholeSaler/ProfileScreen';
import KycScreen1 from './WholeSaler/KycScreen1';

export type AppScreen = 'Splash' | 'Home' | 'WholesalerHome' | 'OrderScreen' | 'AccountScreen' | 'Transaction' | 'NotificationScreen' | 'ProfileScreen' | 'KycScreen1';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('Splash');

  useEffect(() => {
    // Show splash screen for 1 second, then navigate to home screen
    const timer = setTimeout(() => {
      setCurrentScreen('Home');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const navigateToScreen = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen />;
      case 'Home':
        return <HomeScreen onNavigate={navigateToScreen} />;
      case 'WholesalerHome':
        return <WholesalerHomeScreen onNavigate={navigateToScreen} />;
      case 'OrderScreen':
        return <OrderScreen onNavigate={navigateToScreen} />;
      case 'AccountScreen':
        return <AccountScreen onNavigate={navigateToScreen} />;
      case 'Transaction':
        return <Transaction onNavigate={navigateToScreen} />;
      case 'NotificationScreen':
        return <NotificationScreen onNavigate={navigateToScreen} />;
      case 'ProfileScreen':
        return <ProfileScreen onNavigate={navigateToScreen} />;
      case 'KycScreen1':
        return <KycScreen1 onNavigate={navigateToScreen} />;
      default:
        return <HomeScreen onNavigate={navigateToScreen} />;
    }
  };

  return renderScreen();
}

export default App;
