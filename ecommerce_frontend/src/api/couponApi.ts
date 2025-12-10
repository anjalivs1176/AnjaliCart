export const getActiveCoupons = async () => {
  const token = localStorage.getItem("token") || "";

  const res = await fetch("${process.env.REACT_APP_API_URL}/api/coupons/active", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  return res.json();
};
