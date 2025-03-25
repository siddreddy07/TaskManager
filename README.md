# 📝 TaskManager

🚀 A full-stack **Task Manager** application built using the **MERN (MongoDB, Express, React, Node.js) stack**.  
🔗 **Live Demo:** [TaskManager](https://taskmanager-218j.onrender.com/)

---

## 📌 Features
- 🔐 **User Authentication** (Signup, Login, Logout)
- ✅ **Create, Update, and Delete Tasks**
- 📌 **Persistent task storage with MongoDB**
- 🎨 **Responsive UI built with React & Tailwind CSS**
- ⚡ **Fast and efficient backend with Express & Node.js**
- 🌍 **Secure authentication using JWT & Cookies**
- 🔔 **Notifications using react-hot-toast**

---

## 🛠️ Tech Stack
**Frontend:** React, Vite, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Authentication:** JWT, Cookies  
**Other Tools:** React Router, Axios  

---

## 🚀 Installation & Setup

### 📚 Clone the Repository
```sh
git clone https://github.com/yourusername/TaskManager.git
cd TaskManager
```

### 🛠️ Install Dependencies  
Run the following command in the root directory to install **both** client and server dependencies:
```sh
npm run build
```

### ▶️ Run the Backend (Server)
Move to the **server** directory and start the backend:
```sh
npm run start
```
The server will run on **http://localhost:5000/**

### 💻 Run the Frontend (Client)
Move to the **client** directory and start the frontend:
```sh
cd client
npm run dev
```
The client will run on **http://localhost:5173/**

---

## 📄 API Routes
### **Authentication Routes** (`/api/auth`)
- `POST /api/auth/signup` - User Signup
- `POST /api/auth/login` - User Login
- `GET /api/auth/logout` - Logout

### **Task Routes** (`/api/tasks`)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

---

## 🏢 Folder Structure
```
TaskManager/
👉 client/         # Frontend (React + Vite)
👉 server/         # Backend (Node.js + Express)
👉 .env            # Environment Variables
👉 .gitignore
👉 package.json
👉 README.md
```

---

## 🛠️ Environment Variables
Create a `.env` file in the **server** directory and add the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

---

## 🌟 Contributing
Want to improve this project? Follow these steps:
1. **Fork** this repository  
2. **Create a feature branch** (`git checkout -b feature-name`)  
3. **Commit your changes** (`git commit -m "Add feature"`)  
4. **Push to your branch** (`git push origin feature-name`)  
5. **Open a Pull Request** 🚀

