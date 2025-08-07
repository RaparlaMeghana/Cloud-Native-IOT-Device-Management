from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import asyncio
import random
import logging

app = FastAPI()

# Enable logging
logging.basicConfig(level=logging.INFO)

# Allow frontend origin (adjust if deployed)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_HISTORY = 20
data_history = []

class SensorData(BaseModel):
    temperature: float
    humidity: float

@app.get("/", tags=["Root"])
def read_root():
    return {"status": "IoT API is running"}

@app.get("/device/latest", response_model=SensorData)
def get_latest_data():
    if data_history:
        return data_history[-1]
    else:
        return {"temperature": 0.0, "humidity": 0.0}

@app.get("/device/history", response_model=List[SensorData])
def get_data_history():
    return data_history

async def generate_data_periodically():
    while True:
        new_data = SensorData(
            temperature=round(random.uniform(20, 35), 2),
            humidity=round(random.uniform(30, 70), 2),
        )
        if len(data_history) >= MAX_HISTORY:
            data_history.pop(0)
        data_history.append(new_data.dict())
        logging.info(f"New data added: 🌡️ {new_data.temperature}°C, 💧 {new_data.humidity}%")
        await asyncio.sleep(5)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(generate_data_periodically())
