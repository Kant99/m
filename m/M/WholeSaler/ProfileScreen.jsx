import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Modal,
  TextInput,
} from 'react-native';
import BottomTab from './BottomTab';

const ProfileScreen = ({ onNavigate }) => {
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showBusinessHoursModal, setShowBusinessHoursModal] = useState(false);
  
  const [businessHours, setBusinessHours] = useState({
    Monday: { isOpen: true, startTime: '09:00', endTime: '20:00' },
    Tuesday: { isOpen: false, startTime: '09:00', endTime: '20:00' },
    Wednesday: { isOpen: true, startTime: '09:00', endTime: '20:00' },
    Thursday: { isOpen: true, startTime: '09:00', endTime: '20:00' },
    Friday: { isOpen: true, startTime: '09:00', endTime: '20:00' },
    Saturday: { isOpen: true, startTime: '10:00', endTime: '18:00' },
    Sunday: { isOpen: false, startTime: '09:00', endTime: '20:00' },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Mandi Bhai</Text>
          <Text style={styles.vendor}>vendor</Text>
        </View>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => onNavigate('NotificationScreen')}
        >
          <Text style={styles.bellIcon}>🔔</Text>
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <Text style={styles.sectionSubtitle}>Manage your account settings</Text>
          
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <View style={styles.profileImageContainer}>
                <Image 
                  source={require('../assets/IMG-9.png')} 
                  style={styles.profileImage}
                />
                <View style={styles.cameraIcon}>
                  <Text style={styles.cameraIconText}>📷</Text>
                </View>
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>Rajesh Kumar</Text>
                <Text style={styles.profileRole}>Grocery Store Owner</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.storeStatusContainer}>
              <View style={styles.storeStatusLeft}>
                <Text style={styles.closedLabel}>CLOSED</Text>
              </View>
              <Switch
                value={isStoreOpen}
                onValueChange={setIsStoreOpen}
                trackColor={{ false: '#D1D5DB', true: '#10B981' }}
                thumbColor="#fff"
                style={styles.storeSwitch}
              />
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <View style={styles.contactItem}>
            <View style={styles.contactIconContainer}>
              <Text style={styles.contactIcon}>📞</Text>
            </View>
            <Text style={styles.contactText}>+91 98765 43210</Text>
          </View>
          <View style={styles.contactItem}>
            <View style={styles.contactIconContainer}>
              <Text style={styles.contactIcon}>✉️</Text>
            </View>
            <Text style={styles.contactText}>rajesh@gmail.com</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationSection}>
          <View style={styles.locationItem}>
            <View style={styles.locationIconContainer}>
              <Text style={styles.locationIcon}>🏪</Text>
            </View>
            <Text style={styles.locationLabel}>Mandi/APMC Area</Text>
            <Text style={styles.locationValue}>Govindpuram</Text>
          </View>
        </View>

        {/* Business Details */}
        <View style={styles.businessSection}>
          <Text style={styles.businessTitle}>Business Details</Text>
          
          <View style={styles.businessCard}>
            {/* Business Hours */}
            <View style={styles.businessItem}>
              <View style={styles.businessItemHeader}>
                <Text style={styles.businessItemTitle}>Business Hours</Text>
                <TouchableOpacity onPress={() => setShowBusinessHoursModal(true)}>
                  <Text style={styles.editLink}>Edit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.hoursContainer}>
                <View style={styles.hourRow}>
                  <Text style={styles.dayText}>Monday - Friday</Text>
                  <Text style={styles.timeText}>9:00 AM - 8:00 PM</Text>
                </View>
                <View style={styles.hourRow}>
                  <Text style={styles.dayText}>Saturday</Text>
                  <Text style={styles.timeText}>10:00 AM - 6:00 PM</Text>
                </View>
                <View style={styles.hourRow}>
                  <Text style={styles.dayText}>Sunday</Text>
                  <Text style={styles.timeText}>Closed</Text>
                </View>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Store Address */}
            <View style={styles.businessItem}>
              <View style={styles.businessItemHeader}>
                <Text style={styles.businessItemTitle}>Store Address</Text>
                <TouchableOpacity>
                  <Text style={styles.editLink}>Edit</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.addressText}>
                Shop No. 42, Market Complex, Sector 18{'\n'}
                Noida, Uttar Pradesh 201301
              </Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Business Category */}
            <View style={styles.businessItem}>
              <View style={styles.businessItemHeader}>
                <Text style={styles.businessItemTitle}>Business Category</Text>
                <TouchableOpacity>
                  <Text style={styles.editLink}>Edit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.categoryContainer}>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryTagText}>Grocery</Text>
                </View>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryTagText}>Fresh Produce</Text>
                </View>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryTagText}>Daily Essentials</Text>
                </View>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Ratings & Reviews */}
            <View style={styles.businessItem}>
              <View style={styles.businessItemHeader}>
                <Text style={styles.businessItemTitle}>Ratings & Reviews</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllLink}>View All</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingIcon}>⭐</Text>
                <Text style={styles.ratingText}>4.7</Text>
                <Text style={styles.reviewCount}>(128 reviews)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.accountSection}>
          <Text style={styles.accountTitle}>Account Settings</Text>
          
          <View style={styles.accountCard}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>💳</Text>
                <Text style={styles.settingText}>Payment Methods</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🔒</Text>
                <Text style={styles.settingText}>Security Settings</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🌐</Text>
                <Text style={styles.settingText}>Language</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.languageText}>English</Text>
                <Text style={styles.settingArrow}>›</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🔔</Text>
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E0E0E0', true: '#4CD964' }}
                thumbColor="#fff"
                style={styles.settingSwitch}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🌙</Text>
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#E0E0E0', true: '#4CD964' }}
                thumbColor="#fff"
                style={styles.settingSwitch}
              />
            </View>
          </View>
        </View>

        {/* Support & Help */}
        <View style={styles.supportSection}>
          <Text style={styles.supportTitle}>Support & Help</Text>
          
          <View style={styles.supportCard}>
            <TouchableOpacity style={styles.supportItem}>
              <View style={styles.supportLeft}>
                <Text style={styles.supportIcon}>❓</Text>
                <Text style={styles.supportText}>Help Center</Text>
              </View>
              <Text style={styles.supportArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.supportItem}>
              <View style={styles.supportLeft}>
                <Text style={styles.supportIcon}>💬</Text>
                <Text style={styles.supportText}>Contact Support</Text>
              </View>
              <Text style={styles.supportArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.supportItem}>
              <View style={styles.supportLeft}>
                <Text style={styles.supportIcon}>📄</Text>
                <Text style={styles.supportText}>Terms of Service</Text>
              </View>
              <Text style={styles.supportArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.supportItem}>
              <View style={styles.supportLeft}>
                <Text style={styles.supportIcon}>🔒</Text>
                <Text style={styles.supportText}>Privacy Policy</Text>
              </View>
              <Text style={styles.supportArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Business Hours Modal */}
      <Modal
        visible={showBusinessHoursModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowBusinessHoursModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.businessHoursModal}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Business Hours</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowBusinessHoursModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Day</Text>
              <Text style={styles.tableHeaderText}>Status</Text>
              <Text style={styles.tableHeaderText}>Hours</Text>
            </View>

            <ScrollView style={styles.modalScrollView}>
              {Object.keys(businessHours).map((day) => {
                const dayData = businessHours[day];
                
                return (
                  <View key={day} style={styles.dayRow}>
                    <Text style={styles.modalDayText}>{day}</Text>
                    
                    <TouchableOpacity
                      style={[
                        styles.statusButton,
                        dayData.isOpen ? styles.statusOpen : styles.statusClosed
                      ]}
                      onPress={() => {
                        setBusinessHours(prev => ({
                          ...prev,
                          [day]: { ...prev[day], isOpen: !prev[day].isOpen }
                        }));
                      }}
                    >
                      <Text style={[
                        styles.statusButtonText,
                        dayData.isOpen ? styles.statusOpenText : styles.statusClosedText
                      ]}>
                        {dayData.isOpen ? '✓' : '✕'}
                      </Text>
                    </TouchableOpacity>

                    {dayData.isOpen ? (
                      <View style={styles.timeInputContainer}>
                        <TextInput
                          style={styles.timeInput}
                          value={dayData.startTime}
                          onChangeText={(text) => {
                            setBusinessHours(prev => ({
                              ...prev,
                              [day]: { ...prev[day], startTime: text }
                            }));
                          }}
                        />
                        <Text style={styles.timeSeparator}>-</Text>
                        <TextInput
                          style={styles.timeInput}
                          value={dayData.endTime}
                          onChangeText={(text) => {
                            setBusinessHours(prev => ({
                              ...prev,
                              [day]: { ...prev[day], endTime: text }
                            }));
                          }}
                        />
                      </View>
                    ) : (
                      <View style={styles.closedContainer}>
                        <Text style={styles.closedText}>Closed</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>

            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowBusinessHoursModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => {
                  setShowBusinessHoursModal(false);
                  // Here you would typically save the changes
                }}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <BottomTab 
        activeTab={activeTab} 
        onTabPress={(tab) => {
          setActiveTab(tab);
          if (tab === 'catalogue') {
            onNavigate('WholesalerHome');
          } else if (tab === 'orders') {
            onNavigate('OrderScreen');
          } else if (tab === 'accounting') {
            onNavigate('AccountScreen');
          } else if (tab === 'profile') {
            // Already on ProfileScreen, no navigation needed
            setActiveTab('profile');
          }
        }} 
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Dancing Script',
    fontWeight: '500',
    fontSize: 17.5,
    lineHeight: 24.5,
    letterSpacing: 0,
    color: '#333',
    textAlignVertical: 'center',
  },
  vendor: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
  },
  bellIcon: {
    fontSize: 20,
    color: '#333',
  },
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#F75C4E',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E9ECEF',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#4285F4',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cameraIconText: {
    fontSize: 14,
    color: '#fff',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 18,
    color: '#4285F4',
  },
  storeStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeStatusLeft: {
    flex: 1,
  },
  closedLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F75C4E',
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginLeft:90,
    //marginBottom:15,
    //paddingBottom:20,
  },
  storeSwitch: {
    transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }],
    marginRight:100,
  },
  contactSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  contactIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactIcon: {
    fontSize: 18,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  locationSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  locationIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationIcon: {
    fontSize: 18,
  },
  locationLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  locationValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  businessSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  businessTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  businessCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  businessItem: {
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: 16,
  },
  businessItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  businessItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  editLink: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: '500',
  },
  viewAllLink: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: '500',
  },
  hoursContainer: {
    gap: 8,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#666',
  },
  timeText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryTag: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryTagText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  accountSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  accountTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  accountCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  settingArrow: {
    fontSize: 18,
    color: '#CCC',
  },
  settingSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  supportSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  supportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  supportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  supportLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  supportIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  supportText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  supportArrow: {
    fontSize: 18,
    color: '#CCC',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F75C4E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    color: '#F75C4E',
    fontWeight: 'bold',
  },
  
  // Business Hours Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  businessHoursModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
    padding: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    flex: 1,
    textAlign: 'center',
  },
  modalScrollView: {
    maxHeight: 400,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalDayText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  statusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  statusOpen: {
    backgroundColor: '#E8F5E8',
  },
  statusClosed: {
    backgroundColor: '#FFEBEE',
  },
  statusButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusOpenText: {
    color: '#4CAF50',
  },
  statusClosedText: {
    color: '#F44336',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    textAlign: 'center',
    width: 70,
    backgroundColor: '#fff',
  },
  timeSeparator: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 8,
  },
  closedContainer: {
    flex: 2,
    alignItems: 'center',
  },
  closedText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#4285F4',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;