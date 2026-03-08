import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://stratumx.onrender.com/api";

export const trackOrder = async (orderNumber) => {
  try {
    const response = await axios.get(`${API_URL}/orders/track/${orderNumber}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
