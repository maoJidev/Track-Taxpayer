ิbaseURL http://10.208.1.207:8081/taxpayer-tracking/ for only this LOGIN	Region	ST	SS

LOGIN			header		
	/api/auth/login		Content-Type:	application/json	
got Token	/api/offices/regions		Authorization: Bearer YOUR_TOKEN		
Region 					
	/api/offices/regions			# ดึงข้อมูลภาคทั้งหมด	
	/api/offices/regions/{regionCode}			# ดึงข้อมูลภาคตาม Code	
ST					
	/api/offices/st			# ดึงข้อมูลพื้นที่ทั้งหมด	
	/api/offices/st/{stCode}			# ดึงข้อมูลพื้นที่ตาม Code	
	/api/offices/st/region/{regionCode}			# ดึงข้อมูลพื้นที่ตามภาค	
SS					
	/api/offices/ss			# ดึงข้อมูลสาขาทั้งหมด	
	/api/offices/ss/{ssCode}			# ดึงข้อมูลสาขาตาม Code	
	/api/offices/ss/region/{regionCode}			# ดึงข้อมูลสาขาตามภาค	
	/api/offices/ss/st/{stCode}			# ดึงข้อมูลสาขาตามพื้นที่	
	/api/offices/ss/ktb/{status}			# ดึงข้อมูลสาขาตาม KTB Status	


["POST"]
http://10.208.1.207:8081/taxpayer-tracking/api/auth/login

req
{"userId":"NB195096","password":"pass1234"}     

response
{
    "success": true,
    "message": "เข้าสู่ระบบสำเร็จ",
    "data": {
        "token": "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySW5kZXgiOjEsInN0T2ZmaWNlQ29kZSI6IjEyMDAwMDAwIiwidXNlck5hbWUiOiLguJnguLTguKfguLHguJLguJnguYwg4Lia4Li44Lij4Li14LiZ4Lit4LiBIiwidXNlckdyb3VwIjoicmVnaW9uIiwic3RPZmZpY2VOYW1lIjoi4Liq4Liz4LiZ4Lix4LiB4LiH4Liy4LiZ4Liq4Lij4Lij4Lie4Liy4LiB4Lij4Lig4Liy4LiEIDEyIiwic3ViIjoiTkIxOTUwOTYiLCJpYXQiOjE3NzE0MDEwNTksImV4cCI6MTc3MTQ4NzQ1OX0.5mSZQ5S9-f4q_BnkoBGWjrgyxjq3wJEL6NpRHKMRGEQlfCz3FTKyN6MbF0eOoYSu",
        "type": "Bearer",
        "user": {
            "userIndex": 1,
            "userId": "NB195096",
            "userName": "นิวัฒน์ บุรีนอก",
            "stOfficeCode": "12000000",
            "stOfficeName": "สำนักงานสรรพากรภาค 12",
            "ssOfficeCode": "",
            "ssOfficeName": "",
            "position": "นักวิชาการคอมพิวเตอร์ชำนาญการพิเศษ",
            "userGroup": "region",
            "userSubGroup": "-",
            "activeStatus": "1",
            "lastLogin": "2026-02-18T14:50:59.5167203"
        }
    }
}

i have ex username password other role in //info/infor_iogin.md

["GET"]
http://10.208.1.207:8081/taxpayer-tracking/api/offices/regions

req
Authorization : Bearer token

{
    "success": true,
    "message": "Success",
    "data": [
        {
            "regionOfficeCode": "00000719",
            "regionOfficeName": "บร."
        },
        {
            "regionOfficeCode": "00000722",
            "regionOfficeName": "สำนักบริหารภาษีธุรกิจขนาดใหญ่"
        },
        {
            "regionOfficeCode": "01000000",
            "regionOfficeName": "สำนักงานสรรพากรภาค 1"
        },
        {
            "regionOfficeCode": "02000000",
            "regionOfficeName": "สำนักงานสรรพากรภาค 2"
        },
        {
            "regionOfficeCode": "03000000",
            "regionOfficeName": "สำนักงานสรรพากรภาค 3"
        },
        {
            "regionOfficeCode": "04000000",
            "regionOfficeName": "สำนักงานสรรพากรภาค 4"
        },
        {
            "regionOfficeCode": "05000000",
            "regionOfficeName": "สำนักงานสรรพากรภาค 5"
        },
        {
            "regionOfficeCode": "06000000",
            "regionOfficeName": "สำนักงานสรรพากรภาค 6"
        },
        {
            "regionOfficeCode": "07000000",
            "regionOfficeName": "สำนักงานสรรพากรภาค 7"
        },
        {
            "regionOfficeCode": "08000000",
            "regionOfficeName": "สำนักงานสรรพากรภาค 8"
        },
        {
            "regionOfficeCode": "09000000",
            "regionOfficeName": "สำนักงานสรรพากรภาค 9"
        },
        {
            "regionOfficeCode": "10000000",
            "regionOfficeName": "สำนักงานสรรพากรภาค 10"
        },
        {
            "regionOfficeCode": "11000000",
            "regionOfficeName": "สำนักงานสรรพากรภาค 11"
        },
        {
            "regionOfficeCode": "12000000",
            "regionOfficeName": "สำนักงานสรรพากรภาค 12"
        }
    ]
}

["GET"]
http://10.208.1.207:8081/taxpayer-tracking/api/offices/st

req
Authorization : Bearer token

