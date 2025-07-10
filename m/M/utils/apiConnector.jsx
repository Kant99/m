import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiConnector = {
  baseUrl: "http://192.168.1.9:4000", // Updated to match the server address from logs
  jwtToken: null,

  // Set JWT token for authenticated requests and store in AsyncStorage
  async setToken(token) {
    this.jwtToken = token;
    console.log("token", token);
    console.log("this.jwtToken", this.jwtToken);
    try {
      await AsyncStorage.setItem('jwtToken', token);
      const storedToken = await AsyncStorage.getItem('jwtToken');
      console.log("Stored jwtToken", storedToken);
    } catch (error) {
      console.error('Failed to save token to AsyncStorage:', error);
    }
  },

  // Load token from AsyncStorage
  async loadToken() {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        this.jwtToken = token;
        console.log("Loaded jwtToken", this.jwtToken);
      }
    } catch (error) {
      console.error('Failed to load token from AsyncStorage:', error);
    }
  },

  // Clear token
  async clearToken() {
    this.jwtToken = null;
    try {
      await AsyncStorage.removeItem('jwtToken');
      console.log('jwtToken cleared from AsyncStorage');
    } catch (error) {
      console.error('Failed to clear token from AsyncStorage:', error);
    }
  },

  // Send OTP to phone number
  async sendPhoneOTP(phoneNumber) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/otp`, { phoneNumber });
      console.log("sendPhoneOTP response", response);
      return response.data;
    } catch (error) {
      throw new Error(`Send OTP failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Login with phone number and OTP
  async login(phoneNumber, otp) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/auth/login`, { phoneNumber, otp });
      console.log("response inside login", response);
      if (response.data.token) {
        await this.setToken(response.data.token); // Store JWT token in memory + AsyncStorage
      }
      return response.data;
    } catch (error) {
      throw new Error(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Wholesaler signup
  async wholesalerSignup({ name, phoneNumber, email, otp }) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/wholesaler/auth/signup`, {
        name,
        phoneNumber,
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Wholesaler signup failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Submit KYC profile
  async submitKYCProfile(kycData) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/wholesaler/auth/kyc/profile`, kycData, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`KYC profile submission failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Submit KYC documents
  async submitKYCDocuments({ wholesalerId, idProof, businessRegistration, addressProof }) {
    try {
      const formData = new FormData();
      formData.append("wholesalerId", wholesalerId);
      formData.append("idProof", idProof);
      formData.append("businessRegistration", businessRegistration);
      formData.append("addressProof", addressProof);

      const response = await axios.post(`${this.baseUrl}/api/wholesaler/auth/kyc/documents`, formData, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`KYC documents submission failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Create product
  async createProduct(productData, productImage) {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        formData.append(key, typeof productData[key] === "object" ? JSON.stringify(productData[key]) : productData[key]);
      });
      if (productImage) {
        formData.append("productImage", productImage);
      }

      const response = await axios.post(`${this.baseUrl}/api/wholesaler/product/create`, formData, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Create product failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Get all products
  async getAllProducts() {
    console.log('inside the getallproducts');
    try {
      if (!this.jwtToken) {
        await this.loadToken(); // Load token if not already set
      }
      console.log("jwtToken", this.jwtToken);
      const response = await axios.get(`${this.baseUrl}/api/wholesaler/product`, {
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
      });
      console.log("response inside the getallproducts connector", response);
      return response.data;
    } catch (error) {
      throw new Error(`Get all products failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Get verified products
  async getVerifiedProducts() {
    try {
      if (!this.jwtToken) {
        await this.loadToken();
      }
      const response = await axios.get(`${this.baseUrl}/api/wholesaler/product/verified`, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Get verified products failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Get pending products
  async getPendingProducts() {
    try {
      if (!this.jwtToken) {
        await this.loadToken();
      }
      const response = await axios.get(`${this.baseUrl}/api/wholesaler/product/pending`, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Get pending products failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Get rejected products
  async getRejectedProducts() {
    try {
      if (!this.jwtToken) {
        await this.loadToken();
      }
      const response = await axios.get(`${this.baseUrl}/api/wholesaler/product/rejected`, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Get rejected products failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Update product
async updateProduct(productId, productData, productImage) {
  try {
    if (!this.jwtToken) {
      console.log('JWT token not found. Loading token...');
      await this.loadToken();
    }

    console.log('Base URL:', this.baseUrl);
    console.log('Product ID:', productId);
    console.log('Preparing form data...', productData);

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      const value = typeof productData[key] === 'object' ? JSON.stringify(productData[key]) : productData[key];
      console.log(`Appending field: ${key} =`, value);
      formData.append(key, value);
    });

    if (productImage) {
      console.log('Appending product image...', {
        uri: productImage.uri,
        type: productImage.type,
        name: productImage.name,
      });
      formData.append('productImage', productImage);
    } else {
      console.log('No product image provided, skipping append.');
    }

    // Log FormData entries
    console.log('FormData entries:');
    for (let pair of formData._parts) {
      console.log(pair);
    }

    const headers = {
      ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
      'Content-Type': 'multipart/form-data',
    };
    console.log('Sending PUT request with headers:', headers);

    const response = await axios.put(`${this.baseUrl}/api/wholesaler/product/${productId}`, formData, {
      headers,
      timeout: 60000, // 60-second timeout
    });

    console.log('Product update successful. Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update product failed:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      request: error.request,
      config: error.config,
    });
    throw new Error(`Update product failed: ${error.response?.data?.message || error.message}`);
  }
},

  // Delete product
  async deleteProduct(productId) {
    try {
      if (!this.jwtToken) {
        await this.loadToken();
      }
      const response = await axios.delete(`${this.baseUrl}/api/wholesaler/product/${productId}`, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Delete product failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Get out-of-stock products
  async getOutOfStockProducts() {
    try {
      if (!this.jwtToken) {
        await this.loadToken();
      }
      const response = await axios.get(`${this.baseUrl}/api/wholesaler/product/expiring-prices`, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Get out-of-stock products failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Get high-price products
  async getHighPriceProducts() {
    try {
      if (!this.jwtToken) {
        await this.loadToken();
      }
      const response = await axios.get(`${this.baseUrl}/api/wholesaler/product/high-price`, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Get high-price products failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Get expiring price products
  async getExpiringPriceProducts() {
    try {
      if (!this.jwtToken) {
        await this.loadToken();
      }
      const response = await axios.get(`${this.baseUrl}/api/wholesaler/product/expiring-prices`, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Get expiring price products failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Search products
  async searchProducts({ searchQuery, minPrice, maxPrice, inStock, limit, customFilters }) {
    try {
      if (!this.jwtToken) {
        await this.loadToken();
      }
      const params = {};
      if (searchQuery) params.searchQuery = searchQuery;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (inStock !== undefined) params.inStock = inStock;
      if (limit) params.limit = limit;
      if (customFilters) params.customFilters = JSON.stringify(customFilters);

      const response = await axios.get(`${this.baseUrl}/api/wholesaler/product/combined-search`, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Search products failed: ${error.response?.data?.message || error.message}`);
    }
  },
  async getAllOrders() {
    try {
      if (!this.jwtToken) {
        await this.loadToken();
      }
      const response = await axios.get(`${this.baseUrl}/api/wholesaler/order`, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
      });
      console.log("getAllOrders response", response);
      return response.data;
    } catch (error) {
      throw new Error(`Get all orders failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Get a single order by ID
  async getOrderById(orderId) {
    try {
      if (!this.jwtToken) {
        await this.loadToken();
      }
      const response = await axios.get(`${this.baseUrl}/api/wholesaler/order/${orderId}`, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
      });
      console.log("getOrderById response", response);
      return response.data;
    } catch (error) {
      throw new Error(`Get order by ID failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Update order status
  async updateOrderStatus(orderId, { status, cancellationReason, notes }) {
    try {
      if (!this.jwtToken) {
        await this.loadToken();
      }
      const response = await axios.patch(`${this.baseUrl}/api/wholesaler/order/${orderId}/status`, {
        status,
        cancellationReason,
        notes,
      }, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
      });
      console.log("updateOrderStatus response", response);
      return response.data;
    } catch (error) {
      throw new Error(`Update order status failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Create a new order (for testing/admin)
  async createOrder({ retailerId, products, deliveryAddress, deliveryDate, orderTotal, paymentMethod, notes, vehicleNumber }) {
    try {
      if (!this.jwtToken) {
        await this.loadToken();
      }
      const response = await axios.post(`${this.baseUrl}/api/wholesaler/order`, {
        retailerId,
        products,
        deliveryAddress,
        deliveryDate,
        orderTotal,
        paymentMethod,
        notes,
        vehicleNumber,
      }, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
      });
      console.log("createOrder response", response);
      return response.data;
    } catch (error) {
      throw new Error(`Create order failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Search/filter orders
  async searchOrders({ status, retailerId, fromDate, toDate, minTotal, maxTotal, paymentMethod, vehicleNumber }) {
    try {
      if (!this.jwtToken) {
        await this.loadToken();
      }
      const params = {};
      if (status) params.status = status;
      if (retailerId) params.retailerId = retailerId;
      if (fromDate) params.fromDate = fromDate;
      if (toDate) params.toDate = toDate;
      if (minTotal) params.minTotal = minTotal;
      if (maxTotal) params.maxTotal = maxTotal;
      if (paymentMethod) params.paymentMethod = paymentMethod;
      if (vehicleNumber) params.vehicleNumber = vehicleNumber;

      console.log("searchOrders params", params);
      const response = await axios.get(`${this.baseUrl}/api/wholesaler/order/search/filter`, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
        params,
      });
      console.log("searchOrders response", response);
      return response.data;
    } catch (error) {
      throw new Error(`Search orders failed: ${error.response?.data?.message || error.message}`);
    }
  },
};

export default apiConnector;