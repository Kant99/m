import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
 import Header from './home/Header';
import SummaryCard from './home/SummaryCard';
import ProductCard from './home/ProductCard';
import AddProductButton from './home/AddProductButton';
import EditProductModal from './home/EditProductModal';
import OutOfStockModal from './home/OutOfStockModal';
import HighPriceModal from './home/HighPriceModal';
import ExpiringPriceModal from './home/ExpiringPriceModal';
import ExpiredPriceModal from './home/ExpiredPriceModal';
import SearchProductsModal from './home/SearchProductsModal';
import AddNewProductModal from './home/AddNewProductModal';
import { summaryCards } from './home/data';
import apiConnector from './../utils/apiConnector';

const { width } = Dimensions.get('window');

const WholesalerHomeScreen = ({ navigation }) => {
  const [state, setState] = useState({
    isOpen: true,
    search: '',
    editModalVisible: false,
    outOfStockModalVisible: false,
    highPriceModalVisible: false,
    expiringPriceModalVisible: false,
    expiredPriceModalVisible: false,
    addProductDropdownVisible: false,
    searchProductsModalVisible: false,
    addNewProductModalVisible: false,
    selectedProduct: null,
    gstCategory: 'Exempted',
    quantityPricing: 'Applicable',
    products: [],
    loading: false,
    error: null,
  });

  const toggleState = (key, value) => setState((prev) => ({ ...prev, [key]: value }));

  // Load JWT token from AsyncStorage
  

  // Fetch products
  const fetchProducts = useCallback(async () => {
    console.log('inside the fetchProducts');
    try {
      toggleState('loading', true);
      toggleState('error', null);

     

      const response = await apiConnector.getAllProducts();
      console.log('response of all products:', response);

      const mappedProducts = response.data.products.map((product) => ({
        id: product._id,
        name: product.productName,
        stock: product.stock,
        price: product.priceBeforeGst,
        tags: product.tags || [],
        img: product.productImage ,
      }));
      console.log('mappedProducts:', mappedProducts);
      toggleState('products', mappedProducts);
    } catch (error) {
      console.error('Fetch products error:', error);
      toggleState('error', error.message || 'Failed to fetch products');
    } finally {
      toggleState('loading', false);
    }
  }, []);

  useEffect(() => {
    console.log('inside the use effect');
    fetchProducts();
  }, [fetchProducts]);

  const handleCardPress = (key) => {
    if (key === 'kyc') {
      navigation.navigate('Kyc');
    } else {
      toggleState(`${key}ModalVisible`, true);
    }
  };

  const handleEdit = (product) => {
    toggleState('selectedProduct', product);
    toggleState('editModalVisible', true);
    toggleState('expiringPriceModalVisible', false);
    toggleState('expiredPriceModalVisible', false);
  };

  return (
    <View style={styles.container}>
      {state.addProductDropdownVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => toggleState('addProductDropdownVisible', false)}
        />
      )}
      <Header
        onNavigate={(screen) => navigation.navigate(screen)}
        isOpen={state.isOpen}
        setIsOpen={(value) => toggleState('isOpen', value)}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Catalogue</Text>
        <AddProductButton
          addProductDropdownVisible={state.addProductDropdownVisible}
          setAddProductDropdownVisible={(value) => toggleState('addProductDropdownVisible', value)}
          setSearchProductsModalVisible={(value) => toggleState('searchProductsModalVisible', value)}
          setAddNewProductModalVisible={(value) => toggleState('addNewProductModalVisible', value)}
        />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.cardsContainer}>
          {summaryCards.map((card) => (
            <SummaryCard key={card.key} card={card} onPress={handleCardPress} />
          ))}
        </View>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={state.search}
            onChangeText={(text) => toggleState('search', text)}
          />
        </View>
        <View style={styles.productsContainer}>
          {state.loading && <Text style={styles.loadingText}>Loading products...</Text>}
          {state.error && <Text style={styles.errorText}>{state.error}</Text>}
          {!state.loading && !state.error && state.products.length === 0 && (
            <Text style={styles.emptyText}>No products found</Text>
          )}
          {state.products
            .filter((product) => product.name.toLowerCase().includes(state.search.toLowerCase()))
            .map((prod) => (
              <ProductCard key={prod.id} product={prod} onEdit={handleEdit} />
            ))}
        </View>
      </ScrollView>
      <EditProductModal
        visible={state.editModalVisible}
        onClose={() => toggleState('editModalVisible', false)}
        selectedProduct={state.selectedProduct}
        gstCategory={state.gstCategory}
        setGstCategory={(value) => toggleState('gstCategory', value)}
        quantityPricing={state.quantityPricing}
        setQuantityPricing={(value) => toggleState('quantityPricing', value)}
      />
      <OutOfStockModal
        visible={state.outOfStockModalVisible}
        onClose={() => toggleState('outOfStockModalVisible', false)}
      />
      <HighPriceModal
        visible={state.highPriceModalVisible}
        onClose={() => toggleState('highPriceModalVisible', false)}
      />
      <ExpiringPriceModal
        visible={state.expiringPriceModalVisible}
        onClose={() => toggleState('expiringPriceModalVisible', false)}
        onEdit={handleEdit}
      />
      <ExpiredPriceModal
        visible={state.expiredPriceModalVisible}
        onClose={() => toggleState('expiredPriceModalVisible', false)}
        onEdit={handleEdit}
      />
      <SearchProductsModal
        visible={state.searchProductsModalVisible}
        onClose={() => toggleState('searchProductsModalVisible', false)}
      />
      <AddNewProductModal
        visible={state.addNewProductModalVisible}
        onClose={() => toggleState('addNewProductModalVisible', false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4F7',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 8,
    marginHorizontal: 16,
  },
  searchIcon: {
    fontSize: 18,
    color: '#999',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  productsContainer: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
    marginVertical: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default WholesalerHomeScreen;