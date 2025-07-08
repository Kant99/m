import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet } from 'react-native';

const EditProductModal = ({
  visible,
  onClose,
  selectedProduct,
  gstCategory = 'Exempted',
  setGstCategory,
  quantityPricing = 'Applicable',
  setQuantityPricing,
}) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct.name || '');
      setPrice(selectedProduct.price ? selectedProduct.price.toString() : '');
      setStock(selectedProduct.stock ? selectedProduct.stock.toString() : '');
    } else {
      setProductName('');
      setPrice('');
      setStock('');
    }
  }, [selectedProduct]);

  if (!visible) return null;

  const handleSaveChanges = () => {
    console.log('Saving product:', { productName, price, stock, gstCategory, quantityPricing });
    onClose();
  };

  const calculatedPrice = price ? parseFloat(price) * (gstCategory === 'Applicable' ? 1.05 : 1) : 0;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Product</Text>
            <View style={styles.headerSpacer} />
          </View>
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              <View style={styles.imagePlaceholder}>
                {selectedProduct?.img ? (
                  <Image source={selectedProduct.img} style={styles.productImage} resizeMode="cover" />
                ) : (
                  <Text style={styles.imageIcon}>📷</Text>
                )}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Product Name</Text>
                <Text style={styles.idText}>ID: {selectedProduct?.id || 1}</Text>
              </View>
              <TextInput
                style={styles.input}
                value={productName}
                onChangeText={setProductName}
                placeholder="Enter product name"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Price-(Without GST)</Text>
                <Text style={styles.unitText}>(₹/kg or qty or piece)</Text>
              </View>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
              <Text style={styles.marketRate}>Current market rate: ₹45/kg</Text>
              <Text style={styles.priceStatus}>
                {parseFloat(price) <= 45 ? '📉 Your price is lowest' : '📈 Your price is higher'}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Stock Available</Text>
              <TextInput
                style={styles.input}
                value={stock}
                onChangeText={setStock}
                placeholder="Enter stock"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
              <Text style={styles.hintText}>Enter quantity in kg</Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
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
                      gstCategory === 'Applicable' && styles.selectedOptionRed,
                    ]}
                    onPress={() => setGstCategory('Applicable')}
                  >
                    <Text style={[styles.optionText, gstCategory === 'Applicable' && styles.selectedOptionTextRed]}>
                      Applicable
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
                style={styles.input}
                value={gstCategory === 'Exempted' ? '0% GST' : '5% GST'}
                editable={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Price After GST</Text>
              <Text style={styles.priceAfterGst}>₹{calculatedPrice.toFixed(2)}/kg</Text>
              <Text style={styles.hintText}>Including {gstCategory === 'Applicable' ? '5%' : '0%'} GST</Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
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
                      quantityPricing === 'Not Applicable' && styles.selectedOptionGray,
                    ]}
                    onPress={() => setQuantityPricing('Not Applicable')}
                  >
                    <Text style={[styles.optionText, quantityPricing === 'Not Applicable' && styles.selectedOptionTextGray]}>
                      Not Applicable
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {quantityPricing === 'Applicable' && (
                <View style={styles.quantityTable}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Qty</Text>
                    <Text style={styles.tableHeaderText}>Price</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>1 kg/pc</Text>
                    <Text style={styles.tableCell}>₹{calculatedPrice.toFixed(2)}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>5 kg/pc</Text>
                    <Text style={styles.tableCell}>₹{(calculatedPrice - 2).toFixed(2)}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>10 kg/pc</Text>
                    <Text style={styles.tableCell}>₹{(calculatedPrice - 5).toFixed(2)}</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
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
    padding: 12,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E0E0E0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  imageIcon: {
    fontSize: 24,
    color: '#999',
  },
  inputContainer: {
    marginBottom: 12,
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
  idText: {
    fontSize: 14,
    color: '#666',
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
  marketRate: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  priceStatus: {
    fontSize: 14,
    color: '#28A745',
    marginTop: 4,
  },
  hintText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
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
  selectedOptionRed: {
    backgroundColor: '#F8D7DA',
  },
  selectedOptionGray: {
    backgroundColor: '#F5F5F5',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  selectedOptionText: {
    color: '#28A745',
    fontWeight: 'bold',
  },
  selectedOptionTextRed: {
    color: '#DC3545',
    fontWeight: 'bold',
  },
  selectedOptionTextGray: {
    color: '#999',
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
    marginTop: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    padding: 8,
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
    borderTopColor: '#E0E0E0',
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
    marginBottom: 24,
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
  saveButton: {
    flex: 1,
    backgroundColor: '#3973F4',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
});

export default EditProductModal;