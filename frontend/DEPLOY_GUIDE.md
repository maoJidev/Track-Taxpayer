# คู่มือการติดตั้งและใช้งานระบบ (Installation & Deployment Guide)

เอกสารฉบับนี้อธิบายวิธีการติดตั้งเครื่องมือ, การรันระบบในเครื่องสำหรับพัฒนา (Local Development) และการเตรียมระบบเพื่อนำไปใช้งานจริง (Production Deployment)

---

## 🛠️ สิ่งที่ต้องเตรียม (Prerequisites)

เพื่อให้สามารถรันโปรเจกต์ได้ คุณต้องติดตั้งเครื่องมือดังต่อไปนี้ในเครื่อง:

1. **Node.js**: แนะนำเวอร์ชัน 18.x หรือสูงกว่า
2. **npm**: (ติดตั้งมาพร้อมกับ Node.js)
3. **Backend Services**: ตรวจสอบให้แน่ใจว่าเครื่อง Backend (Vision API และ Auth API) เปิดใช้งานอยู่ และคุณทราบหมายเลข IP ของเครื่องนั้น

---

## 📥 ขั้นตอนการติดตั้ง (Installation)

1. เปิด Terminal หรือ Command Prompt
2. เข้าไปที่โฟลเดอร์โปรเจกต์:

    ```bash
    cd frontend
    ```

3. ติดตั้ง Dependency ทั้งหมด:

    ```bash
    npm install
    ```

---

## 💻 การใช้งานในโหมดพัฒนา (Local Development)

### 1. ตั้งค่า Environment Variable

สร้างไฟล์ชื่อ `.env` ไว้ที่โฟลเดอร์รูทของ frontend (หากยังไม่มี) และกำหนด IP ของ Backend:

```env
VITE_BACKEND_IP=192.168.x.x  # เปลี่ยนเป็น IP ของเครื่อง Backend จริง
```

### 2. รันระบบ

เริ่มรัน Development Server:

```bash
npm run dev
```

หลังจากรันสำเร็จ คุณสามารถเข้าใช้งานระบบได้ที่ `http://localhost:5173`

---

## 🏗️ การเตรียมระบบสำหรับใช้งานจริง (Production Build)

เมื่อต้องการนำโค้ดไปติดตั้งบน Server จริง ให้ทำการ Build ไฟล์ก่อน:

1. รันคำสั่ง Build:

    ```bash
    npm run build
    ```

2. ระบบจะสร้างโฟลเดอร์ชื่อ `dist/` ขึ้นมา ซึ่งภายในจะประกอบด้วยไฟล์ HTML, JS และ CSS ที่ถูกบีบอัดแล้ว

---

## 🚀 การนำไปใช้งาน (Deployment)

ในการนำไฟล์จากโฟลเดอร์ `dist/` ไปใช้งานบน Production โดยปกติจะใช้ Web Server เช่น **Nginx** หรือ **Apache**:

### ข้อควรระวังในการ Deploy

1. **Proxy Configuration**: เนื่องจากระบบมีการใช้ Proxy ในตัว Vite สำหรับโหมดพัฒนา เมื่อนำไปรันบน Nginx คุณต้องตั้งค่า `location` สำหรับ `/visionapi` และ `/authapi` ให้ส่งไปยัง IP ของ Backend ที่ถูกต้อง
    * **ตัวอย่าง Nginx Config:**

        ```nginx
        location /visionapi/ {
            proxy_pass http://<BACKEND_IP>:8080/;
        }
        location /authapi/ {
            proxy_pass http://<BACKEND_IP>:8081/taxpayer-tracking/;
        }
        ```

2. **Base Path**: หากคุณติดตั้งระบบใน Sub-folder (เช่น `example.com/myapp/`) อย่าลืมตั้งค่า `base` ใน `vite.config.js` ก่อนทำการ Build

---

## 🔍 คำสั่งอื่นๆ ที่เป็นประโยชน์

- `npm run lint`: ตรวจสอบความถูกต้องของโค้ด (Linting)
* `npm run preview`: ทดลองรันไฟล์ที่ Build แล้วในเครื่อง Local เพื่อตรวจสอบความเรียบร้อยก่อนนำไฟล์ขึ้น Server

---

*เอกสารปรับปรุงล่าสุด: 2 มีนาคม 2026*
