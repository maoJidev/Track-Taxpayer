# Role-Based Office Selector - Developer Guide

## Overview

ระบบ Office Selector ที่ปรับตาม Role ของผู้ใช้งาน (Region, ST, SS) พร้อม mock data สำหรับการพัฒนา

## Quick Start

### 1. Enable Mock Authentication

แก้ไขไฟล์ `.env`:

```env
VITE_USE_MOCK_AUTH=true
```

### 2. Switch Mock User Role (สำหรับทดสอบ)

เปิด Browser Console และใช้คำสั่ง:

```javascript
// Switch to Region role
window.switchRole = (role) => {
  const event = new CustomEvent('switchMockRole', { detail: role });
  window.dispatchEvent(event);
};

// ตัวอย่าง
window.switchRole('Region'); // แสดง dropdown ทั้ง ST และ SS
window.switchRole('ST');     // แสดงแค่ dropdown SS
window.switchRole('SS');     // ไม่แสดง dropdown (แสดงข้อมูลเท่านั้น)
```

## Architecture

### Components Created

```
frontend/src/
├── contexts/
│   └── AuthContext.jsx          # Authentication state management
├── hooks/
│   └── useAuth.js               # Hook to access auth context
├── services/
│   └── officeService.js         # Office hierarchy API calls
└── components/common/
    └── OfficeSelector.jsx       # Cascading dropdown component
```

### Role-Based Behavior

| Role | Region Dropdown | ST Dropdown | SS Dropdown | Notes |
|------|----------------|-------------|-------------|-------|
| **Region** | ✅ Enabled | ✅ Enabled | ✅ Enabled | เลือกได้ทั้งหมดแต่เลือกระดับภาคไม่ได้ (ST,SS) ได้แค่ดูข้อมูลภาค |
| **ST** | ❌ Hidden | 🔒 Pre-filled | ✅ Enabled | เลือกได้แค่ SS และดูข้อมูลไม่แสดงข้อมูลภาค แต่แสดงแค่ ST |
| **SS** | ❌ Hidden | ❌ Hidden | ❌ Hidden | แสดงข้อมูลเฉพาะสาขาของตัวเอง (SS) |

## Mock Data

### Mock Users

```javascript
// Region User
{
  role: 'Region',
  offices: { regionCode: '12', stCode: null, ssCode: null }
}

// ST User
{
  role: 'ST',
  offices: { regionCode: '12', stCode: '12900000', ssCode: null }
}

// SS User
{
  role: 'SS',
  offices: { regionCode: '12', stCode: '12900000', ssCode: '12900010' }
}
```

### Mock Office Data

ข้อมูลสำนักงานจำลองจาก `taxpayer90-list.html`:

- **Region 12**: ภาคใต้
- **ST Offices**: 6 สำนักงาน (สงขลา 1, สงขลา 2, ตรัง, พัทลุง, ปัตตานี, ยะลา)
- **SS Offices**: 20+ สาขา

## Backend Integration (เมื่อพร้อม)

### Step 1: Update Environment

```env
VITE_USE_MOCK_AUTH=false
```

### Step 2: Implement APIs

Backend ต้องมี APIs ตามนี้:

#### 1. User Profile API

```
GET /api/auth/me
Authorization: Bearer {token}

Response:
{
  "userId": "user001",
  "name": "นายทดสอบ ระบบ",
  "role": "ST",
  "offices": {
    "regionCode": "12",
    "stCode": "12900000",
    "ssCode": null
  }
}
```

#### 2. Office APIs (Already documented in OFFICE_API_GUIDE.md)

```
GET /api/offices/regions
GET /api/offices/st/region/{regionCode}
GET /api/offices/ss/st/{stCode}
```

#### 3. Filtered Taxpayer APIs

```
GET /api/taxpayer90/st/{stCode}/page?page=0&size=50
GET /api/taxpayer90/st/{stCode}/ss/{ssCode}
```

### Step 3: Test Integration

1. ทดสอบ login flow
2. ตรวจสอบ user role ถูกต้อง
3. ทดสอบ office selector ทำงานตาม role
4. ตรวจสอบ data filtering ตาม office ที่เลือก

## Usage Example

### In Component

```jsx
import { useAuth } from '../../hooks/useAuth';
import OfficeSelector from '../../components/common/OfficeSelector';

function MyComponent() {
  const { user } = useAuth();
  const [selectedOffices, setSelectedOffices] = useState({});

  const handleOfficeChange = (offices) => {
    setSelectedOffices(offices);
    // Call API with selected offices
    fetchData(offices);
  };

  return (
    <OfficeSelector
      userRole={user.role}
      userOffices={user.offices}
      onOfficeChange={handleOfficeChange}
    />
  );
}
```

## Testing Scenarios

### Scenario 1: Region User

1. เปิดหน้า `/taxpayers/pnd90`
2. ควรเห็น dropdown ทั้ง 3 อัน (Region, ST, SS)
3. เลือก Region → ST dropdown โหลดข้อมูล
4. เลือก ST → SS dropdown โหลดข้อมูล
5. เลือก SS → ข้อมูลถูก filter

### Scenario 2: ST User

1. เปิดหน้า `/taxpayers/pnd90`
2. ควรเห็น dropdown แค่ SS (ST ถูก pre-fill)
3. เลือก SS → ข้อมูลถูก filter

### Scenario 3: SS User

1. เปิดหน้า `/taxpayers/pnd90`
2. ไม่เห็น dropdown (แสดงข้อมูลสำนักงานเท่านั้น)
3. ข้อมูลถูก filter อัตโนมัติ

## Troubleshooting

### OfficeSelector ไม่แสดง

- ตรวจสอบ `VITE_USE_MOCK_AUTH=true` ใน `.env`
- ตรวจสอบ `user.role` ไม่เป็น `SS`
- เช็ค console logs: `[AuthContext]` และ `[OfficeService]`

### Dropdown ไม่โหลดข้อมูล

- เช็ค console errors
- ตรวจสอบ mock data ใน `officeService.js`
- ตรวจสอบ network requests (ถ้าใช้ real API)

### Role ไม่ถูกต้อง

- ลบ sessionStorage: `sessionStorage.clear()`
- Refresh หน้า
- ตรวจสอบ mock user ใน `AuthContext.jsx`

## Next Steps

1. **Frontend (ทำเสร็จแล้ว)**
   - ✅ Authentication Context
   - ✅ Office Selector Component
   - ✅ Role-based visibility
   - ✅ Mock data support

2. **Backend (รอทำ)**
   - ⏳ Implement `/api/auth/me`
   - ⏳ Implement office filtering APIs
   - ⏳ Add JWT authentication

3. **Integration (รอทำ)**
   - ⏳ Connect real APIs
   - ⏳ Test with real data
   - ⏳ Deploy to staging
