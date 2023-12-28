const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// Replace with the actual URL of your API endpoint
const API_ENDPOINT = "http://localhost:8000/api/measurements/";

// Replace with the path to the image file you want to test
const IMAGE_PATH = "E:/study/FYP/fyp_dev/colorMatching/j1.jpg";

// Replace with the actual reference height value
const REFERENCE_HEIGHT = 10.0;

async function testMeasurementApi() {
    try {
        const image = fs.readFileSync(IMAGE_PATH);

        const formData = new FormData();
        formData.append('image', image, { filename: 'j1.jpg' });
        formData.append('reference_height', REFERENCE_HEIGHT);

        const response = await axios.post(API_ENDPOINT, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            const results = response.data;
            console.log("API Response:");
            console.log(results);
        } else {
            console.log("Error:", response.status);
            console.log(response.data);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testMeasurementApi();