{
    "success": true,
    "message": "Success",
    "data": [
        {
            "stOfficeCode": "00000719",
            "stOfficeName": "บร.",
            "regionOfficeCode": "00000719",
            "stOfficeName2": "บร.                                                                                                                                                   "
        },
        {
            "stOfficeCode": "01001000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 1",
            "regionOfficeCode": "01000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 1                                                                                                                                    "
        },
        {
            "stOfficeCode": "01002000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 2",
            "regionOfficeCode": "01000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 2                                                                                                                                    "
        },
        {
            "stOfficeCode": "01003000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 3",
            "regionOfficeCode": "01000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 3                                                                                                                                    "
        },
        {
            "stOfficeCode": "01004000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 4",
            "regionOfficeCode": "01000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 4                                                                                                                                    "
        },
        {
            "stOfficeCode": "01005000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 5",
            "regionOfficeCode": "01000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 5                                                                                                                                    "
        },
        {
            "stOfficeCode": "01006000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 6",
            "regionOfficeCode": "01000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 6                                                                                                                                    "
        },
        {
            "stOfficeCode": "01007000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 7",
            "regionOfficeCode": "01000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 7                                                                                                                                    "
        },
        {
            "stOfficeCode": "01008000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 8",
            "regionOfficeCode": "01000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 8                                                                                                                                    "
        },
        {
            "stOfficeCode": "01009000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 9",
            "regionOfficeCode": "01000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 9                                                                                                                                    "
        },
        {
            "stOfficeCode": "02010000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 10",
            "regionOfficeCode": "02000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 10                                                                                                                                   "
        },
        {
            "stOfficeCode": "02011000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 11",
            "regionOfficeCode": "02000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 11                                                                                                                                   "
        },
        {
            "stOfficeCode": "02012000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 12",
            "regionOfficeCode": "02000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 12                                                                                                                                   "
        },
        {
            "stOfficeCode": "02013000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 13",
            "regionOfficeCode": "02000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 13                                                                                                                                   "
        },
        {
            "stOfficeCode": "02014000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 14",
            "regionOfficeCode": "02000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 14                                                                                                                                   "
        },
        {
            "stOfficeCode": "02015000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 15",
            "regionOfficeCode": "02000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 15                                                                                                                                   "
        },
        {
            "stOfficeCode": "02016000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 16",
            "regionOfficeCode": "02000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 16                                                                                                                                   "
        },
        {
            "stOfficeCode": "02017000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 17",
            "regionOfficeCode": "02000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 17                                                                                                                                   "
        },
        {
            "stOfficeCode": "02018000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 18",
            "regionOfficeCode": "02000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 18                                                                                                                                   "
        },
        {
            "stOfficeCode": "02019000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 19",
            "regionOfficeCode": "02000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 19                                                                                                                                   "
        },
        {
            "stOfficeCode": "02020000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 20",
            "regionOfficeCode": "02000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 20                                                                                                                                   "
        },
        {
            "stOfficeCode": "02021000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 21",
            "regionOfficeCode": "02000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 21                                                                                                                                   "
        },
        {
            "stOfficeCode": "03022000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 22",
            "regionOfficeCode": "03000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 22                                                                                                                                   "
        },
        {
            "stOfficeCode": "03023000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 23",
            "regionOfficeCode": "03000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 23                                                                                                                                   "
        },
        {
            "stOfficeCode": "03024000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 24",
            "regionOfficeCode": "03000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 24                                                                                                                                   "
        },
        {
            "stOfficeCode": "03025000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 25",
            "regionOfficeCode": "03000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 25                                                                                                                                   "
        },
        {
            "stOfficeCode": "03026000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 26",
            "regionOfficeCode": "03000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 26                                                                                                                                   "
        },
        {
            "stOfficeCode": "03027000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 27",
            "regionOfficeCode": "03000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 27                                                                                                                                   "
        },
        {
            "stOfficeCode": "03028000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 28",
            "regionOfficeCode": "03000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 28                                                                                                                                   "
        },
        {
            "stOfficeCode": "03029000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 29",
            "regionOfficeCode": "03000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 29                                                                                                                                   "
        },
        {
            "stOfficeCode": "03030000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กรุงเทพมหานคร 30",
            "regionOfficeCode": "03000000",
            "stOfficeName2": "สท.กรุงเทพมหานคร 30                                                                                                                                   "
        },
        {
            "stOfficeCode": "04120000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่นนทบุรี",
            "regionOfficeCode": "04000000",
            "stOfficeName2": "สท.นนทบุรี                                                                                                                                            "
        },
        {
            "stOfficeCode": "04121000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่นนทบุรี 2",
            "regionOfficeCode": "04000000",
            "stOfficeName2": "สท.นนทบุรี 2                                                                                                                                          "
        },
        {
            "stOfficeCode": "04130000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ปทุมธานี 1",
            "regionOfficeCode": "04000000",
            "stOfficeName2": "สท.ปทุมธานี 1                                                                                                                                         "
        },
        {
            "stOfficeCode": "04131000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ปทุมธานี 2",
            "regionOfficeCode": "04000000",
            "stOfficeName2": "สท.ปทุมธานี 2                                                                                                                                         "
        },
        {
            "stOfficeCode": "04140000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่พระนครศรีอยุธยา 1",
            "regionOfficeCode": "04000000",
            "stOfficeName2": "สท.พระนครศรีอยุธยา 1                                                                                                                                  "
        },
        {
            "stOfficeCode": "04141000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่พระนครศรีอยุธยา 2",
            "regionOfficeCode": "04000000",
            "stOfficeName2": "สท.พระนครศรีอยุธยา 2                                                                                                                                  "
        },
        {
            "stOfficeCode": "04150000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่อ่างทอง",
            "regionOfficeCode": "04000000",
            "stOfficeName2": "สท.อ่างทอง                                                                                                                                            "
        },
        {
            "stOfficeCode": "04160000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ลพบุรี",
            "regionOfficeCode": "04000000",
            "stOfficeName2": "สท.ลพบุรี                                                                                                                                             "
        },
        {
            "stOfficeCode": "04170000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สิงห์บุรี",
            "regionOfficeCode": "04000000",
            "stOfficeName2": "สท.สิงห์บุรี                                                                                                                                          "
        },
        {
            "stOfficeCode": "04180000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ชัยนาท",
            "regionOfficeCode": "04000000",
            "stOfficeName2": "สท.ชัยนาท                                                                                                                                             "
        },
        {
            "stOfficeCode": "04190000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สระบุรี",
            "regionOfficeCode": "04000000",
            "stOfficeName2": "สท.สระบุรี                                                                                                                                            "
        },
        {
            "stOfficeCode": "04610000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่อุทัยธานี",
            "regionOfficeCode": "04000000",
            "stOfficeName2": "สท.อุทัยธานี                                                                                                                                          "
        },
        {
            "stOfficeCode": "05110000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สมุทรปราการ 1",
            "regionOfficeCode": "05000000",
            "stOfficeName2": "สท.สมุทรปราการ 1                                                                                                                                      "
        },
        {
            "stOfficeCode": "05111000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สมุทรปราการ 2",
            "regionOfficeCode": "05000000",
            "stOfficeName2": "สท.สมุทรปราการ 2                                                                                                                                      "
        },
        {
            "stOfficeCode": "05112000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สมุทรปราการ 3",
            "regionOfficeCode": "05000000",
            "stOfficeName2": "สท.สมุทรปราการ 3                                                                                                                                      "
        },
        {
            "stOfficeCode": "05200000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ชลบุรี 1",
            "regionOfficeCode": "05000000",
            "stOfficeName2": "สท.ชลบุรี 1                                                                                                                                           "
        },
        {
            "stOfficeCode": "05201000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ชลบุรี 2",
            "regionOfficeCode": "05000000",
            "stOfficeName2": "สท.ชลบุรี 2                                                                                                                                           "
        },
        {
            "stOfficeCode": "05202000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ชลบุรี 3",
            "regionOfficeCode": "05000000",
            "stOfficeName2": "สท.ชลบุรี 3                                                                                                                                           "
        },
        {
            "stOfficeCode": "05210000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ระยอง",
            "regionOfficeCode": "05000000",
            "stOfficeName2": "สท.ระยอง                                                                                                                                              "
        },
        {
            "stOfficeCode": "05220000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่จันทบุรี",
            "regionOfficeCode": "05000000",
            "stOfficeName2": "สท.จันทบุรี                                                                                                                                           "
        },
        {
            "stOfficeCode": "05230000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ตราด",
            "regionOfficeCode": "05000000",
            "stOfficeName2": "สท.ตราด                                                                                                                                               "
        },
        {
            "stOfficeCode": "05240000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ฉะเชิงเทรา",
            "regionOfficeCode": "05000000",
            "stOfficeName2": "สท.ฉะเชิงเทรา                                                                                                                                         "
        },
        {
            "stOfficeCode": "05250000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ปราจีนบุรี",
            "regionOfficeCode": "05000000",
            "stOfficeName2": "สท.ปราจีนบุรี                                                                                                                                         "
        },
        {
            "stOfficeCode": "05260000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่นครนายก",
            "regionOfficeCode": "05000000",
            "stOfficeName2": "สท.นครนายก                                                                                                                                            "
        },
        {
            "stOfficeCode": "05270000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สระแก้ว",
            "regionOfficeCode": "05000000",
            "stOfficeName2": "สท.สระแก้ว                                                                                                                                            "
        },
        {
            "stOfficeCode": "06700000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ราชบุรี",
            "regionOfficeCode": "06000000",
            "stOfficeName2": "สท.ราชบุรี                                                                                                                                            "
        },
        {
            "stOfficeCode": "06710000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กาญจนบุรี",
            "regionOfficeCode": "06000000",
            "stOfficeName2": "สท.กาญจนบุรี                                                                                                                                          "
        },
        {
            "stOfficeCode": "06720000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สุพรรณบุรี",
            "regionOfficeCode": "06000000",
            "stOfficeName2": "สท.สุพรรณบุรี                                                                                                                                         "
        },
        {
            "stOfficeCode": "06730000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่นครปฐม 1",
            "regionOfficeCode": "06000000",
            "stOfficeName2": "สท.นครปฐม 1                                                                                                                                           "
        },
        {
            "stOfficeCode": "06731000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่นครปฐม 2",
            "regionOfficeCode": "06000000",
            "stOfficeName2": "สท.นครปฐม 2                                                                                                                                           "
        },
        {
            "stOfficeCode": "06740000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สมุทรสาคร 1",
            "regionOfficeCode": "06000000",
            "stOfficeName2": "สท.สมุทรสาคร 1                                                                                                                                        "
        },
        {
            "stOfficeCode": "06741000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สมุทรสาคร 2",
            "regionOfficeCode": "06000000",
            "stOfficeName2": "สท.สมุทรสาคร 2                                                                                                                                        "
        },
        {
            "stOfficeCode": "06750000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สมุทรสงคราม",
            "regionOfficeCode": "06000000",
            "stOfficeName2": "สท.สมุทรสงคราม                                                                                                                                        "
        },
        {
            "stOfficeCode": "06760000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่เพชรบุรี",
            "regionOfficeCode": "06000000",
            "stOfficeName2": "สท.เพชรบุรี                                                                                                                                           "
        },
        {
            "stOfficeCode": "06770000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ประจวบคีรีขันธ์",
            "regionOfficeCode": "06000000",
            "stOfficeName2": "สท.ประจวบคีรีขันธ์                                                                                                                                    "
        },
        {
            "stOfficeCode": "07530000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่อุตรดิตถ์",
            "regionOfficeCode": "07000000",
            "stOfficeName2": "สท.อุตรดิตถ์                                                                                                                                          "
        },
        {
            "stOfficeCode": "07600000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่นครสวรรค์",
            "regionOfficeCode": "07000000",
            "stOfficeName2": "สท.นครสวรรค์                                                                                                                                          "
        },
        {
            "stOfficeCode": "07620000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กำแพงเพชร",
            "regionOfficeCode": "07000000",
            "stOfficeName2": "สท.กำแพงเพชร                                                                                                                                          "
        },
        {
            "stOfficeCode": "07630000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ตาก",
            "regionOfficeCode": "07000000",
            "stOfficeName2": "สท.ตาก                                                                                                                                                "
        },
        {
            "stOfficeCode": "07640000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สุโขทัย",
            "regionOfficeCode": "07000000",
            "stOfficeName2": "สท.สุโขทัย                                                                                                                                            "
        },
        {
            "stOfficeCode": "07650000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่พิษณุโลก",
            "regionOfficeCode": "07000000",
            "stOfficeName2": "สท.พิษณุโลก                                                                                                                                           "
        },
        {
            "stOfficeCode": "07660000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่พิจิตร",
            "regionOfficeCode": "07000000",
            "stOfficeName2": "สท.พิจิตร                                                                                                                                             "
        },
        {
            "stOfficeCode": "07670000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่เพชรบูรณ์",
            "regionOfficeCode": "07000000",
            "stOfficeName2": "สท.เพชรบูรณ์                                                                                                                                          "
        },
        {
            "stOfficeCode": "08500000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่เชียงใหม่ 1",
            "regionOfficeCode": "08000000",
            "stOfficeName2": "สท.เชียงใหม่ 1                                                                                                                                        "
        },
        {
            "stOfficeCode": "08501000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่เชียงใหม่ 2",
            "regionOfficeCode": "08000000",
            "stOfficeName2": "สท.เชียงใหม่ 2                                                                                                                                        "
        },
        {
            "stOfficeCode": "08510000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ลำพูน",
            "regionOfficeCode": "08000000",
            "stOfficeName2": "สท.ลำพูน                                                                                                                                              "
        },
        {
            "stOfficeCode": "08520000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ลำปาง",
            "regionOfficeCode": "08000000",
            "stOfficeName2": "สท.ลำปาง                                                                                                                                              "
        },
        {
            "stOfficeCode": "08540000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่แพร่",
            "regionOfficeCode": "08000000",
            "stOfficeName2": "สท.แพร่                                                                                                                                               "
        },
        {
            "stOfficeCode": "08550000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่น่าน",
            "regionOfficeCode": "08000000",
            "stOfficeName2": "สท.น่าน                                                                                                                                               "
        },
        {
            "stOfficeCode": "08560000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่พะเยา",
            "regionOfficeCode": "08000000",
            "stOfficeName2": "สท.พะเยา                                                                                                                                              "
        },
        {
            "stOfficeCode": "08570000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่เชียงราย",
            "regionOfficeCode": "08000000",
            "stOfficeName2": "สท.เชียงราย                                                                                                                                           "
        },
        {
            "stOfficeCode": "08580000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่แม่ฮ่องสอน",
            "regionOfficeCode": "08000000",
            "stOfficeName2": "สท.แม่ฮ่องสอน                                                                                                                                         "
        },
        {
            "stOfficeCode": "09300000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่นครราชสีมา 1",
            "regionOfficeCode": "09000000",
            "stOfficeName2": "สท.นครราชสีมา 1                                                                                                                                       "
        },
        {
            "stOfficeCode": "09301000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่นครราชสีมา 2",
            "regionOfficeCode": "09000000",
            "stOfficeName2": "สท.นครราชสีมา 2                                                                                                                                       "
        },
        {
            "stOfficeCode": "09310000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่บุรีรัมย์",
            "regionOfficeCode": "09000000",
            "stOfficeName2": "สท.บุรีรัมย์                                                                                                                                          "
        },
        {
            "stOfficeCode": "09320000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สุรินทร์",
            "regionOfficeCode": "09000000",
            "stOfficeName2": "สท.สุรินทร์                                                                                                                                           "
        },
        {
            "stOfficeCode": "09330000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ศรีสะเกษ",
            "regionOfficeCode": "09000000",
            "stOfficeName2": "สท.ศรีสะเกษ                                                                                                                                           "
        },
        {
            "stOfficeCode": "09340000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่อุบลราชธานี",
            "regionOfficeCode": "09000000",
            "stOfficeName2": "สท.อุบลราชธานี                                                                                                                                        "
        },
        {
            "stOfficeCode": "09350000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ยโสธร",
            "regionOfficeCode": "09000000",
            "stOfficeName2": "สท.ยโสธร                                                                                                                                              "
        },
        {
            "stOfficeCode": "09360000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ชัยภูมิ",
            "regionOfficeCode": "09000000",
            "stOfficeName2": "สท.ชัยภูมิ                                                                                                                                            "
        },
        {
            "stOfficeCode": "09370000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่อำนาจเจริญ",
            "regionOfficeCode": "09000000",
            "stOfficeName2": "สท.อำนาจเจริญ                                                                                                                                         "
        },
        {
            "stOfficeCode": "10380000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่บึงกาฬ",
            "regionOfficeCode": "10000000",
            "stOfficeName2": "สท.บึงกาฬ                                                                                                                                             "
        },
        {
            "stOfficeCode": "10390000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่หนองบัวลำภู",
            "regionOfficeCode": "10000000",
            "stOfficeName2": "สท.หนองบัวลำภู                                                                                                                                        "
        },
        {
            "stOfficeCode": "10400000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ขอนแก่น",
            "regionOfficeCode": "10000000",
            "stOfficeName2": "สท.ขอนแก่น                                                                                                                                            "
        },
        {
            "stOfficeCode": "10410000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่อุดรธานี",
            "regionOfficeCode": "10000000",
            "stOfficeName2": "สท.อุดรธานี                                                                                                                                           "
        },
        {
            "stOfficeCode": "10420000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่เลย",
            "regionOfficeCode": "10000000",
            "stOfficeName2": "สท.เลย                                                                                                                                                "
        },
        {
            "stOfficeCode": "10430000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่หนองคาย",
            "regionOfficeCode": "10000000",
            "stOfficeName2": "สท.หนองคาย                                                                                                                                            "
        },
        {
            "stOfficeCode": "10440000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่มหาสารคาม",
            "regionOfficeCode": "10000000",
            "stOfficeName2": "สท.มหาสารคาม                                                                                                                                          "
        },
        {
            "stOfficeCode": "10450000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ร้อยเอ็ด",
            "regionOfficeCode": "10000000",
            "stOfficeName2": "สท.ร้อยเอ็ด                                                                                                                                           "
        },
        {
            "stOfficeCode": "10460000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กาฬสินธุ์",
            "regionOfficeCode": "10000000",
            "stOfficeName2": "สท.กาฬสินธุ์                                                                                                                                          "
        },
        {
            "stOfficeCode": "10470000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สกลนคร",
            "regionOfficeCode": "10000000",
            "stOfficeName2": "สท.สกลนคร                                                                                                                                             "
        },
        {
            "stOfficeCode": "10480000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่นครพนม",
            "regionOfficeCode": "10000000",
            "stOfficeName2": "สท.นครพนม                                                                                                                                             "
        },
        {
            "stOfficeCode": "10490000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่มุกดาหาร",
            "regionOfficeCode": "10000000",
            "stOfficeName2": "สท.มุกดาหาร                                                                                                                                           "
        },
        {
            "stOfficeCode": "11800000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่นครศรีธรรมราช",
            "regionOfficeCode": "11000000",
            "stOfficeName2": "สท.นครศรีธรรมราช                                                                                                                                      "
        },
        {
            "stOfficeCode": "11810000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่กระบี่",
            "regionOfficeCode": "11000000",
            "stOfficeName2": "สท.กระบี่                                                                                                                                             "
        },
        {
            "stOfficeCode": "11820000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่พังงา",
            "regionOfficeCode": "11000000",
            "stOfficeName2": "สท.พังงา                                                                                                                                              "
        },
        {
            "stOfficeCode": "11830000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ภูเก็ต",
            "regionOfficeCode": "11000000",
            "stOfficeName2": "สท.ภูเก็ต                                                                                                                                             "
        },
        {
            "stOfficeCode": "11840000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สุราษฎร์ธานี 1",
            "regionOfficeCode": "11000000",
            "stOfficeName2": "สท.สุราษฎร์ธานี 1                                                                                                                                     "
        },
        {
            "stOfficeCode": "11841000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สุราษฎร์ธานี 2",
            "regionOfficeCode": "11000000",
            "stOfficeName2": "สท.สุราษฎร์ธานี 2                                                                                                                                     "
        },
        {
            "stOfficeCode": "11850000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ระนอง",
            "regionOfficeCode": "11000000",
            "stOfficeName2": "สท.ระนอง                                                                                                                                              "
        },
        {
            "stOfficeCode": "11860000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ชุมพร",
            "regionOfficeCode": "11000000",
            "stOfficeName2": "สท.ชุมพร                                                                                                                                              "
        },
        {
            "stOfficeCode": "12900000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สงขลา 1",
            "regionOfficeCode": "12000000",
            "stOfficeName2": "สท.สงขลา 1                                                                                                                                            "
        },
        {
            "stOfficeCode": "12901000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สงขลา  2",
            "regionOfficeCode": "12000000",
            "stOfficeName2": "สท.สงขลา  2                                                                                                                                           "
        },
        {
            "stOfficeCode": "12910000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่สตูล",
            "regionOfficeCode": "12000000",
            "stOfficeName2": "สท.สตูล                                                                                                                                               "
        },
        {
            "stOfficeCode": "12920000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ตรัง",
            "regionOfficeCode": "12000000",
            "stOfficeName2": "สท.ตรัง                                                                                                                                               "
        },
        {
            "stOfficeCode": "12930000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่พัทลุง",
            "regionOfficeCode": "12000000",
            "stOfficeName2": "สท.พัทลุง                                                                                                                                             "
        },
        {
            "stOfficeCode": "12940000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ปัตตานี",
            "regionOfficeCode": "12000000",
            "stOfficeName2": "สท.ปัตตานี                                                                                                                                            "
        },
        {
            "stOfficeCode": "12950000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่ยะลา",
            "regionOfficeCode": "12000000",
            "stOfficeName2": "สท.ยะลา                                                                                                                                               "
        },
        {
            "stOfficeCode": "12960000",
            "stOfficeName": "สำนักงานสรรพากรพื้นที่นราธิวาส",
            "regionOfficeCode": "12000000",
            "stOfficeName2": "สท.นราธิวาส                                                                                                                                           "
        }
    ]
}

["GET"]
http://10.208.1.207:8081/taxpayer-tracking/api/offices/ss

Authorization Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VySW5kZXgiOjEsInN0T2ZmaWNlQ29kZSI6IjEyMDAwMDAwIiwidXNlck5hbWUiOiLguJnguLTguKfguLHguJLguJnguYwg4Lia4Li44Lij4Li14LiZ4Lit4LiBIiwidXNlckdyb3VwIjoicmVnaW9uIiwic3RPZmZpY2VOYW1lIjoi4Liq4Liz4LiZ4Lix4LiB4LiH4Liy4LiZ4Liq4Lij4Lij4Lie4Liy4LiB4Lij4Lig4Liy4LiEIDEyIiwic3ViIjoiTkIxOTUwOTYiLCJpYXQiOjE3NzE0MDEwNTksImV4cCI6MTc3MTQ4NzQ1OX0.5mSZQ5S9-f4q_BnkoBGWjrgyxjq3wJEL6NpRHKMRGEQlfCz3FTKyN6MbF0eOoYSu


