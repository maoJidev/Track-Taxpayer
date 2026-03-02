# TackTaxpayer Frontend Documentation (โครงสร้างสถาปัตยกรรมระบบ)

เอกสารฉบับนี้อธิบายโครงสร้างและการทำงานของโปรเจกต์ TackTaxpayer ในส่วนของ Frontend เพื่อให้ผู้พัฒนาเข้าใจภาพรวมและสามารถต่อยอดระบบได้อย่างถูกต้อง

## 🚀 เทคโนโลยีที่ใช้ (Tech Stack)

- **Core**: React.js (Vite)
- **Styling**: Bootstrap 5 + Vanilla CSS (Custom Assets)
- **State Management**: React Context API (สำหรับ Auth) และ Custom Hooks (สำหรับ Business Logic)
- **Networking**: Axios (จัดการการเชื่อมต่อ API แบ่งเป็น Vision API และ Auth API)
- **Routing**: React Router V6

---

## 📂 โครงสร้างโฟลเดอร์ (Folder Structure)

โครงสร้างหลักภายในโฟลเดอร์ `src/` ถูกแบ่งตามหลักการ **Feature-based Architecture**:

### 1. `features/` (โมดูลการทำงานหลัก)

- **`main/`**: เก็บตรรกะส่วนกลาง (Shared Logic)
  - `api/`: การเชื่อมต่อ API หลัก (เช่น `Mainlist.js`)
  - `services/`: Client Configuration (`client.js`) และ Service หลัก (`unifiedService.js`)
  - `components/`: คอมโพเนนต์ที่ใช้ร่วมกัน เช่น `OfficeSelector`, `FilterBar`, `Pagination`
  - `utils/`: ตัวแปลงข้อมูลกลาง (`commonMapper.js`)
- **`auth/`**: จัดการระบบ Login และการเข้าถึง (Authentication Context)
- **`taxpayer/`**: ตรรกะเฉพาะของแต่ละประเภทภาษี (แบ่งเป็น `pnd90`, `pnd91`, `pnd94`)
  - แต่ละโฟลเดอร์ย่อยจะมี `api`, `hooks`, และ `utils/mapper` ของตัวเอง

### 2. `pages/` (หน้าจอการแสดงผล)

- รวบรวมคอมโพเนนต์ระดับหน้าจอ (Screen Components) โดยแบ่งตามกลุ่ม PND
- เช่น `pages/90/TaxpayerList90.jsx` และ `pages/90/TaxpayerDetail90.jsx`

### 3. `layouts/`

- เก็บ Layout หลักของระบบ เช่น `MainLayout.js` ซึ่งรวม Sidebar, Navbar และ Content Area

---

## 🔄 กระแสข้อมูล (Data Flow Architecture)

ระบบใช้รูปแบบการไหลของข้อมูลแบบเป็นลำดับขั้น (Layered Architecture):

1. **API Layer** (`src/features/*/api/*.js`):
    - ติดต่อกับ Backend ผ่าน Axios
    - ส่งค่าดิบ (Raw Data) กลับมายัง Service หรือ Hook
2. **Service Layer** (`src/features/main/services/unifiedService.js`):
    - จัดการตรรกะซับซ้อน เช่น การดึงข้อมูลจากหลายแหล่ง (Enrichment)
    - การจัดการ Cache เบื้องต้น
3. **Mapper Layer** (`src/features/*/utils/*Mapper.js`):
    - แปลงข้อมูลดิบ (Raw API Output) ให้เป็นรูปแบบที่ UI พร้อมใช้งาน (Standard Format)
    - คำนวณค่าทางสถิติหรือจัดกลุ่มข้อมูล
4. **Hook Layer** (`src/features/*/hooks/*.js`):
    - จัดการ State ของข้อมูลในแต่ละหน้าจอ
    - ควบคุมการโหลด (Loading), ข้อผิดพลาด (Error) และการแบ่งหน้า (Pagination)
5. **UI Layer** (`src/pages/*.jsx`):
    - รับข้อมูลจาก Hook มาแสดงผล
    - จัดการ Interaction ของผู้ใช้

---

## ⚙️ การตั้งค่าระบบ (Configuration)

### 1. Environment Variables (`.env`)

- `VITE_BACKEND_IP`: กำหนดเลข IP ของเครื่อง Backend เพื่อใช้ในการทำ Proxy

### 2. Vite Proxy Configuration (`vite.config.js`)

ระบบมีการตั้งค่า Proxy เพื่อหลีกเลี่ยงปัญหา CORS และบริหารจัดการพอร์ต:

- **`/visionapi`**: ส่งต่อไปยัง Legacy Backend (พอร์ต 8080)
- **`/authapi`**: ส่งต่อไปยัง Authentication & Tracking Backend (พอร์ต 8081)

---

## 🛡️ กฎสำคัญ (The Iron Rules)

1. **การแยก API**: ห้ามเรียก Vision API (8080) โดยตรงสำหรับการจัดทำรายการ (List Composition) ให้ใช้ผ่าน `UnifiedService` เท่านั้น เพื่อความเป็นระเบียบและความเร็วในการโหลด
2. **มาตรฐานคอมเม้น**: โค้ดที่เขียนใหม่หรือแก้ไขต้องมีคอมเม้นอธิบาย Logic เป็น **ภาษาไทย** ตามมาตรฐานที่กำหนดไว้

---

*เอกสารปรับปรุงล่าสุด: 2 มีนาคม 2026*
