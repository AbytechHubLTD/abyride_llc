import axios from 'axios';

// Base configuration for reservation API
const RESERVATION_API_BASE_URL = '/api/reservations';
const SERVICE_API_BASE_URL = '/api/service'; // Your existing endpoint

// Configure axios defaults
const apiClient = axios.create({
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.warn('Unauthorized access - redirecting to login');
      // You can add redirect logic here
    }
    return Promise.reject(error);
  }
);

/**
 * Create a new ride reservation
 * @param {Object} reservationData - The reservation data to be sent
 * @returns {Promise<Object>} API response
 */
export const createRideReservation = async (reservationData) => {
  try {
    // Validate required fields before sending
    const requiredFields = [
      'customerFullName',
      'customerEmail',
      'customerPhone',
      'pickupAddress',
      'dropoffAddress',
      'scheduledDateTime',
      'numberOfPassengers'
    ];

    const missingFields = requiredFields.filter(field => !reservationData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Simple data structure with only the required fields
    const reservationPayload = {
      customerFullName: reservationData.customerFullName,
      customerEmail: reservationData.customerEmail,
      customerPhone: reservationData.customerPhone,
      pickupAddress: reservationData.pickupAddress,
      dropoffAddress: reservationData.dropoffAddress,
      scheduledDateTime: reservationData.scheduledDateTime,
      numberOfPassengers: parseInt(reservationData.numberOfPassengers) || 1,
    };

    console.log('Sending reservation data:', reservationPayload);

    // Send to your existing service endpoint
    const response = await apiClient.post(SERVICE_API_BASE_URL, reservationPayload);

    return {
      success: true,
      data: response.data,
      message: 'Reservation created successfully',
    };

  } catch (error) {
    console.error('Reservation creation error:', error);

    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        error: error.response.data,
        message: error.response.data?.message || 'Server error occurred',
        statusCode: error.response.status,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        error: 'Network error',
        message: 'Unable to connect to server. Please check your internet connection.',
      };
    } else {
      // Something else happened
      return {
        success: false,
        error: error.message,
        message: error.message || 'An unexpected error occurred',
      };
    }
  }
};

/**
 * Get reservation by ID
 * @param {string} reservationId - The reservation ID
 * @returns {Promise<Object>} API response
 */
export const getReservationById = async (reservationId) => {
  try {
    const response = await apiClient.get(`${RESERVATION_API_BASE_URL}/${reservationId}`);
    return {
      success: true,
      data: response.data,
      message: 'Reservation retrieved successfully',
    };
  } catch (error) {
    console.error('Get reservation error:', error);
    return {
      success: false,
      error: error.response?.data || error.message,
      message: 'Failed to retrieve reservation',
    };
  }
};

/**
 * Update reservation status
 * @param {string} reservationId - The reservation ID
 * @param {string} status - New status
 * @returns {Promise<Object>} API response
 */
export const updateReservationStatus = async (reservationId, status) => {
  try {
    const response = await apiClient.patch(`${RESERVATION_API_BASE_URL}/${reservationId}/status`, {
      status
    });
    return {
      success: true,
      data: response.data,
      message: 'Reservation status updated successfully',
    };
  } catch (error) {
    console.error('Update reservation status error:', error);
    return {
      success: false,
      error: error.response?.data || error.message,
      message: 'Failed to update reservation status',
    };
  }
};

/**
 * Cancel a reservation
 * @param {string} reservationId - The reservation ID
 * @param {string} reason - Cancellation reason
 * @returns {Promise<Object>} API response
 */
export const cancelReservation = async (reservationId, reason = '') => {
  try {
    const response = await apiClient.delete(`${RESERVATION_API_BASE_URL}/${reservationId}`, {
      data: { reason }
    });
    return {
      success: true,
      data: response.data,
      message: 'Reservation cancelled successfully',
    };
  } catch (error) {
    console.error('Cancel reservation error:', error);
    return {
      success: false,
      error: error.response?.data || error.message,
      message: 'Failed to cancel reservation',
    };
  }
};

/**
 * Get user's reservations
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} API response
 */
export const getUserReservations = async (params = {}) => {
  try {
    const response = await apiClient.get(RESERVATION_API_BASE_URL, { params });
    return {
      success: true,
      data: response.data,
      message: 'Reservations retrieved successfully',
    };
  } catch (error) {
    console.error('Get user reservations error:', error);
    return {
      success: false,
      error: error.response?.data || error.message,
      message: 'Failed to retrieve reservations',
    };
  }
};