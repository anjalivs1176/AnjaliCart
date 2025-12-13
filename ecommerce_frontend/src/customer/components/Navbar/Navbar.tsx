import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategorySheet from "./CategorySheet";
import { mainCategory } from "../../../data/category/mainCategory";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  // ------- Helpers -------
  const getToken = () => localStorage.getItem("token");
  const getUser = () => {
    const raw = localStorage.getItem("user");
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  // ------- State -------
  const [token, setToken] = useState<string | null>(getToken());
  const [authUser, setAuthUser] = useState<any>(getUser());
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  // ------- Avatar Data -------
  const userName = authUser?.name || "User";
  const userImage = authUser?.profileImage || null;

  // ------- Listen for ANY login/logout changes -------
  useEffect(() => {
    const updateAuth = () => {
      setToken(getToken());
      setAuthUser(getUser());
    };

    window.addEventListener("authChange", updateAuth);
    return () => window.removeEventListener("authChange", updateAuth);
  }, []);

  return (
    <>
      <Box className="fixed top-0 left-0 right-0 bg-white shadow-sm" sx={{ zIndex: 60 }}>
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 h-[70px] bg-white">

          {/* ---------- LOGO + CATEGORY ---------- */}
          <div className="flex items-center gap-4 md:gap-9">

            <div className="flex items-center gap-2">
              {!isLarge && (
                <IconButton onClick={() => setOpenDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              )}

              <h1
                className="cursor-pointer text-xl md:text-2xl text-primary-color font-semibold"
                onClick={() => navigate("/")}
              >
                AnjaliCart
              </h1>
            </div>

            {isLarge && (
              <ul className="flex items-center font-medium text-gray-800">
                {mainCategory.map((item) => (
                  <li
                    key={item.categoryId}
                    onMouseEnter={() => {
                      setShowCategorySheet(true);
                      setSelectedCategory(item.categoryId);
                    }}
                    onMouseLeave={() => setShowCategorySheet(false)}
                    className="hover:text-primary-color hover:border-b-2 h-[70px] px-4 
                               border-primary-color flex items-center cursor-pointer transition"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ---------- RIGHT SIDE ICONS ---------- */}
          <div className="flex items-center gap-1 sm:gap-3 md:gap-4 lg:gap-6">

            <IconButton><SearchIcon /></IconButton>

            {/* ---------- USER / LOGIN ---------- */}
            {token ? (
              <Button className="flex items-center gap-2">
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  src={userImage || undefined}
                  onClick={() => navigate("/account/orders")}
                >
                  {!userImage && userName.charAt(0).toUpperCase()}
                </Avatar>

                <h1 className="font-semibold hidden lg:block">
                  {userName}
                </h1>
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                variant="contained"
                className="px-3 sm:px-5"
              >
                Login
              </Button>
            )}

            <IconButton onClick={() => navigate("/wishlist")}>
              <FavoriteBorderIcon sx={{ fontSize: 26 }} />
            </IconButton>

            <IconButton onClick={() => navigate("/cart")}>
              <AddShoppingCartIcon sx={{ fontSize: 28 }} />
            </IconButton>

            {isLarge && (
              <Button
                onClick={() => navigate("/become-seller")}
                startIcon={<StorefrontIcon />}
                variant="outlined"
                className="px-4"
              >
                Become Seller
              </Button>
            )}
          </div>
        </div>

        {/* ---------- CATEGORY DROPDOWN ---------- */}
        {isLarge && showCategorySheet && (
          <div
            className="fixed left-4 right-4 sm:left-6 sm:right-6 md:left-10 md:right-10 lg:left-20 lg:right-20
                       top-[70px] bg-white border shadow-lg rounded-md 
                       max-h-[450px] overflow-y-auto p-5"
            style={{ zIndex: 70 }}
            onMouseEnter={() => setShowCategorySheet(true)}
            onMouseLeave={() => setShowCategorySheet(false)}
          >
            <CategorySheet selectedCategory={selectedCategory} />
          </div>
        )}
      </Box>

      {/* filler height */}
      <div className="h-[70px]"></div>
    </>
  );
};

export default Navbar;
