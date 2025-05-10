import { configureStore } from "@reduxjs/toolkit";
import hfBanksReducer from "./features/HFBank/HFBankSlice"; // Adjust the import path as necessary
import adityaReducer from "./features/AdityaBank/adityaSlice"; // Adjust the import path as necessary
import primalReducer from "./features/Primal/piramalSlice"; // Adjust the import path as necessary
import iciciBankReducer from "./features/IciciBank/iciciBankSlice";
import iciciHFCReducer from "./features/IciciHfCBank/iciciHFCBankSlice"; 
import FedralReducer from "./features/FedralBankForm/FedralBankSlice"; 
import SamstaFlnReducer from "./features/SamstaflnBankForm/SamstaflnBankSlice";
// Adjust the import path as necessary
// Adjust the import path as necessary

export const store = configureStore({
  reducer: {
    hfBanks: hfBanksReducer,
    aditya: adityaReducer,
    icici: iciciBankReducer, // Assuming you want to use the same reducer for ICICI Bank
    primal: primalReducer,
    iciciHFC: iciciHFCReducer,
    Fedral: FedralReducer,
    Samsta:  SamstaFlnReducer
    
  },
});
