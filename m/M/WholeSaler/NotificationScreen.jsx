import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

const NotificationScreen = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [searchText, setSearchText] = useState('');

  const notifications = [
    {
      id: 1,
      type: 'promotion',
      icon: '🏷️',
      title: 'Promotion Approved',
      message: 'Your weekend sale promotion has been approved',
      time: '2 days ago',
      isRead: true,
      hasAction: false,
    },
    {
      id: 2,
      type: 'review',
      icon: '⭐',
      title: 'New Customer Review',
      message: 'James Wilson left a 5-star review on your store',
      time: '1 day ago',
      isRead: true,
      hasAction: false,
    },
    {
      id: 3,
      type: 'inventory',
      icon: '📦',
      title: 'Inventory Alert',
      message: 'Low stock alert for "Organic Tomatoes"',
      time: '5 hours ago',
      isRead: false,
      hasAction: true,
      bgColor: '#E3F2FD',
      borderColor: '#2196F3',
    },
    {
      id: 4,
      type: 'payment',
      icon: '💳',
      title: 'Payment Success',
      message: 'Payment of $2,500 has been credited to your account',
      time: '2 hours ago',
      isRead: false,
      hasAction: true,
      bgColor: '#E3F2FD',
      borderColor: '#2196F3',
    },
    {
      id: 5,
      type: 'order',
      icon: '🛒',
      title: 'New Order Received',
      message: 'You have received a new order #ORD123456',
      time: '10 mins ago',
      isRead: false,
      hasAction: true,
      bgColor: '#E3F2FD',
      borderColor: '#2196F3',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => onNavigate('WholesalerHome')}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {['All', 'Unread', 'Read'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              activeFilter === filter && styles.activeFilterTab,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
        
        {/* Sort Dropdown */}
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Newest First</Text>
          <Text style={styles.sortArrow}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryTab}>
          <Text style={styles.categoryIcon}>📁</Text>
          <Text style={styles.categoryText}>Catalogue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryTab}>
          <Text style={styles.categoryIcon}>📋</Text>
          <Text style={styles.categoryText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryTab}>
          <Text style={styles.categoryIcon}>📊</Text>
          <Text style={styles.categoryText}>Accounting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryTab}>
          <Text style={styles.categoryIcon}>👤</Text>
          <Text style={styles.categoryText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search notifications..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => (
          <View
            key={notification.id}
            style={[
              styles.notificationCard,
              !notification.isRead && notification.bgColor && {
                backgroundColor: notification.bgColor,
                borderLeftWidth: 4,
                borderLeftColor: notification.borderColor,
              },
            ]}
          >
            <View style={styles.notificationContent}>
              <View style={styles.notificationLeft}>
                <View style={[
                  styles.iconContainer,
                  !notification.isRead && notification.bgColor && styles.unreadIconContainer
                ]}>
                  <Text style={styles.notificationIcon}>{notification.icon}</Text>
                </View>
                <View style={styles.notificationText}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                </View>
              </View>
              <View style={styles.notificationRight}>
                <Text style={styles.notificationTime}>{notification.time}</Text>
                {!notification.isRead && (
                  <View style={styles.unreadDot} />
                )}
              </View>
            </View>
            
            {notification.hasAction && !notification.isRead && (
              <TouchableOpacity style={styles.markAsReadButton}>
                <Text style={styles.markAsReadIcon}>✓</Text>
                <Text style={styles.markAsReadText}>Mark as read</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>✓</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Text style={styles.bottomNavIcon}>📁</Text>
          <Text style={styles.bottomNavText}>Catalogue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Text style={styles.bottomNavIcon}>📋</Text>
          <Text style={styles.bottomNavText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Text style={styles.bottomNavIcon}>📊</Text>
          <Text style={styles.bottomNavText}>Accounting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}>
          <Text style={styles.bottomNavIcon}>👤</Text>
          <Text style={styles.bottomNavText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  activeFilterTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4285F4',
  },
  filterText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#4285F4',
    fontWeight: 'bold',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sortText: {
    fontSize: 16,
    color: '#4285F4',
    marginRight: 4,
    fontWeight: '500',
  },
  sortArrow: {
    fontSize: 12,
    color: '#4285F4',
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 16,
    backgroundColor: '#E9ECEF',
    borderRadius: 20,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  searchIcon: {
    fontSize: 16,
    color: '#999',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  notificationLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  unreadIconContainer: {
    backgroundColor: '#E3F2FD',
  },
  notificationIcon: {
    fontSize: 18,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  notificationRight: {
    alignItems: 'flex-end',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4285F4',
  },
  markAsReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingLeft: 52,
  },
  markAsReadIcon: {
    fontSize: 14,
    color: '#4285F4',
    marginRight: 6,
  },
  markAsReadText: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
  },
  bottomNavIcon: {
    fontSize: 20,
    color: '#666',
    marginBottom: 4,
  },
  bottomNavText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

export default NotificationScreen;