import axios from "axios";
import { BASE_URL } from "./../utils/constants";

export const getMeasurements = async (measurementData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/measurements/`, measurementData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('response: ', response.data)
    return response.data;
  } catch (error) {
    console.log("error: ", error)
    throw error;
  }
};