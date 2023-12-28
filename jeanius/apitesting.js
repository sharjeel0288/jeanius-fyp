const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const url = "http://localhost:8000/api/color-match/";

// Create a FormData object
const formData = new FormData();

// Append files to the FormData object
formData.append('image1', fs.createReadStream('E:/study/FYP/fyp_dev/colorMatching/j1.jpg'), 'test1.jpg');
formData.append('image2', fs.createReadStream('E:/study/FYP/fyp_dev/colorMatching/j2.jpg'), 'test2.jpg');

// Send the request using axios
axios.post(url, formData, {
  headers: {
    ...formData.getHeaders(),
  },
})
  .then(response => {
    // Handle the response data
    console.log(response.status);
    console.log(response.data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
