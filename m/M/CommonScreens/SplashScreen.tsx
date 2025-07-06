import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1F3E58" barStyle="light-content" />
      <Image
        source={require('../assets/IMG-4.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F3E58', // Dark blue background similar to the image
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6, // 60% of screen width
    height: height * 0.3, // 30% of screen height
    maxWidth: 300,
    maxHeight: 300,
  },
});

export default SplashScreen;
