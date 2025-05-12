import React from "react";
import { Route, Routes } from "react-router-dom";
import SideBar from "../layouts/sidebar/SideBar";
import HomeFirstBank from "../pages/Bank-Form/Home-FirstBank/HomeFirstBank";
import BankHomePage from "../pages/1Bank-Home/BankHomePage";
import Dashboard from "../pages/Dashboard/Dashboard";
import HFBankDetails from "../pages/Bank-Details/HFBankDetails";
import IciciBank from "../pages/Bank-Form/Icici-Bank/IciciBank";
import AdityaForm from "../pages/Bank-Form/Adtiya-Bank/AditiyaFrom";
import AdityaDetails from "../pages/Bank-Details/AdityaDetails";
import ICICIBannkDetails from "../pages/Bank-Details/IciciBankDetails";
import Primal from "../pages/Bank-Form/Pirmal-form/Primal";
import PrimalDetails from "../pages/Bank-Details/PrimalDetails";
import ICICIBankForm from "../pages/IdfcFroms/ICICIBankForm";
import ICHFCBankDetails from "../pages/Bank-Details/ICICHFC/ICHFCBankDetails"
import SamstaflnBankForm from "../pages/SamstaflnForm/SamstaflnBankForm";
import SamstaFln from "../pages/Bank-Details/SamstaFln/SamstaFlnDetails";
import FedralBankForm from "../pages/FedralForm/FedralBankForm";
import Fed from "../pages/Bank-Details/Fedral/FedralDetail";
import ProtiumForm from "../pages/ProtiumForm/ProtiumForm";

import ProtiumDeatil from "../pages/ProtiumDetail/ProtiumDetail";

const AppRoutes = () => {
  return (
    <div className='h-screen flex overflow-hidden'>
      {/* Sidebar - Left SIde */}
      <div className='md:w-64 h-full bg-gray-100'>
        <SideBar />
      </div>

      {/* Right Content */}
      <div className='flex-1 overflow-y-auto h-full'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/bank-logo' element={<BankHomePage />} />
          <Route path='/bank/icici' element={<IciciBank />} />
          <Route path='/bank/piramal' element={<Primal />} />
          <Route path='/bank/piramal/:id' element={<PrimalDetails />} />
          <Route path='/bank/icici/:id' element={<ICICIBannkDetails />} />
          <Route path='/bank/home-first' element={<HomeFirstBank />} />
          <Route path='/bank/aditya' element={<AdityaForm />} />
          <Route path='/bank/aditya/:id' element={<AdityaDetails />} />
          <Route path='/bank/home-first/:id' element={<HFBankDetails />} />
          <Route path='/bank/icici-hfc' element={<ICICIBankForm/>} />
          <Route path='/bank/icici-hfc/:id' element={<ICHFCBankDetails/>} />
          <Route path="/bank/samasta" element={<SamstaflnBankForm/>}/>
          <Route path="/bank/samasta/:id" element={<SamstaFln/>}/>
          <Route path="/bank/federal-bank" element={<FedralBankForm/>}/>
          <Route path="/bank/fedral/:id" element={<Fed/>}/>
          <Route path="/bank/protium" element={<ProtiumForm/>}/>
          <Route path="/bank/protium/:id" element={<ProtiumDeatil/>}/>



          
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;
