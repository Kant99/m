import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import apiConnector from '../utils/apiConnector'; // Import the apiConnector utility

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set baseUrl for apiConnector (use environment variable if available)
  apiConnector.baseUrl = process.env.REACT_NATIVE_API_BASE_URL || 'http://192.168.1.9:4000';

  const handleUserTypeSelect = (type) => {
    setSelectedUserType(type);
  };

  const handleContinue = async () => {
    setError(null);
    setLoading(true);

    try {
      let otp = '123456'; // Fallback OTP
      if (selectedUserType === 'wholesaler') {
        try {
          const otpResponse = await apiConnector.sendPhoneOTP(phoneNumber);
          otp = otpResponse.data.otp; // Adjust based on actual API response structure
        } catch (otpError) {
          setError(otpError.message || 'Failed to send OTP');
          setLoading(false);
          return;
        }
      }
      try {
        const loginResponse = await apiConnector.login(phoneNumber, otp);
        const { user, token } = loginResponse.data; // Adjust based on actual response structure
        apiConnector.setToken(token); // Store token for future requests
        navigation.navigate('WholesalerHome', { user, token });
        setLoading(false);
      } catch (loginError) {
        if (loginError.message?.toLowerCase().includes('user not found')) {
          try {
            const signupResponse = await apiConnector.wholesalerSignup({
              phoneNumber,
              otp,
            });
            const { wholesaler: user, token } = signupResponse.data;
            console.log(signupResponse) // Adjust based on response
            apiConnector.setToken(token); // Store token
            navigation.navigate('WholesalerHome', { user, token });
            setLoading(false);
          } catch (signupError) {
            setError(signupError.message || 'Signup failed');
            setLoading(false);
          }
        } else if (loginError.message?.toLowerCase().includes('otp not found')) {
          setError('Please request an OTP first.');
          setLoading(false);
        } else {
          setError(loginError.message || 'Login failed');
          setLoading(false);
        }
      }
    } catch (e) {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Mandi Bhai</Text>
          <TouchableOpacity style={styles.helpButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.helpIcon}>?</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>जो आपकी बढ़ावे आय, वही हैं मंडी भाई !</Text>
      </View>
      <View style={styles.separator} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.questionText}>Let's get you started! Tell us who you are?</Text>
        <TouchableOpacity
          style={[styles.userTypeCard, selectedUserType === 'retailer' && styles.selectedCard]}
          onPress={() => handleUserTypeSelect('retailer')}
        >
          <Image source={require('../assets/Home1.png')} style={styles.cardImageSmall} resizeMode="contain" />
          <View style={styles.cardContentSmall}>
            <Text style={styles.cardTitleSmall}>Retailer/Buyer</Text>
            <Text style={styles.cardSubtitleSmall}>I want to purchase products</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.userTypeCard, selectedUserType === 'wholesaler' && styles.selectedCard]}
          onPress={() => handleUserTypeSelect('wholesaler')}
        >
          <Image source={require('../assets/Home2.png')} style={styles.cardImageSmall} resizeMode="contain" />
          <View style={styles.cardContentSmall}>
            <Text style={styles.cardTitleSmall}>Wholesaler/Supplier</Text>
            <Text style={styles.cardSubtitleSmall}>I want to sell products</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.phoneLabel}>Enter your phone number</Text>
        <View style={styles.phoneInputContainer}>
          <View style={styles.countryCode}>
            <Text style={styles.countryCodeText}>+91</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone number"
            placeholderTextColor="#999"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
        <TouchableOpacity
          style={[styles.continueButton, (!selectedUserType || phoneNumber.length < 10 || loading) && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!selectedUserType || phoneNumber.length < 10 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#1F3E58" />
          ) : (
            <Text style={styles.continueButtonText}>Continue</Text>
          )}
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.footer}>
          <Text style={styles.footerText}>By continuing, you agree to our</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Terms & Conditions</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}> and </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>User Types Explained</Text>
              <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </Pressable>
            </View>
            <Text style={styles.modalText}>
              <Text style={{ fontWeight: 'bold' }}>Retailer/Buyer: </Text>
              Choose this if you want to purchase products for your store or personal use. You'll get access to wholesale prices and bulk buying options.{"\n\n"}
              <Text style={{ fontWeight: 'bold' }}>Wholesaler/Supplier: </Text>
              Choose this if you want to sell products in bulk to retailers. You'll be able to list your products and manage orders from retailers.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F3E58',
  },
  helpButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpIcon: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  separator: {
    height: 4,
    backgroundColor: '#FFC107',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F3E58',
    marginBottom: 30,
    textAlign: 'left',
  },
  userTypeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FFC107',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: '#FF9800',
    backgroundColor: '#FFF8E1',
  },
  cardImageSmall: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  cardContentSmall: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitleSmall: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F3E58',
    marginBottom: 2,
  },
  cardSubtitleSmall: {
    fontSize: 11,
    color: '#666',
  },
  phoneLabel: {
    fontSize: 16,
    color: '#1F3E58',
    fontWeight: '500',
    marginTop: 30,
    marginBottom: 12,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 30,
  },
  countryCode: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F3E58',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  footerLink: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F3E58',
  },
  closeButton: {
    marginLeft: 10,
    padding: 4,
  },
  closeButtonText: {
    fontSize: 28,
    color: '#888',
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
});

export default HomeScreen;