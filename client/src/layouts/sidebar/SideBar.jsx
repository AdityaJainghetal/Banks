import { useState } from "react";
import { Menu } from "lucide-react";
import MenuItems from "./MenuItems";
import { Drawer } from "antd";
import Header from "../../components/Navbar";
// import "antd/dist/antd.min.css"; // Ensure AntD styles are applied

const SideBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
    {/* <Header/> */}
      {/* Desktop Sidebar */}
      <div className='hidden lg:flex   h-screen w-64 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.05)] rounded-r-2xl border-r border-gray-200 p-4'>
        <MenuItems />
      </div>

      {/* Mobile Menu Toggle */}
      <div className='bg-[#C40C0C] p-4 flex items-center justify-between lg:hidden shadow-md'>
        <button
          className='text-white focus:outline-none'
          onClick={() => setShowMobileMenu(true)}
        >
          <Menu size={24} />
        </button>
        <h1 className='text-white font-semibold text-lg'>Menu</h1>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        open={showMobileMenu}
        placement='left'
        width={280}
        onClose={() => setShowMobileMenu(false)}
        bodyStyle={{
          padding: "20px",
          background: "#ffffff",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.05)",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
        headerStyle={{ display: "none" }}
        closable={false}
      >
        <div className='flex justify-end mb-4'>
          <button
            className='text-gray-600 hover:text-red-600 transition'
            onClick={() => setShowMobileMenu(false)}
          >
            ✕
          </button>
        </div>
        <MenuItems />
      </Drawer>
    </>
  );
};

export default SideBar;
