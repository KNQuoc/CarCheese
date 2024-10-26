// src/types.ts

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface DrivingSession {
  sessionId: number;
  driverScore: number;
  status: "Approved" | "Denied" | "Pending";
}

export interface Customer {
  id: number;
  name: string;
  age: number;
  contactInfo: ContactInfo;
  drivingSessions: DrivingSession[];
}

export interface CreateCustomerData {
  name: string;
  age: number;
  contactInfo: ContactInfo;
}

export interface CreateSessionData {
  customerId: number;
  driverScore: number;
  status: "Approved" | "Denied" | "Pending";
}
