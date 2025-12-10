



import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import SellerDrawerList from "../components/SellerDrawerList/SellerDrawerList";
import SellerRoutes from "../../Routes/SellerRoutes";

const SellerDashboard = () => {
  

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full">

      {/* ------- MOBILE NAVBAR ------- */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3 shadow-md">
        <MenuIcon 
          className="text-2xl text-gray-700 cursor-pointer" 
          onClick={toggleDrawer}
        />
        <p className="text-xl font-semibold">Seller Dashboard</p>
        <div></div>
      </div>

      {/* ------- MOBILE DRAWER ------- */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <SellerDrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
      <div className="lg:flex lg:h-[90vh]">
        <section className="hidden lg:block h-full">
          <SellerDrawerList toggleDrawer={toggleDrawer} />
        </section>
        <section className="p-5 w-full lg:w-[80%] overflow-y-auto">
          <SellerRoutes />
        </section>
      </div>
    </div>
  );
};

export default SellerDashboard;
