import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

const AddProductButton = ({
  addProductDropdownVisible,
  setAddProductDropdownVisible,
  setSearchProductsModalVisible,
  setAddNewProductModalVisible,
}) => {
  const handleSearchPress = () => {
    setAddProductDropdownVisible(false);
    setSearchProductsModalVisible(true);
  };

  const handleCreateNewPress = () => {
    setAddProductDropdownVisible(false);
    setAddNewProductModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddProductDropdownVisible(!addProductDropdownVisible)}
      >
        <Text style={styles.addButtonText}>+ Add Product</Text>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={addProductDropdownVisible}
        onRequestClose={() => setAddProductDropdownVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setAddProductDropdownVisible(false)}
        >
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.item} onPress={handleSearchPress}>
              <Text style={styles.icon}>🔍</Text>
              <Text style={styles.label}>Search Products</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={handleCreateNewPress}>
              <Text style={styles.icon}>➕</Text>
              <Text style={styles.label}>Create New</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  addButton: {
    borderColor: '#3973F4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#3973F4',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50,
    paddingRight: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    width: 200,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  icon: {
    fontSize: 18,
    color: '#3973F4',
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default AddProductButton;
