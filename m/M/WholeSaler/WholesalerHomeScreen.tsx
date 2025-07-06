import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import BottomTab from './BottomTab';
import type { AppScreen } from '../App';

type Props = {
  onNavigate: (screen: AppScreen) => void;
};

const summaryCards = [
  { key: 'all', label: 'All Products', value: 4, desc: 'Active Products', color: '#3973F4', icon: '🛒' },
  { key: 'out', label: 'Out of Stock', value: 4, desc: 'Need Restock', color: '#FF7B1A', icon: '⚠️' },
  { key: 'high', label: 'High Price', value: 1, desc: 'Above Market', color: '#A259F7', icon: '📈' },
  { key: 'exp', label: 'Expiring Price', value: 0, desc: 'Need Update', color: '#F7B500', icon: '⏰' },
  { key: 'expired', label: 'Expired Price', value: 0, desc: 'Not Listed', color: '#F75C4E', icon: '📅' },
  { key: 'kyc', label: 'KYC Status', value: 'Pending', desc: 'Verification', color: '#1CC8EE', icon: '🪪' },
];

const products = [
  {
    name: 'Fresh Tomatoes',
    stock: 250,
    price: 45,
    img: require('../assets/to.png'),
    tags: ['High Price', 'Expiring Price'],
  },
  {
    name: 'Organic Onions',
    stock: 180,
    price: 32,
    img: require('../assets/oni.png'),
    tags: ['High Price', 'Expiring Price'],
  },
  {
    name: 'Green Capsicum',
    stock: 120,
    price: 65,
    img: require('../assets/cap.png'),
    tags: ['High Price', 'Expiring Price'],
  },
  {
    name: 'Fresh Carrots',
    stock: 200,
    price: 38,
    img: require('../assets/cap.png'), // Placeholder, replace with carrot image if available
    tags: [],
  },
];

const outOfStockProducts = [
  {
    name: 'Fresh Tomatoes',
    currentStock: 0,
    minRequired: 10,
    img: require('../assets/to.png'),
    status: 'out',
  },
  {
    name: 'Green Capsicum',
    currentStock: 5,
    minRequired: 10,
    img: require('../assets/cap.png'),
    status: 'low',
  },
  {
    name: 'Fresh Carrots',
    currentStock: 3,
    minRequired: 10,
    img: require('../assets/cap.png'),
    status: 'low',
  },
  {
    name: 'Red Onions',
    currentStock: 8,
    minRequired: 10,
    img: require('../assets/oni.png'),
    status: 'low',
  },
];

const highPriceProducts = [
  {
    name: 'Green Capsicum',
    currentPrice: 65,
    marketAverage: 45,
    img: require('../assets/cap.png'),
    percentageHigher: 44.4,
  },
];

