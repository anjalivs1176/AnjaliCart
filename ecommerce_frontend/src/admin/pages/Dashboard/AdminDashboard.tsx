import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AdminDrawerList from '../../components/AdminDrawerList';
import AdminRoutes from '../../../Routes/AdminRoutes';

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="h-screen flex flex-col">

      {/* MOBILE NAVBAR */}
      <div className="lg:hidden flex items-center px-4 py-3 shadow-md">
        <IconButton onClick={toggleDrawer}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <h1 className="text-xl font-semibold ml-3">Admin Panel</h1>
      </div>

      <div className="flex flex-1">

        {/* SIDEBAR — ONLY LARGE SCREEN */}
        <section className="hidden lg:block h-full">
          <AdminDrawerList toggleDrawer={toggleDrawer} />
        </section>

        {/* DRAWER FOR MOBILE */}
        <Drawer open={open} onClose={toggleDrawer}>
          <AdminDrawerList toggleDrawer={toggleDrawer} />
        </Drawer>

        {/* ROUTES / MAIN CONTENT */}
        <section className="p-6 w-full overflow-y-auto lg:w-[80%]">
          <AdminRoutes />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
