# 🏢 Office Management API - คู่มือการใช้งาน

API สำหรับจัดการข้อมูลสำนักงานสรรพากร 3 ระดับ:
- **Region** - สำนักงานสรรพากรภาค (master_region)
- **ST** - สำนักงานสรรพากรพื้นที่ (master_st)
- **SS** - สำนักงานสรรพากรพื้นที่สาขา (master_ss)

---

## 📋 API Endpoints

### 🌍 Region APIs (สำนักงานภาค)

#### 1. ดึงข้อมูลสำนักงานภาคทั้งหมด
```
GET /api/offices/regions
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "regionOfficeCode": "12000000",
      "regionOfficeName": "สำนักงานสรรพากรภาค 1"
    },
    {
      "regionOfficeCode": "01000000",
      "regionOfficeName": "สำนักงานสรรพากรภาค 2"
    }
  ]
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/offices/regions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

#### 2. ดึงข้อมูลสำนักงานภาคตาม Code
```
GET /api/offices/regions/{regionCode}
```

**Example:**
```
GET /api/offices/regions/12000000
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "regionOfficeCode": "12000000",
    "regionOfficeName": "สำนักงานสรรพากรภาค 12"
  }
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/offices/regions/12000000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 🏢 ST Office APIs (สำนักงานพื้นที่)

#### 3. ดึงข้อมูลสำนักงานพื้นที่ทั้งหมด
```
GET /api/offices/st
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "stOfficeCode": "12900000",
      "stOfficeName": "สำนักงานสรรพากรพื้นที่สงขลา 1",
      "regionOfficeCode": "12000000",
      "stOfficeName2": "สพ.สงขลา 1"
    }
  ]
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/offices/st \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

#### 4. ดึงข้อมูลสำนักงานพื้นที่ตาม Code
```
GET /api/offices/st/{stCode}
```

**Example:**
```
GET /api/offices/st/12900000
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/offices/st/12900000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

#### 5. ดึงข้อมูลสำนักงานพื้นที่ตามภาค
```
GET /api/offices/st/region/{regionCode}
```

**Example:**
```
GET /api/offices/st/region/12000000
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "stOfficeCode": "12900000",
      "stOfficeName": "สำนักงานสรรพากรพื้นที่สงขลา 1",
      "regionOfficeCode": "12000000",
      "stOfficeName2": "สพ.สงขลา 1"
    },
    {
      "stOfficeCode": "12910000",
      "stOfficeName": "สำนักงานสรรพากรพื้นที่สงขลา 2",
      "regionOfficeCode": "12000000",
      "stOfficeName2": "สพ.สงขลา 2"
    }
  ]
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/offices/st/region/12000000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 🏪 SS Office APIs (สำนักงานสาขา)

#### 6. ดึงข้อมูลสำนักงานสาขาทั้งหมด
```
GET /api/offices/ss
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "ssOfficeCode": "12900010",
      "ssOfficeName": "สส.เมืองสงขลา 1",
      "stOfficeCode": "12900000",
      "regionOfficeCode": "12000000",
      "ktbStatus": 1
    }
  ]
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/offices/ss \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

#### 7. ดึงข้อมูลสำนักงานสาขาตาม Code
```
GET /api/offices/ss/{ssCode}
```

