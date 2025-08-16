# React Camping Workshop 🏕️

เว็บแอปพลิเคชันจองแคมป์ปิ้ง ที่ให้ผู้ใช้สามารถค้นหา จอง และจัดการสถานที่แคมป์ปิ้งได้

## 📋 คุณสมบัติหลัก

- 🏠 **หน้าแรก**: แสดงรายการสถานที่แคมป์ปิ้งทั้งหมด
- 🔍 **ค้นหาและกรอง**: ค้นหาสถานที่ตามหมวดหมู่
- 📅 **ระบบจอง**: จองสถานที่แคมป์ปิ้งพร้อมเลือกวันที่
- 💳 **ระบบชำระเงิน**: รองรับการชำระเงินผ่าน Stripe
- 🔐 **ระบบสมาชิก**: ล็อกอิน/สมัครสมาชิกผ่าน Clerk
- ❤️ **รายการโปรด**: เก็บสถานที่แคมป์ปิ้งที่ชื่นชอบ
- 🗺️ **แผนที่**: แสดงตำแหน่งสถานที่บนแผนที่
- 📊 **แดชบอร์ดแอดมิน**: จัดการข้อมูลสถานที่และการจอง
- 📱 **Responsive Design**: รองรับการใช้งานบนมือถือ

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **React 18** - JavaScript Library
- **Vite** - Build Tool
- **React Router** - Navigation
- **TailwindCSS** - CSS Framework
- **Zustand** - State Management
- **React Hook Form** - Form Management
- **React Leaflet** - Map Component
- **Clerk** - Authentication
- **Stripe** - Payment Gateway
- **Axios** - HTTP Client

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **Prisma** - Database ORM
- **MySQL** - Database
- **Cloudinary** - Image Storage
- **Clerk** - Authentication
- **Stripe** - Payment Processing

## 🚀 การติดตั้งและรันโปรเจ็กต์

### ข้อกำหนดเบื้องต้น

ก่อนเริ่มต้น ตรวจสอบให้แน่ใจว่าคุณได้ติดตั้งสิ่งต่อไปนี้แล้ว:

- **Node.js** (เวอร์ชัน 16 หรือสูงกว่า)
- **npm** หรือ **yarn**
- **MySQL Database**
- **Clerk Account** (สำหรับระบบ Authentication)
- **Stripe Account** (สำหรับระบบ Payment)
- **Cloudinary Account** (สำหรับจัดเก็บรูปภาพ)

### 1. Clone Repository

```bash
git clone <repository-url>
cd React-camping-workshop
```

### 2. ติดตั้ง Dependencies

#### ติดตั้งสำหรับ Root Project
```bash
npm install
```

#### ติดตั้งสำหรับ Client
```bash
cd client
npm install
```

#### ติดตั้งสำหรับ Server
```bash
cd server
npm install
```

### 3. ตั้งค่า Environment Variables

#### สำหรับ Server (สร้างไฟล์ `.env` ในโฟลเดอร์ `server/`)
```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/camping_db"

# Clerk Authentication
CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"

# Stripe Payment
STRIPE_SECRET_KEY="your-stripe-secret-key"

# Cloudinary Image Storage
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Server
PORT=5000
```

#### สำหรับ Client (สร้างไฟล์ `.env` ในโฟลเดอร์ `client/`)
```env
VITE_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
VITE_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
VITE_API_URL="http://localhost:5000"
```

### 4. ตั้งค่าฐานข้อมูล

#### ติดตั้ง Prisma และตั้งค่าฐานข้อมูล
```bash
cd server
npx prisma generate
npx prisma migrate dev --name "init"
npx prisma db push
```

### 5. รันโปรเจ็กต์

#### รัน Server (Terminal หน้าต่างที่ 1)
```bash
cd server
npm run dev
```
Server จะรันที่ `http://localhost:5000`

#### รัน Client (Terminal หน้าต่างที่ 2)
```bash
cd client
npm run dev
```
Client จะรันที่ `http://localhost:5173`

## 📁 โครงสร้างโปรเจ็กต์

```
React-camping-workshop/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # React Components
│   │   ├── pages/         # Page Components
│   │   ├── hooks/         # Custom Hooks
│   │   ├── store/         # Zustand State Management
│   │   ├── api/           # API Calls
│   │   └── utils/         # Utility Functions
│   └── package.json
├── server/                # Backend Express Application
│   ├── controllers/       # Route Controllers
│   ├── routes/           # API Routes
│   ├── middlewares/      # Custom Middlewares
│   ├── prisma/           # Database Schema
│   └── package.json
└── package.json          # Root Package
```

## 🗃️ Database Schema

โปรเจ็กต์ใช้ฐานข้อมูล MySQL ผ่าน Prisma ORM โดยมี Models หลัก:

- **Profile** - ข้อมูลผู้ใช้
- **Landmark** - ข้อมูลสถานที่แคมป์ปิ้ง
- **Booking** - ข้อมูลการจอง
- **Favorite** - รายการโปรดของผู้ใช้

## 🔧 คำสั่งที่สำคัญ

### สำหรับ Client
```bash
npm run dev      # รันในโหมด development
npm run build    # สร้าง production build
npm run preview  # ดู production build
```

### สำหรับ Server
```bash
npm run dev      # รันในโหมด development พร้อม nodemon
npm start        # รันในโหมด production
npm run generate # สร้าง Prisma Client ใหม่
```

### สำหรับ Database
```bash
npx prisma migrate dev     # สร้าง migration ใหม่
npx prisma db push         # ส่ง schema ไปยังฐานข้อมูล
npx prisma studio          # เปิด Prisma Studio สำหรับจัดการข้อมูล
npx prisma generate        # สร้าง Prisma Client ใหม่
```

## ⚠️ หมายเหตุสำคัญ

1. **ต้องมีฐานข้อมูล MySQL** ที่พร้อมใช้งานก่อนรันโปรเจ็กต์
2. **ต้องตั้งค่า Environment Variables** ให้ครบถ้วน
3. **ต้องมี Account ของ Clerk, Stripe และ Cloudinary**
4. **รัน Server ก่อน** แล้วค่อยรัน Client
5. **Port 5000 และ 5173** ต้องว่างเพื่อให้โปรเจ็กต์รันได้

## 🎯 การใช้งาน

1. เข้าสู่ระบบผ่าน Clerk Authentication
2. เลือกดูสถานที่แคมป์ปิ้งที่สนใจ
3. เลือกวันที่ที่ต้องการจอง
4. ชำระเงินผ่าน Stripe
5. ตรวจสอบการจองในหน้าโปรไฟล์

---

💡 **คำแนะนำ**: ในกรณีที่มีปัญหาในการรันโปรเจ็กต์ ให้ตรวจสอบ Console และ Environment Variables เป็นอันดับแรก