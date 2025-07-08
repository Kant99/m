import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { outOfStockProducts } from './data';

const OutOfStockModal = ({ visible, onClose, onEdit, gstCategory, setGstCategory, quantityPricing, setQuantityPricing }) => {
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
            <Text style={styles.headerTitle}>Out of Stock Products</Text>
            <View style={styles.headerSpacer} />
          </View>
          <ScrollView style={styles.content}>
            {outOfStockProducts.map((product, index) => (
              <View key={index} style={styles.productCard}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productInfo}>
                  <Image source={product.img} style={styles.productImage} resizeMode="cover" />
                  <View style={styles.productDetails}>
                    <Text style={styles.detailText}>
                      Current Stock:{' '}
                      <Text
                        style={
                          product.status === 'out'
                            ? styles.outOfStockText
                            : styles.lowStockText
                        }
                      >
                        {product.currentStock} kg
                      </Text>
                    </Text>
                    <Text style={styles.detailText}>
                      Min. Required: <Text style={styles.minRequiredText}>{product.minRequired} kg</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.actionRow}>
                  <View style={styles.statusContainer}>
                    <Text style={styles.statusIcon}>⚠️</Text>
                    <Text
                      style={[
                        styles.statusText,
                        product.status === 'out' ? styles.outOfStockText : styles.lowStockText,
                      ]}
                    >
                      {product.status === 'out' ? 'Out of stock' : 'Low stock'}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(product)}>
                    <Text style={styles.editButtonText}>Update Stock</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={styles.warningContainer}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.warningText}>
                Low stock may affect your marketplace visibility
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  productInfo: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 20,
  },
  productDetails: {
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  outOfStockText: {
    color: '#DC3545',
    fontWeight: 'bold',
  },
  lowStockText: {
    color: '#FD7E14',
    fontWeight: 'bold',
  },
  minRequiredText: {
    color: '#333',
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  editButtonText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    marginBottom: 24,
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
  },
});

export default OutOfStockModal;