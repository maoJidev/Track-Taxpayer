# Track-Taxpayer System

ระบบบริหารจัดการและตรวจสอบข้อมูลผู้เสียภาษีอัตโนมัติ (Automated Taxpayer Tracking System)

## 📖 คู่มือการใช้งานและข้อมูลระบบ (Documentation)

เพื่อให้ง่ายต่อการศึกษาและพัฒนาระบบต่อ เราได้แยกข้อมูลออกเป็นส่วนดังนี้:

### ⚙️ [คู่มือการติดตั้งและติดตั้งระบบ (Deployment Guide)](frontend/DEPLOY_GUIDE.md)

*อ่านเพื่อรู้วิธีการลง Dependencies, การตั้งค่าไฟล์ `.env` และขั้นตอนการ Build สำหรับขึ้น Production*

### 🏗️ [โครงสร้างสถาปัตยกรรม (System Architecture)](frontend/README_MAIN.md)

*อ่านเพื่อทำความเข้าใจโครงสร้างโฟลเดอร์, การไหลของข้อมูล (Data Flow) และกฎการพัฒนาต่างๆ ภายในระบบ Frontend*

---

## 🛠️ ภาพรวมเทคโนโลยี (Tech Overview)

- **Frontend:** React + Vite + Bootstrap 5
- **Backend Bridge:** Proxy configurations for Vision and Auth APIs
- **Environment:** Docker-ready (docker-compose included)

---

## 🚀 เริ่มต้นใช้งานด่วน (Quick Start)

1. เข้าไปที่โฟลเดอร์ `frontend`
2. ติดตั้ง: `npm install`
3. ตั้งค่า IP ใน `.env`: `VITE_BACKEND_IP=xxx.xxx.xxx.xxx`
4. รัน: `npm run dev`

---
*เอกสารนี้ทำหน้าที่เป็นหน้าด่านในการเข้าถึงข้อมูลทั้งหมดของโปรเจกต์*
