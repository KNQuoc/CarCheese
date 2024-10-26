// src/api.tsx
import axios from "axios";
import {
  Customer,
  CreateCustomerData,
  DrivingSession,
  CreateSessionData,
} from "./types";

const API_BASE_URL = "http://127.0.0.1:8000";

// Fetch all customers
export const fetchCustomers = async (searchQuery = ""): Promise<Customer[]> => {
  const response = await axios.get(`${API_BASE_URL}/customers`, {
    params: { search: searchQuery },
  });
  return response.data;
};

// Create a new customer
export const createCustomer = async (
  customerData: CreateCustomerData
): Promise<Customer> => {
  const response = await axios.post(`${API_BASE_URL}/customers`, customerData);
  return response.data;
};

// Fetch all driving sessions for a customer
export const fetchCustomerSessions = async (
  customerId: number,
  statusFilter = ""
): Promise<DrivingSession[]> => {
  const response = await axios.get(
    `${API_BASE_URL}/sessions/customer/${customerId}`,
    {
      params: { status: statusFilter },
    }
  );
  return response.data;
};

// Create a new driving session
export const createDrivingSession = async (
  sessionData: CreateSessionData
): Promise<DrivingSession> => {
  const response = await axios.post(`${API_BASE_URL}/sessions`, sessionData);
  return response.data;
};

// Update an existing customer
export const updateCustomer = async (
  customerId: number,
  updatedData: Partial<Customer>
): Promise<Customer> => {
  const response = await axios.put(
    `${API_BASE_URL}/customers/${customerId}`,
    updatedData
  );
  return response.data;
};
