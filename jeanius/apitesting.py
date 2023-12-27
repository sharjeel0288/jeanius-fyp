import requests

url = "http://localhost:8000/api/color-match/"  # Replace with your actual API endpoint

# Prepare the files
files = {
    'image1': ('test1.jpg', open('E:/study/FYP/fyp_dev/colorMatching/j1.jpg', 'rb'), 'image/jpg'),
    'image2': ('test2.jpg', open('E:/study/FYP/fyp_dev/colorMatching/j2.jpg', 'rb'), 'image/jpg'),
}

# Send the request
response = requests.post(url, files=files)

# Print the response
print(response.status_code)
print(response.json())