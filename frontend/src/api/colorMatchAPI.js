import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const calculateImageSimilarity = async (image1, image2) => {
    try {
      const formData = new FormData();
      console.log('Image1:', image1);
      console.log('Image2:', image2);
  
      formData.append('image1', image1, 'image1');
      formData.append('image2', image2, 'image2');
  
      const response = await axios.post(`${BASE_URL}/api/color-match/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

export { calculateImageSimilarity };
