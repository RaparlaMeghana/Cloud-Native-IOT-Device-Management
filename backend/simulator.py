import time           # To create delay between data sends
import requests       # To send HTTP requests
import random         # To generate random sensor values

# URL of your backend API endpoint that receives sensor data
API_URL = "http://localhost:8000/device/update"

def generate_sensor_data():
    """
    Simulate reading from a temperature and humidity sensor.
    Returns:
        dict: A dictionary containing temperature and humidity values.
    """
    temperature = round(random.uniform(25, 35), 2)  # Random temperature between 25°C and 35°C
    humidity = round(random.uniform(40, 70), 2)     # Random humidity between 40% and 70%
    return {"temperature": temperature, "humidity": humidity}

def send_data_to_backend(data):
    """
    Send sensor data to the backend API via a POST request.
    Args:
        data (dict): Sensor data containing temperature and humidity.
    Returns:
        Response status code or error message.
    """
    try:
        response = requests.post(API_URL, json=data)
        # Check if request was successful (status code 2xx)
        if response.status_code == 200:
            print(f"Sent: {data} | Response: {response.status_code} OK")
        else:
            print(f"Sent: {data} | Response: {response.status_code} ERROR")
    except requests.exceptions.RequestException as e:
        print(f"Error sending data: {e}")

def main():
    """
    Main loop: generate sensor data and send it to backend every 5 seconds.
    """
    print("Starting IoT Device Simulator...")
    while True:
        data = generate_sensor_data()      # Get simulated sensor data
        send_data_to_backend(data)         # Send it to backend
        time.sleep(5)                      # Wait for 5 seconds before sending next data

if __name__ == "__main__":
    main()
