เอกสารอธิบายโครงสร้างตาราง taxpayer90_tb
ระบบติดตามรายผู้เสียภาษีเงินได้บุคคลธรรมดา ภ.ง.ด.90
ฐานข้อมูล: TAXPAYER_TRACK
ตาราง: dbo.taxpayer90_tb
ตารางนี้ใช้สำหรับเก็บข้อมูลผู้เสียภาษีเงินได้บุคคลธรรมดา (ภ.ง.ด.90) ที่อยู่ในความรับผิดชอบของสำนักงานสรรพากรพื้นที่สาขา โดยเก็บข้อมูลทะเบียนผู้เสียภาษี ข้อมูลที่อยู่ ข้อมูลการประกอบการ และข้อมูลการยื่นแบบและชำระภาษีย้อนหลัง 6 ปี (ปีภาษี 2564-2569)
ข้อ	Fields	ประเภทข้อมูล	คำอธิบาย
1	rec_no	int IDENTITY(1,1)	เลขที่ลำดับระเบียนข้อมูล (Auto increment)
2	order_no	int	ลำดับที่
3	pnd_group	nchar(10)	กลุ่มภาษี (ภ.ง.ด.90)
4	region_office_code	varchar(8)	รหัสสำนักงานสรรพากรภาค
5	st_office_code	varchar(8)	รหัสสำนักงานสรรพากรพื้นที่
6	ss_office_code	varchar(8)	รหัสสำนักงานสรรพากรพื้นที่สาขา
7	tin	nchar(10)	เลขประจำตัวผู้เสียภาษีอากร (Tax Identification Number)
8	nid	nchar(13)	เลขประจำตัวประชาชน
9	branch	nchar(6)	รหัสสาขา
10	taxpayer_name	varchar(500)	ชื่อผู้เสียภาษี
11	address_no	varchar(max)	ทีอยู่แบบเต็ม
12	addr_moo	varchar(max)	หมู่ที่
13	addr_street	varchar(max)	ถนน
14	addr_tumbon	varchar(max)	ตำบล/แขวง
15	addr_amphur	varchar(max)	อำเภอ/เขต
16	bus_type	varchar(max)	ประเภทกิจการ
17	shop_name	varchar(max)	ชื่อร้านค้า/สถานประกอบการ
18	shop_address	varchar(max)	ที่อยู่ร้านค้า/สถานประกอบการ
19	lat_long	varchar(max)	พิกัดละติจูด-ลองติจูด
20	team	varchar(max)	ทีมใหญ่
21	subteam	varchar(15)	ทีมย่อย
22	isic_code	varchar(max)	รหัสประเภทกิจการตามมาตรฐาน ISIC
23	isic_name	varchar(max)	ชื่อประเภทกิจการตามมาตรฐาน ISIC
24	vat_status	varchar(100)	สถานะผู้ประกอบการจดทะเบียน VAT
25	home_off_code	varchar(max)	รหัสสำนักงานสรรพากรพื้นที่สาขาที่เป็นสำนักงานต้นทะเบียน
26	remark	varchar(250)	หมายเหตุ
27	sp_project	varchar(250)	โครงการพิเศษ เช่น RD10x,ZocialEyes
28	y64_file_status	int	สถานะการยื่นแบบ ปีภาษี 2564 (1=ยื่น, 0=ไม่ยื่น)
29	y64_tot_inc_40_1_8_amt	float	รายได้ตามมาตรา 40(1)-(8) ปีภาษี 2564
30	y64_tot_alw_amt	float	รวมค่าลดหย่อน ปีภาษี 2564
31	y64_tot_tax_amt	float	ภาษีที่ต้องชำระ ปีภาษี 2564
32	y65_file_status	int	สถานะการยื่นแบบ ปีภาษี 2565 (1=ยื่น, 0=ไม่ยื่น)
33	y65_tot_inc_40_1_8_amt	float	รายได้ตามมาตรา 40(1)-(8) ปีภาษี 2565
34	y65_tot_alw_amt	float	รวมค่าลดหย่อน ปีภาษี 2565
35	y65_tot_tax_amt	float	ภาษีที่ต้องชำระ ปีภาษี 2565
36	y66_file_status	int	สถานะการยื่นแบบ ปีภาษี 2566 (1=ยื่น, 0=ไม่ยื่น)
37	y66_tot_inc_40_1_8_amt	float	รายได้ตามมาตรา 40(1)-(8) ปีภาษี 2566
38	y66_tot_alw_amt	float	รวมค่าลดหย่อน ปีภาษี 2566
39	y66_tot_tax_amt	float	ภาษีที่ต้องชำระ ปีภาษี 2566
40	y67_file_status	int	สถานะการยื่นแบบ ปีภาษี 2567 (1=ยื่น, 0=ไม่ยื่น)
41	y67_tot_inc_40_1_8_amt	float	รายได้ตามมาตรา 40(1)-(8) ปีภาษี 2567
42	y67_tot_alw_amt	float	รวมค่าลดหย่อน ปีภาษี 2567
43	y67_tot_tax_amt	float	ภาษีที่ต้องชำระ ปีภาษี 2567
44	y68_file_status	int	สถานะการยื่นแบบ ปีภาษี 2568 (1=ยื่น, 0=ไม่ยื่น)
45	y68_tot_inc_40_1_8_amt	float	รายได้ตามมาตรา 40(1)-(8) ปีภาษี 2568
46	y68_tot_alw_amt	float	รวมค่าลดหย่อน ปีภาษี 2568
47	y68_tot_tax_amt	float	ภาษีที่ต้องชำระ ปีภาษี 2568
48	y69_file_status	int	สถานะการยื่นแบบ ปีภาษี 2569 (1=ยื่น, 0=ไม่ยื่น)
49	y69_tot_inc_40_1_8_amt	float	รายได้ตามมาตรา 40(1)-(8) ปีภาษี 2569
50	y69_tot_alw_amt	float	รวมค่าลดหย่อน ปีภาษี 2569
51	y69_tot_tax_amt	float	ภาษีที่ต้องชำระ ปีภาษี 2569
หมายเหตุ: ข้อมูลในตารางนี้จะถูกปรับปรุงเป็นประจำทุกปี เมื่อมีการยื่นแบบภาษีปีใหม่

API
GET /api/taxpayer90/st/{stCode} 
GET /api/taxpayer90/st/{stCode}/page 
GET /api/taxpayer90/ss/{ssCode} 
GET /api/taxpayer90/ss/{ssCode}/page 
GET /api/taxpayer90/region/{regionCode} 
GET /api/taxpayer90/st/{stCode}/ss/{ssCode}