const WholesalerHomeScreen: React.FC<Props> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('catalogue');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [outOfStockModalVisible, setOutOfStockModalVisible] = useState(false);
  const [highPriceModalVisible, setHighPriceModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [gstCategory, setGstCategory] = useState('Exempted');
  const [quantityPricing, setQuantityPricing] = useState('Applicable');
  const [expiringPriceModalVisible, setExpiringPriceModalVisible] = useState(false);
  const [expiredPriceModalVisible, setExpiredPriceModalVisible] = useState(false);
  const [addProductDropdownVisible, setAddProductDropdownVisible] = useState(false);
  const [searchProductsModalVisible, setSearchProductsModalVisible] = useState(false);
  const [addNewProductModalVisible, setAddNewProductModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Dropdown Overlay */}
      {addProductDropdownVisible && (
        <Pressable 
          style={styles.dropdownOverlay}
          onPress={() => setAddProductDropdownVisible(false)}
        />
      )}
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.headerTitle}>Mandi Bhai</Text>
          <Text style={styles.vendor}>vendor</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.bellWrap}
            onPress={() => onNavigate('NotificationScreen')}
          >
            <Text style={styles.bellIcon}>🔔</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
          </TouchableOpacity>
          <Text style={styles.openText}>OPEN</Text>
          <Switch 
            value={isOpen} 
            onValueChange={setIsOpen} 
            trackColor={{ true: '#4CD964', false: '#E0E0E0' }} 
            thumbColor={'#fff'}
            style={styles.toggleSwitch}
          />
        </View>
      </View>
      {/* Header separator line */}
      <View style={styles.headerSeparator} />
      
      {/* Add Product Button */}
      <View style={styles.addProductRow}>
        <Text style={styles.catalogueTitle}>Catalogue</Text>
        <View style={styles.addProductContainer}>
          <TouchableOpacity 
            style={styles.addProductBtn}
            onPress={() => {
              console.log('Add Product button pressed');
              setAddProductDropdownVisible(!addProductDropdownVisible);
            }}
          >
            <Text style={styles.addProductBtnText}>+ Add Product</Text>
          </TouchableOpacity>
         
        </View>
      </View>

      {/* Dropdown positioned absolutely */}
      {addProductDropdownVisible && (
        <View style={styles.addProductDropdownContainer}>
          <TouchableOpacity 
            style={styles.dropdownOption}
            onPress={() => {
              console.log('Search Products pressed');
              setAddProductDropdownVisible(false);
              setSearchProductsModalVisible(true);
            }}
          >
            <Text style={styles.dropdownOptionIcon}>🔍</Text>
            <Text style={styles.dropdownOptionText}>Search Products</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.dropdownOption}
            onPress={() => {
              console.log('Create New pressed');
              setAddProductDropdownVisible(false);
              setAddNewProductModalVisible(true);
            }}
          >
            <Text style={styles.dropdownOptionIcon}>+</Text>
            <Text style={styles.dropdownOptionText}>Create New</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.cardsGrid}>
          {summaryCards.map((card, i) => (
            <TouchableOpacity 
              key={card.key} 
              style={[styles.card, { backgroundColor: card.color }]}
              onPress={() => {
                if (card.key === 'out') {
                  setOutOfStockModalVisible(true);
                } else if (card.key === 'high') {
                  setHighPriceModalVisible(true);
                              } else if (card.key === 'exp') {
                setExpiringPriceModalVisible(true);
              } else if (card.key === 'expired') {
                setExpiredPriceModalVisible(true);
              } else if (card.key === 'kyc') {
                onNavigate('KycScreen1');
              }
              }}
            > 
              <View style={styles.cardIconContainer}>
                <Text style={styles.cardIcon}>{card.icon}</Text>
              </View>
              <View style={styles.cardTopRight}>
                <Text style={styles.cardValue}>{card.value}</Text>
                <Text style={styles.cardDesc}>{card.desc}</Text>
              </View>
              <Text style={styles.cardLabel}>{card.label}</Text>
              <Text style={styles.cardArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Search Bar */}
        <View style={styles.searchBarWrap}>
          <View style={styles.searchBarContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchBar}
              placeholder="Search products..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>
        {/* Product List */}
        <View style={styles.productList}>
          {products.map((prod, idx) => (
            <View key={idx} style={styles.productCard}>
              <Image source={prod.img} style={styles.productImg} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{prod.name}</Text>
                <Text style={styles.productStock}>Stock: {prod.stock} kg</Text>
                <Text style={styles.productPrice}>₹{prod.price}/kg</Text>
                <View style={{ flexDirection: 'row', marginTop: 4 }}>
                  {prod.tags.map((tag, i) => (
                    <Text key={i} style={[styles.tag, tag === 'High Price' ? styles.tagHigh : styles.tagExp]}>{tag}</Text>
                  ))}
                </View>
              </View>
                          <TouchableOpacity 
              style={styles.editBtn}
              onPress={() => {
                setSelectedProduct(prod);
                setEditModalVisible(true);
              }}
            >
              <Text style={styles.editIcon}>✎</Text>
            </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Edit Product Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Edit Product</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
              {/* Product Image */}
              <View style={styles.productImageContainer}>
                <View style={styles.imagePlaceholder}>
                  {selectedProduct && (
                    <Image source={selectedProduct.img} style={styles.productImageEdit} />
                  )}
                </View>
              </View>

              {/* Product Name */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={styles.fieldLabel}>Product Name</Text>
                  <Text style={styles.productId}>ID: 1</Text>
                </View>
                <TextInput
                  style={styles.inputField}
                  value={selectedProduct?.name || ''}
                  placeholder="Enter product name"
                />
              </View>

              {/* Price */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={styles.fieldLabel}>Price-(Without GST)</Text>
                  <Text style={styles.fieldSubLabel}>(₹/kg or qty or piece)</Text>
                </View>
                <TextInput
                  style={styles.inputField}
                  value={selectedProduct?.price?.toString() || ''}
                  placeholder="Enter price"
                  keyboardType="numeric"
                />
                <Text style={styles.marketRate}>Current market rate: ₹45/kg</Text>
                <Text style={styles.priceStatus}>📉 Your price is lowest</Text>
              </View>

              {/* Stock */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Stock Available</Text>
                <TextInput
                  style={styles.inputField}
                  value={selectedProduct?.stock?.toString() || ''}
                  placeholder="Enter stock"
                  keyboardType="numeric"
                />
                <Text style={styles.fieldHelper}>Enter quantity in kg</Text>
              </View>

              {/* GST Category */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={styles.fieldLabel}>GST Category</Text>
                  <View style={styles.toggleContainer}>
                    <TouchableOpacity
                      style={[styles.toggleBtn, gstCategory === 'Exempted' && styles.toggleBtnActive]}
                      onPress={() => setGstCategory('Exempted')}
                    >
                      <Text style={[styles.toggleText, gstCategory === 'Exempted' && styles.toggleTextActive]}>Exempted</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.toggleBtn, gstCategory === 'Applicable' && styles.toggleBtnActiveRed]}
                      onPress={() => setGstCategory('Applicable')}
                    >
                      <Text style={[styles.toggleText, gstCategory === 'Applicable' && styles.toggleTextActiveRed]}>Applicable</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TextInput
                  style={styles.inputField}
                  value="5% GST"
                  placeholder="Enter GST"
                />
              </View>

              {/* Price After GST */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Price After GST</Text>
                <Text style={styles.priceAfterGst}>₹47.25/kg</Text>
                <Text style={styles.gstIncluded}>Including 5% GST</Text>
              </View>

              {/* Quantity Pricing */}
              <View style={styles.fieldContainer}>
                <View style={styles.fieldHeader}>
                  <Text style={styles.fieldLabel}>Quantity Pricing</Text>
                  <View style={styles.toggleContainer}>
                    <TouchableOpacity
                      style={[styles.toggleBtn, quantityPricing === 'Applicable' && styles.toggleBtnActive]}
                      onPress={() => setQuantityPricing('Applicable')}
                    >
                      <Text style={[styles.toggleText, quantityPricing === 'Applicable' && styles.toggleTextActive]}>Applicable</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.toggleBtn, quantityPricing === 'Not Applicable' && styles.toggleBtnGray]}
                      onPress={() => setQuantityPricing('Not Applicable')}
                    >
                      <Text style={[styles.toggleText, quantityPricing === 'Not Applicable' && styles.toggleTextGray]}>Not Applicable</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Quantity Table */}
                <View style={styles.quantityTable}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Qty</Text>
                    <Text style={styles.tableHeaderText}>Price</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>1 kg/pc</Text>
                    <Text style={styles.tableCell}>₹47.25</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>5 kg/pc</Text>
                    <Text style={styles.tableCell}>₹45.25</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>10 kg/pc</Text>
                    <Text style={styles.tableCell}>₹42.25</Text>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.cancelBtn}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.saveBtn}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.saveText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Out of Stock Modal */}
      <Modal
        visible={outOfStockModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setOutOfStockModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.outOfStockModalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setOutOfStockModalVisible(false)}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Out of Stock Products</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.outOfStockScrollView} showsVerticalScrollIndicator={false}>
              {outOfStockProducts.map((product, index) => (
                <View key={index} style={styles.outOfStockCard}>
                  <Text style={styles.outOfStockProductName}>{product.name}</Text>
                  <View style={styles.cardContent}>
                    <Image source={product.img} style={styles.outOfStockProductImg} />
                    <View style={styles.outOfStockProductInfo}>
                      <Text style={styles.outOfStockCurrentStock}>
                        Current Stock: <Text style={product.status === 'out' ? styles.outOfStockValue : styles.lowStockValue}>
                          {product.currentStock} kg
                        </Text>
                      </Text>
                      <Text style={styles.outOfStockMinRequired}>
                        Min. Required: <Text style={styles.minRequiredValue}>{product.minRequired} kg</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cardBottom}>
                    <View style={styles.stockStatusContainer}>
                      <Text style={styles.stockStatusIcon}>⚠️</Text>
                      <Text style={product.status === 'out' ? styles.outOfStockStatus : styles.lowStockStatus}>
                        {product.status === 'out' ? 'Out of stock' : 'Low stock'}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.updateStockBtn}>
                      <Text style={styles.updateStockBtnText}>Update Stock</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              
              {/* Warning Message */}
              <View style={styles.warningContainer}>
                <Text style={styles.warningIcon}>⚠️</Text>
                <Text style={styles.warningText}>Low stock may affect your marketplace visibility</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* High Price Modal */}
      <Modal
        visible={highPriceModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setHighPriceModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.highPriceModalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setHighPriceModalVisible(false)}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>High Price Products</Text>
              <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.highPriceScrollView} showsVerticalScrollIndicator={false}>
              {highPriceProducts.map((product, index) => (
                <View key={index} style={styles.highPriceCard}>
                  <Text style={styles.highPriceProductName}>{product.name}</Text>
                  <View style={styles.highPriceCardContent}>
                    <Image source={product.img} style={styles.highPriceProductImg} />
                    <View style={styles.highPriceProductInfo}>
                      <Text style={styles.highPriceCurrentPrice}>
                        Current Price: <Text style={styles.highPriceValue}>₹{product.currentPrice}/kg</Text>
                      </Text>
                      <Text style={styles.highPriceMarketAvg}>
                        Market Average: <Text style={styles.marketAvgValue}>₹{product.marketAverage}/kg</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.highPriceCardBottom}>
                    <View style={styles.priceComparisonContainer}>
                      <Text style={styles.priceComparisonIcon}>📈</Text>
                      <Text style={styles.priceComparisonText}>{product.percentageHigher}% higher</Text>
                    </View>
                    <TouchableOpacity style={styles.editPriceBtn}>
                      <Text style={styles.editPriceBtnText}>Edit Price</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              
              {/* Warning Message */}
              <View style={styles.highPriceWarningContainer}>
                <Text style={styles.highPriceWarningIcon}>⚠️</Text>
                <Text style={styles.highPriceWarningText}>Other suppliers have a better price for the product so your product will not be listed</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Expiring Price Modal */}
      <Modal
        visible={expiringPriceModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setExpiringPriceModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setExpiringPriceModalVisible(false)}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Expiring Price Products</Text>
              <View style={{ width: 24 }} />
            </View>
                  <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
        {products.filter(prod => prod.tags.includes('Expiring Price')).map((prod, idx) => (
          <View key={idx} style={styles.expiringPriceCard}>
            <View style={styles.expiringPriceHeader}>
              <Image source={prod.img} style={styles.expiringPriceImg} />
              <View style={styles.expiringPriceInfo}>
                <Text style={styles.expiringPriceProductName}>{prod.name}</Text>
                <Text style={styles.expiringPriceCurrentPrice}>
                  Current Price: <Text style={styles.expiringPricePriceValue}>₹{prod.price}/kg</Text>
                </Text>
                <Text style={styles.expiringPriceLastUpdated}>
                  Last Updated: <Text style={styles.expiringPriceLastUpdatedValue}>3 days ago</Text>
                </Text>
              </View>
            </View>
            <View style={styles.expiringPriceBottom}>
              <View style={styles.expiringPriceStatusContainer}>
                <Text style={styles.expiringPriceStatusIcon}>⚠️</Text>
                <Text style={styles.expiringPriceStatusText}>Expires in 4 days</Text>
              </View>
              <TouchableOpacity 
                style={styles.updatePriceBtn}
                onPress={() => {
                  setSelectedProduct(prod);
                  setEditModalVisible(true);
                  setExpiringPriceModalVisible(false);
                }}
              >
                <Text style={styles.updatePriceBtnText}>Update Price</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={styles.expiringPriceWarningContainer}>
          <Text style={styles.expiringPriceWarningIcon}>ℹ️</Text>
          <Text style={styles.expiringPriceWarningText}>
            Product prices expire within 3-7 days of last edit.{'\n'}Once expired, products will not be listed.
          </Text>
        </View>
      </ScrollView>
          </View>
        </View>
              </Modal>

      {/* Expired Price Modal */}
      <Modal
        visible={expiredPriceModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setExpiredPriceModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setExpiredPriceModalVisible(false)}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Expired Price Products</Text>
              <View style={{ width: 24 }} />
            </View>
            <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
              {products.map((prod, idx) => (
                <View key={idx} style={styles.expiredPriceCard}>
                  <View style={styles.expiredPriceHeader}>
                    <Image source={prod.img} style={styles.expiredPriceImg} />
                    <View style={styles.expiredPriceInfo}>
                      <Text style={styles.expiredPriceProductName}>{prod.name}</Text>
                      <Text style={styles.expiredPriceLastPrice}>
                        Last Price: <Text style={styles.expiredPricePriceValue}>₹{prod.price}/kg</Text>
                      </Text>
                      <Text style={styles.expiredPriceLastUpdated}>
                        Last Updated: <Text style={styles.expiredPriceLastUpdatedValue}>8 days ago</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.expiredPriceBottom}>
                    <View style={styles.expiredPriceStatusContainer}>
                      <Text style={styles.expiredPriceStatusIcon}>🚫</Text>
                      <Text style={styles.expiredPriceStatusText}>Price expired</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.updatePriceBtn}
                      onPress={() => {
                        setSelectedProduct(prod);
                        setEditModalVisible(true);
                        setExpiredPriceModalVisible(false);
                      }}
                    >
                      <Text style={styles.updatePriceBtnText}>Update Price</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              <View style={styles.expiredPriceWarningContainer}>
                <Text style={styles.expiredPriceWarningIcon}>🚫</Text>
                <Text style={styles.expiredPriceWarningText}>
                  Products with expired prices have been removed from the marketplace. Please update prices within 7 days to maintain listing status.
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
              </Modal>

      {/* Search Products Modal */}
      <Modal
        visible={searchProductsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSearchProductsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.searchProductsModalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSearchProductsModalVisible(false)}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Search Products</Text>
              <View style={{ width: 24 }} />
            </View>
            
            {/* Search Input */}
            <View style={styles.searchProductsContainer}>
              <View style={styles.searchProductsInputContainer}>
                <Text style={styles.searchProductsIcon}>🔍</Text>
                <TextInput
                  style={styles.searchProductsInput}
                  placeholder="Search by product name..."
                  placeholderTextColor="#999"
                />
              </View>
              
              {/* Empty State */}
              <View style={styles.searchProductsEmptyState}>
                <View style={styles.searchProductsEmptyIcon}>
                  <Text style={styles.searchProductsEmptyIconText}>🔍</Text>
                </View>
                <Text style={styles.searchProductsEmptyText}>Search for existing products</Text>
              </View>
            </View>
          </View>
        </View>
              </Modal>

      {/* Add New Product Modal */}
      <Modal
        visible={addNewProductModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddNewProductModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addNewProductModalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setAddNewProductModalVisible(false)}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add New Product</Text>
              <View style={{ width: 24 }} />
            </View>
            
            <ScrollView style={styles.addNewProductScrollView} showsVerticalScrollIndicator={false}>
              {/* Upload Image */}
              <View style={styles.uploadImageContainer}>
                <View style={styles.uploadImageBox}>
                  <Text style={styles.uploadImageIcon}>📷</Text>
                  <Text style={styles.uploadImageText}>Upload Image</Text>
                </View>
              </View>

              {/* Product Name */}
              <View style={styles.addNewFieldContainer}>
                <Text style={styles.addNewFieldLabel}>Product Name</Text>
                <TextInput
                  style={styles.addNewInputField}
                  placeholder="Enter product name"
                  placeholderTextColor="#999"
                />
              </View>

              {/* Price */}
              <View style={styles.addNewFieldContainer}>
                <View style={styles.addNewFieldHeader}>
                  <Text style={styles.addNewFieldLabel}>Price-(Without GST)</Text>
                  <Text style={styles.addNewFieldSubLabel}>(₹/kg or qty or piece)</Text>
                </View>
                <TextInput
                  style={styles.addNewInputField}
                  placeholder="Enter price"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              {/* Stock Available */}
              <View style={styles.addNewFieldContainer}>
                <Text style={styles.addNewFieldLabel}>Stock Available</Text>
                <TextInput
                  style={styles.addNewInputField}
                  placeholder="Enter available stock"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
                <Text style={styles.addNewFieldHelper}>Enter quantity in kg</Text>
              </View>

              {/* GST Category */}
              <View style={styles.addNewFieldContainer}>
                <Text style={styles.addNewFieldLabel}>GST Category</Text>
                <View style={styles.addNewToggleContainer}>
                  <TouchableOpacity style={[styles.addNewToggleBtn, styles.addNewToggleBtnActive]}>
                    <Text style={[styles.addNewToggleText, styles.addNewToggleTextActive]}>Exempted</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addNewToggleBtn}>
                    <Text style={styles.addNewToggleText}>Applicable</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.addNewInputField}
                  value="0% GST"
                  editable={false}
                />
              </View>

              {/* Price After GST */}
              <View style={styles.addNewFieldContainer}>
                <Text style={styles.addNewFieldLabel}>Price After GST</Text>
                <Text style={styles.addNewPriceAfterGst}>₹0.00/kg</Text>
                <Text style={styles.addNewGstIncluded}>Including 5% GST</Text>
              </View>

              {/* Quantity Pricing */}
              <View style={styles.addNewFieldContainer}>
                <Text style={styles.addNewFieldLabel}>Quantity Pricing</Text>
                <View style={styles.addNewToggleContainer}>
                  <TouchableOpacity style={[styles.addNewToggleBtn, styles.addNewToggleBtnActive]}>
                    <Text style={[styles.addNewToggleText, styles.addNewToggleTextActive]}>Applicable</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addNewToggleBtn}>
                    <Text style={styles.addNewToggleText}>Not Applicable</Text>
                  </TouchableOpacity>
                </View>

                {/* Quantity Table */}
                <View style={styles.addNewQuantityTable}>
                  <View style={styles.addNewTableHeader}>
                    <Text style={styles.addNewTableHeaderText}>Qty</Text>
                    <Text style={styles.addNewTableHeaderText}>Price</Text>
                  </View>
                  <View style={styles.addNewTableRow}>
                    <Text style={styles.addNewTableCell}>1 kg/pc</Text>
                    <Text style={styles.addNewTableCell}>₹0.00</Text>
                  </View>
                  <View style={styles.addNewTableRow}>
                    <Text style={styles.addNewTableCell}>5 kg/pc</Text>
                    <Text style={styles.addNewTableCell}>₹-2.00</Text>
                  </View>
                  <View style={styles.addNewTableRow}>
                    <Text style={styles.addNewTableCell}>10 kg/pc</Text>
                    <Text style={styles.addNewTableCell}>₹-5.00</Text>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.addNewActionButtons}>
                <TouchableOpacity 
                  style={styles.addNewCancelBtn}
                  onPress={() => setAddNewProductModalVisible(false)}
                >
                  <Text style={styles.addNewCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.addNewSaveBtn}
                  onPress={() => setAddNewProductModalVisible(false)}
                >
                  <Text style={styles.addNewSaveText}>Add Product</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Bottom Tab Navigator */}
      <BottomTab 
        activeTab={activeTab} 
        onTabPress={(tab) => {
          setActiveTab(tab);
          if (tab === 'orders') {
            onNavigate('OrderScreen');
          } else if (tab === 'accounting') {
            onNavigate('AccountScreen');
          } else if (tab === 'profile') {
            onNavigate('ProfileScreen');
          }
        }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFFFF7',
    paddingTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 8,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1DA15D' },
  vendor: { fontSize: 12, color: '#1DA15D', marginLeft: 20, marginTop: 8 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  bellWrap: { marginRight: 10, position: 'relative' },
  bellIcon: { fontSize: 18 },
  badge: { position: 'absolute', top: -6, right: -6, backgroundColor: '#F75C4E', borderRadius: 8, paddingHorizontal: 4, paddingVertical: 1 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  openText: { marginRight: 6, color: '#1DA15D', fontWeight: 'bold' },
  toggleSwitch: { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
  headerSeparator: { height: 1, backgroundColor: '#E0E0E0', marginHorizontal: 0 },
  scrollContent: { flex: 1 },
  addProductRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginTop: 8 },
  catalogueTitle: { fontSize: 24, fontWeight: 'bold', color: '#222' },
  addProductBtn: { borderWidth: 1, borderColor: '#3973F4', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 6 },
  addProductBtnText: { color: '#3973F4', fontWeight: 'bold', fontSize: 16 },
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 12, marginTop: 12 },
  card: { 
    width: '48%', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 12, 
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    position: 'relative',
    minHeight: 120,
  },
  cardIconContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: { fontSize: 24, color: '#fff' },
  cardTopRight: {
    position: 'absolute',
    top: 16,
    right: 16,
    alignItems: 'flex-end',
  },
  cardValue: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  cardDesc: { fontSize: 12, color: 'rgba(255, 255, 255, 0.8)', marginTop: 2 },
  cardLabel: { position: 'absolute', left: 16, bottom: 16, fontSize: 16, fontWeight: 'bold', color: '#fff' },
  cardArrow: { position: 'absolute', right: 16, bottom: 16, fontSize: 20, color: '#fff' },
  searchBarWrap: { paddingHorizontal: 18, marginTop: 8 },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4F7',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 18,
    color: '#999',
    marginRight: 10,
  },
  searchBar: { 
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  productList: { marginTop: 8, paddingHorizontal: 8, paddingBottom: 20 },
  productCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 14, padding: 12, marginBottom: 14, alignItems: 'center', elevation: 1 },
  productImg: { width: 60, height: 60, borderRadius: 10, marginRight: 12, backgroundColor: '#F2F4F7' },
  productInfo: { flex: 1 },
  productName: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  productStock: { fontSize: 13, color: '#888', marginTop: 2 },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#222', marginTop: 2 },
  tag: { fontSize: 10, fontWeight: '400', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8 },
  tagHigh: { backgroundColor: '#F3E8FF', color: '#A259F7' },
  tagExp: { backgroundColor: '#FEF3C7', color: '#D97706' },
  editBtn: { marginLeft: 10, backgroundColor: '#EFFFF7', borderRadius: 8, padding: 8 },
  editIcon: { fontSize: 18, color: '#3973F4' },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModalContent: {
    width: '90%',
    height: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalScrollView: {
    flex: 1,
    padding: 12,
  },
  productImageContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  productImageEdit: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  fieldSubLabel: {
    fontSize: 11,
    color: '#999',
  },
  productId: {
    fontSize: 14,
    color: '#666',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  marketRate: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  priceStatus: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 4,
  },
  fieldHelper: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
  },
  toggleBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F0F0F0',
  },
  toggleBtnActive: {
    backgroundColor: '#E8F5E8',
  },
  toggleBtnActiveRed: {
    backgroundColor: '#FFE8E8',
  },
  toggleBtnGray: {
    backgroundColor: '#F5F5F5',
  },
  toggleText: {
    fontSize: 8,
    color: '#666',
  },
  toggleTextActive: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  toggleTextActiveRed: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  toggleTextGray: {
    color: '#999',
  },
  priceAfterGst: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  gstIncluded: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  quantityTable: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginTop: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    paddingVertical: 8,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 28,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#3973F4',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  saveText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  
  // Out of Stock Modal Styles
  outOfStockModalContent: {
    width: '90%',
    height: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  outOfStockScrollView: {
    flex: 1,
    padding: 16,
  },
  outOfStockCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    marginTop: 12,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  outOfStockProductImg: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 20,
  },
  outOfStockProductInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  outOfStockProductName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  //  marginBottom: 1,
    textAlign: 'center',
  },
  outOfStockCurrentStock: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  outOfStockValue: {
    color: '#DC3545',
    fontWeight: 'bold',
    fontSize: 14,
  },
  lowStockValue: {
    color: '#FD7E14',
    fontWeight: 'bold',
    fontSize: 14,
  },
  outOfStockMinRequired: {
    fontSize: 14,
    color: '#666',
  },
  minRequiredValue: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  stockStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  stockStatusIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  outOfStockStatus: {
    fontSize: 10,
    color: '#DC3545',
    fontWeight: '600',
  },
  lowStockStatus: {
    fontSize: 10,
    color: '#FD7E14',
    fontWeight: '600',
  },
  updateStockBtn: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  updateStockBtnText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FFEAA7',
  },
  warningIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    flex: 1,
    marginBottom:16,
  },
  
  // High Price Modal Styles
  highPriceModalContent: {
    width: '90%',
    height: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  highPriceScrollView: {
    flex: 1,
    padding: 16,
  },
  highPriceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  highPriceCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  highPriceCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  highPriceProductImg: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  highPriceProductInfo: {
    flex: 1,
  },
  highPriceProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    //marginBottom: 16,
  },
  highPriceCurrentPrice: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  highPriceValue: {
    color: '#DC3545',
    fontWeight: 'bold',
    fontSize: 12,
  },
  highPriceMarketAvg: {
    fontSize: 12,
    color: '#666',
  },
  marketAvgValue: {
    color: '#28A745',
    fontWeight: 'bold',
    fontSize: 12,
  },
  priceComparisonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceComparisonIcon: {
    fontSize: 12,
    marginRight: 8,
  },
  priceComparisonText: {
    fontSize: 12,
    color: '#DC3545',
    fontWeight: '600',
  },
  editPriceBtn: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  editPriceBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  highPriceWarningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  highPriceWarningIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  highPriceWarningText: {
    fontSize: 14,
    color: '#C62828',
    flex: 1,
    lineHeight: 20,
  },
  
  // Expiring Price Modal Styles
  expiringPriceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  expiringPriceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  expiringPriceImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  expiringPriceInfo: {
    flex: 1,
  },
  expiringPriceProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  expiringPriceCurrentPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  expiringPricePriceValue: {
    color: '#D97706',
    fontWeight: 'bold',
  },
  expiringPriceLastUpdated: {
    fontSize: 14,
    color: '#666',
  },
  expiringPriceLastUpdatedValue: {
    fontWeight: '600',
    color: '#333',
  },
  expiringPriceBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiringPriceStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  expiringPriceStatusIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  expiringPriceStatusText: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '600',
  },
  updatePriceBtn: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  updatePriceBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  expiringPriceWarningContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginTop: 36,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  expiringPriceWarningIcon: {
    fontSize: 16,
    color: '#6C757D',
    marginRight: 8,
    marginTop: 2,
  },
  expiringPriceWarningText: {
    fontSize: 14,
    color: '#6C757D',
    flex: 1,
    lineHeight: 20,
  },
  
  // Expired Price Modal Styles
  expiredPriceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  expiredPriceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  expiredPriceImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  expiredPriceInfo: {
    flex: 1,
  },
  expiredPriceProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  expiredPriceLastPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  expiredPricePriceValue: {
    color: '#DC3545',
    fontWeight: 'bold',
  },
  expiredPriceLastUpdated: {
    fontSize: 14,
    color: '#666',
  },
  expiredPriceLastUpdatedValue: {
    fontWeight: '600',
    color: '#333',
  },
  expiredPriceBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiredPriceStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  expiredPriceStatusIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  expiredPriceStatusText: {
    fontSize: 12,
    color: '#DC3545',
    fontWeight: '600',
  },
  expiredPriceWarningContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 16,
    marginTop: 36,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  expiredPriceWarningIcon: {
    fontSize: 16,
    color: '#DC3545',
    marginRight: 8,
    marginTop: 2,
  },
  expiredPriceWarningText: {
    fontSize: 14,
    color: '#DC3545',
    flex: 1,
    lineHeight: 20,
  },
  
  // Add Product Dropdown Styles
  dropdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  addProductContainer: {
    position: 'relative',
  },
  addProductDropdownContainer: {
    position: 'absolute',
    top: 110,
    right: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 15,
    zIndex: 1001,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  dropdownOptionIcon: {
    fontSize: 18,
    color: '#3973F4',
    marginRight: 12,
    width: 20,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  
  // Search Products Modal Styles
  searchProductsModalContent: {
    width: '90%',
    height: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  searchProductsContainer: {
    flex: 1,
    padding: 16,
  },
  searchProductsInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchProductsIcon: {
    fontSize: 18,
    color: '#999',
    marginRight: 12,
  },
  searchProductsInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  searchProductsEmptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchProductsEmptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchProductsEmptyIconText: {
    fontSize: 32,
    color: '#CCC',
  },
  searchProductsEmptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  
  // Add New Product Modal Styles
  addNewProductModalContent: {
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  addNewProductScrollView: {
    flex: 1,
    padding: 16,
  },
  uploadImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadImageBox: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  uploadImageIcon: {
    fontSize: 32,
    color: '#999',
    marginBottom: 8,
  },
  uploadImageText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  addNewFieldContainer: {
    marginBottom: 16,
  },
  addNewFieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addNewFieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  addNewFieldSubLabel: {
    fontSize: 12,
    color: '#999',
  },
  addNewInputField: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#333',
  },
  addNewFieldHelper: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  addNewToggleContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  addNewToggleBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addNewToggleBtnActive: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  addNewToggleText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  addNewToggleTextActive: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  addNewPriceAfterGst: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  addNewGstIncluded: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  addNewQuantityTable: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginTop: 12,
    overflow: 'hidden',
  },
  addNewTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    paddingVertical: 12,
  },
  addNewTableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  addNewTableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  addNewTableCell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  addNewActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 20,
  },
  addNewCancelBtn: {
    flex: 1,
    paddingVertical: 14,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  addNewSaveBtn: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#4285F4',
    alignItems: 'center',
  },
  addNewCancelText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  addNewSaveText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default WholesalerHomeScreen;
