สามารถดูการเขียนตัวแปรที่ถูกต้อง ได้ที่ไฟล์ apipnd94.md
ไฟล์นี้เป็นไฟล์อ้างอิงเท่านั้น ไม่ต้องแก้ไข ต้องการสื่อความหมายของตัวแปร
สำหรับ เนื้อหาที่ได้มาจาก API 94 เท่านั้น

Table ITPP_FORM_PND94 (ข้อมูลแบบแสดงรายการ ภ.ง.ด.94 (MASTER))			
Item	Field Name	Field Type	Description
1	DLN	VARCHAR(42)	เลขคุมเอกสาร
2	DLN_ID	NUMERIC(3)	ลำดับรายการ
3	JOINT_ID	NUMERIC(1)	สถานะการยื่นแบบรวม 1 = ผู้มีเงินได้  2 = คู่สมรส
4	RECORD_USE_IND	CHAR (1)	สถานะการใช้รายการ
5	TXP_ALW_AMT	NUMERIC(18,2)	ค่าลดหย่อน(ผู้มีเงินได้)
6	SPO_ALW_AMT	NUMERIC(18,2)	ค่าลดหย่อน(คู่สมรส)
7	CHLD_NONE_STD_CNT	NUMERIC(1)	จำนวนบุตรไม่ได้เรียนหนังสือ
8	TXP_ALW_CHLD_NONE_STD_AMT	NUMERIC(18,2)	ค่าลดหย่อนบุตรไม่ได้เรียนหนังสือ
9	CHLD_STD_CNT	NUMERIC(1)	จำนวนบุตรเรียนหนังสือ
10	TXP_ALW_CHLD_STD_AMT	NUMERIC(18,2)	ค่าลดหย่อนบุตรเรียนหนังสือ
11	TXP_FATHER_IND	NUMERIC(1)	Flag ลดหย่อนบิดาผู้มีเงินได้
12	TXP_FATHER_NID	VARCHAR(13)	เลข 13 หลัก บิดาผู้มีเงินได้
13	TXP_ALW_FATHER_AMT	NUMERIC(18,2)	จำนวนเงินลดหย่อนบิดาผู้มีเงินได้
14	TXP_MOTHER_IND	NUMERIC(1)	จำนวนเงินลดหย่อนมารดาผู้มีเงินได้
15	TXP_MOTHER_NID	VARCHAR(13)	เลข 13 หลัก มารดาผู้มีเงินได้
16	TXP_ALW_MOTHER_AMT	NUMERIC(18,2)	จำนวนเงินลดหย่อนมารดาผู้มีเงินได้
17	SPO_FATHER_IND	NUMERIC(1)	จำนวนเงินลดหย่อนบิดาคู่สมรส
18	SPO_FATHER_NID	VARCHAR(13)	เลข 13 หลัก บิดาคู่สมรส
19	SPO_ALW_FATHER_AMT	NUMERIC(18,2)	จำนวนเงินลดหย่อนบิดาคู่สมรส
20	SPO_MOTHER_IND	NUMERIC(1)	จำนวนเงินลดหย่อนมารดาคู่สมรส
21	SPO_MOTHER_NID	VARCHAR(13)	เลข 13 หลัก มารดาคู่สมรส
22	SPO_ALW_MOTHER_AMT	NUMERIC(18,2)	จำนวนเงินลดหย่อนมารดาคู่สมรส
23	TXP_ALW_LY04_AMT	NUMERIC(18,2)	ค่าอุปการะเลี้ยงดูคนพิการ
24	TXP_FATHER_INS_NID	VARCHAR(13)	PIN บิดาผู้มีเงินได้ ที่ประกันสุขภาพ
25	TXP_MOTHER_INS_NID	VARCHAR(13)	PIN มารดาผู้มีเงินได้ ที่ประกันสุขภาพ
26	SPO_FATHER_INS_NID	VARCHAR(13)	PIN บิดาคู่สมรส ที่ประกันสุขภาพ
27	SPO_MOTHER_INS_NID	VARCHAR(13)	PIN บิดาคู่สมรส ที่ประกันสุขภาพ
28	TXP_ALW_HLT_INS_AMT	NUMERIC(18,2)	เบี้ยประกันสุขภาพบิดามารดา
29	TXP_ALW_LIFT_INS_PRM_AMT	NUMERIC(18,2)	เบี้ยประกันชีวิต
30	TXP_ALW_RMF_AMT	NUMERIC(18,2)	ค่าซื้อหน่วยลงทุนในกองทุนรวมเพื่อการเลี้ยงชีพ
31	TXP_ALW_LTF_AMT	NUMERIC(18,2)	ค่าซื้อหน่วยลงทุนฯ ระยะยาว
32	TXP_ALW_INT_LOAN_AMT	NUMERIC(18,2)	ดอกเบี้ยเงินกู้ยืม ซื้อ เช่า อาคาร
33	TXP_ALW_BUD_PUR_AMT	NUMERIC(18,2)	เงินค่าซื้ออาคารฯ
34	TXP_ALW_SSF_AMT	NUMERIC(18,2)	เงินสมทบทุนประกันสังคม
35	TXP_TOT_ALW_AMT_D	NUMERIC(18,2)	รวมค่าลดหย่อน จากการบันทึก
36	TXP_TOT_ALW_AMT_C	NUMERIC(18,2)	รวมค่าลดหย่อน จากการคำนวณ
37	TXP_TOT_ASS_INC_AMT_D	NUMERIC(18,2)	รวมเงินได้ทุกประเภทจากการบันทึก
38	TXP_TOT_ASS_INC_AMT_C	NUMERIC(18,2)	รวมเงินได้ทุกประเภทจากการคำนวณ
39	TXP_TOT_DED_EXP_INC_AMT_D	NUMERIC(18,2)	รวมเงินได้หลังหักค่าใช้จ่ายจากการบันทึก
40	TXP_TOT_DED_EXP_INC_AMT_C	NUMERIC(18,2)	รวมเงินได้หลังหักค่าใช้จ่ายจากการคำนวณ
41	TXP_AFT_DED_ALW_INC_AMT_C	NUMERIC(18,2)	รวมเงินได้หลังหักค่าลดหย่อนจากการคำนวณ
42	TXP_CON_EDU_AMT_D	NUMERIC(18,2)	เงินสนับสนุนการศึกษา จากการบันทึก
43	TXP_CON_EDU_AMT_C	NUMERIC(18,2)	เงินสนับสนุนการศึกษา จากการคำนวณ
44	TXP_CON_SPORT_AMT_D	NUMERIC(18,2)	เงินสนับสนุนการกีฬา จากการบันทึก
45	TXP_CON_SPORT_AMT_C	NUMERIC(18,2)	เงินสนับสนุนการกีฬา จากการคำนวณ
46	TXP_BEF_DON_AMT_C	NUMERIC(18,2)	เงินได้คงเหลือก่อนหักเงินบริจาค
47	TXP_DON_AMT_D	NUMERIC(18,2)	เงินบริจาคจากการบันทึก
48	TXP_DON_AMT_C	NUMERIC(18,2)	เงินบริจาคจากการคำนวณ
49	TXP_NET_INC_AMT_D	NUMERIC(18,2)	เงินได้สุทธิ จากการบันทึก
50	TXP_NET_INC_AMT_C	NUMERIC(18,2)	เงินได้สุทธิ จากการคำนวณ
51	TXP_NET_TAX_AMT	NUMERIC(18,2)	ภาษีที่คำนวณจากเงินได้สุทธิ
52	TXP_TAX_ASS_AMT	NUMERIC(18,2)	ภาษีที่คำนวณจากเงินได้พึงประเมิน
53	TXP_TAX_AMT	NUMERIC(18,2)	ภาษีเงินได้ที่ต้องชำระ
54	TXP_TAX_SPEC_AMT	NUMERIC(18,2)	ภาษีที่ต้องชำระจากกรณีอื่น
55	TXP_TAX_SUM_SPEC_AMT	NUMERIC(18,2)	รวมภาษีต้องชำระ (ค 13)
56	TXP_WHT_AMT	NUMERIC(18,2)	ภาษีหัก ณ ที่จ่ายและที่ชำระไว้
57	TXP_BAL_TAX_AMT	NUMERIC(18,2)	คงเหลือภาษีที่ต้องชำระ
58	TXP_TAX_PAID_PND94_AMT	NUMERIC(18,2)	ภาษีที่ชำระไว้ตามแบ ภงด94
59	TXP_ADD_TAX_AMT	NUMERIC(18,2)	รวมภาษีที่ชำระเพิ่มเติม
60	TXP_SUR_AMT	NUMERIC(18,2)	เงินเพิ่มตามแบบฯ
61	TXP_TOT_TAX_AMT_D	NUMERIC(18,2)	รวมภาษีส่วนที่ชำระเพิ่มเติม จากการบันทึก
62	TXP_TOT_TAX_AMT_C	NUMERIC(18,2)	รวมภาษีส่วนที่ชำระเพิ่มเติม จากการคำนวณ
63	TXP_ALW_LIFT_INS_PENS_AMT	NUMERIC(18,2)	เบี้ยประกันชีวิตแบบบำนาญ
64	TXP_ALW_REPA_HOUSE_AMT	NUMERIC(18,2)	เงินลดหย่อนอื่นๆ
65	TXP_VALUE_PROP_AMT	NUMERIC(18,2)	มูลค่าอสังหาริมทรัพย์
66	TXP_EXE_PROP_AMT_D	NUMERIC(18,2)	หัก ภาษีเงินได้ที่ได้รับยกเว้นจากการซื้ออสังหาริมทรัพย์ (บันทึก)
67	TXP_EXE_PROP_AMT_C	NUMERIC(18,2)	หัก ภาษีเงินได้ที่ได้รับยกเว้นจากการซื้ออสังหาริมทรัพย์ (คำนวณ)
68	TXP_AFT_PROP_AMT_D	NUMERIC(18,2)	คงเหลือภาษีที่ชำระเพิ่ม (กรณีภาษีมากกว่าได้รับยกเว้น (บันทึก))
69	TXP_AFT_PROP_AMT_C	NUMERIC(18,2)	คงเหลือภาษีที่ชำระเพิ่ม (กรณีภาษีมากกว่าได้รับยกเว้น (คำนวณ))


