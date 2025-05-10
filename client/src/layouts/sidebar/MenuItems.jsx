import {
  Home,
  List,
  LogOut,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { App } from "antd";

const MenuItems = () => {
  const iconSize = 20;
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { message } = App.useApp();

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/",
      icon: <Home size={iconSize} />,
      isActive: currentPath === "/",
    },
    {
      name: "Banks",
      path: "/bank-logo",
      icon: <Home size={iconSize} />,
      isActive: currentPath === "/bank-logo",
    },
    {
      name: "Invoice All",
      path: "/admin/events",
      icon: <List size={iconSize} />,
      isActive: currentPath.includes("/admin/events"),
    },
    { name: "Logout", path: "/logout", icon: <LogOut size={iconSize} /> },
  ];

  const onLogout = () => {
    message.success("Logged Out Successfully");
  };

  return (
    <div className="h-full w-full">
      {/* Logo & Branding */}
      {/* <div className="text-center mb-6">
        <h1 className="text-[#C40C0C] font-extrabold text-2xl leading-tight">
          Unique <br />
          <span className="text-gray-800 text-lg">Engineering</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
      </div> */}

      {/* User Avatar Section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
          A
        </div>
        <div>
          <h1 className="text-gray-800 font-semibold text-md">Abhishek Meena</h1>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-2">
        {adminMenu.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              if (item.name === "Logout") {
                onLogout();
              } else {
                navigate(item.path);
              }
            }}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
              item.isActive
                ? "bg-[#C40C0C] text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
