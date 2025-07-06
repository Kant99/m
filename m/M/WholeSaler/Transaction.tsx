import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import BottomTab from './BottomTab';
import type { AppScreen } from '../App';

type Props = {
  onNavigate?: (screen: AppScreen) => void;
};

const Transaction: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('accounting');
  const [search, setSearch] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [transactionDetailsModalVisible, setTransactionDetailsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const transactions = [
    {
      id: 'ORD-2505-1234',
      date: 'June 09, 10:23 AM',
      description: 'Payment received from Rahul Sharma',
      amount: '+₹255',
      status: 'Done',
      statusColor: '#4CAF50',
      statusBg: '#E8F5E8',
      amountColor: '#4CAF50',
      utrNumber: 'UTR-2505-1234',
      paymentMethod: 'Bank Transfer',
      recipientDetails: 'Customer Payment',
    },
    {
      id: 'ORD-2505-1232',
      date: 'June 09, 08:30 AM',
      description: 'Order payment - Delivery #4587',
      amount: '+₹450',
      status: 'Done',
      statusColor: '#4CAF50',
      statusBg: '#E8F5E8',
      amountColor: '#4CAF50',
      utrNumber: 'UTR-2505-1232',
      paymentMethod: 'Bank Transfer',
      recipientDetails: 'Customer Payment',
    },
    {
      id: 'ORD-2504-1231',
      date: 'June 08, 18:15 PM',
      description: 'Payment received from Priya Patel',
      amount: '+₹320',
      status: 'Done',
      statusColor: '#4CAF50',
      statusBg: '#E8F5E8',
      amountColor: '#4CAF50',
      utrNumber: 'UTR-2504-1231',
      paymentMethod: 'UPI',
      recipientDetails: 'Customer Payment',
    },
    {
      id: 'ORD-2504-1229',
      date: 'June 08, 11:30 AM',
      description: 'Order payment - Delivery #4586',
      amount: '+₹560',
      status: 'Done',
      statusColor: '#4CAF50',
      statusBg: '#E8F5E8',
      amountColor: '#4CAF50',
      utrNumber: 'UTR-2504-1229',
      paymentMethod: 'Cash',
      recipientDetails: 'Customer Payment',
    },
    {
      id: 'ORD-2503-1228',
      date: 'June 07, 09:20 AM',
      description: 'Payment received from Amit Kumar',
      amount: '+₹175',
      status: 'Done',
      statusColor: '#4CAF50',
      statusBg: '#E8F5E8',
      amountColor: '#4CAF50',
      utrNumber: 'UTR-2503-1228',
      paymentMethod: 'Bank Transfer',
      recipientDetails: 'Customer Payment',
    },
    {
      id: 'ORD-2502-1226',
      date: 'June 06, 13:10 PM',
      description: 'Order payment - Delivery #4585',
      amount: '+₹425',
      status: 'Done',
      statusColor: '#4CAF50',
      statusBg: '#E8F5E8',
      amountColor: '#4CAF50',
      utrNumber: 'UTR-2502-1226',
      paymentMethod: 'UPI',
      recipientDetails: 'Customer Payment',
    },
    {
      id: 'ORD-2502-1225',
      date: 'June 06, 11:05 AM',
      description: 'Payment processing from Neha Singh',
      amount: '+₹290',
      status: 'Pending',
      statusColor: '#FF9800',
      statusBg: '#FFF3E0',
      amountColor: '#4CAF50',
      utrNumber: 'UTR-2502-1225',
      paymentMethod: 'Bank Transfer',
      recipientDetails: 'Customer Payment',
    },
    {
      id: 'ORD-2501-1223',
      date: 'June 05, 14:20 PM',
      description: 'Order payment - Delivery #4584',
      amount: '+₹380',
      status: 'Done',
      statusColor: '#4CAF50',
      statusBg: '#E8F5E8',
      amountColor: '#4CAF50',
      utrNumber: 'UTR-2501-1223',
      paymentMethod: 'Cash',
      recipientDetails: 'Customer Payment',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => onNavigate && onNavigate('AccountScreen')}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Transactions</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>📅</Text>
          <Text style={styles.filterText}>All dates</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>⇄</Text>
          <Text style={styles.filterText}>All types</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>🔽</Text>
          <Text style={styles.filterText}>All statuses</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Transactions List */}
      <ScrollView style={styles.transactionsList} showsVerticalScrollIndicator={false}>
        {transactions.map((transaction, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.transactionCard}
            onPress={() => {
              setSelectedTransaction(transaction);
              setTransactionDetailsModalVisible(true);
            }}
          >
            <View style={styles.transactionContent}>
              <View style={styles.transactionLeft}>
                <Text style={styles.transactionId}>{transaction.id}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
                <Text style={styles.transactionDescription}>{transaction.description}</Text>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[styles.transactionAmount, { color: transaction.amountColor }]}>
                  {transaction.amount}
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: transaction.statusBg }]}>
                  <Text style={[styles.statusText, { color: transaction.statusColor }]}>
                    {transaction.status}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.chevronIcon}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Download Button */}
      <TouchableOpacity 
        style={styles.downloadButton}
        onPress={() => setExportModalVisible(true)}
      >
        <Text style={styles.downloadIcon}>⬇</Text>
      </TouchableOpacity>

      {/* Export Modal */}
      <Modal
        visible={exportModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setExportModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.exportModalOverlay}
          activeOpacity={1}
          onPress={() => setExportModalVisible(false)}
        >
          <View style={styles.exportModalContent}>
            <TouchableOpacity 
              style={styles.exportOption}
              onPress={() => {
                // Handle CSV export
                setExportModalVisible(false);
              }}
            >
              <View style={styles.exportIconContainer}>
                <Text style={styles.csvIcon}>📄</Text>
                <Text style={styles.csvText}>CSV</Text>
              </View>
              <Text style={styles.exportOptionText}>Export CSV</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.exportOption}
              onPress={() => {
                // Handle PDF export
                setExportModalVisible(false);
              }}
            >
              <View style={styles.exportIconContainer}>
                <Text style={styles.pdfIcon}>📄</Text>
                <Text style={styles.pdfText}>PDF</Text>
              </View>
              <Text style={styles.exportOptionText}>Export PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.exportOption, { borderBottomWidth: 0 }]}
              onPress={() => {
                // Handle print
                setExportModalVisible(false);
              }}
            >
              <View style={styles.exportIconContainer}>
                <Text style={styles.printIcon}>🖨</Text>
              </View>
              <Text style={styles.exportOptionText}>Print</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Transaction Details Modal */}
      <Modal
        visible={transactionDetailsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTransactionDetailsModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.transactionDetailsOverlay}
          activeOpacity={1}
          onPress={() => setTransactionDetailsModalVisible(false)}
        >
          <TouchableOpacity 
            style={styles.transactionDetailsContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {selectedTransaction && (
              <>
                {/* Header */}
                <View style={styles.transactionDetailsHeader}>
                  <Text style={styles.transactionDetailsTitle}>Transaction Details</Text>
                  <TouchableOpacity 
                    style={styles.closeTransactionButton}
                    onPress={() => setTransactionDetailsModalVisible(false)}
                  >
                    <Text style={styles.closeTransactionButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.transactionDetailsScrollView} showsVerticalScrollIndicator={false}>
                  {/* Transaction ID */}
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Transaction ID</Text>
                    <Text style={styles.detailValue}>{selectedTransaction.id}</Text>
                  </View>

                  {/* Date & Time */}
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Date & Time</Text>
                    <Text style={styles.detailValue}>{selectedTransaction.date}</Text>
                  </View>

                  {/* Amount */}
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Amount</Text>
                    <Text style={[styles.detailValue, { color: selectedTransaction.amountColor, fontWeight: 'bold' }]}>
                      {selectedTransaction.amount}
                    </Text>
                  </View>

                  {/* Status */}
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Status</Text>
                    <View style={[styles.detailStatusBadge, { backgroundColor: selectedTransaction.statusBg }]}>
                      <Text style={[styles.detailStatusText, { color: selectedTransaction.statusColor }]}>
                        {selectedTransaction.status}
                      </Text>
                    </View>
                  </View>

                  {/* UTR Number */}
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>UTR Number</Text>
                    <Text style={styles.detailValue}>{selectedTransaction.utrNumber}</Text>
                  </View>

                  {/* Payment Method */}
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Payment Method</Text>
                    <View style={styles.paymentMethodContainer}>
                      <TouchableOpacity style={[styles.paymentMethodButton, selectedTransaction.paymentMethod === 'Cash' && styles.paymentMethodActive]}>
                        <Text style={styles.paymentMethodIcon}>💵</Text>
                        <Text style={[styles.paymentMethodText, selectedTransaction.paymentMethod === 'Cash' && styles.paymentMethodTextActive]}>Cash</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.paymentMethodButton, selectedTransaction.paymentMethod === 'UPI' && styles.paymentMethodActive]}>
                        <Text style={styles.paymentMethodIcon}>📱</Text>
                        <Text style={[styles.paymentMethodText, selectedTransaction.paymentMethod === 'UPI' && styles.paymentMethodTextActive]}>UPI</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.paymentMethodButton, selectedTransaction.paymentMethod === 'Bank Transfer' && styles.paymentMethodActive]}>
                        <Text style={styles.paymentMethodIcon}>🏦</Text>
                        <Text style={[styles.paymentMethodText, selectedTransaction.paymentMethod === 'Bank Transfer' && styles.paymentMethodTextActive]}>Bank Transfer</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Recipient Details */}
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Recipient Details</Text>
                    <Text style={styles.detailValue}>{selectedTransaction.recipientDetails}</Text>
                  </View>
                </ScrollView>

                {/* Action Buttons */}
                <View style={styles.transactionActionButtons}>
                  <TouchableOpacity style={styles.downloadReceiptButton}>
                    <Text style={styles.downloadReceiptIcon}>⬇</Text>
                    <Text style={styles.downloadReceiptText}>Download Receipt</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reportIssueButton}>
                    <Text style={styles.reportIssueIcon}>🏷</Text>
                    <Text style={styles.reportIssueText}>Report Issue</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Bottom Tab */}
      <BottomTab 
        activeTab={activeTab} 
        onTabPress={(tab) => {
          setActiveTab(tab);
          if (tab === 'catalogue' && onNavigate) {
            onNavigate('WholesalerHome');
          } else if (tab === 'orders' && onNavigate) {
            onNavigate('OrderScreen');
          } else if (tab === 'accounting' && onNavigate) {
            onNavigate('AccountScreen');
          } else if (tab === 'profile' && onNavigate) {
            onNavigate('ProfileScreen');
          }
        }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginLeft: -40, // Compensate for back button to center the title
  },
  headerSpacer: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 18,
    color: '#999',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterIcon: {
    fontSize: 12,
    color: '#fff',
    marginRight: 8,
  },
  filterText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
    flex: 1,
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
  },
  transactionsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  transactionContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  transactionLeft: {
    flex: 1,
    marginRight: 16,
  },
  transactionId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  chevronIcon: {
    fontSize: 20,
    color: '#ccc',
    marginLeft: 8,
  },
  downloadButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  downloadIcon: {
    fontSize: 24,
    color: '#fff',
  },
  
  // Export Modal Styles
  exportModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingBottom: 180, // Position above the download button
  },
  exportModalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  exportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  exportIconContainer: {
    position: 'relative',
    marginRight: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  csvIcon: {
    fontSize: 28,
    color: '#3F51B5',
  },
  csvText: {
    position: 'absolute',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#3F51B5',
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 2,
    bottom: 8,
    right: 4,
  },
  pdfIcon: {
    fontSize: 28,
    color: '#F44336',
  },
  pdfText: {
    position: 'absolute',
    fontSize: 8,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#F44336',
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 2,
    bottom: 8,
    right: 4,
  },
  printIcon: {
    fontSize: 28,
    color: '#3F51B5',
  },
  exportOptionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  
  // Transaction Details Modal Styles
  transactionDetailsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  transactionDetailsContent: {
    width: '100%',
    maxHeight: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  transactionDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeTransactionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeTransactionButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  transactionDetailsScrollView: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  detailSection: {
    marginBottom: 24,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  detailStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  detailStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  paymentMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  paymentMethodActive: {
    backgroundColor: '#3F51B5',
  },
  paymentMethodIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  paymentMethodTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  transactionActionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  downloadReceiptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3F51B5',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  downloadReceiptIcon: {
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
  downloadReceiptText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  reportIssueButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  reportIssueIcon: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  reportIssueText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
});

export default Transaction;