Table ITPP_FORM_PND94_D (ข้อมูลแบบแสดงรายการ ภ.ง.ด.94 (DETAIL))			
Item	Field Name	Field Type	Description
1	DLN	VARCHAR(42)	เลขคุมเอกสาร
2	DLN_ID	NUMERIC(3)	ลำดับรายการ
3	JOINT_ID	NUMERIC(1)	สถานะการยื่นแบบ 1 = ผู้มีเงินได้  2 = คู่สมรส
4	INC_ID	CHAR(3)	รหัสเงินได้
5	INC_SEQ	NUMERIC(3)	ลำดับที่ของรหัสเงินได้
6	RECORD_USE_IND	CHAR(1)	สถานะการใช้รายการ
7	COM_TIN	VARCHAR(10) 	เลขประจำตัวผู้เสียภาษีอากร 10 หลัก 
8	COM_NID	VARCHAR(13) 	เลขประจำตัวประชาชน 
9	INC_AMT	NUMERIC(18,2)	เงินได้พึงประเมิน
10	INC_SIGN_IND	CHAR(1)	0='+', 1='-'
11	EXP_TYPE_IND	CHAR(1)	ประเภทค่าใช้จ่าย 0 - เหมา 1-จริง  Y-ยกเว้น --N -ไม่ยกเว้น
12	EXP_RATE	NUMERIC(4,2)	อัตราค่าใช้จ่าย
13	EXP_AMT	NUMERIC(18,2)	ค่าใช้จ่าย
14	EXC_AMT	NUMERIC(18,2)	เงินได้ยกเว้นภาษี
15	AFT_DED_EXP_INC_AMT	NUMERIC(18,2)	เงินได้หลังหักค่าใช้จ่าย
16	WHT_AMT	NUMERIC(18,2)	ภาษี หัก ณ ที่จ่าย
