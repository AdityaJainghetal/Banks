import React from "react";
import SideBar from "./layouts/sidebar/SideBar";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import Header from "./components/Navbar";

const App = () => {
  return (
    <div className="">
       <Header/>
      <AppRoutes />
      <Toaster />
    </div>
  );
};

export default App;