{
    "success": true,
    "message": "Success",
    "data": [
        {
            "ssOfficeCode": "00000719",
            "ssOfficeName": "บร.",
            "stOfficeCode": "00000719",
            "regionOfficeCode": "00000719",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "01001010",
            "ssOfficeName": "สส.พระนคร 1",
            "stOfficeCode": "01001000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01001011",
            "ssOfficeName": "สส.พระนคร 2",
            "stOfficeCode": "01001000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01002080",
            "ssOfficeName": "สส.ป้อมปราบศัตรูพ่าย 1",
            "stOfficeCode": "01002000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01002081",
            "ssOfficeName": "สส.ป้อมปราบศัตรูพ่าย 2",
            "stOfficeCode": "01002000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01002130",
            "ssOfficeName": "สส.สัมพันธวงศ์",
            "stOfficeCode": "01002000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01003070",
            "ssOfficeName": "สส.ปทุมวัน 1",
            "stOfficeCode": "01003000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01003071",
            "ssOfficeName": "สส.ปทุมวัน 2",
            "stOfficeCode": "01003000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01004140",
            "ssOfficeName": "สส.พญาไท",
            "stOfficeCode": "01004000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01005370",
            "ssOfficeName": "สส.ราชเทวี 1",
            "stOfficeCode": "01005000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01005371",
            "ssOfficeName": "สส.ราชเทวี 2",
            "stOfficeCode": "01005000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01006020",
            "ssOfficeName": "สส.ดุสิต",
            "stOfficeCode": "01006000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01006290",
            "ssOfficeName": "สส.บางซื่อ",
            "stOfficeCode": "01006000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01007300",
            "ssOfficeName": "สส.จตุจักร",
            "stOfficeCode": "01007000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01008050",
            "ssOfficeName": "สส.บางเขน",
            "stOfficeCode": "01008000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01008380",
            "ssOfficeName": "สส.ลาดพร้าว",
            "stOfficeCode": "01008000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "01009410",
            "ssOfficeName": "สส.หลักสี่",
            "stOfficeCode": "01009000",
            "regionOfficeCode": "01000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02010170",
            "ssOfficeName": "สส.ห้วยขวาง 1",
            "stOfficeCode": "02010000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02010171",
            "ssOfficeName": "สส.ห้วยขวาง 2",
            "stOfficeCode": "02010000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02011260",
            "ssOfficeName": "สส.ดินแดง",
            "stOfficeCode": "02011000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02012340",
            "ssOfficeName": "สส.สวนหลวง",
            "stOfficeCode": "02012000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02013330",
            "ssOfficeName": "สส.คลองเตย 1",
            "stOfficeCode": "02013000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02013331",
            "ssOfficeName": "สส.คลองเตย 2",
            "stOfficeCode": "02013000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02014390",
            "ssOfficeName": "สส.วัฒนา",
            "stOfficeCode": "02014000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02015090",
            "ssOfficeName": "สส.พระโขนง",
            "stOfficeCode": "02015000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02016320",
            "ssOfficeName": "สส.ประเวศ",
            "stOfficeCode": "02016000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02017470",
            "ssOfficeName": "สส.บางนา",
            "stOfficeCode": "02017000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02018060",
            "ssOfficeName": "สส.บางกะปิ",
            "stOfficeCode": "02018000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02019270",
            "ssOfficeName": "สส.บึงกุ่ม",
            "stOfficeCode": "02019000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02020450",
            "ssOfficeName": "สส.วังทองหลาง",
            "stOfficeCode": "02020000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02021030",
            "ssOfficeName": "สส.หนองจอก",
            "stOfficeCode": "02021000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02021100",
            "ssOfficeName": "สส.มีนบุรี",
            "stOfficeCode": "02021000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "02021110",
            "ssOfficeName": "ลาดกระบัง",
            "stOfficeCode": "02021000",
            "regionOfficeCode": "02000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03022040",
            "ssOfficeName": "สส.บางรัก 1",
            "stOfficeCode": "03022000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03022041",
            "ssOfficeName": "สส.บางรัก 2",
            "stOfficeCode": "03022000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03022042",
            "ssOfficeName": "สส.บางรัก 3",
            "stOfficeCode": "03022000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03023120",
            "ssOfficeName": "สส.ยานนาวา",
            "stOfficeCode": "03023000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03023310",
            "ssOfficeName": "สส.บางคอแหลม",
            "stOfficeCode": "03023000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03024280",
            "ssOfficeName": "สส.สาทร",
            "stOfficeCode": "03024000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03025190",
            "ssOfficeName": "สส.ตลิ่งชัน",
            "stOfficeCode": "03025000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03025250",
            "ssOfficeName": "สส.บางพลัด",
            "stOfficeCode": "03025000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03026220",
            "ssOfficeName": "สส.ภาษีเจริญ",
            "stOfficeCode": "03026000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03026230",
            "ssOfficeName": "สส.หนองแขม",
            "stOfficeCode": "03026000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03026400",
            "ssOfficeName": "สส.บางแค",
            "stOfficeCode": "03026000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03027210",
            "ssOfficeName": "บางขุนเทียน",
            "stOfficeCode": "03027000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03027350",
            "ssOfficeName": "สส.จอมทอง",
            "stOfficeCode": "03027000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03028240",
            "ssOfficeName": "สส.ราษฎร์บูรณะ",
            "stOfficeCode": "03028000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03029180",
            "ssOfficeName": "สส.คลองสาน",
            "stOfficeCode": "03029000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03030150",
            "ssOfficeName": "สส.ธนบุรี 1",
            "stOfficeCode": "03030000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03030151",
            "ssOfficeName": "สส.ธนบุรี 2",
            "stOfficeCode": "03030000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03030160",
            "ssOfficeName": "สส.บางกอกใหญ่",
            "stOfficeCode": "03030000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "03030200",
            "ssOfficeName": "สส.บางกอกน้อย",
            "stOfficeCode": "03030000",
            "regionOfficeCode": "03000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04120010",
            "ssOfficeName": "สส.เมืองนนทบุรี 1",
            "stOfficeCode": "04120000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04120011",
            "ssOfficeName": "สส.เมืองนนทบุรี 2",
            "stOfficeCode": "04120000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04120060",
            "ssOfficeName": "สส.ปากเกร็ด 1",
            "stOfficeCode": "04120000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04120061",
            "ssOfficeName": "สส.ปากเกร็ด 2",
            "stOfficeCode": "04120000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04121020",
            "ssOfficeName": "สส.บางกรวย",
            "stOfficeCode": "04121000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04121030",
            "ssOfficeName": "สส.บางใหญ่",
            "stOfficeCode": "04121000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04121040",
            "ssOfficeName": "สส.บางบัวทอง",
            "stOfficeCode": "04121000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04121050",
            "ssOfficeName": "สส.ไทรน้อย",
            "stOfficeCode": "04121000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04130010",
            "ssOfficeName": "สส.เมืองปทุมธานี",
            "stOfficeCode": "04130000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04130050",
            "ssOfficeName": "สส.ลาดหลุมแก้ว",
            "stOfficeCode": "04130000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04130070",
            "ssOfficeName": "สส.สามโคก",
            "stOfficeCode": "04130000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04131020",
            "ssOfficeName": "สส.คลองหลวง 1",
            "stOfficeCode": "04131000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04131021",
            "ssOfficeName": "สส.คลองหลวง 2",
            "stOfficeCode": "04131000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04131030",
            "ssOfficeName": "สส.ธัญบุรี",
            "stOfficeCode": "04131000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04131040",
            "ssOfficeName": "สส.หนองเสือ",
            "stOfficeCode": "04131000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04131060",
            "ssOfficeName": "สส.ลำลูกกา",
            "stOfficeCode": "04131000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04140010",
            "ssOfficeName": "สส.พระนครศรีอยุธยา",
            "stOfficeCode": "04140000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04140040",
            "ssOfficeName": "สส.บางไทร",
            "stOfficeCode": "04140000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04140050",
            "ssOfficeName": "สส.บางบาล",
            "stOfficeCode": "04140000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04140060",
            "ssOfficeName": "สส.บางปะอิน",
            "stOfficeCode": "04140000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04140080",
            "ssOfficeName": "สส.ผักไห่",
            "stOfficeCode": "04140000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04140100",
            "ssOfficeName": "สส.ลาดบัวหลวง",
            "stOfficeCode": "04140000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04140110",
            "ssOfficeName": "สส.วังน้อย",
            "stOfficeCode": "04140000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04140120",
            "ssOfficeName": "สส.เสนา",
            "stOfficeCode": "04140000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04140130",
            "ssOfficeName": "สส.บางซ้าย",
            "stOfficeCode": "04140000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04141020",
            "ssOfficeName": "สส.ท่าเรือ",
            "stOfficeCode": "04141000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04141030",
            "ssOfficeName": "สส.นครหลวง",
            "stOfficeCode": "04141000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04141070",
            "ssOfficeName": "สส.บางปะหัน",
            "stOfficeCode": "04141000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04141090",
            "ssOfficeName": "สส.ภาชี",
            "stOfficeCode": "04141000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04141140",
            "ssOfficeName": "สส.อุทัย",
            "stOfficeCode": "04141000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04141150",
            "ssOfficeName": "สส.มหาราช",
            "stOfficeCode": "04141000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04141160",
            "ssOfficeName": "สส.บ้านแพรก",
            "stOfficeCode": "04141000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04150010",
            "ssOfficeName": "สส.เมืองอ่างทอง",
            "stOfficeCode": "04150000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04150020",
            "ssOfficeName": "สส.ไชโย",
            "stOfficeCode": "04150000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04150030",
            "ssOfficeName": "สส.ป่าโมก",
            "stOfficeCode": "04150000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04150040",
            "ssOfficeName": "สส.โพธิ์ทอง",
            "stOfficeCode": "04150000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04150050",
            "ssOfficeName": "สส.แสวงหา",
            "stOfficeCode": "04150000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04150060",
            "ssOfficeName": "สส.วิเศษชัยชาญ",
            "stOfficeCode": "04150000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04150070",
            "ssOfficeName": "สส.สามโก้",
            "stOfficeCode": "04150000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04160010",
            "ssOfficeName": "สส.เมืองลพบุรี",
            "stOfficeCode": "04160000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04160020",
            "ssOfficeName": "สส.พัฒนานิคม",
            "stOfficeCode": "04160000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04160030",
            "ssOfficeName": "สส.โคกสำโรง",
            "stOfficeCode": "04160000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04160040",
            "ssOfficeName": "สส.ชัยบาดาล",
            "stOfficeCode": "04160000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04160050",
            "ssOfficeName": "สส.ท่าวุ้ง",
            "stOfficeCode": "04160000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04160060",
            "ssOfficeName": "สส.บ้านหมี่",
            "stOfficeCode": "04160000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04160070",
            "ssOfficeName": "สส.ท่าหลวง",
            "stOfficeCode": "04160000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04160080",
            "ssOfficeName": "สส.สระโบสถ์",
            "stOfficeCode": "04160000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04160090",
            "ssOfficeName": "สส.โคกเจริญ",
            "stOfficeCode": "04160000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04160100",
            "ssOfficeName": "สส.ลำสนธิ",
            "stOfficeCode": "04160000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04160110",
            "ssOfficeName": "สส.หนองม่วง",
            "stOfficeCode": "04160000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04170010",
            "ssOfficeName": "สส.เมืองสิงห์บุรี",
            "stOfficeCode": "04170000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04170020",
            "ssOfficeName": "สส.บางระจัน",
            "stOfficeCode": "04170000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04170030",
            "ssOfficeName": "สส.ค่ายบางระจัน",
            "stOfficeCode": "04170000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04170040",
            "ssOfficeName": "สส.พรหมบุรี",
            "stOfficeCode": "04170000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04170050",
            "ssOfficeName": "สส.ท่าช้าง",
            "stOfficeCode": "04170000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04170060",
            "ssOfficeName": "สส.อินทร์บุรี",
            "stOfficeCode": "04170000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04180010",
            "ssOfficeName": "สส.เมืองชัยนาท",
            "stOfficeCode": "04180000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04180020",
            "ssOfficeName": "สส.มโนรมย์",
            "stOfficeCode": "04180000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04180030",
            "ssOfficeName": "สส.วัดสิงห์",
            "stOfficeCode": "04180000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04180040",
            "ssOfficeName": "สส.สรรพยา",
            "stOfficeCode": "04180000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04180050",
            "ssOfficeName": "สส.สรรคบุรี",
            "stOfficeCode": "04180000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04180060",
            "ssOfficeName": "สส.หันคา",
            "stOfficeCode": "04180000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04180070",
            "ssOfficeName": "สส.หนองมะโมง",
            "stOfficeCode": "04180000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04190010",
            "ssOfficeName": "สส.เมืองสระบุรี",
            "stOfficeCode": "04190000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04190020",
            "ssOfficeName": "สส.แก่งคอย",
            "stOfficeCode": "04190000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04190030",
            "ssOfficeName": "สส.หนองแค",
            "stOfficeCode": "04190000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04190040",
            "ssOfficeName": "สส.วิหารแดง",
            "stOfficeCode": "04190000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04190050",
            "ssOfficeName": "สส.หนองแซง",
            "stOfficeCode": "04190000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04190060",
            "ssOfficeName": "สส.บ้านหมอ",
            "stOfficeCode": "04190000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04190070",
            "ssOfficeName": "สส.ดอนพุด",
            "stOfficeCode": "04190000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04190080",
            "ssOfficeName": "สส.หนองโดน",
            "stOfficeCode": "04190000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04190090",
            "ssOfficeName": "สส.พระพุทธบาท",
            "stOfficeCode": "04190000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04190100",
            "ssOfficeName": "สส.เสาไห้",
            "stOfficeCode": "04190000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04190110",
            "ssOfficeName": "สส.มวกเหล็ก",
            "stOfficeCode": "04190000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04190120",
            "ssOfficeName": "สส.วังม่วง",
            "stOfficeCode": "04190000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04190130",
            "ssOfficeName": "สส.เฉลิมพระเกียรติ(สบ.)",
            "stOfficeCode": "04190000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04610010",
            "ssOfficeName": "สส.เมืองอุทัยธานี",
            "stOfficeCode": "04610000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04610020",
            "ssOfficeName": "สส.ทัพทัน",
            "stOfficeCode": "04610000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04610030",
            "ssOfficeName": "สส.สว่างอารมณ์",
            "stOfficeCode": "04610000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04610040",
            "ssOfficeName": "สส.หนองฉาง",
            "stOfficeCode": "04610000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "04610050",
            "ssOfficeName": "สส.หนองขาหย่าง",
            "stOfficeCode": "04610000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04610060",
            "ssOfficeName": "สส.บ้านไร่",
            "stOfficeCode": "04610000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04610070",
            "ssOfficeName": "สส.ลานสัก",
            "stOfficeCode": "04610000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "04610080",
            "ssOfficeName": "สส.ห้วยคต",
            "stOfficeCode": "04610000",
            "regionOfficeCode": "04000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05110010",
            "ssOfficeName": "สส.สมุทรปราการ 1",
            "stOfficeCode": "05110000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05110011",
            "ssOfficeName": "สส.สมุทรปราการ 2",
            "stOfficeCode": "05110000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05111040",
            "ssOfficeName": "สส.พระประแดง 1",
            "stOfficeCode": "05111000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05111041",
            "ssOfficeName": "สส.พระประแดง 2",
            "stOfficeCode": "05111000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05111050",
            "ssOfficeName": "สส.พระสมุทรเจดีย์",
            "stOfficeCode": "05111000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05112020",
            "ssOfficeName": "สส.บางบ่อ",
            "stOfficeCode": "05112000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05112030",
            "ssOfficeName": "สส.บางพลี",
            "stOfficeCode": "05112000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05112060",
            "ssOfficeName": "สส.บางเสาธง",
            "stOfficeCode": "05112000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05200010",
            "ssOfficeName": "สส.เมืองชลบุรี 1",
            "stOfficeCode": "05200000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05200011",
            "ssOfficeName": "สส.เมืองชลบุรี 2",
            "stOfficeCode": "05200000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05200020",
            "ssOfficeName": "สส.บ้านบึง",
            "stOfficeCode": "05200000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05200030",
            "ssOfficeName": "สส.หนองใหญ่",
            "stOfficeCode": "05200000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05200050",
            "ssOfficeName": "สส.พานทอง",
            "stOfficeCode": "05200000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05200060",
            "ssOfficeName": "สส.พนัสนิคม",
            "stOfficeCode": "05200000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05200100",
            "ssOfficeName": "สส.บ่อทอง",
            "stOfficeCode": "05200000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05200110",
            "ssOfficeName": "สส.เกาะจันทร์",
            "stOfficeCode": "05200000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05201070",
            "ssOfficeName": "สส.ศรีราชา 1",
            "stOfficeCode": "05201000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05201071",
            "ssOfficeName": "สส.ศรีราชา 2",
            "stOfficeCode": "05201000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05201080",
            "ssOfficeName": "สส.เกาะสีชัง",
            "stOfficeCode": "05201000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05202040",
            "ssOfficeName": "สส.บางละมุง 1",
            "stOfficeCode": "05202000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05202041",
            "ssOfficeName": "สส.บางละมุง 2",
            "stOfficeCode": "05202000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05202090",
            "ssOfficeName": "สส.สัตหีบ",
            "stOfficeCode": "05202000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05210010",
            "ssOfficeName": "สส.เมืองระยอง 1",
            "stOfficeCode": "05210000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05210011",
            "ssOfficeName": "สส.เมืองระยอง 2",
            "stOfficeCode": "05210000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05210020",
            "ssOfficeName": "สส.บ้านฉาง",
            "stOfficeCode": "05210000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05210030",
            "ssOfficeName": "สส.แกลง",
            "stOfficeCode": "05210000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05210040",
            "ssOfficeName": "สส.วังจันทร์",
            "stOfficeCode": "05210000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05210050",
            "ssOfficeName": "สส.บ้านค่าย",
            "stOfficeCode": "05210000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05210060",
            "ssOfficeName": "สส.ปลวกแดง",
            "stOfficeCode": "05210000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05210070",
            "ssOfficeName": "สส.เขาชะเมา",
            "stOfficeCode": "05210000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05210080",
            "ssOfficeName": "สส.นิคมพัฒนา",
            "stOfficeCode": "05210000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05220010",
            "ssOfficeName": "สส.เมืองจันทบุรี",
            "stOfficeCode": "05220000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05220020",
            "ssOfficeName": "สส.ขลุง",
            "stOfficeCode": "05220000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05220030",
            "ssOfficeName": "สส.ท่าใหม่",
            "stOfficeCode": "05220000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05220040",
            "ssOfficeName": "สส.โป่งน้ำร้อน",
            "stOfficeCode": "05220000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05220050",
            "ssOfficeName": "สส.มะขาม",
            "stOfficeCode": "05220000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05220060",
            "ssOfficeName": "สส.แหลมสิงห์",
            "stOfficeCode": "05220000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05220070",
            "ssOfficeName": "สส.สอยดาว",
            "stOfficeCode": "05220000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05220080",
            "ssOfficeName": "สส.แก่งหางแมว",
            "stOfficeCode": "05220000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05220090",
            "ssOfficeName": "สส.นายายอาม",
            "stOfficeCode": "05220000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05220100",
            "ssOfficeName": "สส.เขาคิชฌกูฏ",
            "stOfficeCode": "05220000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05230010",
            "ssOfficeName": "สส.เมืองตราด",
            "stOfficeCode": "05230000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05230020",
            "ssOfficeName": "สส.คลองใหญ่",
            "stOfficeCode": "05230000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05230030",
            "ssOfficeName": "สส.เขาสมิง",
            "stOfficeCode": "05230000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05230040",
            "ssOfficeName": "สส.บ่อไร่",
            "stOfficeCode": "05230000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05230050",
            "ssOfficeName": "สส.แหลมงอบ",
            "stOfficeCode": "05230000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05230060",
            "ssOfficeName": "สส.เกาะกูด",
            "stOfficeCode": "05230000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05230070",
            "ssOfficeName": "สส.เกาะช้าง",
            "stOfficeCode": "05230000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05240010",
            "ssOfficeName": "สส.เมืองฉะเชิงเทรา",
            "stOfficeCode": "05240000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05240020",
            "ssOfficeName": "สส.บางคล้า",
            "stOfficeCode": "05240000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05240030",
            "ssOfficeName": "สส.บางน้ำเปรี้ยว",
            "stOfficeCode": "05240000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05240040",
            "ssOfficeName": "สส.บางปะกง",
            "stOfficeCode": "05240000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05240050",
            "ssOfficeName": "สส.บ้านโพธิ์",
            "stOfficeCode": "05240000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05240060",
            "ssOfficeName": "สส.พนมสารคาม",
            "stOfficeCode": "05240000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05240070",
            "ssOfficeName": "สส.ราชสาส์น",
            "stOfficeCode": "05240000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05240080",
            "ssOfficeName": "สส.สนามชัยเขต",
            "stOfficeCode": "05240000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05240090",
            "ssOfficeName": "สส.แปลงยาว",
            "stOfficeCode": "05240000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05240100",
            "ssOfficeName": "สส.ท่าตะเกียบ",
            "stOfficeCode": "05240000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05240110",
            "ssOfficeName": "สส.คลองเขื่อน",
            "stOfficeCode": "05240000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05250010",
            "ssOfficeName": "สส.เมืองปราจีนบุรี",
            "stOfficeCode": "05250000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05250020",
            "ssOfficeName": "สส.กบินทร์บุรี",
            "stOfficeCode": "05250000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05250030",
            "ssOfficeName": "สส.นาดี",
            "stOfficeCode": "05250000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05250060",
            "ssOfficeName": "สส.บ้านสร้าง",
            "stOfficeCode": "05250000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05250070",
            "ssOfficeName": "สส.ประจันตคาม",
            "stOfficeCode": "05250000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05250080",
            "ssOfficeName": "สส.ศรีมหาโพธิ",
            "stOfficeCode": "05250000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05250090",
            "ssOfficeName": "สส.ศรีมโหสถ",
            "stOfficeCode": "05250000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05260010",
            "ssOfficeName": "สส.เมืองนครนายก",
            "stOfficeCode": "05260000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05260020",
            "ssOfficeName": "สส.ปากพลี",
            "stOfficeCode": "05260000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05260030",
            "ssOfficeName": "สส.บ้านนา",
            "stOfficeCode": "05260000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05260040",
            "ssOfficeName": "สส.องครักษ์",
            "stOfficeCode": "05260000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05270010",
            "ssOfficeName": "สส.เมืองสระแก้ว",
            "stOfficeCode": "05270000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05270020",
            "ssOfficeName": "สส.คลองหาด",
            "stOfficeCode": "05270000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05270030",
            "ssOfficeName": "สส.ตาพระยา",
            "stOfficeCode": "05270000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05270040",
            "ssOfficeName": "สส.วังน้ำเย็น",
            "stOfficeCode": "05270000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "05270050",
            "ssOfficeName": "สส.วัฒนานคร",
            "stOfficeCode": "05270000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05270060",
            "ssOfficeName": "สส.อรัญประเทศ",
            "stOfficeCode": "05270000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "05270070",
            "ssOfficeName": "สส.เขาฉกรรจ์",
            "stOfficeCode": "05270000",
            "regionOfficeCode": "05000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06700010",
            "ssOfficeName": "สส.เมืองราชบุรี",
            "stOfficeCode": "06700000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06700020",
            "ssOfficeName": "สส.จอมบึง",
            "stOfficeCode": "06700000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06700030",
            "ssOfficeName": "สส.สวนผึ้ง",
            "stOfficeCode": "06700000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06700040",
            "ssOfficeName": "สส.ดำเนินสะดวก",
            "stOfficeCode": "06700000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06700050",
            "ssOfficeName": "สส.บ้านโป่ง",
            "stOfficeCode": "06700000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06700060",
            "ssOfficeName": "สส.บางแพ",
            "stOfficeCode": "06700000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06700070",
            "ssOfficeName": "สส.โพธาราม",
            "stOfficeCode": "06700000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06700080",
            "ssOfficeName": "สส.ปากท่อ",
            "stOfficeCode": "06700000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06700090",
            "ssOfficeName": "สส.วัดเพลง",
            "stOfficeCode": "06700000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06710010",
            "ssOfficeName": "สส.เมืองกาญจนบุรี",
            "stOfficeCode": "06710000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06710020",
            "ssOfficeName": "สส.ไทรโยค",
            "stOfficeCode": "06710000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06710030",
            "ssOfficeName": "สส.บ่อพลอย",
            "stOfficeCode": "06710000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06710040",
            "ssOfficeName": "สส.ศรีสวัสดิ์",
            "stOfficeCode": "06710000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06710050",
            "ssOfficeName": "สส.ท่ามะกา",
            "stOfficeCode": "06710000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06710060",
            "ssOfficeName": "สส.ท่าม่วง",
            "stOfficeCode": "06710000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06710070",
            "ssOfficeName": "สส.ทองผาภูมิ",
            "stOfficeCode": "06710000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06710080",
            "ssOfficeName": "สส.สังขละบุรี",
            "stOfficeCode": "06710000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06710090",
            "ssOfficeName": "สส.พนมทวน",
            "stOfficeCode": "06710000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06710100",
            "ssOfficeName": "สส.เลาขวัญ",
            "stOfficeCode": "06710000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06710110",
            "ssOfficeName": "สส.ด่านมะขามเตี้ย",
            "stOfficeCode": "06710000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06710120",
            "ssOfficeName": "สส.หนองปรือ",
            "stOfficeCode": "06710000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06710130",
            "ssOfficeName": "สส.ห้วยกระเจา",
            "stOfficeCode": "06710000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06720010",
            "ssOfficeName": "สส.เมืองสุพรรณบุรี",
            "stOfficeCode": "06720000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06720020",
            "ssOfficeName": "สส.เดิมบางนางบวช",
            "stOfficeCode": "06720000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06720030",
            "ssOfficeName": "สส.ด่านช้าง",
            "stOfficeCode": "06720000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06720040",
            "ssOfficeName": "สส.บางปลาม้า",
            "stOfficeCode": "06720000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06720050",
            "ssOfficeName": "สส.ศรีประจันต์",
            "stOfficeCode": "06720000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06720060",
            "ssOfficeName": "สส.ดอนเจดีย์",
            "stOfficeCode": "06720000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06720070",
            "ssOfficeName": "สส.สองพี่น้อง",
            "stOfficeCode": "06720000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06720080",
            "ssOfficeName": "สส.สามชุก",
            "stOfficeCode": "06720000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06720090",
            "ssOfficeName": "สส.อู่ทอง",
            "stOfficeCode": "06720000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06720100",
            "ssOfficeName": "สส.หนองหญ้าไซ",
            "stOfficeCode": "06720000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06730010",
            "ssOfficeName": "สส.เมืองนครปฐม",
            "stOfficeCode": "06730000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06730020",
            "ssOfficeName": "สส.กำแพงแสน",
            "stOfficeCode": "06730000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06730030",
            "ssOfficeName": "สส.นครชัยศรี",
            "stOfficeCode": "06730000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06730040",
            "ssOfficeName": "สส.ดอนตูม",
            "stOfficeCode": "06730000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06730050",
            "ssOfficeName": "สส.บางเลน",
            "stOfficeCode": "06730000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06731060",
            "ssOfficeName": "สส.สามพราน 1",
            "stOfficeCode": "06731000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06731061",
            "ssOfficeName": "สส.สามพราน 2",
            "stOfficeCode": "06731000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06731070",
            "ssOfficeName": "สส.พุทธมณฑล",
            "stOfficeCode": "06731000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06740010",
            "ssOfficeName": "สส.เมืองสมุทรสาคร 1",
            "stOfficeCode": "06740000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06740011",
            "ssOfficeName": "สส.เมืองสมุทรสาคร 2",
            "stOfficeCode": "06740000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06741020",
            "ssOfficeName": "สส.กระทุ่มแบน 1",
            "stOfficeCode": "06741000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06741021",
            "ssOfficeName": "สส.กระทุ่มแบน 2",
            "stOfficeCode": "06741000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06741030",
            "ssOfficeName": "สส.บ้านแพ้ว",
            "stOfficeCode": "06741000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06750010",
            "ssOfficeName": "สส.เมืองสมุทรสงคราม",
            "stOfficeCode": "06750000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06750020",
            "ssOfficeName": "สส.บางคนที",
            "stOfficeCode": "06750000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06750030",
            "ssOfficeName": "สส.อัมพวา",
            "stOfficeCode": "06750000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06760010",
            "ssOfficeName": "สส.เมืองเพชรบุรี",
            "stOfficeCode": "06760000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06760020",
            "ssOfficeName": "สส.เขาย้อย",
            "stOfficeCode": "06760000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06760030",
            "ssOfficeName": "สส.หนองหญ้าปล้อง",
            "stOfficeCode": "06760000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06760040",
            "ssOfficeName": "สส.ชะอำ",
            "stOfficeCode": "06760000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06760050",
            "ssOfficeName": "สส.ท่ายาง",
            "stOfficeCode": "06760000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06760060",
            "ssOfficeName": "สส.บ้านลาด",
            "stOfficeCode": "06760000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06760070",
            "ssOfficeName": "สส.บ้านแหลม",
            "stOfficeCode": "06760000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06760080",
            "ssOfficeName": "สส.แก่งกระจาน",
            "stOfficeCode": "06760000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06770010",
            "ssOfficeName": "สส.เมืองประจวบคีรีขันธ์",
            "stOfficeCode": "06770000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06770020",
            "ssOfficeName": "สส.กุยบุรี",
            "stOfficeCode": "06770000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06770030",
            "ssOfficeName": "สส.ทับสะแก",
            "stOfficeCode": "06770000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06770040",
            "ssOfficeName": "สส.บางสะพาน",
            "stOfficeCode": "06770000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06770050",
            "ssOfficeName": "สส.บางสะพานน้อย",
            "stOfficeCode": "06770000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "06770060",
            "ssOfficeName": "สส.ปราณบุรี",
            "stOfficeCode": "06770000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06770070",
            "ssOfficeName": "สส.หัวหิน",
            "stOfficeCode": "06770000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "06770080",
            "ssOfficeName": "สส.สามร้อยยอด",
            "stOfficeCode": "06770000",
            "regionOfficeCode": "06000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07530010",
            "ssOfficeName": "สส.เมืองอุตรดิตถ์",
            "stOfficeCode": "07530000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07530020",
            "ssOfficeName": "สส.ตรอน",
            "stOfficeCode": "07530000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07530030",
            "ssOfficeName": "สส.ท่าปลา",
            "stOfficeCode": "07530000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07530040",
            "ssOfficeName": "สส.น้ำปาด",
            "stOfficeCode": "07530000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07530050",
            "ssOfficeName": "สส.ฟากท่า",
            "stOfficeCode": "07530000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07530060",
            "ssOfficeName": "สส.บ้านโคก",
            "stOfficeCode": "07530000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07530070",
            "ssOfficeName": "สส.พิชัย",
            "stOfficeCode": "07530000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07530080",
            "ssOfficeName": "สส.ลับแล",
            "stOfficeCode": "07530000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07530090",
            "ssOfficeName": "สส.ทองแสนขัน",
            "stOfficeCode": "07530000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07600010",
            "ssOfficeName": "สส.เมืองนครสวรรค์",
            "stOfficeCode": "07600000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07600020",
            "ssOfficeName": "สส.โกรกพระ",
            "stOfficeCode": "07600000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07600030",
            "ssOfficeName": "สส.ชุมแสง",
            "stOfficeCode": "07600000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07600040",
            "ssOfficeName": "สส.หนองบัว",
            "stOfficeCode": "07600000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07600050",
            "ssOfficeName": "สส.บรรพตพิสัย",
            "stOfficeCode": "07600000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07600060",
            "ssOfficeName": "สส.เก้าเลี้ยว",
            "stOfficeCode": "07600000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07600070",
            "ssOfficeName": "สส.ตาคลี",
            "stOfficeCode": "07600000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07600080",
            "ssOfficeName": "สส.ท่าตะโก",
            "stOfficeCode": "07600000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07600090",
            "ssOfficeName": "สส.ไพศาลี",
            "stOfficeCode": "07600000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07600100",
            "ssOfficeName": "สส.พยุหะคีรี",
            "stOfficeCode": "07600000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07600110",
            "ssOfficeName": "สส.ลาดยาว",
            "stOfficeCode": "07600000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07600120",
            "ssOfficeName": "สส.ตากฟ้า",
            "stOfficeCode": "07600000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07600130",
            "ssOfficeName": "สส.แม่วงก์",
            "stOfficeCode": "07600000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07620010",
            "ssOfficeName": "สส.เมืองกำแพงเพชร",
            "stOfficeCode": "07620000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07620020",
            "ssOfficeName": "สส.ไทรงาม",
            "stOfficeCode": "07620000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07620030",
            "ssOfficeName": "สส.คลองลาน",
            "stOfficeCode": "07620000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07620040",
            "ssOfficeName": "สส.ขาณุวรลักษบุรี",
            "stOfficeCode": "07620000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07620050",
            "ssOfficeName": "สส.คลองขลุง",
            "stOfficeCode": "07620000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07620060",
            "ssOfficeName": "สส.พรานกระต่าย",
            "stOfficeCode": "07620000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07620070",
            "ssOfficeName": "สส.ลานกระบือ",
            "stOfficeCode": "07620000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07620100",
            "ssOfficeName": "สส.บึงสามัคคี",
            "stOfficeCode": "07620000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07630010",
            "ssOfficeName": "สส.เมืองตาก",
            "stOfficeCode": "07630000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07630020",
            "ssOfficeName": "สส.บ้านตาก",
            "stOfficeCode": "07630000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07630030",
            "ssOfficeName": "สส.สามเงา",
            "stOfficeCode": "07630000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07630040",
            "ssOfficeName": "สส.แม่ระมาด",
            "stOfficeCode": "07630000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07630050",
            "ssOfficeName": "สส.ท่าสองยาง",
            "stOfficeCode": "07630000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07630060",
            "ssOfficeName": "สส.แม่สอด",
            "stOfficeCode": "07630000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07630070",
            "ssOfficeName": "สส.พบพระ",
            "stOfficeCode": "07630000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07630080",
            "ssOfficeName": "สส.อุ้มผาง",
            "stOfficeCode": "07630000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07630090",
            "ssOfficeName": "สส.วังเจ้า",
            "stOfficeCode": "07630000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07640010",
            "ssOfficeName": "สส.เมืองสุโขทัย",
            "stOfficeCode": "07640000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07640020",
            "ssOfficeName": "สส.บ้านด่านลานหอย",
            "stOfficeCode": "07640000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07640030",
            "ssOfficeName": "สส.คีรีมาศ",
            "stOfficeCode": "07640000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07640040",
            "ssOfficeName": "สส.กงไกรลาศ",
            "stOfficeCode": "07640000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07640050",
            "ssOfficeName": "สส.ศรีสัชนาลัย",
            "stOfficeCode": "07640000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07640060",
            "ssOfficeName": "สส.ศรีสำโรง",
            "stOfficeCode": "07640000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07640070",
            "ssOfficeName": "สส.สวรรคโลก",
            "stOfficeCode": "07640000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07640080",
            "ssOfficeName": "สส.ศรีนคร",
            "stOfficeCode": "07640000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07640090",
            "ssOfficeName": "สส.ทุ่งเสลี่ยม",
            "stOfficeCode": "07640000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07650010",
            "ssOfficeName": "สส.เมืองพิษณุโลก",
            "stOfficeCode": "07650000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07650020",
            "ssOfficeName": "สส.นครไทย",
            "stOfficeCode": "07650000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07650030",
            "ssOfficeName": "สส.ชาติตระการ",
            "stOfficeCode": "07650000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07650040",
            "ssOfficeName": "สส.บางระกำ",
            "stOfficeCode": "07650000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07650050",
            "ssOfficeName": "สส.บางกระทุ่ม",
            "stOfficeCode": "07650000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07650060",
            "ssOfficeName": "สส.พรหมพิราม",
            "stOfficeCode": "07650000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07650070",
            "ssOfficeName": "สส.วัดโบสถ์",
            "stOfficeCode": "07650000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07650080",
            "ssOfficeName": "สส.วังทอง",
            "stOfficeCode": "07650000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07650090",
            "ssOfficeName": "สส.เนินมะปราง",
            "stOfficeCode": "07650000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07660010",
            "ssOfficeName": "สส.เมืองพิจิตร",
            "stOfficeCode": "07660000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07660020",
            "ssOfficeName": "สส.วังทรายพูน",
            "stOfficeCode": "07660000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07660030",
            "ssOfficeName": "สส.โพธิ์ประทับช้าง",
            "stOfficeCode": "07660000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07660040",
            "ssOfficeName": "สส.ตะพานหิน",
            "stOfficeCode": "07660000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07660050",
            "ssOfficeName": "สส.บางมูลนาก",
            "stOfficeCode": "07660000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07660060",
            "ssOfficeName": "สส.โพทะเล",
            "stOfficeCode": "07660000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07660070",
            "ssOfficeName": "สส.สามง่าม",
            "stOfficeCode": "07660000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07660080",
            "ssOfficeName": "สส.ทับคล้อ",
            "stOfficeCode": "07660000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07660090",
            "ssOfficeName": "สส.สากเหล็ก",
            "stOfficeCode": "07660000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07670010",
            "ssOfficeName": "สส.เมืองเพชรบูรณ์",
            "stOfficeCode": "07670000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07670020",
            "ssOfficeName": "สส.ชนแดน",
            "stOfficeCode": "07670000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07670030",
            "ssOfficeName": "สส.หล่มสัก",
            "stOfficeCode": "07670000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07670040",
            "ssOfficeName": "สส.หล่มเก่า",
            "stOfficeCode": "07670000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07670050",
            "ssOfficeName": "สส.วิเชียรบุรี",
            "stOfficeCode": "07670000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07670060",
            "ssOfficeName": "สส.ศรีเทพ",
            "stOfficeCode": "07670000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07670070",
            "ssOfficeName": "สส.หนองไผ่",
            "stOfficeCode": "07670000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07670080",
            "ssOfficeName": "สส.บึงสามพัน",
            "stOfficeCode": "07670000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "07670090",
            "ssOfficeName": "สส.น้ำหนาว",
            "stOfficeCode": "07670000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07670100",
            "ssOfficeName": "สส.วังโป่ง",
            "stOfficeCode": "07670000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "07670110",
            "ssOfficeName": "สส.เขาค้อ",
            "stOfficeCode": "07670000",
            "regionOfficeCode": "07000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08500010",
            "ssOfficeName": "สส.เมืองเชียงใหม่ 1",
            "stOfficeCode": "08500000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08500011",
            "ssOfficeName": "สส.เมืองเชียงใหม่ 2",
            "stOfficeCode": "08500000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08500020",
            "ssOfficeName": "สส.จอมทอง",
            "stOfficeCode": "08500000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08500030",
            "ssOfficeName": "สส.แม่แจ่ม",
            "stOfficeCode": "08500000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08500080",
            "ssOfficeName": "สส.สะเมิง",
            "stOfficeCode": "08500000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08500120",
            "ssOfficeName": "สส.สันป่าตอง",
            "stOfficeCode": "08500000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08500150",
            "ssOfficeName": "สส.หางดง",
            "stOfficeCode": "08500000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08500160",
            "ssOfficeName": "สส.ฮอด",
            "stOfficeCode": "08500000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08500170",
            "ssOfficeName": "สส.ดอยเต่า",
            "stOfficeCode": "08500000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08500180",
            "ssOfficeName": "สส.อมก๋อย",
            "stOfficeCode": "08500000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08500190",
            "ssOfficeName": "สส.สารภี",
            "stOfficeCode": "08500000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08500240",
            "ssOfficeName": "สส.ดอยหล่อ",
            "stOfficeCode": "08500000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08501040",
            "ssOfficeName": "สส.เชียงดาว",
            "stOfficeCode": "08501000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08501050",
            "ssOfficeName": "สส.ดอยสะเก็ด",
            "stOfficeCode": "08501000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08501060",
            "ssOfficeName": "สส.แม่แตง",
            "stOfficeCode": "08501000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08501070",
            "ssOfficeName": "สส.แม่ริม",
            "stOfficeCode": "08501000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08501090",
            "ssOfficeName": "สส.ฝาง",
            "stOfficeCode": "08501000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08501100",
            "ssOfficeName": "สส.แม่อาย",
            "stOfficeCode": "08501000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08501110",
            "ssOfficeName": "สส.พร้าว",
            "stOfficeCode": "08501000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08501130",
            "ssOfficeName": "สส.สันกำแพง",
            "stOfficeCode": "08501000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08501140",
            "ssOfficeName": "สส.สันทราย",
            "stOfficeCode": "08501000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08501200",
            "ssOfficeName": "สส.เวียงแหง",
            "stOfficeCode": "08501000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08501210",
            "ssOfficeName": "สส.ไชยปราการ",
            "stOfficeCode": "08501000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08510010",
            "ssOfficeName": "สส.เมืองลำพูน",
            "stOfficeCode": "08510000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08510020",
            "ssOfficeName": "สส.แม่ทา",
            "stOfficeCode": "08510000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08510030",
            "ssOfficeName": "สส.บ้างโฮ่ง",
            "stOfficeCode": "08510000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08510040",
            "ssOfficeName": "สส.ลี้",
            "stOfficeCode": "08510000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08510050",
            "ssOfficeName": "สส.ทุ่งหัวช้าง",
            "stOfficeCode": "08510000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08510060",
            "ssOfficeName": "สส.ป่าซาง",
            "stOfficeCode": "08510000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08510070",
            "ssOfficeName": "สส.บ้านธิ",
            "stOfficeCode": "08510000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08510080",
            "ssOfficeName": "สส.เวียงหนองล่อง",
            "stOfficeCode": "08510000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08520010",
            "ssOfficeName": "สส.เมืองลำปาง",
            "stOfficeCode": "08520000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08520020",
            "ssOfficeName": "สส.แม่เมาะ",
            "stOfficeCode": "08520000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08520030",
            "ssOfficeName": "สส.เกาะคา",
            "stOfficeCode": "08520000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08520050",
            "ssOfficeName": "สส.งาว",
            "stOfficeCode": "08520000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08520060",
            "ssOfficeName": "สส.แจ้ห่ม",
            "stOfficeCode": "08520000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08520070",
            "ssOfficeName": "สส.วังเหนือ",
            "stOfficeCode": "08520000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08520080",
            "ssOfficeName": "สส.เถิน",
            "stOfficeCode": "08520000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08520090",
            "ssOfficeName": "สส.แม่พริก",
            "stOfficeCode": "08520000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08520100",
            "ssOfficeName": "สส.แม่ทะ",
            "stOfficeCode": "08520000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08520110",
            "ssOfficeName": "สส.สบปราบ",
            "stOfficeCode": "08520000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08520120",
            "ssOfficeName": "สส.ห้างฉัตร",
            "stOfficeCode": "08520000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08540010",
            "ssOfficeName": "สส.เมืองแพร่",
            "stOfficeCode": "08540000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08540020",
            "ssOfficeName": "สส.ร้องกวาง",
            "stOfficeCode": "08540000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08540030",
            "ssOfficeName": "สส.ลอง",
            "stOfficeCode": "08540000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08540040",
            "ssOfficeName": "สส.สูงเม่น",
            "stOfficeCode": "08540000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08540050",
            "ssOfficeName": "สส.เด่นชัย",
            "stOfficeCode": "08540000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08540060",
            "ssOfficeName": "สส.สอง",
            "stOfficeCode": "08540000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08540070",
            "ssOfficeName": "สส.วังชิ้น",
            "stOfficeCode": "08540000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08540080",
            "ssOfficeName": "สส.หนองม่วงไข่",
            "stOfficeCode": "08540000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08550010",
            "ssOfficeName": "สส.เมืองน่าน",
            "stOfficeCode": "08550000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08550020",
            "ssOfficeName": "สส.แม่จริม",
            "stOfficeCode": "08550000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08550030",
            "ssOfficeName": "สส.บ้านหลวง",
            "stOfficeCode": "08550000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08550040",
            "ssOfficeName": "สส.นาน้อย",
            "stOfficeCode": "08550000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08550050",
            "ssOfficeName": "สส.ปัว",
            "stOfficeCode": "08550000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08550060",
            "ssOfficeName": "สส.ท่าวังผา",
            "stOfficeCode": "08550000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08550070",
            "ssOfficeName": "สส.เวียงสา",
            "stOfficeCode": "08550000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08550080",
            "ssOfficeName": "สส.ทุ่งช้าง",
            "stOfficeCode": "08550000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08550090",
            "ssOfficeName": "สส.เชียงกลาง",
            "stOfficeCode": "08550000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08550100",
            "ssOfficeName": "สส.นาหมื่น",
            "stOfficeCode": "08550000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08550120",
            "ssOfficeName": "สส.บ่อเกลือ",
            "stOfficeCode": "08550000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08560010",
            "ssOfficeName": "สส.เมืองพะเยา",
            "stOfficeCode": "08560000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08560020",
            "ssOfficeName": "สส.จุน",
            "stOfficeCode": "08560000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08560030",
            "ssOfficeName": "สส.เชียงคำ",
            "stOfficeCode": "08560000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08560040",
            "ssOfficeName": "สส.เชียงม่วน",
            "stOfficeCode": "08560000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08560050",
            "ssOfficeName": "สส.ดอกคำใต้",
            "stOfficeCode": "08560000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08560060",
            "ssOfficeName": "สส.ปง",
            "stOfficeCode": "08560000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08560070",
            "ssOfficeName": "สส.แม่ใจ",
            "stOfficeCode": "08560000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08560080",
            "ssOfficeName": "สส.ภูซาง",
            "stOfficeCode": "08560000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08570010",
            "ssOfficeName": "สส.เมืองเชียงราย",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08570020",
            "ssOfficeName": "สส.เวียงชัย",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08570030",
            "ssOfficeName": "สส.เชียงของ",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08570040",
            "ssOfficeName": "สส.เทิง",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08570050",
            "ssOfficeName": "สส.พาน",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08570060",
            "ssOfficeName": "สส.ป่าแดด",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08570070",
            "ssOfficeName": "สส.แม่จัน",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08570080",
            "ssOfficeName": "สส.เชียงแสน",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08570090",
            "ssOfficeName": "สส.แม่สาย",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08570100",
            "ssOfficeName": "สส.แม่สรวย",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08570110",
            "ssOfficeName": "สส.เวียงป่าเป้า",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08570120",
            "ssOfficeName": "สส.พญาเม็งราย",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08570130",
            "ssOfficeName": "สส.เวียงแก่น",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08570140",
            "ssOfficeName": "สส.ขุนตาล",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08570150",
            "ssOfficeName": "สส.แม่ฟ้าหลวง",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08570160",
            "ssOfficeName": "สส.แม่ลาว",
            "stOfficeCode": "08570000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "08580010",
            "ssOfficeName": "สส.เมืองแม่ฮ่องสอน",
            "stOfficeCode": "08580000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08580020",
            "ssOfficeName": "สส.ขุนยวม",
            "stOfficeCode": "08580000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08580030",
            "ssOfficeName": "สส.ปาย",
            "stOfficeCode": "08580000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08580040",
            "ssOfficeName": "สส.แม่สะเรียง",
            "stOfficeCode": "08580000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08580050",
            "ssOfficeName": "สส.แม่ลาน้อย",
            "stOfficeCode": "08580000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "08580060",
            "ssOfficeName": "สส.สบเมย",
            "stOfficeCode": "08580000",
            "regionOfficeCode": "08000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09300010",
            "ssOfficeName": "สส.เมืองนครราชสีมา 1",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09300011",
            "ssOfficeName": "สส.เมืองนครราชสีมา 2",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09300030",
            "ssOfficeName": "สส.เสิงสาง",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09300040",
            "ssOfficeName": "สส.คง",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09300050",
            "ssOfficeName": "สส.บ้านเหลื่อม",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09300060",
            "ssOfficeName": "สส.จักราช",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09300090",
            "ssOfficeName": "สส.โนนไทย",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09300100",
            "ssOfficeName": "สส.โนนสูง",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09300110",
            "ssOfficeName": "สส.ขามสะแกแสง",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09300120",
            "ssOfficeName": "สส.บัวใหญ่",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09300130",
            "ssOfficeName": "สส.ประทาย",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09300150",
            "ssOfficeName": "สส.พิมาย",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09300160",
            "ssOfficeName": "สส.ห้วยแถลง",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09300170",
            "ssOfficeName": "สส.ชุมพวง",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09300190",
            "ssOfficeName": "สส.ขามทะเลสอ",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09300220",
            "ssOfficeName": "สส.หนองบุนนาก",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09300230",
            "ssOfficeName": "สส.แก้งสนามนาง",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09300280",
            "ssOfficeName": "สส.พระทองคำ",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09300320",
            "ssOfficeName": "สส.เฉลิมพระเกียรติ (นส.)",
            "stOfficeCode": "09300000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09301020",
            "ssOfficeName": "สส.ครบุรี",
            "stOfficeCode": "09301000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09301070",
            "ssOfficeName": "สส.โชคชัย",
            "stOfficeCode": "09301000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09301080",
            "ssOfficeName": "สส.ด่านขุนทด",
            "stOfficeCode": "09301000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09301140",
            "ssOfficeName": "สส.ปักธงชัย",
            "stOfficeCode": "09301000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09301180",
            "ssOfficeName": "สส.สูงเนิน",
            "stOfficeCode": "09301000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09301200",
            "ssOfficeName": "สส.สีคิ้ว",
            "stOfficeCode": "09301000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09301210",
            "ssOfficeName": "สส.ปากช่อง",
            "stOfficeCode": "09301000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09301250",
            "ssOfficeName": "สส.วังน้ำเขียว",
            "stOfficeCode": "09301000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09310010",
            "ssOfficeName": "สส.เมืองบุรีรัมย์",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09310020",
            "ssOfficeName": "สส.คูเมือง",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09310030",
            "ssOfficeName": "สส.กระสัง",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09310040",
            "ssOfficeName": "สส.นางรอง",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09310050",
            "ssOfficeName": "สส.หนองกี่",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09310060",
            "ssOfficeName": "สส.ละหานทราย",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09310070",
            "ssOfficeName": "สส.ประโคนชัย",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09310080",
            "ssOfficeName": "สส.บ้านกรวด",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09310090",
            "ssOfficeName": "สส.พุทไธสง",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09310100",
            "ssOfficeName": "สส.ลำปลายมาศ",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09310110",
            "ssOfficeName": "สส.สตึก",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09310120",
            "ssOfficeName": "สส.ปะคำ",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09310130",
            "ssOfficeName": "สส.นาโพธิ์",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09310140",
            "ssOfficeName": "สส.หนองหงส์",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09310160",
            "ssOfficeName": "สส.ห้วยราช",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09310180",
            "ssOfficeName": "สส.ชำนิ",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09310190",
            "ssOfficeName": "สส.บ้านใหม่ไชยพจน์",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09310200",
            "ssOfficeName": "สส.โนนดินแดง",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09310230",
            "ssOfficeName": "สส.เฉลิมพระเกียรติ (บร.)",
            "stOfficeCode": "09310000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09320010",
            "ssOfficeName": "สส.เมืองสุรินทร์",
            "stOfficeCode": "09320000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09320020",
            "ssOfficeName": "สส.ชุมพลบุรี",
            "stOfficeCode": "09320000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09320030",
            "ssOfficeName": "สส.ท่าตูม",
            "stOfficeCode": "09320000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09320040",
            "ssOfficeName": "สส.จอมพระ",
            "stOfficeCode": "09320000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09320050",
            "ssOfficeName": "สส.ปราสาท",
            "stOfficeCode": "09320000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09320060",
            "ssOfficeName": "สส.กาบเชิง",
            "stOfficeCode": "09320000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09320070",
            "ssOfficeName": "สส.รัตนบุรี",
            "stOfficeCode": "09320000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09320080",
            "ssOfficeName": "สส.สนม",
            "stOfficeCode": "09320000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09320090",
            "ssOfficeName": "สส.ศีขรภูมิ",
            "stOfficeCode": "09320000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09320100",
            "ssOfficeName": "สส.สังขะ",
            "stOfficeCode": "09320000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09320110",
            "ssOfficeName": "สส.ลำดวน",
            "stOfficeCode": "09320000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09320120",
            "ssOfficeName": "สส.สำโรงทาบ",
            "stOfficeCode": "09320000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09330010",
            "ssOfficeName": "สส.เมืองศรีสะเกษ",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09330020",
            "ssOfficeName": "สส.ยางชุมน้อย",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09330030",
            "ssOfficeName": "สส.กันทรารมย์",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09330040",
            "ssOfficeName": "สส.กันทรลักษ์",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09330050",
            "ssOfficeName": "สส.ขุขันธ์",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09330060",
            "ssOfficeName": "สส.ไพรบึง",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09330070",
            "ssOfficeName": "สส.ปรางค์กู่",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09330080",
            "ssOfficeName": "สส.ขุนหาญ",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09330090",
            "ssOfficeName": "สส.ราษีไศล",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09330100",
            "ssOfficeName": "สส.อุทุมพรพิสัย",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09330110",
            "ssOfficeName": "สส.บึงบูรพ์",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09330120",
            "ssOfficeName": "สส.ห้วยทับทัน",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09330130",
            "ssOfficeName": "สส.โนนคูณ",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09330140",
            "ssOfficeName": "สส.ศรีรัตนะ",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09330150",
            "ssOfficeName": "สส.น้ำเกลี้ยง",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09330160",
            "ssOfficeName": "สส.วังหิน",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09330170",
            "ssOfficeName": "สส.ภูสิงห์",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09330200",
            "ssOfficeName": "สส.พยุห์",
            "stOfficeCode": "09330000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09340010",
            "ssOfficeName": "สส.เมืองอุบลราชธานี",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09340020",
            "ssOfficeName": "สส.ศรีเมืองใหม่",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09340030",
            "ssOfficeName": "สส.โขงเจียม",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09340040",
            "ssOfficeName": "สส.เขื่องใน",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09340050",
            "ssOfficeName": "สส.เขมราฐ",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09340070",
            "ssOfficeName": "สส.เดชอุดม",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09340080",
            "ssOfficeName": "สส.นาจะหลวย",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09340090",
            "ssOfficeName": "สส.น้ำยืน",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09340100",
            "ssOfficeName": "สส.บุณฑริก",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09340110",
            "ssOfficeName": "สส.ตระการพืชผล",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09340120",
            "ssOfficeName": "สส.กุดข้าวปุ้น",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09340140",
            "ssOfficeName": "สส.ม่วงสามสิบ",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09340150",
            "ssOfficeName": "สส.วารินชำราบ",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09340190",
            "ssOfficeName": "สส.พิบูลมังสาหาร",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09340200",
            "ssOfficeName": "สส.ตาลสุม",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09340210",
            "ssOfficeName": "สส.โพธิ์ไทร",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09340220",
            "ssOfficeName": "สส.สำโรง",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09340240",
            "ssOfficeName": "สส.ดอนมดแดง",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09340250",
            "ssOfficeName": "สส.สิรินธร",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09340310",
            "ssOfficeName": "สส.เหล่าเสือโก้ก",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09340320",
            "ssOfficeName": "สส.สว่างวีระวงศ์",
            "stOfficeCode": "09340000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09350010",
            "ssOfficeName": "สส.เมืองยโสธร",
            "stOfficeCode": "09350000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09350030",
            "ssOfficeName": "สส.กุดชุม",
            "stOfficeCode": "09350000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09350040",
            "ssOfficeName": "สส.คำเขื่อนแก้ว",
            "stOfficeCode": "09350000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09350050",
            "ssOfficeName": "สส.ป่าติ้ว",
            "stOfficeCode": "09350000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09350060",
            "ssOfficeName": "สส.มหาชนะชัย",
            "stOfficeCode": "09350000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09350070",
            "ssOfficeName": "สส.ค้อวัง",
            "stOfficeCode": "09350000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09350080",
            "ssOfficeName": "สส.เลิงนกทา",
            "stOfficeCode": "09350000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09360010",
            "ssOfficeName": "สส.เมืองชัยภูมิ",
            "stOfficeCode": "09360000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09360020",
            "ssOfficeName": "สส.บ้านเขว้า",
            "stOfficeCode": "09360000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09360030",
            "ssOfficeName": "สส.คอนสวรรค์",
            "stOfficeCode": "09360000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09360040",
            "ssOfficeName": "สส.เกษตรสมบูรณ์",
            "stOfficeCode": "09360000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09360050",
            "ssOfficeName": "สส.หนองบัวแดง",
            "stOfficeCode": "09360000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09360060",
            "ssOfficeName": "สส.จัตุรัส",
            "stOfficeCode": "09360000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09360070",
            "ssOfficeName": "สส.บำเหน็จณรงค์",
            "stOfficeCode": "09360000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09360080",
            "ssOfficeName": "สส.หนองบัวระเหว",
            "stOfficeCode": "09360000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09360090",
            "ssOfficeName": "สส.เทพสถิต",
            "stOfficeCode": "09360000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09360100",
            "ssOfficeName": "สส.ภูเขียว",
            "stOfficeCode": "09360000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09360110",
            "ssOfficeName": "สส.บ้านแท่น",
            "stOfficeCode": "09360000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09360120",
            "ssOfficeName": "สส.แก้งคร้อ",
            "stOfficeCode": "09360000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09360130",
            "ssOfficeName": "สส.คอนสาร",
            "stOfficeCode": "09360000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09370010",
            "ssOfficeName": "สส.เมืองอำนาจเจริญ",
            "stOfficeCode": "09370000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09370030",
            "ssOfficeName": "สส.ปทุมราชวงศา",
            "stOfficeCode": "09370000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "09370050",
            "ssOfficeName": "สส.เสนางคนิคม",
            "stOfficeCode": "09370000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09370060",
            "ssOfficeName": "สส.หัวตะพาน",
            "stOfficeCode": "09370000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "09370070",
            "ssOfficeName": "สส.ลืออำนาจ",
            "stOfficeCode": "09370000",
            "regionOfficeCode": "09000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10380010",
            "ssOfficeName": "สส.เมืองบึงกาฬ",
            "stOfficeCode": "10380000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10380020",
            "ssOfficeName": "สส.พรเจริญ",
            "stOfficeCode": "10380000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10380030",
            "ssOfficeName": "สส.โซ่พิสัย",
            "stOfficeCode": "10380000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10380040",
            "ssOfficeName": "สส.เซกา",
            "stOfficeCode": "10380000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10380050",
            "ssOfficeName": "สส.ปากคาด",
            "stOfficeCode": "10380000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10380060",
            "ssOfficeName": "สส.บึงโขงหลง",
            "stOfficeCode": "10380000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10380070",
            "ssOfficeName": "สส.ศรีวิไล",
            "stOfficeCode": "10380000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10390010",
            "ssOfficeName": "สส.เมืองหนองบัวลำภู",
            "stOfficeCode": "10390000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10390020",
            "ssOfficeName": "สส.นากลาง",
            "stOfficeCode": "10390000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10390030",
            "ssOfficeName": "สส.โนนสัง",
            "stOfficeCode": "10390000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10390040",
            "ssOfficeName": "สส.ศรีบุญเรือง",
            "stOfficeCode": "10390000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10390050",
            "ssOfficeName": "สส.สุวรรณคูหา",
            "stOfficeCode": "10390000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10390060",
            "ssOfficeName": "สส.นาวัง",
            "stOfficeCode": "10390000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10400010",
            "ssOfficeName": "สส.เมืองขอนแก่น 1",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10400011",
            "ssOfficeName": "สส.เมืองขอนแก่น 2",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10400020",
            "ssOfficeName": "สส.บ้านฝาง",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10400030",
            "ssOfficeName": "สส.พระยืน",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10400040",
            "ssOfficeName": "สส.หนองเรือ",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10400050",
            "ssOfficeName": "สส.ชุมแพ",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10400060",
            "ssOfficeName": "สส.สีชมพู",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10400070",
            "ssOfficeName": "สส.น้ำพอง",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10400080",
            "ssOfficeName": "สส.อุบลรัตน์",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10400090",
            "ssOfficeName": "สส.กระนวน",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10400100",
            "ssOfficeName": "สส.บ้านไผ่",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10400120",
            "ssOfficeName": "สส.พล",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10400130",
            "ssOfficeName": "สส.แวงใหญ่",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10400140",
            "ssOfficeName": "สส.แวงน้อย",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10400150",
            "ssOfficeName": "สส.หนองสองห้อง",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10400160",
            "ssOfficeName": "สส.ภูเวียง",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10400170",
            "ssOfficeName": "สส.มัญจาคีรี",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10400180",
            "ssOfficeName": "สส.ชนบท",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10400190",
            "ssOfficeName": "สส.เขาสวนกวาง",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10400200",
            "ssOfficeName": "สส.ภูผาม่าน",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10400240",
            "ssOfficeName": "สส.บ้านแฮด",
            "stOfficeCode": "10400000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10410010",
            "ssOfficeName": "สส.เมืองอุดรธานี",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10410020",
            "ssOfficeName": "สส.กุดจับ",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10410030",
            "ssOfficeName": "สส.หนองวัวซอ",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10410040",
            "ssOfficeName": "สส.กุมภวาปี",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10410050",
            "ssOfficeName": "สส.โนนสะอาด",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10410060",
            "ssOfficeName": "สส.หนองหาน",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10410070",
            "ssOfficeName": "สส.ทุ่งฝน",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10410080",
            "ssOfficeName": "สส.ไชยวาน",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10410090",
            "ssOfficeName": "สส.ศรีธาตุ",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10410100",
            "ssOfficeName": "สส.วังสามหมอ",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10410110",
            "ssOfficeName": "สส.บ้านดุง",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10410170",
            "ssOfficeName": "สส.บ้านผือ",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10410180",
            "ssOfficeName": "สส.น้ำโสม",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10410190",
            "ssOfficeName": "สส.เพ็ญ",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10410200",
            "ssOfficeName": "สส.สร้างคอม",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10410210",
            "ssOfficeName": "สส.หนองแสง",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10410220",
            "ssOfficeName": "สส.นายูง",
            "stOfficeCode": "10410000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10420010",
            "ssOfficeName": "สส.เมืองเลย",
            "stOfficeCode": "10420000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10420030",
            "ssOfficeName": "สส.เชียงคาน",
            "stOfficeCode": "10420000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10420040",
            "ssOfficeName": "สส.ปากชม",
            "stOfficeCode": "10420000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10420050",
            "ssOfficeName": "สส.ด่านซ้าย",
            "stOfficeCode": "10420000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10420060",
            "ssOfficeName": "สส.นาแห้ว",
            "stOfficeCode": "10420000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10420070",
            "ssOfficeName": "สส.ภูเรือ",
            "stOfficeCode": "10420000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10420080",
            "ssOfficeName": "สส.ท่าลี่",
            "stOfficeCode": "10420000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10420090",
            "ssOfficeName": "สส.วังสะพุง",
            "stOfficeCode": "10420000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10420100",
            "ssOfficeName": "สส.ภูกระดึง",
            "stOfficeCode": "10420000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10420120",
            "ssOfficeName": "สส.ผาขาว",
            "stOfficeCode": "10420000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10420130",
            "ssOfficeName": "สส.เอราวัณ",
            "stOfficeCode": "10420000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10430010",
            "ssOfficeName": "สส.เมืองหนองคาย",
            "stOfficeCode": "10430000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10430020",
            "ssOfficeName": "สส.ท่าบ่อ",
            "stOfficeCode": "10430000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10430050",
            "ssOfficeName": "สส.โพนพิสัย",
            "stOfficeCode": "10430000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10430070",
            "ssOfficeName": "สส.ศรีเชียงใหม่",
            "stOfficeCode": "10430000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10430080",
            "ssOfficeName": "สส.สังคม",
            "stOfficeCode": "10430000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10430150",
            "ssOfficeName": "สส.เฝ้าไร่",
            "stOfficeCode": "10430000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10430160",
            "ssOfficeName": "สส.รัตนวาปี",
            "stOfficeCode": "10430000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10440010",
            "ssOfficeName": "สส.เมืองมหาสารคาม",
            "stOfficeCode": "10440000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10440020",
            "ssOfficeName": "สส.แกดำ",
            "stOfficeCode": "10440000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10440030",
            "ssOfficeName": "สส.โกสุมพิสัย",
            "stOfficeCode": "10440000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10440040",
            "ssOfficeName": "สส.กันทรวิชัย",
            "stOfficeCode": "10440000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10440050",
            "ssOfficeName": "สส.เชียงยืน",
            "stOfficeCode": "10440000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10440060",
            "ssOfficeName": "สส.บรบือ",
            "stOfficeCode": "10440000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10440070",
            "ssOfficeName": "สส.นาเชือก",
            "stOfficeCode": "10440000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10440080",
            "ssOfficeName": "สส.พยัคฆภูมิพิสัย",
            "stOfficeCode": "10440000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10440090",
            "ssOfficeName": "สส.วาปีปทุม",
            "stOfficeCode": "10440000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10440100",
            "ssOfficeName": "สส.นาดูน",
            "stOfficeCode": "10440000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10440110",
            "ssOfficeName": "สส.ยางสีสุราช",
            "stOfficeCode": "10440000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10440120",
            "ssOfficeName": "สส.กุดรัง",
            "stOfficeCode": "10440000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10450010",
            "ssOfficeName": "สส.เมืองร้อยเอ็ด",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10450020",
            "ssOfficeName": "สส.เกษตรวิสัย",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10450030",
            "ssOfficeName": "สส.ปทุมรัตต์",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10450040",
            "ssOfficeName": "สส.จตุรพักตรพิมาน",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10450050",
            "ssOfficeName": "สส.ธวัชบุรี",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10450060",
            "ssOfficeName": "สส.พนมไพร",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10450070",
            "ssOfficeName": "สส.โพนทอง",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10450080",
            "ssOfficeName": "สส.โพธิ์ชัย",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10450090",
            "ssOfficeName": "สส.หนองพอก",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10450100",
            "ssOfficeName": "สส.เสลภูมิ",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10450110",
            "ssOfficeName": "สส.สุวรรณภูมิ",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10450120",
            "ssOfficeName": "สส.เมืองสรวง",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10450130",
            "ssOfficeName": "สส.โพนทราย",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10450140",
            "ssOfficeName": "สส.อาจสามารถ",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10450150",
            "ssOfficeName": "สส.เมยวดี",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10450160",
            "ssOfficeName": "สส.ศรีสมเด็จ",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10450170",
            "ssOfficeName": "สส.จังหาร",
            "stOfficeCode": "10450000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10460010",
            "ssOfficeName": "สส.เมืองกาฬสินธุ์",
            "stOfficeCode": "10460000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10460030",
            "ssOfficeName": "สส.กมลาไสย",
            "stOfficeCode": "10460000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10460040",
            "ssOfficeName": "สส.ร่องคำ",
            "stOfficeCode": "10460000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10460050",
            "ssOfficeName": "สส.กุฉินารายณ์",
            "stOfficeCode": "10460000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10460060",
            "ssOfficeName": "สส.เขาวง",
            "stOfficeCode": "10460000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10460070",
            "ssOfficeName": "สส.ยางตลาด",
            "stOfficeCode": "10460000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10460080",
            "ssOfficeName": "สส.ห้วยเม็ก",
            "stOfficeCode": "10460000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10460090",
            "ssOfficeName": "สส.สหัสขันธ์",
            "stOfficeCode": "10460000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10460100",
            "ssOfficeName": "สส.คำม่วง",
            "stOfficeCode": "10460000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10460120",
            "ssOfficeName": "สส.หนองกุงศรี",
            "stOfficeCode": "10460000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10460130",
            "ssOfficeName": "สส.สมเด็จ",
            "stOfficeCode": "10460000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10460140",
            "ssOfficeName": "สส.ห้วยผึ้ง",
            "stOfficeCode": "10460000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10460160",
            "ssOfficeName": "สส.นาคู",
            "stOfficeCode": "10460000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10470010",
            "ssOfficeName": "สส.เมืองสกลนคร",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10470020",
            "ssOfficeName": "สส.กุสุมาลย์",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10470040",
            "ssOfficeName": "สส.พรรณานิคม",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10470050",
            "ssOfficeName": "สส.พังโคน",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10470060",
            "ssOfficeName": "สส.วาริชภูมิ",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10470080",
            "ssOfficeName": "สส.วานรนิวาส",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10470090",
            "ssOfficeName": "สส.คำตากล้า",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10470100",
            "ssOfficeName": "สส.บ้านม่วง",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10470110",
            "ssOfficeName": "สส.อากาศอำนวย",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10470120",
            "ssOfficeName": "สส.สว่างแดนดิน",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10470130",
            "ssOfficeName": "สส.ส่องดาว",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10470140",
            "ssOfficeName": "สส.เต่างอย",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10470150",
            "ssOfficeName": "สส.โคกศรีสุพรรณ",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10470160",
            "ssOfficeName": "สส.เจริญศิลป์",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10470170",
            "ssOfficeName": "สส.โพนนาแก้ว",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10470180",
            "ssOfficeName": "สส.ภูพาน",
            "stOfficeCode": "10470000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10480010",
            "ssOfficeName": "สส.เมืองนครพนม",
            "stOfficeCode": "10480000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10480020",
            "ssOfficeName": "สส.ปลาปาก",
            "stOfficeCode": "10480000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10480030",
            "ssOfficeName": "สส.ท่าอุเทน",
            "stOfficeCode": "10480000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10480040",
            "ssOfficeName": "สส.บ้านแพง",
            "stOfficeCode": "10480000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10480050",
            "ssOfficeName": "สส.ธาตุพนม",
            "stOfficeCode": "10480000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10480060",
            "ssOfficeName": "สส.เรณูนคร",
            "stOfficeCode": "10480000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10480070",
            "ssOfficeName": "สส.นาแก",
            "stOfficeCode": "10480000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10480080",
            "ssOfficeName": "สส.ศรีสงคราม",
            "stOfficeCode": "10480000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10480090",
            "ssOfficeName": "สส.นาหว้า",
            "stOfficeCode": "10480000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10480100",
            "ssOfficeName": "สส.โพนสวรรค์",
            "stOfficeCode": "10480000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10490010",
            "ssOfficeName": "สส.เมืองมุกดาหาร",
            "stOfficeCode": "10490000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10490020",
            "ssOfficeName": "สส.นิคมคำสร้อย",
            "stOfficeCode": "10490000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10490030",
            "ssOfficeName": "สส.ดอนตาล",
            "stOfficeCode": "10490000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "10490050",
            "ssOfficeName": "สส.คำชะอี",
            "stOfficeCode": "10490000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "10490070",
            "ssOfficeName": "สส.หนองสูง",
            "stOfficeCode": "10490000",
            "regionOfficeCode": "10000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11800010",
            "ssOfficeName": "สส.เมืองนครศรีธรรมราช",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800020",
            "ssOfficeName": "สส.พรหมคีรี",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11800030",
            "ssOfficeName": "สส.ลานสกา",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11800040",
            "ssOfficeName": "สส.ฉวาง",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800050",
            "ssOfficeName": "สส.พิปูน",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11800060",
            "ssOfficeName": "สส.เชียรใหญ่",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800070",
            "ssOfficeName": "สส.ชะอวด",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800080",
            "ssOfficeName": "สส.ท่าศาลา",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800090",
            "ssOfficeName": "สส.ทุ่งสง",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800100",
            "ssOfficeName": "สส.นาบอน",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11800110",
            "ssOfficeName": "สส.ทุ่งใหญ่",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800120",
            "ssOfficeName": "สส.ปากพนัง",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800130",
            "ssOfficeName": "สส.ร่อนพิบูลย์",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800140",
            "ssOfficeName": "สส.สิชล",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800150",
            "ssOfficeName": "สส.ขนอม",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800160",
            "ssOfficeName": "สส.หัวไทร",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800180",
            "ssOfficeName": "สส.ถ้ำพรรณรา",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11800190",
            "ssOfficeName": "สส.จุฬาภรณ์",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11800200",
            "ssOfficeName": "สส.พระพรหม",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800220",
            "ssOfficeName": "สส.ช้างกลาง",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11800230",
            "ssOfficeName": "สส.เฉลิมพระเกียรติ (นศ.)",
            "stOfficeCode": "11800000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11810010",
            "ssOfficeName": "สส.เมืองกระบี่",
            "stOfficeCode": "11810000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11810020",
            "ssOfficeName": "สส.เขาพนม",
            "stOfficeCode": "11810000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11810030",
            "ssOfficeName": "สส.เกาะลันตา",
            "stOfficeCode": "11810000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11810040",
            "ssOfficeName": "สส.คลองท่อม",
            "stOfficeCode": "11810000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11810050",
            "ssOfficeName": "สส.อ่าวลึก",
            "stOfficeCode": "11810000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11810060",
            "ssOfficeName": "สส.ปลายพระยา",
            "stOfficeCode": "11810000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11810080",
            "ssOfficeName": "สส.เหนือคลอง",
            "stOfficeCode": "11810000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11820010",
            "ssOfficeName": "สส.เมืองพังงา",
            "stOfficeCode": "11820000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11820020",
            "ssOfficeName": "สส.เกาะยาว",
            "stOfficeCode": "11820000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11820030",
            "ssOfficeName": "สส.กะปง",
            "stOfficeCode": "11820000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11820040",
            "ssOfficeName": "สส.ตะกั่วทุ่ง",
            "stOfficeCode": "11820000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11820050",
            "ssOfficeName": "สส.ตะกั่วป่า",
            "stOfficeCode": "11820000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11820060",
            "ssOfficeName": "สส.คุระบุรี",
            "stOfficeCode": "11820000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11820070",
            "ssOfficeName": "สส.ทับปุด",
            "stOfficeCode": "11820000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11820080",
            "ssOfficeName": "สส.ท้ายเหมือง",
            "stOfficeCode": "11820000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11830010",
            "ssOfficeName": "สส.เมืองภูเก็ต 1",
            "stOfficeCode": "11830000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11830011",
            "ssOfficeName": "สส.เมืองภูเก็ต 2",
            "stOfficeCode": "11830000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11830020",
            "ssOfficeName": "สส.กะทู้",
            "stOfficeCode": "11830000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11830030",
            "ssOfficeName": "สส.ถลาง",
            "stOfficeCode": "11830000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11840010",
            "ssOfficeName": "สส.เมืองสุราษฎร์ธานี",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11840020",
            "ssOfficeName": "สส.กาญจนดิษฐ์",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11840030",
            "ssOfficeName": "สส.ดอนสัก",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11840060",
            "ssOfficeName": "สส.ไชยา",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11840070",
            "ssOfficeName": "สส.ท่าชนะ",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11840080",
            "ssOfficeName": "สส.คีรีรัฐนิยม",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11840090",
            "ssOfficeName": "สส.บ้านตาขุน",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11840100",
            "ssOfficeName": "สส.พนม",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11840110",
            "ssOfficeName": "สส.ท่าฉาง",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11840120",
            "ssOfficeName": "สส.บ้านนาสาร",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11840130",
            "ssOfficeName": "สส.บ้านนาเดิม",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11840140",
            "ssOfficeName": "สส.เคียนซา",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11840150",
            "ssOfficeName": "สส.เวียงสระ",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11840160",
            "ssOfficeName": "สส.พระแสง",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11840170",
            "ssOfficeName": "สส.พุนพิน",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11840180",
            "ssOfficeName": "สส.ชัยบุรี",
            "stOfficeCode": "11840000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11841040",
            "ssOfficeName": "สส.เกาะสมุย",
            "stOfficeCode": "11841000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11841050",
            "ssOfficeName": "สส.เกาะพะงัน",
            "stOfficeCode": "11841000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11850010",
            "ssOfficeName": "สส.เมืองระนอง",
            "stOfficeCode": "11850000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11850020",
            "ssOfficeName": "สส.ละอุ่น",
            "stOfficeCode": "11850000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11850030",
            "ssOfficeName": "สส.กะเปอร์",
            "stOfficeCode": "11850000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11850040",
            "ssOfficeName": "สส.กระบุรี",
            "stOfficeCode": "11850000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11860010",
            "ssOfficeName": "สส.เมืองชุมพร",
            "stOfficeCode": "11860000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11860020",
            "ssOfficeName": "สส.ท่าแซะ",
            "stOfficeCode": "11860000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11860030",
            "ssOfficeName": "สส.ปะทิว",
            "stOfficeCode": "11860000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11860040",
            "ssOfficeName": "สส.หลังสวน",
            "stOfficeCode": "11860000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11860050",
            "ssOfficeName": "สส.ละแม",
            "stOfficeCode": "11860000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11860060",
            "ssOfficeName": "สส.พะโต๊ะ",
            "stOfficeCode": "11860000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "11860070",
            "ssOfficeName": "สส.สวี",
            "stOfficeCode": "11860000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "11860080",
            "ssOfficeName": "สส.ทุ่งตะโก",
            "stOfficeCode": "11860000",
            "regionOfficeCode": "11000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12900010",
            "ssOfficeName": "สส.เมืองสงขลา",
            "stOfficeCode": "12900000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12900020",
            "ssOfficeName": "สส.สทิงพระ",
            "stOfficeCode": "12900000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12900030",
            "ssOfficeName": "สส.จะนะ",
            "stOfficeCode": "12900000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12900040",
            "ssOfficeName": "สส.นาทวี",
            "stOfficeCode": "12900000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12900050",
            "ssOfficeName": "สส.เทพา",
            "stOfficeCode": "12900000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12900060",
            "ssOfficeName": "สส.สะบ้าย้อย",
            "stOfficeCode": "12900000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12900070",
            "ssOfficeName": "สส.ระโนด",
            "stOfficeCode": "12900000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12900100",
            "ssOfficeName": "สส.สะเดา",
            "stOfficeCode": "12900000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12900150",
            "ssOfficeName": "สส.สิงหนคร",
            "stOfficeCode": "12900000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12901090",
            "ssOfficeName": "สส.รัตภูมิ",
            "stOfficeCode": "12901000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12901110",
            "ssOfficeName": "สส.หาดใหญ่ 1",
            "stOfficeCode": "12901000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12901111",
            "ssOfficeName": "สส.หาดใหญ่ 2",
            "stOfficeCode": "12901000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12901120",
            "ssOfficeName": "สส.นาหม่อม",
            "stOfficeCode": "12901000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12901130",
            "ssOfficeName": "สส.ควนเนียง",
            "stOfficeCode": "12901000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12901140",
            "ssOfficeName": "สส.บางกล่ำ",
            "stOfficeCode": "12901000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12901160",
            "ssOfficeName": "สส.คลองหอยโข่ง",
            "stOfficeCode": "12901000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12910010",
            "ssOfficeName": "สส.เมืองสตูล",
            "stOfficeCode": "12910000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12910020",
            "ssOfficeName": "สส.ควนโดน",
            "stOfficeCode": "12910000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12910030",
            "ssOfficeName": "สส.ควนกาหลง",
            "stOfficeCode": "12910000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12910040",
            "ssOfficeName": "สส.ท่าแพ",
            "stOfficeCode": "12910000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12910050",
            "ssOfficeName": "สส.ละงู",
            "stOfficeCode": "12910000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12910060",
            "ssOfficeName": "สส.ทุ่งหว้า",
            "stOfficeCode": "12910000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12920010",
            "ssOfficeName": "สส.เมืองตรัง",
            "stOfficeCode": "12920000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12920020",
            "ssOfficeName": "สส.กันตัง",
            "stOfficeCode": "12920000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12920030",
            "ssOfficeName": "สส.ย่านตาขาว",
            "stOfficeCode": "12920000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12920040",
            "ssOfficeName": "สส.ปะเหลียน",
            "stOfficeCode": "12920000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12920050",
            "ssOfficeName": "สส.สิเกา",
            "stOfficeCode": "12920000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12920060",
            "ssOfficeName": "สส.ห้วยยอด",
            "stOfficeCode": "12920000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12920070",
            "ssOfficeName": "สส.วังวิเศษ",
            "stOfficeCode": "12920000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12920080",
            "ssOfficeName": "สส.นาโยง",
            "stOfficeCode": "12920000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12920090",
            "ssOfficeName": "สส.รัษฎา",
            "stOfficeCode": "12920000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12930010",
            "ssOfficeName": "สส.เมืองพัทลุง",
            "stOfficeCode": "12930000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12930030",
            "ssOfficeName": "สส.เขาชัยสน",
            "stOfficeCode": "12930000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12930040",
            "ssOfficeName": "สส.ตะโหมด",
            "stOfficeCode": "12930000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12930050",
            "ssOfficeName": "สส.ควนขนุน",
            "stOfficeCode": "12930000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12930060",
            "ssOfficeName": "สส.ปากพะยูน",
            "stOfficeCode": "12930000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12930070",
            "ssOfficeName": "สส.ศรีบรรพต",
            "stOfficeCode": "12930000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12930080",
            "ssOfficeName": "สส.ป่าบอน",
            "stOfficeCode": "12930000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12930090",
            "ssOfficeName": "สส.บางแก้ว",
            "stOfficeCode": "12930000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12930100",
            "ssOfficeName": "สส.ป่าพะยอม",
            "stOfficeCode": "12930000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12940010",
            "ssOfficeName": "สส.เมืองปัตตานี",
            "stOfficeCode": "12940000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12940020",
            "ssOfficeName": "สส.โคกโพธิ์",
            "stOfficeCode": "12940000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12940030",
            "ssOfficeName": "สส.หนองจิก",
            "stOfficeCode": "12940000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12940040",
            "ssOfficeName": "สส.ปะนาเระ",
            "stOfficeCode": "12940000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12940050",
            "ssOfficeName": "สส.มายอ",
            "stOfficeCode": "12940000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12940060",
            "ssOfficeName": "สส.ทุ่งยางแดง",
            "stOfficeCode": "12940000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12940070",
            "ssOfficeName": "สส.สายบุรี",
            "stOfficeCode": "12940000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12940080",
            "ssOfficeName": "สส.ไม้แก่น",
            "stOfficeCode": "12940000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12940090",
            "ssOfficeName": "สส.ยะหริ่ง",
            "stOfficeCode": "12940000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12940100",
            "ssOfficeName": "สส.ยะรัง",
            "stOfficeCode": "12940000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12940110",
            "ssOfficeName": "สส.กะพ้อ",
            "stOfficeCode": "12940000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12940120",
            "ssOfficeName": "สส.แม่ลาน",
            "stOfficeCode": "12940000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12950010",
            "ssOfficeName": "สส.เมืองยะลา",
            "stOfficeCode": "12950000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12950020",
            "ssOfficeName": "สส.เบตง",
            "stOfficeCode": "12950000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12950030",
            "ssOfficeName": "สส.บันนังสตา",
            "stOfficeCode": "12950000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12950040",
            "ssOfficeName": "สส.ธารโต",
            "stOfficeCode": "12950000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12950050",
            "ssOfficeName": "สส.ยะหา",
            "stOfficeCode": "12950000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12950060",
            "ssOfficeName": "สส.รามัน",
            "stOfficeCode": "12950000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12950070",
            "ssOfficeName": "สส.กาบัง",
            "stOfficeCode": "12950000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12960010",
            "ssOfficeName": "สส.เมืองนราธิวาส",
            "stOfficeCode": "12960000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12960020",
            "ssOfficeName": "สส.ตากใบ",
            "stOfficeCode": "12960000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12960030",
            "ssOfficeName": "สส.บาเจาะ",
            "stOfficeCode": "12960000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12960040",
            "ssOfficeName": "สส.ยี่งอ",
            "stOfficeCode": "12960000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12960050",
            "ssOfficeName": "สส.ระแงะ",
            "stOfficeCode": "12960000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12960060",
            "ssOfficeName": "สส.รือเสาะ",
            "stOfficeCode": "12960000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12960070",
            "ssOfficeName": "สส.ศรีสาคร",
            "stOfficeCode": "12960000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12960080",
            "ssOfficeName": "สส.แว้ง",
            "stOfficeCode": "12960000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12960090",
            "ssOfficeName": "สส.สุคิริน",
            "stOfficeCode": "12960000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12960100",
            "ssOfficeName": "สส.สุไหงโก-ลก",
            "stOfficeCode": "12960000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 1
        },
        {
            "ssOfficeCode": "12960110",
            "ssOfficeName": "สส.สุไหงปาดี",
            "stOfficeCode": "12960000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12960120",
            "ssOfficeName": "สส.จะแนะ",
            "stOfficeCode": "12960000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        },
        {
            "ssOfficeCode": "12960130",
            "ssOfficeName": "สส.เจาะไอร้อง",
            "stOfficeCode": "12960000",
            "regionOfficeCode": "12000000",
            "ktbStatus": 0
        }
    ]
}