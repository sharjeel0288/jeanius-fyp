import requests

# Replace with the actual URL of your API endpoint
API_ENDPOINT = "http://localhost:8000/api/measurements/"

# Replace with the path to the image file you want to test
IMAGE_PATH = "E:/study/FYP/fyp_dev/colorMatching/j1.jpg"

# Replace with the actual reference height value
REFERENCE_HEIGHT = 10.0

def test_measurement_api():
    try:
        files = {"image": open(IMAGE_PATH, "rb")}
        data = {"reference_height": str(REFERENCE_HEIGHT)}

        response = requests.post(API_ENDPOINT, files=files, data=data)

        if response.status_code == 200:
            results = response.json()
            print("API Response:")
            print(results)
        else:
            print("Error:", response.status_code)
            print(response.text)

    except Exception as e:
        print("Error:", str(e))


if __name__ == "__main__":
    test_measurement_api()