**Example:**
```
GET /api/offices/ss/12900010
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/offices/ss/12900010 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

#### 8. ดึงข้อมูลสำนักงานสาขาตามภาค
```
GET /api/offices/ss/region/{regionCode}
```

**Example:**
```
GET /api/offices/ss/region/12000000
```

**ใช้สำหรับ:** ดูสาขาทั้งหมดในภาค 12

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/offices/ss/region/12000000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

#### 9. ดึงข้อมูลสำนักงานสาขาตามพื้นที่
```
GET /api/offices/ss/st/{stCode}
```

**Example:**
```
GET /api/offices/ss/st/12900000
```

**ใช้สำหรับ:** ดูสาขาทั้งหมดที่อยู่ภายใต้ สพ.สงขลา 1

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "ssOfficeCode": "12900010",
      "ssOfficeName": "สส.เมืองสงขลา 1",
      "stOfficeCode": "12900000",
      "regionOfficeCode": "12000000",
      "ktbStatus": 1
    },
    {
      "ssOfficeCode": "12900020",
      "ssOfficeName": "สส.หาดใหญ่",
      "stOfficeCode": "12900000",
      "regionOfficeCode": "12000000",
      "ktbStatus": 1
    }
  ]
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/offices/ss/st/12900000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

#### 10. ดึงข้อมูลสำนักงานสาขาตาม KTB Status
```
GET /api/offices/ss/ktb/{status}
```

**Example:**
```
GET /api/offices/ss/ktb/1
```

**ใช้สำหรับ:** ดูสาขาที่มี KTB_Status = 1 (Active)

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/offices/ss/ktb/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📊 สรุป Endpoints ทั้งหมด

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/offices/regions` | ดึงข้อมูลสำนักงานภาคทั้งหมด |
| GET | `/api/offices/regions/{regionCode}` | ดึงข้อมูลสำนักงานภาคตาม Code |
| GET | `/api/offices/st` | ดึงข้อมูลสำนักงานพื้นที่ทั้งหมด |
| GET | `/api/offices/st/{stCode}` | ดึงข้อมูลสำนักงานพื้นที่ตาม Code |
| GET | `/api/offices/st/region/{regionCode}` | ดึงข้อมูลสำนักงานพื้นที่ตามภาค |
| GET | `/api/offices/ss` | ดึงข้อมูลสำนักงานสาขาทั้งหมด |
| GET | `/api/offices/ss/{ssCode}` | ดึงข้อมูลสำนักงานสาขาตาม Code |
| GET | `/api/offices/ss/region/{regionCode}` | ดึงข้อมูลสำนักงานสาขาตามภาค |
| GET | `/api/offices/ss/st/{stCode}` | ดึงข้อมูลสำนักงานสาขาตามพื้นที่ |
| GET | `/api/offices/ss/ktb/{status}` | ดึงข้อมูลสำนักงานสาขาตาม KTB Status |

---

## 🔐 Authentication

ทุก API endpoint ต้องใช้ JWT Token ใน Authorization Header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

---

## 💡 Use Cases

### Use Case 1: Dropdown ภาค → พื้นที่ → สาขา

```javascript
// 1. โหลดรายการภาค
GET /api/offices/regions

// 2. เมื่อเลือกภาค (เช่น 12000000) โหลดพื้นที่
GET /api/offices/st/region/12000000

// 3. เมื่อเลือกพื้นที่ (เช่น 12900000) โหลดสาขา
GET /api/offices/ss/st/12900000
```

### Use Case 2: แสดงข้อมูล User Office

```javascript
// User มี stOfficeCode = "12900000"
// ดึงข้อมูลสาขาทั้งหมดที่อยู่ในความรับผิดชอบ
GET /api/offices/ss/st/12900000
```

### Use Case 3: Filter ตาม KTB Status

```javascript
// ดูเฉพาะสาขาที่ Active (KTB_Status = 1)
GET /api/offices/ss/ktb/1

// ดูเฉพาะสาขาที่ Inactive (KTB_Status = 0)
GET /api/offices/ss/ktb/0
```

---

## 📁 ไฟล์ที่ต้องนำไปใส่ในโปรเจค

```
src/main/java/th/go/rd/taxpayertrack/
├── entity/
│   ├── MasterRegion.java
│   ├── MasterSt.java
│   └── MasterSs.java
├── repository/
│   ├── MasterRegionRepository.java
│   ├── MasterStRepository.java
│   └── MasterSsRepository.java
├── service/
│   ├── OfficeService.java
│   └── OfficeServiceImpl.java
└── controller/
    └── OfficeController.java
```

---

## 🚀 การติดตั้ง

1. Copy ไฟล์ทั้งหมดไปใส่ในโปรเจคตามโครงสร้างข้างบน
2. Rebuild โปรเจค
3. Run application
4. ทดสอบ API

---

## ✅ Checklist

- [ ] Copy Entity files (3 ไฟล์)
- [ ] Copy Repository files (3 ไฟล์)
- [ ] Copy Service files (2 ไฟล์)
- [ ] Copy Controller file (1 ไฟล์)
- [ ] Rebuild project
- [ ] Test APIs

---

## 📞 ตัวอย่างการใช้งานจริง

### Frontend React Example

```javascript
// ดึงข้อมูลสำนักงานภาคทั้งหมด
const fetchRegions = async () => {
  const response = await axios.get('http://localhost:8080/api/offices/regions', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.data;
};

// ดึงข้อมูลสาขาตามพื้นที่
const fetchBranchesByStation = async (stCode) => {
  const response = await axios.get(`http://localhost:8080/api/offices/ss/st/${stCode}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.data;
};
```

---

**Happy Coding! 🎉**
