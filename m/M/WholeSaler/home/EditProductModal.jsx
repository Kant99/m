import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import apiConnector from './../../utils/apiConnector';

const EditProductModal = ({ visible, onClose, selectedProduct, onUpdateSuccess }) => {
  const [productName, setProductName] = useState('');
  const [priceBeforeGst, setPriceBeforeGst] = useState('');
  const [priceUnit, setPriceUnit] = useState('per kg');
  const [categoryName, setCategoryName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [stock, setStock] = useState('');
  const [gstCategory, setGstCategory] = useState('exempted');
  const [gstPercent, setGstPercent] = useState('0');
  const [filters, setFilters] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false); // Track if image is changed
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('useEffect triggered with selectedProduct:', selectedProduct);
    if (selectedProduct) {
      setProductName(selectedProduct.name || '');
      setPriceBeforeGst(selectedProduct.price ? selectedProduct.price.toString() : '');
      setPriceUnit(selectedProduct.priceUnit || 'per kg');
      setCategoryName(selectedProduct.categoryName || '');
      setProductDescription(selectedProduct.productDescription || '');
      setStock(selectedProduct.stock ? selectedProduct.stock.toString() : '');
      setGstCategory(selectedProduct.gstCategory || 'exempted');
      setGstPercent(selectedProduct.gstPercent ? selectedProduct.gstPercent.toString() : '0');
      setFilters(selectedProduct.tags || []);
      setProductImage(selectedProduct.img ? { uri: selectedProduct.img } : null);
      setImageChanged(false); // Reset imageChanged on product load
    } else {
      // Reset state
      setProductName('');
      setPriceBeforeGst('');
      setPriceUnit('per kg');
      setCategoryName('');
      setProductDescription('');
      setStock('');
      setGstCategory('exempted');
      setGstPercent('0');
      setFilters([]);
      setProductImage(null);
      setImageChanged(false);
    }
  }, [selectedProduct]);

  const pickImage = async () => {
    console.log('pickImage function called');
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });
      console.log('ImagePicker result:', result);
      if (!result.didCancel && result.assets) {
        const image = {
          uri: result.assets[0].uri, // Local file URI
          type: result.assets[0].type || 'image/jpeg',
          name: result.assets[0].fileName || 'productImage.jpg',
        };
        if (result.assets[0].fileSize && result.assets[0].fileSize > 10 * 1024 * 1024) {
          Alert.alert('Error', 'Image size exceeds 10MB limit.');
          return;
        }
        setProductImage(image);
        setImageChanged(true); // Mark image as changed
        console.log('Image selected:', image);
      } else {
        console.log('Image selection cancelled or no assets found');
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick image.');
    }
  };

  const handleSaveChanges = async () => {
    console.log('handleSaveChanges called with productData:', {
      productName,
      priceBeforeGst,
      priceUnit,
      categoryName,
      productDescription,
      stock,
      gstCategory,
      gstPercent,
      filters,
      productImage,
      imageChanged,
    });

    // Validate inputs
    if (!productName || !priceBeforeGst || !stock || !categoryName || !priceUnit) {
      console.log('Validation failed: Missing required fields');
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    if (isNaN(parseFloat(priceBeforeGst)) || isNaN(parseInt(stock))) {
      console.log('Validation failed: Invalid price or stock', { priceBeforeGst, stock });
      Alert.alert('Error', 'Price and stock must be valid numbers.');
      return;
    }

    if (gstCategory === 'applicable' && (isNaN(parseFloat(gstPercent)) || parseFloat(gstPercent) < 0 || parseFloat(gstPercent) > 100)) {
      console.log('Validation failed: Invalid GST percent', { gstPercent });
      Alert.alert('Error', 'GST percent must be a number between 0 and 100.');
      return;
    }

    const productData = {
      productName,
      priceBeforeGst: parseFloat(priceBeforeGst),
      priceUnit,
      categoryName,
      productDescription,
      stock: parseInt(stock),
      filters,
      gstCategory,
      gstPercent: parseFloat(gstPercent),
    };

    console.log('Prepared productData for API:', productData);
    setLoading(true);
    console.log('Loading state set to true');

    try {
      // Pass productImage only if imageChanged is true
      const response = await apiConnector.updateProduct(selectedProduct.id, productData, imageChanged ? productImage : null);
      console.log('API Response:', response);
      Alert.alert('Success', 'Product updated successfully!');
      if (onUpdateSuccess) {
        console.log('Calling onUpdateSuccess with response.data:', response.data);
        onUpdateSuccess(response.data);
      }
      onClose();
      console.log('Modal closed after successful update');
    } catch (error) {
      console.error('Update product error:', error);
      Alert.alert('Error', error.message || 'Failed to update product.');
    } finally {
      setLoading(false);
      console.log('Loading state set to false');
    }
  };

  const calculatedPriceAfterGst =
    gstCategory === 'applicable' && parseFloat(gstPercent) > 0 && parseFloat(priceBeforeGst)
      ? parseFloat(priceBeforeGst) + (parseFloat(priceBeforeGst) * parseFloat(gstPercent) / 100)
      : parseFloat(priceBeforeGst) || 0;
  console.log('Calculated price after GST:', calculatedPriceAfterGst);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} disabled={loading}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Product</Text>
            <View style={styles.headerSpacer} />
          </View>
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={pickImage} disabled={loading}>
                <View style={styles.imagePlaceholder}>
                  {productImage ? (
                    <Image source={{ uri: productImage.uri }} style={styles.productImage} resizeMode="cover" />
                  ) : selectedProduct?.img ? (
                    <Image source={{ uri: selectedProduct.img }} style={styles.productImage} resizeMode="cover" />
                  ) : (
                    <Text style={styles.imageIcon}>📷</Text>
                  )}
                </View>
              </TouchableOpacity>
              <Text style={styles.hintText}>Tap to upload new image</Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Product Name</Text>
                <Text style={styles.idText}>ID: {selectedProduct?.id || 'N/A'}</Text>
              </View>
              <TextInput
                style={styles.input}
                value={productName}
                onChangeText={(text) => {
                  setProductName(text);
                  console.log('Product name updated:', text);
                }}
                placeholder="Enter product name"
                placeholderTextColor="#999"
                editable={!loading}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Category Name</Text>
              <TextInput
                style={styles.input}
                value={categoryName}
                onChangeText={(text) => {
                  setCategoryName(text);
                  console.log('Category name updated:', text);
                }}
                placeholder="Enter category name"
                placeholderTextColor="#999"
                editable={!loading}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Product Description</Text>
              <TextInput
                style={[styles.input, { height: 80 }]}
                value={productDescription}
                onChangeText={(text) => {
                  setProductDescription(text);
                  console.log('Product description updated:', text);
                }}
                placeholder="Enter product description"
                placeholderTextColor="#999"
                multiline
                editable={!loading}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Price (Before GST)</Text>
                <Text style={styles.unit}>({priceUnit})</Text>
              </View>
              <TextInput
                style={styles.input}
                value={priceBeforeGst}
                onChangeText={(text) => {
                  setPriceBeforeGst(text);
                  console.log('Price before GST updated:', text);
                }}
                placeholder="Enter price"
                placeholderTextColor="#999"
                keyboardType="numeric"
                editable={!loading}
              />
              <View style={styles.buttonGroup}>
                {['per kg', 'per dozen', 'per piece'].map((unit) => (
                  <TouchableOpacity
                    key={unit}
                    style={[styles.optionButton, priceUnit === unit && styles.selectedOption]}
                    onPress={() => {
                      setPriceUnit(unit);
                      console.log('Price unit selected:', unit);
                    }}
                    disabled={loading}
                  >
                    <Text style={[styles.optionText, priceUnit === unit && styles.selectedOptionText]}>
                      {unit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.marketRate}>Current market rate: ₹45/{priceUnit}</Text>
              <Text style={styles.priceStatus}>
                {parseFloat(priceBeforeGst) <= 45 ? '📉 Your price is lowest' : '📈 Your price is higher'}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Stock Available</Text>
              <TextInput
                style={styles.input}
                value={stock}
                onChangeText={(text) => {
                  setStock(text);
                  console.log('Stock updated:', text);
                }}
                placeholder="Enter stock"
                placeholderTextColor="#999"
                keyboardType="numeric"
                editable={!loading}
              />
              <Text style={styles.hintText}>Enter quantity in units</Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>GST Category</Text>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={[styles.optionButton, gstCategory === 'exempted' && styles.selectedOption]}
                    onPress={() => {
                      setGstCategory('exempted');
                      setGstPercent('0');
                      console.log('GST category set to exempted, GST percent reset to 0');
                    }}
                    disabled={loading}
                  >
                    <Text style={[styles.optionText, gstCategory === 'exempted' && styles.selectedOptionText]}>
                      Exempted
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.optionButton, gstCategory === 'applicable' && styles.selectedOptionRed]}
                    onPress={() => {
                      setGstCategory('applicable');
                      console.log('GST category set to applicable');
                    }}
                    disabled={loading}
                  >
                    <Text style={[styles.optionText, gstCategory === 'applicable' && styles.selectedOptionTextRed]}>
                      Applicable
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
                style={styles.input}
                value={gstPercent}
                onChangeText={(text) => {
                  if (gstCategory === 'exempted') {
                    console.log('GST percent change ignored: GST category is exempted');
                    return;
                  }
                  setGstPercent(text);
                  console.log('GST percent updated:', text);
                }}
                placeholder="Enter GST percent"
                placeholderTextColor="#999"
                keyboardType="numeric"
                editable={gstCategory === 'applicable' && !loading}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Price After GST</Text>
              <Text style={styles.priceAfterGst}>₹{calculatedPriceAfterGst.toFixed(2)}/{priceUnit}</Text>
              <Text style={styles.hintText}>
                Including {gstCategory === 'applicable' ? `${gstPercent}%` : '0%'} GST
              </Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.cancelButton, loading && styles.disabledButton]}
                onPress={() => {
                  console.log('Cancel button pressed');
                  onClose();
                }}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, loading && styles.disabledButton]}
                onPress={() => {
                  console.log('Save button pressed');
                  handleSaveChanges();
                }}
                disabled={loading}
              >
                <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
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
    marginTop: 8,
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
  priceAfterGst: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E0E0E0', // Fixed typo in original code
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
  disabledButton: {
    backgroundColor: '#B0B0B0',
    opacity: 0.6,
  },
});

export default EditProductModal;