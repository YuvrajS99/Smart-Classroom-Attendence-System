# 🎓 Smart Classroom Attendance System (AI Based)

An AI-powered Smart Classroom Attendance System that detects and counts students using computer vision.

The system captures classroom images using a webcam, detects faces using TensorFlow.js, uploads the snapshot to Cloudinary, and stores attendance records in MongoDB. A dashboard allows teachers to monitor classroom attendance and view detection history.

---

# 🚀 Live Demo

https://smart-classroom-attendence-system.vercel.app/

---

# 🧠 Features

• AI-based student detection using TensorFlow.js  
• Real-time webcam classroom capture  
• Automatic student counting  
• Image upload to Cloudinary  
• Dashboard with attendance statistics  
• Detection history tracking  
• Secure authentication system using JWT  
• Modern responsive UI  

---

# 🏗️ Tech Stack

Frontend  
- Next.js  
- React  
- Axios  
- TensorFlow.js  
- Face API.js  

Backend  
- Node.js  
- Express.js  
- JWT Authentication  

Database  
- MongoDB Atlas  

Cloud Storage  
- Cloudinary  

Deployment  
- Frontend → Vercel  
- Backend → Render  

---

# 📂 Project Structure

Smart-Classroom-Attendence-System

backend  
config  
cloudinary.js  
db.js  

middleware  
auth.js  

models  
Admin.js  
Capture.js  

routes  
auth.js  
captures.js  

server.js  

frontend  

app  
capture  
dashboard  
history  
profile  

context  
AuthContext.js  

---

# ⚙️ Installation

Clone the repository

git clone https://github.com/YuvrajS99/Smart-Classroom-Attendence-System.git

cd Smart-Classroom-Attendence-System

---

# Backend Setup

cd backend

npm install

Create a .env file inside backend folder

MONGO_URI=your_mongodb_atlas_uri

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

PORT=5000

Run backend server

node server.js

---

# Frontend Setup

cd frontend

npm install

npm run dev

Frontend runs on

http://localhost:3000

---

# 📸 How It Works

1. User logs into the dashboard  
2. Camera captures classroom image  
3. TensorFlow.js detects student faces  
4. System counts number of students  
5. Image uploads to Cloudinary  
6. Attendance record stored in MongoDB  
7. Dashboard updates automatically  

---

# 📊 Dashboard Features

• Total classroom captures  
• Latest detected student count  
• Detection history with images  
• Time and date tracking  

---

# 🔐 Authentication

Secure login system implemented using

• JWT tokens  
• Protected API routes  
• Middleware authentication  

---

# 🧪 Future Improvements

• Real-time student detection counter  
• Attendance analytics dashboard with charts  
• Classroom capacity warning system  
• Face recognition attendance  
• Teacher classroom reports  
• Attendance trend graphs  

---

# 👨‍💻 Author

Yuvraj Sanap  
Computer Engineering Student  

GitHub  
https://github.com/YuvrajS99

---

# ⭐ Support

If you like this project, please give it a ⭐ on GitHub.
