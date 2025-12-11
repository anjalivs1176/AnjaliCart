import api from "../config/api"

export const getActiveCoupons = async () => {
  const res = await api.get("/api/coupons/active");
  return res.data;
};
