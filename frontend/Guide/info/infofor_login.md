โครงการพัฒนาระบบติดตามรายผู้ประกอบการในท้องที่สำหรับสำนักงานสรรพากรพื้นที่สาขา 
1. หน้าจอ Login 
▪ Database 
Database Name: TAXPAYER_TRACK 
Sever Name : (http://10.208.1.207:8081/taxpayer-tracking)
API : http://(http://10.208.1.207:8081)/taxpayer-tracking/api/auth/login
▪  Table 
Table Name: users 
Fields: 
[user_index] [int] NOT NULL, 
[user_id] [varchar](50) NULL, 
[user_name] [varchar](255) NULL, 
[user_password] [varchar](50) NULL, 
[st_office_code] [varchar](50) NULL, 
[st_office_name] [varchar](255) NULL, 
[ss_office_code] [varchar](50) NULL, 
[ss_office_name] [varchar](255) NULL, 
[position] [varchar](255) NULL, 
[user_group] [varchar](100) NULL, 
[user_sub_group] [varchar](100) NULL, 
[active_status] [char](1) NULL 

รหัส สท. 
ชื่อ สท 
รหัส สส 
ชื่อ สส 


ข้อมูลสำหรับระบบ login  
[user_index] = 1
[user_id] = NB195096
[user_name] =  นิวัฒน์ บุรีนอก
[user_password] = pass1234
[st_office_code] = 12000000
[st_office_name] = สำนักงานสรรพากรภาค 12
[ss_office_code] = 
[ss_office_name] = 
[position] = นักวิชาการคอมพิวเตอร์ชำนาญการพิเศษ
[user_group] = region
[user_sub_group] = -
[active_status] = 1

[user_index] = 2
[user_id] = NB1950961
[user_name] =  นายนิวัฒน์ บุรีนอก
[user_password] = pass1234
[st_office_code] = 12900000
[st_office_name] = สำนักงานสรรพากรพื้นที่สงขลา 1
[ss_office_code] = 
[ss_office_name] = 
[position] = นักวิชาการคอมพิวเตอร์ชำนาญการพิเศษ
[user_group] = st
[user_sub_group] = -
[active_status] = 1

[user_index] = 3
[user_id] = NB1950962
[user_name] =  นายนิวัฒน์ บุรีนอก
[user_password] = pass1234
[st_office_code] = 12900000
[st_office_name] = สำนักงานสรรพากรพื้นที่สงขลา 1
[ss_office_code] = 12900010
[ss_office_name] = สำนักงานสรรพากรพื้นที่สาขาสงขลา 1
[position] = นักวิชาการคอมพิวเตอร์ชำนาญการพิเศษ
[user_group] = ss
[user_sub_group] = -
[active_status] = 1

ลำดับที่ 1 เป็น เจ้าหน้าที่ระดับภาค 
ลำดับที่ 2 เป็นเจ้าหน้าที่ระดับ สท. 
ลำดับที่ 3 เป็นเจ้าหน้าที่ระดับ สส.  
API : สร้าง API ขึ้นมาใหม่ สำหรับเชื่อมต่อฐานข้อมูลของโปรแกรม เพื่อจัดการข้อมูลภายใน
โปรแกรม  แยกจาก API ที่เชื่อมต่อผลจัดเก็บ  
API Endpoints ที ่ต้องใช้ 
Authentication  
POST /api/auth/login     – Login 
POST /api/auth/validate   - Validate JWT Token  
User Management  
GET /api/users/me - Get current user info  
GET /api/users - Get all active users  
GET /api/users/{index} - Get user by index  
GET /api/users/office/{code} - Get users by office  
GET /api/users/group/{group} - Get users by group  
POST /api/users - Create new user  
PUT /api/users/{index} - Update user  
DELETE /api/users/{index} - Delete user (soft delete)  
GET /api/users/count - Count active users