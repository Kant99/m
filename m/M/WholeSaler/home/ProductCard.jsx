import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { products } from './data';

const ProductCard = ({ product, onEdit }) => (
  <View style={styles.container}>
    <Image source={product.img} style={styles.image} resizeMode="cover" />
    <View style={styles.details}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.stock}>Stock: {product.stock} kg</Text>
      <Text style={styles.price}>₹{product.price}/kg</Text>
      <View style={styles.tags}>
        {product.tags.map((tag, i) => (
          <Text
            key={i}
            style={[
              styles.tag,
              tag === 'High Price' ? styles.highPriceTag : styles.expiringPriceTag,
            ]}
          >
            {tag}
          </Text>
        ))}
      </View>
    </View>
    <TouchableOpacity style={styles.editButton} onPress={() => onEdit(product)}>
      <Text style={styles.editIcon}>✎</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F2F4F7',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  stock: {
    fontSize: 14,
    color: '#888',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  tags: {
    flexDirection: 'row',
    marginTop: 4,
  },
  tag: {
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  highPriceTag: {
    backgroundColor: '#F3E8FF',
    color: '#A259F7',
  },
  expiringPriceTag: {
    backgroundColor: '#FEF3C7',
    color: '#D97706',
  },
  editButton: {
    backgroundColor: '#EFFFF7',
    borderRadius: 8,
    padding: 8,
    marginLeft: 12,
  },
  editIcon: {
    fontSize: 18,
    color: '#3973F4',
  },
});

export default ProductCard;