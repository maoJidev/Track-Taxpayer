# API Field Documentation (TackTaxpayer)

This document maps the API responses to their database fields and usage in the application.

## 1. Common Data API

**Endpoint**: `/api/pnd90/common/findbydln/{dln}`
**Table**: `ITPP_FORM_COMMON`

| Field Name | Description | การใช้งานในแอป |
| :--- | :--- | :--- |
| `dln` | เลขคุมเอกสาร | ใช้เป็นคีย์หลักในการเชื่อมข้อมูลรายละเอียด |
| `formCode` | รหัสแบบภาษี | ใช้ระบุประเภทแบบ (เช่น ภงด.90, ภงด.91) |
| `formYear` | หน้าแบบปีภาษี | แสดงบริบทปีภาษีที่ยื่น |
| `effDate` | วันที่ยื่นแบบฯ | แสดงวันที่ยื่นแบบจริง |
| `taxYear` | ปีภาษีที่ยื่น | ปีภาษีสำหรับข้อมูลนั้นๆ |
| `subInd` | ประเภทการยื่น | 0=ยื่นปกติ, 1=ยื่นเพิ่มเติม |
| `subLateInd` | สถานะการยื่น | 0=ภายในกำหนด, 1=เกินกำหนด |
| `recordUseInd` | สถานะรายการ | 'A' (Active) = ข้อมูลล่าสุดที่ใช้งาน |
| `nameChgInd` | แก้ไขชื่อ | ตัวบ่งชี้การแก้ไขชื่อ (1=แก้, 0=ไม่แก้) |
| `addrChgInd` | แก้ไขที่อยู่ | ตัวบ่งชี้การแก้ไขที่อยู่ (1=แก้, 0=ไม่แก้) |
| `addrHouseText` | บ้านเลขที่ | ใช้ประกอบที่อยู่แบบเต็ม |
| `addrMooText` | หมู่ที่ | ใช้ประกอบที่อยู่แบบเต็ม |
| `addrSoiText` | ซอย | ใช้ประกอบที่อยู่แบบเต็ม |
| `addrStreetText` | ถนน | ใช้ประกอบที่อยู่แบบเต็ม |
| `addrSubDistId` | รหัสตำบล/แขวง | แปลงเป็นชื่อตำบล/แขวง |
| `addrDistId` | รหัสอำเภอ/เขต | แปลงเป็นชื่ออำเภอ/เขต |
| `addrProvId` | รหัสจังหวัด | แปลงเป็นชื่อจังหวัด |
| `addrPostCodeText` | รหัสไปรษณีย์ | ใช้ประกอบที่อยู่แบบเต็ม |
| `addrBldText` | ชื่ออาคาร | แสดงข้อมูลที่อยู่ละเอียด |
| `addrVilText` | ชื่อหมู่บ้าน | แสดงข้อมูลที่อยู่ละเอียด |
| `addrRoomText` | ห้อง | เลขที่ห้อง |
| `addrFloorText` | ชั้น | ชั้นของอาคาร |
| `addrShopText` | ชื่อสถานประกอบการ | แสดงแยกเป็นชื่อร้าน/บริษัท |

---

## 2. Taxpayer Detail API

**Endpoint**: `/api/pnd90/taxpayer/findbydln/{dln}`
**Table**: `ITPP_FORM_TAXPAYER`

| Field Name | Description | การใช้งานในแอป |
| :--- | :--- | :--- |
| `txpNid` | เลข 13 หลัก | ใช้ตรวจสอบตัวตนผู้เสียภาษี |
| `jointId` | สถานะยื่นรวม | 1 = ผู้มีเงินได้, 2 = คู่สมรส |
| `txpTtlText` | คำนำหน้าชื่อ | แสดงคำนำหน้าชื่อ (นาย/นาง/นางสาว) |
| `txpFName` | ชื่อผู้มีเงินได้ | แสดงชื่อหลัก |
| `txpMName` | ชื่อกลาง | แสดงชื่อกลาง (ถ้ามี) |
| `txpLName` | นามสกุล | แสดงนามสกุลหลัก |
| `txpSexId` | เพศ | 1=ชาย, 2=หญิง |
| `txpBirthDate` | วดป. เกิด | จัดรูปแบบวันเกิดสำหรับแสดงผล |
| `txpMryStaInd` | สถานะสมรส | แสดงสถานะสมรสตามรหัส |
| `spoNid` | เลข 13 หลัก คู่สมรส | ใช้แสดงข้อมูลกรณีมีการยื่นรวม |
| `spoFName` | ชื่อ คู่สมรส | ชื่อคู่สมรสกรณีมีการยื่นรวม |
| `spoLName` | นามสกุล คู่สมรส | นามสกุลคู่สมรสกรณีมีการยื่นรวม |
| `txpEmailText` | อีเมล | ข้อมูลการติดต่อในหน้าประวัติ |
| `txpRctNo` | เลขที่ใบเสร็จรับเงิน | ใช้ในการติดตามเลขที่ใบเสร็จ |
| `txpRfnAmt` | จำนวนเงินขอคืน | จำนวนเงินที่ขอคืนภาษี |
| `txpBankAccId` | เลขที่บัญชีธนาคาร | เลขที่บัญชีรับเงินคืน |

