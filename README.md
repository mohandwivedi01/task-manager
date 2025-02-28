# Task Manager App 🚀  

A simple task management web application built using **React** (frontend) and **Node.js** (backend). This app allows users to **create, update, delete, and manage tasks** with priority and status selection.

---

## 📌 Features  
- 📋 **CRUD Operations**: Create, Read, Update, and Delete tasks.  
- 🎨 **Tailwind CSS Styling**: Modern and responsive UI.  
- 🎯 **React Context API**: Global state management for tasks.  
- ⚡ **Reusable Components**: Modular and scalable code structure.  
- 🔗 **REST API**: Node.js backend with Express.js for handling API requests.  

---

## 🛠️ Tech Stack  
### Frontend  
- **React** (with hooks & context API)  
- **Tailwind CSS**  
- **React Icons**  
- **Axios** (for API calls)  
- **React Toastify** (for notifications)  

### Backend  
- **Node.js**  
- **Express.js**  
- **MongoDB** (Database)  
- **Mongoose** (for MongoDB ORM)  
- **CORS** & **dotenv** (for environment configuration)  

---

## 🚀 Getting Started  
### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/mohandwivedi01/task-manager.git
cd task-manager
```
### 2️⃣ Setup Backend
```bash
cd backend
npm install
```
#### 🔹 Configure Environment Variables
Create a .env file inside the backend folder and add:
```bash
PORT=8000
MONGO_URI=your_mongodb_connection_string
CORS=
```
#### 🔹 Start the Backend Server
```bash
npm run dev
```
Your backend will run at http://localhost:8000/.

### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
```
#### 🔹 Configure Environment Variables
Create a .env file inside the frontend folder and add:
```bash
VITE_BACKEND_API=http://localhost:8000/api/v1/task
```
#### 🔹 Start the Frontend
```bash
npm run dev
```
Your frontend will run at http://localhost:5173

---

## 📡 API Endpoints
Method |	Endpoint   |	Description
-------|-------------|----------
GET    |	/tasks	   |  Get all tasks
POST	 |  /tasks	   |  Create a new task
PATCH	 |  /tasks/:id |  Update a task
DELETE |  /tasks/:id |  Delete a task

---

## 📂 Project Structure
```bash
task-manager/
│
├── backend
|   ├──src
│   │  ├── config/      # Database connection
│   │  ├── controllers/ # Business logic Express.js API routes
│   │  ├── models/      # Mongoose models
│   │  ├── routes/      # Express.js API routes
│   │  ├── utils/       # Middlewares
│   │  ├── app.js       # Express.js
│   │  ├── constants.js # Constant variables
│   │  ├── index.js     # Entry Point
│   │
│   ├─── .env           # Environment variables    
│   
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Global state management using React Context
│   │   ├── App.jsx     # Main App component
│   │   ├── index.js    # Entry point for frontend
│   │
│   ├── .env            # Frontend environment variables
│   ├── tailwind.config.js  # Tailwind CSS configuration
│
└── README.md           # Project documentation
```

---

## 🎯 How to Use
#### 1️⃣ Open the app in your browser.
#### 2️⃣ Add a new task with title, description, due date, priority, and status.
#### 3️⃣ Click on a task to edit or delete it.
#### 4️⃣ Manage your tasks efficiently! ✅


## ⚡ Future Improvements
#### ✅ Drag & drop tasks
#### ✅ User authentication & roles
#### ✅ Dark mode support
#### ✅ Due date notifications

---  

### 🤝 Contributing
Feel free to fork this repository and contribute! Open issues for suggestions and bug fixes.

### 📜 License
This project is licensed under the MIT License.

### 🚀 Enjoy Task Managing! ✨ 
Thankyou😊 --> https://67c1e5fd40a024406def6cd6--stirring-buttercream-393f98.netlify.app/




