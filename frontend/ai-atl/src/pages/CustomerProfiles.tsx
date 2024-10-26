import React, { useState, ChangeEvent, useEffect } from "react";
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  fetchCustomerSessions,
} from "../api";
import { Customer, CreateCustomerData } from "../types";

const CustomerProfilesPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newCustomer, setNewCustomer] = useState<CreateCustomerData>({
    name: "",
    age: 0,
    contactInfo: { email: "", phone: "", address: "" },
  });

  useEffect(() => {
    const loadCustomers = async () => {
      const data = await fetchCustomers(searchQuery);
      setCustomers(data);
    };
    loadCustomers();
  }, [searchQuery]);

  const handleSelectCustomer = async (customer: Customer) => {
    setSelectedCustomer(customer);
    const sessions = await fetchCustomerSessions(customer.id, statusFilter);
    setSelectedCustomer({ ...customer, drivingSessions: sessions });
    setIsEditing(false);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleStatusFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleSaveCustomer = async () => {
    try {
      if (isEditing && selectedCustomer) {
        const formattedCustomer = {
          ...selectedCustomer,
          contactInfo: selectedCustomer.contactInfo,
        };
        await updateCustomer(selectedCustomer.id, formattedCustomer);
        setIsEditing(false);
        setSelectedCustomer(null);
      } else if (isAdding) {
        const formattedCustomer = {
          ...newCustomer,
          contactInfo: newCustomer.contactInfo,
        };
        await createCustomer(formattedCustomer);
        setIsAdding(false);
        setNewCustomer({
          name: "",
          age: 0,
          contactInfo: { email: "", phone: "", address: "" },
        });
      }

      const updatedCustomers = await fetchCustomers();
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Driver Profiles</h1>

      <input
        type="text"
        placeholder="Search Drivers"
        className="w-full p-2 mb-6 border rounded"
        onChange={handleSearch}
      />

      <button
        onClick={() => setIsAdding(true)}
        className="mb-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Add New Profile
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="p-4 border rounded cursor-pointer hover:bg-gray-50"
            onClick={() => handleSelectCustomer(customer)}>
            <h3 className="text-lg font-semibold">{customer.name}</h3>
            <p>
              Driver Score:{" "}
              {customer.drivingSessions?.[0]?.driverScore || "N/A"}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCustomer(customer);
                setIsEditing(true);
              }}
              className="mt-2 px-4 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600">
              Edit
            </button>
          </div>
        ))}
      </div>

      {(isEditing || isAdding) && (
        <div className="border rounded p-4">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Edit Profile" : "Add New Profile"}
          </h2>
          <input
            type="text"
            placeholder="Name"
            value={isEditing ? selectedCustomer?.name : newCustomer.name}
            onChange={(e) => {
              const name = e.target.value;
              if (isEditing && selectedCustomer) {
                setSelectedCustomer({ ...selectedCustomer, name });
              } else {
                setNewCustomer({ ...newCustomer, name });
              }
            }}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="number"
            placeholder="Age"
            value={
              isEditing ? selectedCustomer?.age || 0 : newCustomer.age || 0
            }
            onChange={(e) => {
              const age = e.target.value ? parseInt(e.target.value, 10) : 0;
              if (!isNaN(age)) {
                if (isEditing && selectedCustomer) {
                  setSelectedCustomer({ ...selectedCustomer, age });
                } else {
                  setNewCustomer({ ...newCustomer, age });
                }
              }
            }}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={
              isEditing
                ? selectedCustomer?.contactInfo.email
                : newCustomer.contactInfo.email
            }
            onChange={(e) => {
              const email = e.target.value;
              if (isEditing && selectedCustomer) {
                setSelectedCustomer({
                  ...selectedCustomer,
                  contactInfo: { ...selectedCustomer.contactInfo, email },
                });
              } else {
                setNewCustomer({
                  ...newCustomer,
                  contactInfo: { ...newCustomer.contactInfo, email },
                });
              }
            }}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Phone"
            value={
              isEditing
                ? selectedCustomer?.contactInfo.phone
                : newCustomer.contactInfo.phone
            }
            onChange={(e) => {
              const phone = e.target.value;
              if (isEditing && selectedCustomer) {
                setSelectedCustomer({
                  ...selectedCustomer,
                  contactInfo: { ...selectedCustomer.contactInfo, phone },
                });
              } else {
                setNewCustomer({
                  ...newCustomer,
                  contactInfo: { ...newCustomer.contactInfo, phone },
                });
              }
            }}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={
              isEditing
                ? selectedCustomer?.contactInfo.address
                : newCustomer.contactInfo.address
            }
            onChange={(e) => {
              const address = e.target.value;
              if (isEditing && selectedCustomer) {
                setSelectedCustomer({
                  ...selectedCustomer,
                  contactInfo: { ...selectedCustomer.contactInfo, address },
                });
              } else {
                setNewCustomer({
                  ...newCustomer,
                  contactInfo: { ...newCustomer.contactInfo, address },
                });
              }
            }}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handleSaveCustomer}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4">
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setIsAdding(false);
              setSelectedCustomer(null);
            }}
            className="px-4 py-2 border rounded mt-4 ml-2 hover:bg-gray-100">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerProfilesPage;
