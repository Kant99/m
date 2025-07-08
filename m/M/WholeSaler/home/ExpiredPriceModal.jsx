import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { products } from './data';

const ExpiredPriceModal = ({ visible, onClose, onEdit }) => {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Expired Price Products</Text>
            <View style={styles.headerSpacer} />
          </View>
          <ScrollView style={styles.content}>
            {products.map((prod, idx) => (
              <View key={idx} style={styles.productCard}>
                <View style={styles.productInfo}>
                  <Image source={prod.img} style={styles.productImage} resizeMode="cover" />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{prod.name}</Text>
                    <Text style={styles.detailText}>
                      Last Price: <Text style={styles.priceText}>₹{prod.price}/kg</Text>
                    </Text>
                    <Text style={styles.detailText}>
                      Last Updated: <Text style={styles.updatedText}>8 days ago</Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.actionRow}>
                  <View style={styles.statusContainer}>
                    <Text style={styles.statusIcon}>🚫</Text>
                    <Text style={styles.statusText}>Price expired</Text>
                  </View>
                  <TouchableOpacity style={styles.editButton} onPress={() => onEdit(prod)}>
                    <Text style={styles.editButtonText}>Update Price</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={styles.warningContainer}>
              <Text style={styles.warningIcon}>🚫</Text>
              <Text style={styles.warningText}>
                Products with expired prices have been removed from the marketplace. Please update prices within 7 days to maintain listing status.
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productInfo: {
    flexDirection: 'row',
    marginBottom: 12,
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
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  priceText: {
    color: '#DC3545',
    fontWeight: 'bold',
  },
  updatedText: {
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
    backgroundColor: '#FFEBEE',
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
    color: '#DC3545',
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  editButtonText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 16,
    marginTop: 32,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  warningIcon: {
    fontSize: 16,
    color: '#DC3545',
    marginRight: 8,
    marginTop: 4,
  },
  warningText: {
    fontSize: 14,
    color: '#DC3545',
    flex: 1,
  },
});

export default ExpiredPriceModal;