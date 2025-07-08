import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  selectedProduct: any;
  gstCategory: string;
  setGstCategory: (value: string) => void;
  quantityPricing: string;
  setQuantityPricing: (value: string) => void;
};

const EditProductModal: React.FC<Props> = ({
  visible,
  onClose,
  selectedProduct,
  gstCategory,
  setGstCategory,
  quantityPricing,
  setQuantityPricing,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.editModalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
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
                onPress={onClose}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.saveBtn}
                onPress={onClose}
              >
                <Text style={styles.saveText}>Save Changes</Text>
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
});

export default EditProductModal;