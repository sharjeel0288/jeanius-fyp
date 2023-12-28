import axios from "axios";
import { BASE_URL } from "./../utils/constants";

export const getMeasurements = async (measurementData) => {
  try {
    console.log("measurement data: ", measurementData)
    const response = await axios.post(`${BASE_URL}/api/measurements/`, measurementData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.log("error: ", error)
    throw error;
  }
};