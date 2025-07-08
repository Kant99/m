import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { highPriceProducts } from './data';

const HighPriceModal = ({ visible, onClose, onEdit, gstCategory, setGstCategory, quantityPricing, setQuantityPricing }) => {
  if (!visible) return null;

  const handleEdit = (product) => {
    onEdit(product);
    setGstCategory(gstCategory);
    setQuantityPricing(quantityPricing);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>High Price Products</Text>
            <View style={styles.headerSpacer} />
          </View>
          <ScrollView style={styles.content}>
            {highPriceProducts.map((product, index) => (
              <View key={index} style={styles.productCard}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productInfo}>
                  <Image source={product.img} style={styles.productImage} resizeMode="cover" />
                  <View style={styles.productDetails}>
                    <Text style={styles.detailText}>
                      Current Price: <Text style={styles.priceText}>₹{product.currentPrice}/kg</Text>
                    </Text>
                    <Text style={styles.detailText}>
                      Market Average: <Text style={styles.marketText}>₹{product.marketAverage}/kg</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.actionRow}>
                  <View style={styles.percentageContainer}>
                    <Text style={styles.percentageIcon}>📈</Text>
                    <Text style={styles.percentageText}>{product.percentageHigher}% higher</Text>
                  </View>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(product)}>
                    <Text style={styles.editButtonText}>Edit Price</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={styles.warningContainer}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.warningText}>
                Other suppliers have a better price for the product so your product will not be listed
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backIcon: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    padding: 16,
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  productInfo: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  priceText: {
    color: '#DC3545',
    fontWeight: 'bold',
  },
  marketText: {
    color: '#28A745',
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  percentageText: {
    fontSize: 14,
    color: '#DC3545',
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  editButtonText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  warningIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#C62828',
    flex: 1,
  },
});

export default HighPriceModal;