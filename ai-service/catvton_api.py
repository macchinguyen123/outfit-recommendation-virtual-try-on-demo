"""
AI Microservice: CatVTON Virtual Try-On API (FastAPI)
Đề tài KLTN: Outfit Recommendation & Virtual Try-On
Mô hình: CatVTON (Chong et al., 2024)
"""

import io
import os
import base64
from typing import Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from PIL import Image

app = FastAPI(title="CatVTON AI Inference Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Biến lưu trữ Pipeline CatVTON
pipeline = None

def load_catvton_pipeline():
    global pipeline
    try:
        import torch
        from diffusers import AutoencoderKL
        # Lưu ý: Khi chạy trên Google Colab với GPU T4:
        print("Đang khởi tạo mô hình CatVTON...")
        device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"Device: {device}")
        
        # Thư viện pipeline CatVTON từ repo chính thức:
        # git clone https://github.com/Zheng-Chong/CatVTON.git
        from model.cloth_masker import AutoMasker
        from model.pipeline import CatVTONPipeline
        
        pipeline = CatVTONPipeline.from_pretrained(
            "zhengchong/CatVTON",
            torch_dtype=torch.float16 if device == "cuda" else torch.float32
        )
        if device == "cuda":
            pipeline.to(device)
        print("Đã tải CatVTON thành công!")
    except Exception as e:
        print(f"Chạy ở chế độ mô phỏng hoặc thiếu thư viện: {e}")
        pipeline = None

class TryOnUrlRequest(BaseModel):
    person_image_url: str
    garment_image_url: str
    category: str = "upper_body"  # 'upper_body', 'lower_body', 'overall'
    num_inference_steps: int = 40
    guidance_scale: float = 2.5

@app.get("/")
def health_check():
    return {
        "status": "online",
        "model": "CatVTON (Diffusion Based)",
        "loaded": pipeline is not None
    }

@app.post("/api/v1/tryon")
async def process_tryon(
    person_image: UploadFile = File(...),
    garment_image: UploadFile = File(...),
    category: str = Form("upper_body") # upper_body, lower_body, overall
):
    """
    Thực hiện Virtual Try-On với mô hình CatVTON:
    - category: 'upper_body' (Áo), 'lower_body' (Quần), 'overall' (Đầm)
    """
    try:
        person_bytes = await person_image.read()
        garment_bytes = await garment_image.read()
        
        person_pil = Image.open(io.BytesIO(person_bytes)).convert("RGB")
        garment_pil = Image.open(io.BytesIO(garment_bytes)).convert("RGB")
        
        # Resize về kích thước chuẩn của VITON-HD / DressCode (768, 1024) hoặc (384, 512)
        person_pil = person_pil.resize((768, 1024))
        garment_pil = garment_pil.resize((768, 1024))
        
        if pipeline is not None:
            # Gọi suy luận thực tế với CatVTON
            results = pipeline(
                image=person_pil,
                condition_image=garment_pil,
                num_inference_steps=40,
                guidance_scale=2.5,
                category=category
            )
            result_img = results[0]
        else:
            # Fallback nếu test môi trường không có GPU
            result_img = person_pil

        # Trả về ảnh kết quả dưới dạng Base64
        buf = io.BytesIO()
        result_img.save(buf, format="JPEG", quality=90)
        img_str = base64.b64encode(buf.getvalue()).decode("utf-8")
        
        return {
            "status": "SUCCESS",
            "model": "CatVTON",
            "category": category,
            "result_image_base64": f"data:image/jpeg;base64,{img_str}"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    load_catvton_pipeline()
    uvicorn.run(app, host="0.0.0.0", port=8000)

