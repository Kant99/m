import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import BottomTab from './BottomTab';

const AccountScreen = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('accounting');
  const [chartPeriod, setChartPeriod] = useState('week');
  const [transactionFilter, setTransactionFilter] = useState('today');

  const weeklyData = [
    { day: 'Mon', amount: 1200 },
    { day: 'Tue', amount: 900 },
    { day: 'Wed', amount: 1400 },
    { day: 'Thu', amount: 2100 },
    { day: 'Fri', amount: 1700 },
    { day: 'Sat', amount: 2600 },
    { day: 'Sun', amount: 1800 },
  ];

  const monthlyData = [
    { day: 'Jan', amount: 15000 },
    { day: 'Feb', amount: 18000 },
    { day: 'Mar', amount: 22000 },
    { day: 'Apr', amount: 20000 },
    { day: 'May', amount: 25000 },
    { day: 'Jun', amount: 28000 },
  ];

  const transactions = [
    {
      id: 'ORD-2505-1234',
      time: 'Today, 10:23 AM',
      amount: '+₹235',
      status: 'Done',
      statusColor: '#4CAF50',
      amountColor: '#4CAF50',
    },
    {
      id: 'ORD-2505-1233',
      time: 'Today, 09:45 AM',
      amount: '-₹180',
      status: 'Pending',
      statusColor: '#FF9800',
      amountColor: '#F44336',
    },
    {
      id: 'ORD-2505-1232',
      time: 'Today, 08:30 AM',
      amount: '+₹450',
      status: 'In Transit',
      statusColor: '#FF9800',
      amountColor: '#4CAF50',
    },
  ];

  const currentData = chartPeriod === 'week' ? weeklyData : monthlyData;
  const maxAmount = Math.max(...currentData.map(d => d.amount));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Mandi Bhai</Text>
          <Text style={styles.vendor}>vendor</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.closedText}>CLOSED</Text>
          <Switch 
            value={isOpen} 
            onValueChange={setIsOpen} 
            trackColor={{ true: '#4CD964', false: '#E0E0E0' }} 
            thumbColor={'#fff'}
            style={styles.toggleSwitch}
          />
        </View>
      </View>

      {/* Accounting Section */}
      <View style={styles.accountingSection}>
        <View style={styles.accountingHeader}>
          <View>
            <Text style={styles.accountingTitle}>Accounting</Text>
            <Text style={styles.accountingSubtitle}>Track your business finances</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editIcon}>✏️</Text>
            <Text style={styles.editText}>Edit Acc Details</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Revenue Cards */}
        <View style={styles.revenueCards}>
          <View style={styles.revenueCard}>
            <Text style={styles.revenueLabel}>Today's Revenue</Text>
            <Text style={styles.revenueAmount}>₹2,450</Text>
            <View style={styles.revenueChange}>
              <Text style={styles.changeIcon}>↗</Text>
              <Text style={styles.changeText}>12% from yesterday</Text>
            </View>
          </View>
          
          <View style={styles.revenueCard}>
            <Text style={styles.revenueLabel}>This Month</Text>
            <Text style={styles.revenueAmount}>₹32,580</Text>
            <View style={styles.revenueChange}>
              <Text style={styles.changeIcon}>↗</Text>
              <Text style={styles.changeText}>8% from last month</Text>
            </View>
          </View>
        </View>

        {/* Revenue Trend Chart */}
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Revenue Trend</Text>
            <View style={styles.chartTabs}>
              <TouchableOpacity 
                style={[styles.chartTab, chartPeriod === 'week' && styles.chartTabActive]}
                onPress={() => setChartPeriod('week')}
              >
                <Text style={[styles.chartTabText, chartPeriod === 'week' && styles.chartTabTextActive]}>
                  Week
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.chartTab, chartPeriod === 'month' && styles.chartTabActive]}
                onPress={() => setChartPeriod('month')}
              >
                <Text style={[styles.chartTabText, chartPeriod === 'month' && styles.chartTabTextActive]}>
                  Month
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Chart */}
          <View style={styles.chart}>
            <View style={styles.chartYAxis}>
              {chartPeriod === 'week' ? (
                <>
                  <Text style={styles.yAxisLabel}>₹3,000</Text>
                  <Text style={styles.yAxisLabel}>₹2,500</Text>
                  <Text style={styles.yAxisLabel}>₹2,000</Text>
                  <Text style={styles.yAxisLabel}>₹1,500</Text>
                  <Text style={styles.yAxisLabel}>₹1,000</Text>
                  <Text style={styles.yAxisLabel}>₹500</Text>
                  <Text style={styles.yAxisLabel}>₹0</Text>
                </>
              ) : (
                <>
                  <Text style={styles.yAxisLabel}>₹30,000</Text>
                  <Text style={styles.yAxisLabel}>₹25,000</Text>
                  <Text style={styles.yAxisLabel}>₹20,000</Text>
                  <Text style={styles.yAxisLabel}>₹15,000</Text>
                  <Text style={styles.yAxisLabel}>₹10,000</Text>
                  <Text style={styles.yAxisLabel}>₹5,000</Text>
                  <Text style={styles.yAxisLabel}>₹0</Text>
                </>
              )}
            </View>
            <View style={styles.chartBars}>
              {currentData.map((data, index) => (
                <View key={index} style={styles.barColumn}>
                  <View 
                    style={[
                      styles.bar, 
                      { height: (data.amount / maxAmount) * 150 }
                    ]} 
                  />
                  <Text style={styles.barLabel}>{data.day}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Transaction Filters */}
        <View style={styles.transactionFilters}>
          <TouchableOpacity 
            style={[styles.filterTab, transactionFilter === 'all' && styles.filterTabActive]}
            onPress={() => setTransactionFilter('all')}
          >
            <Text style={[styles.filterTabText, transactionFilter === 'all' && styles.filterTabTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterTab, transactionFilter === 'today' && styles.filterTabActive]}
            onPress={() => setTransactionFilter('today')}
          >
            <Text style={[styles.filterTabText, transactionFilter === 'today' && styles.filterTabTextActive]}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterTab, transactionFilter === 'range' && styles.filterTabActive]}
            onPress={() => setTransactionFilter('range')}
          >
            <Text style={[styles.filterTabText, transactionFilter === 'range' && styles.filterTabTextActive]}>
              Date Range
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => onNavigate && onNavigate('Transaction')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((transaction, index) => (
            <View key={index} style={styles.transactionCard}>
              <View style={styles.transactionLeft}>
                <Text style={styles.downloadIcon}>⬇</Text>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionId}>{transaction.id}</Text>
                  <Text style={styles.transactionTime}>{transaction.time}</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[styles.transactionAmount, { color: transaction.amountColor }]}>
                  {transaction.amount}
                </Text>
                <Text style={[styles.transactionStatus, { color: transaction.statusColor }]}>
                  {transaction.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Tab */}
      <BottomTab 
        activeTab={activeTab} 
        onTabPress={(tab) => {
          setActiveTab(tab);
          if (tab === 'catalogue' && onNavigate) {
            onNavigate('WholesalerHome');
          } else if (tab === 'orders' && onNavigate) {
            onNavigate('OrderScreen');
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F51B5',
  },
  vendor: {
    fontSize: 12,
    color: '#3F51B5',
    marginLeft: 8,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closedText: {
    marginRight: 8,
    color: '#F44336',
    fontWeight: 'bold',
    fontSize: 14,
  },
  toggleSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  accountingSection: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  accountingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  accountingSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  editText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 18,
  },
  revenueCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 24,
  },
  revenueCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  revenueLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  revenueAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  revenueChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIcon: {
    fontSize: 14,
    color: '#4CAF50',
    marginRight: 4,
  },
  changeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  chartSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chartTabs: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 2,
  },
  chartTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  chartTabActive: {
    backgroundColor: '#3F51B5',
  },
  chartTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  chartTabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  chart: {
    flexDirection: 'row',
    height: 180,
    alignItems: 'flex-end',
  },
  chartYAxis: {
    justifyContent: 'space-between',
    height: 150,
    marginRight: 12,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    minWidth: 40,
  },
  chartBars: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 24,
    backgroundColor: '#3F51B5',
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  transactionFilters: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  filterTabActive: {
    backgroundColor: '#3F51B5',
  },
  filterTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  transactionsSection: {
    marginBottom: 100,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3F51B5',
    fontWeight: '600',
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  downloadIcon: {
    fontSize: 18,
    color: '#666',
    marginRight: 12,
    backgroundColor: '#F5F5F5',
    width: 36,
    height: 36,
    borderRadius: 18,
    textAlign: 'center',
    lineHeight: 36,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 13,
    color: '#666',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  transactionStatus: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default AccountScreen;