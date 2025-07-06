import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BottomTabProps {
  activeTab?: string;
  onTabPress?: (tabKey: string) => void;
}

const tabs = [
  { key: 'catalogue', label: 'Catalogue', icon: '📦' },
  { key: 'orders', label: 'Orders', icon: '📋' },
  { key: 'accounting', label: 'Accounting', icon: '📈' },
  { key: 'profile', label: 'Profile', icon: '👤' },
];

const BottomTab: React.FC<BottomTabProps> = ({ activeTab = 'catalogue', onTabPress }) => {
  return (
    <View style={styles.tabBar}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tabItem}
          onPress={() => onTabPress && onTabPress(tab.key)}
        >
          <Text style={[styles.icon, activeTab === tab.key && styles.activeIcon]}>{tab.icon}</Text>
          <Text style={[styles.label, activeTab === tab.key && styles.activeLabel]}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
    color: '#888',
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  activeIcon: {
    color: '#1976D2',
  },
  activeLabel: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
});

export default BottomTab;
