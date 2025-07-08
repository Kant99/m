import axios from 'axios';

const apiConnector = {
  baseUrl: "http://192.168.1.9:4000", // Default base URL from Postman collection
  jwtToken: null, // Store JWT token for authenticated requests

  // Set JWT token for authenticated requests
  setToken(token) {
    this.jwtToken = token;
  },

  // Common Routes
  async sendPhoneOTP(phoneNumber) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/otp`, { phoneNumber });
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error(`Send OTP failed: ${error.response?.data?.message || error.message}`);
    }
  },

  async login(phoneNumber, otp) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/auth/login`, { phoneNumber, otp });
      console.log(response)
      if (response.data.token) {
        this.setToken(response.data.token); // Store JWT token
      }
      return response.data;
    } catch (error) {
      throw new Error(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  },

  // Wholesaler Routes
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

  // Product Routes
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

  async getAllProducts() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/wholesaler/product`, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Get all products failed: ${error.response?.data?.message || error.message}`);
    }
  },

  async getVerifiedProducts() {
    try {
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

  async getPendingProducts() {
    try {
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

  async getRejectedProducts() {
    try {
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

  async updateProduct(productId, productData, productImage) {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        formData.append(key, typeof productData[key] === "object" ? JSON.stringify(productData[key]) : productData[key]);
      });
      if (productImage) {
        formData.append("productImage", productImage);
      }

      const response = await axios.put(`${this.baseUrl}/api/wholesaler/product/${productId}`, formData, {
        headers: {
          ...(this.jwtToken && { Authorization: `Bearer ${this.jwtToken}` }),
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Update product failed: ${error.response?.data?.message || error.message}`);
    }
  },

  async deleteProduct(productId) {
    try {
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

  async getOutOfStockProducts() {
    try {
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

  async getHighPriceProducts() {
    try {
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

  async getExpiringPriceProducts() {
    try {
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

  async searchProducts({ searchQuery, minPrice, maxPrice, inStock, limit, customFilters }) {
    try {
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
};

export default apiConnector;