import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { launchImageLibrary, Asset as ImagePickerAsset } from 'react-native-image-picker';
import axios from 'axios';

interface AddProductModalProps {
  visible: boolean;
  onClose: () => void;
  token: string | null | undefined;
  onProductAdded?: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ visible, onClose, token, onProductAdded }) => {
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [newProductGstCategory, setNewProductGstCategory] = useState('exempted');
  const [newProductGstPercent, setNewProductGstPercent] = useState('0');
  const [newProductPriceUnit, setNewProductPriceUnit] = useState('per kg');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductImage, setNewProductImage] = useState<ImagePickerAsset | null>(null);
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [addProductError, setAddProductError] = useState('');

  const baseUrl = 'http://192.168.1.9:4000'; // Update as needed

  const handlePickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setNewProductImage(result.assets[0]);
    }
  };

  const handleAddProduct = async () => {
    setAddProductLoading(true);
    setAddProductError('');
    try {
      const formData = new FormData();
      formData.append('productName', newProductName);
      formData.append('priceUnit', newProductPriceUnit);
      formData.append('categoryName', newProductCategory);
      formData.append('productDescription', newProductDescription);
      formData.append('stock', newProductStock);
      formData.append('gstCategory', newProductGstCategory);
      formData.append('gstPercent', newProductGstCategory === 'exempted' ? '0' : newProductGstPercent);
      formData.append('priceBeforeGst', newProductPrice);
      if (newProductImage) {
        formData.append('productImageFile', {
          uri: newProductImage.uri,
          type: newProductImage.type,
          name: newProductImage.fileName || 'product.jpg',
        } as any);
      }
      const response = await axios.post(
        `${baseUrl}/api/wholesaler/product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      onClose();
      setNewProductName('');
      setNewProductPrice('');
      setNewProductStock('');
      setNewProductGstCategory('exempted');
      setNewProductGstPercent('0');
      setNewProductPriceUnit('per kg');
      setNewProductCategory('');
      setNewProductDescription('');
      setNewProductImage(null);
      if (onProductAdded) onProductAdded();
    } catch (error) {
      const err = error as any;
      setAddProductError(
        err.response?.data?.message || 'Failed to add product'
      );
    } finally {
      setAddProductLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.addNewProductModalContent}>
          <ScrollView style={styles.addNewProductScrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.backArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add New Product</Text>
              <View style={{ width: 24 }} />
            </View>
            {/* Upload Image */}
            <View style={styles.uploadImageContainer}>
              <TouchableOpacity style={styles.uploadImageBox} onPress={handlePickImage}>
                {newProductImage ? (
                  <Image source={{ uri: newProductImage.uri }} style={{ width: 100, height: 100, borderRadius: 8 }} />
                ) : (
                  <>
                    <Text style={styles.uploadImageIcon}>📷</Text>
                    <Text style={styles.uploadImageText}>Upload Image</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.addNewFieldContainer}>
              <Text style={styles.addNewFieldLabel}>Product Name</Text>
              <TextInput
                style={styles.addNewInputField}
                placeholder="Enter product name"
                placeholderTextColor="#999"
                value={newProductName}
                onChangeText={setNewProductName}
              />
            </View>
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
                value={newProductPrice}
                onChangeText={setNewProductPrice}
              />
            </View>
            <View style={styles.addNewFieldContainer}>
              <Text style={styles.addNewFieldLabel}>Stock Available</Text>
              <TextInput
                style={styles.addNewInputField}
                placeholder="Enter available stock"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={newProductStock}
                onChangeText={setNewProductStock}
              />
              <Text style={styles.addNewFieldHelper}>Enter quantity in kg</Text>
            </View>
            <View style={styles.addNewFieldContainer}>
              <Text style={styles.addNewFieldLabel}>GST Category</Text>
              <View style={styles.addNewToggleContainer}>
                <TouchableOpacity
                  style={[styles.addNewToggleBtn, newProductGstCategory === 'exempted' && styles.addNewToggleBtnActive]}
                  onPress={() => {
                    setNewProductGstCategory('exempted');
                    setNewProductGstPercent('0');
                  }}
                >
                  <Text style={[styles.addNewToggleText, newProductGstCategory === 'exempted' && styles.addNewToggleTextActive]}>Exempted</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.addNewToggleBtn, newProductGstCategory === 'applicable' && styles.addNewToggleBtnActive]}
                  onPress={() => setNewProductGstCategory('applicable')}
                >
                  <Text style={[styles.addNewToggleText, newProductGstCategory === 'applicable' && styles.addNewToggleTextActive]}>Applicable</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.addNewInputField}
                value={newProductGstPercent}
                onChangeText={setNewProductGstPercent}
                editable={newProductGstCategory === 'applicable'}
                keyboardType="numeric"
                placeholder="Enter GST percent"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.addNewFieldContainer}>
              <Text style={styles.addNewFieldLabel}>Price Unit</Text>
              <TextInput
                style={styles.addNewInputField}
                placeholder="per kg, per dozen, per piece"
                placeholderTextColor="#999"
                value={newProductPriceUnit}
                onChangeText={setNewProductPriceUnit}
              />
            </View>
            <View style={styles.addNewFieldContainer}>
              <Text style={styles.addNewFieldLabel}>Category Name</Text>
              <TextInput
                style={styles.addNewInputField}
                placeholder="Enter category name"
                placeholderTextColor="#999"
                value={newProductCategory}
                onChangeText={setNewProductCategory}
              />
            </View>
            <View style={styles.addNewFieldContainer}>
              <Text style={styles.addNewFieldLabel}>Product Description</Text>
              <TextInput
                style={styles.addNewInputField}
                placeholder="Enter product description (optional)"
                placeholderTextColor="#999"
                value={newProductDescription}
                onChangeText={setNewProductDescription}
              />
            </View>
            <TouchableOpacity
              style={styles.addNewSaveBtn}
              onPress={handleAddProduct}
              disabled={addProductLoading}
            >
              <Text style={styles.addNewSaveText}>
                {addProductLoading ? 'Adding...' : 'Add Product'}
              </Text>
            </TouchableOpacity>
            {addProductError && (
              <Text style={{ color: 'red', textAlign: 'center' }}>{addProductError}</Text>
            )}
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
  addNewSaveBtn: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#4285F4',
    alignItems: 'center',
  },
  addNewSaveText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default AddProductModal; 