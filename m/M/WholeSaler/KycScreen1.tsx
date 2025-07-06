import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Modal,
  Image,
} from 'react-native';
import type { AppScreen } from '../App';

type Props = {
  onNavigate: (screen: AppScreen) => void;
};

const KycScreen1: React.FC<Props> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('Rajesh Kumar Gupta');
  const [email, setEmail] = useState('rajesh.gupta@gmail.c...');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [businessName, setBusinessName] = useState('Gupta Trading Company');
  const [businessType, setBusinessType] = useState('Proprietorship');
  const [gstNumber, setGstNumber] = useState('29AADCB2230M1ZP');
  const [apmc, setApmc] = useState('Select APMC Region');
  const [address1, setAddress1] = useState('Shop No. 45-46');
  const [address2, setAddress2] = useState('Turab Nagar Market, Near Metro Station');
  const [city, setCity] = useState('Ghaziabad');
  const [state, setState] = useState('Uttar Pradesh');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [businessTypeModalVisible, setBusinessTypeModalVisible] = useState(false);
  const [apmcModalVisible, setApmcModalVisible] = useState(false);
  const [accountType, setAccountType] = useState('UPI');
  const [upiId, setUpiId] = useState('username@bankname');
  const [confirmUpiId, setConfirmUpiId] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('Rajesh Kumar Gupta');
  const [accountNumber, setAccountNumber] = useState('50100234567890');
  const [ifscCode, setIfscCode] = useState('ABCD0123456');
  const [bankName, setBankName] = useState('Select Bank');
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [activeProductTab, setActiveProductTab] = useState('All');
  const [productDetailModalVisible, setProductDetailModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const steps = [
    { number: 1, title: 'Profile', status: 'Accepted', statusColor: '#4CAF50', bgColor: '#4285F4' },
    { number: 2, title: 'Documents', status: 'Rejected', statusColor: '#F44336', bgColor: '#E0E0E0' },
    { number: 3, title: 'Account', status: 'Pending', statusColor: '#FF9800', bgColor: '#E0E0E0' },
    { number: 4, title: 'Products', status: 'Pending', statusColor: '#FF9800', bgColor: '#E0E0E0' },
  ];

  const tabs = ['Profile Details', 'Documents', 'Account', 'Products'];
  const [activeTab, setActiveTab] = useState(0);

  const businessTypes = [
    'Proprietorship',
    'Partnership Firm',
    'Private Limited',
    'LLP'
  ];

  const apmcRegions = [
    'Select APMC Region',
    'Azadpur APMC Market',
    'Vashi APMC Market',
    'Bangalore APMC Market',
    'Kolkata APMC Market',
    'Chennai APMC Market',
    'Ahmedabad APMC Market',
    'Pune APMC Market',
    'Hyderabad APMC Market'
  ];

  const productTabs = ['All', 'Verified', 'Pending', 'Rejected'];
  
  const products = [
    {
      id: 1,
      name: 'Premium Basmati Rice',
      category: 'Staples',
      status: 'Verified',
      date: 'June 10, 2025',
      image: require('../assets/IMG-108.png')
    },
    {
      id: 2,
      name: 'Mixed Spices Set',
      category: 'Spices',
      status: 'Pending',
      date: 'June 12, 2025',
      image: require('../assets/IMG-108.png')
    },
    {
      id: 3,
      name: 'Wheat Flour',
      category: 'Staples',
      status: 'Rejected',
      date: 'June 8, 2025',
      image: require('../assets/IMG-108.png')
    },
    {
      id: 4,
      name: 'Edible Oil Set',
      category: 'Cooking Oils',
      status: 'Verified',
      date: 'June 5, 2025',
      image: require('../assets/IMG-108.png')
    },
    {
      id: 5,
      name: 'Dry Fruits Pack',
      category: 'Dry Fruits',
      status: 'Pending',
      date: 'June 15, 2025',
      image: require('../assets/IMG-108.png')
    },
    {
      id: 6,
      name: 'Pulses Variety Pack',
      category: 'Pulses',
      status: 'Pending',
      date: 'June 18, 2025',
      image: require('../assets/IMG-108.png')
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => onNavigate('WholesalerHome')}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KYC Management</Text>
        <TouchableOpacity style={styles.statusButton} onPress={() => setStatusModalVisible(true)}>
          <Text style={styles.statusIcon}>📊</Text>
          <Text style={styles.statusText}>Status</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        {steps.map((step, index) => (
          <View key={step.number} style={styles.stepContainer}>
            <View style={styles.stepWrapper}>
              <View style={[styles.stepCircle, { backgroundColor: step.bgColor }]}>
                <Text style={[styles.stepNumber, { color: step.number === 1 ? '#fff' : '#666' }]}>
                  {step.number}
                </Text>
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
                             <View style={styles.statusContainer}>
                 <View style={styles.statusIconContainer}>
                   {step.status === 'Accepted' && <Text style={styles.acceptedIcon}>✓</Text>}
                   {step.status === 'Rejected' && <Text style={styles.rejectedIcon}>✕</Text>}
                   {step.status === 'Pending' && <Text style={styles.pendingIcon}>⏳</Text>}
                 </View>
                <Text style={[styles.statusLabel, { color: step.statusColor }]}>
                  {step.status}
                </Text>
              </View>
            </View>
            {index < steps.length - 1 && <View style={styles.stepConnector} />}
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === index && styles.activeTab]}
            onPress={() => setActiveTab(index)}
          >
            <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        {activeTab === 0 && (
          <>
            {/* Personal Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  Full Name<Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>
                    Email Address<Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>
                    Phone Number<Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
              </View>
            </View>

            {/* Business Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Business Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  Business Name<Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={businessName}
                  onChangeText={setBusinessName}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>
                    Business Type<Text style={styles.required}>*</Text>
                  </Text>
                  <TouchableOpacity 
                    style={styles.dropdown}
                    onPress={() => setBusinessTypeModalVisible(true)}
                  >
                    <Text style={styles.dropdownText}>{businessType}</Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>
                    GST Number<Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    value={gstNumber}
                    onChangeText={setGstNumber}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  APMC Region<Text style={styles.required}>*</Text>
                </Text>
                <TouchableOpacity 
                  style={styles.dropdown}
                  onPress={() => setApmcModalVisible(true)}
                >
                  <Text style={[styles.dropdownText, { color: apmc === 'Select APMC Region' ? '#999' : '#333' }]}>{apmc}</Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>
                  Business Address<Text style={styles.required}>*</Text>
                </Text>
                <TouchableOpacity style={styles.locationButton}>
                  <Text style={styles.locationIcon}>📍</Text>
                  <Text style={styles.locationText}>Use Current Location</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>or enter manually</Text>
                
                <TextInput
                  style={[styles.textInput, styles.marginTop]}
                  value={address1}
                  onChangeText={setAddress1}
                  placeholder="Shop No., Building Name"
                />
                <TextInput
                  style={[styles.textInput, styles.marginTop]}
                  value={address2}
                  onChangeText={setAddress2}
                  placeholder="Area, Landmark"
                />
                
                <View style={styles.row}>
                  <TextInput
                    style={[styles.textInput, styles.halfWidth, styles.marginTop]}
                    value={city}
                    onChangeText={setCity}
                    placeholder="City"
                  />
                  <TextInput
                    style={[styles.textInput, styles.halfWidth, styles.marginTop]}
                    value={state}
                    onChangeText={setState}
                    placeholder="State"
                  />
                </View>
              </View>
            </View>

            {/* Terms Checkbox */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <View style={[styles.checkboxBox, agreedToTerms && styles.checkboxChecked]}>
                  {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  I confirm that all information provided is accurate and I agree to the{' '}
                  <Text style={styles.termsLink}>Terms & Conditions</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {activeTab === 1 && (
          <>
            {/* Document Upload Section */}
            <View style={styles.documentSection}>
              <Text style={styles.documentSectionTitle}>Document Upload</Text>
              
              {/* ID Proof */}
              <View style={styles.documentCard}>
                <View style={styles.documentHeader}>
                  <View style={styles.documentIconContainer}>
                    <Image source={require('../assets/Icon-85.png')} style={styles.documentIconImage} />
                  </View>
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentTitle}>ID Proof</Text>
                    <Text style={styles.documentSubtitle}>Aadhaar Card or PAN Card</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.uploadArea}>
                  <Text style={styles.uploadIcon}>☁️</Text>
                  <Text style={styles.uploadText}>Click to upload</Text>
                  <Text style={styles.uploadFormat}>JPG, PNG or PDF (Max 5MB)</Text>
                </TouchableOpacity>
              </View>

              {/* Business Registration */}
              <View style={styles.documentCard}>
                <View style={styles.documentHeader}>
                  <View style={styles.documentIconContainer}>
                    <Image source={require('../assets/Vector.png')} style={styles.documentIconImage} />
                  </View>
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentTitle}>Business Registration</Text>
                    <Text style={styles.documentSubtitle}>Certificate of Incorporation</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.uploadArea}>
                  <Text style={styles.uploadIcon}>☁️</Text>
                  <Text style={styles.uploadText}>Click to upload</Text>
                  <Text style={styles.uploadFormat}>JPG, PNG or PDF (Max 5MB)</Text>
                </TouchableOpacity>
              </View>

              {/* Address Proof */}
              <View style={styles.documentCard}>
                <View style={styles.documentHeader}>
                  <View style={styles.documentIconContainer}>
                    <Image source={require('../assets/Group.png')} style={styles.documentIconImage} />
                  </View>
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentTitle}>Address Proof</Text>
                    <Text style={styles.documentSubtitle}>Utility Bill or Bank Statement</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.uploadArea}>
                  <Text style={styles.uploadIcon}>☁️</Text>
                  <Text style={styles.uploadText}>Click to upload</Text>
                  <Text style={styles.uploadFormat}>JPG, PNG or PDF (Max 5MB)</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms Checkbox for Documents */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <View style={[styles.checkboxBox, agreedToTerms && styles.checkboxChecked]}>
                  {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  I confirm that all information provided is accurate and I agree to the{' '}
                  <Text style={styles.termsLink}>Terms & Conditions</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {activeTab === 2 && (
          <>
            {/* Account Details Section */}
            <View style={styles.accountSection}>
              <Text style={styles.accountSectionTitle}>Account Details</Text>
              
              {/* Account Type Toggle */}
              <View style={styles.accountTypeContainer}>
                <TouchableOpacity
                  style={[
                    styles.accountTypeTab,
                    accountType === 'UPI' && styles.accountTypeTabActive
                  ]}
                  onPress={() => setAccountType('UPI')}
                >
                  <Text style={[
                    styles.accountTypeTabText,
                    accountType === 'UPI' && styles.accountTypeTabTextActive
                  ]}>
                    UPI
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.accountTypeTab,
                    accountType === 'Bank Account' && styles.accountTypeTabActive
                  ]}
                  onPress={() => setAccountType('Bank Account')}
                >
                  <Text style={[
                    styles.accountTypeTabText,
                    accountType === 'Bank Account' && styles.accountTypeTabTextActive
                  ]}>
                    Bank Account
                  </Text>
                </TouchableOpacity>
              </View>

              {accountType === 'UPI' && (
                <>
                  {/* UPI ID Field */}
                  <View style={styles.accountInputGroup}>
                    <Text style={styles.accountInputLabel}>
                      UPI ID<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={styles.upiInputContainer}>
                      <Text style={styles.upiPrefix}>@</Text>
                      <TextInput
                        style={styles.upiInput}
                        value={upiId}
                        onChangeText={setUpiId}
                        placeholder="username@bankname"
                        placeholderTextColor="#999"
                      />
                    </View>
                    <Text style={styles.accountInputHelper}>
                      Example: username@bankname
                    </Text>
                  </View>

                  {/* Confirm UPI ID Field */}
                  <View style={styles.accountInputGroup}>
                    <Text style={styles.accountInputLabel}>
                      Confirm UPI ID<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={styles.upiInputContainer}>
                      <Text style={styles.upiPrefix}>✓</Text>
                      <TextInput
                        style={styles.upiInput}
                        value={confirmUpiId}
                        onChangeText={setConfirmUpiId}
                        placeholder="Confirm your UPI ID"
                        placeholderTextColor="#999"
                      />
                    </View>
                  </View>
                </>
              )}

              {accountType === 'Bank Account' && (
                <>
                  {/* Account Holder Name Field */}
                  <View style={styles.accountInputGroup}>
                    <Text style={styles.accountInputLabel}>
                      Account Holder Name<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={styles.bankInputContainer}>
                      <Text style={styles.bankInputIcon}>👤</Text>
                      <TextInput
                        style={styles.bankInput}
                        value={accountHolderName}
                        onChangeText={setAccountHolderName}
                        placeholder="Enter account holder name"
                        placeholderTextColor="#999"
                      />
                    </View>
                  </View>

                  {/* Account Number Field */}
                  <View style={styles.accountInputGroup}>
                    <Text style={styles.accountInputLabel}>
                      Account Number<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={styles.bankInputContainer}>
                      <Text style={styles.bankInputIcon}>🏛️</Text>
                      <TextInput
                        style={styles.bankInput}
                        value={accountNumber}
                        onChangeText={setAccountNumber}
                        placeholder="Enter account number"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>

                  {/* IFSC Code Field */}
                  <View style={styles.accountInputGroup}>
                    <Text style={styles.accountInputLabel}>
                      IFSC Code<Text style={styles.required}>*</Text>
                    </Text>
                    <View style={styles.bankInputContainer}>
                      <Text style={styles.bankInputIcon}>💻</Text>
                      <TextInput
                        style={styles.bankInput}
                        value={ifscCode}
                        onChangeText={setIfscCode}
                        placeholder="Enter IFSC code"
                        placeholderTextColor="#999"
                      />
                    </View>
                    <Text style={styles.accountInputHelper}>
                      Example: ABCD0123456
                    </Text>
                  </View>

                  {/* Bank Name Field */}
                  <View style={styles.accountInputGroup}>
                    <Text style={styles.accountInputLabel}>
                      Bank Name<Text style={styles.required}>*</Text>
                    </Text>
                    <TouchableOpacity style={styles.bankDropdownContainer}>
                      <Text style={styles.bankInputIcon}>🏛️</Text>
                      <Text style={[
                        styles.bankDropdownText,
                        { color: bankName === 'Select Bank' ? '#999' : '#333' }
                      ]}>
                        {bankName}
                      </Text>
                      <Text style={styles.bankDropdownArrow}>▼</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            {/* Terms Checkbox for Account */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <View style={[styles.checkboxBox, agreedToTerms && styles.checkboxChecked]}>
                  {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  I confirm that all information provided is accurate and I agree to the{' '}
                  <Text style={styles.termsLink}>Terms & Conditions</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {activeTab === 3 && (
          <>
            {/* Products Section */}
            <View style={styles.productsSection}>
              {/* Product Status Header */}
              <View style={styles.productStatusHeader}>
                <Text style={styles.productStatusTitle}>Product Status</Text>
                <Text style={styles.productStatusSubtitle}>3 Verified • 2 Pending • 1 Rejected</Text>
              </View>

              {/* Search Bar */}
              <View style={styles.productSearchContainer}>
                <Text style={styles.productSearchIcon}>🔍</Text>
                <TextInput
                  style={styles.productSearchInput}
                  placeholder="Search products..."
                  placeholderTextColor="#999"
                  value={productSearchQuery}
                  onChangeText={setProductSearchQuery}
                />
              </View>

              {/* Product Filter Tabs */}
              <View style={styles.productTabsContainer}>
                {productTabs.map((tab, index) => {
                  const counts: { [key: string]: string } = { All: '(6)', Verified: '(3)', Pending: '(2)', Rejected: '(1)' };
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.productTab,
                        activeProductTab === tab && styles.productTabActive
                      ]}
                      onPress={() => setActiveProductTab(tab)}
                    >
                      <Text style={[
                        styles.productTabText,
                        activeProductTab === tab && styles.productTabTextActive
                      ]}>
                        {tab}
                      </Text>
                      <Text style={[
                        styles.productTabCount,
                        activeProductTab === tab && styles.productTabCountActive
                      ]}>
                        {counts[tab]}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Products Grid */}
              <View style={styles.productsGrid}>
                {products.map((product, index) => (
                  <TouchableOpacity 
                    key={product.id} 
                    style={styles.productCard}
                    onPress={() => {
                      setSelectedProduct(product);
                      setProductDetailModalVisible(true);
                    }}
                  >
                    <Image source={product.image} style={styles.productImage} />
                    <View style={styles.productCardContent}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productCategory}>{product.category}</Text>
                      <View style={styles.productStatusRow}>
                        <View style={[
                          styles.productStatusBadge,
                          product.status === 'Verified' && styles.productStatusVerified,
                          product.status === 'Pending' && styles.productStatusPending,
                          product.status === 'Rejected' && styles.productStatusRejected
                        ]}>
                          <Text style={[
                            styles.productStatusText,
                            product.status === 'Verified' && styles.productStatusTextVerified,
                            product.status === 'Pending' && styles.productStatusTextPending,
                            product.status === 'Rejected' && styles.productStatusTextRejected
                          ]}>
                            {product.status}
                          </Text>
                        </View>
                        <Text style={styles.productDate}>{product.date}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Terms Checkbox for Products */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <View style={[styles.checkboxBox, agreedToTerms && styles.checkboxChecked]}>
                  {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  I confirm that all information provided is accurate and I agree to the{' '}
                  <Text style={styles.termsLink}>Terms & Conditions</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save & Continue</Text>
        </TouchableOpacity>

        <Text style={styles.verificationText}>
          Verification typically takes 2-3 business days to complete
        </Text>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Business Type Modal */}
      <Modal
        visible={businessTypeModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setBusinessTypeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dropdownModal}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownHeaderText}>Select Business Type</Text>
              <TouchableOpacity onPress={() => setBusinessTypeModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            {businessTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dropdownOption,
                  businessType === type && styles.selectedOption
                ]}
                onPress={() => {
                  setBusinessType(type);
                  setBusinessTypeModalVisible(false);
                }}
              >
                <Text style={[
                  styles.dropdownOptionText,
                  businessType === type && styles.selectedOptionText
                ]}>
                  {type}
                </Text>
                {businessType === type && (
                  <Text style={styles.checkIcon}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* APMC Region Modal */}
      <Modal
        visible={apmcModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setApmcModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dropdownModal}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownHeaderText}>Select APMC Region</Text>
              <TouchableOpacity onPress={() => setApmcModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            {apmcRegions.map((region, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dropdownOption,
                  apmc === region && styles.selectedOption,
                  region === 'Select APMC Region' && styles.placeholderOption
                ]}
                onPress={() => {
                  if (region !== 'Select APMC Region') {
                    setApmc(region);
                  }
                  setApmcModalVisible(false);
                }}
              >
                <Text style={[
                  styles.dropdownOptionText,
                  apmc === region && styles.selectedOptionText,
                  region === 'Select APMC Region' && styles.placeholderText
                ]}>
                  {region}
                </Text>
                {apmc === region && region !== 'Select APMC Region' && (
                  <Text style={styles.checkIcon}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Product Detail Modal */}
      <Modal
        visible={productDetailModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setProductDetailModalVisible(false)}
        presentationStyle="overFullScreen"
      >
        <View style={styles.productModalOverlay}>
          <View style={styles.productModalContent}>
            {/* Modal Header */}
            <View style={styles.productModalHeader}>
              <Text style={styles.productModalTitle}>Product Catalogue</Text>
              <TouchableOpacity onPress={() => setProductDetailModalVisible(false)}>
                <Text style={styles.productModalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.productModalScrollView} showsVerticalScrollIndicator={false}>
              {/* Product Image */}
              <View style={styles.productModalImageContainer}>
                <Image 
                  source={selectedProduct?.image} 
                  style={styles.productModalImage} 
                />
              </View>

              {/* Product Info */}
              <View style={styles.productModalInfo}>
                <Text style={styles.productModalName}>{selectedProduct?.name}</Text>
                <View style={styles.productModalStatusRow}>
                  <View style={[
                    styles.productModalStatusBadge,
                    selectedProduct?.status === 'Verified' && styles.productModalStatusVerified,
                    selectedProduct?.status === 'Rejected' && styles.productModalStatusRejected
                  ]}>
                    <Text style={[
                      styles.productModalStatusText,
                      selectedProduct?.status === 'Verified' && styles.productModalStatusTextVerified,
                      selectedProduct?.status === 'Rejected' && styles.productModalStatusTextRejected
                    ]}>
                      {selectedProduct?.status}
                    </Text>
                  </View>
                  <Text style={styles.productModalDate}>
                    Last updated: {selectedProduct?.date}
                  </Text>
                </View>

                {/* Rejection Reason (only for rejected products) */}
                {selectedProduct?.status === 'Rejected' && (
                  <View style={styles.rejectionReasonContainer}>
                    <Text style={styles.rejectionReasonIcon}>⚠️</Text>
                    <Text style={styles.rejectionReasonText}>
                      Reason: Incomplete Product Information
                    </Text>
                  </View>
                )}

                {/* Pricing */}
                <View style={styles.productModalPricing}>
                  <View style={styles.priceItem}>
                    <Text style={styles.priceValue}>₹1,299</Text>
                    <Text style={styles.priceUnit}>/ kg</Text>
                  </View>
                  <View style={styles.priceItem}>
                    <Text style={styles.priceValue}>₹32,475</Text>
                    <Text style={styles.priceUnit}>/ bag</Text>
                  </View>
                </View>

                {/* Product Details Grid */}
                <View style={styles.productDetailsGrid}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Category</Text>
                    <Text style={styles.detailValue}>Staples</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Minimum Order</Text>
                    <Text style={styles.detailValue}>50 kg</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Available Stock</Text>
                    <View style={styles.stockContainer}>
                      <View style={styles.stockDot} />
                      <Text style={styles.stockValue}>250 kg</Text>
                    </View>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Expiring Duration</Text>
                    <Text style={styles.detailValue}>3 days</Text>
                  </View>
                </View>

                {/* Product Specifications */}
                <Text style={styles.specificationsTitle}>Product Specifications</Text>
                <View style={styles.specificationsGrid}>
                  <View style={styles.specItem}>
                    <Text style={styles.specLabel}>Brand</Text>
                    <Text style={styles.specValue}>Rajdhani</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Text style={styles.specLabel}>GST Category</Text>
                    <Text style={styles.specValue}>Applicable(18%)</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Text style={styles.specLabel}>Bulk Pricing</Text>
                    <Text style={styles.specValue}>Yes</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Text style={styles.specLabel}>Packaging</Text>
                    <Text style={styles.specValue}>25 kg Bag</Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.productModalActions}>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonIcon}>✏️</Text>
                    <Text style={styles.editButtonText}>Edit Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.deleteButtonIcon}>🗑️</Text>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>

                {/* Download Button (only for verified products) */}
                {selectedProduct?.status === 'Verified' && (
                  <TouchableOpacity style={styles.downloadButton}>
                    <Text style={styles.downloadButtonIcon}>⬇️</Text>
                    <Text style={styles.downloadButtonText}>Download Product Catalogue</Text>
                  </TouchableOpacity>
                )}
                
                {/* Extra spacing at bottom */}
                <View style={{ height: 40 }} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Status Modal */}
      <Modal
        visible={statusModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setStatusModalVisible(false)}
        presentationStyle="overFullScreen"
      >
        <View style={styles.statusModalOverlay}>
          <View style={styles.statusModalContent}>
            {/* Modal Header */}
            <View style={styles.statusModalHeader}>
              <Text style={styles.statusModalTitle}>Verification Status</Text>
              <TouchableOpacity onPress={() => setStatusModalVisible(false)}>
                <Text style={styles.statusModalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.statusModalScrollView} showsVerticalScrollIndicator={false}>
              {/* Progress Info */}
              <View style={styles.statusProgressInfo}>
                <View style={styles.statusInfoIcon}>
                  <Text style={styles.statusInfoIconText}>ℹ️</Text>
                </View>
                <Text style={styles.statusInfoText}>
                  Your verification is in progress. Estimated completion time: 2-3 business days.
                </Text>
              </View>

              {/* Verification Steps */}
              <View style={styles.verificationSteps}>
                {/* Personal Details */}
                <View style={styles.verificationStep}>
                  <View style={styles.stepIconContainer}>
                    <View style={[styles.stepIcon, styles.stepIconCompleted]}>
                      <Text style={styles.stepIconText}>✓</Text>
                    </View>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.statusStepTitle}>Personal Details</Text>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, styles.progressCompleted]} />
                    </View>
                  </View>
                  <Text style={styles.stepStatus}>Completed</Text>
                </View>

                {/* Business Information */}
                <View style={styles.verificationStep}>
                  <View style={styles.stepIconContainer}>
                    <View style={[styles.stepIcon, styles.stepIconCompleted]}>
                      <Text style={styles.stepIconText}>✓</Text>
                    </View>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.statusStepTitle}>Business Information</Text>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, styles.progressCompleted]} />
                    </View>
                  </View>
                  <Text style={styles.stepStatus}>Completed</Text>
                </View>

                {/* Product Verification */}
                <View style={styles.verificationStep}>
                  <View style={styles.stepIconContainer}>
                    <View style={[styles.stepIcon, styles.stepIconInProgress]}>
                      <Text style={styles.stepIconText}>⋯</Text>
                    </View>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.statusStepTitle}>Product Verification</Text>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, styles.progressInProgress]} />
                    </View>
                  </View>
                  <Text style={[styles.stepStatus, styles.stepStatusInProgress]}>In Progress</Text>
                </View>

                {/* Document Verification */}
                <View style={styles.verificationStep}>
                  <View style={styles.stepIconContainer}>
                    <View style={[styles.stepIcon, styles.stepIconPending]}>
                      <Text style={styles.stepIconText}>⏸</Text>
                    </View>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.statusStepTitle}>Document Verification</Text>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, styles.progressPending]} />
                    </View>
                  </View>
                  <Text style={[styles.stepStatus, styles.stepStatusPending]}>Pending</Text>
                </View>
              </View>

              {/* Terms Checkbox */}
              <View style={styles.statusTermsContainer}>
                <TouchableOpacity
                  style={styles.statusCheckbox}
                  onPress={() => setAgreedToTerms(!agreedToTerms)}
                >
                  <View style={[styles.statusCheckboxBox, agreedToTerms && styles.statusCheckboxChecked]}>
                    {agreedToTerms && <Text style={styles.statusCheckmark}>✓</Text>}
                  </View>
                  <Text style={styles.statusTermsText}>
                    I confirm that all information provided is accurate and I agree to the{' '}
                    <Text style={styles.statusTermsLink}>Terms & Conditions</Text>
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Submit Button */}
              <TouchableOpacity style={styles.statusSubmitButton}>
                <Text style={styles.statusSubmitButtonText}>Submit for Verification</Text>
              </TouchableOpacity>

              {/* Bottom Text */}
              <Text style={styles.statusBottomText}>
                Verification typically takes 2-3 business days to complete
              </Text>

              <View style={{ height: 30 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 20,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepWrapper: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIconContainer: {
    marginRight: 4,
  },
  acceptedIcon: {
    fontSize: 12,
    color: '#4CAF50',
  },
  rejectedIcon: {
    fontSize: 12,
    color: '#F44336',
  },
  pendingIcon: {
    fontSize: 12,
    color: '#FF9800',
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  stepConnector: {
    position: 'absolute',
    top: 16,
    left: '50%',
    width: 40,
    height: 1,
    backgroundColor: '#E0E0E0',
    zIndex: -1,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4285F4',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#4285F4',
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: '#F44336',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 8,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  orText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
  },
  marginTop: {
    marginTop: 8,
  },
  termsContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  checkmark: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    flex: 1,
  },
  termsLink: {
    color: '#4285F4',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  verificationText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '85%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  dropdownOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedOption: {
    backgroundColor: '#E3F2FD',
  },
  placeholderOption: {
    opacity: 0.6,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#4285F4',
    fontWeight: '600',
  },
  placeholderText: {
    color: '#999',
    fontStyle: 'italic',
  },
  checkIcon: {
    fontSize: 16,
    color: '#4285F4',
    fontWeight: 'bold',
  },
  documentSection: {
    marginTop: 24,
  },
  documentSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  documentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
    overflow: 'hidden',
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  documentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentIcon: {
    fontSize: 20,
    color: '#fff',
  },
  documentIconImage: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  documentSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  uploadArea: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    margin: 16,
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
  },
  uploadIcon: {
    fontSize: 24,
    color: '#999',
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  uploadFormat: {
    fontSize: 12,
    color: '#999',
  },
  accountSection: {
    marginTop: 24,
  },
  accountSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  accountTypeContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  accountTypeTab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  accountTypeTabActive: {
    backgroundColor: '#4285F4',
  },
  accountTypeTabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  accountTypeTabTextActive: {
    color: '#fff',
  },
  accountInputGroup: {
    marginBottom: 20,
  },
  accountInputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  upiInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  upiPrefix: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  upiInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  accountInputHelper: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  bankAccountPlaceholder: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginTop: 20,
  },
  bankAccountPlaceholderText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  bankInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  bankInputIcon: {
    fontSize: 16,
    color: '#666',
    marginRight: 12,
  },
  bankInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  bankDropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bankDropdownText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  bankDropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  productsSection: {
    marginTop: 24,
  },
  productStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  productStatusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productStatusSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  productSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  productSearchIcon: {
    fontSize: 16,
    color: '#999',
    marginRight: 12,
  },
  productSearchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  productTabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  productTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  productTabActive: {
    borderBottomColor: '#4285F4',
  },
  productTabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#999',
    marginBottom: 2,
  },
  productTabTextActive: {
    color: '#4285F4',
    fontWeight: '600',
  },
  productTabCount: {
    fontSize: 14,
    color: '#999',
  },
  productTabCountActive: {
    color: '#4285F4',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F5F5F5',
  },
  productCardContent: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  productStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  productStatusVerified: {
    backgroundColor: '#E8F5E8',
  },
  productStatusPending: {
    backgroundColor: '#FFF3CD',
  },
  productStatusRejected: {
    backgroundColor: '#FFE8E8',
  },
  productStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  productStatusTextVerified: {
    color: '#4CAF50',
  },
  productStatusTextPending: {
    color: '#FF9800',
  },
  productStatusTextRejected: {
    color: '#F44336',
  },
  productDate: {
    fontSize: 10,
    color: '#999',
  },
  productModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  productModalContent: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  productModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  productModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  productModalClose: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  productModalScrollView: {
    flex: 1,
    paddingBottom: 20,
  },
  productModalImageContainer: {
    height: 180,
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  productModalImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  productModalInfo: {
    padding: 16,
  },
  productModalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productModalStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productModalStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 12,
  },
  productModalStatusVerified: {
    backgroundColor: '#E8F5E8',
  },
  productModalStatusRejected: {
    backgroundColor: '#FFE8E8',
  },
  productModalStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  productModalStatusTextVerified: {
    color: '#4CAF50',
  },
  productModalStatusTextRejected: {
    color: '#F44336',
  },
  productModalDate: {
    fontSize: 14,
    color: '#666',
  },
  rejectionReasonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE8E8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  rejectionReasonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  rejectionReasonText: {
    fontSize: 14,
    color: '#F44336',
    flex: 1,
  },
  productModalPricing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  priceItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  priceUnit: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  productDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  detailItem: {
    width: '48%',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  stockValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  specificationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  specificationsGrid: {
    marginBottom: 24,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  specLabel: {
    fontSize: 14,
    color: '#666',
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  productModalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  editButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F44336',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  deleteButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F44336',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4285F4',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  downloadButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4285F4',
  },
  // Status Modal Styles
  statusModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  statusModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
    paddingBottom: 20,
  },
  statusModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statusModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statusModalClose: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  statusModalScrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  statusProgressInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 8,
    marginVertical: 20,
  },
  statusInfoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  statusInfoIconText: {
    fontSize: 14,
    color: '#fff',
  },
  statusInfoText: {
    flex: 1,
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  verificationSteps: {
    marginBottom: 30,
  },
  verificationStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepIconContainer: {
    marginRight: 16,
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIconCompleted: {
    backgroundColor: '#4CAF50',
  },
  stepIconInProgress: {
    backgroundColor: '#2196F3',
  },
  stepIconPending: {
    backgroundColor: '#E0E0E0',
  },
  stepIconText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
    marginRight: 16,
  },
  statusStepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressCompleted: {
    backgroundColor: '#4CAF50',
    width: '100%',
  },
  progressInProgress: {
    backgroundColor: '#2196F3',
    width: '60%',
  },
  progressPending: {
    backgroundColor: '#E0E0E0',
    width: '0%',
  },
  stepStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
  },
  stepStatusInProgress: {
    color: '#2196F3',
  },
  stepStatusPending: {
    color: '#999',
  },
  statusTermsContainer: {
    marginBottom: 24,
  },
  statusCheckbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  statusCheckboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCheckboxChecked: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  statusCheckmark: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  statusTermsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    flex: 1,
  },
  statusTermsLink: {
    color: '#4285F4',
    fontWeight: '500',
  },
  statusSubmitButton: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  statusSubmitButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  statusBottomText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default KycScreen1;
