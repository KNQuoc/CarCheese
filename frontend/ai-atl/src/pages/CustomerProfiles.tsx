// src/pages/CustomerProfilesPage.tsx

import React, { useState, useEffect, ChangeEvent } from "react";
import {
  fetchCustomers,
  createCustomer,
  fetchCustomerSessions,
  createDrivingSession,
  updateCustomer,
} from "../api";
import {
  Customer,
  CreateCustomerData,
  DrivingSession,
  CreateSessionData,
} from "../types";

const CustomerProfilesPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [viewingSessions, setViewingSessions] = useState<DrivingSession[]>([]);
  const [showSessions, setShowSessions] = useState(false);
  const [addingSession, setAddingSession] = useState(false);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState<CreateCustomerData>({
    name: "",
    age: 0,
    contactInfo: { email: "", phone: "", address: "" },
  });
  const [newSession, setNewSession] = useState<CreateSessionData>({
    customerId: 0,
    driverScore: 50,
    status: "PENDING",
  });

  // Load all customers
  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // Set the selected customer and load their sessions
  const handleViewSessions = async (customer: Customer) => {
    try {
      const sessions = await fetchCustomerSessions(customer.id);
      setViewingSessions(sessions);
      setShowSessions(true);
      setSelectedCustomer(customer);
    } catch (error) {
      console.error("Error loading sessions:", error);
    }
  };

  // Handle changes to the new customer form
  const handleNewCustomerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a new customer
  const handleAddCustomer = async () => {
    try {
      await createCustomer(newCustomer);
      setIsAddingCustomer(false);
      loadCustomers();
      setNewCustomer({
        name: "",
        age: 0,
        contactInfo: { email: "", phone: "", address: "" },
      });
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  // Update customer information
  const handleUpdateCustomer = async () => {
    if (selectedCustomer) {
      try {
        await updateCustomer(selectedCustomer.id, selectedCustomer);
        loadCustomers();
        setSelectedCustomer(null);
        setIsEditingCustomer(false);
      } catch (error) {
        console.error("Error updating customer:", error);
      }
    }
  };

  // Handle changes for adding a new session
  const handleNewSessionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewSession((prev) => ({
      ...prev,
      [name]: name === "driverScore" ? parseFloat(value) : value,
    }));
  };

  // Add a new session for the selected customer
  const handleAddSession = async () => {
    if (selectedCustomer) {
      try {
        await createDrivingSession({
          ...newSession,
          customerId: selectedCustomer.id,
        });
        setAddingSession(false);
        handleViewSessions(selectedCustomer);
      } catch (error) {
        console.error("Error creating session:", error);
      }
    }
  };

  const handleDownloadFile = () => {
    const fileUrl = `http://localhost:5000/download/shared-file`;
    window.open(fileUrl, "_blank");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Driver Profiles</h1>

      <button
        onClick={() => setIsAddingCustomer(true)}
        className="mb-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Add New Customer
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="p-4 border rounded hover:bg-gray-50">
            <h3 className="text-lg font-semibold flex items-center">
              {customer.name}
              <button
                onClick={handleDownloadFile}
                className="ml-4 px-2 py-1 text-sm border rounded bg-blue-500 text-white hover:bg-blue-600">
                Download Invoice
              </button>
            </h3>
            <p className="text-sm">Email: {customer.contactInfo.email}</p>
            <p className="text-sm">Phone: {customer.contactInfo.phone}</p>
            <p className="text-sm">Address: {customer.contactInfo.address}</p>
            <button
              onClick={() => handleViewSessions(customer)}
              className="mt-2 px-4 py-1 border rounded bg-gray-500 text-white hover:bg-gray-600">
              View Driver Sessions
            </button>
            <button
              onClick={() => {
                setSelectedCustomer(customer);
                setIsEditingCustomer(true);
              }}
              className="mt-2 px-4 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600">
              Edit Profile
            </button>
            <button
              onClick={() => {
                setSelectedCustomer(customer);
                setAddingSession(true);
              }}
              className="mt-2 px-4 py-1 border rounded bg-green-500 text-white hover:bg-green-600">
              Add Driving Session
            </button>
          </div>
        ))}
      </div>

      {/* Form for adding a new customer */}
      {isAddingCustomer && (
        <div className="border rounded p-4 mt-4">
          <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={newCustomer.name}
              onChange={handleNewCustomerChange}
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Age:
            <input
              type="number"
              name="age"
              value={newCustomer.age}
              onChange={(e) =>
                setNewCustomer((prev) => ({
                  ...prev,
                  age: parseInt(e.target.value, 10),
                }))
              }
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={newCustomer.contactInfo.email}
              onChange={(e) =>
                setNewCustomer((prev) => ({
                  ...prev,
                  contactInfo: {
                    ...prev.contactInfo,
                    email: e.target.value,
                  },
                }))
              }
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Phone:
            <input
              type="text"
              name="phone"
              value={newCustomer.contactInfo.phone}
              onChange={(e) =>
                setNewCustomer((prev) => ({
                  ...prev,
                  contactInfo: {
                    ...prev.contactInfo,
                    phone: e.target.value,
                  },
                }))
              }
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Address:
            <input
              type="text"
              name="address"
              value={newCustomer.contactInfo.address}
              onChange={(e) =>
                setNewCustomer((prev) => ({
                  ...prev,
                  contactInfo: {
                    ...prev.contactInfo,
                    address: e.target.value,
                  },
                }))
              }
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <button
            onClick={handleAddCustomer}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-4">
            Add Customer
          </button>
          <button
            onClick={() => setIsAddingCustomer(false)}
            className="px-4 py-2 border rounded mt-4 ml-2 hover:bg-gray-100">
            Cancel
          </button>
        </div>
      )}

      {/* Form for editing a customer */}
      {isEditingCustomer && selectedCustomer && (
        <div className="border rounded p-4 mt-4">
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={selectedCustomer.name}
              onChange={(e) =>
                setSelectedCustomer((prev) =>
                  prev ? { ...prev, name: e.target.value } : prev
                )
              }
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Age:
            <input
              type="number"
              name="age"
              value={selectedCustomer.age}
              onChange={(e) =>
                setSelectedCustomer((prev) =>
                  prev ? { ...prev, age: parseInt(e.target.value, 10) } : prev
                )
              }
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={selectedCustomer.contactInfo.email}
              onChange={(e) =>
                setSelectedCustomer((prev) =>
                  prev
                    ? {
                        ...prev,
                        contactInfo: {
                          ...prev.contactInfo,
                          email: e.target.value,
                        },
                      }
                    : prev
                )
              }
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Phone:
            <input
              type="text"
              name="phone"
              value={selectedCustomer.contactInfo.phone}
              onChange={(e) =>
                setSelectedCustomer((prev) =>
                  prev
                    ? {
                        ...prev,
                        contactInfo: {
                          ...prev.contactInfo,
                          phone: e.target.value,
                        },
                      }
                    : prev
                )
              }
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Address:
            <input
              type="text"
              name="address"
              value={selectedCustomer.contactInfo.address}
              onChange={(e) =>
                setSelectedCustomer((prev) =>
                  prev
                    ? {
                        ...prev,
                        contactInfo: {
                          ...prev.contactInfo,
                          address: e.target.value,
                        },
                      }
                    : prev
                )
              }
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <button
            onClick={handleUpdateCustomer}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4">
            Save Changes
          </button>
          <button
            onClick={() => setIsEditingCustomer(false)}
            className="px-4 py-2 border rounded mt-4 ml-2 hover:bg-gray-100">
            Cancel
          </button>
        </div>
      )}

      {/* Driving Session History */}
      {showSessions && (
        <div className="border rounded p-4 mt-4">
          <h2 className="text-xl font-bold mb-4">Driving Session History</h2>
          <button
            onClick={() => setShowSessions(false)}
            className="mb-4 px-4 py-2 border rounded bg-red-500 text-white hover:bg-red-600">
            Close
          </button>
          {viewingSessions.length > 0 ? (
            viewingSessions.map((session) => (
              <div key={session.id} className="p-2 border rounded mb-2">
                <p>Session ID: {session.id}</p>
                <p>Driver Score: {session.driverScore}</p>{" "}
                {/* Confirm driverScore here */}
                <p>Status: {session.status}</p>
              </div>
            ))
          ) : (
            <p>No driving sessions available.</p>
          )}
        </div>
      )}
      {/* Form for adding a new driving session */}
      {addingSession && (
        <div className="border rounded p-4 mt-4">
          <h2 className="text-xl font-bold mb-4">Add New Driving Session</h2>
          <label className="block mb-2">
            Driver Score:
            <input
              type="number"
              name="driverScore"
              value={newSession.driverScore}
              onChange={handleNewSessionChange}
              className="w-full p-2 border rounded mt-1"
            />
          </label>
          <label className="block mb-2">
            Status:
            <select
              name="status"
              value={newSession.status}
              onChange={handleNewSessionChange}
              className="w-full p-2 border rounded mt-1">
              <option value="APPROVED">Approved</option>
              <option value="DENIED">Denied</option>
              <option value="PENDING">Pending</option>
            </select>
          </label>
          <button
            onClick={handleAddSession}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-4">
            Add Session
          </button>
          <button
            onClick={() => setAddingSession(false)}
            className="px-4 py-2 border rounded mt-4 ml-2 hover:bg-gray-100">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerProfilesPage;
