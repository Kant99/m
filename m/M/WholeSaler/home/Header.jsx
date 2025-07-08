import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';

const Header = ({ onNavigate, isOpen, setIsOpen }) => {
  return (
    <View style={styles.header}>
      {/* Title & Role */}
      <View style={styles.leftSection}>
        <Text style={styles.title}>Mandi Bhai</Text>
        <Text style={styles.role}>vendor</Text>
      </View>

      {/* Notification + Toggle */}
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.notificationWrapper}
          onPress={() => onNavigate('NotificationScreen')}
        >
          <Text style={styles.bell}>🔔</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.openText}>OPEN</Text>
        <Switch
          value={isOpen}
          onValueChange={(value) => setIsOpen(value)}
          thumbColor={isOpen ? '#1DA15D' : '#ccc'}
          trackColor={{ false: '#aaa', true: '#C7F3DD' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#EFFFF7',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1DA15D',
  },
  role: {
    fontSize: 12,
    color: '#1DA15D',
    marginTop: 2,
    marginLeft: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationWrapper: {
    marginRight: 12,
    position: 'relative',
  },
  bell: {
    fontSize: 20,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: '#F75C4E',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  openText: {
    color: '#1DA15D',
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default Header;
