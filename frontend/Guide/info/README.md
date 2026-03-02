# 🏢 Office Management API

API สำหรับจัดการข้อมูลสำนักงานสรรพากร 3 ระดับ
- Region (ภาค)
- ST (พื้นที่)
- SS (สาขา)

---

## 📦 ไฟล์ที่มีให้

### 1. Entity Classes (3 ไฟล์)
- `MasterRegion.java` - Entity สำหรับตาราง master_region
- `MasterSt.java` - Entity สำหรับตาราง master_st
- `MasterSs.java` - Entity สำหรับตาราง master_ss

### 2. Repository Classes (3 ไฟล์)
- `MasterRegionRepository.java` - Data access สำหรับ master_region
- `MasterStRepository.java` - Data access สำหรับ master_st
- `MasterSsRepository.java` - Data access สำหรับ master_ss

### 3. Service Classes (2 ไฟล์)
- `OfficeService.java` - Service interface
- `OfficeServiceImpl.java` - Service implementation

### 4. Controller (1 ไฟล์)
- `OfficeController.java` - REST API endpoints (10 endpoints)

### 5. SQL Script (1 ไฟล์)
- `office_schema.sql` - SQL สำหรับสร้างตารางและข้อมูลตัวอย่าง

### 6. Documentation (2 ไฟล์)
- `OFFICE_API_GUIDE.md` - คู่มือการใช้งาน API แบบละเอียด
- `README.md` - ไฟล์นี้

---

## 🚀 วิธีการติดตั้ง

### Step 1: สร้างตารางในฐานข้อมูล

```sql
-- รันไฟล์ office_schema.sql ใน SQL Server
-- หรือรันคำสั่งทีละส่วน:

-- 1. สร้างตาราง master_region
-- 2. สร้างตาราง master_st
-- 3. สร้างตาราง master_ss
-- 4. Insert ข้อมูลตัวอย่าง
```

### Step 2: Copy ไฟล์ไปโปรเจค

```
taxpayer-tracking-backend/
└── src/main/java/th/go/rd/taxpayertrack/
    ├── entity/
    │   ├── MasterRegion.java      ← Copy ไฟล์นี้
    │   ├── MasterSt.java           ← Copy ไฟล์นี้
    │   └── MasterSs.java           ← Copy ไฟล์นี้
    ├── repository/
    │   ├── MasterRegionRepository.java  ← Copy ไฟล์นี้
    │   ├── MasterStRepository.java      ← Copy ไฟล์นี้
    │   └── MasterSsRepository.java      ← Copy ไฟล์นี้
    ├── service/
    │   ├── OfficeService.java          ← Copy ไฟล์นี้
    │   └── OfficeServiceImpl.java      ← Copy ไฟล์นี้
    └── controller/
        └── OfficeController.java        ← Copy ไฟล์นี้
```

### Step 3: Rebuild และ Run

```bash
# Windows
mvnw.cmd clean install
run.bat

# Linux/Mac
./mvnw clean install
./run.sh
```

### Step 4: ทดสอบ API

```bash
# Login ก่อน
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userId":"admin","password":"admin123"}'

# ได้ Token แล้วทดสอบ Office API
curl -X GET http://localhost:8080/api/offices/regions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 API Endpoints ทั้งหมด (10 endpoints)

### Region APIs (3 endpoints)
```
GET /api/offices/regions                  # ดึงข้อมูลภาคทั้งหมด
GET /api/offices/regions/{regionCode}     # ดึงข้อมูลภาคตาม Code
```

### ST APIs (3 endpoints)
```
GET /api/offices/st                       # ดึงข้อมูลพื้นที่ทั้งหมด
GET /api/offices/st/{stCode}              # ดึงข้อมูลพื้นที่ตาม Code
GET /api/offices/st/region/{regionCode}   # ดึงข้อมูลพื้นที่ตามภาค
```

### SS APIs (5 endpoints)
```
GET /api/offices/ss                       # ดึงข้อมูลสาขาทั้งหมด
GET /api/offices/ss/{ssCode}              # ดึงข้อมูลสาขาตาม Code
GET /api/offices/ss/region/{regionCode}   # ดึงข้อมูลสาขาตามภาค
GET /api/offices/ss/st/{stCode}           # ดึงข้อมูลสาขาตามพื้นที่
GET /api/offices/ss/ktb/{status}          # ดึงข้อมูลสาขาตาม KTB Status
```

---

## 💡 Use Cases

### 1. Cascading Dropdown (ภาค → พื้นที่ → สาขา)

```javascript
// Step 1: โหลดภาค
const regions = await fetch('/api/offices/regions');

