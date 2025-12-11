import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminApi = {
  // ---------------- SELLERS ----------------
  getSellers: (status?: string) =>
    api.get(`/api/admin/sellers`, { params: { status } }),

  updateSellerStatus: (id: number, status: string) =>
    api.put(`/api/admin/sellers/${id}/status`, { status }),

  // ---------------- COUPONS ----------------
  getCoupons: () => api.get("/api/coupons/admin/all"),
  deleteCoupon: (id: number) => api.delete(`/api/coupons/admin/delete/${id}`),
  createCoupon: (data: any) => api.post("/api/coupons/admin/create", data),

  // ---------------- HOME CATEGORIES ----------------
  getHomeCategories: () => api.get("/api/admin/home-category"),

  createHomeCategory: (data: any) =>
    api.post("/api/admin/home-category", data),

  updateHomeCategory: (id: number, data: any) =>
    api.patch(`/api/admin/home-category/${id}`, data),

  deleteHomeCategory: (id: number) =>
    api.delete(`/api/admin/home-category/${id}`),

  // ---------------- DEALS ----------------
  createDeal: (data: any) => api.post("/api/deals", data),
  getDeals: () => api.get("/api/deals"),
  updateDeal: (id: any, data: any) =>
    api.patch(`/api/deals/${id}`, data),
  deleteDeal: (id: any) => api.delete(`/api/deals/${id}`),

  // ---------------- REAL PRODUCT CATEGORIES ----------------
  createCategory: (data: any) => api.post("/api/categories", data),
  getCategories: () => api.get("/api/categories"),
  updateCategory: (id: number, data: any) =>
    api.put(`/api/categories/${id}`, data),
  deleteCategory: (id: number) =>
    api.delete(`/api/categories/${id}`),
};
