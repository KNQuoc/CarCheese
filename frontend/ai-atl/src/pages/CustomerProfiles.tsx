import React, { useState, ChangeEvent } from "react";

interface CustomerProfile {
  id: number;
  name: string;
  age: number;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  drivingSessions: Array<{
    sessionId: number;
    driverScore: number;
    status: string;
  }>;
}

const initialCustomers: CustomerProfile[] = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    contactInfo: {
      email: "johndoe@example.com",
      phone: "555-1234",
      address: "123 Maple St.",
    },
    drivingSessions: [
      {
        sessionId: 101,
        driverScore: 55,
        status: "Approved",
      },
      {
        sessionId: 102,
        driverScore: 60,
        status: "Pending",
      },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 30,
    contactInfo: {
      email: "janesmith@example.com",
      phone: "555-5678",
      address: "456 Oak St.",
    },
    drivingSessions: [
      {
        sessionId: 201,
        driverScore: 70,
        status: "Denied",
      },
    ],
  },
];

const CustomerProfilePage = () => {
  const [customers, setCustomers] =
    useState<CustomerProfile[]>(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleSelectCustomer = (customer: CustomerProfile) => {
    setSelectedCustomer(customer);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleStatusFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery)
  );

  const filteredSessions = selectedCustomer?.drivingSessions.filter((session) =>
    statusFilter ? session.status === statusFilter : true
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Driver Profiles</h1>

      <input
        type="text"
        placeholder="Search Drivers"
        className="w-full p-2 mb-6 border rounded"
        onChange={handleSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="p-4 border rounded cursor-pointer hover:bg-gray-50"
            onClick={() => handleSelectCustomer(customer)}>
            <h3 className="text-lg font-semibold">{customer.name}</h3>
            <p>Driver Score: {customer.drivingSessions[0]?.driverScore}</p>
          </div>
        ))}
      </div>

      {selectedCustomer && (
        <div className="space-y-6">
          <div className="border rounded p-4">
            <h2 className="text-xl font-bold mb-4">Driver Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {selectedCustomer.name}
              </p>
              <p>
                <span className="font-medium">Age:</span> {selectedCustomer.age}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {selectedCustomer.contactInfo.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {selectedCustomer.contactInfo.phone}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {selectedCustomer.contactInfo.address}
              </p>
            </div>
          </div>

          <div className="border rounded p-4">
            <h2 className="text-xl font-bold mb-4">Driving Sessions</h2>
            <div className="mb-4">
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="w-full p-2 border rounded">
                <option value="">All</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Denied">Denied</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left font-medium">
                      Session ID
                    </th>
                    <th className="px-4 py-2 text-left font-medium">
                      Driver Score
                    </th>
                    <th className="px-4 py-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSessions?.map((session) => (
                    <tr key={session.sessionId} className="border-b">
                      <td className="px-4 py-2">{session.sessionId}</td>
                      <td className="px-4 py-2">{session.driverScore}</td>
                      <td className="px-4 py-2">{session.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerProfilePage;
