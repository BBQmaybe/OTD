from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from PIL import Image, ImageOps
import io
import requests

app = FastAPI(
    title="My RAG API",
    description="Сервер для постов и инвертирования изображений",
    version="1.0.0"
)

# Разрешаем доступ React-приложению
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # можно ограничить ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

POSTS_URL = "https://jsonplaceholder.typicode.com/posts"

# ----------------------------
#       ЭНДПОИНТ №1 — Посты
# ----------------------------
@app.get("/posts")
def get_posts():
    response = requests.get(POSTS_URL)
    return response.json()


# ----------------------------------------
#     ЭНДПОИНТ №2 — Инвертирование фото
# ----------------------------------------
@app.post("/invert-image")
async def invert_image(file: UploadFile = File(...)):
    # читаем файл
    contents = await file.read()

    image = Image.open(io.BytesIO(contents))
    image = image.convert("RGB")

    # инвертируем
    inverted = ImageOps.invert(image)

    # сохраняем в буфер
    buf = io.BytesIO()
    inverted.save(buf, format="PNG")
    buf.seek(0)

    return {
        "filename": file.filename,
        "image_bytes": buf.getvalue().hex()  # отправим hex, React распарсит
    }
