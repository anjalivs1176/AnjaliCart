import axios from "axios";

export const categoriesApi = {
  getCategories() {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
  },
};
