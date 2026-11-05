# 🌟 AuraFit: AI Outfit Recommendation & Virtual Try-On System

Hệ thống tư vấn phối đồ thông minh và phòng thử đồ ảo (Virtual Try-On) ứng dụng mô hình AI Diffusion kết hợp kiến trúc Full-Stack hiện đại:
- **Frontend**: **ReactJS** (Vite, Tailwind CSS, Lucide Icons, Axios, Context API).
- **Backend**: **Spring Boot (Java 17+)** RESTful API, Spring Data JPA, H2 Database (hỗ trợ chuyển đổi MySQL/PostgreSQL), OpenAPI / Swagger 3.
- **AI Integration**: Kiến trúc tích hợp mô hình **Virtual Try-On Diffusion (IDM-VTON / CatVTON)** với cơ chế Human Pose Estimation, Geometric Cloth Warping và Inpainting Blend.

---

## 🏗️ Kiến Trúc Hệ Thống (Architecture)

```text
outfit-recommendation-virtual-try-on-demo/
│
├── backend/                             # Spring Boot RESTful API Service
│   ├── pom.xml                          # Maven build dependencies
│   └── src/main/
│       ├── java/com/fashionai/tryon/
│       │   ├── TryOnApplication.java    # Main Entry Point
│       │   ├── config/                  # CorsConfig, OpenApiConfig, DataInitializer
│       │   ├── controller/              # ProductController, RecommendationController, TryOnController, OutfitController
│       │   ├── dto/                     # Request / Response DTOs
│       │   ├── model/                   # Product, Outfit, TryOnSession, User, Enums
│       │   ├── repository/              # Spring Data JPA Repositories
│       │   └── service/                 # ProductService, RecommendationService, TryOnService, AiTryOnServiceAdapter
│       └── resources/
│           └── application.yml          # Server port 8080, H2 Console, AI settings
│
└── frontend/                            # ReactJS Web Application
    ├── package.json                     # Dependencies & scripts
    ├── vite.config.js                   # Vite dev server + proxy '/api' -> 8080
    ├── tailwind.config.js               # Luxury fashion-tech dark palette
    ├── index.html                       # Entry HTML with Inter & Playfair Display fonts
    └── src/
        ├── App.jsx                      # Main layout & navigation
        ├── index.css                    # Tailwind CSS + custom glassmorphism styles
        ├── context/TryOnContext.jsx      # Global state for fitting room, models, garments, try-on results
        ├── api/                         # Axios client, productApi, recommendationApi, tryonApi
        ├── components/                  # Navbar, Footer, ProductCard, BeforeAfterSlider
        └── pages/
            ├── HomePage.jsx             # Hero spotlight, 3-step AI workflow, trending outfits
            ├── CatalogPage.jsx          # Tìm kiếm & Lọc sản phẩm (Category, Style, Gender, Keyword)
            ├── StylistPage.jsx          # AI Stylist tư vấn phối đồ theo Dịp, Phong cách, Thời tiết
            ├── TryOnPage.jsx            # Phòng thử đồ ảo (Chọn người mẫu/tải ảnh, gắn đồ, AI Render Before/After)
            └── HistoryPage.jsx          # Lịch sử các phiên thử đồ ảo
```

---

## 🚀 Hướng Dẫn Khởi Chạy (Getting Started)

### 1. Khởi động Backend (Spring Boot)
Yêu cầu: Đã cài đặt **Java 17+** và **Maven**.

```bash
cd backend
mvn spring-boot:run
```
- Máy chủ RESTful API sẽ khởi chạy tại: `http://localhost:8080`
- **Tài liệu Swagger / OpenAPI UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **H2 In-Memory Database Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console) (JDBC URL: `jdbc:h2:mem:fashiondb`, User: `sa`, Password: để trống).
- *Lưu ý*: Dữ liệu mẫu phong phú về sản phẩm và các set đồ đã được tự động nạp sẵn qua `DataInitializer`.

---

### 2. Khởi động Frontend (ReactJS)
Yêu cầu: Đã cài đặt **Node.js 18+** và **npm**.

