import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const SummaryCard = ({ card, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: card.color }]}
      onPress={() => onPress(card.key)}
      activeOpacity={0.8}
    >
      {/* Top Left Icon */}
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{card.icon}</Text>
      </View>

      {/* Top Right Values */}
      <View style={styles.topRight}>
        <Text style={styles.value}>{card.value}</Text>
        <Text style={styles.desc}>{card.desc}</Text>
      </View>

      {/* Bottom Left Label */}
      <Text style={styles.label}>{card.label}</Text>

      {/* Bottom Right Arrow */}
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 120,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBox: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: 'white',
  },
  topRight: {
    position: 'absolute',
    top: 16,
    right: 16,
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  desc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  label: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  arrow: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    fontSize: 20,
    color: 'white',
  },
});

export default SummaryCard;
