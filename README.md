# 🎓 SmartAttendence – AI Smart Classroom Attendance System

SmartAttendence is an **AI-powered classroom monitoring and attendance system** that automatically detects and counts students in a classroom using computer vision.

Instead of manually marking attendance, the system captures classroom images, detects students using AI models, and records attendance data in a dashboard.

This project demonstrates **full-stack AI integration** using modern web technologies and computer vision.

---

# 🚀 Live Demo
  
https://smart-classroom-attendence-system.vercel.app/


---

# 📌 Features

### 📷 AI Student Detection
Detects students in classroom images using a **TensorFlow-based object detection model**.

### 📊 Smart Dashboard
Admin dashboard showing:
- Total captures
- Students detected
- System status
- Recent classroom captures

### 📅 Detection History
View all past classroom captures including:
- Date & time
- Number of students detected
- Captured classroom image

### 📷 Live Classroom Capture
Capture classroom images directly using webcam.

### 🔐 Authentication System
Secure login and registration system for admins.

### ☁ Cloud Image Storage
Captured classroom images are stored using **Cloudinary**.

### 📱 Fully Responsive UI
Works across:
- Mobile devices
- Tablets
- Desktop screens

### ⚡ Real-time Data Integration
Frontend communicates with backend APIs to fetch detection and analytics data dynamically.

---

# 🧠 Future Features (Planned)

The following features will be added in future versions:

- 📈 Attendance Analytics (Weekly / Monthly graphs)
- ⚠ Classroom Capacity Alert
- 🔔 Real-time student detection counter
- 📄 Export attendance reports (PDF / CSV)
- 👨‍🏫 Multi-classroom support
- 🧑‍🎓 Face recognition for individual attendance
- 📊 Advanced AI attendance insights

---

# 🏗️ Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- Axios
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI / Computer Vision
- TensorFlow.js
- COCO-SSD Model

### Cloud Services
- Cloudinary (Image Storage)
- Render (Backend Deployment)
- Vercel (Frontend Deployment)

---

# 📂 Project Structure

```
SmartAttendence
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── app
│   │   ├── dashboard
│   │   ├── capture
│   │   ├── history
│   │   ├── profile
│   │   ├── about
│   │   └── future
│   │
│   ├── components
│   ├── context
│   ├── public
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```
git clone https://github.com/YuvrajS99/Smart-Classroom-Attendence-System.git
```

Move into the project

```
cd Smart-Classroom-Attendence-System
```

---

# 🔧 Backend Setup

```
cd backend
npm install
```

Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_secret_key
```

Run backend

```
npm start
```

---

# 💻 Frontend Setup

```
cd frontend
npm install
npm run dev
```

App will run on:

```
http://localhost:3000
```

---

# 📸 How the System Works

1️⃣ Admin logs into dashboard  
2️⃣ Opens **Capture Classroom** page  
3️⃣ Webcam captures classroom image  
4️⃣ TensorFlow detects students in image  
5️⃣ System counts detected students  
6️⃣ Image is uploaded to Cloudinary  
7️⃣ Data stored in MongoDB  
8️⃣ Dashboard and history update automatically

---

# 📊 Example Use Case

This system can be used for:


- Smart classrooms
- Automated attendance systems
- Classroom monitoring
- AI-powered campus management

---

# 👨‍💻 Author

**Yuvraj Adinath Sanap**

Computer Engineering Student  
Full Stack Developer | AI Enthusiast

GitHub  
https://github.com/YuvrajS99

---

# ⭐ Support

If you like this project, consider giving it a **⭐ on GitHub**.

It helps the project reach more developers.

---

# 📜 License

This project is licensed under the **MIT License**.