```bash
cd frontend
npm install
npm run dev
```
- Mở trình duyệt tại: `http://localhost:5173`
- Frontend đã được cấu hình Proxy chuyển tiếp tự động các request `/api/*` về Spring Boot Backend (`http://localhost:8080`).
- Frontend cũng tích hợp sẵn bộ dữ liệu offline dự phòng (`mockData.js`), cho phép bạn trải nghiệm trơn tru giao diện ngay cả khi chưa bật backend.

---

## 💡 Các Tính Năng Nổi Bật

### 1. 🔍 Tìm Kiếm & Lựa Chọn Sản Phẩm (Catalog & Search)
- Tìm kiếm từ khóa theo tên trang phục, màu sắc, phom dáng.
- Bộ lọc đa năng theo: Danh mục (Áo, Quần/Váy, Đầm, Giày dép), Phong cách (Thanh lịch, Thể thao, Đường phố, Tối giản, Dự tiệc), và Đối tượng (Nam, Nữ, Unisex).
- Nút bấm **"Thử đồ ảo"** gắn trực tiếp món đồ vào buồng thử của bạn.

### 2. 🪄 AI Stylist: Tư Vấn Phối Đồ Thông Minh
- Người dùng chọn: Dịp sự kiện (Đi làm, Hẹn hò, Dự tiệc, Dạo phố, Du lịch), Phong cách mong muốn và Thời tiết.
- AI phân tích bánh xe màu sắc, tính toán điểm hài hòa (Harmony Score) và đề xuất trọn bộ outfit cân xứng.
- Nút **"Đưa vào Buồng Thử Ảo"** 1-click tự động xếp nguyên set đồ vào buồng thử đồ.

### 3. ✨ Buồng Thử Đồ Ảo (Virtual Try-On Studio)
- **Lựa chọn người mẫu**: Sử dụng các người mẫu sẵn có (đa dạng giới tính, vóc dáng) hoặc **tải ảnh chân dung của chính bạn lên**.
- **Chọn trang phục ghép thử**: Hỗ trợ thử linh hoạt Áo (Top), Quần/Váy (Bottom) hoặc Đầm (Full-body Dress).
- **AI Diffusion Pipeline**:
  1. *Human Pose Estimation*: Phân tích khung xương và góc đứng của người mẫu.
  2. *Cloth Warping*: Uốn vải theo cử động 3D.
  3. *Diffusion Inpainting & Blending*: Hòa trộn ánh sáng, đổ bóng và nếp nhăn tự nhiên.
- **Thanh trượt Before / After**: Kéo trượt trực tiếp để đối chiếu trước và sau khi AI ghép đồ.
- Nút tải ảnh kết quả độ nét cao về thiết bị.

### 4. 📜 Lịch Sử & Quản Lý Phiên Thử Đồ (History)
- Lưu trữ lịch sử các phiên thử đồ ảo.
- Cho phép xem lại nhanh chóng bất kỳ set đồ nào đã từng thử.

---

## 📡 Danh Sách Các RESTful API Chính (Backend)

| Phương thức | Endpoint | Mô tả |
|---|---|---|
| `GET` | `/api/products` | Lấy danh sách sản phẩm (hỗ trợ lọc theo category, style, gender, price, keyword) |
| `GET` | `/api/products/{id}` | Lấy chi tiết sản phẩm theo ID |
| `POST` | `/api/products` | Thêm mới sản phẩm |
| `POST` | `/api/recommendations` | Gửi yêu cầu tư vấn phối đồ từ AI Stylist |
| `GET` | `/api/outfits` | Lấy các bộ outfit mẫu phối sẵn |
| `POST` | `/api/try-on` | Khởi chạy phiên thử đồ ảo AI (ảnh người mẫu + danh sách mã áo/quần/đầm) |
| `GET` | `/api/try-on/sessions/{code}` | Lấy kết quả của một phiên thử đồ theo mã session |
| `GET` | `/api/try-on/recent` | Lấy danh sách các phiên thử đồ ảo gần nhất |
