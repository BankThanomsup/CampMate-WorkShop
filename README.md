🏕️ React Camping Workshop
โปรเจกต์นี้เป็นระบบจองแคมป์ปิ้งที่พัฒนาด้วย React และ Node.js โดยมีฟีเจอร์ครบถ้วนตั้งแต่การแสดงรายการแคมป์ การจอง การชำระเงินผ่าน Stripe ไปจนถึงการจัดการผู้ใช้ผ่าน Clerk

🔧 เทคโนโลยีที่ใช้
Frontend: React, Vite, Tailwind CSS, Clerk (สำหรับการยืนยันตัวตน)

Backend: Node.js, Express, Prisma ORM, MySQL

การชำระเงิน: Stripe Embedded Checkout

การจัดการผู้ใช้: Clerk

การจัดการรูปภาพ: Cloudinary

📦 โครงสร้างโปรเจกต์

```bash
React-camping-workshop/
├── client/                 # โค้ดฝั่ง Frontend (React)
│   ├── components/
│   ├── pages/
│   ├── api/
│   └── ...
├── server/                 # โค้ดฝั่ง Backend (Node.js + Express)
│   ├── controllers/
│   ├── routes/
│   ├── prisma/
│   └── ...
├── prisma/                 # ไฟล์ schema ของ Prisma
├── .env.local              # ไฟล์ Environment สำหรับ Frontend
├── .env                    # ไฟล์ Environment สำหรับ Backend
└── README.md
```

🧪 ฟีเจอร์หลัก
🔍 ค้นหาและเรียกดูแคมป์

🖼️ อัปโหลดและแสดงรูปภาพของแคมป์

🧾 ระบบจองและยืนยันการจอง

💳 การชำระเงินผ่าน Stripe Embedded Checkout

🔐 การยืนยันตัวตนและการจัดการผู้ใช้ด้วย Clerk

📦 การจัดการข้อมูลด้วย Prisma ORM และ MySQL

🛠️ การพัฒนาเพิ่มเติม
เพิ่มระบบรีวิวและคะแนนสำหรับแคมป์

รองรับการจองหลายวัน

ระบบแอดมินสำหรับจัดการแคมป์และการจอง

📄 License
MIT
