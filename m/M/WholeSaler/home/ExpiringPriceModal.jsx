import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { products } from './data';

const ExpiringPriceModal = ({ visible, onClose, onEdit }) => {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Expiring Price Products</Text>
            <View style={styles.headerSpacer} />
          </View>
          <ScrollView style={styles.content}>
            {products
              .filter((prod) => prod.tags.includes('Expiring Price'))
              .map((prod, idx) => (
                <View key={idx} style={styles.productCard}>
                  <View style={styles.productInfo}>
                    <Image source={prod.img} style={styles.productImage} resizeMode="cover" />
                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{prod.name}</Text>
                      <Text style={styles.detailText}>
                        Current Price: <Text style={styles.priceText}>₹{prod.price}/kg</Text>
                      </Text>
                      <Text style={styles.detailText}>
                        Last Updated: <Text style={styles.updatedText}>3 days ago</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.actionRow}>
                    <View style={styles.statusContainer}>
                      <Text style={styles.statusIcon}>⚠️</Text>
                      <Text style={styles.statusText}>Expires in 4 days</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={() => onEdit(prod)}>
                      <Text style={styles.editButtonText}>Update Price</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            <View style={styles.infoContainer}>
              <Text style={styles.infoIcon}>ℹ️</Text>
              <Text style={styles.infoText}>
                Product prices expire within 3-7 days of last edit.{'\n'}Once expired, products will not be listed.
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
    color: '#D97706',
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
    color: '#D97706',
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
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginTop: 32,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoIcon: {
    fontSize: 16,
    color: '#6C757D',
    marginRight: 8,
    marginTop: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#6C757D',
    flex: 1,
  },
});

export default ExpiringPriceModal;