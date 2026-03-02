สามารถดูการเขียนตัวแปรที่ถูกต้อง ได้ที่ไฟล์ README.md
ไฟล์นี้เป็นไฟล์อ้างอิงเท่านั้น ไม่ต้องแก้ไข ต้องการสื่อความหมายของตัวแปร
สำหรับ เนื้อหาที่ได้มาจาก API ภาพรวมผู้เสียภาษี


Table ITPP_FORM_COMMON (ข้อมูลทีอยู่ของผู้เสียภาษีที่จากหน้าแบบฯ (ทุกแบบ))			
Item	Field Name	Field Type	Description
1	dln	VARCHAR(42)	เลขคุมเอกสาร
2	dlnid	NUMERIC(4)	ลำดับรายการ
3	recorduseind	CHAR (1)	สถานะการใช้รายการ 'A' ข้อมูลล่าสุด
4	tcltaxtype	CHAR (3)	ประเภทภาษี จากระบบ TCL '001' บุคคลธรรมดา '002' นิติบุคคล
5	tclperfromdate	CHAR (8)	รอบระยะเวลบัญชี เริ่มต้น จากระบบ TCL
6	tclpertodate	CHAR (8)	รอบระยะเวลบัญชี สิ้นสุด จากระบบ TCL
7	tcleffdate	CHAR (8)	วันที่มีผลกระทบ จากระบบ TCL
8	tcltaxyear	CHAR (4)	ปีภาษี จากระบบ TCL
9	formcode	VARCHAR(7)	ประเภทแบบฯ
10	formyear	CHAR (4)	หน้าแบบปีภาษี
11	taxyear	CHAR (4)	ปีภาษีที่ยื่น
12	effdate	CHAR (8)	วันที่ยื่นแบบฯ
13	sublateind	CHAR (1)	0=ปกติ, 1=ยื่นเกินกำหนด
14	subind	CHAR (1)	0=ยื่นปกติ, 1=ยื่นเพิ่มเติม
15	lblind	CHAR (1)	สถานะแถบชื่อ
16	namechgind	CHAR (1)	1=แก้ไขชื่อ,0=ไม่แก้ไข
17	addrchgind	CHAR (1)	1=แก้ไขที่อยู่,0=ไม่แก้ไข
18	txpstaind	CHAR (1)	สถานภาพผู้มีเงินได้
19	txpmrystaind	CHAR (1)	ฐานะการสมรสและการยื่นรายการ
20	formaddrind	CHAR (1)	สถานะแสดงที่อยู่บนแบบฯ เหมือนที่อยู่บนระบบ TIN
21	addrhomeofcid	CHAR (8)	รหัสภูมิลำเนาผู้เสียภาษี
22	addrbldtext	VARCHAR(60)	ชื่ออาคาร
23	addrroomtext	VARCHAR(10)	ห้อง
24	addrfloortext	VARCHAR(10)	ชั้น
25	addrviltext	VARCHAR(60)	หมู่บ้าน
26	addrhousetext	VARCHAR(20)	บ้านเลขที่
27	addrmootext	VARCHAR(10)	หมู่
28	addrsoitext	VARCHAR(80)	ซอย
29	addrstreettext	VARCHAR(40)	ถนน
30	addrsubdistid	CHAR (6)	รหัสตำบล/แขวง
31	addrdistid	CHAR (4)	รหัสอำเภอ/เขต
32	addrprovid	CHAR (2)	รหัสจังหวัด
33	addrpostcodetext	CHAR (5)	รหัสไปรษณีย์
34	addrwebsitetext	VARCHAR(200)	ชื่อเวปไซต์
35	addrshoptext	VARCHAR(200)	ชื่อสถานประกอบการ
			
			
Table ITPP_FORM_TAXPAYER (ข้อมูลรายละเอียดผู้เสียภาษี (ทุกแบบ))			
Item	Field Name	Field Type	Description
1	dln	VARCHAR(42)	เลขคุมเอกสาร
2	dlnid	NUMERIC(4)	ลำดับรายการ
3	jointid	NUMERIC(1)	สถานะการยื่นแบบรวม 1 = ผู้มีเงินได้ 2 = คู่สมรส
4	recorduseind	CHAR (1)	สถานะการใช้รายการ
5	tcltxptin	CHAR (10)	TIN จากระบบ TCL
6	tcltxpnid	VARCHAR(15)	เลข 13 หลัก จากระบบ TCL
7	tcltxpuid	CHAR (25)	เลขระบุเอกสาร จากระบบ TCL
8	tcltaxamt	NUMERIC(18,2)	จำนวนเงินภาษีที่ต้องชำระตามแบบฯ
9	tclpenamt	NUMERIC(18,2)	เบี้ยปรับที่ต้องชำระตามแบบฯ
10	tclsuramt	NUMERIC(18,2)	เงินเพิ่มที่ต้องชำระตามแบบฯ
11	tclpayamt	NUMERIC(18,2)	จำนวนเงินที่ชำระ
12	tclbc35amt	NUMERIC(18,2)	จำนวนเงิน บช.35
13	txptin	CHAR (10)	TIN ตามแบบฯ
14	txpnid	VARCHAR(15)	เลข 13 หลัก ตามแบบฯ
15	formnameind	CHAR (1)	สถานะแสดงชื่อบนแบบฯ เหมือนกับชื่อบนระบบ TIN
16	txpttlid	VARCHAR(30)	รหัสคำนำหน้าชื่อผู้ประกอบการ
17	txpttltext	VARCHAR(100)	คำนำหน้าชื่อผู้ประกอบการ
18	txpfname	VARCHAR(160)	ชื่อผู้มีเงินได้
19	txplname	VARCHAR(80)	นามสกุลผู้มีเงินได้
20	txpbirthdate	CHAR (8)	วดป.เกิดผู้มีเงินได้
21	txpsexid	CHAR (1)	เพศ
22	spotin	VARCHAR(10)	TIN คู่สมรส
23	sponid	VARCHAR(15)	เลข 13 หลัก คู่สมรส
24	spottlid	VARCHAR(30)	รหัสคำนำหน้า คู่สมรส
25	spottltext	VARCHAR(100)	คำนำหน้า คู่สมรส
26	spofname	VARCHAR(160)	ชื่อ คู่สมรส
27	spolname	VARCHAR(80)	นามสกุล คู่สมรส
28	spobirthdate	CHAR (8)	วดป.เกิด คู่สมรส
29	txptaxrctamt	NUMERIC(18,2)	จำนวนเงินตามใบเสร็จ (ผู้มีเงินได้)
30	bc35ind	CHAR (1)	สถานะ บช.35
31	txpbc35amt	NUMERIC(18,2)	จำนวนเงิน บช.35
32	txprfnsignind	CHAR (1)	ลงชื่อขอคืนภาษี
33	txprfnamt	NUMERIC(18,2)	จำนวนเงินภาษีที่ขอคืน
34	txprfnmethodind	CHAR (1)	ช่องทางการคืน
35	txpbankid	CHAR (3)	รหัสธนาคาร
36	txpbankaccid	VARCHAR(20)	เลขที่บัญชี
37	spopassportid	VARCHAR(15)	เลขที่หนังสือเดินทาง
38	sponationid	VARCHAR(5)	รหัสสัญชาติ
39	txpemailtext	VARCHAR(100)	อีเมล์แอสเดส
40	txpemsind	VARCHAR(1)	Flag การลงทะเบียน EMS
41	txprctno	VARCHAR(30)	เลขที่ใบเสร็จรับเงิน
42	txpdonpolamt	NUMERIC(18,2)	จำนวนเงินประสงค์บริจาคอุดหนุนพรรคการเมือง ผู้มีเงินได้
43	spodonpolamt	NUMERIC(18,2)	จำนวนเงินประสงค์บริจาคอุดหนุนพรรคการเมือง คู่สมรส
44	txppencrimamt	NUMERIC(18,2)	ค่าปรับอาญ ถ้ายื่นภายใน 7 วันหลังจากเกินกำหนดเวลาปรับ 100 บาท ถ้าเกินปรับ 200 บาท
45	txpmname	VARCHAR(160)	ชื่อกลางผู้มีเงินได้
46	spomname	VARCHAR(160)	ชื่อกลางคู่สมรส