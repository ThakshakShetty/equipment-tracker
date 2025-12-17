# Equipment Tracker

## 📌 Project Overview

Equipment Tracker is a simple full-stack web application used to manage equipment records.
Users can view, add, edit, and delete equipment details through a clean and user-friendly interface.

This project was built to demonstrate basic full-stack development skills including frontend, backend, and API integration.

---

## 🚀 Features

* View equipment list in a table
* Add new equipment
* Edit existing equipment
* Delete equipment
* Form validation for required fields
* Clean and professional UI
* Responsive design

Each equipment contains:

* Name
* Type (Machine, Vessel, Tank, Mixer)
* Status (Active, Inactive, Under Maintenance)
* Last Cleaned Date

---

## 🛠 Tech Stack

### Frontend

* React
* CSS

### Backend

* Node.js
* Express.js

### Database

* JSON file (for simplicity)

---

## ⚙️ Project Structure

```
equipment-tracker/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── data/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | /api/equipment     | Get all equipment |
| POST   | /api/equipment     | Add new equipment |
| PUT    | /api/equipment/:id | Update equipment  |
| DELETE | /api/equipment/:id | Delete equipment  |

---

## ▶️ How to Run the Project Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ThakshakShetty/equipment-tracker.git
cd equipment-tracker
```

### 2️⃣ Start Backend

```bash
cd backend
npm install
npm start
```

Backend runs on: `http://localhost:5000`

---

### 3️⃣ Start Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

## 📂 Data Storage

Equipment data is stored in a JSON file on the backend.
This approach keeps the project simple and focuses on core functionality.

---

## 📎 Author

**Thakshak Shetty**

