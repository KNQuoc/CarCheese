import React from "react";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ExcelDataGrid from "./pages/ExcelDataGrid";
import Landing from "./pages/Landing";
import CustomerProfile from "./pages/CustomerProfiles";

const App = () => {
  return (
    <Routers>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ExcelDataGrid" element={<ExcelDataGrid />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/CustomerProfile" element={<CustomerProfile />} />
      </Routes>
    </Routers>
  );
};

export default App;
