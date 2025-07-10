import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
  Alert,
} from 'react-native';
import BottomTab from './BottomTab';
import apiConnector from '../utils/apiConnector';

const OrderScreen = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Orders');
  const [selectedOrderTab, setSelectedOrderTab] = useState('all');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [orderDetailsModalVisible, setOrderDetailsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('All');
  const [orderAmountRange, setOrderAmountRange] = useState(1000);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialSliderPosition, setInitialSliderPosition] = useState(0);

  console.log('OrderScreen initialized', {
    isOpen,
    search,
    activeTab,
    selectedOrderTab,
    filterModalVisible,
    orderDetailsModalVisible,
    selectedOrder,
    selectedPaymentMethod,
    orderAmountRange,
    vehicleNumber,
    orders: orders.length,
    loading,
    error,
  });

  const minAmount = 1000;
  const maxAmount = 200000;
  const sliderWidth = Dimensions.get('window').width * 0.8 - 48;

  const getSliderPosition = (amount) => {
    const percentage = (amount - minAmount) / (maxAmount - minAmount);
    const position = percentage * sliderWidth;
    console.log('getSliderPosition', { amount, percentage, position });
    return position;
  };

  const getAmountFromPosition = (position) => {
    const percentage = Math.max(0, Math.min(1, position / sliderWidth));
    const amount = Math.round(minAmount + percentage * (maxAmount - minAmount));
    console.log('getAmountFromPosition', { position, percentage, amount });
    return amount;
  };

  const formatAmount = (amount) => {
    const formatted = amount.toLocaleString('en-IN');
    console.log('formatAmount', { amount, formatted });
    return formatted;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      console.log('PanResponder grant', { orderAmountRange });
      setInitialSliderPosition(getSliderPosition(orderAmountRange));
    },
    onPanResponderMove: (evt, gestureState) => {
      const newPosition = Math.max(0, Math.min(sliderWidth, initialSliderPosition + gestureState.dx));
      const newAmount = getAmountFromPosition(newPosition);
      console.log('PanResponder move', { newPosition, newAmount, gestureState });
      setOrderAmountRange(newAmount);
    },
    onPanResponderRelease: () => {
      console.log('PanResponder release', { orderAmountRange });
    },
  });

  useEffect(() => {
    const fetchOrders = async () => {
      console.log('fetchOrders started', { selectedOrderTab });
      setLoading(true);
      try {
        let response;
        if (selectedOrderTab === 'all') {
          console.log('Calling getAllOrders');
          response = await apiConnector.getAllOrders();
        } else {
          console.log('Calling searchOrders with status', { status: selectedOrderTab });
          response = await apiConnector.searchOrders({ status: selectedOrderTab });
        }
        console.log('fetchOrders response', response);
        setOrders(response.data?.orders || []);
        setError(null);
        setLoading(false);
        console.log('fetchOrders completed', { loading: false, orders: response.data?.orders?.length || 0 });
      } catch (err) {
        console.log('fetchOrders error', err);
        setError(err.message);
        Alert.alert('Error', err.message);
        setLoading(false);
        console.log('fetchOrders completed', { loading: false, orders: orders.length });
      }
    };
    fetchOrders();
  }, [selectedOrderTab]);

  const applyFilters = async () => {
    console.log('applyFilters started', {
      selectedOrderTab,
      selectedPaymentMethod,
      orderAmountRange,
      vehicleNumber,
    });
    setLoading(true);
    try {
      const params = {
        status: selectedOrderTab === 'all' ? undefined : selectedOrderTab,
        paymentMethod: selectedPaymentMethod === 'All' ? undefined : selectedPaymentMethod.toLowerCase(),
        minTotal: minAmount,
        maxTotal: orderAmountRange,
        vehicleNumber: vehicleNumber || undefined,
      };
      console.log('Calling searchOrders with params', params);
      const response = await apiConnector.searchOrders(params);
      console.log('applyFilters response', response);
      setOrders(response.data?.orders || []);
      setError(null);
      setFilterModalVisible(false);
      console.log('applyFilters completed', { orders: response.data?.orders?.length || 0 });
    } catch (err) {
      console.log('applyFilters error', err);
      setError(err.message);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
      console.log('applyFilters finally', { loading: false });
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    console.log('updateOrderStatus started', { orderId, status });
    try {
      const response = await apiConnector.updateOrderStatus(orderId, { status });
      console.log('updateOrderStatus response', response);
      Alert.alert('Success', 'Order status updated successfully');
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, status: response.data.order.status } : order
      );
      setOrders(updatedOrders);
      setSelectedOrder({ ...selectedOrder, status: response.data.order.status });
      console.log('updateOrderStatus updated states', {
        updatedOrders: updatedOrders.length,
        selectedOrderStatus: response.data.order.status,
      });
    } catch (err) {
      console.log('updateOrderStatus error', err);
      Alert.alert('Error', err.message);
    }
  };

  const orderTabs = [
    { key: 'all', label: `All (${orders.length})`, count: orders.length },
    { key: 'pending', label: `New (${orders.filter((o) => o.status === 'pending').length})`, count: orders.filter((o) => o.status === 'pending').length },
    { key: 'processing', label: `Processing (${orders.filter((o) => o.status === 'processing').length})`, count: orders.filter((o) => o.status === 'processing').length },
    { key: 'delivered', label: `Delivered (${orders.filter((o) => o.status === 'delivered').length})`, count: orders.filter((o) => o.status === 'delivered').length },
  ];
  console.log('orderTabs computed', orderTabs);

  const getStatusStyles = (status) => {
    const styles = (() => {
      switch (status?.toLowerCase()) {
        case 'delivered':
          return { color: '#4CAF50', backgroundColor: '#E8F5E8' };
        case 'processing':
        case 'dispatched':
        case 'confirmed':
          return { color: '#FF9800', backgroundColor: '#FFF3E0' };
        case 'pending':
        case 'new':
          return { color: '#2196F3', backgroundColor: '#E3F2FD' };
        case 'cancelled':
        case 'rejected':
          return { color: '#F44336', backgroundColor: '#FFEBEE' };
        default:
          return { color: '#666', backgroundColor: '#F5F5F5' };
      }
    })();
    console.log('getStatusStyles', { status, styles });
    return styles;
  };

  console.log('OrderScreen render', {
    isOpen,
    search,
    selectedOrderTab,
    filterModalVisible,
    orderDetailsModalVisible,
    selectedOrder: selectedOrder?._id,
    selectedPaymentMethod,
    orderAmountRange,
    vehicleNumber,
    orders: orders.length,
    loading,
    error,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Mandi Bhai</Text>
          <Text style={styles.vendor}>vendor</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.bellWrap}>
            <Text style={styles.bellIcon}>🔔</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{orders.length}</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.closedText}>{isOpen ? 'OPEN' : 'CLOSED'}</Text>
          <Switch
            value={isOpen}
            onValueChange={(value) => {
              console.log('Switch toggled', { isOpen: value });
              setIsOpen(value);
            }}
            trackColor={{ true: '#4CD964', false: '#E0E0E0' }}
            thumbColor={'#fff'}
            style={styles.toggleSwitch}
          />
        </View>
      </View>

      <View style={styles.ordersSection}>
        <Text style={styles.ordersTitle}>Orders</Text>
        <Text style={styles.ordersSubtitle}>Manage your customer orders</Text>
      </View>

      <View style={styles.searchFilterRow}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search orders..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={(text) => {
              console.log('Search input changed', { search: text });
              setSearch(text);
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            console.log('Filter button pressed', { filterModalVisible: true });
            setFilterModalVisible(true);
          }}
        >
          <Text style={styles.filterIcon}>▼</Text>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.orderTabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.orderTabs}>
            {orderTabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.orderTab,
                  selectedOrderTab === tab.key && styles.orderTabActive,
                ]}
                onPress={() => {
                  console.log('Order tab pressed', { tab: tab.key });
                  setSelectedOrderTab(tab.key);
                }}
              >
                <Text
                  style={[
                    styles.orderTabText,
                    selectedOrderTab === tab.key && styles.orderTabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3F51B5" />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders found</Text>
        </View>
      ) : (
        <ScrollView style={styles.ordersScrollView} showsVerticalScrollIndicator={false}>
          {orders
            .filter((order) => {
              const matches = search
                ? order._id.toLowerCase().includes(search.toLowerCase()) ||
                  order.retailerId?.name?.toLowerCase().includes(search.toLowerCase()) ||
                  order.retailerId?.phoneNumber?.toLowerCase().includes(search.toLowerCase())
                : true;
              console.log('Filtering order', { orderId: order._id, search, matches });
              return matches;
            })
            .map((order) => (
              <TouchableOpacity
                key={order._id}
                style={styles.orderCard}
                onPress={() => {
                  console.log('Order card pressed', { orderId: order._id });
                  setSelectedOrder(order);
                  setOrderDetailsModalVisible(true);
                }}
              >
                <View style={styles.orderHeader}>
                  <View style={styles.orderHeaderLeft}>
                    <Image
                      source={{ uri: order.retailerId?.avatar || 'https://via.placeholder.com/48' }}
                      style={styles.customerAvatar}
                    />
                    <View style={styles.orderHeaderInfo}>
                      <Text style={styles.orderId}>{order._id}</Text>
                      <Text style={styles.customerName}>{order.retailerId?.name || 'Unknown'}</Text>
                      <Text style={styles.customerPhone}>{order.retailerId?.phoneNumber || 'N/A'}</Text>
                      <Text style={styles.orderDate}>
                        {new Date(order.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.orderHeaderRight}>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusStyles(order.status).backgroundColor }]}>
                      <Text style={[styles.statusText, { color: getStatusStyles(order.status).color }]}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Text>
                    </View>
                    <View style={styles.pincodeContainer}>
                      <Text style={styles.pincode}>{order.vehicleNumber || 'N/A'}</Text>
                    </View>
                    <View style={styles.otpContainer}>
                      <Text style={styles.otpLabel}>OTP: </Text>
                      <Text style={styles.otpValue}>{order.otp || 'N/A'}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.orderFooter}>
                  <View style={styles.orderFooterLeft}>
                    <Text style={styles.itemsCount}>{order.products?.length || 0} items</Text>
                    <Text style={styles.paymentLabel}>Payment</Text>
                  </View>
                  <View style={styles.orderFooterRight}>
                    <Text style={styles.orderAmount}>₹{order.orderTotal}</Text>
                    <Text
                      style={[
                        styles.paymentStatus,
                        { color: order.paymentMethod === 'cod' ? '#FF9800' : '#4CAF50' },
                      ]}
                    >
                      {order.paymentMethod === 'cod' ? 'Cash on delivery' : 'Paid online'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      )}

      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          console.log('Filter modal closed', { filterModalVisible: false });
          setFilterModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={styles.filterModalOverlay}
          activeOpacity={1}
          onPress={() => {
            console.log('Filter modal overlay pressed', { filterModalVisible: false });
            setFilterModalVisible(false);
          }}
        >
          <TouchableOpacity
            style={styles.filterModalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalTitle}>Filter Orders</Text>
            </View>
            <ScrollView style={styles.filterModalScrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Payment Method</Text>
                <View style={styles.paymentMethodOptions}>
                  {['All', 'COD', 'Online', 'UPI', 'Card'].map((method) => (
                    <TouchableOpacity
                      key={method}
                      style={[
                        styles.paymentMethodOption,
                        selectedPaymentMethod === method && styles.paymentMethodOptionActive,
                      ]}
                      onPress={() => {
                        console.log('Payment method selected', { method });
                        setSelectedPaymentMethod(method);
                      }}
                    >
                      <Text
                        style={[
                          styles.paymentMethodOptionText,
                          selectedPaymentMethod === method && styles.paymentMethodOptionTextActive,
                        ]}
                      >
                        {method}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
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
                      console.log('Slider track pressed', { locationX, newAmount });
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
                <Text style={styles.ordersFoundText}>
                  {orders.filter((o) => o.orderTotal <= orderAmountRange).length} orders found
                </Text>
              </View>
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Vehicle Number</Text>
                <TextInput
                  style={styles.vehicleNumberInput}
                  placeholder="Enter vehicle number"
                  placeholderTextColor="#999"
                  value={vehicleNumber}
                  onChangeText={(text) => {
                    console.log('Vehicle number input changed', { vehicleNumber: text });
                    setVehicleNumber(text);
                  }}
                />
              </View>
            </ScrollView>
            <View style={styles.filterModalFooter}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  console.log('Reset filters pressed', {
                    selectedPaymentMethod: 'All',
                    orderAmountRange: minAmount,
                    vehicleNumber: '',
                  });
                  setSelectedPaymentMethod('All');
                  setOrderAmountRange(minAmount);
                  setVehicleNumber('');
                }}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={orderDetailsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          console.log('Order details modal closed', { orderDetailsModalVisible: false });
          setOrderDetailsModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={styles.orderDetailsModalOverlay}
          activeOpacity={1}
          onPress={() => {
            console.log('Order details modal overlay pressed', { orderDetailsModalVisible: false });
            setOrderDetailsModalVisible(false);
          }}
        >
          <TouchableOpacity
            style={styles.orderDetailsModalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {selectedOrder && (
              <>
                <View style={styles.orderDetailsHeader}>
                  <Text style={styles.orderDetailsTitle}>Order #{selectedOrder._id}</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      console.log('Order details close button pressed', { orderDetailsModalVisible: false });
                      setOrderDetailsModalVisible(false);
                    }}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.orderDetailsScrollView} showsVerticalScrollIndicator={false}>
                  <View style={styles.customerInfoSection}>
                    <View style={styles.customerInfoLeft}>
                      <Image
                        source={{ uri: selectedOrder.retailerId?.avatar || 'https://via.placeholder.com/48' }}
                        style={styles.customerInfoAvatar}
                      />
                      <View style={styles.customerInfoDetails}>
                        <Text style={styles.customerInfoName}>{selectedOrder.retailerId?.name || 'Unknown'}</Text>
                        <Text style={styles.customerInfoPhone}>{selectedOrder.retailerId?.phoneNumber || 'N/A'}</Text>
                      </View>
                    </View>
                    <View style={styles.customerInfoRight}>
                      <Text style={styles.vehicleType}>{selectedOrder.vehicleNumber || 'N/A'}</Text>
                      <Text style={styles.vehicleSubtype}>
                        {selectedOrder.vehicleNumber ? 'Delivery Vehicle' : 'Not Assigned'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.orderItemsSection}>
                    <Text style={styles.orderItemsTitle}>Order Items</Text>
                    {selectedOrder.products?.map((item, index) => {
                      console.log('Rendering order item', { index, item });
                      return (
                        <View key={index} style={styles.orderItemCard}>
                          <Image
                            source={{ uri: item.productId?.productImage || 'https://via.placeholder.com/40' }}
                            style={styles.orderItemImage}
                          />
                          <View style={styles.orderItemDetails}>
                            <Text style={styles.orderItemName}>{item.productId?.productName || 'Unknown'}</Text>
                            <Text style={styles.orderItemQuantity}>
                              {item.quantity} • ₹{(item.total / item.quantity).toFixed(2)}/unit
                            </Text>
                          </View>
                          <Text style={styles.orderItemTotal}>₹{item.total}</Text>
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.orderSummarySection}>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Subtotal</Text>
                      <Text style={styles.summaryValue}>₹{selectedOrder.orderTotal}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Delivery Fee</Text>
                      <Text style={styles.summaryValue}>₹0</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                      <Text style={styles.totalLabel}>Total</Text>
                      <Text style={styles.totalValue}>₹{selectedOrder.orderTotal}</Text>
                    </View>
                  </View>
                  <View style={styles.deliveryDetailsSection}>
                    <Text style={styles.sectionTitle}>Delivery Details</Text>
                    <View style={styles.deliveryCard}>
                      <View style={styles.deliveryCardHeader}>
                        <Text style={styles.deliveryTruck}>🚚</Text>
                        <Text style={styles.deliveryPincode}>{selectedOrder.vehicleNumber || 'N/A'}</Text>
                        <View style={[styles.deliveryStatusBadge, { backgroundColor: getStatusStyles(selectedOrder.status).color }]}>
                          <Text style={styles.deliveryStatusText}>
                            {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.deliveryCardFooter}>
                        <Text style={styles.deliveryPhone}>{selectedOrder.retailerId?.phoneNumber || 'N/A'}</Text>
                        <View style={styles.deliveryActions}>
                          <TouchableOpacity
                            style={styles.callButton}
                            onPress={() => console.log('Call button pressed', { phone: selectedOrder.retailerId?.phoneNumber })}
                          >
                            <Text style={styles.callIcon}>📞</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.messageButton}
                            onPress={() => console.log('Message button pressed', { phone: selectedOrder.retailerId?.phoneNumber })}
                          >
                            <Text style={styles.messageIcon}>💬</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.deliveryAddress}>{selectedOrder.deliveryAddress || 'N/A'}</Text>
                  </View>
                  <View style={styles.paymentInfoSection}>
                    <Text style={styles.sectionTitle}>Payment Information</Text>
                    <View style={styles.paymentCard}>
                      <View style={styles.paymentCardContent}>
                        <Text style={styles.paymentIcon}>💳</Text>
                        <Text style={styles.paymentMethod}>
                          {selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.modalPaymentStatus,
                          { color: selectedOrder.paymentStatus === 'paid' ? '#4CAF50' : '#FF9800' },
                        ]}
                      >
                        {selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.orderActionsSection}>
                    <Text style={styles.sectionTitle}>Update Order Status</Text>
                    <View style={styles.orderActions}>
                      {['confirmed', 'dispatched', 'delivered', 'rejected', 'cancelled'].map((status) => (
                        <TouchableOpacity
                          key={status}
                          style={[
                            styles.actionButton,
                            selectedOrder.status === status && styles.actionButtonActive,
                          ]}
                          onPress={() => {
                            console.log('Status button pressed', { orderId: selectedOrder._id, status });
                            updateOrderStatus(selectedOrder._id, status);
                          }}
                          disabled={selectedOrder.status === status}
                        >
                          <Text
                            style={[
                              styles.actionButtonText,
                              selectedOrder.status === status && styles.actionButtonTextActive,
                            ]}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </ScrollView>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <BottomTab
        activeTab={activeTab}
        onTabPress={(tab) => {
          console.log('Bottom tab pressed', { tab });
          setActiveTab(tab);
          if (onNavigate) {
            onNavigate(tab);
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
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
  paymentMethodOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  paymentMethodOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  paymentMethodOptionActive: {
    backgroundColor: '#3F51B5',
    borderColor: '#3F51B5',
  },
  paymentMethodOptionText: {
    fontSize: 14,
    color: '#495057',
  },
  paymentMethodOptionTextActive: {
    color: '#fff',
    fontWeight: 'bold',
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
  deliveryAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
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
  },
  orderActionsSection: {
    paddingVertical: 20,
  },
  orderActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  actionButtonActive: {
    backgroundColor: '#3F51B5',
    borderColor: '#3F51B5',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#495057',
  },
  actionButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OrderScreen;