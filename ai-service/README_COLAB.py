# ==============================================================================
# HƯỚNG DẪN CHẠY CATVTON TRÊN GOOGLE COLAB (GPU MIỄN PHÍ) CHO KHOÁ LUẬN TỐT NGHIỆP
# ==============================================================================
# Bước 1: Mở https://colab.research.google.com -> Tạo sổ tay mới (New Notebook).
# Bước 2: Chọn Runtime -> Change runtime type -> Hardware accelerator chọn "T4 GPU" -> Save.
# Bước 3: Copy toàn bộ các khối lệnh bên dưới vào Colab và bấm Chạy (Run).

# --- Cell 1: Clone mã nguồn CatVTON & Cài đặt thư viện ---
"""
!git clone https://github.com/Zheng-Chong/CatVTON.git
%cd CatVTON
!pip install -r requirements.txt
!pip install fastapi uvicorn pyngrok nest-asyncio python-multipart
"""

# --- Cell 2: Tải trọng số Pre-trained weights của CatVTON ---
"""
from huggingface_hub import snapshot_download
snapshot_download(repo_id="zhengchong/CatVTON", local_dir="resource/CatVTON")
"""

# --- Cell 3: Khởi động API Server & Mở cổng Public ra Internet bằng Ngrok ---
"""
from pyngrok import ngrok
import nest_asyncio
import uvicorn

# Đăng ký token miễn phí tại https://dashboard.ngrok.com/get-started/your-authtoken
NGROK_AUTH_TOKEN = "YOUR_NGROK_TOKEN_HERE"  # Thay token ngrok của bạn vào đây
ngrok.set_auth_token(NGROK_AUTH_TOKEN)

# Mở tunnel ra Internet
public_url = ngrok.connect(8000)
print("=" * 60)
print(">>> ĐƯỜNG LINK PUBLIC API CATVTON CỦA BẠN LÀ:")
print(public_url)
print(">>> Hãy copy link này dán vào file application.yml ở Spring Boot!")
print("=" * 60)

nest_asyncio.apply()
# Chạy app FastAPI
# uvicorn.run(app, host="0.0.0.0", port=8000)
"""

