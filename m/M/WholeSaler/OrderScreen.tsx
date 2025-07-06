import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  Image,
  Modal,
  PanResponder,
  Dimensions,
} from 'react-native';
import BottomTab from './BottomTab';
import type { AppScreen } from '../App';

type Props = {
  onNavigate?: (screen: AppScreen) => void;
};

const OrderScreen: React.FC<Props> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrderTab, setSelectedOrderTab] = useState('all');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [orderDetailsModalVisible, setOrderDetailsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('All');
  const [orderAmountRange, setOrderAmountRange] = useState(1000);
  const [vehicleNumber, setVehicleNumber] = useState('');
  
  // Slider configuration
  const minAmount = 1000;
  const maxAmount = 200000;
  const sliderWidth = Dimensions.get('window').width * 0.8 - 48; // Modal width minus padding
  const [initialSliderPosition, setInitialSliderPosition] = useState(0);
  
  // Calculate slider position based on amount
  const getSliderPosition = (amount: number) => {
    const percentage = (amount - minAmount) / (maxAmount - minAmount);
    return percentage * sliderWidth;
  };
  
  // Calculate amount based on slider position
  const getAmountFromPosition = (position: number) => {
    const percentage = Math.max(0, Math.min(1, position / sliderWidth));
    return Math.round(minAmount + percentage * (maxAmount - minAmount));
  };
  
  // Format amount with commas
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-IN');
  };
  
  // PanResponder for slider
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      // Store initial position when gesture starts
      setInitialSliderPosition(getSliderPosition(orderAmountRange));
    },
    onPanResponderMove: (evt, gestureState) => {
      const newPosition = Math.max(0, Math.min(sliderWidth, initialSliderPosition + gestureState.dx));
      const newAmount = getAmountFromPosition(newPosition);
      setOrderAmountRange(newAmount);
    },
    onPanResponderRelease: () => {
      // Optional: Add haptic feedback or animation here
    },
  });

  const orderTabs = [
    { key: 'all', label: 'All (3)', count: 3 },
    { key: 'new', label: 'New (1)', count: 1 },
    { key: 'processing', label: 'Processing (1)', count: 1 },
    { key: 'delivered', label: 'Delivered', count: 0 },
  ];

  const orders = [
    {
      id: 'ORD-2505-1234',
      customerName: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      date: 'May 3, 2025 • 10:23 AM',
      items: 3,
      amount: 235,
      payment: 'Paid online',
      status: 'Delivered',
      statusColor: '#4CAF50',
      statusBg: '#E8F5E8',
      pincode: 'UP16 AB 1234',
      otp: '4321',
      avatar: require('../assets/to.png'),
      vehicleType: 'Tata Ace Gold',
      vehicleSubtype: 'Mini Truck',
      orderItems: [
        { name: 'Fresh Tomatoes', quantity: '2 kg', price: '₹40/kg', total: '₹80', image: require('../assets/to.png') },
        { name: 'Potatoes', quantity: '3 kg', price: '₹30/kg', total: '₹90', image: require('../assets/IMG-4.png') },
        { name: 'Onions', quantity: '2 kg', price: '₹32.50/kg', total: '₹65', image: require('../assets/oni.png') }
      ],
      subtotal: 235,
      deliveryFee: 0,
      total: 180,
      deliveryStatus: 'Out for delivery',
      paymentStatus: 'Completed'
    },
    {
      id: 'ORD-2505-1233',
      customerName: 'Priya Sharma',
      phone: '+91 97654 32109',
      date: 'May 3, 2025 • 09:45 AM',
      items: 5,
      amount: 450,
      payment: 'Cash on delivery',
      status: 'Processing',
      statusColor: '#FF9800',
      statusBg: '#FFF3E0',
      pincode: 'UP16 AB 1234',
      otp: '4321',
      avatar: require('../assets/oni.png'),
      vehicleType: 'Tata Ace Gold',
      vehicleSubtype: 'Mini Truck',
      orderItems: [
        { name: 'Fresh Tomatoes', quantity: '3 kg', price: '₹40/kg', total: '₹120', image: require('../assets/to.png') },
        { name: 'Onions', quantity: '5 kg', price: '₹32.50/kg', total: '₹162.50', image: require('../assets/oni.png') }
      ],
      subtotal: 282.50,
      deliveryFee: 0,
      total: 282.50,
      deliveryStatus: 'Processing',
      paymentStatus: 'Pending'
    },
    {
      id: 'ORD-2505-1232',
      customerName: 'Amit Patel',
      phone: '+91 96543 21098',
      date: 'May 3, 2025 • 08:30 AM',
      items: 2,
      amount: 180,
      payment: 'Paid online',
      status: 'New',
      statusColor: '#2196F3',
      statusBg: '#E3F2FD',
      pincode: 'UP16 AB 1234',
      otp: '4321',
      avatar: require('../assets/cap.png'),
      vehicleType: 'Tata Ace Gold',
      vehicleSubtype: 'Mini Truck',
      orderItems: [
        { name: 'Fresh Tomatoes', quantity: '2 kg', price: '₹40/kg', total: '₹80', image: require('../assets/to.png') },
        { name: 'Potatoes', quantity: '3 kg', price: '₹30/kg', total: '₹90', image: require('../assets/IMG-4.png') }
      ],
      subtotal: 170,
      deliveryFee: 0,
      total: 170,
      deliveryStatus: 'Out for delivery',
      paymentStatus: 'Completed'
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Mandi Bhai</Text>
          <Text style={styles.vendor}>vendor</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.bellWrap}>
            <Text style={styles.bellIcon}>🔔</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.closedText}>CLOSED</Text>
          <Switch 
            value={isOpen} 
            onValueChange={setIsOpen} 
            trackColor={{ true: '#4CD964', false: '#E0E0E0' }} 
            thumbColor={'#fff'}
            style={styles.toggleSwitch}
          />
        </View>
      </View>

      {/* Orders Section */}
      <View style={styles.ordersSection}>
        <Text style={styles.ordersTitle}>Orders</Text>
        <Text style={styles.ordersSubtitle}>Manage your customer orders</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchFilterRow}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search orders..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Text style={styles.filterIcon}>▼</Text>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Order Tabs */}
      <View style={styles.orderTabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.orderTabs}>
            {orderTabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.orderTab,
                  selectedOrderTab === tab.key && styles.orderTabActive
                ]}
                onPress={() => setSelectedOrderTab(tab.key)}
              >
                <Text style={[
                  styles.orderTabText,
                  selectedOrderTab === tab.key && styles.orderTabTextActive
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView style={styles.ordersScrollView} showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <TouchableOpacity 
            key={order.id} 
            style={styles.orderCard}
            onPress={() => {
              setSelectedOrder(order);
              setOrderDetailsModalVisible(true);
            }}
          >
            <View style={styles.orderHeader}>
              <View style={styles.orderHeaderLeft}>
                <Image source={order.avatar} style={styles.customerAvatar} />
                <View style={styles.orderHeaderInfo}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.customerName}>{order.customerName}</Text>
                  <Text style={styles.customerPhone}>{order.phone}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
              </View>
              <View style={styles.orderHeaderRight}>
                <View style={[styles.statusBadge, { backgroundColor: order.statusBg }]}>
                  <Text style={[styles.statusText, { color: order.statusColor }]}>
                    {order.status}
                  </Text>
                </View>
                <View style={styles.pincodeContainer}>
                  <Text style={styles.pincode}>{order.pincode}</Text>
                </View>
                <View style={styles.otpContainer}>
                  <Text style={styles.otpLabel}>OTP: </Text>
                  <Text style={styles.otpValue}>{order.otp}</Text>
                </View>
              </View>
            </View>

            <View style={styles.orderFooter}>
              <View style={styles.orderFooterLeft}>
                <Text style={styles.itemsCount}>{order.items} items</Text>
                <Text style={styles.paymentLabel}>Payment</Text>
              </View>
              <View style={styles.orderFooterRight}>
                <Text style={styles.orderAmount}>₹{order.amount}</Text>
                <Text style={[
                  styles.paymentStatus,
                  { color: order.payment === 'Paid online' ? '#4CAF50' : '#FF9800' }
                ]}>
                  {order.payment}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.filterModalOverlay}
          activeOpacity={1}
          onPress={() => setFilterModalVisible(false)}
        >
          <TouchableOpacity 
            style={styles.filterModalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalTitle}>Filter Orders</Text>
            </View>

            <ScrollView style={styles.filterModalScrollView} showsVerticalScrollIndicator={false}>
              {/* Date Range */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Date Range</Text>
                <View style={styles.dateRangeContainer}>
                  <TouchableOpacity style={styles.dateInput}>
                    <Text style={styles.dateInputText}>-/-/-</Text>
                    <Text style={styles.dateIcon}>📅</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.dateInput}>
                    <Text style={styles.dateInputText}>-/-/-</Text>
                    <Text style={styles.dateIcon}>📅</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Payment Method */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Payment Method</Text>
                <TouchableOpacity style={styles.paymentMethodDropdown}>
                  <Text style={styles.paymentMethodText}>{selectedPaymentMethod}</Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
              </View>

              {/* Order Amount Range */}
              <View style={styles.filterSection}>
                <View style={styles.amountRangeHeader}>
                  <Text style={styles.filterSectionTitle}>Order Amount Range</Text>
                  <Text style={styles.amountRangeValue}>₹{formatAmount(orderAmountRange)}</Text>
                </View>
                <View style={styles.sliderContainer}>
                  <TouchableOpacity 
                    style={styles.sliderTrack}
                    activeOpacity={1}
                    onPress={(evt) => {
                      const locationX = evt.nativeEvent.locationX;
                      const newAmount = getAmountFromPosition(locationX);
                      setOrderAmountRange(newAmount);
                    }}
                  >
                    <View 
                      style={[styles.sliderThumb, { left: getSliderPosition(orderAmountRange) }]} 
                      {...panResponder.panHandlers}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabel}>₹{formatAmount(minAmount)}</Text>
                  <Text style={styles.sliderLabel}>₹{formatAmount(maxAmount)}</Text>
                </View>
                <Text style={styles.ordersFoundText}>0 orders found in this range</Text>
              </View>

              {/* Vehicle Number */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Vehicle Number</Text>
                <TextInput
                  style={styles.vehicleNumberInput}
                  placeholder="Enter vehicle number"
                  placeholderTextColor="#999"
                  value={vehicleNumber}
                  onChangeText={setVehicleNumber}
                />
              </View>
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.filterModalFooter}>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => {
                  setSelectedPaymentMethod('All');
                  setOrderAmountRange(minAmount);
                  setVehicleNumber('');
                }}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Order Details Modal */}
      <Modal
        visible={orderDetailsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setOrderDetailsModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.orderDetailsModalOverlay}
          activeOpacity={1}
          onPress={() => setOrderDetailsModalVisible(false)}
        >
          <TouchableOpacity 
            style={styles.orderDetailsModalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {selectedOrder && (
              <>
                {/* Header */}
                <View style={styles.orderDetailsHeader}>
                  <Text style={styles.orderDetailsTitle}>Order Details</Text>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setOrderDetailsModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.orderDetailsScrollView} showsVerticalScrollIndicator={false}>
                  {/* Customer Info */}
                  <View style={styles.customerInfoSection}>
                    <View style={styles.customerInfoLeft}>
                      <Image source={selectedOrder.avatar} style={styles.customerInfoAvatar} />
                      <View style={styles.customerInfoDetails}>
                        <Text style={styles.customerInfoName}>{selectedOrder.customerName}</Text>
                        <Text style={styles.customerInfoPhone}>{selectedOrder.phone}</Text>
                      </View>
                    </View>
                    <View style={styles.customerInfoRight}>
                      <Text style={styles.vehicleType}>{selectedOrder.vehicleType}</Text>
                      <Text style={styles.vehicleSubtype}>{selectedOrder.vehicleSubtype}</Text>
                    </View>
                  </View>

                  {/* Order Items */}
                  <View style={styles.orderItemsSection}>
                    <Text style={styles.orderItemsTitle}>Order Items</Text>
                    {selectedOrder.orderItems.map((item: any, index: number) => (
                      <View key={index} style={styles.orderItemCard}>
                        <Image source={item.image} style={styles.orderItemImage} />
                        <View style={styles.orderItemDetails}>
                          <Text style={styles.orderItemName}>{item.name}</Text>
                          <Text style={styles.orderItemQuantity}>{item.quantity} • {item.price}</Text>
                        </View>
                        <Text style={styles.orderItemTotal}>{item.total}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Order Summary */}
                  <View style={styles.orderSummarySection}>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Subtotal</Text>
                      <Text style={styles.summaryValue}>₹{selectedOrder.subtotal}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Delivery Fee</Text>
                      <Text style={styles.summaryValue}>₹{selectedOrder.deliveryFee}</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                      <Text style={styles.totalLabel}>Total</Text>
                      <Text style={styles.totalValue}>₹{selectedOrder.total}</Text>
                    </View>
                  </View>

                  {/* Delivery Details */}
                  <View style={styles.deliveryDetailsSection}>
                    <Text style={styles.sectionTitle}>Delivery Details</Text>
                    <View style={styles.deliveryCard}>
                      <View style={styles.deliveryCardHeader}>
                        <Text style={styles.deliveryTruck}>🚚</Text>
                        <Text style={styles.deliveryPincode}>{selectedOrder.pincode}</Text>
                        <View style={styles.deliveryStatusBadge}>
                          <Text style={styles.deliveryStatusText}>{selectedOrder.deliveryStatus}</Text>
                        </View>
                      </View>
                      <View style={styles.deliveryCardFooter}>
                        <Text style={styles.deliveryPhone}>{selectedOrder.phone}</Text>
                        <View style={styles.deliveryActions}>
                          <TouchableOpacity style={styles.callButton}>
                            <Text style={styles.callIcon}>📞</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.messageButton}>
                            <Text style={styles.messageIcon}>💬</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Payment Information */}
                  <View style={styles.paymentInfoSection}>
                    <Text style={styles.sectionTitle}>Payment Information</Text>
                    <View style={styles.paymentCard}>
                      <View style={styles.paymentCardContent}>
                        <Text style={styles.paymentIcon}>💳</Text>
                        <Text style={styles.paymentMethod}>Paid online</Text>
                      </View>
                      <Text style={styles.modalPaymentStatus}>{selectedOrder.paymentStatus}</Text>
                    </View>
                  </View>
                </ScrollView>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Bottom Tab */}
      <BottomTab 
        activeTab={activeTab} 
        onTabPress={(tab) => {
          setActiveTab(tab);
          if (tab === 'catalogue' && onNavigate) {
            onNavigate('WholesalerHome');
          } else if (tab === 'accounting' && onNavigate) {
            onNavigate('AccountScreen');
          } else if (tab === 'profile' && onNavigate) {
            onNavigate('ProfileScreen');
          }
        }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F51B5',
  },
  vendor: {
    fontSize: 12,
    color: '#3F51B5',
    marginLeft: 8,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellWrap: {
    marginRight: 12,
    position: 'relative',
  },
  bellIcon: {
    fontSize: 18,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#F44336',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  closedText: {
    marginRight: 8,
    color: '#F44336',
    fontWeight: 'bold',
    fontSize: 14,
  },
  toggleSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  ordersSection: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  ordersTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  ordersSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  searchFilterRow: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchIcon: {
    fontSize: 18,
    color: '#999',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  filterIcon: {
    fontSize: 12,
    color: '#fff',
    marginRight: 6,
  },
  filterText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  orderTabsContainer: {
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  orderTabs: {
    flexDirection: 'row',
  },
  orderTab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#F5F5F5',
  },
  orderTabActive: {
    backgroundColor: '#3F51B5',
  },
  orderTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  orderTabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ordersScrollView: {
    flex: 1,
    paddingHorizontal: 18,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  orderHeaderLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  customerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  orderHeaderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 1,
  },
  customerPhone: {
    fontSize: 13,
    color: '#666',
    marginBottom: 1,
  },
  orderDate: {
    fontSize: 13,
    color: '#666',
  },
  orderHeaderRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  pincodeContainer: {
    backgroundColor: '#FFF3C4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  pincode: {
    fontSize: 11,
    color: '#D4A017',
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  otpLabel: {
    fontSize: 11,
    color: '#1976D2',
  },
  otpValue: {
    fontSize: 11,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  orderFooterLeft: {
    flex: 1,
  },
  itemsCount: {
    fontSize: 13,
    color: '#333',
    marginBottom: 1,
  },
  paymentLabel: {
    fontSize: 13,
    color: '#666',
  },
  orderFooterRight: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 1,
  },
  paymentStatus: {
    fontSize: 13,
    fontWeight: '600',
  },
  
  // Filter Modal Styles
  filterModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  filterModalContent: {
    width: '100%',
    maxHeight: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  filterModalHeader: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 0,
  },
  filterModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  filterModalScrollView: {
    paddingHorizontal: 24,
    paddingBottom: 0,
  },
  filterSection: {
    marginBottom: 28,
  },
  filterSectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#555',
    marginBottom: 16,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  dateInputText: {
    fontSize: 16,
    color: '#6C757D',
  },
  dateIcon: {
    fontSize: 18,
    color: '#495057',
  },
  paymentMethodDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#495057',
  },
  dropdownArrow: {
    fontSize: 14,
    color: '#6C757D',
  },
  amountRangeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  amountRangeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F51B5',
  },
  sliderContainer: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sliderTrack: {
    height: 6,
    backgroundColor: '#E9ECEF',
    borderRadius: 3,
    position: 'relative',
  },
  sliderThumb: {
    position: 'absolute',
    top: -8,
    width: 22,
    height: 22,
    backgroundColor: '#3F51B5',
    borderRadius: 11,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#666',
  },
  ordersFoundText: {
    fontSize: 14,
    color: '#999',
  },
  vehicleNumberInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#495057',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  filterModalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 0,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    color: '#6C757D',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#3F51B5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  
  // Order Details Modal Styles
  orderDetailsModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  orderDetailsModalContent: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  orderDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  orderDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  orderDetailsScrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  customerInfoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  customerInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  customerInfoAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  customerInfoDetails: {
    flex: 1,
  },
  customerInfoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  customerInfoPhone: {
    fontSize: 14,
    color: '#666',
  },
  customerInfoRight: {
    alignItems: 'flex-end',
  },
  vehicleType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  vehicleSubtype: {
    fontSize: 12,
    color: '#666',
  },
  orderItemsSection: {
    paddingVertical: 20,
  },
  orderItemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  orderItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  orderItemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  orderItemDetails: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  orderItemQuantity: {
    fontSize: 13,
    color: '#666',
  },
  orderItemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderSummarySection: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryDetailsSection: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  deliveryCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  deliveryCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryTruck: {
    fontSize: 20,
    marginRight: 12,
  },
  deliveryPincode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4A017',
    flex: 1,
  },
  deliveryStatusBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  deliveryStatusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  deliveryCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryPhone: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
    flex: 1,
  },
  deliveryActions: {
    flexDirection: 'row',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIcon: {
    fontSize: 16,
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageIcon: {
    fontSize: 16,
  },
  paymentInfoSection: {
    paddingVertical: 20,
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  paymentCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  paymentMethod: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  modalPaymentStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default OrderScreen;
