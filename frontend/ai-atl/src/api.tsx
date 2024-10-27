// src/api.tsx
import axios from "axios";
import {
  Customer,
  CreateCustomerData,
  DrivingSession,
  CreateSessionData,
} from "./types";

// Base URL for the API; consider moving this to an .env file for flexibility
const API_BASE_URL = "http://127.0.0.1:8000/api";

// Fetch all customers with an optional search query
export const fetchCustomers = async (searchQuery = ""): Promise<Customer[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customers/`, {
      params: { search: searchQuery },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

// Create a new customer
export const createCustomer = async (
  customerData: CreateCustomerData
): Promise<Customer> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customers`,
      customerData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

// Fetch all driving sessions (driver history) for a specific customer with an optional status filter
export const fetchCustomerSessions = async (
  customerId: number,
  statusFilter = ""
): Promise<DrivingSession[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/sessions/customer/${customerId}`,
      {
        params: { status: statusFilter },
      }
    );
    console.log("Session data:", response.data); // Log to check structure
    return response.data;
  } catch (error) {
    console.error(`Error fetching sessions for customer ${customerId}:`, error);
    throw error;
  }
};

// Create a new driving session (driver history entry)
export const createDrivingSession = async (
  sessionData: CreateSessionData
): Promise<DrivingSession> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sessions/`, sessionData);
    return response.data;
  } catch (error) {
    console.error("Error creating driving session:", error);
    throw error;
  }
};

// Update an existing customer by ID with partial data
export const updateCustomer = async (
  customerId: number,
  updatedData: Partial<Customer>
): Promise<Customer> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/customers/${customerId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating customer ${customerId}:`, error);
    throw error;
  }
};

export const updateDrivingSession = async (
  sessionId: number,
  updatedData: Partial<DrivingSession>
): Promise<DrivingSession> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/sessions/${sessionId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating session ${sessionId}:`, error);
    throw error;
  }
};

export const deleteDrivingSession = async (
  sessionId: number
): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/sessions/${sessionId}`);
  } catch (error) {
    console.error(`Error deleting session ${sessionId}:`, error);
    throw error;
  }
};