// Step 2: เลือกภาค → โหลดพื้นที่
const stations = await fetch(`/api/offices/st/region/${selectedRegion}`);

// Step 3: เลือกพื้นที่ → โหลดสาขา
const branches = await fetch(`/api/offices/ss/st/${selectedStation}`);
```

### 2. แสดงสาขาในความรับผิดชอบ

```javascript
// User มี stOfficeCode = "12900000"
const myBranches = await fetch('/api/offices/ss/st/12900000');
```

### 3. Filter สาขาที่ Active

```javascript
// ดูเฉพาะสาขาที่ KTB_Status = 1
const activeBranches = await fetch('/api/offices/ss/ktb/1');
```

---

## 📚 เอกสารเพิ่มเติม

อ่านเพิ่มเติมใน **OFFICE_API_GUIDE.md** สำหรับ:
- ตัวอย่าง Request/Response แบบละเอียด
- cURL commands ทั้งหมด
- Use cases เพิ่มเติม
- ตัวอย่างการใช้งานใน Frontend

---

## ✅ Checklist การติดตั้ง

- [ ] รัน office_schema.sql สร้างตาราง
- [ ] Copy Entity files (3 ไฟล์)
- [ ] Copy Repository files (3 ไฟล์)
- [ ] Copy Service files (2 ไฟล์)
- [ ] Copy Controller file (1 ไฟล์)
- [ ] Rebuild project (`mvn clean install`)
- [ ] Run project
- [ ] ทดสอบ API ทั้ง 10 endpoints

---

## 🔧 Features

✅ **10 API Endpoints** พร้อมใช้งาน  
✅ **3-Level Hierarchy** ภาค → พื้นที่ → สาขา  
✅ **Filter & Search** หลายแบบ  
✅ **JWT Authentication** ป้องกันทุก endpoint  
✅ **Error Handling** ครบถ้วน  
✅ **Logging** ทุก operation  
✅ **Thai Language Support**  
✅ **SQL Script** พร้อมข้อมูลตัวอย่าง  

---

## 📞 ตัวอย่างการเรียกใช้

### JavaScript/React
```javascript
const fetchOffices = async () => {
  const response = await axios.get(
    'http://localhost:8080/api/offices/ss/st/12900000',
    {
      headers: { 
        Authorization: `Bearer ${token}` 
      }
    }
  );
  return response.data.data;
};
```

### Java (Spring RestTemplate)
```java
String url = "http://localhost:8080/api/offices/regions";
HttpHeaders headers = new HttpHeaders();
headers.set("Authorization", "Bearer " + token);
HttpEntity<String> entity = new HttpEntity<>(headers);

ResponseEntity<ApiResponse> response = restTemplate.exchange(
    url, 
    HttpMethod.GET, 
    entity, 
    new ParameterizedTypeReference<ApiResponse<List<MasterRegion>>>() {}
);
```

---

## 🎯 Next Steps

หลังจากติดตั้ง Office API เรียบร้อยแล้ว คุณสามารถ:

1. ใช้ API นี้ใน Frontend สำหรับ Dropdown เลือกสำนักงาน
2. เพิ่ม API อื่นๆ เช่น Taxpayer Management
3. สร้าง Dashboard แสดงสถิติตามสำนักงาน
4. เพิ่ม Export รายงานตามสำนักงาน

---

**Developer:** NIWAT  
**Organization:** IT Division 2, สำนักงานสรรพากรภาค 12  
**Version:** 1.0.0  
**Date:** February 11, 2024
