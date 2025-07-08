import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';

const AddNewProductModal = ({ visible, onClose }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [gstCategory, setGstCategory] = useState('Exempted');
  const [quantityPricing, setQuantityPricing] = useState('Applicable');

  if (!visible) return null;

  const handleAddProduct = () => {
    // Implement API call to add product here
    console.log('Adding product:', { productName, price, stock, gstCategory, quantityPricing });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add New Product</Text>
            <View style={styles.headerSpacer} />
          </View>
          <ScrollView style={styles.content}>
            <View style={styles.imageUploadContainer}>
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageIcon}>📷</Text>
                <Text style={styles.imageText}>Upload Image</Text>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Product Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter product name"
                placeholderTextColor="#999"
                value={productName}
                onChangeText={setProductName}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Price-(Without GST)</Text>
                <Text style={styles.unitText}>(₹/kg or qty or piece)</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter price"
                placeholderTextColor="#999"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Stock Available</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter available stock"
                placeholderTextColor="#999"
                value={stock}
                onChangeText={setStock}
                keyboardType="numeric"
              />
              <Text style={styles.hintText}>Enter quantity in kg</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>GST Category</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    gstCategory === 'Exempted' && styles.selectedOption,
                  ]}
                  onPress={() => setGstCategory('Exempted')}
                >
                  <Text style={[styles.optionText, gstCategory === 'Exempted' && styles.selectedOptionText]}>
                    Exempted
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    gstCategory === 'Applicable' && styles.selectedOption,
                  ]}
                  onPress={() => setGstCategory('Applicable')}
                >
                  <Text style={[styles.optionText, gstCategory === 'Applicable' && styles.selectedOptionText]}>
                    Applicable
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                value={gstCategory === 'Exempted' ? '0% GST' : '5% GST'}
                editable={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Price After GST</Text>
              <Text style={styles.priceAfterGst}>₹{price ? (parseFloat(price) * (gstCategory === 'Applicable' ? 1.05 : 1)).toFixed(2) : '0.00'}/kg</Text>
              <Text style={styles.hintText}>Including {gstCategory === 'Applicable' ? '5%' : '0%'} GST</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Quantity Pricing</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    quantityPricing === 'Applicable' && styles.selectedOption,
                  ]}
                  onPress={() => setQuantityPricing('Applicable')}
                >
                  <Text style={[styles.optionText, quantityPricing === 'Applicable' && styles.selectedOptionText]}>
                    Applicable
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    quantityPricing === 'Not Applicable' && styles.selectedOption,
                  ]}
                  onPress={() => setQuantityPricing('Not Applicable')}
                >
                  <Text style={[styles.optionText, quantityPricing === 'Not Applicable' && styles.selectedOptionText]}>
                    Not Applicable
                  </Text>
                </TouchableOpacity>
              </View>
              {quantityPricing === 'Applicable' && (
                <View style={styles.quantityTable}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Qty</Text>
                    <Text style={styles.tableHeaderText}>Price</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>1 kg/pc</Text>
                    <Text style={styles.tableCell}>₹{price ? (parseFloat(price) * (gstCategory === 'Applicable' ? 1.05 : 1)).toFixed(2) : '0.00'}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>5 kg/pc</Text>
                    <Text style={styles.tableCell}>₹{price ? (parseFloat(price) * (gstCategory === 'Applicable' ? 1.05 : 1) - 2).toFixed(2) : '0.00'}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>10 kg/pc</Text>
                    <Text style={styles.tableCell}>₹{price ? (parseFloat(price) * (gstCategory === 'Applicable' ? 1.05 : 1) - 5).toFixed(2) : '0.00'}</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                <Text style={styles.addButtonText}>Add Product</Text>
              </TouchableOpacity>
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
    maxHeight: '90%',
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
  imageUploadContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 128,
    height: 128,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E0E0E0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  imageIcon: {
    fontSize: 32,
    color: '#999',
    marginBottom: 8,
  },
  imageText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  unitText: {
    fontSize: 12,
    color: '#999',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
    color: '#333',
  },
  hintText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
  },
  selectedOption: {
    backgroundColor: '#D4EDDA',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  selectedOptionText: {
    color: '#28A745',
  },
  priceAfterGst: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  quantityTable: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    padding: 12,
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
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 12,
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
    marginTop: 24,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
});

export default AddNewProductModal;