# สั่ง Build ใหม่และรันขึ้นมาทันที (ครอบคลุมทั้งการหยุดตัวเก่า, Build ใหม่ และ Start ตัวใหม่)
docker-compose up -d --build
# ที่ไฟล์ E:\Intership_Y69\TackTaxpayer> (not frontend)

# สั่งหยุด Container เดิม
docker-compose down

# สั่ง Build ใหม่
docker-compose build

# สั่ง Start Container ที่ Build ไว้แล้ว
docker-compose up -d