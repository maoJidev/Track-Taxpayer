# 🧪 วิธีทดสอบ Role ที่แตกต่างกัน

## วิธีที่ 1: ใช้ DevTools Widget (แนะนำ - ง่ายที่สุด!)

### ขั้นตอน

1. **รัน dev server**

   ```bash
   npm run dev
   ```

2. **เปิดหน้าเว็บ** (เช่น `http://localhost:5173/taxpayers/pnd90`)

3. **มองหา Widget ที่มุมขวาล่าง** 🔧
   - จะเห็นปุ่ม 3 ปุ่ม: `Region`, `ST`, `SS`
   - ปุ่มที่ active จะเป็นสีขาว

4. **คลิกปุ่ม Role ที่ต้องการทดสอบ**
   - หน้าเว็บจะ reload อัตโนมัติ
   - Office Selector จะเปลี่ยนตาม role ทันที

### ตัวอย่างการทดสอบ

#### ทดสอบ Region Role

1. คลิกปุ่ม **Region**
2. ✅ ควรเห็น dropdown **3 อัน**: ภาค, สำนักงานพื้นที่, สาขา
3. ลองเลือก Region → ST dropdown จะโหลดข้อมูล
4. ลองเลือก ST → SS dropdown จะโหลดข้อมูล

#### ทดสอบ ST Role

1. คลิกปุ่ม **ST**
2. ✅ ควรเห็น dropdown **2 อัน**: สำนักงานพื้นที่ (disabled), สาขา
3. ST จะถูก pre-fill เป็น "12900000 - สงขลา 1"
4. ลองเลือก SS → ข้อมูลจะถูก filter

#### ทดสอบ SS Role

1. คลิกปุ่ม **SS**
2. ✅ **ไม่เห็น dropdown** เลย
3. แสดงแค่ info card: "สำนักงานของคุณ: 12900010"

---

## วิธีที่ 2: ใช้ Browser Console

### ขั้นตอน

1. เปิด Browser Console (F12)
2. พิมพ์คำสั่งนี้:

```javascript
// Switch to Region role
sessionStorage.setItem('mock_user', JSON.stringify({
  userId: 'user_region_001',
  name: 'นายภูมิภาค ทดสอบ',
  role: 'Region',
  offices: { regionCode: '12', stCode: null, ssCode: null },
  position: 'ผู้อำนวยการภาค',
  group: 'Region'
}));
location.reload();
```

```javascript
// Switch to ST role
sessionStorage.setItem('mock_user', JSON.stringify({
  userId: 'user_st_001',
  name: 'นายพื้นที่ ทดสอบ',
  role: 'ST',
  offices: { regionCode: '12', stCode: '12900000', ssCode: null },
  position: 'ผู้อำนวยการพื้นที่',
  group: 'ST'
}));
location.reload();
```

```javascript
// Switch to SS role
sessionStorage.setItem('mock_user', JSON.stringify({
  userId: 'user_ss_001',
  name: 'นายสาขา ทดสอบ',
  role: 'SS',
  offices: { regionCode: '12', stCode: '12900000', ssCode: '12900010' },
  position: 'ผู้อำนวยการสาขา',
  group: 'SS'
}));
location.reload();
```

---

## วิธีที่ 3: แก้ไข AuthContext.jsx โดยตรง

### ขั้นตอน

1. เปิดไฟล์ `frontend/src/contexts/AuthContext.jsx`
2. หาบรรทัดนี้ (ประมาณบรรทัด 68):

   ```javascript
   const mockUser = MOCK_USERS.st; // <-- เปลี่ยนตรงนี้
   ```

3. เปลี่ยนเป็น:
   - `MOCK_USERS.region` → ทดสอบ Region role
   - `MOCK_USERS.st` → ทดสอบ ST role (default)
   - `MOCK_USERS.ss` → ทดสอบ SS role
4. Save และ refresh หน้าเว็บ

---

## 📋 Checklist การทดสอบ

### ✅ Region Role

- [ ] เห็น dropdown ทั้ง 3 อัน
- [ ] เลือก Region แล้ว ST dropdown โหลดข้อมูล
- [ ] เลือก ST แล้ว SS dropdown โหลดข้อมูล
- [ ] Console log แสดง office selection changes

### ✅ ST Role

- [ ] เห็น dropdown 2 อัน (ST disabled, SS enabled)
- [ ] ST ถูก pre-fill เป็น "12900000"
- [ ] เลือก SS ได้
- [ ] ข้อความ "(กำหนดตามสิทธิ์ของคุณ)" แสดงใต้ ST dropdown

### ✅ SS Role

- [ ] **ไม่เห็น** dropdown เลย
- [ ] เห็น info card แสดงสำนักงาน
- [ ] ข้อความแสดง "สาขา: 12900010"

---

## 🐛 Troubleshooting

### Widget ไม่แสดง

- ตรวจสอบ `.env`: `VITE_USE_MOCK_AUTH=true`
- Restart dev server: `npm run dev`

### Role ไม่เปลี่ยน

- Clear sessionStorage: `sessionStorage.clear()`
- Refresh หน้า (Ctrl+R หรือ F5)

### Dropdown ไม่โหลดข้อมูล

- เปิด Console ดู error logs
- ตรวจสอบ `[OfficeService]` logs
- ตรวจสอบ mock data ใน `officeService.js`

---

## 💡 Tips

1. **ใช้ DevTools Widget** สำหรับการทดสอบเร็วๆ
2. **ใช้ Console** ถ้าต้องการ customize user data
3. **ดู Console Logs** เพื่อ debug:
   - `[AuthContext]` - authentication logs
   - `[OfficeService]` - office data loading
   - `[TaxpayerList90]` - office selection changes

4. **Test Flow แนะนำ:**

   ```
   Region → เลือก ST → เลือก SS → ดูข้อมูล
   ↓
   Switch to ST → เลือก SS → ดูข้อมูล
   ↓
   Switch to SS → ดูข้อมูลที่ถูก pre-fill
   ```