---

## 3. Financial Data API (PND90)

**Endpoint**: `/api/pnd90/pnd/findbydln/{dln}`
**Table**: `ITPP_FORM_PND90`

| Field Name | Description | Description |
| :--- | :--- | :--- |
| `txpTotAssInc401AmtC` | รวมเงินได้ 40(1) | เงินเดือน |
| `txpTotAssInc402AmtC` | รวมเงินได้ 40(2) | รับจ้าง/ค่านายหน้า |
| `txpTotAssInc403AmtC` | รวมเงินได้ 40(3) | ค่าลิขสิทธิ์ |
| `txpTotAssInc404AmtC` | รวมเงินได้ 40(4) | เงินปันผล |
| `txpTotAssInc405AmtC` | รวมเงินได้ 40(5) | ค่าเช่า |
| `txpTotAssInc406AmtC` | รวมเงินได้ 40(6) | วิชาชีพอิสระ |
| `txpTotAssInc407AmtC` | รวมเงินได้ 40(7) | รับเหมาก่อสร้าง |
| `txpTotAssInc408AmtC` | รวมเงินได้ 40(8) | ธุรกิจอื่นๆ |
| `txpTotAssInc4018AmtC` | รวมเงินได้ 40(1)-(8) | สรุปยอดเงินรวมทั้งหมด |
| `txpAlwAmt` | ค่าลดหย่อน (หลัก) | จำนวนเงินลดหย่อนหลัก |
| `txpTotAlwAmtC` | รวมค่าลดหย่อน (ทั้งหมด) | สรุปยอดค่าลดหย่อนรวม |
| `txpNetIncAmtC` | เงินได้สุทธิ | รายได้สุทธิที่นำมาคำนวณภาษี |
| `txpNetTaxAmt` | ภาษีที่คำนวณได้ | ยอดภาษีสุทธิที่ต้องชำระ |
| `txpWhtAmt` | ภาษีหัก ณ ที่จ่าย | ยอดเครดิตภาษีหัก ณ ที่จ่าย |
| `subTaxInd` | สถานะภาษีคงเหลือ | 0=ชำระเพิ่ม, 1=คืนภาษี |
| `txpSurAmt` | เงินเพิ่ม (Surcharge) | ยอดเงินเพิ่ม/ค่าปรับ |

---

## 4. Report List API (Summary)

**Endpoint**: `/api/pnd90/report`
**Usage**: Populates the main search/listing page with summary data.

| Field Name | Description | การใช้งานในแอป |
| :--- | :--- | :--- |
| `txpNid` | เลข 13 หลัก | เลขบัตรประชาชนผู้เสียภาษี |
| `txpTtlText` | คำนำหน้าชื่อ | คำนำหน้าสำหรับหน้า List |
| `txpFName` | ชื่อ | ชื่อผู้เสียภาษีในหน้าผลลัพธ์ |
| `txpLName` | นามสกุล | นามสกุลผู้เสียภาษีในหน้าผลลัพธ์ |
| `dln` | เลขคุมเอกสาร | **คีย์สำคัญ** สำหรับกดดูรายละเอียด |
| `txpTotAssInc4018AmtC` | รวมเงินได้ (40(1)-(8)) | ยอดรวมเงินได้ในหน้า List |
| `txpAftExcInc4012AmtC` | รวมเงินได้ (40(1)-(2)) | ยอดรวมสำรองกรณีช่องแรกไม่มีข้อมูล |
| `effDate` | วันที่ยื่นแบบฯ | วันที่ยื่นในหน้าสรุป |

---

### Logic Reference

- **Data Merging**: The application first calls the **Report API** to get a list. When a user clicks a row, the **Common**, **Taxpayer**, and **Financial** APIs are called in parallel using the `dln` as the shared key.
- **Caching**: Data from these APIs is stored in `sessionStorage` under `tack_taxpayer_cache`.
- **Primary Link**: `dln` is the mandatory requirement to fetch these parts and merge them into the `standard` profile.
